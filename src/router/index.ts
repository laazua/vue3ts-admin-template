import { useUserStore } from "@/stores/user"
import type { ApiRoute, AppRouteRecordRaw } from "@/type/comm"
import { createRouter, createWebHashHistory } from "vue-router"


const routes: AppRouteRecordRaw[] = [
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/layout/Layout.vue'),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/Home.vue'),
                meta: { title: '首页', icon: '' },
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 守卫导航
router.beforeEach((to, _from) => {
    const userStore = useUserStore()
    const token = typeof userStore.token
    if (!token && to.path !== '/login')  return { path: '/login'}
    if (token && to.path === '/login') return { path: '/home' }

    if (userStore.token && userStore.userRoutes && !userStore.isLogin) {
        userStore.userRoutes.forEach((route: AppRouteRecordRaw) => router.addRoute(route as AppRouteRecordRaw))
        userStore.isLogin = true
        // 只在动态路由添加后做一次 replace，防止死循环
        return { ...to, replace: true }
    }
    return true
})

export default router