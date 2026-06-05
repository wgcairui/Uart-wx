// miniprogram/pages/index/user/user.ts

import api from "../../../utils/api"

interface MenuItem {
  id: string
  icon: string        // emoji / 单字符
  label: string
  desc?: string       // 右侧文字（缓存大小、版本号等）
  danger?: boolean    // 红色（危险操作）
  hidden?: boolean    // 条件隐藏
  // 跳转或点击，二选一
  url?: string        // 走 navigateTo
  bindtap?: string    // 走本页方法
}

interface MenuSection {
  id: string
  title: string
  items: MenuItem[]
}

Page({
  data: {
    // hero
    name: '',
    avanter: '',
    rgwx: false,
    rgTime: '',
    wxId: '',
    test: false,
    cacheSize: '',
    appVersion: '',
    // 派生
    menuSections: [] as MenuSection[],
  },

  onLoad: async function () {
    this.loadAppMeta()
    await this.start()
  },

  onShow() {
    this.start()
  },

  /**
   * 拉应用元信息（版本号、缓存大小）
   * 不阻塞 start
   */
  loadAppMeta() {
    try {
      const info = wx.getAccountInfoSync()
      this.setData({ appVersion: info.miniProgram.version || '1.0.0' })
    } catch (e) {
      this.setData({ appVersion: '1.0.0' })
    }
    wx.getStorageInfo({
      success: (res) => {
        const kb = res.currentSize || 0
        this.setData({ cacheSize: kb < 1024 ? `${kb} KB` : `${(kb / 1024).toFixed(2)} MB` })
      },
    })
  },

  /**
   * 拉用户信息 + 重建菜单
   */
  async start() {
    api.userInfo().then(({ code, data }) => {
      if (code) {
        const profile = {
          name: data.name,
          avanter: data.avanter,
          rgwx: data.rgtype === 'wx',
          rgTime: data.creatTime ? new Date(data.creatTime).toLocaleDateString() : '',
          wxId: data.wxId,
          test: Boolean(data.userGroup === 'test'),
        }
        this.setData(profile)
        wx.setStorage({ key: 'userinfo', data })
        this.rebuildMenuSections(profile)
      }
    })
  },

  /**
   * 派生菜单 sections 到 data（避免 WXML 调 page 方法）
   */
  rebuildMenuSections(profile: { rgwx: boolean; wxId?: string; test: boolean }) {
    const { wxId, test } = profile

    const sections: MenuSection[] = [
      {
        id: 'device',
        title: '设备管理',
        items: [
          { id: 'manage', icon: '⚙', label: '管理DTU', url: '/pages/index/manageDev/manageDev' },
          { id: 'bind',   icon: '＋', label: '绑定DTU', url: '/pages/index/bindDev/bindDev' },
        ],
      },
      {
        id: 'alarm',
        title: '告警与通知',
        items: [
          { id: 'alarmSetting', icon: '🔔', label: '告警设置',     url: '/pages/index/alarmSetting/index' },
          { id: 'subMessage',   icon: '📩', label: '订阅告警',     bindtap: 'onSubMessageTap', hidden: Boolean(wxId) || test },
          { id: 'wxSetting',    icon: '🛡', label: '微信权限',     bindtap: 'onWxSettingTap' },
        ],
      },
      {
        id: 'system',
        title: '系统',
        items: [
          { id: 'clearCache',  icon: '🗑', label: '清除缓存',   desc: this.data.cacheSize, bindtap: 'onClearCacheTap' },
          { id: 'checkUpdate', icon: '⤴', label: '检查更新',   desc: `v${this.data.appVersion}`, bindtap: 'onCheckUpdateTap', hidden: test },
        ],
      },
      {
        id: 'danger',
        title: '账户操作',
        items: [
          { id: 'unbind', icon: '🚪', label: '解绑微信', danger: true, bindtap: 'onUnbindTap', hidden: test },
          { id: 'exit',   icon: '⏻', label: '退出测试', danger: true, bindtap: 'onExitTestTap', hidden: !test },
        ],
      },
    ]

    // 过滤 hidden 项
    sections.forEach(s => { s.items = s.items.filter(it => !it.hidden) })
    this.setData({ menuSections: sections })
  },

  /* === Hero actions === */
  onEditProfileTap() {
    this.updateAvanter()
  },

  /**
   * 通用菜单点击分发：url 走 navigateTo，bindtap 走本页方法
   */
  onMenuTap(e: WechatMiniprogram.TouchEvent) {
    const { url, bindtap } = e.currentTarget.dataset as { url?: string; bindtap?: string }
    if (url) {
      wx.navigateTo({ url, fail: () => {
        wx.showToast({ title: '页面打开失败', icon: 'none' })
      }})
    } else if (bindtap && typeof (this as any)[bindtap] === 'function') {
      ;(this as any)[bindtap]()
    }
  },

  /* === Menu actions === */
  onSubMessageTap() {
    const url = encodeURIComponent('http://mp.weixin.qq.com/s?__biz=MjM5MjA1MTgxOQ==&mid=304819939&idx=1&sn=d0bcd922033075afa2b5219fc95ebb1e&chksm=3173a9e7060420f1a98d0040d964a2f82af25289a731d1400c5224ca9bb3d225d737700700a8#rd')
    wx.navigateTo({ url: '/pages/index/web/web?url=' + url })
  },

  onWxSettingTap() {
    wx.openSetting({ withSubscriptions: true, success() {} })
  },

  onClearCacheTap() {
    wx.getStorageInfo({
      success: (res) => {
        const size = (res.currentSize || 0) / 1024
        wx.clearStorage({
          success: () => {
            wx.showToast({
              title: '已清理 ' + size.toFixed(2) + ' MB',
              icon: 'success',
            })
            this.loadAppMeta()
            setTimeout(() => {
              this.setData({ menuSections: [] })
              this.rebuildMenuSections(this.data as any)
            }, 600)
          },
          fail: (err) => {
            wx.showModal({ title: '清理失败', content: String(err) })
          },
        })
      },
    })
  },

  onCheckUpdateTap() {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate((res) => {
      wx.showToast({
        title: res.hasUpdate ? '有新版本，后台更新中' : '已是最新版',
        icon: 'none',
      })
    })
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已准备好，是否重启应用？',
        success: (res) => {
          if (res.confirm) updateManager.applyUpdate()
        },
      })
    })
    updateManager.onUpdateFailed(() => {
      wx.showToast({ title: '更新失败', icon: 'none' })
    })
  },

  async onUnbindTap() {
    const d = await wx.showModal({
      title: '解绑微信',
      content: this.data.rgwx ? '这将会删除您所有的配置和信息!!!' : '这将会解除小程序和透传账号之间的连接',
    })
    if (!d.confirm) return
    api.ws.close({})
    const { code } = await api.unbindwx()
    if (code) this.clearCacheAndReLaunch()
    else wx.exitMiniProgram()
  },

  onExitTestTap() {
    api.setToken('')
    wx.reLaunch({ url: '/pages/index/index' })
  },

  /* === Helpers === */
  async clearCacheAndReLaunch() {
    try { await wx.clearStorage() } catch (e) { /* swallow */ }
    wx.exitMiniProgram()
  },

  // 更新用户头像和名称
  updateAvanter() {
    wx.getUserProfile({
      desc: '用于更新用户头像和昵称',
      success: (info) => {
        const { nickName, avatarUrl } = info.userInfo
        api.updateAvanter(nickName, avatarUrl).then(() => {
          wx.showToast({ title: '更新成功' })
          this.start()
        })
      },
    })
  },

  onPullDownRefresh: async function () {
    this.loadAppMeta()
    await this.start()
    wx.stopPullDownRefresh()
  },
})
