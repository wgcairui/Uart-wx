import { ObjectToStrquery } from "../../../utils/util"
import api from "../../../utils/api"

// miniprogram/pages/index/alarmSetting/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devs: [] as Terminal[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.sortDevslist()
  },

  sortDevslist() {
    wx.getStorage({
      key: 'Uts'
    }).then(({ data }: { data: Terminal[] }) => {
      this.setData({
        devs: data
      })
    }).catch(() => {
      wx.showModal({
        title: '设备错误',
        content: '缓存被清理或没有绑定设备,请在首页下拉刷新',
        success() {
          wx.switchTab({ url: '/pages/index/index' })
        }
      })
    })
  },
  // 删除DTU挂载设备
  async deleteMountDev(event: vantEvent<TerminalMountDevs>) {
    const { item, key } = event.currentTarget.dataset
    await api.delTerminalMountDev(key, item.mountDev, (item.pid as any))
    wx.startPullDownRefresh()
  },
  // 添加绑定设备
  addMonutDev(event: vantEvent<Terminal>) {
    const { item } = event.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/index/manageDev/addMountDev/addMountDev' + ObjectToStrquery({ item: JSON.stringify(item) }),
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
  deleteDTU(event: vantEvent<Terminal>) {
    const { item: { DevMac, mountDevs } } = event.currentTarget.dataset
    if (mountDevs.length > 0) {
      wx.showModal({
        title: 'Tip',
        content: `是否删除DTU绑定的所有设备?`,
        success: async (res) => {
          if (res.confirm) {
            for (let dev of mountDevs) {
              await this.deleteMountDev({ currentTarget: { dataset: { item: dev, key: DevMac } } } as any)
            }
          } else {
            api.delUserTerminal(DevMac).then(() => {
              wx.startPullDownRefresh()
            })
          }
        }
      })
    } else {
      api.delUserTerminal(DevMac).then(() => {
        wx.startPullDownRefresh()
      })
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
  onPullDownRefresh: async function () {
    const { arg } = await api.getuserMountDev()
    arg.UTs.forEach(el => {
      wx.setStorage({
        key: el._id,
        data: el
      })
    })
    wx.setStorage({
      key: 'Uts',
      data: arg.UTs
    })
    this.sortDevslist()
    wx.stopPullDownRefresh()
  },


})