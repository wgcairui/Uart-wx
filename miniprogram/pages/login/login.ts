// miniprogram/pages/login/login.js
import api from "../../utils/api";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {} as WechatMiniprogram.UserInfo,
    tel: '',
    registerloading: false,
    loginloading: false,
    openid: '',
    accontUser: '',
    accontPasswd: ''
  },
  onLoad(opt) {
    this.setData({
      openid: opt.openid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 获取用户信息
  getUserInfo(e: vantEvent) {
    this.setData({
      userInfo: e.detail.userInfo
    })
  },
  tabclick(event: vantEvent) {
    wx.setNavigationBarTitle({ title: event.detail.title })
  },
  // 获取用户手机号码
  async getphonenumber(e: any) {
    wx.showLoading({ title: '获取手机号' })
    const telObj = await api.getphonenumber<any>({ openid: this.data.openid, encryptedData: e.detail.encryptedData, iv: e.detail.iv })
    this.setData({
      tel: telObj.arg.phoneNumber//res.arg.countryCode + res.arg.phoneNumber
    })
    wx.hideLoading()
  },
  // 注册用户
  async register() {
    wx.requestSubscribeMessage({
      tmplIds: ['XPN75P-0F3so8dE__e5bxS9xznCyNGx4TKX0Fl-i_b4', '8NX6ji8ABlNAOEMcU7v2jtD4sgCB7NMHguWzxZn3HO4'],
      success: async (_res) => {
        this.setData({ registerloading: true })
        const { userInfo: { nickName, avatarUrl }, tel } = this.data
        const { ok, msg } = await api.registerUser({ user: this.data.openid, name: nickName, avanter: avatarUrl, tel })
        this.setData({ registerloading: false })
        if (!ok) {
          wx.showToast({ title: msg, icon: "none" })
          wx.redirectTo({ url: "/" })
        } else {
          wx.reLaunch({ url: '/pages/index/index' })
        }
        wx.showToast({ title: msg })
      }
    })
  },
  // 登录
  async login() {
    const { accontUser, accontPasswd, openid } = this.data
    this.setData({ loginloading: true })
    const { ok, msg } = await api.userlogin({ avanter: this.data.userInfo.avatarUrl, openid, user: accontUser, passwd: accontPasswd })
    this.setData({ loginloading: false })
    if (ok) {
      wx.reLaunch({ url: '/pages/index/index' })
    } else {
      wx.showModal({
        title: '登录错误',
        content: msg
      })
    }
  }
})
