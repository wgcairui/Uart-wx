// miniprogram/pages/index/manageDev/addMountDev/addMountDev.ts

import api from "../../../../utils/api"

interface PickerOption {
  text: string
  value: string | number
  // 仅协议项携带：通信类型（Uart.communicationType = 232 | 485）
  // 用于派生 pidOptions：232 锁死 0，485 从 1 起
  commType?: Uart.communicationType
}

Page({
  data: {
    // DTU 上下文
    terminal: {} as Uart.Terminal,
    mac: '',

    // 设备类型（写死 4 类）
    devTypes: [
      { text: 'UPS', value: 'UPS' },
      { text: '空调', value: '空调' },
      { text: '电量仪', value: '电量仪' },
      { text: '温湿度', value: '温湿度' },
    ] as PickerOption[],
    devTypeIndex: 0,

    // 设备型号（按类型拉）
    devModals: [] as PickerOption[],
    devModalIndex: -1,

    // 设备协议（按型号拉）
    devProtocols: [] as PickerOption[],
    devProtocolIndex: -1,

    // 设备地址（pid：按协议分支生成 — 232 锁死 0，485 从 1 起）
    pidOptions: [] as PickerOption[],
    pidIndex: -1,
    // 派生：协议规则说明 / 无可用 PID 警告
    pidHint: '',
    pidWarnText: '',

    // 派生：DTU 协议互斥 — 已挂设备锁定 commType，新加设备必须用相同协议
    lockedCommType: null as Uart.communicationType | null,
    lockedCommTypeLabel: '',  // 'RS-232' / 'RS-485' / ''

    // 派生：是否就绪
    isReady: false,
  },

  onLoad: async function (options: { mac: string }) {
    if (!options.mac) {
      wx.switchTab({ url: '/pages/index/index' })
      return
    }
    this.setData({ mac: options.mac })
    const { data: terminal } = await api.getTerminal(options.mac)
    if (!terminal) {
      wx.showToast({ title: 'DTU 不存在', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 800)
      return
    }
    this.setData({ terminal })
    wx.setNavigationBarTitle({ title: terminal.name || '添加设备' })
    // 反查 DTU 已挂设备的 commType（协议互斥约束）
    await this.rebuildLockedCommType(terminal)
    // 不在此处调用 rebuildPidOptions：协议未选，由 onTypeChange → onModalChange 链尾生成
    await this.onTypeChange({ detail: { value: 0 } } as any)
  },

  /* === 设备类型选择 === */
  async onTypeChange(e: WechatMiniprogram.PickerChange) {
    const index = e.detail.value as unknown as number
    const value = this.data.devTypes[index]?.value as string
    this.setData({ devTypeIndex: index })
    const { data } = await api.getDevTypes(value)
    const devModals = (data || []).map((el: any) => ({ text: el.DevModel, value: el.DevModel }))
    this.setData({
      devModals,
      devModalIndex: devModals.length > 0 ? 0 : -1,
      devProtocols: [],
      devProtocolIndex: -1,
    })
    // 联动：选第一个型号后自动拉协议
    if (devModals.length > 0) {
      await this.onModalChange({ detail: { value: 0 } } as any)
    } else {
      this.rebuildReady()
    }
  },

  /* === 设备型号选择 === */
  async onModalChange(e: WechatMiniprogram.PickerChange) {
    const index = e.detail.value as unknown as number
    const devModal = this.data.devModals[index]?.value as string
    this.setData({ devModalIndex: index })
    const { data } = await api.getDevTypes(this.data.devTypes[this.data.devTypeIndex].value as string)
    const dev = (data || []).find((el: any) => el.DevModel === devModal)
    // 拉协议时同时带 commType（Uart.communicationType = 232 | 485），用于派生 pidOptions
    // 协议互斥约束：lockedCommType 不为空时只保留同 commType 的协议
    const locked = this.data.lockedCommType
    const devProtocols: PickerOption[] = (dev?.Protocols || [])
      .filter((el: any) => !locked || el.Type === locked)
      .map((el: any) => ({
        text: el.Protocol,
        value: el.Protocol,
        commType: el.Type as Uart.communicationType,
      }))
    const autoIndex = devProtocols.length > 0 ? 0 : -1
    this.setData({
      devProtocols,
      devProtocolIndex: autoIndex,
    })
    // 协议确定后，立刻派生 pidOptions（按 RS-232 / RS-485 规则分支）
    const autoProtocol = autoIndex >= 0 ? devProtocols[autoIndex] : undefined
    this.rebuildPidOptions(autoProtocol, this.data.terminal)
    this.rebuildReady()
  },

  /* === 设备协议选择 === */
  onProtocolChange(e: WechatMiniprogram.PickerChange) {
    const index = e.detail.value as unknown as number
    const protocol = this.data.devProtocols[index]
    this.setData({ devProtocolIndex: index })
    // 协议变了，pidOptions 必须重算（232 ↔ 485 切换会让可用 PID 完全不同）
    this.rebuildPidOptions(protocol, this.data.terminal)
    this.rebuildReady()
  },

  /* === 设备地址（pid）选择 === */
  onPidChange(e: WechatMiniprogram.PickerChange) {
    this.setData({ pidIndex: e.detail.value as unknown as number })
    this.rebuildReady()
  },

  /* === 派生：就绪状态 === */
  rebuildReady() {
    const { devTypeIndex, devModalIndex, devProtocolIndex, pidIndex } = this.data
    const isReady =
      devTypeIndex >= 0 &&
      devModalIndex >= 0 &&
      devProtocolIndex >= 0 &&
      pidIndex >= 0
    this.setData({ isReady })
  },

  /**
   * 协议互斥约束：DTU 已挂载设备（如果存在）的 commType 反查
   *
   * 业务规则：一个 DTU 不能同时绑定 RS-232 和 RS-485 设备（硬件特性）。
   * 实现：从 terminal.mountDevs[0] 反查 getDevTypes(设备类型) → 找到 mountDev 匹配的
   *       DevModel → 在 Protocols 里匹配 protocol 名 → 拿到 commType
   *
   * 互斥保证：
   * 1. devProtocols 派生时按 lockedCommType 过滤（picker 中看不到不兼容协议）
   * 2. onSubmit 提交时再校验一次（防 devProtocols 拉取到提交期间状态变化）
   */
  async rebuildLockedCommType(terminal: Uart.Terminal) {
    if (!terminal.mountDevs || terminal.mountDevs.length === 0) {
      this.setData({ lockedCommType: null, lockedCommTypeLabel: '' })
      return
    }
    const first = terminal.mountDevs[0] as any
    try {
      const { data } = await api.getDevTypes(first.Type)
      const dev = (data || []).find((d: any) => d.DevModel === first.mountDev)
      const p = dev?.Protocols?.find((pp: any) => pp.Protocol === first.protocol)
      const commType = p?.Type as Uart.communicationType | undefined
      if (commType === 232 || commType === 485) {
        this.setData({
          lockedCommType: commType,
          lockedCommTypeLabel: commType === 232 ? 'RS-232' : 'RS-485',
        })
      } else {
        // 反查不出来（后端数据异常 / 老数据无 protocol 字段），按"无锁定"处理
        this.setData({ lockedCommType: null, lockedCommTypeLabel: '' })
      }
    } catch (e) {
      this.setData({ lockedCommType: null, lockedCommTypeLabel: '' })
    }
  },

  /**
   * 按协议分支生成 pidOptions：
   * - RS-232：点对点通信，PID 锁死为 0（0 已被占则告警）
   * - RS-485：总线通信，PID 从 1 开始（0 是广播地址，禁用），排除已挂载的 PID
   * - 其他协议：兜底走 485 规则
   *
   * 注意：用 Protocols[].Type 字段（值是字面量 232 / 485）判断通信类型，
   *      不要用 Protocol 名称字符串去正则匹配。
   *
   * 同时派生 pidHint（规则说明）和 pidWarnText（无可用 PID 时的具体警告）
   */
  rebuildPidOptions(protocol: PickerOption | undefined, terminal: Uart.Terminal) {
    const hasPid = new Set((terminal.mountDevs || []).map((el: any) => el.pid))
    const isRs232 = protocol?.commType === 232

    let options: PickerOption[] = []
    let pidHint = ''
    let pidWarnText = ''

    if (isRs232) {
      // RS-232 锁死 PID 0
      if (hasPid.has(0)) {
        options = []
        pidWarnText = 'RS-232 协议要求 PID 锁死为 0，但 0 已被其他设备占用。请先解绑 PID 0 上的设备。'
      } else {
        options = [{ text: '0', value: 0 }]
        pidHint = 'RS-232 为点对点通信，PID 锁死为 0'
      }
    } else {
      // RS-485 / 其他：PID 从 1 开始（0 是广播地址，禁用）
      for (let i = 1; i < 256; i++) {
        if (!hasPid.has(i)) options.push({ text: String(i), value: i })
      }
      if (options.length === 0) {
        pidWarnText = 'RS-485 协议 PID 1-255 已全部被占用，需要先解绑一些设备'
      } else {
        pidHint = 'RS-485 为总线通信，PID 从 1 起始（0 为广播地址，禁用）'
      }
    }

    this.setData({
      pidOptions: options,
      pidIndex: options.length > 0 ? 0 : -1,
      pidHint,
      pidWarnText,
    })
  },

  /* === 提交 === */
  async onSubmit() {
    if (!this.data.isReady) return
    const {
      devTypes, devTypeIndex,
      devModals, devModalIndex,
      devProtocols, devProtocolIndex,
      pidOptions, pidIndex,
      terminal,
      lockedCommType, lockedCommTypeLabel,
    } = this.data

    // 提交前双重校验：所选协议 commType 必须与已锁定 commType 一致
    // （理论上 devProtocols 派生时已过滤，但 submit 端再做一次兜底）
    const chosenProtocol = devProtocols[devProtocolIndex]
    if (lockedCommType && chosenProtocol?.commType !== lockedCommType) {
      wx.showModal({
        title: '协议互斥冲突',
        content: `该 DTU 已绑定 ${lockedCommTypeLabel} 设备，新加设备必须使用相同的 ${lockedCommTypeLabel} 协议。`,
        showCancel: false,
      })
      return
    }

    const payload = {
      Type: devTypes[devTypeIndex].value as string,
      mountDev: devModals[devModalIndex].value as string,
      protocol: chosenProtocol.value as string,
      pid: pidOptions[pidIndex].value as number,
    }
    const { code, message } = await api.addTerminalMountDev(terminal.DevMac, payload as any)
    // 业务成功 = code === 200（项目约定，见 AGENTS.md「业务成功判定」节）
    if (code === 200) {
      // 通知上一页刷新（emit 失败不能影响主流程 —— 之前 navigateBack 没执行就是 emit 抛错打断了 setTimeout 调度）
      try {
        this.getOpenerEventChannel().emit('addSuccess', { stat: true })
      } catch (e) { /* 父页面没注册 events 时静默 */ }
      wx.showToast({ title: '添加成功', icon: 'success' })
      // toast 全局可见，跨页也能看，不必等 600ms
      setTimeout(() => wx.navigateBack(), 300)
    } else {
      wx.showModal({ title: '提交失败', content: message || '请检查参数并重新提交' })
    }
  },
})
