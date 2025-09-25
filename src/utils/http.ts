// HttpService.ts
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import service from '@/utils/request'

class HttpService {
  private static axiosInstance: AxiosInstance = service

  public static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get<any, T>(url, config)
  }

  public static async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.post<any, T>(url, data, config)
  }

  public static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.delete<any, T>(url, config)
  }

  public static async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.put<any, T>(url, data, config)
  }
}

export default HttpService
