// index.ts
import { ObjectToStrquery } from "../../utils/util";
import api from "../../utils/api";
// 获取应用实例
Page({
  data: {
    // DTU设备信息
    DTUs: [] as Terminal[],
    state: '',
    alarm: '',
    alarmNum: 0
  },
  onLoad() {
    wx.login({
      success: res => {
        // 发送网络请求，获取在线账户
        api.login({ js_code: res.code }).then(res => {
          if (res.ok) this.start()
          else wx.navigateTo({ url: "/pages/login/login?openid=" + res.arg.openid })
        })
      }
    })
  },
  // 登录运行
  start() {
    // 获取未读取的alarm数量
    api.getAlarmunconfirmed().then(el => {
      if (Number(el.arg) > 0) {
        this.setData({
          alarm: `有${el.arg}条未确认的告警信息，点击查看?`,
          alarmNum: Number(el.arg)
        })
      }
    })
    this.bindDev()
  },
  // 获取用户绑定设备
  async bindDev() {
    wx.showLoading({ title: '获取DTU' })
    const { ok, arg } = await api.getuserMountDev()
    wx.hideLoading()
    if (ok) {
      this.setData({
        DTUs: arg.UTs
      })
      arg.UTs.forEach(el => {
        wx.setStorage({
          key: el._id,
          data: el
        })
      })
      wx.setStorage({
        key: 'Uts',
        data: arg.UTs
      })
      this.countDev(arg.UTs)
    } else {
      wx.showModal({
        title: '添加设备',
        content: '您还没有添加任何设备，请先添加设备',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/index/bindDev/bindDev' })
          }
        }
      })
    }
  },
  // 显示用户DTU参数
  showDTUInfo(event: vantEvent<string>) {
    wx.navigateTo({ url: `/pages/index/dtu/dtu?id=${event.currentTarget.dataset.item}` })
  },
  // 查看设备数据
  showMountDevData(event: vantEvent<TerminalMountDevs>) {
    const { pid, mountDev, protocol } = event.currentTarget.dataset.item
    const id = event.currentTarget.dataset.id
    const { DevMac } = wx.getStorageSync(id) as Terminal
    wx.navigateTo({
      url: '/pages/index/devs/devs' + ObjectToStrquery({ pid: String(pid), mountDev, protocol, DevMac })
    })
  },
  // 查看告警
  seeAlarm() {
    wx.switchTab({ url: '/pages/index/alarm/alarm?num=' + this.data.alarmNum })
  },
  // 统计所有设备状态
  countDev(terminals: Terminal[]) {
    const terminal_all = terminals.length
    const terminal_on = terminals.map(el => el.online).filter(el => el).length
    const monutDev_all = terminals.map(el => el.mountDevs.length).reduce((pre, cur) => pre + cur)
    const mountDev_on = terminals.map(el => el.mountDevs.filter(el2 => el2.online)).reduce((pre, cur) => [...pre, ...cur]).length
    // console.log({ terminal_all, terminal_on, monutDev_all, mountDev_on });
    const state = `DTU:(全部${terminal_all}/在线${terminal_on}),挂载设备:(全部${monutDev_all}/在线${mountDev_on})`
    this.setData({
      state
    })
  },
  //mac=98D863CC870D&pid=0&mountDev=G2K
  async onPullDownRefresh() {
    await this.bindDev()
    wx.stopPullDownRefresh()
  },
  //
  bindload(event: vantEvent) {
    console.log(`公众号加载success,状态:${event.detail.errMsg}`);
  },
  binderror(event: vantEvent) {
    console.log(`公众号加载error,状态:${event.detail.errMsg}`);
  },
  // 添加绑定设备
  addMonutDev(event: vantEvent<Terminal>) {
    const { item } = event.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/index/manageDev/addMountDev/addMountDev' + ObjectToStrquery({ item: JSON.stringify(item) }),
      events: {
        addSuccess() {
          wx.nextTick(() => {
            setTimeout(() => {
              wx.startPullDownRefresh()
            }, 500)
          })
        }
      }
    })
  },
})
