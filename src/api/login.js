// 导入axios副本
import _fetch from './request'

// 封装axios请求方法
// 获取验证码
function auCode (data) {
  return _fetch({
    url: '/au/code',
    method: 'post',
    data
  })
}
// 登陆请求
function auLogin (data) {
  return _fetch({
    url: '/au/login',
    method: 'post',
    data
  })
}
// 将方法导出
export { auCode, auLogin }
