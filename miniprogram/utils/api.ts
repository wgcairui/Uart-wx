type url = 'getuserMountDev'
  | 'code2Session'
  | 'getphonenumber'
  | 'register'
  | 'getDTUInfo'
  | 'bindDev'
  | 'getAlarm'
  | 'getDevsRunInfo'
  | 'getDevsHistoryInfo'
  | 'userlogin'
  | 'getUserInfo'
  | 'unbindwx'
  | 'getAlarmunconfirmed'
  | 'alarmConfirmed'
  | 'getDevOprate'
  | 'SendProcotolInstructSet'
  | 'getUserDevConstant'
  | 'pushThreshold'
class api {
  readonly url: string
  token: string
  constructor() {
    this.url = "https://test.ladishb.com/api/wx/"
    this.token = ""

  }
  // 登录-用于小程序启动关联微信自动登录
  async login(data: { js_code: string }) {
    const el = await this.RequestUart<any>({ url: "code2Session", data })
    if (el.ok) {
      this.token = el.arg.token
      wx.setStorage({ key: 'token', data: el.arg.token })
    }
    return el
  }
  //  登录-用于小程序登录页面登录
  userlogin(data: { openid: string, avanter: string, user: string, passwd: string }) {
    return this.RequestUart<any>({ url: 'userlogin', data })
  }
  // 用于解绑微信和透传账号的绑定关系
  unbindwx() {
    return this.RequestUart<any>({ url: 'unbindwx', data: {} })
  }
  // 解密电话字符串
  getphonenumber<T>(data: { openid: string, encryptedData: string, iv: string }) {
    return this.RequestUart<T>({ url: "getphonenumber", data })
  }
  // 注册
  registerUser(data: { user: string, name: string, tel: string, avanter: string }) {
    return this.RequestUart({ url: "register", data })
  }
  // 获取用户绑定设备
  getuserMountDev() {
    return this.RequestUart<{ UTs: Terminal[] }>({ url: 'getuserMountDev', data: {} })
  }
  // 获取DTU信息
  getDTUInfo(mac: string) {
    return this.RequestUart<Terminal>({ url: 'getDTUInfo', data: { mac } })
  }
  // 获取用户信息
  getUserInfo() {
    return this.RequestUart<UserInfo>({ url: 'getUserInfo', data: {} })
  }

  // 绑定DTU
  bindDev(mac: string) {
    return this.RequestUart<any>({ url: 'bindDev', data: { mac } })
  }
  // 获取未确认告警数量
  getAlarmunconfirmed() {
    return this.RequestUart<string>({ url: 'getAlarmunconfirmed', data: {} })
  }
  // 获取告警信息
  getAlarm(start: string, end: string) {
    return this.RequestUart<uartAlarmObject[]>({ url: 'getAlarm', data: { start, end } })
  }
  // 确认告警信息,更新bar
  alarmConfirmed(id: string) {
    return this.RequestUart({ url: 'alarmConfirmed', data: { id } }).finally(() => this.getAlarmunconfirmed())
  }
  // 获取设备实时运行信息
  getDevsRunInfo(mac: string, pid: string) {
    return this.RequestUart<queryResult>({ url: "getDevsRunInfo", data: { mac, pid } })
  }
  // 获取设备历史运行数据
  getDevsHistoryInfo(mac: string, pid: string, name: string, datatime: string = '') {
    return this.RequestUart<any>({ url: 'getDevsHistoryInfo', data: { mac, pid, name, datatime } })
  }
  // 获取设备操控指令
  getDevOprate(protocol: string) {
    return this.RequestUart<Pick<ProtocolConstantThreshold, 'OprateInstruct'>>({ url: 'getDevOprate', data: { protocol } })
  }
  //  固定发送设备操作指令
  SendProcotolInstructSet(query: Partial<instructQueryArg>, item: OprateInstruct) {
    return this.RequestUart<any>({ url: 'SendProcotolInstructSet', data: { query, item }, method: 'POST' })
  }
  // 获取用户自定义协议配置
  getUserDevConstant(protocol: string) {
    return this.RequestUart<{ user: ProtocolConstantThreshold, sys: ProtocolConstantThreshold, protocol: protocol }>({ url: 'getUserDevConstant', data: { protocol } })
  }
  // 统一提交配置
  pushThreshold(arg: ConstantAlarmStat[] | Threshold[] | string[], type: ConstantThresholdType, Protocol: string) {
    return this.RequestUart<any>({ url: "pushThreshold", data: { type, arg, Protocol }, method: "POST" })
  }
  private async RequestUart<T>(object: { url: url, data: Object, method?: "GET" | "POST" }) {
    //wx.showLoading({ title: '正在查询' })
    wx.showNavigationBarLoading()
    const token: string = this.token || await wx.getStorage({ key: 'token' }).then(el => el.data).catch(() => "")
    return await new Promise<ApolloMongoResult<T>>((resolve, reject) => {
      wx.request({
        url: this.url + object.url,
        data: Object.assign({ token: token }, object.data),
        method: object.method || "GET",
        success: res => {
          //console.log(res);
          //wx.hideLoading()
          if (res.statusCode !== 200) {
            wx.showModal({ title: String(res.statusCode), content: res.data.toString() || res.errMsg })
            reject(res)
          } else {
            setTimeout(() => {
              resolve(res.data as any)
            }, 0)
          }
        },
        fail: e => {
          wx.showModal({ title: '服务器错误', content: e.errMsg })
          reject(e)
        },
        complete: () => {
          wx.hideNavigationBarLoading()
        }
      })
    })
  }
}

export default new api()
