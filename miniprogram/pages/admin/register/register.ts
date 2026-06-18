// miniprogram/pages/admin/register/register.ts
// 管理员批量登记 DTU（IMEI + 选节点）
// 视觉规范见 docs/style-guide.md

import api from "../../../utils/api"

interface NodeInfo {
  Name: string
  IP: string
  Port: number
  MaxConnections: number
  count: number
  useRatio: number       // 0-100
  useRatioLabel: string  // 25%
  available: number      // MaxConnections - count
  disabled: boolean
  selected: boolean
}

Page({
  data: {
    // IMEI 输入
    mac: '',
    showAddBtn: false,
    imeiHint: '',  // 校验提示
    imeiHintError: false,

    // 已录入 IMEI 列表
    dtus: [] as Uart.RegisterTerminal[],

    // 节点列表
    nodes: [] as NodeInfo[],
    selectedNode: '' as string,

    // 派生
    isReady: false,
  },

  onLoad: function () {
    this.getNodes()
  },

  // 扫 IMEI
  async scanMac() {
    try {
      const scanResult = await wx.scanCode({})
      this.setData({ mac: scanResult.result })
      this.addDtus()
    } catch (e) {
      // 用户取消
    }
  },

  onMacInput(e: WechatMiniprogram.Input) {
    const mac = e.detail.value
    this.setData({
      mac,
      showAddBtn: mac.length > 0,
      imeiHint: '',
      imeiHintError: false,
    })
  },

  onMacConfirm() {
    this.addDtus()
  },

  /**
   * 校验 IMEI 长度必须是 12，加入已录入列表
   */
  addDtus() {
    const { mac, dtus, selectedNode } = this.data
    if (mac.length !== 12) {
      this.setData({
        imeiHint: `${mac} 长度异常，请核对是否正确`,
        imeiHintError: true,
      })
      return
    }
    if (dtus.findIndex(el => el.DevMac === mac) !== -1) {
      this.setData({
        imeiHint: '已存在，跳过',
        imeiHintError: false,
      })
      return
    }
    const next: Uart.RegisterTerminal = { DevMac: mac, bindDev: '', mountNode: selectedNode }
    this.setData({
      dtus: [next, ...dtus],
      mac: '',
      showAddBtn: false,
      imeiHint: '',
      imeiHintError: false,
    })
    this.rebuildReady()
  },

  // 删除已选 DTU
  rmDtu(e: WechatMiniprogram.TouchEvent) {
    const key = (e.currentTarget.dataset as any).key as string
    wx.showModal({
      title: '删除 DTU',
      content: `确定删除 DTU: ${key} ?`,
      success: (res) => {
        if (res.confirm) {
          this.setData({ dtus: this.data.dtus.filter(el => el.DevMac !== key) })
          this.rebuildReady()
        }
      },
    })
  },

  // 获取节点列表
  async getNodes() {
    const { data } = await api.Nodes()
    this.rebuildNodes(data || [])
  },

  /**
   * 派生节点卡片（每节点带 available / useRatio / selected / disabled）
   */
  rebuildNodes(rawNodes: Uart.NodeClient[]) {
    const dtulen = this.data.dtus.length
    const nodes: NodeInfo[] = rawNodes.map((el: any) => {
      const max = el.MaxConnections || 0
      const used = el.count || 0
      const available = max - used
      return {
        Name: el.Name,
        IP: el.IP,
        Port: el.Port,
        MaxConnections: max,
        count: used,
        useRatio: max > 0 ? Math.min(100, Math.round((used / max) * 100)) : 0,
        useRatioLabel: max > 0 ? `${Math.round((used / max) * 100)}%` : '—',
        available,
        disabled: available <= dtulen,
        selected: false,
      }
    })
    // 默认选第一个可用节点
    const firstAvailable = nodes.find(n => !n.disabled)
    const selectedNode = firstAvailable ? firstAvailable.Name : ''
    if (firstAvailable) firstAvailable.selected = true
    this.setData({ nodes, selectedNode })
    this.rebuildReady()
  },

  /**
   * 选择节点（点击卡片）
   */
  selectNode(e: WechatMiniprogram.TouchEvent) {
    const item = (e.currentTarget.dataset as any).item as NodeInfo
    if (item.disabled) {
      wx.showToast({ title: '该节点容量不足', icon: 'none' })
      return
    }
    const nodes = this.data.nodes.map(n => ({ ...n, selected: n.Name === item.Name }))
    this.setData({ nodes, selectedNode: item.Name })
    this.rebuildReady()
  },

  rebuildReady() {
    this.setData({
      isReady: this.data.dtus.length > 0 && Boolean(this.data.selectedNode),
    })
  },

  // 提交
  async submit() {
    if (!this.data.isReady) return
    const { dtus, selectedNode } = this.data
    const { confirm } = await wx.showModal({
      title: '提交核对',
      content: `本次提交 DTU 数目: ${dtus.length}\n挂载的节点: ${selectedNode}`,
    })
    if (!confirm) return
    wx.showLoading({ title: '正在提交' })
    const all = await Promise.all(dtus.map(el => api.addRegisterTerminal(el.DevMac, selectedNode)))
    wx.hideLoading()
    const success = all.filter(r => r.code === 200).length
    if (success === dtus.length) {
      wx.showModal({
        title: '提交成功',
        content: `成功提交 [${success}] 个设备`,
        showCancel: false,
        success: () => {
          this.setData({ dtus: [] })
          this.getNodes()
          this.rebuildReady()
        },
      })
    } else {
      wx.showModal({
        title: '部分失败',
        content: `成功 ${success} / ${dtus.length}，请检查失败项后重试`,
        showCancel: false,
      })
    }
  },

  // 复制 IMEI 列表（加 866 前缀）
  copy() {
    const mac = this.data.dtus.map(el => '866' + el.DevMac).join('\n')
    wx.setClipboardData({
      data: mac,
      success: () => wx.showToast({ title: '已复制', icon: 'success' }),
    })
  },
})
