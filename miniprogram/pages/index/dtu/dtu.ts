import api from "../../../utils/api"

// miniprogram/pages/index/dtu/dtu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    terminal: {} as Terminal,
    jwSupport: false,
    longitude: '',
    latitude: '',
    markers: [] as any[],
    address: '',
    recommend: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    if (id) {
      const terminal = wx.getStorageSync(id) as Terminal
      const jw = terminal.jw && terminal.jw.length > 10 ? terminal.jw.split(',') : false
      console.log(jw);
      
      this.setData({
        terminal,
        jwSupport: Boolean(jw),
      })
      if (jw) {
        const mark = {
          iconPath: "../../../assert/mark.png",
          latitude: jw[1],
          longitude: jw[0],
          title: terminal.DevMac,
          width: 50,
          height: 50
        }
        this.setData({
          longitude: jw[0],
          latitude: jw[1],
          markers: [mark]
        })
        // 根据gps获取地址
        api.getGPSaddress([jw[1], jw[0]].join(',')).then(({ ok, arg }) => {
          if (ok) {
            this.setData({
              address: arg.result.address,
              recommend: arg.result.formatted_addresses.recommend
            })
          }
        })
      }
      wx.setNavigationBarTitle({ title: terminal.name })
    }

  },

  markertap(_e: vantEvent) {
    /* const map = wx.createMapContext(e.currentTarget.id)
    map.getCenterLocation({
      success(e2){
        console.log(e2);
        
      }
    })
    
 */
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