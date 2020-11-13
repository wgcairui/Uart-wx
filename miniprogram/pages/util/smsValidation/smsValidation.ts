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
    this.getTel()
  },
  // 获取用户手机号码
  async getTel() {
    wx.showLoading({ title: '获取用户手机号码' })
    const { arg } = await api.getUserTel()
    wx.hideLoading()
    this.setData({
      tel: arg
    })
  },
  // 发送短信验证码
  async sendValidation() {
    wx.showLoading({ title: '正在发送' })
    const { ok, msg } = await api.sendValidation()
    wx.hideLoading()
    if (!ok) wx.showModal({ title: '发送失败', content: msg })
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
  checkSms(_event: vantEvent) {
    if (this.data.sms.length > 3) {
      api.ValidationCode(Number(this.data.sms)).then(el => {
        if (el.ok) {
          const event = this.getOpenerEventChannel()
          event.emit("validationSuccess", { code: this.data.sms })
          wx.navigateBack()
        } else {
          wx.showModal({
            title: '检验失败',
            content: el.msg
          })
        }
      })
    }
  }
})