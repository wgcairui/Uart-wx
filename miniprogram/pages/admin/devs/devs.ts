// miniprogram/pages/index/devs/devs.js
import { ObjectToStrquery, parseTime } from "../../../utils/util"
import api from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */

  data: {
    mac: '',
    pid: '',
    mountDev: "",
    result: {} as Uart.queryResultSave,
    filter: '',
    interval: 0 as any,
    protocol: '',
    Type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: { mountDev: any; mac: any; DevMac: any; pid: any; protocol: any; Type: any }) {
    wx.setNavigationBarTitle({ title: options.mountDev || options.mac || '' })
    this.setData({
      mac: options.DevMac,
      pid: options.pid,
      protocol: options.protocol,
      mountDev: options.mountDev,
      Type: options.Type
    })
  },
  async onReady() {
    wx.showLoading({ title: '获取运行数据' })
    await this.GetDevsRunInfo()
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /* this.setData({
      interval: setInterval(() => this.GetDevsRunInfo(), 5000)
    }) */
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    await this.GetDevsRunInfo()
    wx.stopPullDownRefresh()
  },


  async GetDevsRunInfo() {
    const { mac, pid, filter } = this.data
    const { code, data, msg } = await api.getTerminalData(mac, pid)
    if (code && data.result) {
      const regStr = new RegExp(filter)
      data.result = data.result.filter(el => !filter || regStr.test(el.name))
      data.time = parseTime(data.time)
      this.setData({
        result: data
      })
      //

    } else {
      wx.showModal({
        title: 'Error',
        content: msg
      })
    }
  },
  // 刷选参数
  filter(e: vantEvent) {
    const filter = e.detail.filter
    const regStr = new RegExp(filter)
    const result = this.data.result.result?.filter(el => regStr.test(el.name))
    this.setData({
      filter,
      "result.result": result
    })
  },

  // 导航到图表
  toline(e: vantEvent) {
    const url = '/pages/index/line/line' + ObjectToStrquery({ name: e.detail.name, mac: this.data.mac, pid: this.data.pid, protocol: this.data.protocol, type: 'wx' })
    console.log(url);

    wx.navigateTo({
      url
    })
  },
})