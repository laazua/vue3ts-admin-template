// 封装请求响应
import axios from 'axios'
import type { 
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse } from 'axios'

import type { ApiResponse } from '@/type/comm'
import { getToken } from '@/utils/comm'
import { ElMessage } from 'element-plus'

// axios v1.x 引入 InternalAxiosRequestConfig
// axios v0.27.x 没有这个类型，所以要做兼容
type RequestConfig = AxiosRequestConfig & {
  headers?: any
}

// v1.x 有 InternalAxiosRequestConfig
// 如果存在就用，没有就 fallback 到 AxiosRequestConfig
type CompatibleRequestConfig =
  // @ts-ignore
  import('axios').InternalAxiosRequestConfig<RequestConfig> extends infer R
    ? R
    : RequestConfig

// 创建 axios 实例
const service: AxiosInstance = axios.create({
    url: import.meta.env.VITE_API_BASE_URL || '/',
    timeout: 6000
})

// 请求拦截器
service.interceptors.request.use(
    (config: CompatibleRequestConfig) => {
        const token = getToken()
        if (token) {
            // 方式 1：显式断言
            // (config.headers as any) = {
            //     ...(config.headers || {}),
            //     Authorization: `Bearer ${token}`,
            // }
           // 方式 2：类型扩展 (推荐， 更安全)
           if (!config.headers) config.headers = {} as any
           (config.headers as any).Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        const res = response.data
        if (res.code !== 2000) {
            ElMessage({
                type: 'error',
                message: res.message || 'Backend Response Error',
                duration: 6000,
            })
            return Promise.reject(new Error(res.message || 'Backend Response Error'))
        }
        return res.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default service