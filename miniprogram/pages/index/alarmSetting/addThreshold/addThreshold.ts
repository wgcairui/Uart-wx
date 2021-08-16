import api from "../../../../utils/api"

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
    icon: 'star',
    columns: [] as string[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(options);
    const protocol = options.protocol!
    const setup = await api.getAlarmProtocol(protocol)
    const showSet = new Set(setup.data.ShowTag)
    api.getProtocol(protocol).then(({ code, data }) => {
      const setups = data.instruct
        .map(el => el.formResize.filter(el2 => !el2.isState))
        .reduce((pre, cur) => [...pre, ...cur])
      const cache = new Map(setups.map(el => [el.name, el]))
      const keysSet = new Set((<string>options.keys).split(","))
      this.setData({
        columns: Array.from(cache.keys()).filter(el => showSet.has(el) && !keysSet.has(el)),
        cache
      })
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