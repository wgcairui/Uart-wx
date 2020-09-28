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
    minDate:new Date(2020,0,1).getTime(),
    maxDate:Date.now()
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
    this.getAlarmInfo()
  },
  // 获取告警信息
  async getAlarmInfo() {
    const [start, end] = this.data.date.split('-')
    const { ok, msg, arg } = await api.getAlarm(start + ' 00:00:00', end + " 23:59:59")
    if (ok) {
      this.setData({
        Alarm: arg
      })
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
  },
  // 滑动点击
  swipeClose(event:any){
    const {target,detail} = event
    switch (detail) {
      case "right":
        const select_alarm_index = this.data.Alarm.findIndex(el=>el._id === target.id)
        console.log(this.data.Alarm[select_alarm_index]);
        
        break;
      default:
        break;
    }
  }
})