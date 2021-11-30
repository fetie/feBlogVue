import { AxiosRequestConfig } from "axios";
import service from './axios'
import { ElMessage } from 'element-plus'
// import store from '@/store'

export interface BaseResponse<T> {
  code: number
  result: T
  msg?: string
}

const request = <T>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
  return new Promise((resolve, reject) => {
    service.request<BaseResponse<T>>(config).then(
      res => {
        resolve(res.data)
      },
      err => {
        switch (err?.code) {
          case 401:
            // token失效
            ElMessage.warning('您还未登录或登录已过期，请重新登录')
            break
          default:
            ElMessage.warning(err.msg)
            break
        }
        reject(err)
      }
    )
  })
}

export default request
