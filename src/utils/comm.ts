// 封装一些工具函数

import type { ApiRoute, AppRouteRecordRaw } from "@/type/comm"

// token本地存储操作
export const delToken = () => localStorage.removeItem('token')
export const getToken = () => localStorage.getItem('token')
export const setToken = (token: string) => localStorage.setItem('token', token)


// 动态路由转换
export const formatRoutes = (routes: ApiRoute[]): AppRouteRecordRaw[] => {
  // 扫描 views 目录下所有 vue 文件
  const modules: Record<string, () => Promise<any>> = import.meta.glob('@/views/**/*.vue')
  
  // 特殊组件单独定义
  const Layout = () => import('@/layout/Layout.vue')

  return routes.map(route => {
    const r: AppRouteRecordRaw = { ...route } as any

    // 使用临时变量保存后端组件名
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
      r.children = formatRoutes(route.children)
    }

    return r
  })
}