// 导入axios副本
import _fetch from './request'
// 获取用户信息
function auInfo () {
  return _fetch({
    url: '/au/info',
    method: 'get',
    needToken: true
  })
}

// 将方法导出
export { auInfo }
