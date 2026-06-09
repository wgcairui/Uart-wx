import unitCache from "../../../utils/unitCache"
import api from "../../../utils/api"
import { ObjectToStrquery } from "../../../utils/util"

Page({
  data: {
    active: 'show' as 'show' | 'threshold' | 'alarm',
    protocol: '',
    usersetup: {} as Uart.ProtocolConstantThreshold,
    syssetup: {} as Uart.ProtocolConstantThreshold,
    Protocols: {} as Uart.protocol,
    showTag: [] as string[],
    showItems: [] as { name: string, checked: boolean }[],  // 显示参数 tab 用的派生数据
    alarmStat: [] as Uart.ConstantAlarmStat[],
    alarmItems: [] as { name: string, options: { key: string, text: string, checked: boolean }[] }[],  // 参数状态 tab 派生
    Threshold: [] as Uart.Threshold[],
    // 改前快照
    snapshot: {
      showTag: [] as string[],
      Threshold: [] as Uart.Threshold[],
      alarmStat: [] as Uart.ConstantAlarmStat[],
    },
    // 顶部统计
    stats: { showCount: 0, thresholdCount: 0, alarmCount: 0, alarmTotal: 0 },
    // 派生：参数状态 tab 的空选状态（用于顶部红条提示）
    emptyAlarmRows: 0,
    allAlarmEmpty: false,
    // dirty 标记
    dirty: false,
    tabs: [
      { key: 'show', label: '显示参数' },
      { key: 'threshold', label: '参数限值' },
      { key: 'alarm', label: '参数状态' },
    ] as { key: string, label: string }[],
  },

  onLoad: async function (options: any) {
    const protocol = options.protocol
    if (!protocol) {
      wx.navigateTo({ url: '/pages/index/alarmSetting/index' })
      return
    }
    const tabKey = (options.type === '1' ? 'threshold' : options.type === '2' ? 'alarm' : 'show') as any
    this.setData({ protocol, active: tabKey })
    await this.getUserProtocolSetup()
  },

  onShow() {
    this.refreshStats()
  },

  // 拉协议配置
  async getUserProtocolSetup() {
    wx.showLoading({ title: '获取协议配置' })
    const userSetup = await api.getUserAlarmProtocol(this.data.protocol)
    const sysSetup = await api.getAlarmProtocol(this.data.protocol)
    const Protocols = await api.getProtocol(this.data.protocol)
    wx.hideLoading()
    if (userSetup && sysSetup) {
      const showTag = userSetup.data.ShowTag || []
      this.setData({
        usersetup: userSetup.data,
        syssetup: sysSetup.data,
        Protocols: Protocols.data,
        showTag,
        Threshold: sysSetup.data.Threshold || [],
        alarmStat: sysSetup.data.AlarmStat || [],
        snapshot: {
          showTag: [...showTag],
          Threshold: JSON.parse(JSON.stringify(sysSetup.data.Threshold || [])),
          alarmStat: JSON.parse(JSON.stringify(sysSetup.data.AlarmStat || [])),
        },
      })
      // 总是全量拉一次，保证 stats / showItems / alarmItems 都到位
      this.updateThre()
      this.updateAlarm()
      this.rebuildShowItems()
      this.rebuildAlarmItems()
      this.refreshStats()
    } else {
      wx.showModal({ title: "Error", content: '设备协议不支持配置' })
    }
  },

  onPullDownRefresh() {
    this.getUserProtocolSetup().then(() => wx.stopPullDownRefresh())
  },

  // === Tab 切换 ===
  onTabClick(e: vantEvent) {
    const k = e.currentTarget.dataset.key
    this.setData({ active: k })
    wx.setNavigationBarTitle({ title: '协议配置-' + (this.data.tabs.find(t => t.key === k) as any)?.label })
    if (k === 'threshold') this.updateThre()
    if (k === 'alarm') this.updateAlarm()
  },

  // === 显示参数 toggle ===
  onShowTagToggle(e: vantEvent) {
    const name = e.currentTarget.dataset.name as string
    const cur = this.data.showTag
    const next = cur.includes(name) ? cur.filter(x => x !== name) : [...cur, name]
    this.setData({ showTag: next, dirty: true }, () => {
      this.rebuildShowItems()
      this.refreshStats()
    })
  },

  // 从 showTag 派生 showItems（含 checked 字段，给 wxml 用）
  rebuildShowItems() {
    const showTag = this.data.showTag
    const sysTags = this.data.syssetup.ShowTag || []
    const items = sysTags.map(name => ({ name, checked: showTag.includes(name) }))
    this.setData({ showItems: items })
  },

  // 从 alarmStat 派生 alarmItems（含 options[].checked，给 wxml 用）
  // 同时给每行加 hasSelected（用户是否至少选了一项）让 UI 提示空选状态
  rebuildAlarmItems() {
    const items = this.data.alarmStat.map((row: any) => {
      const alarmStat = row.alarmStat || []
      // 兼容：updateAlarm 注入的是 row.options，但保留 row.parse 兜底
      const opts: any[] = row.options || row.parse || []
      const options = opts.map((opt: any) => ({
        ...opt,
        checked: alarmStat.includes(opt.key),
      }))
      return {
        name: row.name,
        options,
        hasSelected: alarmStat.length > 0,
      }
    })
    // 派生：是否有任何 row 有配置 / 全部 row 都是空
    const totalRows = items.length
    const emptyRows = items.filter((i) => !i.hasSelected).length
    const allEmpty = totalRows > 0 && emptyRows === totalRows

    // 空数组是后端合法状态（默认/全部取消都 = []），但仍是"无配置"提示
    // 首次进入未操作时（dirty=false）不显示 banner（避免新用户一脸懵）
    // 用户点过 pill 后（dirty=true）才显示，作为信息性提示
    const showEmptyHint = allEmpty && this.data.dirty

    this.setData({ alarmItems: items, emptyAlarmRows: emptyRows, allAlarmEmpty: showEmptyHint })
  },

  // === 限值 ===
  updateThre() {
    const { usersetup, syssetup } = this.data
    const sysMap = new Map(syssetup.Threshold?.map((el: any) => [el.name, el]) || [])
    if (usersetup?.Threshold) {
      ;[...this.data.Threshold, ...usersetup.Threshold].forEach((val: any) => {
        sysMap.set(val.name, val)
      })
    }
    this.setData({ Threshold: Array.from(sysMap.values()) as any })
  },

  onThresholdClick(e: vantEvent<Uart.Threshold>) {
    const item = e.currentTarget.dataset.item
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/index/alarmSetting/threshold/threshold' + ObjectToStrquery({ ...item }),
      events: {
        modifyThreshold: (data: Uart.Threshold) => {
          const next = [...this.data.Threshold]
          next[index] = { ...(data as any), icon: 'star' } as any
          this.setData({ Threshold: next, dirty: true })
        }
      }
    })
  },

  addThreshold() {
    const ua = this.data.usersetup?.AlarmStat || []
    const keys = new Set([...this.data.alarmStat.map((el: any) => el.name), ...ua.map((el: any) => el.name)])
    wx.navigateTo({
      url: '/pages/index/alarmSetting/addThreshold/addThreshold' + ObjectToStrquery({ protocol: this.data.protocol, keys: Array.from(keys).join(',') }),
      events: {
        addThreshold: (data: Uart.Threshold) => {
          const newThre = this.data.Threshold.concat(data as any)
          this.setData({ Threshold: newThre, dirty: true })
        }
      }
    })
  },

  // === 状态告警 ===
  updateAlarm() {
    const { usersetup, syssetup, Protocols } = this.data
    const sysMap = new Map(syssetup.AlarmStat?.map((el: any) => [el.name, el]) || [])
    if (usersetup?.AlarmStat) {
      ;[...usersetup.AlarmStat, ...this.data.alarmStat].forEach((val: any) => {
        sysMap.set(val.name, val)
      })
    }
    // 给每个 row 注入 options 数组（用 unitCache.getunitObject 直接拿数组）
    const parseMap = this.parseProtocol(Protocols)
    // 记录未被 protocols 覆盖的 alarmStat name（命名不匹配排查用）
    const matchedNames: string[] = []
    const unmatchedNames: string[] = []
    sysMap.forEach((el: any, key: string) => {
      el.options = parseMap[key] || []
      if (parseMap[key]) matchedNames.push(key)
      else unmatchedNames.push(key)
    })
    console.log('[updateAlarm] alarmStat total:', sysMap.size, 'matched:', matchedNames.length, 'unmatched:', unmatchedNames)
    if (unmatchedNames.length) console.log('[updateAlarm] unmatched names (前 5):', unmatchedNames.slice(0, 5))
    this.setData({ alarmStat: Array.from(sysMap.values()) as any }, () => {
      this.rebuildAlarmItems()
    })
  },

  parseProtocol(Protocols: Uart.protocol) {
    // 返回 { 参数名: options数组 }，options 来自 unitCache 解析的 {k:v} 字符串
    if (!Protocols?.instruct) return {} as { [x: string]: { key: string, text: string }[] }
    const arr: { [x: string]: { key: string, text: string }[] } = {}
    let parsed = 0
    let skipped = 0
    const skipReasons = { noIsState: 0, noUnit: 0, unitFormat: 0 }
    const sampleSkips: any[] = []
    Protocols.instruct.forEach((instruct: any) => {
      instruct.formResize.forEach((el: any) => {
        const isStateBool = el.isState === true || el.isState === 1 || el.isState === '1' || el.isState === 'true'
        const hasUnit = el.unit && /^\{.*\}$/.test(el.unit)
        if (isStateBool && hasUnit) {
          arr[el.name] = unitCache.getunitObject(1, el.unit) as any
          parsed++
        } else {
          skipped++
          if (!isStateBool) skipReasons.noIsState++
          else if (!el.unit) skipReasons.noUnit++
          else if (!/^\{.*\}$/.test(el.unit)) skipReasons.unitFormat++
          if (sampleSkips.length < 3) sampleSkips.push({ name: el.name, isState: el.isState, unit: el.unit })
        }
      })
    })
    console.log('[parseProtocol] instruct count:', Protocols.instruct.length, 'parsed:', parsed, 'skipped:', skipped, 'skip reasons:', skipReasons, 'sample arr keys:', Object.keys(arr).slice(0, 5))
    if (sampleSkips.length) console.log('[parseProtocol] sample skipped:', sampleSkips)
    return arr
  },

  isAlarmPillChecked(_item: Uart.ConstantAlarmStat, _key: string): boolean {
    // 改用 alarmItems.options[].checked
    return false
  },

  onAlarmPillTap(e: vantEvent) {
    const name = e.currentTarget.dataset.itemName as string
    const optKey = e.currentTarget.dataset.optKey as string
    const cur = (this.data.alarmStat.find((r: any) => r.name === name) as any)?.alarmStat || []
    const next = cur.includes(optKey)
      ? cur.filter((x: string) => x !== optKey)
      : [...cur, optKey]
    // 更新 alarmStat
    const newAlarmStat = this.data.alarmStat.map((row: any) => {
      if (row.name !== name) return row
      return { ...row, alarmStat: next }
    })
    this.setData({ alarmStat: newAlarmStat as any, dirty: true }, () => {
      this.rebuildAlarmItems()
    })
  },

  // === 保存 ===
  async onSave() {
    const { protocol, showTag, alarmStat, Threshold } = this.data
    const { snapshot } = this.data
    const tasks: Promise<any>[] = []

    // 注：空 alarmStat[] 是后端合法状态（默认 / 全部取消都合法），不在前端阻止保存
    // 行为契约：dirty 门控的 banner 仅做信息提示，不拦截 submit

    // 1. ShowTag（diff 判定）
    const oldShowtags = (snapshot.showTag || []).slice().sort()
    const newShowtags = (showTag || []).slice().sort()
    if (oldShowtags.join(',') !== newShowtags.join(',')) {
      tasks.push(api.setUserSetupProtocol(protocol, 'ShowTag', showTag || []))
    }

    // 2. AlarmStat（diff 判定）
    const oldAlarm = JSON.stringify(snapshot.alarmStat || [])
    const newAlarm = JSON.stringify(alarmStat || [])
    if (oldAlarm !== newAlarm) {
      tasks.push(api.setUserSetupProtocol(protocol, 'AlarmStat', alarmStat))
    }

    // 3. Threshold（diff 判定）
    const oldThre = JSON.stringify(snapshot.Threshold || [])
    const newThre = JSON.stringify(Threshold || [])
    if (oldThre !== newThre) {
      const data = (Threshold as any).map((el: any) => ({ name: el.name, min: el.min, max: el.max }))
      tasks.push(api.setUserSetupProtocol(protocol, 'Threshold', data))
    }

    if (tasks.length === 0) {
      wx.hideLoading()
      wx.showToast({ title: '没有修改', icon: 'none' })
      return
    }

    wx.showLoading({ title: '保存中...' })

    const results = await Promise.allSettled(tasks)
    wx.hideLoading()
    const failures = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && (r.value as any)?.code !== 200))
    if (failures.length === 0) {
      wx.showToast({ title: '已保存', icon: 'success' })
    } else {
      wx.showToast({ title: `${failures.length} 项保存失败`, icon: 'error' })
    }
    this.setData({
      dirty: false,
      snapshot: {
        showTag: [...(showTag || [])],
        Threshold: JSON.parse(JSON.stringify(Threshold || [])),
        alarmStat: JSON.parse(JSON.stringify(alarmStat || [])),
      },
    })
  },

  refreshStats() {
    // alarmCount 改为 "已配置 X / 总 Y" 格式，避免分子 > 分母的反直觉（AGENTS.md「N/M 计数反直觉」约定）
    const configuredAlarms = (this.data.alarmStat as any[]).filter((r) => (r.alarmStat || []).length > 0).length
    this.setData({
      stats: {
        showCount: this.data.showTag.length,
        thresholdCount: this.data.Threshold.length,
        alarmCount: configuredAlarms,
        alarmTotal: this.data.alarmStat.length,
      }
    })
  },
})
