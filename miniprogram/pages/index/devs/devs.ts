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

    // 2026-07-01 (决策 18): 选完指令后弹 立即发送 / 定时发送 选择
    // - 用户选 "立即发送" → 走原 doSendNow (同步发指令)
    // - 用户选 "定时发送" → 走 doScheduleOp (弹日期时间 → createUserScheduledOp)
    // - 用户取消 → 不动 (跟原"点了就发"不一致, 但符合"测试版"明确选择原则)
    console.log('[oprate] 弹立即/定时选择, item=', item.name, 'value=', item.value)
    wx.showActionSheet({
      itemList: ['立即发送 (现在执行)', '定时发送 (测试版) — 选未来时间'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.doSendNow(item)
        } else if (res.tapIndex === 1) {
          this.doScheduleOp(item)
        }
      },
      fail: () => {
        // 用户取消, 不动 — 跟"测试版"显式选择原则一致
        console.log('[oprate] ActionSheet cancelled')
      }
    })
  },

  /**
   * 立即发送 (原 oprate 后续逻辑, 抽成方法)
   * 兼容 dev / test 调用
   */
  async doSendNow(item: Uart.OprateInstruct) {
    if (this.data._oprateStat) return
    // 2026-06-17: ActionSheet 关闭动画跟 showLoading 有竞争，
    // 延 1 帧再弹 loading，确保遮罩一定出现
    setTimeout(() => {
      wx.showLoading({ title: '正在处理', mask: true })
    }, 16)
    this.setData({ _oprateStat: true })
    let resp: { code?: number; data?: any; msg?: string }
    try {
      resp = await api.SendProcotolInstructSet({ mountDev: this.data.mountDev, pid: Number(this.data.pid), protocol: this.data.protocol, DevMac: this.data.mac } as any, item)
    } catch (err) {
      this.setData({ _oprateStat: false })
      wx.hideLoading()
      wx.showModal({
        title: '网络异常',
        content: '指令发送失败，请检查网络后重试',
        showCancel: false
      })
      return
    }
    this.setData({ _oprateStat: false })
    wx.hideLoading()

    if (resp.code) {
      wx.showToast({ title: resp.data?.msg || '发送成功', icon: 'success', duration: 1500 })
    } else {
      wx.showModal({
        title: '发送失败',
        content: resp.msg || resp.data?.message || '指令未执行，请重试',
        showCancel: false
      })
    }
  },

  /**
   * 2026-07-01 (决策 18): 定时发送流程
   * 1) wx.showActionSheet 选类型已经在外层oprate处理
   * 2) 让用户选未来时间 (>= now+30s, server 端硬性校验)
   * 3) 调 api.createUserScheduledOp → BullMQ 入队 delayed job
   */
  doScheduleOp(item: Uart.OprateInstruct) {
    // wx picker mode=multiSelector 仅支持 y/m/d h/m 两段选择,
    // 这里用 native picker mode=multiSelector, 列 [date, time] 两组
    // 简化: 用两个 picker 分别选日期 + 时间
    const now = new Date()

    // 拼日期列
    const dates: string[] = []
    for (let i = 0; i < 30; i++) {
      const d = new Date(now.getTime() + i * 86400 * 1000)
      const ymd = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`
      dates.push(ymd)
    }
    // 拼时间列 (按 30 分钟间隔, 48 个)
    const times: string[] = []
    for (let h = 0; h < 24; h++) {
      for (let m of [0, 30]) {
        times.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`)
      }
    }
    // 默认选离 now+30min 最近的可选项
    const targetTs = Date.now() + 30 * 60 * 1000
    const targetD = new Date(targetTs)
    const defaultDateIdx = Math.max(0, dates.indexOf(
      `${targetD.getFullYear()}-${(targetD.getMonth() + 1).toString().padStart(2, '0')}-${targetD.getDate().toString().padStart(2, '0')}`
    ))

    wx.showActionSheet({
      itemList: ['今天 ' + (now.getMonth() + 1) + '/' + now.getDate() + ' (默认 +30min)', '手动选日期+时间'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 快速模式: now + 30 min
          const ts = Date.now() + 30 * 60 * 1000
          this.confirmAndCreate(item, ts)
        } else {
          // 手动模式: 弹两个 picker
          this.pickDateTime(item, dates, defaultDateIdx, times)
        }
      },
    })
  },

  pickDateTime(item: Uart.OprateInstruct, dates: string[], dateIdx: number, times: string[]) {
    wx.showActionSheet({
      itemList: dates.slice(dateIdx, dateIdx + 7).concat(['(取消)']),
      success: (dRes) => {
        if (dRes.tapIndex >= 7) return
        const pickedDate = dates[dateIdx + dRes.tapIndex]
        wx.showActionSheet({
          itemList: times.concat(['(取消)']),
          success: (tRes) => {
            if (tRes.tapIndex >= times.length) return
            const pickedTime = times[tRes.tapIndex]
            const ts = new Date(pickedDate + ' ' + pickedTime + ':00').getTime()
            if (isNaN(ts)) {
              wx.showToast({ title: '时间格式错误', icon: 'none' })
              return
            }
            if (ts <= Date.now() + 30 * 1000) {
              wx.showModal({ title: '时间已过', content: '请选择晚于当前 30s 的时间', showCancel: false })
              return
            }
            this.confirmAndCreate(item, ts)
          },
        })
      },
    })
  },

  async confirmAndCreate(item: Uart.OprateInstruct, scheduledTsMs: number) {
    const date = new Date(scheduledTsMs)
    const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`

    // admin 端 content 走原始指令名, user 端 content 是已组装 (item.value 含 %i)
    // 这里 server 端 fillInstructTemplate 已经在 item.value 渲染过 (前端组装)
    // 但 dev 这里没有 fillInstructTemplate, 直接传 item.value 让 server 端处理
    // 跟 uart-site-v3 lib/utils/sendInstruct.ts fillInstructTemplate 一致逻辑
    let content = item.value
    if (item.value.includes('%i')) {
      // 简单 1-byte hex 替换 (跟 server ParseCoefficient 一致)
      // 这里 bl 系数简单按 bl=1 处理 (1*val)
      const val = item.val || 0
      if (item.value.includes('%i%i')) {
        const num = Number(val)
        content = item.value.replace('%i%i', ((num >> 8) & 0xff).toString(16).padStart(2, '0') + (num & 0xff).toString(16).padStart(2, '0'))
      } else {
        const hex = Number(val).toString(16)
        content = item.value.replace('%i', hex.length < 2 ? hex.padStart(2, '0') : hex)
      }
    }

    wx.showModal({
      title: '确认定时操作',
      content: `指令: ${item.name}\n设备: ${this.data.mac} pid=${this.data.pid}\n协议: ${this.data.protocol}\n计划时间: ${dateStr}\n\n点击确认创建 (后端 BullMQ 到点自动触发)`,
      confirmText: '确认创建',
      success: async (r) => {
        if (!r.confirm) return
        wx.showLoading({ title: '创建中' })
        try {
          const resp = await api.createUserScheduledOp(
            this.data.mac,
            Number(this.data.pid),
            {
              protocol: this.data.protocol,
              content,
              scheduledAt: new Date(scheduledTsMs).toISOString(),
            }
          )
          wx.hideLoading()
          if (resp.code === 200) {
            wx.showModal({
              title: '创建成功',
              content: `定时任务已创建\nID: ${resp.data?.id}\n\ndev 模式 worker 不启动, 可到「定时操作」列表页点「立即触发」验证`,
              confirmText: '去看列表',
              cancelText: '留在原地',
              success: (mr) => {
                if (mr.confirm) {
                  wx.navigateTo({ url: '/pages/index/scheduledOp/scheduledOp' })
                }
              },
            })
          } else {
            wx.showModal({ title: '创建失败', content: resp.message || '请稍后再试', showCancel: false })
          }
        } catch (err) {
          wx.hideLoading()
          wx.showToast({ title: '网络异常', icon: 'none' })
        }
      },
    })
  },

  /**
   * 2026-07-01 (决策 18): 跳转到定时任务列表
   */
  goScheduledOpList() {
    wx.navigateTo({ url: '/pages/index/scheduledOp/scheduledOp' })
  },
  // 跳转告警设置（直接进主页，不弹菜单）
  alarm(_e: vantEvent) {
    wx.navigateTo({
      url: '/pages/index/alarmSetting/alarmSetting' + ObjectToStrquery({ protocol: this.data.protocol })
    })
  }
})