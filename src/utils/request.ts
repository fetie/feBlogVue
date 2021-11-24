import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// import store from '@/store'

export interface ResponseData {
  code: number;
  data?: any;
  message: string;
}

// create an axios instance
let service: AxiosInstance | any;
service = axios.create({
    baseURL: '/api',
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // do something before request is sent

        // if (store.getters.token) {
        //     config.headers['X-Token'] = getToken()
        // }
        return config
    },
    (error: any) => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response: AxiosResponse) => {
        const res: ResponseData = response.data
        // store.commit('SET_LOADING',false);

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 200) {
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    (error: any) => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service
