import api from "../../utils/api"

const DEFAULT_AVATAR = 'https://www.ladishb.com/upload/11122020__LADS108.png'

// miniprogram/pages/login/login.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0 as 0 | 1,  // 0 = 微信注册, 1 = 账号登录
    userInfo: {
      avatarUrl: DEFAULT_AVATAR,
    } as WechatMiniprogram.UserInfo,
    hasWxProfile: false,  // 是否拿到真实微信头像/昵称
    avatarTip: '点击获取微信头像和昵称',  // 头像下方提示文案
    hasWxTel: false,  // 是否已通过微信授权拿到手机号
    tel: '',  // 微信拿到的手机号(后 4 位用于默认昵称)
    telFromInput: '',  // 用户手输的手机号(降级路径)
    showTelInput: false,  // 是否展开手输 input(fallback)
    getTelLoading: false,
    registerloading: false,
    loginloading: false,
    openid: '',
    unionid: '',
    accontUser: '',
    accontPasswd: '',
  },

  onLoad(opt: { openid: string; unionid: string }) {
    this.setData({
      openid: opt.openid || '',
      unionid: opt.unionid || '',
    })
  },

  /**
   * 选择微信头像(2022-11 官方推荐方案)
    * button open-type="chooseAvatar" 唤起系统级选择面板(从相册选 / 拍照 / 用微信头像),
    * 回调 e.detail.avatarUrl 是微信返回的**临时 URL**,需要后续上传到业务服务器持久化
    * —— 临时 URL 只在本次小程序启动期间有效,关闭后失效
    *
    * ★ 业务约束:后端没有设计保存用户自己上传的图片,只接受微信头像
    *   真机下 scheme 区分:
    *     - http://tmp/... 或 https://...  → 微信 CDN 头像(可接受)
    *     - wxfile://tmp_xxx.jpg           → 本地相册/拍照文件(拒绝)
    *   ⚠️ 注意:开发工具返回的 scheme 统一是 http://tmp/... ,所以开发工具测试时本检查会"误判通过"
    */
  onChooseAvatar(e: any) {
    const tempUrl: string | undefined = e?.detail?.avatarUrl
    if (!tempUrl) {
      // 用户在 chooseAvatar 面板点了关闭(没选)
      this.setData({ avatarTip: '没选择?可点我重新选,或继续用默认头像注册' })
      return
    }
    // 拒绝本地相册/拍照(后端没设计存)
    if (/^wxfile:\/\//.test(tempUrl)) {
      wx.showModal({
        title: '不支持自定义图片',
        content: '请在面板中选择"使用微信头像",后端未设计保存您自己上传的图片。',
        showCancel: false,
        confirmText: '我知道了',
      })
      this.setData({ avatarTip: '请选择"使用微信头像",不能上传自己的图' })
      return
    }
    if (!/^https?:\/\//.test(tempUrl)) {
      wx.showToast({ title: '不支持的头像来源', icon: 'none' })
      return
    }
    this.setData({
      'userInfo.avatarUrl': tempUrl,
      hasWxProfile: true,
      avatarTip: '',
    })
    // 拿完头像 → 自动跳到手机号授权(如果还没拿)
    if (!this.data.hasWxTel) {
      this.promptGetPhone()
    }
  },

  // 昵称输入(微信 type="nickname" 模式,基础库 ≥2.21.2)
  // 唤起昵称输入键盘,键盘上方有「使用微信昵称」快捷选项,用户点一下自动填入
  onNickInput(e: vantEvent) {
    this.setData({ 'userInfo.nickName': e.detail.value })
  },
  // 失焦时 trim
  onNickBlur(e: vantEvent) {
    const v = (e.detail.value || '').toString().trim()
    if (v) this.setData({ 'userInfo.nickName': v })
  },
  // 昵称审核结果(基础库 ≥2.29.1)——告诉用户是否通过微信的内容安全检测
  onNickReview(e: any) {
    const { pass, timeout } = e?.detail || {}
    if (timeout) return
    if (pass === false) {
      wx.showToast({ title: '昵称审核未通过,请更换', icon: 'none' })
    }
  },

  // 引导用户去拿手机号
  promptGetPhone() {
    wx.showModal({
      title: '继续完成注册',
      content: '接下来需要您授权使用微信绑定的手机号,即可完成注册。',
      confirmText: '好的',
      showCancel: false,
    })
  },

  // Tab 切换
  onTabTap(e: vantEvent) {
    const k = Number(e.currentTarget.dataset.key) as 0 | 1
    if (k === this.data.active) return
    this.setData({ active: k })
    wx.setNavigationBarTitle({ title: k === 0 ? '微信注册' : '账号登录' })
  },

  // 输入双向绑定(自实现 input 不能用 model:value,所以单独 handler)
  onTelInput(e: vantEvent) {
    this.setData({ telFromInput: e.detail.value })
  },
  onUserInput(e: vantEvent) {
    this.setData({ accontUser: e.detail.value })
  },
  onPasswdInput(e: vantEvent) {
    this.setData({ accontPasswd: e.detail.value })
  },

  // 主入口:点大按钮 → 弹微信授权拿手机号
  async onWxPhoneTap(e: vantEvent) {
    // 没有 encryptedData = 用户点了"拒绝"或"不允许"
    if (!e.detail.encryptedData) {
      this.setData({ showTelInput: true })
      wx.showToast({ title: '已展开手输手机号', icon: 'none' })
      return
    }
    this.setData({ getTelLoading: true })
    try {
      const { code, data, msg } = await api.getphonenumber({
        openid: this.data.openid,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      })
      if (code !== 200) {
        wx.showToast({ title: msg || '获取手机号失败,请手输', icon: 'none' })
        this.setData({ showTelInput: true, getTelLoading: false })
        return
      }
      const tel = data.phoneNumber
      // 优先级修复:之前 `'user' + tel.slice(-4)` 因为 + 优先级高于 ||,实际是 (this.data.userInfo.nickName || 'user') + tel.slice(-4),可读性差;加括号明确语义
      const fallbackNick = '微信用户' + tel.slice(-4)
      const nextNick = this.data.userInfo.nickName || fallbackNick
      this.setData({
        tel,
        hasWxTel: true,
        showTelInput: false,  // 拿到微信手机号 → 收起手输
        getTelLoading: false,
        'userInfo.nickName': nextNick,
      })
      // 拿完手机号 → 引导用户去点头像区域拿头像(chooseAvatar 必须在用户点 button 的同步回调,不能从 modal 自动触发)
      if (!this.data.hasWxProfile) {
        wx.showModal({
          title: '完善资料',
          content: '点击上方头像区域,选择微信头像或自定义图片。',
          confirmText: '我知道了',
          showCancel: false,
        })
      }
    } catch (err) {
      wx.showToast({ title: '获取失败,请手输', icon: 'none' })
      this.setData({ showTelInput: true, getTelLoading: false })
    }
  },

  // 引导用户去拿头像(已废用:无法从 modal confirm 回调里触发 chooseAvatar,因为它必须 button 点击同步回调)
  // promptGetAvatar() { ... }

  // 展开手输 input 的入口(明显降级路径,不是默认)
  onShowTelInputTap() {
    this.setData({ showTelInput: true })
  },

  // 收回手输 input(用户决定改用微信授权)
  onHideTelInputTap() {
    this.setData({ showTelInput: false, telFromInput: '' })
  },

  // 注册用户
  async register() {
    // 手机号来源:微信授权 > 手输
    const tel = this.data.tel || this.data.telFromInput
    if (!tel || !/^(13[0-9]|15[0-9]|166|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/.test(tel.toString())) {
      wx.showToast({ title: '需要有效的手机号码', icon: 'none' })
      return
    }
    this.setData({ registerloading: true })
    const { userInfo: { nickName, avatarUrl }, unionid, openid } = this.data
    const { code, message } = await api.registerUser({
      user: unionid,
      openid,
      name: nickName || '微信用户',
      avanter: avatarUrl || DEFAULT_AVATAR,
      tel,
    })
    this.setData({ registerloading: false })
    if (code === 200) {
      wx.reLaunch({ url: '/pages/index/index' })
    } else {
      wx.showModal({ title: '注册失败', content: message || '请稍后重试', icon: 'none' })
    }
  },

  // 账号登录
  async login() {
    const { accontUser, accontPasswd, openid, unionid } = this.data
    if (!accontUser || !accontPasswd) {
      wx.showToast({ title: '请输入用户名和密码', icon: 'none' })
      return
    }
    this.setData({ loginloading: true })
    const { code, msg } = await api.userlogin({
      avanter: this.data.userInfo.avatarUrl,
      openid,
      unionid,
      user: accontUser,
      passwd: accontPasswd,
    })
    this.setData({ loginloading: false })
    if (code === 200) {
      wx.reLaunch({ url: '/pages/index/index' })
    } else {
      wx.showModal({
        title: '登录错误',
        content: msg || '请检查用户名和密码',
        success: () => {
          this.setData({ active: 0 })
        },
      })
    }
  },

  // 试用
  trial() {
    this.setData({
      accontPasswd: '123456',
      accontUser: 'test',
    })
    this.login()
  },
})
