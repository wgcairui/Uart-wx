// miniprogram/pages/index/manageDev/mountDevs/mountDevs.ts

import { ObjectToStrquery } from "../../../../utils/util"
import api from "../../../../utils/api"

// 设备类型 → emoji 占位（与 index 主页 DEV_PICS 思路一致）
const TYPE_EMOJI: Record<string, string> = {
  "UPS": "🔋",
  "温湿度": "🌡",
  "电量仪": "⚡",
  "空调": "❄",
}

interface MountItem {
  pid: number
  mountDev: string
  protocol: string
  type: string
  online: boolean
  icon: string  // 派生 emoji
}

Page({
  data: {
    mac: '',
    // 原始
    terminal: {} as Uart.Terminal,
    // 派生
    mountItems: [] as MountItem[],
    onlineCount: 0,
    totalCount: 0,
  },

  onLoad: function (options: { mac: string }) {
    this.setData({ mac: options.mac })
    this.start()
  },

  onShow() {
    this.start()
  },

  start() {
    api.getTerminal(this.data.mac).then((el) => {
      if (el.code) {
        this.setData({ terminal: el.data })
        this.rebuildMounts(el.data)
      }
    })
  },

  /**
   * 派生挂载设备列表 + 统计
   */
  rebuildMounts(terminal: Uart.Terminal) {
    const mounts = terminal.mountDevs || []
    const items: MountItem[] = mounts.map((m: any) => ({
      pid: m.pid,
      mountDev: m.mountDev,
      protocol: m.protocol,
      type: m.Type || '',
      online: Boolean(m.online),
      icon: TYPE_EMOJI[m.Type] || '📟',
    }))

    // 在线优先，组内按 name 字典序
    items.sort((a, b) => {
      if (a.online !== b.online) return a.online ? -1 : 1
      return a.mountDev.localeCompare(b.mountDev)
    })

    this.setData({
      mountItems: items,
      onlineCount: items.filter((i) => i.online).length,
      totalCount: items.length,
    })
  },

  /* === Actions === */
  toAdd() {
    wx.navigateTo({
      url: '/pages/index/manageDev/addMountDev/addMountDev' + ObjectToStrquery({ mac: this.data.mac }),
      events: {
        addSuccess: () => {
          wx.nextTick(() => setTimeout(() => wx.startPullDownRefresh(), 500))
        },
      },
    })
  },

  /**
   * 列表行的「删除挂载」按钮（catchtap 防冒泡触发卡片其他动作）
   */
  onDelMountTap(e: WechatMiniprogram.TouchEvent) {
    const item = (e.currentTarget.dataset as any).item as MountItem
    wx.showModal({
      title: '解除挂载！',
      content: `确定解除挂载设备：${item.mountDev} ？`,
      success: (res) => {
        if (res.confirm) {
          api.delTerminalMountDev(this.data.mac, item.pid).then(() => this.start())
        }
      },
    })
  },

  /**
   * Hero 右上角「删除 DTU」危险操作
   */
  onDelDtuTap() {
    const { name, DevMac } = this.data.terminal
    wx.showModal({
      title: '删除DTU',
      content: `是否删除DTU: ${name}？`,
      success: (res) => {
        if (res.confirm) {
          api.delUserTerminal(DevMac).then(() => wx.navigateBack())
        }
      },
    })
  },

  onPullDownRefresh: function () {
    this.start()
    setTimeout(() => wx.stopPullDownRefresh(), 300)
  },
})
