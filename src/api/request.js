// 导入axios
import axios from 'axios'
import { Toast } from 'vant'
import { rmLocal, getLocal } from '@/utils/local.js'
import store from '@/store'
import router from '@/router'

// 使用axios的create()方法
const _fetch = axios.create({
  // baseURL: 'http://localhost:1337'
  baseURL: process.env.VUE_APP_URL
})

// 创建一个数组,接收中断请求的cancel方法
let cancelArr = []
// 给window中注册一个中断请求的方法
window.cancelAxios = function (url = '', cancelAll = false) {
  cancelArr = cancelArr.filter(item => {
    if (cancelAll) {
      item.c()
      return false
    } else {
      if (item.url === url) {
        item.c()
        return false
      } else {
        return true
      }
    }
  })
}

// 请求拦截
_fetch.interceptors.request.use(
  function (config) {
    // 判断是否请求是否需要token
    // 给需要token的,请求头加上authorization,不需要的就别加
    if (config.needToken) {
      config.headers.authorization = `Bearer ${getLocal()}`
    }

    // 调用中断请求方法
    window.cancelAxios(config.url)
    // 调用axios中的cancel方法,中断上一次同接口的请求
    config.cancelToken = new axios.CancelToken(cancel => {
      cancelArr.push({
        url: config.url,
        c: cancel
      })
    })
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
/* token异常处理步骤: 后台返回401 403状态码
      提示错误
      删除token
      修改登录状态信息
      跳转到登录页
      终止.then的执行
*/
// 响应拦截
_fetch.interceptors.response.use(
  function (res) {
    if (res.data.code === 200) {
      // Toast.fail(res.data.message)
      return res.data
    } else if (res.data.code === 401 || res.data.code === 403) {
      // 提示错误
      Toast.fail(res.data.message)
      // 删除token
      rmLocal()
      // 修改vuex中的登录状态
      store.commit('setStatus', false)
      // 跳转到登录页
      router.push('/login')
      // 终止.then执行
      return Promise.reject(new Error(res.data.message))
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
// 二次封装axios
function _ajax (obj) {
  return new Promise((resolve, reject) => {
    _fetch(obj)
      .then(res => {
        return resolve(res)
      })
      .catch(err => {
        console.log(err)
        // reject(err)
      })
  })
}
// 导出
export default _ajax
