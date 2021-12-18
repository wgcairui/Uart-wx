// pages/index/alarmSetting/modifyTel/modifyTel.js
import { RgexpMail, RgexpTel } from "../../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: [] as string[],
    mail: [] as string[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on("alarm", ({ tel, mail }: { tel: string[], mail: string[] }) => {
      this.setData({
        tel,
        mail
      })
    })
  },

  addTel() {
    const tel = [...this.data.tel, '']
    this.setData({
      tel
    })
  },

  addMail() {
    const mail = [...this.data.mail, '']
    this.setData({
      mail
    })
  },

  modifyTel(e: vantEvent) {
    const old = e.currentTarget.dataset.key
    const newVal = e.detail.value as string
    if (RgexpTel(newVal) || newVal.length === 0) {
      const i = this.data.tel.findIndex(el => el === old)
      this.data.tel.splice(i, 1, newVal)
      this.setData({
        tel: this.data.tel.filter(el => el)
      })
    } else {
      wx.showModal({
        content: `${newVal}不是正确的手机号格式`,
        title: "号码错误"
      })
    }
  },

  modifyMail(e: vantEvent) {
    const old = e.currentTarget.dataset.key
    const newVal = e.detail.value as string
    if (RgexpMail(newVal) || newVal.length === 0) {
      const i = this.data.mail.findIndex(el => el === old)
      this.data.mail.splice(i, 1, newVal)
      this.setData({
        mail: this.data.mail.filter(el => el)
      })
    } else {
      wx.showModal({
        content: `${newVal}不是正确的邮箱格式`,
        title: "邮箱错误"
      })
    }
  },

  submit() {
    /* if(!this.disbledSumbit()) {
      wx.showToast({
        title:"联系方式不能空",
        icon:"error"
      })
      return
    } */
    const eventChannel = this.getOpenerEventChannel()
    const { tel, mail } = this.data
    eventChannel.emit("modifyOk", { tel: tel.filter(el => RgexpTel(el)), mail: mail.filter(el => RgexpMail(el)) })
    wx.navigateBack()
  },

  disbledSumbit() {
    return this.data.mail.every(el => RgexpMail(el)) && this.data.tel.every(el => RgexpTel(el))
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