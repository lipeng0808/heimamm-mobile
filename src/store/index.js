import Vue from 'vue'
import Vuex from 'vuex'
import { auInfo } from '@/api/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: '', // 用户信息
    isLogin: false // 登陆状态
  },
  mutations: {
    // 存储用户信息
    setUserInfo (state, value) {
      state.userInfo = value
    },
    // 存储登陆状态信息
    setStatus (state, value) {
      state.isLogin = value
    }
  },
  actions: {
    // 更新用户信息
    revise (store) {
      auInfo()
        .then(res => {
          store.commit('setUserInfo', res.data)
          store.commit('setStatus', true)
        })
        .catch(() => {})
    }
  },
  // vuex中的计算属性
  // 应用场景: 监听(state)一个或多个的变化
  getters: {
    gettersStar (state) {
      return (fn, id) => {
        return state.userInfo[fn] && state.userInfo[fn].includes(id)
      }
    }
  },
  modules: {}
})
export default store
