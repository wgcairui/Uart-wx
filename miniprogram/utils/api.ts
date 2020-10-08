type url = 'getuserMountDev'
  | 'code2Session'
  | 'getphonenumber'
  | 'register'
  | 'getDTUInfo'
  | 'bindDev'
  | 'getAlarm'
  | 'getDevsRunInfo'
  | 'getDevsHistoryInfo'
class api {
  readonly url: string
  token: string
  constructor() {
    this.url = "https://test.ladishb.com/api/wx/"
    this.token = ""
  }
  // 登录
  async login(data: { js_code: string }) {
    const el = await this.RequestUart<any>({ url: "code2Session", data })
    if (el.ok)
      this.token = el.arg.token
    return el
  }
  // 解密电话字符串
  getphonenumber<T>(data: { encryptedData: string, iv: string }) {
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

  // 绑定DTU
  bindDev(mac: string) {
    return this.RequestUart<any>({ url: 'bindDev', data: { mac } })
  }

  // 获取告警信息
  getAlarm(start: string, end: string) {
    return this.RequestUart<uartAlarmObject[]>({ url: 'getAlarm', data: { start, end } })
  }
  // 获取设备实时运行信息
  getDevsRunInfo(mac: string, pid: string) {
    return this.RequestUart<queryResult>({ url: "getDevsRunInfo", data: { mac, pid } })
  }
  // 获取设备历史运行数据
  getDevsHistoryInfo(mac: string, pid: string, name: string, datatime: string = '') {
    return this.RequestUart<any>({ url: 'getDevsHistoryInfo', data: { mac, pid, name, datatime } })
  }
  private async RequestUart<T>(object: { url: url, data: Object, method?: "GET" | "POST" }) {
    //wx.showLoading({ title: '正在查询' })
    wx.showNavigationBarLoading()
    return await new Promise<ApolloMongoResult<T>>((resolve, reject) => {
      wx.request({
        url: this.url + object.url,
        data: Object.assign({ token: this.token }, object.data),
        method: object.method || "GET",
        success: res => {
          //console.log(res);
          //wx.hideLoading()
          if (res.statusCode !== 200) {
            wx.showModal({ title: String(res.statusCode), content: res.errMsg })
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
        complete:()=>{
          wx.hideNavigationBarLoading()
        }
      })
    })
  }
}

export default new api()
