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
    alarmStat: [] as ConstantAlarmStat[] || undefined,
    Threshold: [] as Threshold[] || undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = Number(options.type) || 0
    const protocol = options.protocol
    if (!protocol) {
      wx.navigateTo({
        url: '/pages/index/alarmSetting/index'
      })
    } else {
      this.setData({
        active: type,
        protocol
      })
      this.getUserProtocolSetup()
      wx.getStorage({
        key: 'protocolSetup' + options.protocol,
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
      })
    }
  },

  // 获取用户协议配置
  async getUserProtocolSetup() {
    const { ok, arg } = await api.getUserDevConstant(this.data.protocol)
    if (ok && arg) {
      this.setData({
        usersetup: arg.user || {},
        syssetup: arg.sys,
        Protocols: arg.protocol
      })
      wx.setStorage({
        key: 'protocolSetup' + this.data.protocol,
        data: arg
      })

    } else {
      wx.showModal({
        title: "Error",
        content: '未定义配置'
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
        {
          if (this.data.Threshold) {
            const { usersetup, syssetup } = this.data
            const sys_ThresholdMap = new Map(syssetup.Threshold.map(el => [el.name, el]))
            if (usersetup?.Threshold) {
              const user_ThresholdMap = new Map(usersetup.Threshold.map(el => [el.name, el]))
              sys_ThresholdMap.forEach((val, key) => {
                const thr = user_ThresholdMap.get(key)
                if (thr && (thr.max !== val.max || thr.min !== val.min)) sys_ThresholdMap.set(key, thr)
              })
            }
            this.setData({
              Threshold: Array.from(sys_ThresholdMap.values())
            })
          }
        }
        break
      case "参数状态":
        {
          if (this.data.alarmStat) {
            const { usersetup, syssetup } = this.data
            const sys_alarmStatMap = new Map(syssetup.AlarmStat.map(el => [el.name, el]))
            if (usersetup?.AlarmStat) {
              const user_alarmStatMap = new Map(usersetup.AlarmStat.map(el => [el.name, el]))
              sys_alarmStatMap.forEach((val, key) => {
                const stat = user_alarmStatMap.get(key)
                if (stat && stat.alarmStat.sort().toString() !== val.alarmStat.sort().toString()) {
                  sys_alarmStatMap.set(key, stat)
                }
              })
            }
            const parse = this.parseProtocol()
            sys_alarmStatMap.forEach((el, key) => {
              el.parse = parse[key]
            })
            this.setData({
              alarmStat: Array.from(sys_alarmStatMap.values())
            })
          }
        }
        break
    }
  },
  //  监听显示参数变化
  async ShowTagonChange(event: vantEvent) {
    const tags = event.detail as string[]
    this.setData({
      "usersetup.ShowTag": tags
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
    // this.data.alarmStat[index].alarmStat = value
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
  //
  addThreshold() {
    wx.navigateTo({
      url: '/pages/index/alarmSetting/addThreshold/addThreshold' + ObjectToStrquery({ protocol: this.data.protocol }),
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
    await api.pushThreshold(usersetup?.ShowTag || [], 'ShowTag', protocol)
    // 如果有用户配置
    if ((alarmStat && alarmStat.length > 0 && !usersetup?.AlarmStat) || JSON.stringify(alarmStat) !== JSON.stringify(usersetup.AlarmStat)) {
      await api.pushThreshold(alarmStat, 'AlarmStat', protocol)
    }
    //
    if ((Threshold && Threshold.length > 0 && usersetup?.Threshold) || JSON.stringify(Threshold) !== JSON.stringify(usersetup.Threshold)) {
      await api.pushThreshold(Threshold.map(el => ({ name: el.name, min: el.min, max: el.max })), "Threshold", protocol)
    }
    const key = 'protocolSetup' + protocol
    wx.getStorage({
      key,
      success({ data }: { data: { user: ProtocolConstantThreshold, sys: ProtocolConstantThreshold, protocol: protocol } }) {
        data.user.ShowTag = usersetup?.ShowTag || []
        data.user.AlarmStat = alarmStat
        data.user.Threshold = Threshold
        wx.setStorage({
          key,
          data,
          fail() {
            wx.removeStorage({ key })
            wx.showToast({ title: "保存失败" })
          }
        })
      }
    })
    /* Promise.all([showtag, alarm, thre]).then(_res => {
      const key = 'protocolSetup' + protocol
      wx.getStorage({
        key,
        success({ data }: { data: { user: ProtocolConstantThreshold, sys: ProtocolConstantThreshold, protocol: protocol } }) {
          data.user.ShowTag = usersetup?.ShowTag || []
          data.user.AlarmStat = alarmStat
          data.user.Threshold = Threshold
          wx.setStorage({
            key,
            data,
            fail() {
              wx.removeStorage({ key })
              wx.showToast({ title: "保存失败" })
            }
          })
        }
      })
      wx.showToast({
        title: '修改用户设定成功'
      })
    }).catch(_e => {
      wx.showToast({
        title: '上传用户设定失败，请稍后再试',
        icon: "none"
      })
      wx.removeStorage({ key: 'protocolSetup' + protocol })
    }) */
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