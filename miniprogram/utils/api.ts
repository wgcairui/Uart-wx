type url = 'getuserMountDev'
  | 'code2Session'
  | 'getphonenumber'
  | 'register'
  | 'getDTUInfo'
  | 'bindDev'
  | 'getAlarm'
  | 'getDevsRunInfo'
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
  private async RequestUart<T>(object: { url: url, data: Object, method?: "GET" | "POST" }) {
    wx.showLoading({ title: '正在查询' })
    return await new Promise<ApolloMongoResult<T>>((resolve, reject) => {
      wx.request({
        url: this.url + object.url,
        data: Object.assign({ token: this.token }, object.data),
        method: object.method || "GET",
        success: res => {
          console.log(res);
          wx.hideLoading()
          if(res.statusCode !== 200){
            wx.showModal({title:String(res.statusCode),content:res.errMsg})
            reject(res)
          }else resolve(res.data as any)
        },
        fail: e => {
          wx.hideLoading()
          reject(e)
        },
      })
    })
  }
}

export default new api()
