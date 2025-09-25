// 用户接口请求
import HttpService from "@/utils/http"
import type { LoginRequest } from "@/type/user"
import type { ApiResponse } from "@/type/comm"


export const loginApi = async (data: LoginRequest) => {
    return await HttpService.post('/api/login', data)
}

export const getUserInfo = async (name: string) => {
    return await HttpService.get(`/api/user/${name}`).then(data => data)
}