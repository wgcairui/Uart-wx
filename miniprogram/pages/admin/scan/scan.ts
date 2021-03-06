import api from "../../../utils/api"
Page({
  data: {
    mac: '',
    terminal: {
      name: '',
      mountNode: '',
      mountDevs: [] as TerminalMountDevs[],
      uptime: ''
    } as Terminal,
    remoteUrl: ''
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
  },
  //远程调试设备
  async iotRemoteUrl() {
    const url = await api.iotRemoteUrl(this.data.mac) as any as string
    if (!url) {
      wx.showModal({
        title: '获取失败',
        content: '设备未连接到iot server中心'
      })
    } else {
      wx.showModal({
        title: '调试地址',
        content: url,
        success() {
          wx.setClipboardData({
            data: url,
            success() {
              wx.showToast({
                title: '已复制网址到剪切板'
              })
            }
          })
        }
      })
    }
  }
})