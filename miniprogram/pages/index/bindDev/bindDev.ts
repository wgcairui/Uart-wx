// miniprogram/pages/index/bindDev/bindDev.ts

import { ObjectToStrquery } from "../../../utils/util"
import api from "../../../utils/api"

Page({
  data: {
    // 输入
    mac: '',
    // 查询状态
    searching: false,
    // 已查到的 DTU 信息（null = 未查 / 查不到）
    terminal: null as Uart.Terminal | null,
    // 绑定状态
    binding: false,
  },

  /* === 输入 === */
  onMacInput(e: WechatMiniprogram.Input) {
    this.setData({ mac: e.detail.value.trim() })
  },

  /**
   * 微信扫码：扫 DTU / 百事服卡背面的 MAC 码
   */
  async onScanTap() {
    try {
      const scanResult = await wx.scanCode({})
      const result = (scanResult?.result || '').trim()
      if (!result) {
        wx.showToast({ title: '未识别到 MAC 码', icon: 'none' })
        return
      }
      this.setData({ mac: result })
      // 扫到后自动查询
      await this.onSearchTap()
    } catch (e: any) {
      // 用户取消扫码不报错
      if (e?.errMsg && !/cancel/i.test(e.errMsg)) {
        wx.showToast({ title: '扫码失败', icon: 'none' })
      }
    }
  },

  /**
   * 查询设备
   */
  async onSearchTap() {
    const mac = this.data.mac.trim()
    if (!mac) {
      wx.showToast({ title: '请输入 MAC 码', icon: 'none' })
      return
    }
    this.setData({ searching: true, terminal: null })
    const { code, data, message } = await api.getTerminalOnline(mac)
    this.setData({ searching: false })
    // 业务成功 = code === 200（项目约定，见 AGENTS.md）
    if (code === 200) {
      if (data && typeof data === 'object') {
        // 查到了
        this.setData({ terminal: data as Uart.Terminal })
      } else if (typeof data === 'boolean') {
        // 后端用 boolean 表示"在线但未注册"
        wx.showModal({ title: '设备未上线', content: '设备未上线，请检查设备是否连接正确和开启', showCancel: false })
      } else {
        // null / undefined / 其他 — 设备未注册
        wx.showModal({ title: '设备未注册', content: '设备未注册，请核对设备是否在我司渠道购买', showCancel: false })
      }
    } else {
      wx.showModal({ title: '查询失败', content: message || '请稍后重试', showCancel: false })
    }
  },

  /**
   * 绑定设备
   */
  async onBindTap() {
    const { terminal, mac } = this.data
    if (!terminal) return
    this.setData({ binding: true })
    const { code, message } = await api.addUserTerminal(mac)
    this.setData({ binding: false })
    // 业务成功 = code === 200
    if (code === 200) {
      // 通知上一页刷新
      try {
        this.getOpenerEventChannel().emit('addSuccess', { stat: true })
      } catch (e) { /* 父页面没注册 events 时静默 */ }
      // 如果已挂载设备，直接返回；否则弹 modal 引导去添加挂载
      const mountCount = (terminal.mountDevs || []).length
      if (mountCount > 0) {
        wx.showToast({ title: '绑定成功', icon: 'success' })
        setTimeout(() => wx.navigateBack(), 300)
        return
      }
      wx.showModal({
        title: '绑定成功',
        content: `已绑定 DTU: ${mac}\n是否现在添加挂载设备？`,
        success: (res) => {
          if (res.confirm) {
            // 跳到 addMountDev（带 mac）
            wx.redirectTo({
              url: '/pages/index/manageDev/addMountDev/addMountDev' + ObjectToStrquery({ mac }),
            })
          } else {
            wx.navigateBack()
          }
        },
      })
    } else {
      wx.showModal({ title: '绑定失败', content: message || '请稍后重试', showCancel: false })
    }
  },
})
