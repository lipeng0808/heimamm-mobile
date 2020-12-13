const key = 'token'

// 存储token
// function setLocal (key, value) {
//   localStorage.setItem(key, value)
// }
const setLocal = token => {
  localStorage.setItem(key, token)
}

// 获取token
// function getLocal (key) {
//   return localStorage.getItem(key)
// }
const getLocal = () => {
  return localStorage.getItem(key)
}

// 删除token
// function rmLocal (key) {
//   localStorage.removeItem(key)
// }
const rmLocal = () => {
  localStorage.removeItem(key)
}
// 导出
export { setLocal, getLocal, rmLocal }
