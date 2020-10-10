// index.ts
import api from "../../utils/api";
// 获取应用实例
const { globalData } = getApp<IAppOption>()
Page({
  data: {
    // DTU设备信息
    DTUs: [] as Terminal[]
  },
  onLoad() {
    wx.login({
      success: res => {
        // 发送网络请求，获取在线账户
        {
          api.login({ js_code: res.code }).then(res => {
            if (res.ok) {
              globalData.user = res.arg.user
              globalData.userGroup = res.arg.userGroup
              globalData.userAvanter = res.arg.avanter
              globalData.userName = res.arg.name
              globalData.userTel = res.arg.tel
              this.bindDev()
              wx.switchTab({
                url:"/pages/index/user/user"
              })
            } else {
              wx.navigateTo({ url: "/pages/login/login?openid=" + res.arg.openid })
            }
          })
        }
      }
    })
  },
  // 获取用户绑定设备
  async bindDev() {
    const { ok, arg } = await api.getuserMountDev()
    if (ok) {
      this.setData({
        DTUs: arg.UTs
      })
      this.data.DTUs.forEach(el => {
        wx.setStorage({
          key: el._id,
          data: el
        })
      })
    } else {
      wx.showModal({
        title: '添加设备',
        content: '您还没有添加任何设备，请先添加设备',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/index/bindDev/bindDev' })
          }
        }
      })
    }
  },
  // 显示用户DTU参数
  showDTUInfo(event: vantEvent) {
    const dtus = this.data.DTUs
    const index = dtus.findIndex(el => el._id === event.target.id)
    const dtu = dtus[index]
    wx.navigateTo({ url: `/pages/index/dtu/dtu?id=${dtu._id}` })
  },
  // 查看设备数据
  showMountDevData(event: vantEvent) {
    const [id, pid, mountDev] = event.target.id.split("-")
    const { DevMac } = wx.getStorageSync(id) as Terminal
    wx.navigateTo({
      url: '/pages/index/devs/devs?mac=' + DevMac + '&pid=' + pid + '&mountDev=' + mountDev
    })
  },
  //
  async onPullDownRefresh() {
    await this.bindDev()
    wx.stopPullDownRefresh()
  }
})
