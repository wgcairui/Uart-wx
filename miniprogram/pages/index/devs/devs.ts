import api from "../../../utils/api"

// miniprogram/pages/index/devs/devs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mac: '',
    pid: '',
    result: {} as queryResult
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mac: options.mac,
      pid: options.pid
    })
    this.GetDevsRunInfo()
  },

  GetDevsRunInfo() {
    api.getDevsRunInfo(this.data.mac, this.data.pid).then(el => {
      if (el.ok) {
        el.arg.result = el.arg.result?.map(obj => {
          if (obj.unit && /^{.*}$/.test(obj.unit)) {
            obj.value = obj.value
            obj.unit = ''
          }
          return obj
        })
        this.setData({
          result: el.arg
        })
        console.log(el.arg);

      } else {
        wx.showModal({
          title: 'Error',
          content: '信息获取失败'
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