import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: '', // 用户信息
    isLogin: false // 登陆状态
  },
  mutations: {
    // 存储用户信息
    getUserInfo (state, value) {
      state.userInfo = value
    },
    // 存储登陆状态信息
    getStatus (state, value) {
      state.isLogin = value
    }
  },
  actions: {},
  modules: {}
})
