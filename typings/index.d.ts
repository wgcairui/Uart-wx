interface IAppOption {
  globalData: {
    userInfo?: Partial<Uart.UserInfo>,
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

// 客户端错误上报 DTO (对齐 server 规范 v1, 2026-06-13 与 uart-server 协商)
namespace Uart {
  /** 错误日志入参 (前端 → 后端) */
  interface ClientErrorLogDto {
    error: string           // 错误信息 (max 2000)
    stack: string           // 完整堆栈 (max 20000)
    page: string            // 当前页面路径 (max 500)
    timestamp: number       // 客户端时间戳 ms
    appVersion: string      // 小程序/APP 版本 (max 64)
    systemInfo: Record<string, any>  // 设备/系统信息
    userId?: string         // 前端 userId (后端以 token 里的 @User() 为准, 此字段冗余)
    extra?: Record<string, any>     // 上下文 (source: 入口名 等)
  }

  /** 错误日志落库记录 (后端 → mongo log.client_errors) */
  interface ClientErrorRecord extends ClientErrorLogDto {
    ip?: string             // 客户端 IP
    dropped?: 'rate_limit' | null  // 后端限流标记
  }
}