// miniprogram/pages/index/user/user.js

import api from "../../../utils/api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    avanter: '',
    rgwx: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (_options) {
    const { arg } = await api.getUserInfo()
    this.setData({
      name: arg.name,
      avanter: arg.avanter,
      rgwx: arg.rgtype === 'wx'
    })
    wx.setStorage({ key: 'userinfo', data: arg })
    wx.setNavigationBarTitle({ title: arg.name || arg.user })
  },
  // 解绑微信
  async unbindwx() {
    const { ok, msg } = await api.unbindwx()
    if (ok) {
      wx.reLaunch({ url: '/pages/index/index' })
    } else {
      wx.showModal({
        title: '操作失败',
        content: msg
      })
    }
  },
  //
  openSetting() {
    wx.openSetting({
      withSubscriptions: true,
      success(_res) {
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})