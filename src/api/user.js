// 导入axios副本
import _fetch from './request'
import { getLocal } from '@/utils/local.js'
// 获取用户信息
function auInfo () {
  return _fetch({
    url: '/au/info',
    method: 'get',
    headers: {
      authorization: `Bearer ${getLocal('token')}`
    }
  })
}

// 将方法导出
export { auInfo }
