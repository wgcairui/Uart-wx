// index.ts
import { ObjectToStrquery, parseTime } from "../../utils/util";
import api from "../../utils/api";
// 获取应用实例
Page({
  data: {
    ready: false,
    /** DTU设备信息 */
    DTUs: [] as Terminal[],
    // 设备类型
    devTypes: [] as string[],
    // 刷选挂载设备列表
    dtuItem: [] as TerminalMountDevs[],
    // 挂载状态信息
    state: '',
    // 告警状态信息
    alarm: '',
    // 未确认告警数量
    alarmNum: 0,
    // 五条内告警数据
    alarmData: [] as uartAlarmObject[],
    // 虚拟设备
    Vm: [] as Terminal[]
  },

  devPics: {
    "UPS": '/assert/ups.png',
    "温湿度": '/assert/th.png',
    "电量仪": '/assert/em.png',
    "空调": '/assert/air.png'
  },
  onLoad() {
    wx.showLoading({ title: '加载中' })
    wx.login({
      success: async login => {
        // 发送网络请求，获取在线账户
        const res = await api.login({ js_code: login.code })
        wx.hideLoading()
        if (res.ok) {
          // 判断user用户组,如果是admin则跳转到专有页面
          switch (res.arg.userGroup) {
            case "user":
              this.setData({ ready: true })
              this.start()
              break;
            case "admin":
              wx.reLaunch({ url: "/pages/admin/index" })
              break
            default:
              wx.showModal({
                title: '用户组错误',
                content: '只有用户组user和admin可以使用小程序端',
                success() {
                  api.unbindwx().then(() => {
                    wx.startPullDownRefresh()
                  })
                }
              })
              break
          }
        }
        else wx.reLaunch({ url: "/pages/login/login?openid=" + res.arg.openid })
      }
    })
  },

  /**
   * tab点击触发
   * @param e 
   */
  tabChange(e: vantEvent) {
    const type = e.detail.title as string
    this.selectTab(type)
  },

  selectTab(type: string = "全部") {
    const devs = this.data.DTUs.map(dtu => {
      return dtu.mountDevs.map(dev => {
        dev.online = dev.online && dtu.online
        dev.pic = (this.devPics as any)[dev.Type]
        dev.dtu = dtu.name
        return dev
      })
    }).flat()
    switch (type) {
      /* case "UPS":
      case "IO":
      case "电量仪":
      case "温湿度":
      case "空调":
        this.setData({
          dtuItem: devs.filter(el => el.Type === type)
        })
        break; */
      case "全部":
        this.setData({
          dtuItem: devs
        })
        break
      default:
        this.setData({
          dtuItem: devs.filter(el => el.dtu === type)
        })
        break
    }
  },
  // 登录运行
  start() {
    this.bindDev()
    // 获取未读取的alarm数量
    api.getAlarmunconfirmed().then(el => {
      const { len, alarm } = el.arg
      if (Number(len) > 0) {
        this.setData({
          alarm: `有${len}条未确认的告警信息，点击查看?`,
          alarmNum: Number(len),
          alarmData: alarm.map(el => {
            el.time = parseTime(el.timeStamp)
            return el
          })
        })
      } else {
        this.setData({
          alarm: ``,
          alarmNum: Number(len),
          alarmData: []
        })
      }
    })
  },
  // 获取用户绑定设备
  async bindDev() {
    wx.showLoading({ title: '获取DTU' })
    const { ok, arg } = await api.getuserMountDev()
    wx.hideLoading()
    wx.stopPullDownRefresh()
    if (ok && arg?.UTs && arg.UTs.length > 0) {
      this.sortDevs(arg.UTs)
    } else {
      const res = await wx.showModal({
        title: '添加设备',
        content: '您还没有添加任何设备，请先添加设备'
      })
      if (res.confirm) {
        wx.navigateTo({
          url: '/pages/index/bindDev/bindDev',
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
      }else{
        this.addVm()
      }
    }
  },

  // 处理设备分类
  sortDevs(UTs:Terminal[]){
    const devTypes = new Set<string>()
      UTs.forEach(el => {
        devTypes.add(el.name)
        wx.setStorage({
          key: el._id,
          data: el
        })
        // el.mountDevs?.forEach(dev => devTypes.add(dev.Type))
      })
      wx.setStorage({
        key: 'Uts',
        data: UTs
      })
      this.countDev(UTs)
      this.setData({
        DTUs: UTs,
        devTypes: [...devTypes].sort()
      })
      this.selectTab()
  },

  // 查看设备数据
  showMountDevData(event: vantEvent<TerminalMountDevs>) {
    const { pid, mountDev, protocol, dtu, Type } = event.currentTarget.dataset.item
    const { DevMac } = this.data.DTUs.find(el => el.name === dtu)!
    wx.navigateTo({
      url: '/pages/index/devs/devs' + ObjectToStrquery({ pid: String(pid), mountDev, protocol, DevMac, Type })
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
    this.countDev(this.data.DTUs)
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
  // 添加绑定设备
  /* addMonutDev(event: vantEvent<Terminal>) {
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
  }, */

  // 添加虚拟设备
  async addVm() {
    const { ok, arg } = await api.addVm()
    if (ok) {
      this.setData({
        Vm: arg
      })
      this.sortDevs(arg)
    }
  }
})
