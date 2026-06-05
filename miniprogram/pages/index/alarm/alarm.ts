// miniprogram/pages/index/alarm/alarm.js
import api from "../../../utils/api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Alarm: [] as Uart.uartAlarmObject[],
    filteredAlarm: [] as Uart.uartAlarmObject[],  // 派生：filter 后的列表
    filter: 'all' as 'all' | 'unconfirmed',
    unconfirmedCount: 0,  // 派生：当前已加载未确认数
    globalUnconfirmed: 0,  // KPI:全系统未确认(无日期范围)
    rangeTotal: 0,  // KPI:当前日期范围内的告警总数
    date: '',
    dateShow: false,
    minDate: new Date(2020, 0, 1).getTime(),
    maxDate: Date.now(),
    userInfo: {} as Uart.UserInfo,
    // 分页状态
    page: 1,
    pageSize: 50,
    total: 0,
    hasNext: false,
    loading: false,
    listLoading: false,
  },

  onLoad: async function () {
    wx.showLoading({ title: '加载数据' })
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    const start = this.formatDate(date)
    const end = this.formatDate(new Date())
    const user = await api.userInfo()
    this.setData({
      date: start + '-' + end,
      userInfo: user.data,
      Alarm: [],
      filteredAlarm: [],
      unconfirmedCount: 0,
      globalUnconfirmed: 0,
      page: 1,
    })
    // 并行拉全系统未确认 + 当前日期范围告警
    await Promise.all([
      this.refreshGlobalUnconfirmed(),
      this.getAlarmInfo(),
    ])
    wx.hideLoading()
  },

  // 拉全系统未确认数（无日期范围，独立于 date range）
  async refreshGlobalUnconfirmed() {
    const { code, data } = await api.getAlarmunconfirmed()
    if (code === 200 && typeof data === 'number') {
      this.setData({ globalUnconfirmed: data })
    }
  },

  /**
   * 订阅下次告警（公众号绑定说明）
   * 注：之前 if (userInfo.wxId) return 会在已绑定用户上静默早退，移除后按钮始终有响应
   */
  subMessage() {
    // 直接跳转到公众号文章页（不做 modal 提示）
    const url = encodeURIComponent('http://mp.weixin.qq.com/s?__biz=MjM5MjA1MTgxOQ==&mid=304819939&idx=1&sn=d0bcd922033075afa2b5219fc95ebb1e&chksm=3173a9e7060420f1a98d0040d964a2f82af25289a731d1400c5224ca9bb3d225d737700700a8#rd')
    wx.navigateTo({ url: '/pages/index/web/web?url=' + url })
  },

  // 获取告警信息（首次拉第 1 页）
  async getAlarmInfo() {
    if (this.data.loading) return
    this.setData({ loading: true })
    const [s, e] = this.data.date.split('-')
    const startTs = new Date(s + ' 0:0:0').getTime()
    const endTs = new Date(e + ' 23:59:59.999').getTime()
    const { code, data, msg } = await api.getAlarm(startTs, endTs, 1, this.data.pageSize)
    this.setData({ loading: false })
    if (code) {
      const items = (data?.items || []).map(el => {
        el.time = this.formattime(el.timeStamp)
        return el
      })
      const total = data?.pagination?.total || 0
      this.setData({
        Alarm: items,
        total,
        rangeTotal: total,
        hasNext: items.length < total,
        page: 1,
      }, () => {
        this.rebuildDerived()
        this.refreshBadge(items)
      })
      wx.setStorage({ key: 'alarm_list', data: items })
    } else {
      wx.showModal({
        title: '发生错误',
        content: msg || '未知错误'
      })
    }
  },

  // 触底加载下一页
  async onReachBottom() {
    if (this.data.listLoading || !this.data.hasNext) return
    const nextPage = this.data.page + 1
    this.setData({ listLoading: true })
    const [s, e] = this.data.date.split('-')
    const startTs = new Date(s + ' 0:0:0').getTime()
    const endTs = new Date(e + ' 23:59:59.999').getTime()
    const { code, data } = await api.getAlarm(startTs, endTs, nextPage, this.data.pageSize)
    this.setData({ listLoading: false })
    if (code) {
      const items = (data?.items || []).map(el => {
        el.time = this.formattime(el.timeStamp)
        return el
      })
      this.setData({
        Alarm: this.data.Alarm.concat(items),
        hasNext: this.data.Alarm.length + items.length < this.data.total,
        page: nextPage,
      }, () => this.rebuildDerived())
    }
  },

  // 派生：filteredAlarm + unconfirmedCount
  rebuildDerived() {
    const filter = this.data.filter
    const unconfirmedCount = this.data.Alarm.filter(el => !el.isOk).length
    const filteredAlarm = filter === 'unconfirmed'
      ? this.data.Alarm.filter(el => !el.isOk)
      : this.data.Alarm
    this.setData({ filteredAlarm, unconfirmedCount })
  },

  // 切换 filter
  onFilterTap(e: vantEvent) {
    const k = e.currentTarget.dataset.key as 'all' | 'unconfirmed'
    if (k === this.data.filter) return
    this.setData({ filter: k }, () => this.rebuildDerived())
  },

  // 卡片内"确认"按钮：直接确认（不弹 modal，不跳公众号）
  async onConfirmTap(e: vantEvent) {
    const alarm = e.currentTarget.dataset.item as any as Uart.uartAlarmObject & { _id: string }
    if (alarm.isOk) return
    wx.showLoading({ title: '确认告警信息' })
    await api.confrimAlarm(alarm._id)
    const targetId = (alarm as any)._id
    const next = this.data.Alarm.map((el: any) => (el as any)._id === targetId ? { ...el, isOk: true } : el)
    this.setData({
      Alarm: next,
      globalUnconfirmed: Math.max(0, this.data.globalUnconfirmed - 1),
    }, () => this.rebuildDerived())
    wx.setTabBarBadge({ index: 1, text: this.data.Alarm.filter((el: any) => !el.isOk).length.toString() })
    wx.hideLoading()
  },

  refreshBadge(items: Uart.uartAlarmObject[]) {
    const alarmNum = items.filter(el => !el.isOk).length
    if (alarmNum > 0) wx.setTabBarBadge({ index: 1, text: alarmNum.toString() })
    else wx.removeTabBarBadge({ index: 1 })
  },

  // 显示日期选择器
  showCalendar() {
    this.setData({ dateShow: true })
  },
  onClose() {
    this.setData({ dateShow: false });
  },
  formatDate(date: Date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event: any) {
    const [start, end] = event.detail;
    this.setData({
      dateShow: false,
      date: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
    this.getAlarmInfo()
  },

  // 整卡片点击：弹 modal（保留旧行为，不跳公众号）
  showalarm(event: vantEvent<Uart.uartAlarmObject & { _id: string }>) {
    const alarm = event.currentTarget.dataset.item
    const key = event.currentTarget.dataset.key as number
    wx.showModal({
      title: alarm.mac,
      content: alarm.msg,
      showCancel: !alarm.isOk,
      confirmText: alarm.isOk ? '确定' : '确认消息',
      success: async (res) => {
        if (res.confirm && !alarm.isOk) {
          wx.showLoading({ title: '确认告警信息' })
          await api.confrimAlarm(alarm._id)
          this.setData({
            [`Alarm[${key}].isOk`]: true,
          }, () => this.rebuildDerived())
          wx.setTabBarBadge({ index: 1, text: this.data.Alarm.filter(el => !el.isOk).length.toString() })
          wx.hideLoading()
        }
      }
    })
  },

  // 全部确认
  allQuest() {
    wx.showModal({
      title: "Tips",
      content: "是否确认全部告警信息?",
      success: async (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '确认告警信息' })
          await api.confrimAlarm()
          this.setData({ globalUnconfirmed: 0 })
          wx.startPullDownRefresh()
          wx.hideLoading()
        }
      }
    })
  },

  // 下拉刷新
  async onPullDownRefresh() {
    await Promise.all([
      this.refreshGlobalUnconfirmed(),
      this.getAlarmInfo(),
    ])
    wx.stopPullDownRefresh()
  },

  formattime(time: number) {
    if (time == null || isNaN(new Date(time).getTime())) return '—'
    const Dates = new Date(time)
    return `${Dates.getMonth() + 1}-${Dates.getDate()} ${Dates.getHours()}:${Dates.getMinutes()}:${Dates.getSeconds()}`
  }
})
