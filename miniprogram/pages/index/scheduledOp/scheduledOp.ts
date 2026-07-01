// miniprogram/pages/index/scheduledOp/scheduledOp.ts
import api from "../../../utils/api"

// ─── 模块顶层 helpers (AGENTS.md: 不放 Page options sibling) ──

/** 状态码 → 中文 (状态徽章文案, 跟 status.wxs 行为一致) */
const STATUS_TEXT: Record<Uart.ScheduledOpStatus, string> = {
  PENDING: '待执行',
  RUNNING: '执行中',
  SUCCESS: '已成功',
  FAILED: '已失败',
  CANCELED: '已取消',
}

/** 通知通道 → 中文 (跟 status.wxs 行为一致) */
const CHANNEL_TEXT: Record<string, string> = {
  wx: '微信',
  mail: '邮件',
  sms: '短信',
}

/** 时间戳(ms 或 ISO 字符串) → 'YYYY-MM-DD HH:mm:ss' (无值时 fallback '-') */
function formatTime(ts?: number | string, fallback = '-'): string {
  if (!ts) return fallback
  const d = typeof ts === 'number' ? new Date(ts) : new Date(ts)
  if (isNaN(d.getTime())) return fallback
  const pad = (n: number) => (n < 10 ? '0' + n : '' + n)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

/** 通道数组 → '微信 / 邮件' 字符串 */
function formatChannels(arr?: string[] | null): string {
  if (!arr || arr.length === 0) return '未发送'
  return arr.map(c => CHANNEL_TEXT[c] || c).join(' / ')
}

/** 列表项展示字段 (派生到 data 数组, 模板里直接 {{item.displayXxx}} 读, 见 AGENTS.md rebuildXxxItems 约定) */
type DisplayJob = Uart.ScheduledOperation & {
  displayStatus: string
  displayScheduledAt: string
  displayExecutedAt?: string
  displayChannels: string
}

function buildDisplayItems(items: Uart.ScheduledOperation[]): DisplayJob[] {
  return items.map(it => ({
    ...it,
    displayStatus: STATUS_TEXT[it.status] ?? it.status,
    displayScheduledAt: formatTime(it.scheduledAt),
    displayExecutedAt: it.executedAt ? formatTime(it.executedAt) : undefined,
    displayChannels: formatChannels(it.notifiedChannels),
  }))
}

// miniprogram/pages/index/scheduledOp/scheduledOp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [] as DisplayJob[],
    loading: true,
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 1,
  },

  onShow() {
    this.loadList()
  },

  onPullDownRefresh() {
    this.loadList().then(() => wx.stopPullDownRefresh())
  },

  async loadList() {
    this.setData({ loading: true })
    try {
      const r = await api.listUserScheduledOps({
        page: this.data.page,
        pageSize: this.data.pageSize,
      })
      const items = (r.data && r.data.items) || []
      const pagination = (r.data && r.data.pagination) || { page: 1, pageSize: 20, total: 0, totalPages: 1, hasNext: false, hasPrev: false }
      // 按 scheduledAt 升序 (越接近执行的排前)
      items.sort((a, b) => a.scheduledAt - b.scheduledAt)
      this.setData({
        items: buildDisplayItems(items),
        page: pagination.page,
        pageSize: pagination.pageSize,
        total: pagination.total,
        totalPages: pagination.totalPages,
        loading: false,
      })
    } catch (err) {
      this.setData({ loading: false })
      // api.ts 已 toast error, 此处静默
      console.error('[scheduledOp.loadList]', err)
    }
  },

  /** 创建入口: 跳到设备列表 (tabBar "设备"页), 让用户选设备再走定时流程 */
  onCreateTap() {
    // 2026-07-01: cairui 报告 "新建定时操作点击不了". 加 console.log 验证 tap 是否真的触发.
    // 如果 console 看到这行 → 事件触发 OK, 问题在 modal 行为或后续跳转;
    // 如果 console 看不到 → 事件根本没到 (IDE compile stale / page-meta 拦截 / 别的)
    console.log('[scheduledOp] onCreateTap triggered', new Date().toISOString())
    wx.showModal({
      title: '创建定时操作 (测试版)',
      content:
        '当前是测试版, 完整的"创建定时操作"流程还没接入.\n\n' +
        '临时使用方式:\n' +
        '1. 确认跳转到"设备列表"\n' +
        '2. 进入任一设备详情\n' +
        '3. 点「操作指令」→ 选「定时发送」完成创建',
      confirmText: '去设备列表',
      cancelText: '取消',
      success: (r) => {
        if (r.confirm) {
          wx.switchTab({ url: '/pages/index/index' })
        }
      },
    })
  },

  onPrev() {
    if (this.data.page <= 1) return
    this.setData({ page: this.data.page - 1 }, () => this.loadList())
  },

  onNext() {
    if (this.data.page >= this.data.totalPages) return
    this.setData({ page: this.data.page + 1 }, () => this.loadList())
  },

  /** 取消 */
  onCancel(e: vantEvent) {
    const id = e.currentTarget.dataset.id as string
    wx.showModal({
      title: '取消定时任务',
      content: '确认取消这个定时操作吗? (PENDING 才可取消, RUNNING 状态会拒)',
      confirmText: '确认取消',
      cancelText: '不取消',
      confirmColor: '#d48806',
      success: async (r) => {
        if (!r.confirm) return
        wx.showLoading({ title: '取消中' })
        try {
          const resp = await api.cancelUserScheduledOp(id)
          wx.hideLoading()
          // 2026-07-01: 改 `if (resp.code)` truthy check 跟 codebase 一致 (server success=200, error=0)
          if (resp.code) {
            wx.showToast({ title: '已取消', icon: 'success' })
            this.loadList()
          } else {
            const errMsg = resp.message || resp.msg || '请稍后再试'
            wx.showModal({ title: '取消失败', content: errMsg, showCancel: false })
          }
        } catch (err) {
          wx.hideLoading()
          wx.showToast({ title: '网络异常', icon: 'none' })
        }
      },
    })
  },

  /** 立即触发 (dev 验证用) */
  onTrigger(e: vantEvent) {
    const id = e.currentTarget.dataset.id as string
    wx.showModal({
      title: '立即触发',
      content: '会立刻入队执行 (不影响计划时间 scheduledAt), 仅 PENDING 状态可触发',
      confirmText: '立即触发',
      success: async (r) => {
        if (!r.confirm) return
        wx.showLoading({ title: '触发中' })
        try {
          const resp = await api.triggerUserScheduledOp(id)
          wx.hideLoading()
          if (resp.code) {
            wx.showToast({ title: '已入队, 等待 worker 执行', icon: 'success', duration: 2000 })
            this.loadList()
          } else {
            const errMsg = resp.message || resp.msg || '请稍后再试'
            wx.showModal({ title: '触发失败', content: errMsg, showCancel: false })
          }
        } catch (err) {
          wx.hideLoading()
          wx.showToast({ title: '网络异常', icon: 'none' })
        }
      },
    })
  },

  /** 删除 (仅终态) */
  onDelete(e: vantEvent) {
    const id = e.currentTarget.dataset.id as string
    wx.showModal({
      title: '删除定时任务',
      content: '删除后无法恢复, 确认吗?',
      confirmText: '删除',
      confirmColor: '#f5222d',
      success: async (r) => {
        if (!r.confirm) return
        wx.showLoading({ title: '删除中' })
        try {
          const resp = await api.deleteUserScheduledOp(id)
          wx.hideLoading()
          if (resp.code) {
            wx.showToast({ title: '已删除', icon: 'success' })
            this.loadList()
          } else {
            const errMsg = resp.message || resp.msg || '请稍后再试'
            wx.showModal({ title: '删除失败', content: errMsg, showCancel: false })
          }
        } catch (err) {
          wx.hideLoading()
          wx.showToast({ title: '网络异常', icon: 'none' })
        }
      },
    })
  },

})
