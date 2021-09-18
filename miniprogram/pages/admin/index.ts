// miniprogram/pages/index/user/user.js
import api from "../../utils/api"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    avanter: '',
    rgwx: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    this.start()
  },

  //
  async start() {
    const { data } = await api.userInfo()
    this.setData({
      name: data.name,
      avanter: data.avanter,
      rgwx: data.rgtype === 'wx',
    })

    const a = 10
    a.toFixed
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
        await wx.showModal({
          title: 'success',
          content: '已成功解绑,确定退出小程序'
        });
        (wx as any).exitMiniProgram()
      }
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