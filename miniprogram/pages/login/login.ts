// miniprogram/pages/login/login.js
import api from "../../utils/api";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img:"https://www.ladishb.com/upload/5y2wYWklE0usgYG0VwLTdRnc.png",
    userInfo: {} as WechatMiniprogram.UserInfo,
    tel: '',
    registerloading: false,
    loginloading: false,
    openid: '',
    accontUser: '',
    accontPasswd: ''
  },
  onLoad(opt: { openid: string; }) {
    this.setData({
      openid: opt.openid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 获取用户信息
  getUserInfo(_e: vantEvent) {
    (wx as any).getUserProfile({
      desc:'用于注册小程序',
      success:(info:{userInfo:WechatMiniprogram.UserInfo})=>{
        this.setData({
          userInfo: info.userInfo
        })
      }
    })
    /* this.setData({
      userInfo: e.detail.userInfo
    }) */
  },
  tabclick(event: vantEvent) {
    wx.setNavigationBarTitle({ title: event.detail.title })
  },
  // 获取用户手机号码
  async getphonenumber(e: vantEvent) {
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
      // 订阅消息id
      tmplIds: ['XPN75P-0F3so8dE__e5bxS9xznCyNGx4TKX0Fl-i_b4', '8NX6ji8ABlNAOEMcU7v2jtD4sgCB7NMHguWzxZn3HO4'],
      success: async (_res) => {
        this.setData({ registerloading: true })
        const { userInfo: { nickName, avatarUrl }, tel } = this.data
        const { ok, msg } = await api.registerUser({ user: this.data.openid, name: nickName, avanter: avatarUrl, tel })
        this.setData({ registerloading: false })
        if (!ok) {
          wx.showToast({ title: msg, icon: "none", duration: 5000 })
          // wx.redirectTo({ url: "/" })
        } else {
          wx.reLaunch({ url: '/pages/index/index' })
        }
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
