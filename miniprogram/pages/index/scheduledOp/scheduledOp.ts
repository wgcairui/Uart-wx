// miniprogram/pages/index/scheduledOp/scheduledOp.ts
import api from "../../../utils/api"

// miniprogram/pages/index/scheduledOp/scheduledOp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [] as Uart.ScheduledOperation[],
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
        items,
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

  /** 创建入口: 跳首页, 让用户选设备再走定时流程 */
  onCreateTap() {
    wx.showModal({
      title: '创建定时操作',
      content: '请到设备详情页 → 点击「操作指令」→ 选「定时发送」, 完成创建',
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
          // resp 是 universalResult shape: { code, data, message, status }
          if (resp.code === 200) {
            wx.showToast({ title: '已取消', icon: 'success' })
            this.loadList()
          } else {
            wx.showModal({ title: '取消失败', content: resp.message || '请稍后再试', showCancel: false })
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
          if (resp.code === 200) {
            wx.showToast({ title: '已入队, 等待 worker 执行', icon: 'success', duration: 2000 })
            this.loadList()
          } else {
            wx.showModal({ title: '触发失败', content: resp.message || '请稍后再试', showCancel: false })
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
          if (resp.code === 200) {
            wx.showToast({ title: '已删除', icon: 'success' })
            this.loadList()
          } else {
            wx.showModal({ title: '删除失败', content: resp.message || '请稍后再试', showCancel: false })
          }
        } catch (err) {
          wx.hideLoading()
          wx.showToast({ title: '网络异常', icon: 'none' })
        }
      },
    })
  },

})