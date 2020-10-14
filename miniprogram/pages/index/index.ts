// index.ts
import { ObjectToStrquery } from "../../utils/util";
import api from "../../utils/api";
// 获取应用实例
Page({
  data: {
    // DTU设备信息
    DTUs: [] as Terminal[]
  },
  onLoad() {
    wx.login({
      success: res => {
        // 发送网络请求，获取在线账户
        api.login({ js_code: res.code }).then(res => {
          if (res.ok) this.start()
          else wx.navigateTo({ url: "/pages/login/login?openid=" + res.arg.openid })
        })
      }
    })
  },
  // 登录运行
  start() {
    // 获取未读取的alarm数量
    api.getAlarmunconfirmed()
    this.bindDev()
    wx.navigateTo({
      url: '/pages/index/alarmSetting/alarmSetting?type=2&protocol=P01'
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
  showDTUInfo(event: vantEvent<string>) {
    wx.navigateTo({ url: `/pages/index/dtu/dtu?id=${event.currentTarget.dataset.item}` })
  },
  // 查看设备数据
  showMountDevData(event: vantEvent<TerminalMountDevs>) {
    const { pid, mountDev, protocol } = event.currentTarget.dataset.item
    const id = event.currentTarget.dataset.id
    const { DevMac } = wx.getStorageSync(id) as Terminal
    console.log('/pages/index/devs/devs' + ObjectToStrquery({ pid: String(pid), mountDev, protocol, DevMac }));

    wx.navigateTo({
      url: '/pages/index/devs/devs' + ObjectToStrquery({ pid: String(pid), mountDev, protocol, DevMac })
    })
  },
  //mac=98D863CC870D&pid=0&mountDev=G2K
  async onPullDownRefresh() {
    await this.bindDev()
    wx.stopPullDownRefresh()
  }
})
