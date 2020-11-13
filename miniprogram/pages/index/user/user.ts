// miniprogram/pages/index/user/user.js

import api from "../../../utils/api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    avanter: '',
    rgwx: false,
    rgTime: ''
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
      avanter: arg.avanter,
      rgwx: arg.rgtype === 'wx',
      rgTime: new Date(arg.creatTime!).toLocaleDateString()
    })
    wx.setStorage({ key: 'userinfo', data: arg })
  },
  // 更新用户头像和名称
  updateUserInfo(){

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
  // 注销账号
  async cancelwx() {
    wx.showModal({
      title: '注销操作',
      content: '是否确定注销此账号？',
      success: (res) => {
        if (res.confirm) {
          api.cancelwx().then(({ ok, msg }) => {
            if (ok) {
              this.clearCache()
              wx.reLaunch({ url: '/pages/index/index' })
            } else {
              wx.showModal({
                title: '操作失败',
                content: msg
              })
            }
          })
        }
      }
    })
  },
  // 打开微信设置
  openSetting() {
    wx.openSetting({
      withSubscriptions: true,
      success(_res) {
      }
    })
  },
  // 清除缓存
  clearCache() {
    wx.getStorageInfo({
      success(res) {
        const size = res.currentSize / 1024
        try {
          wx.clearStorage({
            success() {
              wx.showModal({
                title: '缓存清理成功',
                content: '清除缓存' + size.toFixed(5) + 'MB',
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