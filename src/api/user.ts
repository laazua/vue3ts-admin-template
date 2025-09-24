// 用户接口请求
import { get, post } from "@/utils/http"
import type { LoginRequest } from "@/type/user"


export const loginApi = async (data: LoginRequest) => {
    return post('/api/login', data)
}

export const getUserInfo = async (name: string) => {
    return get(`/api/user/${name}`)
}