// miniprogram/pages/index/alarmSetting/addThreshold/addThreshold.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    cache: new Map(),
    unit: '',
    min: 0,
    max: 0,
    icon:'star',
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'protocolSetup' + options.protocol,
      success: ({ data }: { data: { user: ProtocolConstantThreshold, sys: ProtocolConstantThreshold, protocol: protocol } }) => {
        const hasKeys = new Set()
        data.sys.Threshold.forEach(el => hasKeys.add(el.name))
        data.user.Threshold.forEach(el => hasKeys.add(el.name))
        const setups = data.protocol.instruct.map(el => el.formResize.filter(el2 => !el2.isState && !hasKeys.has(el2.name)))
          .reduce((pre, cur) => [...pre, ...cur])
        const cache = new Map(setups.map(el => [el.name, el]))
        this.setData({
          columns: Array.from(cache.keys()),
          cache
        })
      },
      fail() {
        wx.navigateBack()
      }
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
  onChange(event: vantEvent) {
    const name = event.detail.value
    this.setData({
      name,
      unit: this.data.cache.get(name)?.unit || ''
    })
  },
  submit() {
    const events = this.getOpenerEventChannel()
    events.emit("addThreshold", this.data)
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