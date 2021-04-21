import { urlRequest, urlWs } from "../config"

interface tencetMap {
  /* 状态码，0为正常,
310请求参数信息有误，
311Key格式错误,
306请求有护持信息请检查字符串,
110请求来源未被授权 */
  status: number,
  request_id: string,
  message: string
  result: any
}

/**
 * api请求路径
 */
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
  | 'getUserAlarmTels'
  | 'setUserSetupContact'
  | 'addTerminalMountDev'
  | 'delTerminalMountDev'
  | 'delUserTerminal'
  | 'DevTypes'
  | 'modifyUserInfo'
  | 'getGPSaddress'
  | 'cancelwx'
  | 'getUserTel'
  | 'sendValidation'
  | 'ValidationCode'
  | 'getNodes'
  | 'bacthRegisterDTU'
  | 'addVm'
  | 'modifyDTUName'
  | 'updateGps'
  | 'webLogin'
  | 'iotRemoteUrl'
  | 'updateAvanter'

/**
 * @class wp客户端统一请求api
 */
class api {
  readonly url: string
  token: string
  private wsInter?: number
  constructor() {
    this.url = urlRequest + "/api/wx/"
    this.token = ""
  }

  /**
   * 登录- 域名
   * @param data 
   */
  async login(data: { js_code: string }) {
    const el = await this.RequestUart<any>({ url: "code2Session", data })
    if (el.ok) {
      this.token = el.arg.token
      wx.setBackgroundFetchToken({
        token: this.token
      })
      wx.setStorage({ key: 'token', data: el.arg.token })
      // 启用socket
      const ws = wx.connectSocket({
        url: urlWs,
        header: {
          'content-type': 'application/json'
        }
      })
      ws.onOpen(() => {
        ws.send({
          data: JSON.stringify({ token: el.arg.token as string }),
          success: () => {
            this.wsInter = setInterval(() => {
              ws.send({ data: 'time' })
            }, 1000 * 30)
          }
        })
        ws.onMessage((msg) => {
          wx.vibrateLong()
          wx.showModal({
            title: '新的告警信息',
            content: msg.data.toString(),
            success() {
              wx.switchTab({
                url: '/pages/index/alarm/alarm'
              })
            }
          })
        })
        wx.onSocketClose(() => {
          console.log(new Date().toLocaleString() + "socket close");
          clearInterval(this.wsInter)
        })
      })
    }
    return el
  }

  /**
   * 登录-用于小程序登录页面登录
   * @param data 
   */
  userlogin(data: { openid: string, avanter: string, user: string, passwd: string }) {
    return this.RequestUart<any>({ url: 'userlogin', data })
  }

  /**
   * 更新用户头像和昵称
   * @param nickName 昵称
   * @param avanter 头像链接
   */
  updateAvanter(nickName: string, avanter: string) {
    return this.RequestUart<boolean>({ url: 'updateAvanter', data: { nickName, avanter } })
  }

  /**
   * 用于解绑微信和透传账号的绑定关系
   */
  async unbindwx() {
    const el = await this.RequestUart<any>({ url: 'unbindwx', data: {} })
    this.token = ""
    return el
  }

  /**
   * 解密电话字符串
   * @param data 
   */
  getphonenumber<T>(data: { openid: string, encryptedData: string, iv: string }) {
    return this.RequestUart<T>({ url: "getphonenumber", data })
  }

  /**
   * 注册
   * @param data 
   */
  registerUser(data: { user: string, name: string, tel: string, avanter: string }) {
    return this.RequestUart({ url: "register", data })
  }

  /**
   * 获取用户绑定设备
   */
  getuserMountDev() {
    return this.RequestUart<{ UTs: Terminal[] }>({ url: 'getuserMountDev', data: {} })
  }

  /**
   * 获取DTU信息
   * @param mac 
   */
  getDTUInfo(mac: string) {
    return this.RequestUart<Terminal>({ url: 'getDTUInfo', data: { mac } })
  }

  /**
   * 获取用户信息
   */
  getUserInfo() {
    return this.RequestUart<UserInfo>({ url: 'getUserInfo', data: {} })
  }

  /**
   * 绑定DTU
   * @param mac 
   */
  bindDev(mac: string) {
    return this.RequestUart<any>({ url: 'bindDev', data: { mac } })
  }

  /**
   * 获取未确认告警数量
   */
  getAlarmunconfirmed() {
    return this.RequestUart<{ len: number, alarm: uartAlarmObject[] }>({ url: 'getAlarmunconfirmed', data: {} })
  }

  /**
   * 获取告警信息
   * @param start 
   * @param end 
   */
  getAlarm(start: string, end: string) {
    return this.RequestUart<uartAlarmObject[]>({ url: 'getAlarm', data: { start, end } })
  }

  /**
   * 确认告警信息,更新bar
   * @param id 
   */
  alarmConfirmed(id?: string) {
    return this.RequestUart({ url: 'alarmConfirmed', data: id ? { id } : {} })
  }

  /**
   * 获取设备实时运行信息
   * @param mac 
   * @param pid 
   */
  getDevsRunInfo(mac: string, pid: string) {
    return this.RequestUart<queryResult>({ url: "getDevsRunInfo", data: { mac, pid } })
  }

  /**
   * 获取设备历史运行数据
   * @param mac 
   * @param pid 
   * @param name 
   * @param datatime 
   */
  getDevsHistoryInfo(mac: string, pid: string, name: string, datatime: string = '') {
    return this.RequestUart<any>({ url: 'getDevsHistoryInfo', data: { mac, pid, name, datatime } })
  }

  /**
   * 获取设备操控指令
   * @param protocol 
   */
  getDevOprate(protocol: string) {
    return this.RequestUart<Pick<ProtocolConstantThreshold, 'OprateInstruct'>>({ url: 'getDevOprate', data: { protocol } })
  }

  /**
   * 固定发送设备操作指令
   * @param query 
   * @param item 
   */
  SendProcotolInstructSet(query: Partial<instructQueryArg>, item: OprateInstruct) {
    return this.RequestUart<any>({ url: 'SendProcotolInstructSet', data: { query, item }, method: 'POST' })
  }

  /**
   * 获取用户自定义协议配置
   * @param protocol 
   */
  getUserDevConstant(protocol: string) {
    return this.RequestUart<{ user: ProtocolConstantThreshold, sys: ProtocolConstantThreshold, protocol: protocol }>({ url: 'getUserDevConstant', data: { protocol } })
  }

  /**
   * 统一提交配置
   * @param arg 
   * @param type 
   * @param Protocol 
   */
  pushThreshold(arg: ConstantAlarmStat[] | Threshold[] | string[], type: ConstantThresholdType, Protocol: string) {
    return this.RequestUart<any>({ url: "pushThreshold", data: { type, arg, Protocol }, method: "POST" })
  }

  /**
   * 获取用户的告警联系方式
   */
  getUserAlarmTels() {
    return this.RequestUart<Pick<userSetup, 'mails' | 'tels'>>({ url: 'getUserAlarmTels', data: {} })
  }

  /**
   * 设置用户的告警联系方式
   * @param tels 
   * @param mails 
   */
  setUserSetupContact(tels: string[], mails: string[]) {
    return this.RequestUart<any>({ url: 'setUserSetupContact', data: { tels, mails }, method: "POST" })
  }

  /**
   * 添加DTU挂载设备
   * @param DevMac 
   * @param Type 
   * @param mountDev 
   * @param protocol 
   * @param pid 
   */
  addTerminalMountDe(DevMac: string, Type: string, mountDev: string, protocol: string, pid: string) {
    return this.RequestUart<any>({ url: 'addTerminalMountDev', data: { DevMac, Type, mountDev, protocol, pid }, method: "POST" })
  }

  /**
   * 删除终端挂载设备
   * @param DevMac 设备mac
   * @param mountDev 挂载设备
   * @param pid 
   */
  delTerminalMountDev(DevMac: string, mountDev: string, pid: string) {
    return this.RequestUart<any>({ url: 'delTerminalMountDev', data: { DevMac, mountDev, pid }, method: "POST" })
  }

  /**
   * 删除用户终端绑定
   * @param mac 
   */
  delUserTerminal(mac: string) {
    return this.RequestUart<any>({ url: 'delUserTerminal', data: { mac } })
  }

  /**
   * 获取设备类型
   * @param Type 设备类型大类
   */
  DevTypes(Type: string) {
    return this.RequestUart<DevsType[]>({ url: 'DevTypes', data: { Type } })
  }

  /**
   * 修改用户信息
   * @param type 修改类型
   * @param value 值
   */
  modifyUserInfo(type: 'tel' | 'mail' | 'name', value: string) {
    return this.RequestUart<any>({ url: 'modifyUserInfo', data: { type, value } })
  }

  /**
   * 获取gps定位的详细地址
   * @param location 
   */
  getGPSaddress(location: string) {
    return this.RequestUart<tencetMap>({ url: 'getGPSaddress', data: { location } })
  }

  /**
   * 注销微信
   */
  async cancelwx() {
    const el = await this.RequestUart<string>({ url: 'cancelwx', data: {} })
    this.token = ""
    return el
  }

  /**
   * 获取用户手机号码
   */
  getUserTel() {
    return this.RequestUart<string>({ url: 'getUserTel', data: {} })
  }

  /**
   * 发送短信验证码
   */
  sendValidation() {
    return this.RequestUart<string>({ url: 'sendValidation', data: {} })
  }

  /**
   * 检验短信验证码
   * @param code 验证码
   */
  ValidationCode(code: number) {
    return this.RequestUart<string>({ url: 'ValidationCode', data: { code } })
  }

  /**
   * 获取节点列表
   */
  getNodes() {
    return this.RequestUart<NodeClient[]>({ url: 'getNodes', data: {} })
  }

  /**
   * 批量注册DTU
   * @param node 节点名称
   * @param dtus dtuMac数组
   */
  bacthRegisterDTU(node: string, dtus: string[]) {
    return this.RequestUart<string>({ url: 'bacthRegisterDTU', data: { node, dtus }, method: "POST" })
  }

  /**
   * 添加虚拟设备
   */
  addVm() {
    return this.RequestUart<Terminal[]>({ url: 'addVm', data: {} })
  }

  /**
   * 修改DTU名称
   * @param dtu mac
   * @param name 新的名称
   */
  modifyDTUName(dtu: string, name: string) {
    return this.RequestUart<string>({ url: 'modifyDTUName', data: { dtu, name } })
  }

  /**
   * 更新dtu定位
   * @param dtu dtuMac
   * @param jw 经纬度
   */
  updateGps(dtu: string, jw: string) {
    return this.RequestUart<string>({ url: 'updateGps', data: { dtu, jw } })
  }

  /**
   * web登录
   * @param code token
   */
  webLogin(code: string) {
    return this.RequestUart<string>({ url: 'webLogin', data: { code, token: this.token } })
  }

  /**
   * 获取dtu远程调试网址
   * @param mac 
   */
  iotRemoteUrl(mac: string) {
    return this.RequestUart<string>({ url: 'iotRemoteUrl', data: { mac } })
  }

  /**
   * @method api通用requst方法
   * @param object 
   */
  private async RequestUart<T>(object: { url: url, data: Object, method?: "GET" | "POST" }) {
    //wx.showLoading({ title: '正在查询' })
    // wx.showNavigationBarLoading()
    const token: string = this.token || await wx.getStorage({ key: 'token' }).then(el => el.data).catch(() => "")
    return await new Promise<ApolloMongoResult<T>>((resolve, reject) => {
      wx.request({
        timeout: 1000 * 60,
        url: this.url + object.url,
        data: object.data,//Object.assign({ token: token }, object.data),
        method: object.method || "GET",
        enableHttp2:true,
        
        header: { token: token },
        success: res => {
          // console.log(res);
          // wx.hideLoading()
          if (res.statusCode !== 200) {
            wx.showToast({
              title: String(res.statusCode),
              content: res.data.toString() || res.errMsg,
              success() {
                wx.reLaunch({ url: '/pages/index/index' })
              }
            })
            reject(res)
          } else {
            setTimeout(() => {
              resolve(res.data as any)
            }, 0)
          }
        },
        fail: e => {
          wx.showModal({ title: '服务器错误', content: e.errMsg })
          // wx.hideLoading()
          reject(e)
        },
        complete: () => {
          // wx.hideNavigationBarLoading()
          // wx.hideLoading()
        }
      })
    })
  }
}

export default new api()
