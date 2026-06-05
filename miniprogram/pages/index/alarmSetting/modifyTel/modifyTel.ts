// miniprogram/pages/index/alarmSetting/modifyTel/modifyTel.ts

import api from "../../../../utils/api"
import { RgexpMail, RgexpTel } from "../../../../utils/util"

interface ContactItem {
  /** 原始值（用户输入） */
  value: string
  /** 校验状态 */
  valid: boolean
  /** 是否显示错误提示（只在用户失焦/输入后） */
  touched: boolean
}

const MAX_TELS = 3

Page({
  data: {
    currentTab: 'tel' as 'tel' | 'mail',
    telItems: [] as ContactItem[],
    mailItems: [] as ContactItem[],
    saving: false,
  },

  onLoad() {
    // 主动拉一次 contacts（不依赖父页 eventChannel 传值 —— 父页 onLoad 异步拉数据，
    //   父页 emit 时机可能早于 contacts 拉完，导致 mailItems 收到空数组）
    this.fetchContacts()
    // 仍保留 eventChannel 监听作为兜底（父页若先到 emit 数据，会覆盖本地拉的）
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('alarm', ({ tel, mail }: { tel: string[]; mail: string[] }) => {
      // 只在父页传的"有数据"时覆盖（避免父页 emit 空数组把已拉到的数据清空）
      const newTel = (tel || []).filter(Boolean).map((v) => toContactItem(v, 'tel'))
      const newMail = (mail || []).filter(Boolean).map((v) => toContactItem(v, 'mail'))
      if (newTel.length > 0 || newMail.length > 0) {
        this.setData({ telItems: newTel, mailItems: newMail })
      }
    })
  },

  async fetchContacts() {
    const { code, data, message } = await api.getUserAlarmSetup()
    if (code !== 200) {
      wx.showToast({ title: message || '加载联系方式失败', icon: 'none' })
      return
    }
    const tels = (data?.tels || []) as string[]
    const mails = (data?.mails || []) as string[]
    this.setData({
      telItems: tels.filter(Boolean).map((v) => toContactItem(v, 'tel')),
      mailItems: mails.filter(Boolean).map((v) => toContactItem(v, 'mail')),
    })
  },

  /* === Tab 切换 === */
  onSwitchTab(e: WechatMiniprogram.TouchEvent) {
    const tab = (e.currentTarget.dataset as any).tab as 'tel' | 'mail'
    if (tab && tab !== this.data.currentTab) {
      this.setData({ currentTab: tab })
    }
  },

  /* === 手机项 === */
  onTelInput(e: WechatMiniprogram.Input) {
    const { index } = e.currentTarget.dataset as { index: number }
    const value = e.detail.value
    this.updateItem('telItems', index, value, RgexpTel)
  },

  onTelBlur(e: WechatMiniprogram.Input) {
    const { index } = e.currentTarget.dataset as { index: number }
    this.markTouched('telItems', index)
  },

  onTelDelete(e: WechatMiniprogram.TouchEvent) {
    const { index } = e.currentTarget.dataset as { index: number }
    this.removeItem('telItems', index)
  },

  onTelAdd() {
    if (this.data.telItems.length >= MAX_TELS) {
      wx.showToast({ title: `最多 ${MAX_TELS} 个手机号`, icon: 'none' })
      return
    }
    this.setData({ telItems: [...this.data.telItems, toContactItem('', 'tel')] })
  },

  /* === 邮箱项 === */
  onMailInput(e: WechatMiniprogram.Input) {
    const { index } = e.currentTarget.dataset as { index: number }
    const value = e.detail.value
    this.updateItem('mailItems', index, value, RgexpMail)
  },

  onMailBlur(e: WechatMiniprogram.Input) {
    const { index } = e.currentTarget.dataset as { index: number }
    this.markTouched('mailItems', index)
  },

  onMailDelete(e: WechatMiniprogram.TouchEvent) {
    const { index } = e.currentTarget.dataset as { index: number }
    this.removeItem('mailItems', index)
  },

  onMailAdd() {
    // 邮箱不限数量
    this.setData({ mailItems: [...this.data.mailItems, toContactItem('', 'mail')] })
  },

  /* === 保存（独立：哪个 tab 就只校验 + 保存哪一组） === */
  async onSaveTap() {
    const { currentTab, telItems, mailItems } = this.data

    // 1. 校验当前 tab 项
    const items = currentTab === 'tel' ? telItems : mailItems
    const validate = currentTab === 'tel' ? RgexpTel : RgexpMail
    const validValues: string[] = []
    let hasError = false
    const marked: ContactItem[] = items.map((it) => {
      const v = (it.value || '').trim()
      if (!v) {
        // 空项 — 删除掉（不允许保存空值）
        hasError = true
        return { ...it, touched: true, valid: false }
      }
      if (!validate(v)) {
        hasError = true
        return { ...it, touched: true, valid: false }
      }
      validValues.push(v)
      return { ...it, touched: true, valid: true }
    })

    // 触发表单刷新（显示错误提示）
    if (currentTab === 'tel') this.setData({ telItems: marked })
    else this.setData({ mailItems: marked })

    if (hasError) {
      wx.showToast({
        title: currentTab === 'tel' ? '请检查手机号格式' : '请检查邮箱格式',
        icon: 'none',
      })
      return
    }

    // 2. 去重 + 提交（API 一次提交 tels + mails，后端会全量覆盖）
    const tels = currentTab === 'tel' ? uniq(validValues) : uniq(telItems.map((t) => t.value.trim()).filter(Boolean))
    const mails = currentTab === 'mail' ? uniq(validValues) : uniq(mailItems.map((m) => m.value.trim()).filter(Boolean))

    this.setData({ saving: true })
    const { code, message } = await api.modifyUserAlarmSetupTel(tels, mails)
    this.setData({ saving: false })
    if (code === 200) {
      // 通知父页（index）刷新联系方式
      try {
        this.getOpenerEventChannel().emit('modifyOk', { tel: tels, mail: mails })
      } catch (e) { /* 父页没注册时静默 */ }
      wx.showToast({ title: '保存成功', icon: 'success' })
      setTimeout(() => wx.navigateBack(), 400)
    } else {
      wx.showModal({ title: '保存失败', content: message || '请稍后重试', showCancel: false })
    }
  },

  /* === Helpers === */
  updateItem(
    listKey: 'telItems' | 'mailItems',
    index: number,
    value: string,
    validate: (s: string) => boolean,
  ) {
    const items = (this.data as any)[listKey] as ContactItem[]
    if (index < 0 || index >= items.length) return
    const next = [...items]
    next[index] = { value, valid: validate(value), touched: true }
    this.setData({ [listKey]: next } as any)
  },

  markTouched(listKey: 'telItems' | 'mailItems', index: number) {
    const items = (this.data as any)[listKey] as ContactItem[]
    if (index < 0 || index >= items.length) return
    const next = [...items]
    next[index] = { ...next[index], touched: true }
    this.setData({ [listKey]: next } as any)
  },

  removeItem(listKey: 'telItems' | 'mailItems', index: number) {
    const items = (this.data as any)[listKey] as ContactItem[]
    if (index < 0 || index >= items.length) return
    const next = items.filter((_, i) => i !== index)
    this.setData({ [listKey]: next } as any)
  },
})

/* === 模块顶层 helpers === */
function toContactItem(value: string, kind: 'tel' | 'mail'): ContactItem {
  const v = (value || '').trim()
  const fn = kind === 'tel' ? RgexpTel : RgexpMail
  return { value: v, valid: v ? fn(v) : true, touched: !!v }
}

function uniq(arr: string[]): string[] {
  return Array.from(new Set(arr.filter(Boolean)))
}
