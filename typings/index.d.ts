/// <reference path="../node_modules/@types/wechat-miniprogram/index.d.ts" />

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
