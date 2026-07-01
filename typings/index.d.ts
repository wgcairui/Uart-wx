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

  // ─── scheduled-op 定时操作指令 (2026-07-01 决策 18 第一阶段, 跟 uart-site-v3 类型对齐) ─
  type ScheduledOpStatus = 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'CANCELED'
  type ScheduledOpNotifyStatus = 'PENDING' | 'DISPATCHED' | 'SKIPPED'

  /** 列表分页响应 (跟 uart-site-v3 lib/api/endpoints/* 对齐) */
  interface PaginationRes {
    page: number
    pageSize: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }

  interface V2ListResponse<T> {
    items: T[]
    pagination: PaginationRes
  }

  /** 定时操作记录 (后端 model: mongo_entity/scheduled-operation.ts) */
  interface ScheduledOperation {
    _id: string
    mac: string
    pid: number
    protocol: string
    /** 已组装好的最终指令 (admin 端: instruct name; user 端: fillInstructTemplate 后 hex) */
    content: string
    /** 计划触发时间 (UTC ms) */
    scheduledAt: number
    createdBy: string
    createdByGroup: 'admin' | 'root' | 'user'
    status: ScheduledOpStatus
    bullJobId?: string
    executedAt?: number
    result?: ApolloMongoResult
    failReason?: string
    notifyStatus: ScheduledOpNotifyStatus
    notifiedChannels: string[]
    remark?: string
    createdAt?: string
    updatedAt?: string
  }

  /** 创建定时操作请求体 (前后端共用, 走 endpoint 内部字段映射) */
  interface CreateScheduledOpReq {
    mac: string
    pid: number
    protocol: string
    content: string
    /** ISO 字符串 (前端 Date.toISOString()) */
    scheduledAt: string
    remark?: string
  }
}