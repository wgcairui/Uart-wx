// miniprogram/pages/admin/devs/devs.ts
// 管理员端设备运行数据表（admin 简化版，不带 enum 操作 / 告警设置）
// 与 pages/index/devs/devs 强孪生（用同一个 v2/user API），但只读 + 跳转图表
// 视觉规范见 docs/style-guide.md

import { ObjectToStrquery, parseTime } from "../../../utils/util"
import api from "../../../utils/api"

Page({
  data: {
    mac: '',
    pid: '',
    mountDev: '',
    result: {} as Uart.queryResultSave,
    filter: '',
    protocol: '',
    Type: '',
  },

  onLoad: function (options: { mountDev?: string; mac?: string; DevMac?: string; pid?: string; protocol?: string; Type?: string }) {
    wx.setNavigationBarTitle({ title: options.mountDev || options.mac || '' })
    const DevMac = options.DevMac || ''
    const pid = options.pid || ''
    this.setData({
      mac: DevMac,
      pid,
      protocol: options.protocol,
      mountDev: options.mountDev,
      Type: options.Type,
    })

    if (DevMac && pid) {
      api.onMessage(DevMac + pid, () => {
        console.log('获取运行数据: ' + DevMac + pid)
        this.GetDevsRunInfo()
      })
    }
  },

  async onReady() {
    wx.showLoading({ title: '获取运行数据' })
    await this.GetDevsRunInfo()
    wx.hideLoading()
  },

  onPullDownRefresh: async function () {
    await this.GetDevsRunInfo()
    wx.stopPullDownRefresh()
  },

  async GetDevsRunInfo() {
    const { mac, pid, filter } = this.data
    if (!mac || !pid) {
      wx.hideLoading()
      return
    }
    const { code, data, message } = await api.getTerminalData(mac, pid)
    if (code === 200 && data.result) {
      const regStr = new RegExp(filter)
      data.result = data.result.filter((el: any) => !filter || regStr.test(el.name))
      data.time = parseTime(data.time)
      this.setData({ result: data })
    } else {
      wx.showModal({ title: '错误', content: message || '获取运行数据失败', showCancel: false })
    }
  },

  // 筛选参数
  onFilterInput(e: WechatMiniprogram.Input) {
    const filter = e.detail.value
    const regStr = new RegExp(filter)
    const result = (this.data.result as any).result?.filter((el: any) => regStr.test(el.name))
    this.setData({ filter, 'result.result': result })
  },

  // 导航到图表
  toline(e: WechatMiniprogram.TouchEvent) {
    const name = (e.currentTarget.dataset as any).name as string
    const item = (this.data.result as any).result?.find((el: any) => el.name === name) as any
    const unit = item?.unit || ''
    const url = '/pages/index/line/line' + ObjectToStrquery({
      name,
      mac: this.data.mac,
      pid: this.data.pid,
      unit,
      type: 'wx',
    })
    console.log(url)
    wx.navigateTo({ url })
  },
})
