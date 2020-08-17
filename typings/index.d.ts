/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: Partial<WechatMiniprogram.UserInfo>,
    apiUrl:string
    user: string,
    userGroup: string,
    openid: string,
    [x:string]:any
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

interface ApolloMongoResult {
  msg: string
  ok: number
  n: number
  nModified: number
  upserted: any,
  arg?: any
}