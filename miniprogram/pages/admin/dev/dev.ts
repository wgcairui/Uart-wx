
import { parseTime } from "../../../utils/util"
import api from "../../../utils/api"
Page({
  data: {
    id: '',
    dev: {
      id: '',
      mountDev: '',
      Type: '',
      pid: 0,
      protocol: ''
    } as Uart.registerDev
  },
  // 调用微信api，扫描DTU条形码
  async scanMac() {
    const scanResult = await wx.scanCode({})
    this.setData({
      id: scanResult.result
    })
    this.scanRequst()
  },
  // 查询DTU设备信息
  async scanRequst() {
    wx.showLoading({ title: '查询中' })
    const { code, data } = await api.getRegisterDev(this.data.id)
    wx.hideLoading()
    if (code && data) {
      (data as any).timeStamp = parseTime((data as any).timeStamp)
      this.setData({
        dev: data
      })
    } else {
      wx.showModal({
        title: 'search',
        content: '此设备没有注册，请核对设备是否在我司渠道购买'
      })
    }
  },

  // 删除注册设备
  async delRegisterDev() {
    const { confirm } = await wx.showModal({
      title: '删除设备',
      content: `确定删除${this.data.dev.id} ???`
    })

    if (confirm) {
      wx.showLoading({ title: "loading" })
      const { code, msg } = await api.delRegisterDev(this.data.dev.id)
      wx.hideLoading()
      if (code) {
        wx.showModal({
          title: 'success',
          content: '已删除',
          success() {
            wx.navigateBack()
          }
        })
      } else {
        wx.showModal({
          title: 'error',
          content: msg
        })
      }
    }
  }
})