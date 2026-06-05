// index.ts
import { ObjectToStrquery } from "../../utils/util";
import api from "../../utils/api";

// 设备类型 → 占位图 URL（模块顶层常量，避免 Page() 选项字段在运行时丢失）
const DEV_PICS: Record<string, string> = {
  "UPS": 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/99daa3e07c7b60ef7e16ed8b9fe7cf33.png',
  "温湿度": 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/5fc7d6fe0571b714d5a3395a8c7a9f12.png',
  "电量仪": 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/ab52d9fccdddc0fa5b0386ea0b5cbc7f.png',
  "空调": 'https://besiv-uart.oss-cn-hangzhou.aliyuncs.com/png/c3c1852270ca35fd56135d8fda2a9977.png'
}

// 获取应用实例
Page({
  data: {
    ready: false,
    /** DTU设备信息 */
    DTUs: [] as Uart.Terminal[],
    // 刷选挂载设备列表
    dtuItem: [] as Uart.TerminalMountDevs[],
    // 派生：在线挂载设备数（用于 KPI）
    onlineCount: 0,
    // 未确认告警数量
    alarmNum: 0,
    // 虚拟设备
    Vm: [] as Uart.Terminal[],
    confirm: false,
    // 是否订阅
    sub: false
  },
  onLoad(query: any) {
    wx.showLoading({ title: 'login' })
    wx.login({
      success: async login => {
        // 发送网络请求，获取在线账户
        const { code, data } = await api.login({ js_code: login.code, scene: query.scene ? decodeURIComponent(query.scene) : '' })
        console.log({code,data,login});
        
        if (code) {
          const user = await api.userInfo()
          wx.hideLoading()

          // 判断user用户组,如果是admin则跳转到专有页面
          switch (user.data.userGroup) {
            case "admin":
            case "root":
              wx.reLaunch({ url: "/pages/admin/index" })
              break
            default:
              
              this.setData({ ready: true, sub: Boolean(user.data.wxId) })
              await this.start()
              break
          }
        }
        else {
          wx.hideLoading()
          wx.reLaunch({ url: "/pages/login/login?openid=" + (data as any)?.openid + "&unionid=" + (data as any)?.unionid })
        }
      }
    })
  },

  // 登录运行
  async start() {
    await this.bindDev()
    // 监听用户绑定的设备状态变更事件,及时刷新设备状态
    this.data.DTUs.forEach(dtu=>{
      api.onMessage<string>('MacUpdate'+dtu.DevMac, () => {
        console.log(`listen MacUpdate,mac:${dtu.DevMac}`);
        this.bindDev()
      })
    })
    
  },

  /**
   * 订阅下次告警
   */
  async subMessage() {
    const url = encodeURIComponent('http://mp.weixin.qq.com/s?__biz=MjM5MjA1MTgxOQ==&mid=304819939&idx=1&sn=d0bcd922033075afa2b5219fc95ebb1e&chksm=3173a9e7060420f1a98d0040d964a2f82af25289a731d1400c5224ca9bb3d225d737700700a8#rd')
    wx.navigateTo({ url: '/pages/index/web/web?url=' + url })
  },

  // 顶部右上角按钮（占位，避免无实现被点击报错；后续可接功能）
  openMore() {
    wx.showActionSheet({
      itemList: ['添加设备', '刷新', '清空缓存'],
      success: (res) => {
        if (res.tapIndex === 0) wx.navigateTo({ url: '/pages/index/bindDev/bindDev' })
        if (res.tapIndex === 1) this.bindDev()
        if (res.tapIndex === 2) wx.clearStorageSync()
      },
    })
  },

  openLive() {
    // TODO: 后续接入直播/录制功能
  },

  onKpiTap() {
    // KPI「在线」点击占位（van-tabs swipeable 默认就在第一个 tab）
  },

  // 获取用户绑定设备
  async bindDev() {
    wx.showLoading({ title: '获取DTU' })
    const { code, data } = await api.BindDev()
    wx.hideLoading()
    wx.stopPullDownRefresh()
    if (code) {

      if (data.UTs.length === 0) {
        this.setData({
          DTUs: [],
          dtuItem: []
        })
        if (!this.data.confirm) {
          wx.showModal({
            title: '添加设备',
            content: '您还没有任何设备，是否添加设备?',
            success: (res) => {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/index/bindDev/bindDev'
                })
              } else {
                this.setData({
                  confirm: true
                })
                //this.addVm()
              }
            }
          })
        }
      } else {
        
        this.sortDevs(data.UTs as any)
        // 获取未读取的alarm数量
        api.getAlarmunconfirmed().then(({ data: len }) => {
          this.setData({ alarmNum: Number(len) || 0 })
        })
      }
    }
  },

  // 处理设备分类
  sortDevs(UTs: Uart.Terminal[]) {
    wx.setStorage({
      key: 'Uts',
      data: UTs
    })
    const devs = UTs.map(dtu => {
      return (dtu?.mountDevs || []).map(dev => ({ ...dev, pic: DEV_PICS[dev.Type], dtu: dtu.name, online: dev.online && dtu.online }))
    }).flat()
    // 排序：在线优先（true 在前），组内按 updateTime 倒序（最近在前）
    // 注：如果 updateTime 是相对时间字符串（"1 分钟前更新"），new Date() 解析不了，会 fallback 到原顺序
    const sortedDevs = devs.sort((a: any, b: any) => {
      if (a.online !== b.online) return a.online ? -1 : 1
      const ta = a.updateTime ? new Date(a.updateTime).getTime() : NaN
      const tb = b.updateTime ? new Date(b.updateTime).getTime() : NaN
      if (!isNaN(ta) && !isNaN(tb)) return tb - ta
      return 0
    })
    const onlineCount = sortedDevs.filter(d => d.online).length
    this.setData({
      DTUs: UTs,
      dtuItem: sortedDevs,
      onlineCount,
    })
  },

  // 查看挂载
  toDev(event: vantEvent<Uart.Terminal>) {
    const { DevMac } = event.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/index/dtu/dtu' + ObjectToStrquery({ mac: DevMac })
    })
  },

  // 查看设备数据
  showMountDevData(event: vantEvent<Uart.TerminalMountDevs & { dtu: string }>) {
    const { pid, mountDev, protocol, dtu, Type } = event.currentTarget.dataset.item
    const { DevMac } = this.data.DTUs.find(el => el.name === dtu)!
    wx.navigateTo({
      url: '/pages/index/devs/devs' + ObjectToStrquery({ pid: String(pid), mountDev, protocol, DevMac, Type })
    })
  },
  // 查看告警
  seeAlarm() {
    wx.switchTab({ url: '/pages/index/alarm/alarm' })
  },
  //mac=98D863CC870D&pid=0&mountDev=G2K
  async onPullDownRefresh() {
    await this.bindDev()
    this.start()
    wx.stopPullDownRefresh()
  },
  //
  bindload(event: vantEvent) {
    console.log(`公众号加载success,状态:${event.detail.errMsg}`);
  },
  binderror(event: vantEvent) {
    console.log(`公众号加载error,状态:${event.detail.errMsg}`);
  },

  trial(){
    wx.showLoading({ title: 'login' })
    wx.login({
      success: async login => {
        // 发送网络请求，获取在线账户
        const { code } = await api.trial({ js_code: login.code})
        if (code) {
          this.start()
          wx.hideLoading()
        }
      }
    })
  }

  // 添加虚拟设备
  /* async addVm() {
    const { ok, arg } = await api.addVm()
    if (ok) {
      this.setData({
        Vm: arg
      })
      this.sortDevs(arg)
    }
  }, 
   onShow() {
    if (this.data.ready) {
      this.bindDev()
    }
  } */
})
