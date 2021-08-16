import api from "../../../utils/api"
import { ObjectToStrquery } from "../../../utils/util"
// miniprogram/pages/index/alarmSetting/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devs: [] as Uart.Terminal[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.sortDevslist()
  },

  sortDevslist() {
    api.BindDev().then(el => {
      if (el.code) {
        this.setData({
          devs: el.data.UTs
        })
      }
    })
  },

  // 查看挂载
  toDev(event: vantEvent<Uart.Terminal>) {
    const { DevMac } = event.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/index/manageDev/mountDevs/mountDevs' + ObjectToStrquery({ mac: DevMac })
    })
  },

  addDTU(){
    wx.navigateTo({
      url:"/pages/index/bindDev/bindDev"
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
    this.sortDevslist()
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

})