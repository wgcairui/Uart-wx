# ladisuart 视觉风格指南

本文档定义 ladisuart 微信小程序所有页面的视觉设计规范。新增/修改任何页面前先看这里，保持全站一致。

> 适用范围：`miniprogram/pages/**`（用户端 + 管理端共用一套设计语言）

---

## 1. 设计原则

1. **卡片化**——单列卡片布局，状态条 + 主区 + 缩略图三段式
2. **渐变 Hero**——所有页面顶部都用同一个蓝紫渐变 `linear-gradient(135deg, #487ed9 0%, #3158b8 100%)`
3. **数字优先**——KPI 区用大号 + 700 字重 + 数字字体 stack
4. **派生数据**——WXML 只能读 data 字段，**不能调 page 方法**（详见 §6）
5. **rpx 固定**——容器宽用 rpx 不用百分比，canvas/微信渲染对百分比不友好
6. **轻依赖**——避免新增 van-* 组件，能用 emoji + CSS 实现就用纯样式

---

## 2. 颜色 Token

### 2.1 主题色
| 用途 | 色值 | 备注 |
|---|---|---|
| 主色 | `#487ed9` | 按钮、链接、active pill |
| 主色深 | `#3158b8` | 渐变终点、按钮按下 |
| 文字主 | `#1a2438` | 标题、卡内重点 |
| 文字次 | `#3a4256` | 卡内正文 |
| 文字弱 | `#7c8595` | 时间戳、次要信息 |
| 文字更弱 | `#8a93a6` | label、placeholder |
| 文字最弱 | `#c0c5d2` | arrow、空状态 |

### 2.2 状态色
| 状态 | 主 | 浅底 | 用途 |
|---|---|---|---|
| 在线 | `#2ecf8a` | `rgba(46, 207, 138, 0.12)` | dev-pill、状态条 |
| 在线深 | `#1aa86c` | — | 离线时对比（hero 上用 #2ecf8a 反白底） |
| 离线 | `#e54545` | `rgba(229, 69, 69, 0.12)` | dev-pill、状态条 |
| 离线/告警弱 | `#ffd54f` | — | KPI 黄（弱化离线感） |
| 告警红 | `#e54545` | — | 告警数、删除按钮 |
| 告警绿 | `#2f9e57` | — | 已确认 |

### 2.3 背景 / 边框
| 用途 | 色值 |
|---|---|
| 页面背景 | `#f4f7fb`（白）/ `#fafafa`（alarm 用） |
| 卡背景 | `#ffffff` |
| 卡内分隔 | `#f0f2f7` |
| 卡边框 | `#e9ecf3` |
| 缩略图背景 | `linear-gradient(135deg, #fafbfd 0%, #f1f4f9 100%)` |
| 卡片按下 | `#f4f7fb` |

---

## 3. 间距 / 圆角 / 阴影

### 3.1 圆角
| 用途 | 值 |
|---|---|
| Pill / 按钮 | `999rpx` |
| 卡 | `16rpx`（默认）/ `14rpx`（紧凑列表如 alarm） |
| Icon 容器 | `8rpx`（小）/ `10rpx`（中） |
| 空 toast | `12rpx` |
| 缩略图容器 | 不强制，emoji 居中即可 |

### 3.2 阴影
| 用途 | 阴影 |
|---|---|
| 卡片 | `0 4rpx 20rpx rgba(40, 60, 110, 0.06)` |
| 卡片按下 | `0 2rpx 8rpx rgba(40, 60, 110, 0.12)` |
| 浮按钮 | `0 6rpx 20rpx rgba(72, 126, 217, 0.32)` |
| 轻提示卡 | `0 2rpx 10rpx rgba(40, 60, 110, 0.05)` |
| pill 阴影 | 无（用浅底 + 文字色对比） |

### 3.3 间距
- 列表项间距: `16rpx` (margin-top)
- 卡内 padding: `20-24rpx`
- 元素间 gap: `8 / 10 / 12 / 16 / 20 / 24 / 28 / 36 rpx` 中选
- Hero 内 padding: `36rpx 28rpx 28rpx`

---

## 4. 字号 / 字重

| 用途 | size | weight | color |
|---|---|---|---|
| Hero 标题 | 34-38rpx | 600 | white |
| Hero 副标 | 22rpx | regular | white 0.85 |
| KPI 数字 | 36-38rpx | 700 | 视场景 |
| KPI label | 20rpx | regular | 0.85 |
| 卡片主名 | 30rpx | 600 | `#1a2438` |
| 卡片 meta-value | 24rpx | 500 | `#2d3850` |
| 卡片 meta-label | 22rpx | regular | `#8a93a6` |
| 卡片 pill | 22rpx | 500 | 视场景 |
| 菜单项 label | 28rpx | 500 | `#1f2533` |
| 菜单项 desc | 24rpx | regular | `#8a93a6` |
| 时间戳 | 20-22rpx | regular | `#7c8595` |
| **数字字体 stack** | `-apple-system, "DIN Alternate", "Helvetica Neue", sans-serif` |
| **等宽字体 stack** | `"JetBrains Mono", "SF Mono", Menlo, monospace` |

数字字体 stack 用在 KPI、未确认告警数、统计数字；等宽字体用在 MAC 地址、时间戳、pid 数字。

---

## 5. 通用组件模式

### 5.1 Hero 头

```css
.hero {
  background: linear-gradient(135deg, #487ed9 0%, #3158b8 100%);
  padding: 36rpx 28rpx 28rpx;
  color: #ffffff;
}
```

- 左：大标题 34rpx / 600
- 右：副标（在线 N · 总 M）
- 下方可选 KPI 3 列
- 右上角可放 icon-btn（危险动作放半透红底）

### 5.2 KPI 行

```css
.kpi-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12rpx; }
.kpi { background: rgba(255,255,255,0.14); border: 1rpx solid rgba(255,255,255,0.22); border-radius: 16rpx; padding: 18rpx 16rpx; text-align: center; }
.kpi-num { font-size: 36rpx; font-weight: 700; }
.kpi-label { font-size: 20rpx; opacity: 0.85; margin-top: 6rpx; }
```

### 5.3 设备卡（dev-card）

3 段式：状态条 + 主区 + 缩略图。

```css
.dev-card { position: relative; display: flex; background: #ffffff; border-radius: 16rpx; overflow: hidden; box-shadow: 0 4rpx 20rpx rgba(40, 60, 110, 0.06); }
.dev-card-status { width: 6rpx; }   /* 状态条：在线绿渐变 / 离线红渐变 */
.dev-card-main   { flex: 1; padding: 22rpx 24rpx 20rpx; }
.dev-card-pic    { width: 140rpx; background: linear-gradient(135deg, #fafbfd 0%, #f1f4f9 100%); }
```

- dev-pic-box 统一容器 `100rpx × 100rpx`
- 真实图 / 占位 emoji 都用同一布局（无背景）
- dev-card-pic 背景渐变足够"暖"，不再叠额外底色

### 5.4 Pill（在线 / 离线）

```css
.dev-pill { display: flex; align-items: center; gap: 6rpx; padding: 4rpx 14rpx; border-radius: 999rpx; font-size: 22rpx; }
.dev-pill.is-online  { background: rgba(46, 207, 138, 0.12); color: #1aa86c; }
.dev-pill.is-offline { background: rgba(229, 69, 69, 0.12); color: #e54545; }
```

- hero 上的 pill 用反色：底 `rgba(46,207,138,0.22)` + 字 `#bdf3d4`
- 点 dot 用对应色 + `0 0 0 3rpx rgba(同色, 0.3)` 阴影圈

### 5.5 菜单行 / 列表行

- 单行 = `[icon 容器 44rpx]` + `[label flex:1]` + `[desc 可选]` + `[arrow ›]`
- 危险行：整行文字 `#e54545`，icon 容器 `rgba(229, 69, 69, 0.10)`
- active 反馈：`background: #f4f7fb`

### 5.6 底部固定按钮

```css
.footer-add { position: fixed; left: 0; right: 0; bottom: 0; padding: 20rpx 28rpx 32rpx; background: linear-gradient(180deg, rgba(244,247,251,0) 0%, #f4f7fb 60%); }
.footer-add-btn { background: linear-gradient(135deg, #487ed9 0%, #3158b8 100%); color: #ffffff; border-radius: 999rpx; padding: 22rpx 0; box-shadow: 0 6rpx 20rpx rgba(72, 126, 217, 0.32); }
```

### 5.7 缩略图占位策略

| 设备类型 | emoji | 真图来源 |
|---|---|---|
| UPS | 🔋 | DEV_PICS["UPS"] |
| 温湿度 | 🌡 | DEV_PICS["温湿度"] |
| 电量仪 | ⚡ | DEV_PICS["电量仪"] |
| 空调 | ❄ | DEV_PICS["空调"] |
| DTU（网关） | 📡 | 无 |
| 其他 | 📟 | 无 |

未匹配 Type 用 📟 兜底。emoji 直接放进 `.dev-pic-box` 容器，**不要叠 image 背景**。

---

## 6. TS / WXML 约定

### 6.1 WXML 表达式限制

- **不能调 page 方法**（WXML 只接受 data 字段 + 纯表达式 + `wx:for` 等指令）
- 所有 boolean 状态必须派生到 data 数组
- 模板里调 `{{ isXxx(item) }}` → **永远不更新**（编译不报错，运行时坑）

### 6.2 派生模式

```ts
// 反例：调 page 方法
isAlarmPillChecked(item, key) { ... }

// 正例：派生到 data
rebuildAlarmItems() {
  const items = source.map(x => ({ ...x, options: x.options || x.parse || [], checked: ... }))
  this.setData({ items })
}
```

参考实现：`pages/index/alarmSetting/alarmSetting.ts`（rebuildShowItems / rebuildAlarmItems）。

### 6.3 字段容错

不同来源字段名不一致时（API 历史包袱）：

```ts
const opts = row.options || row.parse || []
```

不要只挑一个写——加双兼容兜底。

### 6.4 排序稳定

- 在线优先：`(a.online !== b.online) ? (a.online ? -1 : 1) : 0`
- 组内用 name / mac 字典序兜底，避免 setData 顺序跳动
- updateTime 如果是相对时间字符串（"1 分钟前更新"），`new Date().getTime()` 解析不了，得 fallback 到原顺序

### 6.5 Page() 选项 sibling 字段不一定是 page 实例属性

写在 `Page({ data: {...} })` **同层**但不在 data 里的字段（如 `devPics: {...}`），运行时 `this.devPics` 可能是 undefined。

- 修法：常量配置必须放**模块顶层 const**（用全大写命名提醒），不要放 Page options 的 sibling 字段
- 编译器不报错（tsc 只看类型），运行时崩才发现

### 6.6 Page 内事件分发

多入口跳同一处理（如菜单卡 + hero 都触发 onAddTap），用 `data-*` 传 url/bindtap + 单一 `onMenuTap` 入口分发：

```html
<view data-url="{{item.url}}" data-bindtap="{{item.bindtap}}" bindtap="onMenuTap">...</view>
```

```ts
onMenuTap(e) {
  const { url, bindtap } = e.currentTarget.dataset
  if (url) wx.navigateTo({ url })
  else if (typeof this[bindtap] === 'function') this[bindtap]()
}
```

比每个 item 单独 bindtap 干净。

---

## 7. 布局容器对照表

| 场景 | 容器 | 关键 class |
|---|---|---|
| 设备列表 | 卡片 + 状态条 + 缩略图 | `.dev-card` + `.dev-card-status` + `.dev-card-main` + `.dev-card-pic` |
| 告警卡 | 简单白卡 + 状态点 + meta | `.alarm-card` + `.alarm-status` + `.alarm-head` + `.alarm-foot` |
| 菜单行 | 单行 + icon + 描述 + arrow | `.menu-row` + `.menu-icon` + `.menu-arrow` |
| KPI | 3 列网格 + 半透白底 | `.kpi-row` + `.kpi` + `.kpi-num` + `.kpi-label` |
| Pill | 行内小标签 | `.dev-pill.is-online / .is-offline` |
| 底部固定按钮 | 渐变胶囊 | `.footer-add` + `.footer-add-btn` |
| 空状态 | 居中大 emoji + 文字 | `.empty` + `.empty-icon` + `.empty-text` + `.empty-hint` |
| 过滤 chips | 行内圆角胶囊 | `.chip` + `.chip.is-active` |
| 危险动作按钮（hero） | 红色半透圆形 icon | `.hero-icon-btn` + `.hero-icon-btn-danger` |

---

## 8. 适配避坑

| 坑 | 现象 | 修法 |
|---|---|---|
| WXML 调 page 方法 | UI 永远不更新 | 派生到 data |
| 改 .ts 后 IDE 加载旧 .js | 改了等于没改 | 改完手动 `tsc` 编译 + IDE 点"编译" |
| npm 包装在根目录 | `miniprogram_npm/` 找不到 | 装到 `miniprogram/package.json` |
| `<image>` 不指定宽高 | 跟占位 view 对不齐 | 用 100rpx 容器强制宽高（统一 `.dev-pic-box`） |
| 百分比宽 + canvas | 渲染异常 | 用固定 rpx |
| 卡片多层 padding 叠加 | 内容挤压 | 容器一次性定 padding，内部用 gap |
| Page options sibling 字段 | 运行时 undefined | 常量放模块顶层 const |

---

## 9. 已应用页面（基线）

| 页面 | 状态 | 备注 |
|---|---|---|
| `pages/index/index` | 已重做 | hero KPI + dev-card 单列 |
| `pages/index/alarm/alarm` | 已重做 | hero + filter + alarm-card |
| `pages/index/user/user` | 已重做 | hero + 账号信息 + 菜单 sections |
| `pages/index/manageDev/manageDev` | 已重做 | hero + KPI + dev-card + 底部按钮 |
| `pages/index/manageDev/mountDevs/mountDevs` | 已重做 | hero + KPI + dev-card + 行内删除 |

新增/修改页面时，先来这里查 token 和组件模式，不要从零设计。
