// miniprogram/pages/index/devs/devs.js
import { ObjectToStrquery, parseTime } from "../../../utils/util"
import api from "../../../utils/api"
Page({

  /**
   * 页面的初始数据
   */

  data: {
    mac: '',
    pid: '',
    mountDev: "",
    result: {} as Uart.queryResultSave,
    filter: '',
    //interval: 0 as any,
    protocol: '',
    Type: '',
    Constant: {} as {
      sys: Uart.ProtocolConstantThreshold,
      user: Uart.ProtocolConstantThreshold,
      show: Set<string>
    },
    upsPic: 'http://www.ladishb.com/upload/342021__ups.gif',
    th: {
      temperature: '0',
      humidity: '0',
    },
    _oprateStat: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: { mountDev: any; mac: any; DevMac: any; pid: any; protocol: any; Type: any }) {
    wx.setNavigationBarTitle({ title: options.mountDev || options.mac || '' })
    this.setData({
      mac: options.DevMac,
      pid: options.pid,
      protocol: options.protocol,
      mountDev: options.mountDev,
      Type: options.Type
    })

    api.onMessage(options.DevMac + options.pid, () => {
      console.log('获取运行数据:'+options.DevMac + options.pid);
      this.GetDevsRunInfo()
    })
  },
  async onReady() {
    wx.showLoading({ title: '获取运行数据' })
    const sys = await api.getAlarmProtocol(this.data.protocol)
    const user = await api.getUserAlarmProtocol(this.data.protocol)
    if (sys.code) {
      this.setData({
        "Constant.sys": sys.data
      })
    }
    if (user.code) {
      this.setData({
        "Constant.user": user.data,
      })
      
      
    }
    if(user.data?.ShowTag?.length > 0){
      this.setData({
        "Constant.show": new Set(user.data?.ShowTag)
      })
    }else if(sys.data?.ShowTag?.length > 0){
      this.setData({
        "Constant.show": new Set(sys.data?.ShowTag)
      })
    }else{
      this.setData({
        "Constant.show": new Set()
      })
    }

    await this.GetDevsRunInfo()
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /* this.setData({
      interval: setInterval(() => this.GetDevsRunInfo(), 5000)
    }) */
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    api.offWs('MacDateUpdate' + this.options.DevMac + this.options.pid)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    api.offWs('MacDateUpdate' + this.options.DevMac + this.options.pid)

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    await this.GetDevsRunInfo()
    wx.stopPullDownRefresh()
  },


  async GetDevsRunInfo() {
    const { mac, pid, filter } = this.data
    const { code, data, msg } = await api.getTerminalData(mac, pid)
    if (code && data.result) {
      const regStr = new RegExp(filter)
      data.result = data.result.filter(el =>(this.data.Constant.show.size === 0 || this.data.Constant.show.has(el.name)) && (!filter || regStr.test(el.name)))
      data.time = parseTime(data.time)
      this.setData({
        result: data,
      }) 
      switch (this.data.Type) {
        case "UPS":
          const workMode = data.result.find(el => el.name === this.data.Constant.sys.Constant.WorkMode)?.parseValue as string
          switch (workMode) {
            case "电池模式":
              this.setData({
                upsPic: 'http://www.ladishb.com/upload/342021__ups1.gif'
              })
              break
            case "旁路模式":
              this.setData({
                upsPic: 'http://www.ladishb.com/upload/342021__ups2.gif'
              })
              break
            case "在线模式":
              this.setData({
                upsPic: 'http://www.ladishb.com/upload/342021__ups3.gif'
              })
              break
            default:
              this.setData({
                upsPic: 'http://www.ladishb.com/upload/342021__ups.gif'
              })
              break;
          }
          break;

        case "温湿度":
          const { Temperature, Humidity } = this.data.Constant.sys.Constant
          this.setData({
            th: {
              temperature: data.result.find(el => el.name === Temperature)?.parseValue!,
              humidity: data.result.find(el => el.name === Humidity)?.parseValue!
            }
          })
          break
      }
    } else {
      // clearInterval(this.data.interval)
      api.offWs('MacDateUpdate' + this.options.DevMac + this.options.pid)

      wx.showModal({
        title: 'Error',
        content: msg,
        success: () => {
          // clearInterval(this.data.interval)
          api.offWs('MacDateUpdate' + this.options.DevMac + this.options.pid)
          //wx.navigateBack()
        }
      })
    }
  },
  // 刷选参数
  filter(e: vantEvent) {
    const filter = e.detail.filter
    const regStr = new RegExp(filter)
    const result = this.data.result.result?.filter(el => regStr.test(el.name))
    this.setData({
      filter,
      "result.result": result
    })
  },
  // 导航到图表
  toline(e: vantEvent) {
    const url = '/pages/index/line/line' + ObjectToStrquery({ name: e.detail.name, mac: this.data.mac, pid: this.data.pid, protocol: this.data.protocol })
    console.log(url);

    wx.navigateTo({
      url
    })
  },

  // 发送操作指令
  async oprate(e: Pick<vantEvent<Uart.OprateInstruct>, 'detail'>) {
    if (this.data._oprateStat) return
    const item: Uart.OprateInstruct = e.detail
    if (item.value.includes("%i") && !item.val && item.val !== 0) {
      wx.navigateTo({
        url: '/pages/util/setVal/setVal' + ObjectToStrquery({ item }),
        events: {
          valueOk: (value: { val: number }) => {
            item.val = value.val
            this.oprate({ detail: item })
          }
        }
      })
      return
    }
    wx.showLoading({ title: '正在发送' })
    this.setData({
      _oprateStat: true
    })
    const { code, data, msg } = await api.SendProcotolInstructSet({ mountDev: this.data.mountDev, pid: Number(this.data.pid), protocol: this.data.protocol, DevMac: this.data.mac } as any, item)
    this.setData({
      _oprateStat: false
    })
    wx.hideLoading()
    // 如果设备未通过校验，则跳转到校验短信验证码页面
    /* if (ok === 4) {
      wx.showModal({
        title: '权限验证',
        content: '操作指令需要验证您的设备,是否通过短信开始验证？',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/util/smsValidation/smsValidation',
              events: {
                validationSuccess: () => {
                  console.log('sms validation success');
                  this.oprate({ detail: item })
                }
              }
            })
          }
        }
      })
    }  */
    wx.showModal({
      title: code ? 'Success' : 'Error',
      content: code ? data.msg : msg
    })

  },
  // 跳转告警设置
  alarm(e: vantEvent) {
    const type = e.detail.type as string
    wx.navigateTo({
      url: '/pages/index/alarmSetting/alarmSetting' + ObjectToStrquery({ type, protocol: this.data.protocol })
    })
  }
})