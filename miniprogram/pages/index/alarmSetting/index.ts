// miniprogram/pages/index/alarmSetting/index.ts

import api from "../../../utils/api"
import { ObjectToStrquery } from "../../../utils/util"

interface ContactItem {
  value: string
  masked: string  // 138****1234 这种脱敏形式
}

interface MountRuleItem {
  DevMac: string
  dtuName: string
  pid: number
  mountDev: string
  Type: string
  protocol: string
}

Page({
  data: {
    // 联系方式
    telList: [] as ContactItem[],
    mailList: [] as ContactItem[],
    // 设备告警规则入口（按 DTU 分组）
    ruleGroups: [] as { dtuName: string; DevMac: string; items: MountRuleItem[] }[],
    // 派生：是否有任何告警规则可配置
    hasRules: false,
  },

  onLoad() {
    this.fetchContacts()
    this.fetchRules()
  },

  onShow() {
    // 从 modifyTel 返回时刷新联系方式
    this.fetchContacts()
  },

  onPullDownRefresh: async function () {
    await Promise.all([this.fetchContacts(), this.fetchRules()])
    wx.stopPullDownRefresh()
  },

  /* === 联系方式 === */
  async fetchContacts() {
    const { code, data, message } = await api.getUserAlarmSetup()
    if (code !== 200) {
      wx.showToast({ title: message || '加载联系方式失败', icon: 'none' })
      return
    }
    const tels = (data?.tels || []) as string[]
    const mails = (data?.mails || []) as string[]
    this.setData({
      telList: tels.map((t) => ({ value: t, masked: maskTel(t) })),
      mailList: mails.map((m) => ({ value: m, masked: maskMail(m) })),
    })
  },

  onEditTelTap() {
    this.openModifyTel()
  },

  onEditMailTap() {
    this.openModifyTel()
  },

  /**
   * 跳 modifyTel：带 tel/mail 当前值过去
   */
  openModifyTel() {
    wx.navigateTo({
      url: '/pages/index/alarmSetting/modifyTel/modifyTel',
      events: {
        modifyOk: ({ tel, mail }: { tel: string[]; mail: string[] }) => {
          this.setData({
            telList: (tel || []).map((t) => ({ value: t, masked: maskTel(t) })),
            mailList: (mail || []).map((m) => ({ value: m, masked: maskMail(m) })),
          })
        },
      },
      success: (res) => {
        res.eventChannel.emit('alarm', {
          tel: this.data.telList.map((t) => t.value),
          mail: this.data.mailList.map((m) => m.value),
        })
      },
    })
  },

  /* === 设备告警规则 === */
  async fetchRules() {
    const { code, data, message } = await api.BindDev()
    if (code !== 200) {
      wx.showToast({ title: message || '加载设备失败', icon: 'none' })
      return
    }
    const uts = (data?.UTs || []) as unknown as Uart.Terminal[]
    // 按 DTU 分组：每个有 mountDevs 的 DTU 一个组
    const groups = uts
      .filter((dtu) => (dtu.mountDevs || []).length > 0)
      .map((dtu) => ({
        dtuName: dtu.name || dtu.DevMac,
        DevMac: dtu.DevMac,
        items: (dtu.mountDevs || []).map((m: any) => ({
          DevMac: dtu.DevMac,
          dtuName: dtu.name || dtu.DevMac,
          pid: m.pid,
          mountDev: m.mountDev,
          Type: m.Type,
          protocol: m.protocol,
        })),
      }))

    this.setData({ ruleGroups: groups, hasRules: groups.length > 0 })
  },

  onRuleItemTap(e: WechatMiniprogram.TouchEvent) {
    const item = (e.currentTarget.dataset as any).item as MountRuleItem
    wx.navigateTo({
      url: '/pages/index/alarmSetting/alarmSetting' + ObjectToStrquery({
        protocol: item.protocol,
        mountDev: item.mountDev,
        pid: String(item.pid),
        DevMac: item.DevMac,
        Type: item.Type,
      }),
    })
  },

  /* === 微信订阅告警 === */
  onSubMessageTap() {
    const url = encodeURIComponent('http://mp.weixin.qq.com/s?__biz=MjM5MjA1MTgxOQ==&mid=304819939&idx=1&sn=d0bcd922033075afa2b5219fc95ebb1e&chksm=3173a9e7060420f1a98d0040d964a2f82af25289a731d1400c5224ca9bb3d225d737700700a8#rd')
    wx.navigateTo({ url: '/pages/index/web/web?url=' + url })
  },
})

/**
 * 手机号脱敏：13800001234 → 138****1234
 */
function maskTel(tel: string): string {
  if (!tel || tel.length < 7) return tel
  return tel.slice(0, 3) + '****' + tel.slice(-4)
}

/**
 * 邮箱脱敏：a@b.com → a***@b.com（保留首字符 + 域名）
 */
function maskMail(mail: string): string {
  if (!mail || !mail.includes('@')) return mail
  const [user, domain] = mail.split('@')
  if (user.length <= 1) return mail
  return user[0] + '***@' + domain
}
