// miniprogram/pages/admin/dev/dev.ts
// 管理员查询/删除 LADS 设备注册信息
// 视觉规范见 docs/style-guide.md

import { parseTime } from "../../../utils/util"
import api from "../../../utils/api"

interface InfoRow {
  label: string
  value: string
  empty?: boolean
}

Page({
  data: {
    id: '',
    dev: {
      id: '',
      mountDev: '',
      Type: '',
      pid: 0,
      protocol: '',
      timeStamp: '',
    } as Uart.registerDev,
    // 派生
    devInfo: [] as InfoRow[],
    hasDev: false,
  },

  onLoad() {},

  // 调用微信api，扫描设备条码
  async scanMac() {
    try {
      const scanResult = await wx.scanCode({})
      this.setData({ id: scanResult.result })
      this.scanRequst()
    } catch (e) {
      // 用户取消扫码
    }
  },

  onIdInput(e: WechatMiniprogram.Input) {
    this.setData({ id: e.detail.value })
  },

  // 查询设备信息
  async scanRequst() {
    if (!this.data.id) return
    wx.showLoading({ title: '查询中' })
    const { code, data } = await api.getRegisterDev(this.data.id)
    wx.hideLoading()
    if (code === 200 && data) {
      this.rebuildDev(data)
    } else {
      wx.showModal({
        title: '查询失败',
        content: '此设备没有注册，请核对设备是否在我司渠道购买',
        showCancel: false,
      })
      this.setData({ hasDev: false, devInfo: [] })
    }
  },

  /**
   * 派生设备信息卡数据
   */
  rebuildDev(data: Uart.registerDev) {
    const dev = {
      ...data,
      timeStamp: (data as any).timeStamp ? parseTime((data as any).timeStamp) : '',
    } as any
    const devInfo: InfoRow[] = [
      { label: 'ID',       value: dev.id || '—' },
      { label: '类型',     value: dev.Type || '—', empty: !dev.Type },
      { label: '设备',     value: dev.mountDev || '—', empty: !dev.mountDev },
      { label: '协议',     value: dev.protocol || '—', empty: !dev.protocol },
      { label: '地址',     value: dev.pid != null ? String(dev.pid) : '—' },
      { label: '注册时间', value: dev.timeStamp || '—', empty: !dev.timeStamp },
    ]
    this.setData({ dev, devInfo, hasDev: true })
  },

  // 删除注册设备
  async delRegisterDev() {
    const { confirm } = await wx.showModal({
      title: '删除设备',
      content: `确定删除 ${this.data.dev.id} ?`,
    })
    if (!confirm) return
    wx.showLoading({ title: '正在删除' })
    const { code, message } = await api.delRegisterDev(this.data.dev.id)
    wx.hideLoading()
    if (code === 200) {
      wx.showToast({ title: '已删除', icon: 'success' })
      setTimeout(() => wx.navigateBack(), 600)
    } else {
      wx.showModal({ title: '删除失败', content: message || '请稍后重试', showCancel: false })
    }
  },
})
