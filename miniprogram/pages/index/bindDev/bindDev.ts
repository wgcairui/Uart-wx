import api from "../../../utils/api"

Page({
  data: {
    mac: '',
    terminal: {
      name: '',
      mountNode: '',
      mountDevs: [] as Uart.TerminalMountDevs[]
    } as Uart.Terminal
  },
  // 调用微信api，扫描DTU条形码
  async scanMac() {
    const scanResult = await wx.scanCode({})
    this.setData({
      mac: scanResult.result
    })
    this.scanRequst()
  },
  // 查询DTU设备信息
  async scanRequst() {
    wx.showLoading({ title: '查询中' })
    const { code, data } = await api.getTerminalOnline(this.data.mac)
    wx.hideLoading()
    if (code && data) {
      this.setData({
        terminal: data
      })
    } else {
      wx.showModal({
        title: 'search',
        content: '设备未注册或未上线，请核对设备是否在我司渠道购买'
      })
    }
  },
  // 绑定设备
  async bindDev() {
    wx.showLoading({ title: '正在绑定' })
    const { code, msg } = await api.addUserTerminal(this.data.mac)
    if (code) {
      const r = await api.getTerminal(this.data.terminal.DevMac)
      wx.hideLoading()
      if (r.data?.mountDevs?.length > 0) {
        wx.navigateBack()
      } else {
        wx.showModal({
          title: 'bind success',
          content: `绑定DTU:${this.data.mac} 成功，是否现在添加挂载设备？`,
          success: (res) => {
            const events = this.getOpenerEventChannel()
            if (res.confirm) {

              if (events) {
                events.emit("addSuccess", {})
                wx.navigateBack()
              }
              else wx.navigateTo({ url: '/pages/index/manageDev/manageDev' })
            } else {
              events.emit("addSuccess", {})
              wx.navigateBack()
            }
          }
        })
      }


    } else {
      wx.showModal({
        title: 'bind error',
        content: `绑定DTU:${this.data.mac} 失败，tip:${msg}`,
      })
    }
  }
})