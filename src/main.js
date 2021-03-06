import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant
import Vant from 'vant'
// 导入rem适配
import 'amfe-flexible'
// 导入normalize.css,设置一些浏览器的css样式差异
import 'normalize.css'
// 导入字体图标iconfont
import '@/assets/iconfont/iconfont.css'
import '@/style/main.css'
// 导入vant样式
import 'vant/lib/index.css'
// 注册全局组件--头部导航栏: van-nav-bar
// import hmNavBar from '@/components/hmNavBar'
// Vue.component(hmNavBar.name, hmNavBar)
import comm from '@/utils/comm.js'
Vue.use(comm)
// 使用 vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // render: 渲染
  render: h => h(App)
}).$mount('#app')
