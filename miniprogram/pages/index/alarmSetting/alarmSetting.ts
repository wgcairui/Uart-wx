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
    usersetup: {} as ProtocolConstantThreshold,
    syssetup: {} as ProtocolConstantThreshold,
    Protocols: {} as protocol,
    alarmStat: [] as ConstantAlarmStat[],
    Threshold: [] as Threshold[]
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
      wx.getStorage({
        key: 'protocolSetup' + options.protocol,
        success: (res) => {
          this.setData({
            usersetup: res.data.user,
            syssetup: res.data.sys,
            Protocols: res.data.protocol
          })
          this.mergeProtocolSetup()
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
      this.mergeProtocolSetup()
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
  // 合并参数限值，参数状态设置
  mergeProtocolSetup() {
    const { usersetup, syssetup } = this.data
    const user_alarmStatMap = usersetup.AlarmStat ? new Map(usersetup.AlarmStat.map(el => [el.name, el])) : new Map()
    const sys_alarmStatMap = new Map(syssetup.AlarmStat.map(el => [el.name, el]))
    sys_alarmStatMap.forEach((val, key) => {
      if (!user_alarmStatMap.has(key)) user_alarmStatMap.set(key, val)
    })
    const parse = this.parseProtocol()
    user_alarmStatMap.forEach((el, key) => {
      el.parse = parse[key]
    })
    // 
    const user_ThresholdMap = usersetup.Threshold ? new Map(usersetup.Threshold.map(el => [el.name, el])) : new Map()
    const sys_ThresholdMap = new Map(syssetup.Threshold.map(el => [el.name, el]))
    sys_ThresholdMap.forEach((val, key) => {
      if (!user_ThresholdMap.has(key)) user_ThresholdMap.set(key, val)
    })
    this.setData({
      alarmStat: Array.from(user_alarmStatMap.values()),
      Threshold: Array.from(user_ThresholdMap.values())
    })

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
    const { usersetup: { ShowTag }, alarmStat, Threshold, protocol } = this.data
    const showtag = api.pushThreshold(ShowTag, 'ShowTag', protocol)
    const alarm = api.pushThreshold(alarmStat, 'AlarmStat', protocol)
    const thre = api.pushThreshold(Threshold.map(el => ({ name: el.name, min: el.min, max: el.max })), "Threshold", protocol)
    Promise.all([showtag, alarm, thre]).then(_res => {
      const key = 'protocolSetup' + protocol
      wx.getStorage({
        key,
        success({ data }: { data: { user: ProtocolConstantThreshold, sys: ProtocolConstantThreshold, protocol: protocol } }) {
          data.user.ShowTag = ShowTag
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
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //this.saveSetup()
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
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})