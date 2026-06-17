// miniprogram/pages/admin/registerDev/registerDev.ts
// 管理员批量登记 LADS 设备（IMEI + 设备类型/型号/协议 + 设备地址）
// 视觉规范见 docs/style-guide.md，UI 模式与 pages/index/manageDev/addMountDev 同构

import api from "../../../utils/api"

interface PickerOption {
  text: string
  value: string | number
}

Page({
  data: {
    // 设备类型（写死 5 类）
    devTypes: [
      { text: 'UPS',     value: 'UPS' },
      { text: '空调',    value: '空调' },
      { text: '电量仪',  value: '电量仪' },
      { text: '温湿度',  value: '温湿度' },
      { text: 'IO',      value: 'IO' },
    ] as PickerOption[],
    devTypeIndex: 0,

    // 设备型号（按类型拉）
    devModals: [] as PickerOption[],
    devModalIndex: -1,

    // 设备协议（按型号拉）
    devProtocols: [] as PickerOption[],
    devProtocolIndex: -1,

    // 设备地址（pid：手输 1-255 的 number）
    pid: 1 as number,

    // 当前 IMEI 输入
    id: '',

    // 已扫/录入的 IMEI 列表
    ids: [] as string[],

    // 派生
    isReady: false,
    showAddBtn: false,
  },

  onLoad: function () {
    // 默认选第一个设备类型并拉型号
    this.onTypeChange({ detail: { value: 0 } } as any)
  },

  /* === IMEI 输入 === */
  onIdInput(e: WechatMiniprogram.Input) {
    const id = e.detail.value
    this.setData({ id, showAddBtn: id.length > 0 })
  },

  onIdConfirm() {
    this.addId()
  },

  // 扫 IMEI
  async scanMac() {
    try {
      const scanResult = await wx.scanCode({})
      this.setData({ id: scanResult.result, showAddBtn: true })
      this.addId()
    } catch (e) {
      // 用户取消扫码
    }
  },

  /**
   * 把当前 id 加入 ids 列表（先去重，再做一次重复注册检查）
   */
  async addId() {
    const id = (this.data.id || '').trim()
    if (!id) return
    if (this.data.ids.includes(id)) {
      wx.showToast({ title: '已存在', icon: 'none' })
      return
    }
    wx.showLoading({ title: '查询中' })
    const r = await api.getRegisterDev(id)
    wx.hideLoading()
    if (r.code === 200 && r.data) {
      wx.showModal({
        title: '重复注册',
        content: `设备 ${r.data.id} / ${r.data.mountDev} 已被注册`,
        showCancel: false,
      })
      return
    }
    this.setData({
      ids: [...this.data.ids, id],
      id: '',
      showAddBtn: false,
    })
  },

  // 删除 IMEI
  rmid(e: WechatMiniprogram.TouchEvent) {
    const key = (e.currentTarget.dataset as any).key as string
    wx.showModal({
      title: '删除 IMEI',
      content: `确定删除 ${key}?`,
      success: (res) => {
        if (res.confirm) {
          this.setData({ ids: this.data.ids.filter(el => el !== key) })
          this.rebuildReady()
        }
      },
    })
  },

  /* === 设备类型 / 型号 / 协议 picker === */
  async onTypeChange(e: WechatMiniprogram.PickerChange) {
    const index = e.detail.value as unknown as number
    const value = this.data.devTypes[index]?.value as string
    this.setData({ devTypeIndex: index })
    const { data } = await api.getDevTypes(value)
    const devModals = (data || []).map((el: any) => ({ text: el.DevModel, value: el.DevModel }))
    this.setData({
      devModals,
      devModalIndex: devModals.length > 0 ? 0 : -1,
      devProtocols: [],
      devProtocolIndex: -1,
    })
    if (devModals.length > 0) {
      await this.onModalChange({ detail: { value: 0 } } as any)
    } else {
      this.rebuildReady()
    }
  },

  async onModalChange(e: WechatMiniprogram.PickerChange) {
    const index = e.detail.value as unknown as number
    const devModal = this.data.devModals[index]?.value as string
    this.setData({ devModalIndex: index })
    const { data } = await api.getDevTypes(this.data.devTypes[this.data.devTypeIndex].value as string)
    const dev = (data || []).find((el: any) => el.DevModel === devModal)
    const devProtocols = (dev?.Protocols || []).map((el: any) => ({
      text: el.Protocol,
      value: el.Protocol,
    }))
    this.setData({
      devProtocols,
      devProtocolIndex: devProtocols.length > 0 ? 0 : -1,
    })
    this.rebuildReady()
  },

  onProtocolChange(e: WechatMiniprogram.PickerChange) {
    const index = e.detail.value as unknown as number
    this.setData({ devProtocolIndex: index })
    this.rebuildReady()
  },

  // pid 改动（手输）
  onPidInput(e: WechatMiniprogram.Input) {
    const v = Number(e.detail.value)
    this.setData({ pid: isNaN(v) ? 1 : v })
    this.rebuildReady()
  },

  /**
   * 派生：是否就绪（ids 非空 + 所有 picker 选好 + pid 合法）
   */
  rebuildReady() {
    const { ids, devTypeIndex, devModalIndex, devProtocolIndex, pid } = this.data
    const isReady =
      ids.length > 0 &&
      devTypeIndex >= 0 &&
      devModalIndex >= 0 &&
      devProtocolIndex >= 0 &&
      pid >= 0 && pid <= 255
    this.setData({ isReady })
  },

  // 提交
  async submit() {
    if (!this.data.isReady) return
    const { devTypes, devTypeIndex, devModals, devModalIndex, devProtocols, devProtocolIndex, pid, ids } = this.data
    const mountDev: Uart.TerminalMountDevs = {
      Type: devTypes[devTypeIndex].value as string,
      mountDev: devModals[devModalIndex].value as string,
      pid,
      protocol: devProtocols[devProtocolIndex].value as string,
    }
    const { confirm } = await wx.showModal({
      title: '登记设备',
      content: `本次提交 ${ids.length} 个 IMEI\n类型 ${mountDev.Type} · ${mountDev.mountDev} · ${mountDev.protocol} · ${mountDev.pid}`,
    })
    if (!confirm) return
    wx.showLoading({ title: '正在登记' })
    const r = await api.addRegisterDev(ids, mountDev)
    wx.hideLoading()
    if (r.code === 200) {
      wx.showModal({
        title: '提交成功',
        content: `成功注册 ${r.data?.length || ids.length} 个设备`,
        showCancel: false,
        success: () => {
          this.setData({ id: '', ids: [], showAddBtn: false })
          this.rebuildReady()
        },
      })
    } else {
      wx.showModal({ title: '提交失败', content: (r as any).message || '请稍后重试', showCancel: false })
    }
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
})
