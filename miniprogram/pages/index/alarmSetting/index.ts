import { RgexpMail, RgexpTel } from "../../../utils/util"
import api from "../../../utils/api"

// miniprogram/pages/index/alarmSetting/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devs: [] as Terminal[],
    tels: '',
    mails: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.sortDevslist()
    this.getuserTels()
  },

  sortDevslist() {
    wx.getStorage({
      key: 'Uts'
    }).then(({ data }: { data: Terminal[] }) => {
      this.setData({
        devs: data
      })
    }).catch((e) => {
      console.log(e);
      wx.switchTab({ url: '/pages/index/index' })
    })
  },
  async getuserTels() {
    const el = await api.getUserAlarmTels()
    this.setData({
      tels: el.arg.tels.join('\n'),
      mails: el.arg.mails.join('\n')
    })
  },
  // 修改用户联系方式
  modifyTell(event: vantEvent) {
    const { detail, currentTarget: { dataset } } = event
    const value = Array.from(new Set((detail.value as string).replace(/(\,|\，)/g, '\n').split('\n').filter(el => el)))
    const key = dataset.key as string
    console.log(value);
    switch (key) {
      case 'tel':
        {
          const ok = value.every(el => RgexpTel(el))
          if (value.length > 3) {
            wx.showModal({
              title: "错误",
              content: "最多只能保存3个号码！！"
            })
            return
          }
          if (ok) {
            this.pushuserTels(value, null)
          } else {
            wx.showModal({
              title: '格式错误',
              content: '手机号码格式不正确'
            })
          }
        }
        break
      case "mail":
        {
          const ok = value.every(el => RgexpMail(el))
          if (ok) {
            this.pushuserTels(null, value)
          } else {
            wx.showModal({
              title: '格式错误',
              content: '邮箱格式不正确'
            })
          }
        }
        break
    }
  },
  // 提交修改联系方式
  pushuserTels(tels: string[] | null, mails: string[] | null) {
    this.setData({
      tels: tels ? tels.join('\n') : this.data.tels,
      mails: mails ? mails.join('\n') : this.data.mails
    })
    api.setUserSetupContact(this.data.tels.split('\n'), this.data.mails.split('\n')).then(() => {
      wx.startPullDownRefresh()
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    await this.getuserTels()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})