// 转换对象为路由参数
export const ObjectToStrquery = (Obj: { [x: string]: any }) => {
  const objArr = Object.keys(Obj).map(el => `${el}=${String(Obj[el])}`)
  return "?" + objArr.join("&")
}