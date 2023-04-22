// miniprogram/pages/index/alarm/alarm.js
import api from "../../../utils/api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Alarm: [] as Uart.uartAlarmObject[],
    filter: '',
    date: '',
    dateShow: false,
    minDate: new Date(2020, 0, 1).getTime(),
    maxDate: Date.now(),
    userInfo: {} as Uart.UserInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    wx.showLoading({ title: '加载数据' })
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    const start = this.formatDate(date)
    const end = this.formatDate(new Date())
    //
    const user = await api.userInfo()
    this.setData({
      date: start + '-' + end,
      userInfo: user.data
    })
    setTimeout(() => {
      this.getAlarmInfo().then(() => {
        wx.hideLoading()
      })
    }, 2000)



  },
  /**
   * 订阅下次告警
   */
  async subMessage() {
    if (this.data.userInfo.wxId) return
    wx.showModal({
      title: '订阅长期告警',
      content: '小程序限制,单次订阅只能发送一条订阅消息,如需长期订阅请关注关联公众号',
      success: async (res) => {
        if (res.confirm) {
          const url = encodeURIComponent('http://mp.weixin.qq.com/s?__biz=MjM5MjA1MTgxOQ==&mid=304819939&idx=1&sn=d0bcd922033075afa2b5219fc95ebb1e&chksm=3173a9e7060420f1a98d0040d964a2f82af25289a731d1400c5224ca9bb3d225d737700700a8#rd')
          wx.navigateTo({ url: '/pages/index/web/web?url=' + url })
        }
      }
    })
  },
  // 获取告警信息
  async getAlarmInfo() {
    const [start, end] = this.data.date.split('-')
    const { code, data, msg } = await api.getAlarm(start + ' 0:0:0', end + ' 23:59:59')
    if (code) {
      const Alarm = data
        .map(el => {
          el.time = this.formattime(el.timeStamp)
          return el
        })
        .reverse()
      this.setData({
        Alarm: Alarm.slice(0, 10)
      })
      if (Alarm.length > 10) {
        setTimeout(() => {
          this.setData({
            Alarm: Alarm.slice(10, -1)
          })
        }, 1000);
      }
      // 计算未确认告警数量
      const alarmNum = Alarm.filter(el => !el.isOk).length
      if (alarmNum > 0) wx.setTabBarBadge({ index: 1, text: alarmNum.toString() })
      else wx.removeTabBarBadge({ index: 1 })
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
  showalarm(event: vantEvent<Uart.uartAlarmObject & { _id: string }>) {
    const alarm = event.currentTarget.dataset.item
    const key = event.currentTarget.dataset.key as number

    console.log(alarm,key);
    wx.showModal({
      title: alarm.mac,
      content: alarm.msg,
      showCancel: !alarm.isOk,
      // confirmColor: 'green',
      confirmText: alarm.isOk ? '确定' : '确认消息',
      success: async (res) => {
        if (res.confirm && !alarm.isOk) {
          wx.showLoading({ title: '确认告警信息' })
          await api.confrimAlarm(alarm._id)
          this.setData({
            [`Alarm[${key}].isOk`]: true
          })
          this.subMessage()
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
          await api.confrimAlarm()
          wx.startPullDownRefresh()
          wx.hideLoading()
          this.subMessage()
        }
      }
    })
  },



  // 下拉刷新
  async onPullDownRefresh() {
    this.getAlarmInfo()
    wx.stopPullDownRefresh()
  },

  
  formattime(time: number) {
    const Dates = new Date(time)
    return `${Dates.getMonth() + 1}-${Dates.getDate()} ${Dates.getHours()}:${Dates.getMinutes()}:${Dates.getSeconds()}`
  }
})