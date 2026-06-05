import { ObjectToStrquery, parseTimeRelative } from "../../../utils/util"
import api from "../../../utils/api"

// 设备类型 → 缩略图 URL（模块顶层 const，AGENTS.md 约定：不要放 Page options sibling）
const DEV_PICS: Record<string, string> = {
  "UPS": 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/99daa3e07c7b60ef7e16ed8b9fe7cf33.png',
  "温湿度": 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/5fc7d6fe0571b714d5a3395a8c7a9f12.png',
  "电量仪": 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/ab52d9fccdddc0fa5b0386ea0b5cbc7f.png',
  "空调": 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/c3c1852270ca35fd56135d8fda2a9977.png',
}

// 定位失效判定：经纬度都接近 0（如后端默认值 "0.0000000,0.0000000"）
function isLocationValid(jw: string | undefined | null): boolean {
  if (!jw || jw.length < 10) return false
  const parts = jw.split(',')
  if (parts.length !== 2) return false
  const lon = parseFloat(parts[0])
  const lat = parseFloat(parts[1])
  if (isNaN(lon) || isNaN(lat)) return false
  return Math.abs(lon) > 0.0001 && Math.abs(lat) > 0.0001
}

// miniprogram/pages/index/dtu/dtu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mac: '',
    terminal: {} as Uart.Terminal,
    dtuItem: [] as (Uart.TerminalMountDevs & { pic?: string })[],
    locationValid: false,  // 定位是否有效（0,0 视为失效）
    longitude: '',
    latitude: '',
    markers: [] as any[],
    address: '',
    recommend: '',
    onlineMountCount: 0,
    offlineMountCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: { mac: string }) {
    this.setData({
      mac: options.mac
    })
    this.start()
  },

  async start() {
    const { data: terminal } = await api.getTerminal(this.data.mac)
    const jw = terminal.jw
    terminal.uptime = parseTimeRelative(terminal.uptime)

    const devs = (terminal.mountDevs || []).map((dev: any) => {
      dev.pic = DEV_PICS[dev.Type]
      return dev
    })
    const onlineMountCount = devs.filter((d: any) => d.online).length
    const offlineMountCount = devs.length - onlineMountCount

    this.setData({
      terminal,
      dtuItem: devs,
      locationValid: isLocationValid(jw),
      onlineMountCount,
      offlineMountCount,
    })

    if (this.data.locationValid && jw) {
      const [lon, lat] = jw.split(',')
      const mark = {
        iconPath: "../../../assert/mark.png",
        latitude: Number(lat),
        longitude: Number(lon),
        title: terminal.name,
        width: 50,
        height: 50
      }
      this.setData({
        longitude: lon,
        latitude: lat,
        markers: [mark]
      })
      // 根据gps获取地址
      api.getGPSaddress([lat, lon].join(',')).then(({ code, data, msg }) => {
        if (code === 200) {
          this.setData({
            address: data.address,
            recommend: data.formatted_addresses.recommend
          })
        } else {
          wx.showToast({ title: msg || '获取地址失败', icon: 'none' })
        }
      })
    }
    wx.setNavigationBarTitle({ title: terminal.name || terminal.DevMac })
  },

  // 查看设备数据
  showMountDevData(event: vantEvent<Uart.TerminalMountDevs>) {
    const { pid, mountDev, protocol, Type } = event.currentTarget.dataset.item
    const { DevMac } = this.data.terminal
    wx.navigateTo({
      url: '/pages/index/devs/devs' + ObjectToStrquery({ pid: String(pid), mountDev, protocol, DevMac, Type })
    })
  },

  markertap(_e: vantEvent) {
    /* 暂不处理 marker 点击 */
  },

  // 别名编辑
  async nameChange(event: vantEvent) {
    const value = event.detail.value
    const { code, msg } = await api.modifyTerminal(this.data.terminal.DevMac, value)
    if (code !== 200) {
      wx.showModal({
        title: "Error",
        content: msg || '修改失败'
      })
    } else {
      this.setData({
        "terminal.name": value
      })
      wx.setStorage({
        key: this.data.terminal._id as any,
        data: this.data.terminal
      })
    }
  },
})
