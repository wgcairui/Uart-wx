import api from "../../../utils/api"

Page({
  data: {
    mac: '714048953250',
    terminal: {
      name: '',
      mountNode: '',
      mountDevs: [] as TerminalMountDevs[]
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
    const { ok, arg } = await api.getDTUInfo(this.data.mac)
    if (ok) {
      this.setData({
        terminal: arg
      })
      console.log(this.data.terminal);

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
        content: `绑定DTU:${this.data.mac} 成功，是否返回到主页？`,
        success(res) {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/index/index' })
          }
        }
      })
    } else {
      wx.showModal({
        title: 'bind error',
        content: `绑定DTU:${this.data.mac} 失败，tip:${msg}`,
      })
    }
  },
  //
  onClickIcon(event:vantEvent){
    
  }
})