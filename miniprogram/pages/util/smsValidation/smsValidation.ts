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
    sendtext: '发送验证码'
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
    this.setData({
      senddisable: true,
      sendtext: '60秒后再试'
    })
    setTimeout(() => {
      this.setData({
        senddisable: false,
        sendtext: '发送验证码'
      })
    }, 1000 * 60)
  },
  // 检查验证码，如果是4位则上传验证
  checkSms() {
    const event = this.getOpenerEventChannel()
    event.emit("code", this.data.sms)
    wx.navigateBack()
  }
})