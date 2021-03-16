import { SubscribeMessage } from "../../utils/util";
// miniprogram/pages/login/login.js
import api from "../../utils/api";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // img:"https://www.ladishb.com/upload/5y2wYWklE0usgYG0VwLTdRnc.png",
    userInfo: {
      avatarUrl: "https://www.ladishb.com/upload/5y2wYWklE0usgYG0VwLTdRnc.png",
    } as WechatMiniprogram.UserInfo,
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
  getUserInfo() {
    wx.getUserProfile({
      desc: '用于注册小程序',
      success: (info: { userInfo: WechatMiniprogram.UserInfo }) => {
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
    if (!e.detail.encryptedData) return
    wx.showLoading({ title: '获取手机号' })
    const telObj = await api.getphonenumber<any>({ openid: this.data.openid, encryptedData: e.detail.encryptedData, iv: e.detail.iv })
    const tel = telObj.arg.phoneNumber
    this.setData({
      tel,
      "userInfo.nickName": this.data.userInfo.nickName || 'user' + tel.slice(-4)
    })
    wx.hideLoading()
  },
  // 注册用户
  async register() {
    await SubscribeMessage(['注册成功提醒', '设备告警提醒'])
    this.setData({ registerloading: true })
    const { userInfo: { nickName, avatarUrl }, tel } = this.data
    const { ok, msg } = await api.registerUser({ user: this.data.openid, name: nickName, avanter: avatarUrl, tel })
    this.setData({ registerloading: false })
    if (!ok) {
      wx.showModal({ title: msg, icon: "none", duration: 5000 })
    } else {
      wx.reLaunch({ url: '/pages/index/index' })
    }

  },
  // 登录
  async login() {
    await SubscribeMessage(['设备告警提醒'])
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
