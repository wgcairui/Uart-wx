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
    protocol: '',
    _oprateStat: false
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
    const { ok, arg, msg } = await api.getDevsRunInfo(mac, pid)
    if (ok && arg) {
      const regStr = new RegExp(filter)
      arg.result = arg.result.filter(el => !filter || regStr.test(el.name)).map(obj => Object.assign(obj, unitCache.get(obj.value, obj.unit || '')))
      arg.time = new Date(arg.time!).toLocaleString()
      this.setData({
        result: arg,
        interval: setTimeout(() => {
          this.GetDevsRunInfo()
        }, arg.Interval || 5000)
      })
    } else {
      clearInterval(this.data.interval)
      wx.showModal({
        title: 'Error',
        content: msg,
        success: () => {
          clearInterval(this.data.interval)
          //wx.navigateBack()
        }
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
      url: '/pages/index/line/line' + ObjectToStrquery({ name: e.detail.name, mac: this.data.mac, pid: this.data.pid, protocol: this.data.protocol })
    })
  },
  // 发送操作指令
  async oprate(e: Pick<vantEvent, 'detail'>) {
    if (this.data._oprateStat) return
    const item: OprateInstruct = e.detail
    if (item.value.includes("%i") && !item.val) {
      wx.navigateTo({
        url: '/pages/util/setVal/setVal' + ObjectToStrquery({ item }),
        events: {
          valueOk: (value: { val: number }) => {
            item.val = value.val
            this.oprate({ detail: item })
          }
        }
      })
      return
    }
    wx.showLoading({ title: '正在发送' })
    this.setData({
      _oprateStat: true
    })
    const { ok, msg } = await api.SendProcotolInstructSet({ mountDev: this.data.mountDev, pid: Number(this.data.pid), protocol: this.data.protocol, DevMac: this.data.mac }, item)
    this.setData({
      _oprateStat: false
    })
    wx.hideLoading()
    // 如果设备未通过校验，则跳转到校验短信验证码页面
    if (ok === 4) {
      wx.showModal({
        title: '权限验证',
        content: '操作指令需要验证您的设备,是否通过短信开始验证？',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/util/smsValidation/smsValidation',
              events: {
                validationSuccess: () => {
                  console.log('sms validation success');
                  this.oprate({ detail: item })
                }
              }
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: ok ? 'Success' : 'Error',
        content: msg
      })
    }
  },
  // 跳转告警设置
  alarm(e: vantEvent) {
    const type = e.detail.type as string
    wx.navigateTo({
      url: '/pages/index/alarmSetting/alarmSetting' + ObjectToStrquery({ type, protocol: this.data.protocol })
    })
  }
})