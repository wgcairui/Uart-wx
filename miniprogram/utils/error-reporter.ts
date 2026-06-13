// miniprogram/src/services/error-reporter.service.ts
//
// 全局前端错误上报服务
// 设计目标: 把运行时未捕获错误(同步/异步/网络/页面)集中上报到后端 /api/v2/user/error-log
//
// 关键约束 (对齐 server 规范 v1 + 2026-06-13 协商结果):
// - 节流: 同 (error.message + page) 在 60s 内只发 1 次
// - 队列上限: 100 条
// - 持久化: wx.setStorageSync('pending_errors_v1', ...) FIFO 截断, 1MB 上限
// - 冷启动: App.onLaunch 一次性 flush 最多 20 条, 批间隔 3s
// - 7 天 TTL: 持久化或冷启动时, timestamp 超过 7 天的直接丢
// - A 类 (同步阻塞) 走 wx.request 立即发
// - B 类 (异步/Promise rejection/低优) 进队列
// - 失败 1 次就丢, console.warn 留可观测日志
//
// 入口 (在 app.ts 挂):
//   errorReporter.install()   // 注册 wx.onError / wx.onUnhandledRejection / Page.onError mixin
//   errorReporter.report(err, ctx)  // 主动上报
//
// 调用方: 不要直接读 .flushQueue, 走 report() 接口.

import api from "./api"

type ErrorLevel = 'A' | 'B'

interface ClientErrorLog {
  error: string
  stack: string
  page: string
  timestamp: number
  appVersion: string
  systemInfo: Record<string, any>
  userId?: string
  extra?: Record<string, any>
}

interface QueuedError extends ClientErrorLog {
  __level: ErrorLevel
  __retries: number
  __enqueuedAt: number
}

const STORAGE_KEY = 'pending_errors_v1'
const QUARANTINE_KEY = 'pending_errors_v1_quarantine'  // 解析失败 dead-letter (server 拍 v2)
const STORAGE_MAX_BYTES = 1024 * 1024          // 1MB
const QUARANTINE_MAX_LENGTH = 200              // quarantine 容量上限
const QUEUE_MAX_LENGTH = 100
const THROTTLE_WINDOW_MS = 60 * 1000            // 60s
const COLD_START_FLUSH_BATCH = 20
const COLD_START_FLUSH_INTERVAL_MS = 3 * 1000   // 3s
const ERROR_TTL_MS = 7 * 24 * 60 * 60 * 1000    // 7 天
const STACK_MAX_BYTES = 20 * 1024               // 20KB (对齐 server DTO max)
const REQUEST_TIMEOUT_MS = 10 * 1000

class ErrorReporter {
  /** 内存队列 (B 类低优, 等待 flush) */
  private queue: QueuedError[] = []

  /** 节流缓存: key = `${page}::${errorMessage}` -> 上次上报时间戳 */
  private throttleMap = new Map<string, number>()

  /** 冷启动 flush 是否进行中 (防止重叠) */
  private coldFlushing = false

  /** 已安装标记 (幂等) */
  private installed = false

  /** systemInfo 缓存 (避免重复 wx.getSystemInfoSync) */
  private systemInfoCache: Record<string, any> | null = null

  /** appVersion 缓存 */
  private appVersionCache: string = ''

  /**
   * 入口: 挂载全局错误监听
   * 在 App.onLaunch 第一行调用
   */
  install() {
    if (this.installed) return
    this.installed = true

    // 1. App.onError (同步未捕获)
    const app = typeof getApp === 'function' ? getApp() : null
    if (app) {
      const origOnError = (app as any).onError
      if (typeof origOnError === 'function') {
        ;(app as any).onError = (err: any) => {
          this.report(err, { source: 'App.onError', level: 'A' })
          return origOnError.call(app, err)
        }
      }
    }

    // 2. wx.onError (兜底, 部分机型 App.onError 拿不到)
    if (typeof wx.onError === 'function') {
      wx.onError((err: any) => {
        this.report(err, { source: 'wx.onError', level: 'A' })
      })
    }

    // 3. wx.onUnhandledRejection (Promise rejection 未 .catch)
    if (typeof wx.onUnhandledRejection === 'function') {
      wx.onUnhandledRejection((res: any) => {
        // res.reason 可能是 Error / string / object
        this.report(res?.reason, { source: 'wx.onUnhandledRejection', level: 'B' })
      })
    }

    // 4. Page.onError mixin - 通过 Page() 包装
    this.installPageMixin()

    // 5. 冷启动 flush 持久化队列
    this.scheduleColdStartFlush()
  }

  /**
   * 主动上报 (页面 try/catch 后想主动塞进来, 也走这条)
   */
  report(err: any, ctx: { source: string; level?: ErrorLevel; extra?: Record<string, any> } = { source: 'manual' }) {
    try {
      const payload = this.normalize(err, ctx)
      if (!payload) return

      // 7 天 TTL 闸
      if (Date.now() - payload.timestamp > ERROR_TTL_MS) {
        return
      }

      // 节流闸: 同 (page + error.message) 60s 内只发 1 次
      const throttleKey = `${payload.page}::${payload.error}`
      const lastTs = this.throttleMap.get(throttleKey)
      const now = Date.now()
      if (lastTs && now - lastTs < THROTTLE_WINDOW_MS) {
        return
      }
      this.throttleMap.set(throttleKey, now)

      const level: ErrorLevel = ctx.level || 'B'
      const queued: QueuedError = {
        ...payload,
        __level: level,
        __retries: 0,
        __enqueuedAt: now,
      }

      if (level === 'A') {
        // A 类: 立即发, 不入队 (绕过节流队列的批处理)
        this.sendImmediate(queued)
      } else {
        // B 类: 入队, 触发 flush
        this.enqueue(queued)
        this.scheduleFlush()
      }
    } catch (e) {
      // reporter 自身出错, 不能抛, 否则会触发新的错误循环
      console.warn('[error-reporter] report() failed:', e)
    }
  }

  /**
   * 把 err 规范化为 ClientErrorLog
   */
  private normalize(err: any, ctx: { source: string; extra?: Record<string, any> }): ClientErrorLog | null {
    if (err == null) return null

    // err 可能是 string, Error, Event, 或普通 object
    let errorMsg = ''
    let stackStr = ''

    if (err instanceof Error) {
      errorMsg = err.message || err.name || 'Error'
      stackStr = err.stack || ''
    } else if (typeof err === 'string') {
      errorMsg = err
      stackStr = err
    } else if (typeof err === 'object') {
      // wx.onError 经常传进来是 { errMsg, stack } 这种
      errorMsg = err.message || err.errMsg || JSON.stringify(err).slice(0, 200)
      stackStr = err.stack || err.errMsg || ''
    } else {
      errorMsg = String(err)
      stackStr = String(err)
    }

    if (!errorMsg) return null

    // stack 截断 20KB
    if (stackStr && stackStr.length > STACK_MAX_BYTES) {
      stackStr = stackStr.slice(0, STACK_MAX_BYTES) + '\n...[truncated]'
    }

    const page = this.getCurrentPage()
    const systemInfo = this.getSystemInfo()
    const appVersion = this.getAppVersion()
    const userId = this.getUserId()

    return {
      error: errorMsg.slice(0, 2000),  // DTO max
      stack: stackStr || errorMsg,
      page: page.slice(0, 500),         // DTO max
      timestamp: Date.now(),
      appVersion: appVersion.slice(0, 64),
      systemInfo,
      userId,
      extra: {
        source: ctx.source,
        ...ctx.extra,
      },
    }
  }

  /** 入队 (B 类) */
  private enqueue(queued: QueuedError) {
    this.queue.push(queued)
    if (this.queue.length > QUEUE_MAX_LENGTH) {
      // 队列上限: 丢最老的
      this.queue.shift()
    }
  }

  /** 调度 flush (debounce 1s, 避免高频触发) */
  private flushTimer: ReturnType<typeof setTimeout> | null = null
  private scheduleFlush() {
    if (this.flushTimer) return
    this.flushTimer = setTimeout(() => {
      this.flushTimer = null
      this.flushQueue()
    }, 1000)
  }

  /** A 类立即发: 不走队列, 失败就丢 + console.warn */
  private sendImmediate(queued: QueuedError) {
    const { __level, __retries, __enqueuedAt, ...payload } = queued
    this.send(payload).catch((e: any) => {
      console.warn('[error-reporter] immediate send failed:', e?.statusCode, e?.errMsg)
    })
  }

  /** 队列 flush: 串行发, 失败就丢 */
  private async flushQueue() {
    if (this.queue.length === 0) return
    const batch = this.queue.splice(0, this.queue.length)
    for (const queued of batch) {
      const { __level, __retries, __enqueuedAt, ...payload } = queued
      try {
        await this.send(payload)
      } catch (e: any) {
        console.warn('[error-reporter] flush failed (drop):', e?.statusCode, e?.errMsg)
        // 失败 1 次就丢, 不重试
      }
    }
  }

  /**
   * 冷启动 flush: 从 storage 读持久化的待发错误, 分批发
   * 最多 20 条/次, 批间隔 3s, flush 完才清 storage
   */
  private scheduleColdStartFlush() {
    // 延迟 5s, 让首屏渲染完成再 flush, 避免阻塞
    setTimeout(() => this.coldStartFlush(), 5 * 1000)
  }

  private async coldStartFlush() {
    if (this.coldFlushing) return
    this.coldFlushing = true
    try {
      const persisted = this.loadPersisted()
      if (persisted.length === 0) return

      // 7 天 TTL 闸
      const now = Date.now()
      const valid = persisted.filter((p) => now - p.timestamp <= ERROR_TTL_MS)
      if (valid.length === 0) {
        this.clearPersisted()
        return
      }

      // 一次性最多 20 条
      const batch = valid.slice(0, COLD_START_FLUSH_BATCH)
      const remain = valid.slice(COLD_START_FLUSH_BATCH)

      for (const queued of batch) {
        const { __level, __retries, __enqueuedAt, ...payload } = queued
        try {
          await this.send(payload)
        } catch (e: any) {
          console.warn('[error-reporter] cold start flush failed (drop):', e?.statusCode, e?.errMsg)
        }
        // 批间隔 3s
        await new Promise((r) => setTimeout(r, COLD_START_FLUSH_INTERVAL_MS))
      }

      // 更新 storage: 把剩余的写回去
      this.savePersisted(remain)
    } finally {
      this.coldFlushing = false
    }
  }

  /**
   * 实际发送: 走 api.fetch 走统一鉴权/响应包装
   * 失败抛错给上层处理
   */
  private async send(payload: ClientErrorLog) {
    return api.fetch('v2/user/error-log', payload, 'POST', REQUEST_TIMEOUT_MS)
  }

  /** 持久化当前队列到 storage (1MB FIFO) */
  private savePersisted(items: QueuedError[]) {
    try {
      // 用 "in-progress" + 队列双写
      // 1MB 上限: 按字节截断
      let serialized = JSON.stringify(items)
      if (serialized.length > STORAGE_MAX_BYTES) {
        // FIFO 截断: 从头丢
        while (items.length > 0 && serialized.length > STORAGE_MAX_BYTES) {
          items.shift()
          serialized = JSON.stringify(items)
        }
      }
      wx.setStorageSync(STORAGE_KEY, serialized)
    } catch (e) {
      console.warn('[error-reporter] savePersisted failed:', e)
    }
  }

  private loadPersisted(): QueuedError[] {
    const raw = wx.getStorageSync(STORAGE_KEY)
    if (!raw) return []

    // 整体 JSON 坏 (非 JSON 字符串) → 整条进 quarantine
    let arr: any[]
    try {
      arr = JSON.parse(raw)
    } catch (e) {
      this.appendQuarantine([raw])
      this.clearPersisted()
      console.warn('[error-reporter] JSON.parse failed, isolated to quarantine')
      return []
    }

    // 顶层不是数组 (例如被改写成 object) → 整条进 quarantine
    if (!Array.isArray(arr)) {
      this.appendQuarantine([arr])
      this.clearPersisted()
      return []
    }

    // 逐条 schema 校验, 失败移到 quarantine (dead-letter 模式, 防止误丢正常数据)
    const valid: QueuedError[] = []
    const invalid: any[] = []
    for (const el of arr) {
      if (
        el && typeof el === 'object' &&
        typeof el.error === 'string' && el.error.length > 0 &&
        typeof el.page === 'string' && el.page.length > 0 &&
        typeof el.timestamp === 'number'
      ) {
        valid.push(el as QueuedError)
      } else {
        invalid.push(el)
      }
    }

    if (invalid.length > 0) {
      this.appendQuarantine(invalid)
      console.warn(`[error-reporter] ${invalid.length} 条解析失败已隔离到 quarantine`)
    }
    return valid
  }

  /**
   * 追加到 quarantine 队列 (FIFO 200 + 7 天 TTL)
   * quarantine 永远不主动发, 只在 console.warn 提示, 留待人工捞
   */
  private appendQuarantine(items: any[]) {
    try {
      const exist = wx.getStorageSync(QUARANTINE_KEY)
      const arr = Array.isArray(exist) ? exist : []
      arr.push(...items)
      // FIFO 截断
      while (arr.length > QUARANTINE_MAX_LENGTH) {
        arr.shift()
      }
      // 7 天 TTL 闸 (跟主队列同 TTL)
      const now = Date.now()
      const ttl = ERROR_TTL_MS
      const fresh = arr.filter((el) =>
        el && typeof el === 'object' && typeof el.timestamp === 'number' && now - el.timestamp <= ttl
      )
      wx.setStorageSync(QUARANTINE_KEY, fresh)
    } catch (e) {
      console.warn('[error-reporter] appendQuarantine failed:', e)
    }
  }

  private clearPersisted() {
    try {
      wx.removeStorageSync(STORAGE_KEY)
    } catch (e) {
      // ignore
    }
  }

  // === helpers ===

  private getCurrentPage(): string {
    try {
      const pages = getCurrentPages()
      const last = pages[pages.length - 1]
      if (last) {
        // last.route 是 'pages/index/devs/devs' 形式
        return last.route || (last as any).__route__ || 'unknown'
      }
    } catch (e) {
      // ignore
    }
    return 'unknown'
  }

  private getSystemInfo(): Record<string, any> {
    if (this.systemInfoCache) return this.systemInfoCache
    try {
      // 优先用新 API, 降级到旧 API
      const sys = (typeof wx.getDeviceInfo === 'function'
        ? wx.getDeviceInfo()
        : wx.getSystemInfoSync?.() || {}) as any
      const app = (typeof wx.getAppBaseInfo === 'function'
        ? wx.getAppBaseInfo()
        : {}) as any
      this.systemInfoCache = {
        model: sys.model || '',
        system: sys.system || '',
        platform: sys.platform || '',
        SDKVersion: sys.SDKVersion || '',
        version: app.version || '',
        envVersion: app.envVersion || '',
        appId: app.appId || '',
      }
    } catch (e) {
      this.systemInfoCache = {}
    }
    return this.systemInfoCache
  }

  private getAppVersion(): string {
    if (this.appVersionCache) return this.appVersionCache
    try {
      const accountInfo = (typeof wx.getAccountInfoSync === 'function' ? wx.getAccountInfoSync() : null) as any
      this.appVersionCache = accountInfo?.miniProgram?.version || ''
    } catch (e) {
      this.appVersionCache = ''
    }
    return this.appVersionCache
  }

  private getUserId(): string {
    try {
      const app = getApp()
      return (app?.globalData as any)?.user || ''
    } catch (e) {
      return ''
    }
  }

  /**
   * Page mixin: 注入 onError 钩子
   * wx 框架的 Page() 是全局函数, 包一层即可
   */
  private pageMixinInstalled = false
  private installPageMixin() {
    if (this.pageMixinInstalled) return
    this.pageMixinInstalled = true
    const _Page = (globalThis as any).Page
    if (typeof _Page !== 'function') return
    ;(globalThis as any).Page = (options: any) => {
      const origOnError = options.onError
      options.onError = (err: any) => {
        this.report(err, { source: 'Page.onError', level: 'A' })
        if (typeof origOnError === 'function') {
          return origOnError.call(options, err)
        }
      }
      return _Page.call(globalThis, options)
    }
  }
}

const errorReporter = new ErrorReporter()
export default errorReporter
