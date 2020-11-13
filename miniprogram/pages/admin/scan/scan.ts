import api from "../../../utils/api"
Page({
  data: {
    mac: '',
    terminal: {
      name: '',
      mountNode: '',
      mountDevs: [] as TerminalMountDevs[],
      uptime:''
    } as Terminal
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
    wx.showLoading({title:'查询中'})
    const { ok, arg } = await api.getDTUInfo(this.data.mac)
    wx.hideLoading()
    if (ok) {
      this.setData({
        terminal: arg
      })
    } else {
      wx.showModal({
        title: 'search',
        content: '此设备没有注册，请核对设备是否在我司渠道购买'
      })
    }
  },
  // 绑定设备
  async bindDev() {
    const { ok, msg } = await api.bindDev(this.data.mac)
    if (ok) {
      wx.showModal({
        title: 'bind success',
        content: `绑定DTU:${this.data.mac} 成功，是否现在添加挂载设备？`,
        success(res) {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/index/manageDev/manageDev' })
          }
        }
      })
    } else {
      wx.showModal({
        title: 'bind error',
        content: `绑定DTU:${this.data.mac} 失败，tip:${msg}`,
      })
    }
  }
})