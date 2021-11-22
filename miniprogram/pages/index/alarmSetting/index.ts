import api from "../../../utils/api"

// miniprogram/pages/index/alarmSetting/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devs: [] as Uart.Terminal[],
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
    api.BindDev().then(el => {
      if (el.code) {
        this.setData({
          devs: el.data.UTs
        })
      }
    })
  },
  async getuserTels() {
    const el = await api.getUserAlarmSetup()
    this.setData({
      tels: el.data.tels.join('\n'),
      mails: el.data.mails.join('\n')
    })
  },
  // 修改用户联系方式
  modifyTell(event: vantEvent<string[]>) {
    const [tel, mail] = event.currentTarget.dataset.item
    //const a = this.pushuserTels//(tel, mail)
    wx.navigateTo({
      url: "/pages/index/alarmSetting/modifyTel/modifyTel",//+ObjectToStrquery({tel,mail}),
      events:{
        modifyOk:({ tel, mail }: { tel: string[], mail: string[] })=> {
          this.pushuserTels(tel, mail)
        }
      },
      success(res) {
        res.eventChannel.emit('alarm', { tel: tel.split("\n"), mail: mail.split("\n") })
      }
    })

    /* const { detail, currentTarget: { dataset } } = event
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
    } */
  },
  // 提交修改联系方式
  pushuserTels(tels: string[], mails: string[]) {
    this.setData({
      tels: tels.join('\n'),
      mails: mails.join('\n')
    })
    api.modifyUserAlarmSetupTel([...new Set(tels)], [...new Set(mails)]).then(() => {
      wx.startPullDownRefresh()
    })

  },

  /**
   * 订阅下次告警
   */
  async subMessage() {
    const url = encodeURIComponent('http://mp.weixin.qq.com/s?__biz=MjM5MjA1MTgxOQ==&mid=304819939&idx=1&sn=d0bcd922033075afa2b5219fc95ebb1e&chksm=3173a9e7060420f1a98d0040d964a2f82af25289a731d1400c5224ca9bb3d225d737700700a8#rd')
    wx.navigateTo({ url: '/pages/index/web/web?url=' + url })
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