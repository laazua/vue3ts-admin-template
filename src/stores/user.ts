import { defineStore } from "pinia"
import type { LoginRequest, UserInfoResp } from "@/type/user"
import { getUserInfo, loginApi } from "@/api/user"
import { delToken, formatRoutes, setToken } from "@/utils/comm"
import type { AppRouteRecordRaw } from "@/type/comm"


export const useUserStore = defineStore('user', () => {
    const token = ref<string>('')
    const isLogin = ref<boolean>(false)
    const userInfo = ref<UserInfoResp | null>(null)
    const userRoutes = ref<AppRouteRecordRaw[]>([])
    // 登录数据请求
    const login = async (data: LoginRequest) => {
        try {
            const { username } = data
            const res = await loginApi(data)
            token.value = res.data.token
            if (token) setToken(token.value)
            userInfo.value = await fetchUserInfo(username)
            userRoutes.value = formatRoutes(userInfo.value?.routes || []) || []
            console.log(res)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    // 用户信息数据请求
    const fetchUserInfo = async (name: string) => {
        const res = await getUserInfo(name)
        return res.data
    }
    // 用户登出系统
    const logout = async () => {
        token.value = ""
        isLogin.value = false
        userInfo.value = null
        userRoutes.value = []
        delToken()
    }
    return { token, isLogin, userRoutes, login, logout }
})