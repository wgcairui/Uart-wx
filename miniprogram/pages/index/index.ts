// index.ts
import { login } from "../../utils/util"
// 获取应用实例
const app = getApp<IAppOption>()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  // 事件处理函数
  bindViewTap() {
  },
  onLoad() {
    wx.login({
      success: res => {
        // 获取用户头像昵称
        {
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true,
              })
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }
            },
            fail: () => {
              wx.showModal({
                title: '授权错误',
                content: "小程序登录需要微信昵称头像"
              })
            }
          })
        }
        // 发送网络请求，获取在线账户
        {
          login({ js_code: res.code }).then(res => {
            if (res.ok) {
              app.globalData.user = res.arg.user
              app.globalData.userGroup = res.arg.userGroup
            } else {
              app.globalData.openid = res.arg.openid
              wx.showToast({ title: res.msg, icon: "none", duration: 3000 })
            }
          })
        }
      }
    })
  },
  getUserInfo(e: any) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
})
