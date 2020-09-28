// miniprogram/pages/login/login.js
const app = getApp<IAppOption>()
import * as computed from "miniprogram-computed"
import api from "../../utils/api";
Page({
  behaviors: [computed],
  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isregister: false,
    userInfo: {} as WechatMiniprogram.UserInfo,
    tel: '',
    registerloading: false,
    openid: ''
  },
  onLoad(opt) {
    this.setData({
      openid: opt.openid
    })
  },

  computed: {
    isR(data: any) {
      const istel = /^1(3|4|5|7|8)\d{9}$/.test(data.tel)
      return istel
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 获取用户信息
  getUserInfo(e: any) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
  // 获取用户手机号码
  async getphonenumber(e: any) {
    const telObj = await api.getphonenumber<any>({ encryptedData: e.detail.encryptedData, iv: e.detail.iv })
    this.setData({
      tel: telObj.arg.phoneNumber//res.arg.countryCode + res.arg.phoneNumber
    })
  },
  // 注册用户
  register() {
    const { userInfo: { nickName, avatarUrl }, tel } = this.data
    api.registerUser({ user: this.data.openid, name: nickName, avanter: avatarUrl, tel }).then(res => {
      if (res?.ok !== 1) {
        wx.showToast({ title: res as any, icon: "none" })
        return
      }
      wx.showToast({ title: res.msg })
      wx.redirectTo({ url: "/" })
    })
    wx.navigateTo({ url: '/pages/index/index' })
  }
})