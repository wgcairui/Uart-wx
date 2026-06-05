# AGENTS.md

本项目的 AI 协作注意事项（沉淀自实际踩坑，非文档可查到的信息）。

## 微信小程序开发约束

### npm 包必须装在 `miniprogram/package.json`

**问题**：开发者工具"工具 → 构建 npm"只扫描 `miniprogramRoot` 内的 `package.json`，**不读**根目录 `package.json`。如果 npm 包装在根目录的 `node_modules/`，构建后 `miniprogram_npm/` 不会出现该包，import 时报 `module 'miniprogram_npm/.../xxx' is not defined`。

**修法**：
```bash
cd miniprogram && npm install <pkg>
```
或在 `miniprogram/package.json` 的 `dependencies` 里加上，然后工具 → 构建 npm。

### 图表库选型优先级（按兼容性强弱排序）

| 方案 | 适用 | 坑 |
|---|---|---|
| **Table 方案**（view + scroll-view） | 数据点 < 500、admin 偶尔查值 | 不是曲线 |
| **手写 canvas2d** | 趋势图、压缩 area | 性能瓶颈在多点渲染 |
| **ec-canvas v1** | 老基础库（≤2.32）| 基础库 3.x + Skyline 渲染下 timeout |
| **ucharts / ec-canvas v2 / F2** | 需图表类型丰富时 | 体积大、需 npm、文档偏少 |

本项目当前主用户偏好 **Table 优先**（admin 核对场景），图表是次要。

### 表格列布局固定宽度最佳

数据列表头部和行用 `flex: 0 0 240rpx` 之类的固定宽度，**不要用百分比**。canvas 渲染对百分比宽度支持有坑，固定 rpx 更稳。

### 改 .ts 后必须手动跑 tsc 重新生成 .js

**问题**：`project.config.json` 配了 `"beforeCompile": "npm run tsc"`，但**实际 IDE 不一定自动触发**——改完 .ts 经常 IDE 还在加载旧 .js，**改了等于没改**。

**修法**：改完 .ts 后**必须**手动跑：
```bash
cd /Users/cairui/WeChatProjects/ladisuart
./node_modules/typescript/bin/tsc
```
然后在 IDE 里**点"编译"按钮**。验证：检查 `miniprogram/pages/.../xxx.js` 时间戳是否更新。

**Symptom when forgetting**: 改了 .ts 但页面行为不变，console 日志停留在旧版。**这是项目级最常见的"代码没生效"原因**。

### WXML 表达式不能调 page 方法——boolean 状态必须预计算到 data 数组

**问题**：WXML 表达式里**不能**写 `{{ isAlarmPillChecked(item, opt.key) }}` 这类调用 page 方法的语法（只能读 data 字段、`{{ a > b }}` 这类纯表达式、`wx:for` 这类指令）。所以"派生 boolean 状态"必须从 page 方法搬到 data 数组里。

**项目级解法**：所有 boolean UI 状态（toggle / checkbox / pill checked / 选中标记）都走 `rebuildXxxItems()` 派生到 data 数组，wxml 直接读 `item.checked`。

参考实现：`miniprogram/pages/index/alarmSetting/alarmSetting.ts`
- `rebuildShowItems()` 派生 `showItems[]`，每项含 `checked: boolean`
- `rebuildAlarmItems()` 派生 `alarmItems[]`，每项 `options[].checked: boolean`
- 模板里 `<view class="toggle {{item.checked ? 'is-on' : ''}}">` 直接读

**反例（坑过）**：`isAlarmPillChecked(item, key)` 写成 page 方法 → 模板里调不到 → UI 永远不更新。改名 `rebuildAlarmItems` 派生到 data 才是正解。

### API 分页响应统一约定

**响应结构**（所有列表类 endpoint）：
```ts
{
  code: 200,
  data: {
    items: [...],
    pagination: { page, pageSize, total }  // 只有这三个字段
  }
}
```

- `hasNext` / `hasPrev` / `totalPages` **后端不返回**，前端自己算：
  - `hasNext = page * pageSize < total`（首页） / `accumulated + items.length < total`（加载更多后）
- `pageSize` 默认 20，上限 200
- `sortBy` 必须白名单（`timeStamp` / `createdAt` / `mac` / `pid` 等），别瞎传字段名
- GET + query string 走用户端，POST + body 走管理端（不一定，看具体 controller）
- **后端走 class-validator 严格白名单**：query/body 参数名必须在 DTO 里 `.required()` 声明，**不要用多个独立 `@Query()` 绕过 DTO 严格模式**。如果觉得 DTO 难接，正确做法是新建/扩展一个 DTO（比如 `TimeRangePaginationReqDto extends PaginationReqDto`），不要 hack 4 个独立 @Query 绕过去。
- 时间戳字段名：DTO 风格用 `startTs` / `endTs`（不是 `start` / `end`），跟 `v1/startTs` 命名一致

参考：`miniprogram/utils/api.ts#getTerminalDataHistory`（POST + body）和 `#getAlarm`（GET + query string + `startTs`/`endTs`）。

### 业务成功判定：必须 `code === 200`，**不要**误判成 `code === 0`

**项目约定**：后端业务成功的响应是 `{ code: 200, data, message, status }`。

**正确写法**：
```ts
const { code, message } = await api.xxx(...)
if (code === 200) {
  // 成功
} else {
  wx.showModal({ title: '失败', content: message || '...' })
}
```

**容易踩的坑**：
- `pages/index/line/line.ts:116` 写的 `if (res.code !== 0 || !res.data)` 是 line.ts 自己的特殊判断（那个接口可能 code=0 表示"无数据"），**不能**推广为项目约定
- `if (code)` 在 `code === 200` 时能进 success 分支（200 truthy）——大部分现有页面这样写能 work，但**不显式**容易后续被误改

**反例（坑过）**：`addMountDev.ts` 的 `onSubmit` 原代码用 `if (code)`，业务成功时（200 truthy）确实能进 success 分支，但**实际没返回上一页**——根因是 `getOpenerEventChannel().emit(...)` 抛错打断了 `setTimeout(() => wx.navigateBack(), 600)` 的调度。修法：用 try/catch 包住 emit，navigateBack 不依赖 emit 是否成功。

---

### DTU 协议互斥：232 和 485 不能混挂

**业务规则**：一个 DTU 不能同时绑定 RS-232 和 RS-485 设备（硬件特性 —— RS-232 是点对点，RS-485 是总线，两者在物理层互斥）。

**前端实现**（防御性检查，后端理论上也该校验）：
1. 拉 terminal 时反查已挂设备的 commType，存到 `lockedCommType: Uart.communicationType | null`
   - 取 `terminal.mountDevs[0]` → `getDevTypes(first.Type)` → 找 `DevModel === first.mountDev` 的 DevModel → 在 Protocols 里匹配 `first.protocol` → 拿到 `p.Type`（232 或 485）
2. 派生 `devProtocols` 时按 `lockedCommType` 过滤（picker 中**看不到**不兼容协议）
3. UI 顶部加 🔒 banner 提示约束
4. 提交时**双重校验**（防 devProtocols 拉取到提交期间状态变化），不一致直接拒绝

**判断字段**：用 `Protocols[].Type`（值是字面量 232 / 485），**不要**用 `Protocol` 名称字符串正则匹配（见上文「业务规则判定用语义字段」约定）。

**反查失败处理**（网络错 / 后端数据异常 / 老数据无 protocol 字段）：按"无锁定"处理，让用户正常选，**不要**因为反查失败就误锁一个值。

参考实现：`miniprogram/pages/index/manageDev/addMountDev/addMountDev.ts`
- `rebuildLockedCommType(terminal)`：反查 + 派生
- `onModalChange`：`devProtocols` 拉取时 `.filter((el) => !locked || el.Type === locked)`
- `onSubmit`：提交前 `if (locked && chosenProtocol.commType !== locked)` 校验

---

### 显示参数 N/M 计数反直觉——用"已选 N · 模板 M"格式

**问题**：默认 `{{showTag.length}} / {{syssetup.ShowTag.length}}` 这种"分子/分母"在 `userSetup > syssetup` 时会变成 "14 / 13"（分子 > 分母），反直觉。

**修法**：用"已选 {{showTag.length}} · 模板 {{showItems.length}}" 格式，两个独立数字不形成比例。

**根因**：用户可能保存了模板外的 tag（历史脏数据 / 模板升级没回滚），硬要比就翻车。

## 项目结构

- `miniprogram/` 是小程序根目录（`project.config.json` 的 `miniprogramRoot`）
- 根目录 `package.json` 是构建工具链依赖
- 源码 `pages/` 用 TS 不用 JS（`allowJs: false`），编译产物 `.js` 不入库
- 公共 API 集中在 `miniprogram/utils/api.ts`
- 类型定义在 `typings/index.d.ts`（项目级），不要散落

## 提交规范

- 中文 commit message
- API 变更同步更新 `typings/index.d.ts`
- 重大功能走 worktree + MR；但**当前主用户偏好**直接改主仓库 master

## 视觉设计风格

所有页面的视觉规范已沉淀到 **[`docs/style-guide.md`](docs/style-guide.md)**，包含：

- 颜色 token（主题色 / 状态色 / 背景边框）
- 间距 / 圆角 / 阴影规范
- 字号 / 字重 / 字体 stack
- 通用组件模式（Hero / KPI / 设备卡 / Pill / 菜单行 / 底部按钮）
- TS / WXML 派生数据约定
- 适配避坑清单

**做新页面 / 改页面样式前必看**。已应用页面：index / alarm / user / manageDev / mountDevs。
