interface IAppOption {
  globalData: {
    userInfo?: Partial<WechatMiniprogram.UserInfo>,
    user: string,
    userGroup: string,
    userName: string,
    userAvanter: string,
    userTel: string
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

/* protocol */
type communicationType = 232 | 485;
type protocolType = "ups" | "air" | "em" | "th";
type characterType = "utf8" | "hex" | "float" | "short" | "int" | "HX" | 'bit2'
// apollo server result
interface ApolloMongoResult<T> {
  msg: string
  ok: number
  n: number
  nModified: number
  upserted: any,
  arg: T
}

// page auery
interface PageQuery {
  DevMac: String,
  pid: String,
  mountDev: String,
  protocol: String
}

// 协议指令解析格式化
interface protocolInstructFormrize {
  name: string;
  enName?: string;
  regx: string | null;
  bl: string;
  unit: string | null;
  isState: boolean;
}
// 协议指令
interface protocolInstruct {
  name: string; // 指令名称--GQS
  resultType: characterType;
  shift: boolean;
  shiftNum: number;
  pop: boolean;
  popNum: number;
  isSplit: boolean
  resize: string;
  formResize: protocolInstructFormrize[];
  // 加入指令是否启用
  isUse: boolean,
  // 非标协议
  noStandard: boolean,
  // 前处理脚本
  scriptStart: string,
  // 后处理脚本
  scriptEnd: string
}
// 协议
interface protocol {
  Type: communicationType;
  Protocol: string;
  ProtocolType: protocolType;
  instruct: protocolInstruct[];
}
// 设备类型
interface DevsType {
  Type: string;
  DevModel: string;
  Protocols: {
    Type: communicationType;
    Protocol: string;
  }[];
}
// 登记注册终端
interface RegisterTerminal {
  DevMac: string;
  mountNode: string;
}
// 终端挂载设备
interface TerminalMountDevs {
  dtu: string;
  pic: any;
  Type: string
  online: boolean
  mountDev: string;
  protocol: string;
  pid: number;
}
// 终端
interface Terminal extends RegisterTerminal {
  _id: string
  DevMac: string
  online: boolean
  mountNode: string
  name: string;
  ip?: string
  port?: number
  jw?: string
  uart?: string
  AT?: boolean
  uptime?: string
  mountDevs: TerminalMountDevs[];
}
interface TerminalMountDevsEX extends TerminalMountDevs {
  TerminalMac: string
  Interval: number
}
// Node节点
interface NodeClient {
  Name: string;
  IP: string;
  Port: number;
  MaxConnections: number;
  count: number
}
// 用户绑定设备
interface BindDevice {
  user: string
  ECs: string[]
  UTs: (string | Terminal)[]
}

// Node节点硬件top
interface SocketRegisterInfo {
  hostname: string;
  totalmem: string;
  freemem: string;
  loadavg: number[];
  type: string;
  uptime: string;
  userInfo: {
    uid: number,
    gid: number,
    username: string,
    homedir: string,
    shell: string
  }
}
// 对节点发出的协议查询指令
interface queryObject {
  mac: string;
  type: number;
  mountDev: string
  protocol: string;
  pid: number;
  timeStamp: number;
  content: string | string[];
  Interval: number
  useTime: number
}
// 协议查询结果解析存储结构
interface queryResultArgument {
  name: string;
  value: any;
  unit: string | null;
  issimulate?: boolean
  alarm?: boolean
  [x: string]: any
}
//
interface queryResultParse {
  [x: string]: queryResultArgument
}
//协议查询结果
interface queryResult extends queryObject {
  updatedAt: string
  contents: IntructQueryResult[]
  result: queryResultArgument[];
  time?: string;
  useBytes?: number
}
interface IntructQueryResult {
  content: string
  buffer: {
    data: number[];
    type: string;
  };
}
//
interface timelog {
  content: string,
  num: number
}

// UartData数据
interface uartData extends NodeClient {
  data: queryResult[]
}

// 透传 api 数据 
interface socketNetInfo {
  ip: string;
  port: number;
  mac: string;
  jw: string;
  uart: string
  AT: boolean
  ICCID: string
}
// 节点websocket透传信息
interface WebSocketInfo {
  NodeName: string;
  Connections: number | Error;
  SocketMaps: socketNetInfo[];
}
// 节点上传信息
interface nodeInfo {
  hostname: string;
  totalmem: string;
  freemem: string;
  loadavg: number[];
  usemen?: number
  usecpu?: number
  type: string;
  uptime: string;
  version: string
}

type registerType = "wx" | "web" | "app"

/* 用户信息 */
interface UserInfo {
  avanter?: string
  userId: string
  name?: string;
  user: string;
  userGroup?: string;
  passwd?: string;
  mail?: string;
  company?: string;
  tel?: number;
  creatTime?: Date;
  modifyTime?: Date;
  address?: string;
  status?: boolean;
  // 注册类型
  rgtype: registerType
}

// 设备协议参数-常量
// 空调
// 空调
interface DevConstant_Air {
  Switch: string
  WorkMode: string
  //热通道温度
  HeatChannelTemperature: string;
  HeatChannelHumidity: string;
  //冷通道湿度
  ColdChannelTemperature: string;
  ColdChannelHumidity: string;
  //制冷温度
  RefrigerationTemperature: string;
  RefrigerationHumidity: string;
  // 风速
  Speed: string;
}
// EM
interface DevConstant_EM {
  battery: string
  voltage: string[],
  current: string[],
  factor: string[]
}
// UPS
interface DevConstant_Ups {
  Switch: string
  WorkMode: string
  UpsStat: string[]
  BettyStat: string[]
  InputStat: string[]
  OutStat: string[]
}
// TH
interface DevConstant_TH {
  Temperature: string;
  Humidity: string;
}
// IO
interface DevConstant_IO {
  di: string[];
  do: string[];
}
interface DevConstant extends DevConstant_Air, DevConstant_EM, DevConstant_TH, DevConstant_Ups {
  WorkMode: any;
}
// 协议参数阀值
interface Threshold {
  name: string
  min: number
  max: number
}
// 协议参数告警状态
interface ConstantAlarmStat extends queryResultArgument {
  alarmStat: string[]
  parse: { [x: string]: string }[]
}
// 协议操作指令
interface OprateInstruct {
  name: string
  value: string
  bl: string
  val?: number
  readme: string
}
// 协议参数-常量参数阀值
interface ProtocolConstantThreshold {
  Protocol: string,
  ProtocolType: string,
  Constant: DevConstant
  Threshold: Threshold[]
  AlarmStat: ConstantAlarmStat[]
  ShowTag: string[]
  OprateInstruct: OprateInstruct[]
}
// 用户自定义配置
interface userSetup {
  user: string
  tels: string[]
  mails: string[]
  ProtocolSetup: ProtocolConstantThreshold[]
  ProtocolSetupMap: Map<string, ProtocolConstantThreshold>
  ThresholdMap: Map<string, Map<string, Threshold>>
  AlarmStateMap: Map<string, Map<string, ConstantAlarmStat>>
}
// 协议解析结果集
interface queryResultSave {
  mac: string
  pid: number
  timeStamp: number
  result: queryResultArgument[]
  parse: queryResultParse
  Interval: number,
  useTime: number,
  time: string
}
type ConstantThresholdType = "Threshold" | "Constant" | "ShowTag" | "Oprate" | "AlarmStat"
// 操作指令查询对象
interface instructQueryArg extends queryResultArgument {
  DevMac: string
  pid: number,
  mountDev: string
  protocol: string
}


// 透传设备告警对象
interface uartAlarmObject {
  _id: string
  mac: string
  devName: string
  pid: number
  protocol: string
  tag: string
  timeStamp: number
  msg: string
  isOk?: boolean
  time: string
}

// 单条发送短信
type UartAlarmType = "透传设备下线提醒" | "透传设备上线提醒" | '透传设备告警'
interface smsUartAlarm {
  user: string
  tel: string
  name: string
  devname: string
  air?: string
  event?: string
  type: UartAlarmType
}
// LOG 日志
// 短信发送
interface logSmsSend {
  tels: string[]
  sendParams: {
    RegionId: string
    PhoneNumbers: string
    SignName: string
    TemplateCode: string
    TemplateParam: String
  },
  Success?: {
    Message: string
    RequestId: string
    BizId: string
    Code: string
  },
  Error?: any
}
// 邮件
interface mailResponse {
  accepted: string[]
  rejected: string[],
  envelopeTime: number
  messageTime: number
  messageSize: number
  response: string
  envelope: { from: string, to: string[] },
  messageId: string
}

interface logMailSend {
  mails: string[]
  sendParams: {
    from: string
    to: string
    subject: string
    html: string
  }
  Success?: mailResponse
  Error?: any
}
// 操作请求
interface logUserRequst {
  user: string,
  userGroup: string,
  type: string,
  argument?: any
}
type logLogins = "用户登陆" | '用户登出' | '用户注册' | "用户重置密码" | "用户修改信息"
// 用户登陆登出请求
interface logUserLogins {
  user: string,
  type: logLogins,
  address: string
  msg: string
}
// 节点连接断开等事件
type logNodesType = "连接" | "断开" | "非法连接请求" | "TcpServer启动失败" | "告警"
interface logNodes {
  ID: string
  IP: string
  Name: string
  type: logNodesType
}
// 终端连接
type logTerminalsType = "连接" | "断开" | "查询超时" | "查询恢复" | "操作设备" | "操作设备结果" | 'DTU操作'
interface logTerminals {
  NodeIP: string
  NodeName: string
  TerminalMac: string
  type: logTerminalsType
  msg?: string
  query?: any
  result?: any
  createdAt?: Date
}

// 设备流量使用量
interface logTerminaluseBytes {
  mac: string
  date: string
  useBytes: number
}
// 聚合设备
interface AggregationDev extends TerminalMountDevs {
  DevMac: string
  name: string
  online: boolean
}
interface AggregationDevParse {
  pid: number,
  DevMac: string,
  name: string,
  Type: string,
  mountDev: string,
  protocol: string,
  parse: { [x: string]: queryResultArgument }
}
interface Aggregation {
  user: string
  id: string
  name: string
  aggregations: AggregationDev[]
  devs: AggregationDevParse[]
}


// wx
interface wxRequest {
  errcode?: number
  errmsg?: string
}

interface wxRequestCode2Session extends wxRequest {
  openid: string
  session_key: string
  unionid: string
}

type AT = 'Z' | 'VER' | 'UART=1' | 'LOCATE=1' | 'IMEI' | 'ICCID' | 'IMSI'
// 操作指令请求对象
interface DTUoprate {
  DevMac: string
  events: string
  content: AT | string
  result?: string
}

// vant 事件对象
interface vantEvent<T = any> {
  type: string
  timeStamp: string
  target: { id: string, dataset: { [x: string]: any, item: T } }
  currentTarget: { id: string, dataset: { [x: string]: any, item: T } }
  mark: { [x: string]: any }
  detail: any
  touches: any
  changedTouches: any
  mut: boolean
}