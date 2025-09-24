// http 请求方法封装

import type { AxiosRequestConfig } from 'axios'
import service from '@/utils/request'


// get 请求
export const get = <T = any>(url: string, config?: AxiosRequestConfig) => {
    return service.get<T>(url, config)
}

// post 请求
export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return service.post<T>(url, data, config)
}

// delete 请求
export const del = <T = any>(url: string, config?: AxiosRequestConfig) => {
    return service.delete<T>(url, config)
}

// put 请求
export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return service.put<T>(url, data, config)
}