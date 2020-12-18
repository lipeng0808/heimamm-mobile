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

export { technic, chartDataHot, articleShare }
