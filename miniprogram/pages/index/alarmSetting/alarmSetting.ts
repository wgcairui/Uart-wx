import api from "../../../utils/api"

// miniprogram/pages/index/alarmSetting/alarmSetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    protocol: '',
    setup: {} as ProtocolConstantThreshold
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = Number(options.type) || 0
    const protocol = options.protocol
    if (!protocol) {
      wx.navigateTo({
        url: '/pages/index/alarmSetting/index'
      })
    } else {
      this.setData({
        active: type,
        protocol
      })
      wx.getStorage({
        key: 'protocolSetup' + options.protocol,
        success: (res) => {
          this.setData({
            setup: res.data
          })
        },
        fail: (_e) => {
          this.getUserProtocolSetup()
        }
      })
    }

  },

  // 获取用户协议配置
  async getUserProtocolSetup() {
    const { ok, arg } = await api.getUserDevConstant(this.data.protocol)
    if (ok) {
      this.setData({
        setup: arg
      })
      wx.setStorage({
        key: 'protocolSetup' + this.data.protocol,
        data: arg
      })
    }
  },
  tabclick(event: vantEvent) {
    wx.setNavigationBarTitle({ title: '协议配置-' + event.detail.title })
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
  onPullDownRefresh: async function () {
    await this.getUserProtocolSetup()
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