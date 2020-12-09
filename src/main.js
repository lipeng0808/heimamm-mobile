import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入rem适配
import 'amfe-flexible'
// 导入normalize.css,设置一些浏览器的css样式差异
import 'normalize.css'
// 导入字体图标iconfont
import '@/assets/iconfont/iconfont.css'
// 导入vant,vant的样式,
import Vant from 'vant'
import 'vant/lib/index.css'
// 使用 vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // render: 渲染
  render: h => h(App)
}).$mount('#app')
