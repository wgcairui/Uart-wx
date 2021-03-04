// miniprogram/pages/index/alarmSetting/threshold/threshold.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    min: 0,
    max: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '参数限值' + options.name })
    this.setData({
      name: options.name,
      min: Number(options.min),
      max: Number(options.max)
    })
  },

  minonChange(event: vantEvent) {
    const max = this.data.max
    const min = event.detail as number
    this.setData({
      min,
      max: min >= max ? Number(min) + 1 : max
    })
  },
  maxonChange(event: vantEvent) {
    this.setData({
      max: event.detail
    })
  },

  submit() {
    const events = this.getOpenerEventChannel()
    events.emit("modifyThreshold", this.data)
    wx.navigateBack()
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