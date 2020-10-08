import api from "../../../utils/api"

// miniprogram/pages/index/line/line.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    option: {
      dimensions: [],
      source: []
    } as echarts.EChartOption.Dataset,
    datatime: '',
    name: '',
    mac: '',
    pid: '',
    //
    dateShow: false,
    minDate: new Date(2020, 0, 1).getTime(),
    maxDate: Date.now()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { name, mac, pid } = options
    this.setData({
      mac,
      pid,
      name
    })
    this.getDevsHistoryInfo()
    this.setData({
      datatime: this.formatDate(new Date())
    })
  },
  async getDevsHistoryInfo() {
    const { name, mac, pid, datatime } = this.data
    const { ok, arg } = await api.getDevsHistoryInfo(mac, pid, name, datatime)
    if (ok) {
      this.setData({
        option: {
          dimensions: ['time', name],
          source: arg
        }
      })
    } else {
      wx.showModal({
        title: 'error',
        content: '获取数据出错'
      })
    }
  },

  // 显示日期选择器
  showCalendar() {
    this.setData({
      dateShow: true
    })
  },
  //  关闭日期选择器
  onClose() {
    this.setData({ dateShow: false });
  },
  formatDate(date: Date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  // 确定日期
  onConfirm(event: vantEvent) {
    console.log(event);
    this.setData({
      dateShow: false,
      datatime: this.formatDate(event.detail),
    });
    this.getDevsHistoryInfo()
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
    await this.getDevsHistoryInfo()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})