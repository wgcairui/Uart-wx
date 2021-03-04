// 转换对象为路由参数
export const ObjectToStrquery = (Obj: { [x: string]: any }) => {
  const objArr = Object.keys(Obj).map(el => `${el}=${String(Obj[el])}`)
  return "?" + objArr.join("&")
}

export const RgexpTel = (tel: string) => {
  return /^(13[0-9]|14[5-9]|15[0-35-9]|166|17[0-8]|18[0-9]|19[89])[0-9]{8}$/.test(tel)
}
export const RgexpMail = (mail: string) => {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(mail)
}

export const parseTime = (time?: string | number | Date) => {
  if (time) {
    const date = new Date(time)
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    return `${date.toLocaleDateString()} ${h}:${m}:${s}`
  }
  else return ''
}