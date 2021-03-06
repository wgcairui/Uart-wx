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
  // webLogin
  webLogin() {
    wx.showModal({
      title: 'Web登录',
      content: '打开https://uart.ladishb.com',
      success: (r) => {
        if (r.confirm) {
          wx.scanCode({
            success: async (res) => {
              api.webLogin(res.result).then(result => {
                if (result.ok) {
                  wx.showModal({
                    title: 'Scan',
                    content: '扫码登录成功'
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  // 更新用户头像和名称
  updateAvanter() {
    (wx as any).getUserProfile({
      desc: '用于更新用户头像和昵称',
      success: (info: { userInfo: WechatMiniprogram.UserInfo }) => {
        const { nickName, avatarUrl } = info.userInfo
        api.updateAvanter(nickName, avatarUrl).then(el=>{
          console.log(el);
          
        })
      }
    })
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
              wx.showToast({
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