import api from "../../../utils/api"

type DataPoint = { name: string, value: string, time: number }
interface Row { time: number, timeText: string, value: string, rel: string, isLatest: boolean }

// 短窗口（数据量小）一次拿够的 pageSize
const LARGE_PAGE_SIZE = 200

Page({
  data: {
    name: '',
    mac: '',
    pid: '' as any,
    unit: '',
    rangeType: '24h' as '1h' | '6h' | '24h' | '7d',
    timeText: '',
    latest: null as null | { value: string },
    loading: true,
    empty: false,
    error: false,
    rows: [] as Row[],
    total: 0,
    hasNext: false,
    isLoadingMore: false,
    rangeOptions: [
      { label: '1小时', value: '1h' },
      { label: '6小时', value: '6h' },
      { label: '24小时', value: '24h' },
      { label: '7天', value: '7d' },
    ],
  },

  _allItems: [] as DataPoint[],
  _currentPage: 1,
  _pageSize: 50,
  _relTimer: null as any,

  onLoad(options: { name: any, mac: any, pid: any, unit?: any }) {
    wx.setNavigationBarTitle({ title: options.name || '参数趋势' })
    this.setData({
      name: options.name,
      mac: options.mac,
      pid: options.pid,
      unit: options.unit || '',
    })
  },

  onReady() {
    this.fetchData()
  },

  onUnload() {
    if (this._relTimer) {
      clearInterval(this._relTimer)
      this._relTimer = null
    }
  },

  onPullDownRefresh() {
    this.fetchData().then(() => wx.stopPullDownRefresh())
  },

  onRangeChange(e: vantEvent) {
    const v = e.currentTarget.dataset.value as any
    this.setData({
      rangeType: v,
      loading: true,
      empty: false,
      error: false,
      rows: [],
      total: 0,
      hasNext: false,
    })
    this._currentPage = 1
    this.fetchData()
  },

  // 触底加载
  onScrollToLower() {
    if (this.data.isLoadingMore || !this.data.hasNext) return
    if (this.data.loading || this.data.empty || this.data.error) return
    this._currentPage += 1
    this.loadMore()
  },

  // 复制值
  onCopy(e: vantEvent) {
    const v = e.currentTarget.dataset.value
    if (!v) return
    wx.setClipboardData({
      data: v,
      success: () => wx.showToast({ title: '已复制', icon: 'success', duration: 1200 })
    })
  },

  // 重试
  onRetry() {
    this.setData({ loading: true, error: false, rows: [], total: 0, hasNext: false })
    this._currentPage = 1
    this.fetchData()
  },

  // 首次拉数据：按 rangeType 选不同 pageSize
  async fetchData(): Promise<void> {
    const { mac, pid, name, rangeType } = this.data
    const end = Date.now()
    const start = end - this.rangeMs(rangeType)
    this.setData({ timeText: this.formatRange(start, end) })

    // 短窗口一次拿够（pageSize=200），最大 7d 数据量也小
    const pageSize = LARGE_PAGE_SIZE

    const res = await api.getTerminalDataHistory(mac, pid, name, start, end, 1, pageSize)
    console.log('[line] fetch page 1:', res?.data?.pagination)

    if (res.code !== 0 || !res.data) {
      this.setData({ loading: false, error: true, rows: [], total: 0, hasNext: false })
      return
    }

    const { items, pagination } = res.data
    if (items.length === 0) {
      this.setData({ loading: false, empty: true, rows: [], total: 0, hasNext: false, latest: null })
      return
    }

    this._allItems = items
    this._currentPage = 1

    // 直接渲染原始数据，不做桶聚合
    // 理由：200 条单页数据移动端 scroll-view 渲染毫无压力（虚拟化 2000+ 节点都能撑），
    //       桶聚合的代价是丢数据精度（每桶只取首条，剩下 99% 的数据被丢）。
    //       即便翻 44 页累计 8800 条，仍在可接受范围。
    //       要看真实数据就看真实数据，不要为了"视觉简洁"丢精度。
    const rows = this.buildRows(items, 0, true)
    const total = pagination?.total || items.length
    const hasNext = pagination?.hasNext ?? false

    this.setData({
      loading: false,
      empty: false,
      error: false,
      rows,
      total,
      hasNext,
      latest: { value: items[0].value },
    })
    this.startRelTimer()
  },

  // 加载更多（继续分页）— 直接拼到 _allItems 末尾，rows 也拼上
  async loadMore() {
    this.setData({ isLoadingMore: true })
    const { mac, pid, name, rangeType } = this.data
    const end = Date.now()
    const start = end - this.rangeMs(rangeType)

    const res = await api.getTerminalDataHistory(mac, pid, name, start, end, this._currentPage, this._pageSize)
    if (res.code === 0 && res.data?.items?.length) {
      this._allItems = [...this._allItems, ...res.data.items]
      // 直接 build 整张表（不桶），i=0 的 isLatest 仍是首条（最新）
      const rows = this.buildRows(this._allItems, 0, true)
      this.setData({
        rows,
        hasNext: res.data.pagination?.hasNext ?? false,
      })
    }
    this.setData({ isLoadingMore: false })
  },

  /**
   * 把数据点直接转成 Row（不聚合，不丢精度）
   * reset=true 时第一条标记 isLatest（最新点）
   */
  buildRows(points: DataPoint[], _skipCount: number, reset: boolean): Row[] {
    return points.map((d, i) => ({
      time: d.time,
      timeText: this.formatTime(d.time),
      value: d.value,
      rel: this.relTime(d.time),
      isLatest: reset && i === 0,
    }))
  },

  // 相对时间
  relTime(ts: number): string {
    const diff = Date.now() - ts
    if (diff < 60_000) return '刚刚'
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} 分钟前`
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} 小时前`
    const d = new Date(ts)
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
  },

  // 短窗口下定时刷新
  startRelTimer() {
    if (this._relTimer) {
      clearInterval(this._relTimer)
      this._relTimer = null
    }
    if (this.data.rangeType === '1h' || this.data.rangeType === '6h') {
      this._relTimer = setInterval(() => {
        const rows = this.data.rows.map(r => ({
          ...r,
          rel: this.relTime(r.time),
        }))
        this.setData({ rows })
      }, 30_000)
    }
  },

  formatTime(t: number): string {
    const d = new Date(t)
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  },

  formatRange(start: number, end: number): string {
    const fmt = (t: number) => {
      const d = new Date(t)
      const pad = (n: number) => n.toString().padStart(2, '0')
      return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
    }
    return `${fmt(start)} → ${fmt(end)}`
  },

  rangeMs(type: string): number {
    switch (type) {
      case '1h': return 60 * 60 * 1000
      case '6h': return 6 * 60 * 60 * 1000
      case '24h': return 24 * 60 * 60 * 1000
      case '7d': return 7 * 24 * 60 * 60 * 1000
      default: return 24 * 60 * 60 * 1000
    }
  },
})
