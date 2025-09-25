// 封装一些工具函数

import type { ApiRoute, AppRouteRecordRaw } from "@/type/comm"

// token本地存储操作
export const delToken = () => localStorage.removeItem('token')
export const getToken = () => localStorage.getItem('token')
export const setToken = (token: string) => localStorage.setItem('token', token)


// 动态路由转换
export const formatRoutes = (routes: ApiRoute[], parentPath = ''): AppRouteRecordRaw[] => {
  const modules: Record<string, () => Promise<any>> = import.meta.glob('@/views/**/*.vue')
  const Layout = () => import('@/layout/Layout.vue')

  return routes.map(route => {
    const r: AppRouteRecordRaw = { ...route } as any
    const compName = route.component

    // Layout 特殊处理
    if (compName === 'Layout') {
      r.component = Layout
    } else if (compName) {
      const compPath = `/src/views/custom/${compName.replace(/^\//, '')}.vue`
      if (modules[compPath]) {
        r.component = modules[compPath]
      } else {
        console.warn(`组件未找到: ${compName}`)
        r.component = undefined
      }
    }

    // 递归处理子路由
    if (route.children && route.children.length > 0) {
      r.children = formatRoutes(route.children, r.path)
    }
    return r
  })
}


// 获取用户路由
export const loadRoutes = (staticRoutes: AppRouteRecordRaw[], userRoutes: AppRouteRecordRaw[]) => {
  return [...staticRoutes.filter(route => route.name !== 'login'), ...userRoutes]
}