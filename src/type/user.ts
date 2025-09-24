// 用户相关的接口类型

import type { ApiRoute, AppRouteRecordRaw } from "./comm"

// 登录请求数据类型
export interface LoginRequest {
    username: string
    password: string
}

// 用户信息数据类型
export interface UserInfoResp {
    name: string
    emal: string
    roles: string[]
    routes: ApiRoute[]
}