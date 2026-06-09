/**
 * 转换对象为路由参数
 * @param Obj json对象
 */
export const ObjectToStrquery = (Obj: { [x: string]: any }) => {
  const objArr = Object.keys(Obj).map(el => `${el}=${String(Obj[el])}`)
  return "?" + objArr.join("&")
}

/**
 * 验证tel是否合规
 * @param tel 
 */
export const RgexpTel = (tel: string) => {
  return /^(13[0-9]|14[5-9]|15[0-35-9]|166|17[0-8]|18[0-9]|19[89])[0-9]{8}$/.test(tel)
}
/**
 * 验证邮箱是否合规
 * @param mail 
 */
export const RgexpMail = (mail: string) => {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(mail)
}

/**
 * 转换Date标准时间为易读的24小时时间（中国用户友好）
 * @param time
 * @returns like 2026-05-28 12:30:45
 */
export const parseTime = (time?: string | number | Date) => {
  if (!time) return ''
  const date = new Date(time)
  if (isNaN(date.getTime())) return ''
  const pad = (n: number) => n.toString().padStart(2, '0')
  const y = date.getFullYear()
  const mo = pad(date.getMonth() + 1)
  const d = pad(date.getDate())
  const h = pad(date.getHours())
  const mi = pad(date.getMinutes())
  const s = pad(date.getSeconds())
  return `${y}-${mo}-${d} ${h}:${mi}:${s}`
}

/**
 * 相对时间（中国用户友好）
 * @param time
 * @returns like "刚刚" / "5 分钟前" / "3 小时前" / "昨天 12:30" / "2026-05-26 14:20"
 */
export const parseTimeRelative = (time?: string | number | Date): string => {
  if (!time) return ''
  const date = new Date(time)
  if (isNaN(date.getTime())) return ''
  const now = Date.now()
  const diffSec = Math.floor((now - date.getTime()) / 1000)
  if (diffSec < 60) return '刚刚'
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} 分钟前`
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} 小时前`

  const pad = (n: number) => n.toString().padStart(2, '0')
  const today = new Date()
  const isYesterday = date.getFullYear() === today.getFullYear()
    && date.getMonth() === today.getMonth()
    && date.getDate() === today.getDate() - 1
  const h = pad(date.getHours())
  const mi = pad(date.getMinutes())
  if (isYesterday) return `昨天 ${h}:${mi}`

  const y = date.getFullYear()
  const mo = pad(date.getMonth() + 1)
  const d = pad(date.getDate())
  return `${y}-${mo}-${d} ${h}:${mi}`
}

/**
 * @method await等待
 * @param time 等待时间,ms
 */
export const sleep = (time: number = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(0)
    }, time);
  })
}

/**
 * 开通订阅消息
 */
type SubscribeType = "设备告警提醒" | "注册成功提醒"
export const SubscribeMessage = (Subscribes: SubscribeType[]) => {
  const Subscribe = {
    "设备告警提醒": '8NX6ji8ABlNAOEMcU7v2jtD4sgCB7NMHguWzxZn3HO4',
    "注册成功提醒": 'XPN75P-0F3so8dE__e5bxS9xznCyNGx4TKX0Fl-i_b4'
  }
  return new Promise<WechatMiniprogram.RequestSubscribeMessageSuccessCallbackResult>((resolve, reject) => {
    wx.requestSubscribeMessage({
      // 订阅消息id
      tmplIds: Subscribes.map(sub => Subscribe[sub]),
      success(res) {
        console.log(res);
        resolve(res)
      },
      fail(e) {
        console.log('接口调用失败', e);
        reject(e)
      }
    })
  })
}