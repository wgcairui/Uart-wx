import { ObjectToStrquery } from "../../../../utils/util"
import api from "../../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mac: '',
    terminal: {} as Uart.Terminal,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: { mac: string }) {
    this.setData({
      mac: options.mac
    })
    this.start()
  },

  start() {
    api.getTerminal(this.data.mac).then(el => {
      if (el.code) {
        this.setData({
          terminal: el.data
        })
      }
    })
  },

  // 删除DTU挂载设备
  async deleteMountDev(event: vantEvent<Uart.TerminalMountDevs>) {
    const { item } = event.currentTarget.dataset
    wx.showModal({
      title: '解除挂载！！',
      content: `确定解除挂载设备：${item.mountDev} ？？`,
      success: (res) => {
        if (res.confirm) {
          api.delTerminalMountDev(this.data.mac, item.pid).then(() => {
            this.start()
          })
        }
      }
    })

  },
  // 添加绑定设备
  addMonutDev() {
    wx.navigateTo({
      url: '/pages/index/manageDev/addMountDev/addMountDev' + ObjectToStrquery({ mac: this.data.mac }),
      events: {
        addSuccess() {
          wx.nextTick(() => {
            setTimeout(() => {
              wx.startPullDownRefresh()
            }, 500)
          })
        }
      }
    })
  },
  // 删除DTU
  async deleteDTU() {
    const {  name, DevMac } = this.data.terminal
    const del = await wx.showModal({
      title: `删除DTU`,
      content: `是否删除DTU:${name}?`,
    })

    if (del.confirm) {
      api.delUserTerminal(DevMac).then(() => {
        wx.navigateBack()
      })
      /* if (mountDevs.length > 0) {
        wx.showModal({
          title: 'Tip',
          content: `是否删除DTU绑定的所有设备?`,
          success: async (res) => {
            if (res.confirm) {
              for (let dev of mountDevs) {
                await api.delTerminalMountDev(DevMac, dev.pid)
              }
            } else {
              api.delUserTerminal(DevMac).then(() => {
                wx.navigateBack()
              })
            }
          }
        })
      } else {
        api.delUserTerminal(DevMac).then(() => {
          wx.navigateBack()
        })
      } */
    }
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
  onPullDownRefresh: function () {
    this.start()
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