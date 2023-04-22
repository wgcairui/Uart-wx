import api from "../../utils/api";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    // img:"https://www.ladishb.com/upload/5y2wYWklE0usgYG0VwLTdRnc.png",
    userInfo: {
      avatarUrl: "https://www.ladishb.com/upload/11122020__LADS108.png",
    } as WechatMiniprogram.UserInfo,
    tel: '',
    registerloading: false,
    loginloading: false,
    openid: '',
    unionid: '',
    accontUser: '',
    accontPasswd: ''
  },
  onLoad(opt: { openid: string; unionid: string }) { 
    this.setData({
      openid: opt.openid,
      unionid: opt.unionid
    })
  },

  /**
   * 获取用户信息
   */
  async getUserInfo() {
    const s = await wx.getUserProfile({
      desc: '用于注册小程序'
    })
    if (s.userInfo) {
      this.setData({
        userInfo: s.userInfo
      })

    }
  },
  tabclick(event: vantEvent) {
    wx.setNavigationBarTitle({ title: event.detail.title })
  },
  // 获取用户手机号码
  async getphonenumber(e: vantEvent) {
    if (!e.detail.encryptedData) return
    wx.showLoading({ title: '获取手机号' })
    const { data } = await api.getphonenumber({ openid: this.data.openid, encryptedData: e.detail.encryptedData, iv: e.detail.iv })
    const tel = data.phoneNumber
    this.setData({
      tel,
      "userInfo.nickName": this.data.userInfo.nickName || 'user' + tel.slice(-4)
    })
    wx.hideLoading()

  },
  // 注册用户
  async register() {
    // await this.getUserInfo()
    const tel = this.data.tel
    if (!tel || !/^(13[0-9]|15[0-9]|166|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/.test(tel.toString())) {
      wx.showToast({ title: "需要手机号码", icon: "error" })
      return
    }
    // await SubscribeMessage(['注册成功提醒'])
    this.setData({ registerloading: true })
    const { userInfo: { nickName, avatarUrl }, unionid, openid } = this.data
    const { code, message } = await api.registerUser({ user: unionid, openid, name: nickName, avanter: avatarUrl || 'http://www.ladishb.com/upload/11122020__LADS108.png', tel })
    this.setData({ registerloading: false })
    if (!code) {
      wx.showModal({ title: message, icon: "none", duration: 5000 })
    } else {
      wx.reLaunch({ url: '/pages/index/index' })
    }

  },
  // 登录
  async login() {
    //await SubscribeMessage(['设备告警提醒'])
    const { accontUser, accontPasswd, openid, unionid } = this.data
    this.setData({ loginloading: true })
    const { code, msg } = await api.userlogin({ avanter: this.data.userInfo.avatarUrl, openid, unionid, user: accontUser, passwd: accontPasswd })
    this.setData({ loginloading: false })
    if (code) {
      wx.reLaunch({ url: '/pages/index/index' })
    } else {
      wx.showModal({
        title: '登录错误',
        content: msg,
        success: () => {
          this.setData({
            active: 0
          })
        }
      })
    }
  }
  ,
  trial() {
    this.setData({
      accontPasswd: '123456',
      accontUser: 'test'
    })
    this.login()
  }
})
