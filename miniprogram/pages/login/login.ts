// miniprogram/pages/login/login.js
const app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (_options) {
    // get userlogin
    wx.login({
      success:res=>{
        console.log(res);
        wx.getUserInfo({
          success:res=>{
            console.log(res);
            
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo:res.userInfo,
              hasUserInfo: true,
            })
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }
          }
        })
      },
      fail:()=>{
        wx.showModal({
          title:'登录失败',
          content:"小程序登录需要微信登录授权"
        })
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