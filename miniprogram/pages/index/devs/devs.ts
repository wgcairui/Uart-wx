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
    // 试用模式短路:demo 设备没有真实协议/阈值数据,后端会返回权限不足。
    // 改为根据设备 Type 注入写死的 mock 数据,页面能展示完整骨架(参数列表/温湿度大数字/UPS 工作模式)
    if (this.isDemoMode()) {
      this.loadDemoData()
      wx.hideLoading()
      return
    }
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

  // 判定是否试用模式:demo 设备用 'DEMO-' 前缀的 MAC,后端没有这些数据,一律静默失败
  isDemoMode(): boolean {
    return /^DEMO-/.test(this.data.mac || '')
  },

  // 试用模式 - 注入 mock 数据
  // 根据当前 Type 注入对应的 Constant + result 列表,
  // 字段对齐 wxml 渲染依赖:result.time / result.result[] / Constant.sys.Constant.{WorkMode,Temperature,Humidity} / th.*
  loadDemoData() {
    const type = this.data.Type
    const now = new Date().toLocaleString('zh-CN', { hour12: false })

    // 通用 - 全部展示项(枚举型参数用 issimulate=true + options,实参型用 unit)
    const baseRow = (overrides: any) => ({
      alarm: false,
      issimulate: false,
      options: null,
      unit: null,
      ...overrides,
    })

    if (type === 'UPS') {
      this.setData({
        'Constant.sys': {
          Constant: {
            WorkMode: '工作模式',
            InputVolt: '输入电压',
            OutputVolt: '输出电压',
            Load: '负载',
            Battery: '电池容量',
            Temperature: '机内温度',
          },
        } as any,
        'Constant.user': { Constant: {} } as any,
        'Constant.show': new Set(),
        result: {
          time: now,
          result: [
            baseRow({ name: '工作模式', parseValue: '在线模式', issimulate: true, options: [
              { key: '0', value: '在线模式' },
              { key: '1', value: '电池模式' },
              { key: '2', value: '旁路模式' },
            ]}),
            baseRow({ name: '输入电压', parseValue: '220.5', unit: 'V' }),
            baseRow({ name: '输出电压', parseValue: '220.0', unit: 'V' }),
            baseRow({ name: '负载', parseValue: '38', unit: '%' }),
            baseRow({ name: '电池容量', parseValue: '96', unit: '%' }),
            baseRow({ name: '机内温度', parseValue: '32.5', unit: '℃' }),
            baseRow({ name: '输入频率', parseValue: '50.02', unit: 'Hz' }),
            baseRow({ name: '输出频率', parseValue: '50.00', unit: 'Hz' }),
          ],
        } as any,
        upsPic: 'http://www.ladishb.com/upload/342021__ups3.gif',  // 在线模式对应图
      })
      return
    }

    if (type === '温湿度') {
      this.setData({
        'Constant.sys': {
          Constant: {
            Temperature: '温度',
            Humidity: '湿度',
          },
        } as any,
        'Constant.user': { Constant: {} } as any,
        'Constant.show': new Set(),
        result: {
          time: now,
          result: [
            baseRow({ name: '温度', parseValue: '24.6', unit: '℃' }),
            baseRow({ name: '湿度', parseValue: '58.2', unit: '%' }),
            baseRow({ name: '露点', parseValue: '15.8', unit: '℃' }),
            baseRow({ name: '舒适度', parseValue: '舒适', issimulate: true, options: [
              { key: '0', value: '舒适' },
              { key: '1', value: '较舒适' },
              { key: '2', value: '不舒适' },
            ]}),
          ],
        } as any,
        th: { temperature: '24.6', humidity: '58.2' },
      })
      return
    }

    // 电量仪 + 默认 fallback
    if (type === '电量仪') {
      this.setData({
        'Constant.sys': { Constant: {} } as any,
        'Constant.user': { Constant: {} } as any,
        'Constant.show': new Set(),
        result: {
          time: now,
          result: [
            baseRow({ name: '电压', parseValue: '220.3', unit: 'V' }),
            baseRow({ name: '电流', parseValue: '5.42', unit: 'A' }),
            baseRow({ name: '有功功率', parseValue: '1.18', unit: 'kW' }),
            baseRow({ name: '无功功率', parseValue: '0.12', unit: 'kVar' }),
            baseRow({ name: '功率因数', parseValue: '0.98' }),
            baseRow({ name: '正向有功电能', parseValue: '1234.56', unit: 'kWh' }),
            baseRow({ name: '频率', parseValue: '50.01', unit: 'Hz' }),
          ],
        } as any,
      })
      return
    }

    // 未知类型 - 给一组通用参数
    this.setData({
      'Constant.sys': { Constant: {} } as any,
      'Constant.user': { Constant: {} } as any,
      'Constant.show': new Set(),
      result: {
        time: now,
        result: [
          baseRow({ name: '运行状态', parseValue: '正常', issimulate: true, options: [
            { key: '0', value: '正常' },
            { key: '1', value: '告警' },
          ]}),
          baseRow({ name: '采样值', parseValue: '128', unit: 'count' }),
        ],
      } as any,
    })
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
  // 跳转告警设置（直接进主页，不弹菜单）
  alarm(_e: vantEvent) {
    wx.navigateTo({
      url: '/pages/index/alarmSetting/alarmSetting' + ObjectToStrquery({ protocol: this.data.protocol })
    })
  }
})