// miniprogram/pages/index/alarm/alarm.js
import api from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Alarm: [] as uartAlarmObject[],
    filter: '',
    date: '',
    dateShow: false,
    minDate: new Date(2020, 0, 1).getTime(),
    maxDate: Date.now()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    const date = new Date()
    const start = this.formatDate(date)
    const end = this.formatDate(date)
    this.setData({
      date: start + '-' + end
    })
    wx.getStorage({
      key: 'alarm_list',
      success: (el) => {
        this.setData({
          Alarm: el.data
        })
        wx.setTabBarBadge({ index: 1, text: this.data.Alarm.filter(el => !el.isOk).length.toString() })
      },
      fail: () => {
        this.getAlarmInfo()
      }
    })
  },
  // 获取告警信息
  async getAlarmInfo() {
    wx.showLoading({ title: '加载数据' })
    const [start, end] = this.data.date.split('-')
    const { ok, msg, arg } = await api.getAlarm(start + ' 00:00:00', end + " 23:59:59")
    wx.hideLoading()
    if (ok) {
      const Alarm = arg.map(el => {
        el.time = this.formattime(el.timeStamp)
        return el
      })
      this.setData({
        Alarm
      })
      // 计算未确认告警数量
      const alarmNum = Alarm.filter(el => !el.isOk).length
      if (alarmNum > 0) wx.setTabBarBadge({ index: 1, text: alarmNum.toString() })
      else wx.removeTabBarBadge({index:1})
      wx.setStorage({ key: 'alarm_list', data: Alarm })
    } else {
      wx.showModal({
        title: '发生错误',
        content: msg || '未知错误'
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
  onConfirm(event: any) {
    const [start, end] = event.detail;
    this.setData({
      dateShow: false,
      date: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
    this.getAlarmInfo()
  },
  // 确认告警信息
  showalarm(event: vantEvent<uartAlarmObject>) {
    const alarm = event.currentTarget.dataset.item
    const key = event.currentTarget.dataset.key as number

    wx.showModal({
      title: alarm.devName,
      content: alarm.msg,
      showCancel: !alarm.isOk,
      // confirmColor: 'green',
      confirmText: alarm.isOk ? '确定' : '确认消息',
      success: async (res) => {
        if (res.confirm && !alarm.isOk) {
          wx.showLoading({ title: '确认告警信息' })
          await api.alarmConfirmed(alarm._id)
          this.setData({
            [`Alarm[${key}].isOk`]: true
          })
          wx.setTabBarBadge({ index: 1, text: this.data.Alarm.filter(el => !el.isOk).length.toString() })
          wx.hideLoading()
        }
      }
    })
  },
  // 全部确认
  allQuest() {
    wx.showModal({
      title: "Tips",
      content: "是否确认全部告警信息?",
      success: async (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '确认告警信息' })
          await api.alarmConfirmed()
          wx.startPullDownRefresh()
          wx.hideLoading()
        }
      }
    })
  },

  onShow() {
    wx.startPullDownRefresh()
  },
  // 下拉刷新
  async onPullDownRefresh() {
    await this.getAlarmInfo()
    wx.stopPullDownRefresh()
  }
  ,
  formattime(time: number) {
    const Dates = new Date(time)
    return `${Dates.getMonth() + 1}-${Dates.getDate()} ${Dates.getHours()}:${Dates.getMinutes()}:${Dates.getSeconds()}`
  }
})