// miniprogram/pages/login/login.js
const app = getApp<IAppOption>()
import * as computed from "miniprogram-computed"
import { getphonenumber, registerUser } from "../../utils/util";
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
    mail: 'wgcairui@icloud.com',
    registerloading: false
  },

  computed: {
    isR(data: any) {
      const istel = /^1(3|4|5|7|8)\d{9}$/.test(data.tel)
      const ismail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(data.mail)
      return istel && ismail
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
  getphonenumber(e: any) {
    getphonenumber({ encryptedData: e.detail.encryptedData, iv: e.detail.iv }).then(res => {
      this.setData({
        tel: res.arg.phoneNumber//res.arg.countryCode + res.arg.phoneNumber
      })
    }).catch(e => {
      console.log(e);
    })
  },
  // 注册用户
  register() {
    const { userInfo: { nickName, avatarUrl }, tel, mail } = this.data
    registerUser({ user: app.globalData.openid, name: nickName, avanter: avatarUrl, tel, mail }).then(res => {
      if(res?.ok !== 1){
        wx.showToast({title:res as any,icon:"none"})
        return
      }
      wx.showToast({title:res.msg})
      wx.redirectTo({url:"/"})
    }) 
    wx.navigateTo({url: '/pages/index/index'})
  }
})