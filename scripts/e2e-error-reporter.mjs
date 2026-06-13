// scripts/e2e-error-reporter.mjs
//
// e2e 联调脚本: 模拟小程序环境, 跑 utils/error-reporter.ts 走通 POST
// 2026-06-13 与 uart-server 联调 PR 21 用
//
// 用法:
//   cd /Users/cairui/WeChatProjects/ladisuart
//   URL_REQUEST=http://localhost:9010 TOKEN=eyJ... node scripts/e2e-error-reporter.mjs
//
// 这个脚本只跑联调, 跑完可以删

import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const MP_DIR = resolve(__dirname, '..', 'miniprogram')

// === mock wx 全局 (reporter + api 都需要) ===
const requests = []  // 记录所有 wx.request 调用
const mockStorage = {}
const globalAny = globalThis

let token = process.env.TOKEN || ''
if (!token) {
  console.error('FAIL: TOKEN env var not set')
  process.exit(1)
}

globalAny.wx = {
  // wx.request — reporter 通过 api.fetch 走这里
  request(opts) {
    requests.push(opts)
    // 模拟 fetch
    const url = opts.url
    const method = opts.method || 'GET'
    const data = opts.data
    const headers = opts.header || {}
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      body: data ? JSON.stringify(data) : undefined,
    })
      .then(async (r) => {
        const body = await r.json().catch(() => ({}))
        opts.success && opts.success({ data: body, statusCode: r.status })
        opts.complete && opts.complete()
      })
      .catch((e) => {
        opts.fail && opts.fail({ errMsg: e.message })
        opts.complete && opts.complete()
      })
  },

  // 持久化
  setStorageSync(k, v) { mockStorage[k] = v },
  getStorageSync(k) { return mockStorage[k] || '' },
  removeStorageSync(k) { delete mockStorage[k] },

  // 错误监听 (reporter.install() 用)
  onError(fn) { globalAny.__wx_onError = fn },
  onUnhandledRejection(fn) { globalAny.__wx_onUnhandledRejection = fn },

  // 系统信息
  getDeviceInfo() { return { model: 'iPhone 14 Pro', system: 'iOS 16.5', platform: 'devtools', SDKVersion: '3.4.0' } },
  getAppBaseInfo() { return { version: '1.0.0', envVersion: 'develop', appId: 'wxa118ac5f63abc0d5' } },
  getAccountInfoSync() { return { miniProgram: { version: '1.0.0' } } },

  // ws (api.js 不会真连, 不影响 error-log POST)
  connectSocket() { return { onClose() {}, onOpen() {}, onMessage() {}, send() {} } },
  setBackgroundFetchToken() {},
  hideLoading() {},
  showModal() {},
  navigateTo() {},
  switchTab() {},
  reLaunch() {},
  showToast() {},
}

// mock getApp() — reporter 通过 getApp() 拿 globalData.user
globalAny.getApp = () => ({ globalData: { user: token ? 'staging_test_user' : '' } })

// mock getCurrentPages() — reporter 拿当前 page
globalAny.getCurrentPages = () => [{ route: 'pages/index/manageDev/addMountDev/addMountDev' }]

// mock Page() — reporter.installPageMixin 包装 Page()
const origPage = globalAny.Page
globalAny.Page = (opts) => {
  if (typeof origPage === 'function') origPage(opts)
  return opts
}

// === 跑 reporter ===
const reporterMod = require(resolve(MP_DIR, 'utils', 'error-reporter.js'))
const reporter = reporterMod.default || reporterMod

// api instance 也 require 出来设 token (reporter 内部走同一个 api singleton)
const apiMod = require(resolve(MP_DIR, 'utils', 'api.js'))
const api = apiMod.default || apiMod
api.token = token
console.log('api.token set:', api.token.slice(0, 30) + '...')

console.log('=== staging e2e ===')
console.log('reporter instance:', !!reporter, 'has install:', typeof reporter.install)
console.log('has report:', typeof reporter.report)
console.log()

// 不真 install (会注册 wx.onError 等, mock 里也支持, 但污染 global), 直接用 report 入口
const scenarios = [
  {
    name: '1) 客户反馈 bug 同型 (同步阻塞 A 类)',
    err: new TypeError("Cannot read properties of null (reading 'Type')"),
    ctx: { source: 'App.onError', level: 'A' },
  },
  {
    name: '2) addMountDev.ts:168 现场模拟 (异步 B 类)',
    err: { message: "Cannot read properties of undefined (reading 'mountDev')", stack: 'at addMountDev (addMountDev.js:168:30)' },
    ctx: { source: 'wx.onUnhandledRejection', level: 'B', extra: { pid: 0, mac: 'DEMO-00-00-00-00-00' } },
  },
  {
    name: '3) dev-oprate 组件错误 (Page.onError 入口)',
    err: new Error("Cannot read property 'protocol' of undefined"),
    ctx: { source: 'Page.onError', level: 'A', extra: { component: 'dev-oprate' } },
  },
]

for (const s of scenarios) {
  console.log(`>>> ${s.name}`)
  reporter.report(s.err, s.ctx)
  console.log(`    report() called, ${requests.length} wx.request(s) queued\n`)
}

// 等待所有 fetch 落地
await new Promise((r) => setTimeout(r, 2000))

console.log('=== 响应结果 ===')
requests.forEach((req, i) => {
  console.log(`#${i + 1} ${req.method} ${req.url.replace('http://localhost:9010', '')}`)
  console.log(`    body:`, JSON.stringify(req.data).slice(0, 200) + (JSON.stringify(req.data).length > 200 ? '...' : ''))
})
console.log()
console.log(`=== 总结: ${requests.length} 条 POST 已发出 ===`)
console.log('接下来 mongosh 查 log.client_errors 验落库:')
console.log('  mongosh --host localhost:27017 UartServer --eval \'db.log.client_errors.find({userId: "staging_test_user"}).sort({_id: -1}).limit(5).pretty()\'')
