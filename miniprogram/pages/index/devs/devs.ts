import { ObjectToStrquery } from "../../../utils/util"
import api from "../../../utils/api"
import unitCache from "../../../utils/unitCache"

// miniprogram/pages/index/devs/devs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mac: '',
    pid: '',
    result: {} as queryResult,
    filter: '',
    interval:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: options.mountDev || options.mac || '' })
    this.setData({
      mac: options.mac,
      pid: options.pid
    })
    this.GetDevsRunInfo()
  },

  async GetDevsRunInfo() {
    const { ok, arg } = await api.getDevsRunInfo(this.data.mac, this.data.pid)
    if (ok) {
      //
      arg.result = arg.result?.map(obj => {
        if (obj.unit && /^{.*}$/.test(obj.unit)) {
          obj.value = unitCache.get(obj.value, obj.unit)
          obj.unit = ''
        }
        return obj
      })
      this.setData({
        result: arg
      })
    } else {
      wx.showModal({
        title: 'Error',
        content: '信息获取失败'
      })
    }
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
    const interval = setInterval(()=>this.GetDevsRunInfo(),5000)
    this.setData({
      interval
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.interval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.interval)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    await this.GetDevsRunInfo()
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

  },
  onSearch() {
    const regStr = new RegExp(this.data.filter)
    const result = this.data.result.result?.filter(el => regStr.test(el.name))
    this.setData({
      "result.result": result
    })
  },
  onCancel() {
    this.GetDevsRunInfo()
  },
  // 进入参数状态
  onLine(event: vantEvent) {
    const name = event.target.id
    const { mac, pid } = this.data
    wx.navigateTo({
      url: '/pages/index/line/line' + ObjectToStrquery({ name, mac, pid })
    })
  }
})