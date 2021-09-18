import api from "../../../utils/api"

// miniprogram/pages/util/smsValidation/smsValidation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: '',
    sms: '',
    senddisable: false,
    sendtext: '发送验证码',
    int: 60,
    interval: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },

  // 发送短信验证码
  async sendValidation() {
    wx.showLoading({ title: '正在发送' })
    const { code, msg } = await api.fetch('smsValidation')
    wx.hideLoading()
    if (!code) wx.showModal({ title: '发送失败', content: msg })
    else {
      wx.showModal({
        title: '发送成功',
        content: '已发送到' + msg
      })
    }
    const interval = setInterval(() => {
      if (this.data.int === 0) {
        clearInterval(this.data.interval)
        this.setData({
          senddisable: false,
          sendtext: '发送验证码',
          interval
        })
      } else {
        this.setData({
          int: this.data.int - 1,
          sendtext: this.data.int - 1 + '秒后再试'
        })
      }
    }, 1000) as any
    this.setData({
      senddisable: true,
      sendtext: '60秒后再试',
      interval
    })


  },
  // 检查验证码，如果是4位则上传验证
  checkSms() {
    const event = this.getOpenerEventChannel()
    event.emit("code", this.data.sms)
    wx.navigateBack()
  }
})