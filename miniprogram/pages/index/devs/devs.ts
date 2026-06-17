// miniprogram/pages/index/devs/devs.js
import { ObjectToStrquery, parseTimeRelative } from "../../../utils/util"
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
    showAcPic: true,
    showUpsPic: true,
    th: {
      temperature: '0',
      humidity: '0',
    },
    _oprateStat: false
  },

  // 设备图加载失败时整块隐藏
  onAcImageError() {
    this.setData({ showAcPic: false })
  },
  onUpsImageError() {
    this.setData({ showUpsPic: false })
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
      // 预处理：枚举型数据 (issimulate=true 且 unit 是 {k:v,k:v} 形式) → 解析成 options
      // 注意：服务端给的 unit 形如 {0:停止,1:运行} 是非标 JSON（key 无引号），JSON.parse 会失败
      // 用正则自己解析
      data.result.forEach((el: any) => {
        if (el.issimulate && typeof el.unit === 'string') {
          const m = el.unit.match(/^\s*\{(.+)\}\s*$/)
          if (m) {
            const pairs: { key: string, value: string }[] = []
            // 按逗号拆，再按冒号拆 key/value
            m[1].split(',').forEach((seg: string) => {
              const kv = seg.split(':')
              if (kv.length >= 2) {
                pairs.push({ key: kv[0].trim(), value: kv.slice(1).join(':').trim() })
              }
            })
            if (pairs.length > 0) {
              el.options = pairs
              el.unit = null
            }
          }
        }
      })
      const regStr = new RegExp(filter)
      data.result = data.result.filter(el =>(this.data.Constant.show.size === 0 || this.data.Constant.show.has(el.name)) && (!filter || regStr.test(el.name)))
      data.time = parseTimeRelative(data.time)
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
    const name = e.currentTarget.dataset.name as string
    // 从当前数据里找出对应行的 unit
    const item = (this.data.result.result || []).find(el => el.name === name) as any
    const unit = item?.unit || ''
    const url = '/pages/index/line/line' + ObjectToStrquery({ name, mac: this.data.mac, pid: this.data.pid, unit })
    console.log(url);

    wx.navigateTo({
      url
    })
  },

  // 枚举项 pill 点击：直接发送指令
  onEnumTap(e: vantEvent) {
    const { item, opt } = e.currentTarget.dataset as any
    if (opt.value === item.parseValue) return // 已是当前值
    console.log('[enum] 切换', item.name, '→', opt.value, '(', opt.key, ')')
    this.oprate({ detail: { name: item.name, value: opt.key, val: Number(opt.key) } as any })
  },

  // 发送操作指令（处理中含 server 处理 + 设备 socket 通信，全屏遮罩一直挂到响应）
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
    // 2026-06-17: ActionSheet 关闭动画跟 showLoading 有竞争，
    // 延 1 帧再弹 loading，确保遮罩一定出现
    setTimeout(() => {
      wx.showLoading({ title: '正在处理', mask: true })
    }, 16)
    this.setData({
      _oprateStat: true
    })
    let resp: { code?: number; data?: any; msg?: string }
    try {
      resp = await api.SendProcotolInstructSet({ mountDev: this.data.mountDev, pid: Number(this.data.pid), protocol: this.data.protocol, DevMac: this.data.mac } as any, item)
    } catch (err) {
      // 网络层 / fetch 异常，api.ts 已 console.error 过
      this.setData({ _oprateStat: false })
      wx.hideLoading()
      wx.showModal({
        title: '网络异常',
        content: '指令发送失败，请检查网络后重试',
        showCancel: false
      })
      return
    }
    this.setData({
      _oprateStat: false
    })
    wx.hideLoading()

    if (resp.code) {
      // 成功 → 轻量 toast，不阻塞用户
      wx.showToast({ title: resp.data?.msg || '发送成功', icon: 'success', duration: 1500 })
    } else {
      // 业务失败 / server 抛错 → 弹窗，msg 兜底
      wx.showModal({
        title: '发送失败',
        content: resp.msg || resp.data?.message || '指令未执行，请重试',
        showCancel: false
      })
    }
  },
  // 跳转告警设置（直接进主页，不弹菜单）
  alarm(_e: vantEvent) {
    wx.navigateTo({
      url: '/pages/index/alarmSetting/alarmSetting' + ObjectToStrquery({ protocol: this.data.protocol })
    })
  }
})