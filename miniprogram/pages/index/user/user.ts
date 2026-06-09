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
  // 选择微信头像(2022-11 官方推荐方案)
  // 返回的 tempFilePath 是本次启动有效的临时路径——需要 wx.uploadFile 上传业务服务器拿到永久 URL
  async onChooseAvatar(e: any) {
    const tempPath: string | undefined = e?.detail?.avatarUrl
    // ★ 业务约束:后端没有设计保存用户自己上传的图片,只接受微信 CDN 头像
    //   真机下:
    //     - "用微信头像" → http://tmp/xxx.jpeg 或 https://thirdwx.qlogo.cn/...
    //     - "从相册/拍照" → wxfile://tmp_xxx.jpg
    //   之前前端硬拦截 wxfile://,但**开发工具下选"用微信头像"也可能拿到非 http 路径**,
    //   把所有非 http 路径拒了会误杀真微信头像。改为:不前端拦截,只 log,
    //   业务约束交给后端 api.updateAvanter 拒绝(后端拿到非微信 CDN URL 直接 4xx 即可)
    console.log('[user] onChooseAvatar tempPath:', tempPath)
    if (!tempPath) {
      wx.showToast({ title: '已取消选择', icon: 'none' })
      return
    }
    // 1. 立即显示(tempFilePath 本次启动有效,够看)
    this.setData({ avanter: tempPath })
    // 2. 异步上传到业务服务器,拿到永久 URL 后再调 api.updateAvanter
    this.uploadAvatarToServer(tempPath)
  },

  /**
   * 上传头像到业务服务器 → 拿到永久 URL → api.updateAvanter
   * TODO: 把下面的 UPLOAD_ENDPOINT 替换成实际后端接收 multipart/form-data 的接口
   *       字段名是 'file'(可改)
   */
  async uploadAvatarToServer(tempPath: string) {
    const UPLOAD_ENDPOINT = ''  // TODO: 例如 'v2/upload/avatar'
    if (!UPLOAD_ENDPOINT) {
      // 还没配置上传接口——保留 temp 路径当显示用,提示用户
      wx.showToast({
        title: '头像已选(临时),配置上传后持久化',
        icon: 'none',
        duration: 2500,
      })
      // 仍然调 updateAvanter,让后端至少存个 temp 路径
      api.updateAvanter(this.data.name || '微信用户', tempPath).then(({ code, msg }) => {
        if (code === 200) wx.showToast({ title: '已更新(临时路径)', icon: 'none' })
        else wx.showModal({ title: '更新失败', content: msg || '请稍后重试', icon: 'none' })
      })
      return
    }
    wx.showLoading({ title: '上传中…' })
    try {
      const res: any = await wx.uploadFile({
        url: UPLOAD_ENDPOINT,
        filePath: tempPath,
        name: 'file',
      })
      wx.hideLoading()
      // 解析业务服务器响应(通常 data 是 JSON 字符串)
      const body = JSON.parse(res.data || '{}')
      const permanentUrl: string = body?.data?.url || body?.url
      if (!permanentUrl) {
        wx.showToast({ title: '上传失败', icon: 'none' })
        return
      }
      this.setData({ avanter: permanentUrl })
      api.updateAvanter(this.data.name || '微信用户', permanentUrl).then(({ code, msg }) => {
        if (code === 200) wx.showToast({ title: '更新成功' })
        else wx.showModal({ title: '更新失败', content: msg || '请稍后重试', icon: 'none' })
      })
    } catch (err) {
      wx.hideLoading()
      wx.showToast({ title: '上传失败', icon: 'none' })
    }
  },

  // 昵称输入(微信 type="nickname" 模式,基础库 ≥2.21.2)
  onNickInput(e: vantEvent) {
    this.setData({ name: e.detail.value })
  },
  onNickBlur(e: vantEvent) {
    const v = (e.detail.value || '').toString().trim()
    if (!v) return
    if (v === this.data.name) return
    this.setData({ name: v })
    // 失焦时同步给后端
    api.updateAvanter(v, this.data.avanter || '').then(({ code, msg }) => {
      if (code !== 200) wx.showModal({ title: '昵称更新失败', content: msg || '请稍后重试', icon: 'none' })
    })
  },
  // 昵称审核结果(基础库 ≥2.29.1)
  onNickReview(e: any) {
    const { pass, timeout } = e?.detail || {}
    if (timeout || pass !== false) return
    wx.showToast({ title: '昵称审核未通过,请更换', icon: 'none' })
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
    const { code, msg } = await api.unbindwx()
    if (code === 200) {
      await this.clearCacheAndReLaunch()
    } else {
      wx.showToast({ title: msg || '解绑失败,请稍后重试', icon: 'none' })
    }
  },

  onExitTestTap() {
    api.setToken('')
    wx.reLaunch({ url: '/pages/index/index' })
  },

  /* === Helpers === */
  async clearCacheAndReLaunch() {
    try { await wx.clearStorage() } catch (e) { /* swallow */ }
    // 解绑后回到登录页（api.unbindwx 内部已清 token，这里再 reLaunch 触发跳登录）
    wx.reLaunch({ url: '/pages/login/login' })
  },


  onPullDownRefresh: async function () {
    this.loadAppMeta()
    await this.start()
    wx.stopPullDownRefresh()
  },
})
