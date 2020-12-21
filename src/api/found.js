import _ajax from './request'
// import axios from 'axios'
// let _cancel = ''
// 面试技巧数据
function technic (params) {
  return _ajax({
    url: '/articles/technic',
    method: 'get',
    params
  })
}

// 获取热门职业数据
function chartDataHot () {
  return _ajax({
    url: '/chart-data/hot'
  })
}
// 面经分享数据
function articleShare (params) {
  // 设置每次接口调用前,取消上一次的调用
  // try {
  //   _cancel()
  // } catch {}
  return _ajax({
    url: '/articles/share',
    params
    // cancelToken: new axios.CancelToken(cancel => {
    //   // cancel: 取消接口方法
    //   _cancel = cancel
    // })
  })
}
// 面经热搜
function shareTopSearch () {
  return _ajax({
    url: '/articles/shareTopSearch'
  })
}
// 面经详情
function articlesShareId (id) {
  return _ajax({
    url: '/articles/share/' + id
  })
}
// 面经评论
function articlesCommentsId (id, params) {
  return _ajax({
    url: '/articles/comments/' + id,
    params
  })
}
// 发表评论
function articlesComments (data) {
  return _ajax({
    url: '/articles/comments',
    method: 'post',
    needToken: true,
    data
  })
}
export {
  technic,
  chartDataHot,
  articleShare,
  shareTopSearch,
  articlesShareId,
  articlesCommentsId,
  articlesComments
}
