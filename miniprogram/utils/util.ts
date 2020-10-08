// 转换对象为路由参数
export const ObjectToStrquery = (Obj: { [x: string]: string }) => {
  const objArr = Object.keys(Obj).map(el => `${el}=${Obj[el]}`)
  return "?" + objArr.join("&")
}