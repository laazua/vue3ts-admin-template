// 一些公共接口类型
import type { RouteRecordRaw } from 'vue-router'
import type { LoginRequest } from '@/type/user'

// http 接口数据返回通用格式
export interface ApiResponse<T = any> {
    token: string
    code: number
    data: T
    message: string
}

// mock data
export interface MockRequest {
  body: LoginRequest
  query?: Record<string, any>
  headers?: Record<string, any>
}

// route meta数据格式
export interface RouteMeta {
    title?: string
    icon?: string
}

// 扩展路由类型，支持 meta
export type AppRouteRecordRaw = RouteRecordRaw & {
  meta?: RouteMeta
  children?: AppRouteRecordRaw[]
}

// 后端返回的路由接口类型
export interface ApiRoute {
  path: string
  name: string
  component: string
  redirect?: string
  meta?: any
  children?: ApiRoute[]
}

