// miniprogram/pages/admin/index.ts
// 管理员入口页面（admin role 登录后进入）
// 视觉规范见 docs/style-guide.md，结构与 pages/index/user/user 同构

import api from "../../utils/api"

interface MenuItem {
  id: string
  icon: string
  label: string
  desc?: string
  danger?: boolean
  hidden?: boolean
  url?: string
  bindtap?: string
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
    role: '',
    rgTime: '',
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
        const isAdmin = data.userGroup === 'root' || data.userGroup === 'admin'
        this.setData({
          name: data.name,
          avanter: data.avanter,
          role: isAdmin ? '管理员' : '用户',
          rgTime: data.creatTime ? new Date(data.creatTime).toLocaleDateString() : '',
        })
        wx.setStorage({ key: 'userinfo', data })
        this.rebuildMenuSections()
      }
    })
  },

  /**
   * 派生菜单 sections 到 data（避免 WXML 调 page 方法）
   * 三个 section：常用操作 / 其它操作 / 系统（含危险区）
   */
  rebuildMenuSections() {
    const sections: MenuSection[] = [
      {
        id: 'common',
        title: '常用操作',
        items: [
          { id: 'registerDev', icon: '📋', label: '批量登记设备', url: '/pages/admin/registerDev/registerDev' },
          { id: 'scanDtu',     icon: '📡', label: '查询透传DTU',  url: '/pages/admin/scan/scan' },
          { id: 'dev',         icon: '📟', label: '查询LADS设备', url: '/pages/admin/dev/dev' },
        ],
      },
      {
        id: 'other',
        title: '其它操作',
        items: [
          { id: 'registerDtu', icon: '📦', label: '批量登记DTU', url: '/pages/admin/register/register' },
          { id: 'node',        icon: '🌐', label: '查询节点',     url: '/pages/admin/node/node' },
        ],
      },
      {
        id: 'system',
        title: '系统',
        items: [
          { id: 'clearCache',  icon: '🗑', label: '清除缓存',   desc: this.data.cacheSize,   bindtap: 'onClearCacheTap' },
          { id: 'checkUpdate', icon: '⤴', label: '检查更新',   desc: `v${this.data.appVersion}`, bindtap: 'onCheckUpdateTap' },
        ],
      },
      {
        id: 'danger',
        title: '账户操作',
        items: [
          { id: 'unbind', icon: '🚪', label: '解绑微信', danger: true, bindtap: 'onUnbindTap' },
        ],
      },
    ]

    // 过滤 hidden 项（保留接口以便后续 role 化）
    sections.forEach(s => { s.items = s.items.filter(it => !it.hidden) })
    this.setData({ menuSections: sections })
  },

  /* === Hero actions === */
  // 选择微信头像（chooseAvatar 模式，2022-11 后官方唯一可靠方式）
  async onChooseAvatar(e: any) {
    const tempPath: string | undefined = e?.detail?.avatarUrl
    if (!tempPath) {
      wx.showToast({ title: '已取消选择', icon: 'none' })
      return
    }
    this.setData({ avanter: tempPath })
    api.updateAvanter(this.data.name || '管理员', tempPath).then(({ code, msg }) => {
      if (code === 200) wx.showToast({ title: '已更新(临时路径)', icon: 'none' })
      else wx.showModal({ title: '更新失败', content: msg || '请稍后重试', icon: 'none' })
    })
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
              this.rebuildMenuSections()
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
      content: '这将会解除小程序和管理员账号之间的连接',
    })
    if (!d.confirm) return
    api.ws.close({})
    const { code, msg } = await api.unbindwx()
    if (code === 200) {
      await this.clearCacheAndReLaunch()
    } else {
      wx.showToast({ title: msg || '解绑失败,请稍后重试', icon: 'none' })
    }
  },

  /* === Helpers === */
  async clearCacheAndReLaunch() {
    try { await wx.clearStorage() } catch (e) { /* swallow */ }
    wx.reLaunch({ url: '/pages/login/login' })
  },

  onPullDownRefresh: async function () {
    this.loadAppMeta()
    await this.start()
    wx.stopPullDownRefresh()
  },
})
