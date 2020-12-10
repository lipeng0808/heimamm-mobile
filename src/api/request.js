// 导入axios
import axios from 'axios'
// 使用axios的create()方法
const _fetch = axios.create({
  // baseURL: 'http://localhost:1337'
  baseURL: process.env.VUE_APP_URL
})

// 请求拦截
_fetch.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截
_fetch.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 导出
export default _fetch
