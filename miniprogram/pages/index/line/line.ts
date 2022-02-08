import api from "../../../utils/api";
import { ObjectToStrquery } from "../../../utils/util";

// miniprogram/pages/index/line/line.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    option: {
      dimensions: [],
      source: []
    },
    datatime: '',
    name: '',
    mac: '',
    pid: '',
    //
    dateShow: false,
    minDate: new Date(2020, 0, 1).getTime(),
    maxDate: Date.now(),
    webSrc: ''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: { name: any; mac: any; pid: any; protocol: any; }) {
    const { name, mac, pid, protocol } = options
    // console.log(options);
    // const token = api.token
    /* const p = ObjectToStrquery({
      token: api.token,
      DevMac: mac,
      pid,
      name,
      protocol,
      type: 'wx'
    }) */
    //const webSrc = encodeURI(`https://uart.ladishb.com/main/line?${p}`)

    const p = ObjectToStrquery({
      token: api.token,
      mac,
      pid,
      name,
    })
    const webSrc = encodeURI(`https://uart.ladishb.com/wline${p}`)
    console.log(webSrc);

    this.setData({
      mac,
      pid,
      name,
      webSrc
    })
    /* this.getDevsHistoryInfo()
    this.setData({
      datatime: this.formatDate(new Date())
    }) */
  },
  load(event: vantEvent) {
    console.log(event);

  },
  error(event: vantEvent) {
    console.log(event);
  },
  /* async getDevsHistoryInfo() {
    const { name, mac, pid, datatime } = this.data
    const { ok, arg } = await api.getDevsHistoryInfo(mac, pid, name, datatime)
    if (ok) {
      this.setData({
        option: {
          dimensions: ['time', name],
          source: arg
        }
      })
      console.log(this.data.option);
      
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
  }, onPullDownRefresh: async function () {
    await this.getDevsHistoryInfo()
    wx.stopPullDownRefresh()
  }, */
})