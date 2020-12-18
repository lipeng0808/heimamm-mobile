// 导入axios副本
import _ajax from './request'
// 获取用户信息
function auInfo () {
  return _ajax({
    url: '/au/info',
    method: 'get',
    needToken: true
  })
}

// 编辑用户信息
function auEdit (data) {
  return _ajax({
    url: '/au/edit',
    method: 'post',
    needToken: true,
    data
  })
}
// 上传文件
function upload (data) {
  return _ajax({
    url: '/upload',
    method: 'post',
    needToken: true,
    data
  })
}

// 将方法导出
export { auInfo, auEdit, upload }
