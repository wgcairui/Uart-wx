// miniprogram/pages/admin/scan/scan.ts
// 管理员扫 DTU 条形码 → 查询透传DTU详细信息 + AT 指令 / 远程调试 / 初始化
// 视觉规范见 docs/style-guide.md

import { ObjectToStrquery } from "../../../utils/util"
import api from "../../../utils/api"

interface InfoRow {
  label: string
  value: string
  empty?: boolean
}

interface MountDevCard {
  type: string
  mountDev: string
  pid: string | number
  protocol: string
  bindDev: string
  online: boolean
  onlineLabel: string
  raw: Uart.TerminalMountDevs
}

Page({
  data: {
    mac: '',
    macs: [] as string[],
    terminal: {
      name: '',
      DevMac: '',
      mountNode: '',
      uptime: '',
      AT: false,
      jw: '',
      port: 0,
      uart: '',
      signal: 0,
      remark: '',
      online: false,
      onlineLabel: '离线',
      mountDevs: [] as Uart.TerminalMountDevs[],
      iccidInfo: null as any,
    } as Uart.Terminal & { onlineLabel: string },

    // 派生
    terminalInfo: [] as InfoRow[],
    iccidInfo: [] as InfoRow[],
    iccidFlowPercent: 0,
    hasIccid: false,
    mountDevCards: [] as MountDevCard[],

    // 操作按钮区
    uarts: ['2400,8,1,NONE,NFC', '4800,8,1,NONE,HD', '9600,8,1,NONE,HD', '19200,8,1,NONE,HD', '115200,8,1,NONE,HD'],
  },

  onLoad() {
    wx.getStorage({
      key: "macHis",
      success: (res) => {
        this.setData({ macs: res.data || [] })
      }
    })
  },

  // 调用微信api，扫描DTU条形码
  async scanMac() {
    const scanResult = await wx.scanCode({})
    this.setData({ mac: scanResult.result })
    this.scanRequst()
  },

  // 输入框回车
  onMacInput(e: WechatMiniprogram.Input) {
    this.setData({ mac: e.detail.value })
  },

  // 查询DTU设备信息
  async scanRequst() {
    if (!this.data.mac) return
    wx.showLoading({ title: '查询中' })
    const { code, data } = await api.getRootTerminal(this.data.mac)
    wx.hideLoading()
    if (code === 200 && data) {
      this.addHis(data.DevMac)
      this.rebuildTerminal(data)
      api.onMessage<string>('MacUpdate' + data.DevMac, () => {
        console.log(`listen MacUpdate, mac:${data.DevMac}`)
        this.scanRequst()
      })
    } else {
      wx.showModal({
        title: '查询失败',
        content: '此设备没有注册，请核对设备是否在我司渠道购买',
        showCancel: false,
      })
    }
  },

  /**
   * 点击历史记录 chip 查询
   */
  search(e: WechatMiniprogram.TouchEvent) {
    this.setData({ mac: (e.currentTarget as any).id })
    this.scanRequst()
  },

  /**
   * 添加历史记录（最多 6 个）
   */
  addHis(mac: string) {
    const macSet = new Set([mac, ...this.data.macs])
    if (macSet.size > 6) {
      const arr = Array.from(macSet)
      this.data.macs = arr.slice(0, 6)
    }
    const list = Array.from(macSet).slice(0, 6)
    this.setData({ macs: list })
    wx.setStorage({ key: 'macHis', data: list })
  },

  /**
   * 派生 terminal 信息卡数据
   */
  rebuildTerminal(data: Uart.Terminal) {
    const terminal = {
      ...data,
      onlineLabel: data.online ? '在线' : '离线',
    } as any
    const terminalInfo: InfoRow[] = [
      { label: 'IMEI',     value: data.DevMac || '—' },
      { label: 'DTU 名称', value: data.name || '—' },
      { label: '接入节点', value: data.mountNode || '—' },
      { label: '上线时间', value: data.uptime || '—' },
      { label: 'AT 指令',  value: data.AT ? '支持' : '不支持' },
      { label: 'GPS',      value: data.jw || '—' },
      { label: 'Port',     value: data.port ? String(data.port) : '—' },
      { label: '通讯',     value: data.uart || '—' },
      { label: '信号强度', value: data.signal != null ? `> ${data.signal}` : '—' },
      { label: '备注',     value: data.remark || '—', empty: !data.remark },
      { label: '挂载设备', value: `${(data.mountDevs || []).length} 个` },
    ]
    // 物联卡信息
    const icc = (data as any).iccidInfo
    let iccidInfo: InfoRow[] = []
    let iccidFlowPercent = 0
    const hasIccid = Boolean(icc && icc.statu)
    if (hasIccid) {
      const total = Number(icc.flowResource) || 0
      const used = Number(icc.flowUsed) || 0
      iccidFlowPercent = total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0
      iccidInfo = [
        { label: '起始日期',   value: icc.validDate || '—' },
        { label: '结束日期',   value: icc.expireDate || '—' },
        { label: '全部流量',   value: total ? `${(total / 1024).toFixed(2)} MB` : '—' },
        { label: '已使用流量', value: used  ? `${(used  / 1024).toFixed(2)} MB` : '—' },
        { label: '使用比例',   value: `${iccidFlowPercent}%` },
        { label: '套餐',       value: icc.resName || '—' },
      ]
    }

    // 挂载设备卡（每项派生 onlineLabel）
    const mountDevCards: MountDevCard[] = (data.mountDevs || []).map((el: any) => ({
      type: el.Type || '—',
      mountDev: el.mountDev || '—',
      pid: el.pid,
      protocol: el.protocol || '—',
      bindDev: el.bindDev || '—',
      online: Boolean(el.online),
      onlineLabel: el.online ? '在线' : '离线',
      raw: el,
    }))

    this.setData({
      mac: data.DevMac,
      terminal,
      terminalInfo,
      iccidInfo,
      iccidFlowPercent,
      hasIccid,
      mountDevCards,
    })
  },

  // 初始化 DTU
  async initTerminal() {
    const { confirm } = await wx.showModal({
      title: '初始化 ' + this.data.terminal.name,
      content: '初始化操作不可逆，会清除 DTU 绑定的设备信息、告警信息，且只能清除未被绑定的 DTU!!!',
    })
    if (!confirm) return
    wx.showLoading({ title: '正在初始化…' })
    const { code, data, message } = await api.initTerminal(this.data.terminal.DevMac)
    wx.hideLoading()
    if (code === 200) {
      wx.showModal({ title: '完成', content: `耗时 ${data}ms`, showCancel: false })
      this.scanRequst()
    } else {
      wx.showModal({ title: '初始化失败', content: message || '请稍后重试', showCancel: false })
    }
  },

  /**
   * 修改波特率
   */
  async modifyUart() {
    if (!this.data.terminal.DevMac) return
    let d: WechatMiniprogram.ShowActionSheetSuccessCallbackResult
    try {
      d = await wx.showActionSheet({ itemList: this.data.uarts })
    } catch (e) {
      return
    }
    const uart = `+++AT+UART=1,` + this.data.uarts[d.tapIndex]
    wx.showLoading({ title: '正在修改' })
    const { code, data, message } = await api.sendATInstruct(this.data.terminal.DevMac, uart)
    wx.hideLoading()
    if (code === 200 && data?.ok) {
      wx.showToast({ title: '已修改', icon: 'success' })
      this.setData({ "terminal.uart": this.data.uarts[d.tapIndex] })
    } else {
      wx.showModal({ title: '操作失败', content: data?.msg || message || '请稍后重试', showCancel: false })
    }
  },

  // 重启 DTU
  async resetDtu() {
    const { confirm } = await wx.showModal({ title: '重启 DTU', content: '确定现在重启 DTU 吗?' })
    if (!confirm) return
    wx.showLoading({ title: '正在重启' })
    const uart = `+++AT+Z`
    const { code, data, message } = await api.sendATInstruct(this.data.terminal.DevMac, uart)
    wx.hideLoading()
    if (code === 200) {
      wx.showToast({ title: data?.msg || '已重启', icon: 'success' })
    } else {
      wx.showModal({ title: '重启失败', content: message || '请稍后重试', showCancel: false })
    }
  },

  /**
   * 绑定设备 id：扫一个设备编号，确认后挂到当前 DTU
   */
  async bindDevId() {
    let scanResult: WechatMiniprogram.ScanCodeSuccessCallbackResult
    try {
      scanResult = await wx.scanCode({})
    } catch (e) {
      return
    }
    wx.showLoading({ title: '查询中' })
    const t = await api.getTerminal(scanResult.result)
    if (t.data) {
      wx.hideLoading()
      wx.showModal({
        title: '已被绑定',
        content: `${scanResult.result} 已被 DTU: ${t.data.DevMac} 绑定`,
        showCancel: false,
      })
      return
    }
    const { code, data } = await api.getRegisterDev(scanResult.result)
    wx.hideLoading()
    if (code === 200 && data) {
      const { confirm } = await wx.showModal({
        title: '确认绑定信息',
        content: `类型: ${data.Type}\n设备: ${data.mountDev}\n协议: ${data.protocol}\n地址: ${data.pid}`,
      })
      if (!confirm) return
      wx.showLoading({ title: '正在绑定' })
      const r = await api.addTerminalMountDev(this.data.terminal.DevMac, {
        mountDev: data.mountDev,
        Type: data.Type,
        protocol: data.protocol,
        pid: data.pid,
        bindDev: scanResult.result,
      } as any)
      wx.hideLoading()
      if (r.code === 200) {
        wx.showToast({ title: '绑定成功', icon: 'success' })
        this.scanRequst()
      } else {
        wx.showModal({ title: '绑定失败', content: (r as any).message || '请稍后重试', showCancel: false })
      }
    } else {
      wx.showModal({
        title: '未注册',
        content: `${scanResult.result} 未注册，请先注册后绑定`,
        showCancel: false,
      })
    }
  },

  // 查看挂载设备的运行数据
  see(e: WechatMiniprogram.TouchEvent) {
    const item = (e.currentTarget.dataset as any).item as Uart.TerminalMountDevs
    wx.navigateTo({
      url: '/pages/admin/devs/devs' + ObjectToStrquery({
        pid: String(item.pid),
        mountDev: item.mountDev,
        protocol: item.protocol,
        DevMac: this.data.terminal.DevMac,
        Type: item.Type,
      }),
    })
  },

  // 删除挂载的设备
  async rmBind(e: WechatMiniprogram.TouchEvent) {
    const item = (e.currentTarget.dataset as any).item as Uart.TerminalMountDevs
    const { confirm } = await wx.showModal({
      title: '删除挂载设备',
      content: `确定删除 ${item.mountDev}?`,
    })
    if (!confirm) return
    const { code, message } = await api.delTerminalMountDev(this.data.terminal.DevMac, item.pid)
    if (code === 200) {
      wx.showToast({ title: '已删除', icon: 'success' })
      this.scanRequst()
    } else {
      wx.showModal({ title: '删除失败', content: message || '请稍后重试', showCancel: false })
    }
  },

  // 远程调试
  async iotRemoteUrl() {
    const { code, data } = await api.iotRemoteUrl(this.data.mac)
    if (code !== 200) {
      wx.showModal({ title: '获取失败', content: '设备未绑定到 IOT 账号', showCancel: false })
      return
    }
    if (!/remote_code=$/.test(data)) {
      wx.showModal({
        title: '调试地址',
        content: data,
        confirmText: '复制',
        success: (res) => {
          if (res.confirm) {
            wx.setClipboardData({
              data,
              success: () => wx.showToast({ title: '已复制到剪贴板', icon: 'success' }),
            })
          }
        },
      })
    } else {
      wx.showModal({ title: '获取失败', content: '设备未连接到 IOT server 中心', showCancel: false })
    }
  },

  onPullDownRefresh: async function () {
    if (this.data.terminal.DevMac) {
      await this.scanRequst()
    }
    wx.stopPullDownRefresh()
  },
})
