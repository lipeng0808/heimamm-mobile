// 存储token
function setLocal (key, value) {
  localStorage.setItem(key, value)
}
// 获取token
function getLocal (key) {
  return localStorage.getItem(key)
}

// 删除token
function rmLocal (key) {
  localStorage.removeItem(key)
}
// 导出
export { setLocal, getLocal, rmLocal }
