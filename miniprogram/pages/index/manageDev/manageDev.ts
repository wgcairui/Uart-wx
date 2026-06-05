// miniprogram/pages/index/manageDev/manageDev.ts

import api from "../../../utils/api"
import { ObjectToStrquery } from "../../../utils/util"

interface DevItem {
  DevMac: string
  name: string
  online: boolean
  mountCount: number
  onlineMountCount: number
}

Page({
  data: {
    // 原始数据
    devs: [] as Uart.Terminal[],
    // 派生
    devItems: [] as DevItem[],
    onlineCount: 0,
    offlineCount: 0,
    totalMountCount: 0,
    onlineMountCount: 0,
  },

  onLoad() {
    this.fetchList()
  },

  onShow() {
    this.fetchList()
  },

  fetchList() {
    api.BindDev().then((el) => {
      if (el.code) {
        const uts = el.data.UTs as unknown as Uart.Terminal[]
        this.setData({ devs: uts as any })
        this.rebuildDevs(uts)
      }
    })
  },

  /**
   * 派生 DTU 卡片数据：在线/离线数 + 每项挂载数
   * 注：WXML 不能调 page 方法，所有派生项必须进 data
   */
  rebuildDevs(UTs: Uart.Terminal[]) {
    const items: DevItem[] = UTs.map((dtu) => {
      const mounts = dtu.mountDevs || []
      return {
        DevMac: dtu.DevMac,
        name: dtu.name || dtu.DevMac,
        online: Boolean(dtu.online),
        mountCount: mounts.length,
        onlineMountCount: mounts.filter((m: any) => m.online).length,
      }
    })

    // 在线优先，组内按 mac 字典序保稳定
    items.sort((a, b) => {
      if (a.online !== b.online) return a.online ? -1 : 1
      return a.name.localeCompare(b.name)
    })

    const onlineCount = items.filter((i) => i.online).length
    const totalMountCount = items.reduce((s, i) => s + i.mountCount, 0)
    const onlineMountCount = items.reduce((s, i) => s + i.onlineMountCount, 0)

    this.setData({
      devItems: items,
      onlineCount,
      offlineCount: items.length - onlineCount,
      totalMountCount,
      onlineMountCount,
    })
  },

  /* === Actions === */
  toDev(event: WechatMiniprogram.TouchEvent) {
    const { mac } = event.currentTarget.dataset as { mac: string }
    wx.navigateTo({
      url: '/pages/index/manageDev/mountDevs/mountDevs' + ObjectToStrquery({ mac }),
    })
  },

  onAddTap() {
    wx.navigateTo({ url: '/pages/index/bindDev/bindDev' })
  },

  onPullDownRefresh: async function () {
    await new Promise<void>((resolve) => {
      api.BindDev().then((el) => {
        if (el.code) {
          const uts = el.data.UTs as unknown as Uart.Terminal[]
          this.setData({ devs: uts as any })
          this.rebuildDevs(uts)
        }
        resolve()
      })
    })
    wx.stopPullDownRefresh()
  },
})
