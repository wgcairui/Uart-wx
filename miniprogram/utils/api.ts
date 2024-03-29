import { urlRequest, urlWs } from "../config"
export interface tencetMap {
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

interface result<T = any> {
  code: number
  data: T
  message: string
  status: number
  [x: string]: any
}

/**
 * @class wp客户端统一请求api
 */
class api {
  token: string
  ws!: WechatMiniprogram.SocketTask


  /**
   * ws事件收集,避免重复注册监听对象
   */
  wsEventMap: Map<string, (e: any) => void>

  constructor() {
    this.token = ""
    this.wsEventMap = new Map()
  }

  async connectWs() {
    /**
     * 创建ws连接
     */
    this.ws = await new Promise((resolve, reject) => {
      const io = wx.connectSocket({
        url: urlWs,
        header: {
          'content-type': 'application/json',
        },
        success: (res) => {
          console.log({ res });
        },
        fail(err) {
          console.log({ err });
          reject(err)
        }
      })
      resolve(io)
    })


    this.ws.onClose(() => {
      console.log('ws close');
      setTimeout(() => this.connectWs(), 3000)
    })

    /**
    * 打开ws连接,发送token
    */
    this.ws.onOpen(() => {
      this.ws.send({
        data: JSON.stringify({ token: this.token })
      })
    })

    /**
     * 监听
     */
    this.ws.onMessage(res => {
      console.log(res);
      if (/^{.*}$/.test(res.data as string)) {
        const { type, data }: { type: string, data: any } = JSON.parse(res.data as string)
        const fun = this.wsEventMap.get(type)
        if (fun) {
          fun(data)
        }
      }
    })
  }

  /**
   * 设置token
   * @param token 
   */
  async setToken(token: string) {
    this.token = token
    wx.setBackgroundFetchToken({
      token
    })

    if (this.ws) {
      this.ws.close({})
    }
    await this.connectWs()
    /**
     * 监听普通信息
     */
    this.onMessage('info', msg => {
      wx.showModal({
        content: msg,
        title: 'info'
      })
    })

    /**
     * 监听告警信息
     */
    this.onMessage<Uart.uartAlarmObject>('alarm', (data) => {
      wx.showModal({
        content: (data as Uart.uartAlarmObject).msg,
        title: '设备告警提醒',
        success() {
          wx.switchTab({
            url: '/pages/index/alarm/alarm'
          })
        }
      })
    })
  }

  /**
   * 订阅事件
   * @param event 
   * @param fun 
   */
  onMessage<T = any>(event: string, fun: (data?: T) => void) {
    this.ws.send({
      data: JSON.stringify({
        token: this.token,
        event
      }),
      success(res) {
        console.log(`onMessage ${event} ${res.errMsg}`);
      },
      fail(err) {
        console.log(`onMessage ${event} ${err.errMsg}`);
      }
    })

    if (!this.wsEventMap.has(event)) {
      this.wsEventMap.set(event, fun)
    }
  }

  /**
   * 取消订阅
   * @param event 
   */
  offWs(event: string) {
    this.wsEventMap.delete(event)
  }



  /**
   * 登录- 域名
   * @param data 
   */
  async login(data: { js_code: string, scene?: string }) {
    const el = await this.fetch<{ token: string }>("auth/code2Session", data, "GET")
    if (el.code) {
      this.setToken(el.data.token)
    }
    return el
  }

  /**
   * 登录-用于小程序登录页面登录
   * @param data 
   */
  async userlogin(data: { openid: string, unionid: string, avanter: string, user: string, passwd: string }) {
    const el = await this.fetch<{ token: string }>('auth/wplogin', data)
    if (el.code) {
      this.setToken(el.data.token)
    }
    return el
  }

  /**
   * 更新用户头像和昵称
   * @param nickName 昵称
   * @param avanter 头像链接
   */
  updateAvanter(nickName: string, avanter: string) {
    return this.fetch('updateAvanter', { nickName, avanter })
  }

  /**
   * 用于解绑微信和透传账号的绑定关系
   */
  async unbindwx() {
    const el = await this.fetch('unbindwx')
    this.token = ""
    return el
  }

  /**
   * 解密电话字符串
   * @param data 
   */
  getphonenumber(data: { openid: string, encryptedData: string, iv: string }) {
    return this.fetch<{ phoneNumber: string }>("auth/getphonenumber", data)
  }

  /**
   * 注册
   * @param data 
   */
  registerUser(data: { user: string, openid: string, name: string, tel: string, avanter: string }) {
    return this.fetch("auth/wxRegister", data)
  }

  /**
   * 绑定DTU
   * @param mac 
   */
  bindDev(mac: string) {
    return this.fetch<any>('bindDev', { mac })
  }

  /**
   * 获取未确认告警数量
   */
  getAlarmunconfirmed() {
    return this.fetch<number>('getAlarmunconfirmed')
  }

  /**
   * 获取gps定位的详细地址
   * @param location 
   */
  getGPSaddress(location: string) {
    return this.fetch<any>('getGPSaddress', { location })
  }

  /**
   * 注销微信
   */
  async cancelwx() {
    const el = await this.fetch<string>('cancelwx')
    this.token = ""
    return el
  }



  /**
   * 添加虚拟设备
   */
  addVm() {
    return this.fetch<Uart.Terminal[]>('addVm')
  }

  /**
   * 修改DTU名称
   * @param dtu mac
   * @param name 新的名称
   */
  modifyDTUName(dtu: string, name: string) {
    return this.fetch<string>('modifyDTUName', { dtu, name })
  }

  /**
   * 更新dtu定位
   * @param dtu dtuMac
   * @param jw 经纬度
   */
  updateGps(mac: string, jw: string) {
    return this.fetch<string>('updateGps', { mac, jw })
  }

  /**
   * web登录
   * @param code token
   */
  webLogin(code: string) {
    return this.fetch<string>('webLogin', { code, token: this.token })
  }






















  /**
   * 添加用户
   * @param name 
   * @param user 
   * @param passwd 
   * @param tel x
   * @param mail 
   * @param company 
   * @returns 
   */
  addUser(name: string, user: string, passwd: string, tel: string, mail: string, company: string) {
    return this.fetch("guest/addUser", { name, user, passwd, tel, mail, company })
  }

  /**
   * 重置密码到发送验证码
   * @param user 
   * @returns 
   */
  resetPasswdValidation(user: string) {
    return this.fetch("guest/resetPasswdValidation", { user })
  }

  /**
   * 重置用户密码
   * @param user 
   * @param passwd 
   * @param code 
   * @returns 
   */
  resetUserPasswd(user: string, passwd: string, code: string) {
    return this.fetch("guest/resetUserPasswd", { user, passwd, code })
  }

  /**
   * 微信登录
   * @param code 
   * @param state 
   * @returns 
   */
  wxlogin(code: string, state: string) {
    return this.fetch("auth/wxlogin", { code, state })
  }

  crc(data: any) {
    return this.fetch<string>("open//crc", { data })
  }

  /**
   * 获取用户绑定设备
   * @returns 
   */
  BindDev() {
    return this.fetch<Uart.BindDevice>("BindDev")
  }

  /**
   * 获取用户信息
   * @returns 
   */
  userInfo() {
    return this.fetch<Uart.UserInfo>("userInfo")
  }

  /**
   * 获取用户告警
   * @param start 
   * @param end 
   * @returns 
   */
  getAlarm(start: string = new Date().toLocaleDateString().replace(/\//g, "-") + " 0:00:00", end: string = new Date().toLocaleDateString().replace(/\//g, "-") + " 23:59:59") {
    return this.fetch<(Uart.uartAlarmObject & { time: string })[]>("loguartterminaldatatransfinites", { start, end })
  }

  /**
   * 确认用户告警
   * @param id 
   * @returns 
   */
  confrimAlarm(id?: string) {
    return this.fetch("confrimAlarm", { id })
  }

  /**
   * 获取指定且在线的终端
   * @param mac 
   * @returns 
   */
  getTerminalOnline(mac: string) {
    return this.fetch<Uart.Terminal | null>("getTerminalOnline", { mac })
  }

  /**
  * 修改用户设备别名
  * @param mac 
  * @param name 
  * @returns 
  */
  modifyTerminal(mac: string, name: string) {
    return this.fetch('modifyTerminal', { mac, name })
  }

  /**
  * 添加绑定设备
  * @param mac 
  */
  addUserTerminal(mac: string) {
    return this.fetch("addUserTerminal", { mac })
  }

  /**
  * 删除绑定设备
  * @param mac 
  * @returns 
  */
  delUserTerminal(mac: string) {
    return this.fetch("delUserTerminal", { mac })
  }

  /**
  * 获取设备类型
  * @param Type 
  * @returns 
  */
  getDevTypes(Type: string) {
    return this.fetch<Uart.DevsType[]>("getDevTypes", { Type })
  }

  /**
  * 删除终端挂载设备
  * @param mac 
  * @param pid 
  */
  delTerminalMountDev(mac: string, pid: number) {
    return this.fetch("delTerminalMountDev", { mac, pid })
  }

  /**
  *   添加用户终端挂载设备
  * @param mac 
  * @param param2 
  * @returns 
  */
  addTerminalMountDev(mac: string, mountDev: Uart.TerminalMountDevs) {
    return this.fetch("addTerminalMountDev", { mac, mountDev })
  }

  /**
  * 获取用户告警配置
  * @param user 
  * @param filter 
  * @returns 
  */
  getUserAlarmSetup() {
    return this.fetch<Uart.userSetup>("getUserAlarmSetup")
  }

  /**
  * 修改用户告警配置联系方式
  * @param tels 联系电话
  * @param mails 联系邮箱
  * @returns 
  */
  modifyUserAlarmSetupTel(tels: string[], mails: string[]) {
    return this.fetch("modifyUserAlarmSetupTel", { tels, mails })
  }

  /**
  * 修改用户信息
  * @param user 
  * @param data 
  * @returns 
  */
  modifyUserInfo(data: Partial<Uart.UserInfo>) {
    return this.fetch("modifyUserInfo", { data })
  }

  /**
  * 获取公众号二维码
  * @param user 
  * @returns 
  */
  mpTicket() {
    return this.fetch("mpTicket")
  }

  /**
  * 获取小程序二维码
  * @param user 
  * @returns 
  */
  wpTicket() {
    return this.fetch("wpTicket")
  }


  /**
  * 获取用户单个协议告警配置
  * @param protocol 
  */
  getUserAlarmProtocol(protocol: string) {
    return this.fetch<Uart.ProtocolConstantThreshold>("getUserAlarmProtocol", { protocol })
  }

  /**
  * 获取单个协议告警配置
  * @param protocol 
  */
  getAlarmProtocol(protocol: string) {
    return this.fetch<Uart.ProtocolConstantThreshold>("getAlarmProtocol", { protocol })
  }

  /**
  * 获取用户设备运行数据
  * @param mac 
  * @param pid 
  */
  getTerminalData(mac: string, pid: number | string) {
    return this.fetch<Uart.queryResultSave>("getTerminalData", { mac, pid })
  }

  /**
   * 获取用户设备历史运行数据
   * @param mac 
   * @param pid 
   * @param name 
   * @param datetime 
   * @returns 
   */
  getTerminalDatas(mac: string, pid: number | string, name: string, datetime: string) {
    return this.fetch<Uart.queryResultSave[]>("getTerminalDatas", { mac, pid, name, datetime })
  }

  /**
  * 重置设备超时状态
  * @param mac 
  * @param pid 
  */
  refreshDevTimeOut(mac: string, pid: number) {
    return this.fetch("refreshDevTimeOut", { mac, pid })
  }

  /**
  * 固定发送设备操作指令
  * @param query 
  * @param item 
  * @returns 
  */
  SendProcotolInstructSet(query: Uart.instructQueryArg, item: Uart.OprateInstruct) {
    return this.fetch<Uart.ApolloMongoResult>("SendProcotolInstructSet", { query, item })
  }

  /**
   * 获取指定协议
   * @param protocol 
   * @returns 
   */
  getProtocol(protocol: string) {
    return this.fetch<Uart.protocol>("getProtocol", { protocol })
  }

  /**
  * 设置用户自定义设置(协议配置)
  * @param Protocol 协议
  * @param type 操作类型
  * @param arg 参数
  * @returns 
  */
  setUserSetupProtocol(protocol: string, type: Uart.ConstantThresholdType, arg: any) {
    return this.fetch("setUserSetupProtocol", { protocol, type, arg })
  }

  /**
   * 设备设备别名
   * @param mac 
   * @param pid 
   * @param protocol 
   * @param name 
   * @param alias 
   * @returns 
   */
  setAlias(mac: string, pid: number, protocol: string, name: string, alias: string) {
    return this.fetch("setAlias", { mac, pid, protocol, name, alias })
  }

  /**
  * 获取终端信息
  * @param mac 
  * @returns 
  */
  getTerminal(mac: string) {
    return this.fetch<Uart.Terminal>("getTerminal", { mac })
  }

  /**
  *  获取用户布局配置
  * @param id 
  */
  getUserLayout(id: string) {
    return this.fetch<Uart.userLayout>("getUserLayout", { id })
  }

  /**
  *  获取用户布局配置
  * @param id 
  */
  getAggregation(id: string) {
    return this.fetch<Uart.Aggregation>("getAggregation", { id })
  }

  /**
  * 添加聚合设备
  * @param name 
  * @param aggs 
  * @returns 
  */
  addAggregation(name: string, aggs: Uart.AggregationDev[]) {
    return this.fetch("addAggregation", { name, aggs })
  }

  /**
   * 删除聚合设备
   * @param user 
   * @param id 
   * @returns 
   */
  deleteAggregation(id: string) {
    return this.fetch("deleteAggregation", { id })
  }

  /**
  * 设置用户布局配置
  * @param id 
  * @param type 
  * @param bg 
  * @param Layout 
  */
  setUserLayout(id: string, type: string, bg: string, Layout: Uart.AggregationLayoutNode[]) {
    return this.fetch<Uart.ApolloMongoResult>("setUserLayout", { id, type, bg, Layout })
  }


  // V2 gps转高德gps
  V2_API_Aamp_gps2autoanvi(locations: string | string[], coordsys: 'gps' | 'mapbar' | 'baidu' = "gps") {
    return this.fetch<string | string[]>('util/AMap/GPS2autonavi', { coordsys, locations: Array.isArray(locations) ? locations.join("|") : locations })
  }

  // V2 ip转gps
  V2_API_Aamp_ip2local(ip: string) {
    return this.fetch<string>("util/AMap/IP2loction", { ip })
  }











  /**
  * 获取dtu远程调试网址
  * @param mac 
  */
  iotRemoteUrl(mac: string) {
    return this.fetch<string>('root/iotRemoteUrl', { mac })
  }

  /**
     * 获取所有节点
     * @param name 
     */
  Nodes() {
    return this.fetch<Uart.NodeClient[]>("root/Nodes",)
  }

  /**
     * 添加登记设备
     * @param DevMac 
     * @param mountNode 
     * @returns 
     */
  addRegisterTerminal(DevMac: string, mountNode: string) {
    return this.fetch("root/addRegisterTerminal", { DevMac, mountNode })
  }

  /**
  * 获取终端信息
  * @param mac 
  * @returns 
  */
  getRootTerminal(mac: string) {
    return this.fetch<Uart.Terminal>("getTerminal", { mac })
  }


  /**
     * 注册设备
     * @param data 
     */
  addRegisterDev(ids: string[], mountDev: Uart.TerminalMountDevs) {
    return this.fetch<Uart.registerDev[]>("root/addRegisterDev", { ids, mountDev })
  }

  /**
   * 获取指定注册设备
   * @param id 
   * @returns 
   */
  getRegisterDev(id: string) {
    return this.fetch<Uart.registerDev>("getRegisterDev", { id })
  }

  /**
     * 删除指定注册设备
     * @param id 
     * @returns 
     */
  delRegisterDev(id: string) {
    return this.fetch("root/delRegisterDev", { id })
  }

  /**
   * 获取指定所有设备
   * @returns 
   */
  getRegisterDevs() {
    return this.fetch<Uart.registerDev[]>("root/getRegisterDevs")
  }


  /**
         * 固定发送DTU AT指令
         * @returns 
         */
  sendATInstruct(mac: string, content: string) {
    return this.fetch<Uart.ApolloMongoResult>("root/sendATInstruct", { mac, content })
  }


  /**
   * 初始化dtu
   * @param mac 
   */
  initTerminal(mac: string) {
    return this.fetch("root/initTerminal", { mac }, "POST", 1000 * 60 * 5)
  }

  /**
   * 获取code对应的base64QR图片数据
   * @param code 
   */
  qr(code: string) {
    return this.fetch<string>("qr", { code })
  }


  /**
   * 切换测试账号试用
   */
  async trial(data: { js_code: string }) {
    const el = await this.fetch<{ token: string }>("auth/trial", data, "GET")
    if (el.code) {
      this.setToken(el.data.token)
    }
    return el
  }


  /**
   * @method api通用requst方法
   * @param object 
   */
  async fetch<T = any>(url: string, data: Object = {}, method: "GET" | "POST" = "POST", timeout: number = 1000 * 60) {
    const token: string = this.token || await wx.getStorage({ key: 'token' }).then(el => el.data).catch(() => "")
    return await new Promise<result<T>>((resolve, reject) => {
      wx.request<result<T>>({
        timeout,
        url: urlRequest + "/api/" + url,
        data,
        method,
        enableHttp2: true,
        header: { authorization: token, type: 'wp' },
        success: res => {
          switch (res.data.code) {
            case 201:
              wx.navigateTo({
                url: '/pages/util/smsValidation/smsValidation',
                events: {
                  code: (code: string) => {
                    this.fetch('smsCodeValidation', { code }).then(codeValidation => {
                      if (codeValidation.code) {
                        this.fetch(url, data, method).then(res => {
                          resolve(res.data as any)
                        })
                      } else {
                        wx.showModal({
                          title: 'error',
                          content: '短信校验错误'
                        })
                        throw new Error()
                      }
                    })
                  }
                }
              })
              break;
            case 0:
              {
                console.log(res.data);

                switch (res.data.status) {
                  case 403:
                    wx.navigateTo({
                      url: '/pages/login/login'
                    })
                    break;

                  case 405:
                    wx.switchTab({
                      url: '/pages/index/index'
                    })
                    break

                  case 500:
                    wx.showModal({
                      title: '请求出错',
                      content: res.data.message
                    })
                    break

                  default:
                    resolve(res.data as any)
                    break;
                }

              }
              break
            default:
              resolve(res.data as any)
              break;
          }
        },
        fail: e => {
          console.log({ e });
          wx.showToast({ title: '服务器错误', content: e.errMsg })
          reject(e)
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    })
  }
}

export default new api()
