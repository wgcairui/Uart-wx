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
    rgTime: '',
    wxId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    this.start()
  },

  //
  async start() {
    api.userInfo().then(({ code, data }) => {
      if (code) {
        this.setData({
          name: data.name,
          avanter: data.avanter,
          rgwx: data.rgtype === 'wx',
          rgTime: new Date(data.creatTime!).toLocaleDateString(),
          wxId: data.wxId
        })
        wx.setStorage({ key: 'userinfo', data })
      }
    })

  },

  // 更新用户头像和名称
  updateAvanter() {
    wx.getUserProfile({
      desc: '用于更新用户头像和昵称',
      success: (info: { userInfo: WechatMiniprogram.UserInfo }) => {
        const { nickName, avatarUrl } = info.userInfo
        api.updateAvanter(nickName, avatarUrl).then(() => {
          wx.showToast({ title: '更新成功' })
          this.start()
        })
      }
    })
  },
  // 解绑微信
  async unbindwx() {
    const d = await wx.showModal({
      title: '解绑微信',
      content: this.data.rgwx ? '这将会删除您所有的配置和信息!!!' : '这将会解除小程序和透传账号之间的连接',
    })

    if (d.confirm) {
      const { code } = await api.unbindwx()
      if (code) {
        this.clearCache()
        /* await wx.showModal({
          title: 'success',
          content: '已成功解绑,确定退出小程序'
        });
        (wx as any).exitMiniProgram() */
        wx.exitMiniProgram()
      }
    }
  },

  //检查更新
  async checkVersion() {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      wx.showToast({ title: res.hasUpdate ? '有新版本,正在后台更新' : '最新版', icon: 'none' })
      console.log("新版本：" + res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
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
   * 订阅下次告警
   */
  async subMessage() {
    const url = encodeURIComponent('http://mp.weixin.qq.com/s?__biz=MjM5MjA1MTgxOQ==&mid=304819939&idx=1&sn=d0bcd922033075afa2b5219fc95ebb1e&chksm=3173a9e7060420f1a98d0040d964a2f82af25289a731d1400c5224ca9bb3d225d737700700a8#rd')
    wx.navigateTo({ url: '/pages/index/web/web?url=' + url })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    await this.start()
    wx.stopPullDownRefresh()
  },
  onShow() {
    this.start()
  }
})