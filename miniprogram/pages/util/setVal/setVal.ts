// miniprogram/pages/util/setVal/setVal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const item = options
    console.log(item);

  },

  sendVal() {
    const num = Number(this.data.val)
    if (Number.isNaN(num)) {
      wx.showModal({
        title: '输入错误',
        content: '值必须是整数',
        success: () => {
          this.setData({
            val: 0
          })
        }
      })
    } else {
      const event = this.getOpenerEventChannel()
      event.emit("valueOk", { val: this.data.val })
      wx.navigateBack()
    }
  }
})