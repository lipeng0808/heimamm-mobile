import _fetch from './request'
// 面试技巧数据
function technic (params) {
  return _fetch({
    url: '/articles/technic',
    method: 'get',
    params
  })
}

// 获取热门职业数据
function chartDataHot () {
  return _fetch({
    url: '/chart-data/hot'
  })
}
// 面经分享数据
function articleShare (params) {
  return _fetch({
    url: '/articles/share',
    params
  })
}

export { technic, chartDataHot, articleShare }
