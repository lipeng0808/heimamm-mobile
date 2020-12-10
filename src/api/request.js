// 导入axios
import axios from 'axios'
import { Toast } from 'vant'
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
  function (res) {
    if (res.data.code === 200) {
      Toast.fail(res.data.message)
      return res.data
    } else {
      Toast.fail(res.data.message)
      // 终止.then的执行,直接跳转到.catch执行,抛出错误
      return Promise.reject(new Error(res.data.message))
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 导出
export default _fetch
