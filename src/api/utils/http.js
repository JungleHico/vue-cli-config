import axios from 'axios'
import devAPI from './baseURL'

const http = axios.create({
  baseURL: devAPI,
  timeout: 6000
})

// 请求拦截
http.interceptors.request.use(
  config => {
    // 请求头携带Token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截
http.interceptors.response.use(
  response => Promise.resolve(response),
  error => {
    // 请求错误统一处理
    if (error.response) {
      switch (error.response.status) {
        // TODO Notification 组件提示
        case 401:
          console.log('登录过期，请重新登录')
          // 重新加载当前页（结合路由守卫，可以重定向到登录页）
          window.location.reload()
          break
        case 403:
          console.log('拒绝访问')
          break
        case 404:
          console.log('请求不存在')
          break
        case 500:
          console.log('服务器错误')
          break
        default:
          console.log(error.response.data.message)
          break
      }
    }
    return Promise.reject(error)
  }
)

// 封装 get 请求
export function get (url, params = {}, config = {}) {
  return http({
    url,
    method: 'GET',
    params,
    ...config
  })
}

// 封装 post 请求
export function post (url, data = {}, config = {}) {
  return http({
    url,
    method: 'POST',
    data,
    ...config
  })
}
