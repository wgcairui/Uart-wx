import unitCache from "../../../utils/unitCache"
import api from "../../../utils/api"
import { ObjectToStrquery } from "../../../utils/util"

// miniprogram/pages/index/alarmSetting/alarmSetting.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    protocol: '',
    usersetup: {} as ProtocolConstantThreshold || undefined,
    syssetup: {} as ProtocolConstantThreshold,
    Protocols: {} as protocol,
    showTag: [] as string[],
    alarmStat: [] as ConstantAlarmStat[] || undefined,
    Threshold: [] as Threshold[] || undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const protocol = options.protocol
    if (!protocol) {
      wx.navigateTo({
        url: '/pages/index/alarmSetting/index'
      })
    } else {
      const active = Number(options.type) || 0
      this.setData({
        active: active,
        protocol
      })
      await this.getUserProtocolSetup()
      if (active === 1) this.updateThre()
      if (active === 2) this.updateAlarm()
      /* wx.getStorage({
        key: 'protocolSetup' + protocol,
        success: (res) => {
          this.setData({
            usersetup: res.data.user,
            syssetup: res.data.sys,
            Protocols: res.data.protocol
          })
        },
        fail: (_e) => {
          this.getUserProtocolSetup()
        }
      }) */
    }
  },

  // 获取用户协议配置
  async getUserProtocolSetup() {
    wx.showLoading({ title: '获取协议配置' })
    const { ok, arg } = await api.getUserDevConstant(this.data.protocol)
    wx.hideLoading()
    if (ok && arg) {
      this.setData({
        usersetup: arg.user || {},
        syssetup: arg.sys,
        Protocols: arg.protocol,
        showTag: arg?.user?.ShowTag || []
      })
      wx.setStorage({
        key: 'protocolSetup' + this.data.protocol,
        data: arg.protocol
      })

    } else {
      wx.showModal({
        title: "Error",
        content: '设备协议b不支持配置'
      })
    }
  },

  // 返回协议参数对象解析
  parseProtocol() {
    const protocolArray = this.data.Protocols.instruct.map(instruct => {
      return instruct.formResize.map(el => ({ [el.name]: el.isState ? unitCache.getunitObject(1, el.unit as string) : {} }))
    }).reduce((pre, cur) => {
      return [...pre, ...cur]
    })
    return Object.assign({}, ...protocolArray) as { [x: string]: { [x: string]: string }[] }
  },
  // 修改标题
  tabclick(event: vantEvent) {
    wx.setNavigationBarTitle({ title: '协议配置-' + event.detail.title })
    switch (event.detail.title) {
      case "参数限值":
        this.updateThre()
        break
      case "参数状态":
        this.updateAlarm()
        break
    }
  },
  // 更新thre列表
  updateThre() {
    const { usersetup, syssetup } = this.data
    const sys_ThresholdMap = new Map(syssetup.Threshold.map(el => [el.name, el]))
    if (usersetup?.Threshold) {
      // 迭代用户配置，覆盖系统配置
      [...this.data.Threshold, ...usersetup.Threshold].forEach((val) => {
        sys_ThresholdMap.set(val.name, val)
      })
    }
    this.setData({
      Threshold: Array.from(sys_ThresholdMap.values())
    })
  },
  // 更新alarm列表
  updateAlarm() {
    const { usersetup, syssetup } = this.data
    const sys_alarmStatMap = new Map(syssetup.AlarmStat.map(el => [el.name, el]))
    if (usersetup?.AlarmStat) {
      [...usersetup.AlarmStat, ...this.data.alarmStat].forEach(val => {
        sys_alarmStatMap.set(val.name, val)
      })
    }
    const parse = this.parseProtocol()
    sys_alarmStatMap.forEach((el, key) => {
      el.parse = parse[key]
    })
    this.setData({
      alarmStat: Array.from(sys_alarmStatMap.values())
    })
  },
  //  监听显示参数变化
  async ShowTagonChange(event: vantEvent) {
    const tags = event.detail as string[]
    this.setData({
      showTag: tags
    })
  },
  // 修改显示参数变化值
  ShowTagtoggle(event: vantEvent) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  // 监听参数状态变化
  async AlarmStatonChange(event: vantEvent<ConstantAlarmStat>) {
    const item = event.currentTarget.dataset.item
    const value = event.detail as string[]
    const index = this.data.alarmStat.findIndex(el => el.name === item.name)
    this.setData({
      ["alarmStat[" + index + "].alarmStat"]: value
    })
  },
  // 跳转到参数限值修改页面
  ThresholdClick(event: vantEvent<Threshold>) {
    const item = event.currentTarget.dataset.item
    const index = event.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/index/alarmSetting/threshold/threshold' + ObjectToStrquery({ ...item }),
      events: {
        modifyThreshold: (data: Threshold) => {
          this.setData({
            [`Threshold[${index}]`]: { ...data, icon: "star" }
          })
        }
      }
    })
  },
  // 跳转到新增参数限值页面
  addThreshold() {
    // 获取现有的thre名称
    const ua = this.data.usersetup?.AlarmStat || []
    const keys = new Set([...this.data.alarmStat.map(el => el.name), ...ua.map(el => el.name)])
    wx.navigateTo({
      url: '/pages/index/alarmSetting/addThreshold/addThreshold' + ObjectToStrquery({ protocol: this.data.protocol, keys: Array.from(keys) }),
      events: {
        addThreshold: (data: Threshold) => {
          const newThre = this.data.Threshold.concat(data)
          this.setData({
            Threshold: newThre
          })
        }
      }
    })
  },
  // 保存配置
  async saveSetup() {
    const { usersetup, alarmStat, Threshold, protocol } = this.data
    // 更新用户showTags配置
    {
      const userShowtags = usersetup.ShowTag || []
      const showtag = this.data.showTag || []
      if (userShowtags.sort().join("") !== showtag.sort().join('')) {
        await api.pushThreshold(showtag || [], 'ShowTag', protocol)
      }
    }
    // 更新用户alarmStat配置
    {
      // 比较名称join是否一致，一致的话检查键是否一致，不一致直接更新，键一致则比较值，值不一致也更新
      const userAlarm = usersetup.AlarmStat || []
      const alarm = alarmStat || []
      const b1 = userAlarm.map(el => el.name).sort().join('') !== alarm.map(el => el.name).sort().join('')
      if (b1) {
        await api.pushThreshold(alarmStat, 'AlarmStat', protocol)
      } else if (alarm.length !== 0) {
        const ua = userAlarm.sort()
        const ka = alarm.sort()
        const compare = ua.every((el, index) => el.alarmStat.sort().join('') !== ka[index].alarmStat.sort().join(''))
        if (compare) {
          await api.pushThreshold(alarmStat, 'AlarmStat', protocol)
        }
      }
    }
    // 更新用户thread配置
    {
      // 比较名称join是否一致，一致的话检查键是否一致，不一致直接更新，键一致则比较值，值不一致也更新
      const userThre = usersetup.Threshold || []
      const thre = Threshold || []
      const b1 = userThre.map(el => el.name).sort().join('') !== thre.map(el => el.name).sort().join('')
      if (b1) {
        await api.pushThreshold(thre.map(el => ({ name: el.name, min: el.min, max: el.max })), "Threshold", protocol)
      } else if (thre.length !== 0) {
        const ua = userThre.sort()
        const ka = thre.sort()
        const compare = ua.every((el, index) => el.min !== ka[index].min || el.max !== ka[index].max)
        if (compare) {
          await api.pushThreshold(thre.map(el => ({ name: el.name, min: el.min, max: el.max })), "Threshold", protocol)
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.saveSetup()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    await this.getUserProtocolSetup()
    wx.stopPullDownRefresh()
  }
})