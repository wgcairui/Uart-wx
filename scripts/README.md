# scripts/

## e2e-error-reporter.mjs

前端 `utils/error-reporter.ts` 的 e2e 联调脚本 (2026-06-13 与 uart-server 联调 PR 21 时用).

**做什么**: mock `wx` 全局, require 编译产物 `utils/error-reporter.js` + `utils/api.js`, 走 reporter.report() 真实路径, 把 3 个 scenario 错误 POST 到 staging 后端.

**何时用**:
- 后端有 staging 服务时, 联调错误上报通路
- 改 reporter 节流/队列/持久化逻辑后, 端到端验证仍工作
- 复现"客户反馈某条 bug 同型"场景, 看能不能落库

**何时不用**:
- 单纯改 reporter 单元逻辑 → 用 jest 单测
- staging 不存在 → 跑不通, 报错

**用法**:
```bash
cd /Users/cairui/WeChatProjects/ladisuart
TOKEN=eyJ... node scripts/e2e-error-reporter.mjs
```

需要环境变量:
- `TOKEN` (必填): USER 角色临时 JWT (HS256, secret = `ladisWebSite`)

**输出**:
- 列出 3 条 POST 的请求体 + 响应
- 给 mongosh 命令, 查 `log.client_errors` 落库

**已知限制**:
- 假设后端跑在 `http://localhost:9010`, 改地址需要改脚本里的 fetch 路径 (reporter 内部走 `config.ts.urlRequest`)
- 假设 systemInfo 是写死的 iPhone/iOS mock, 真实场景由 reporter 内部 `wx.getDeviceInfo` 拿
- 假设后端 `db.log.client_errors` 集合已建好 (PR 21 已合才需要)
