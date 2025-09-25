import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { LoginRequest, UserInfoResp } from "@/type/user"
import { getUserInfo, loginApi } from "@/api/user"
import { delToken, formatRoutes, loadRoutes, setToken, getToken } from "@/utils/comm"
import type { AppRouteRecordRaw } from "@/type/comm"
import router, { routes } from '@/router'


export const useUserStore = defineStore('user', () => {
    // state
    const token = ref<string>(getToken() || '')
    const isLogin = ref<boolean>(!!token.value)
    const userInfo = ref<UserInfoResp | null>(null)
    // computed: 用户路由
    const userRoutes = computed<AppRouteRecordRaw[]>(() =>
        userInfo.value?.routes ? formatRoutes(userInfo.value.routes) : []
    )
    // actions
    /** 登录 */
    const login = async (data: LoginRequest) => {
        try {
            const { username } = data
            const res = await loginApi(data) as { token: string }
            token.value = res.token
            if (token.value) setToken(token.value)

            userInfo.value = await fetchUserInfo(username)
            isLogin.value = true

            return true
        } catch (error) {
            console.error('登录失败:', error)
            return false
        }
    }
    /** 获取用户信息 */
    const fetchUserInfo = async (username: string) => {
        const res = await getUserInfo(username)
        return res as UserInfoResp
    }
    /** 获取用户可访问路由 */
    const getMenuRoutes = async () => {
        return loadRoutes(routes, userRoutes.value)
    }
    /** 重新注册用户路由 */
    const restoreUserRoutes = async () => {
        if (token && userInfo.value?.routes) {
            userRoutes.value.forEach(route => router.addRoute(route))
        }
        isLogin.value = false
    }
    /** 登出 */
    const logout = async () => {
        token.value = ''
        isLogin.value = false
        userInfo.value = null
        delToken()
    }

    return {
        token,
        isLogin,
        userInfo,
        userRoutes,
        login,
        logout,
        getMenuRoutes,
        restoreUserRoutes
    }
}, {
    persist: {
        key: 'user',
        storage: localStorage,
    }
})
