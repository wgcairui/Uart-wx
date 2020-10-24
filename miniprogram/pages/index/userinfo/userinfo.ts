import api from "../../../utils/api"
import { RgexpMail, RgexpTel } from "../../../utils/util"

// miniprogram/pages/index/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    avanter: '',
    creatTime: "",
    modifyTime: "",
    user: "",
    tel: "",
    mail: "",
    company: "",
    address: "",
    rgtype: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (_options) {
    this.start()
  },
  //
  start() {
    wx.getStorage({
      key: 'userinfo',
      success: ({ data }: { data: UserInfo }) => {
        this.setData({
          avanter: data.avanter,
          name: data.name,
          creatTime: new Date(data.creatTime as any).toLocaleString(),
          modifyTime: new Date(data.modifyTime as any).toLocaleString(),
          mail: data.mail,
          tel: data.tel as any,
          user: data.user,
          company: data.company,
          address: data.address,
          rgtype: data.rgtype || 'web'
        })
      }
    })
  },
  //
  telChange(event: vantEvent) {
    const value = event.detail.value as string
    if (RgexpTel(value)) {
      api.modifyUserInfo("tel", value).then(({ ok, msg }) => {
        if (ok) {
          this.setData({
            tel: value
          })
          const userinfo = wx.getStorageSync('userinfo')
          wx.setStorage({
            key: 'userinfo',
            data: Object.assign(userinfo, { tel: value })
          })
        } else {
          wx.showModal({
            title: 'Error',
            content: msg
          })
        }

      })
    } else {
      wx.showModal({
        title: '值错误',
        content: "手机号码格式不正确,请重新输入"
      })
    }
  },
  mailChange(event: vantEvent) {
    const value = event.detail.value as string
    if (RgexpMail(value)) {
      api.modifyUserInfo('mail', value).then(({ ok, msg }) => {
        if (ok) {
          this.setData({
            mail: value
          })
          const userinfo = wx.getStorageSync('userinfo')
          wx.setStorage({
            key: 'userinfo',
            data: Object.assign(userinfo, { mail: value })
          })
        } else {
          wx.showModal({
            title: 'Error',
            content: msg
          })
        }
      })
    } else {
      wx.showModal({
        title: '值错误',
        content: "邮箱格式不正确,请重新输入"
      })
    }
  },
  nameChange(event: vantEvent) {
    const value = event.detail.value as string
    api.modifyUserInfo('name', value).then(({ ok, msg }) => {
      if (ok) {
        this.setData({
          name: value
        })
        const userinfo = wx.getStorageSync('userinfo')
        wx.setStorage({
          key: 'userinfo',
          data: Object.assign(userinfo, { name: value })
        })
      } else {
        wx.showModal({
          title: 'Error',
          content: msg
        })
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
    this.start()
    wx.stopPullDownRefresh()
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