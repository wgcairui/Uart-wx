// miniprogram/pages/index/user/user.js
import api from "../../utils/api"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    avanter: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    this.start()
  },

  //
  async start() {
    const { arg } = await api.getUserInfo()
    this.setData({
      name: arg.name,
      avanter: arg.avanter
    })
    wx.setStorage({ key: 'userinfo', data: arg })
  },
  // 解绑微信
  async unbindwx() {
    const { ok, msg } = await api.unbindwx()
    if (ok) {
      this.clearCache()
      wx.reLaunch({ url: '/pages/index/index' })
    } else {
      wx.showModal({
        title: '操作失败',
        content: msg
      })
    }
  },
  //
  openSetting() {
    wx.openSetting({
      withSubscriptions: true,
      success(_res) {
      }
    })
  },
  clearCache() {
    wx.getStorageInfo({
      success(res) {
        const size = res.currentSize / 1024
        try {
          wx.clearStorage({
            success() {
              wx.showModal({
                title: '缓存清理成功',
                content: '清除缓存' + size + 'MB',
                success() {
                  wx.reLaunch({ url: '/pages/index/index' })
                }
              })
            }
          })
        } catch (error) {
          wx.showModal({
            title: '缓存清理失败',
            content: error,
            success() {
              wx.reLaunch({ url: '/pages/index/index' })
            }
          })
        }
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    await this.start()
    wx.stopPullDownRefresh()
  }
})