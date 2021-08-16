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