import axios, { AxiosInstance } from 'axios'

// eslint-disable-next-line

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000
  // withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  config => {
        // do something before request is sent

        // if (store.getters.token) {
        //     config.headers['X-Token'] = getToken()
        // }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      return Promise.reject(res)
    } else {
      return response
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
