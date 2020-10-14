// miniprogram/pages/index/devs/devs.js
import { ObjectToStrquery } from "../../../utils/util"
import api from "../../../utils/api"
import unitCache from "../../../utils/unitCache"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mac: '',
    pid: '',
    mountDev: "",
    result: {} as queryResult,
    filter: '',
    interval: 0,
    protocol: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: options.mountDev || options.mac || '' })
    this.setData({
      mac: options.DevMac,
      pid: options.pid,
      protocol: options.protocol,
      mountDev: options.mountDev
    })
  },
  onReady() {
    this.GetDevsRunInfo()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      interval: setInterval(() => this.GetDevsRunInfo(), 5000)
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
  async GetDevsRunInfo() {
    const { mac, pid, filter } = this.data
    const { ok, arg } = await api.getDevsRunInfo(mac, pid)
    if (ok) {
      const regStr = new RegExp(filter)
      arg.result = arg.result?.filter(el => !filter || regStr.test(el.name)).map(obj => Object.assign(obj, unitCache.get(obj.value, obj.unit || '')))
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
    wx.navigateTo({
      url: '/pages/index/line/line' + ObjectToStrquery({ name: e.detail.name, mac: this.data.mac, pid: this.data.pid })
    })
  },
  // 发送操作指令
  async oprate(e: vantEvent) {
    const item: OprateInstruct = e.detail
    if (item.value.includes("%i")) {
      console.log(item.value);

    }
    const { ok, msg } = await api.SendProcotolInstructSet({ mountDev: this.data.mountDev, pid: Number(this.data.pid), protocol: this.data.protocol, DevMac: this.data.mac }, item)
    wx.showModal({
      title: ok ? 'Success' : 'Error',
      content: msg
    })
  },
  // 跳转告警设置
  alarm(e: vantEvent) {
    const type = e.detail.type as string
    wx.navigateTo({
      url: '/pages/index/alarmSetting/alarmSetting' + ObjectToStrquery({ type, protocol: this.data.protocol })
    })
  }
})