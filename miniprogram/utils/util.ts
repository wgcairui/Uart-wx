const { globalData } = getApp<IAppOption>()
// 登录
export const login = (data: { js_code: string }) => {
  return RequestUart({url:"code2Session",data})
}
// 解密电话字符串
export const getphonenumber = (data: { encryptedData: string,iv:string }) => {
  return RequestUart({url:"getphonenumber",data})
}
// 注册
export const registerUser = (data:{user:string,name:string,tel:string,mail:string,avanter:string})=>{
  return RequestUart({url:"register",data})
}

// 请求uart
function RequestUart(object:{url:string,data:Object,method?:"GET"|"POST"}){
  return new Promise<ApolloMongoResult>((resolve,reject)=>{
    wx.request({
      url:globalData.apiUrl + object.url,
      data:Object.assign({appid:globalData.openid},object.data),
      method:object.method || "GET",
      success: res => resolve(res.data as any),
      fail: e => reject(e)
    })
  })
}