import hmNavBar from '@/components/hmNavBar.vue'
import moment from 'moment'
export default {
  install: function (Vue) {
    // 注册一个公有组件
    Vue.component(hmNavBar.name, hmNavBar)
    // 在vue的原型中注册一个基地址
    Vue.prototype.$baseUrl = process.env.VUE_APP_URL
    // 注册全局过滤器
    // Vue.filter('过滤器名',function(参数){ return 值})
    Vue.filter('formaTime', function (str) {
      const a = moment()
      const b = moment(str)
      const _diff = a.diff(b, 'h')

      if (_diff <= 1) {
        return '刚刚'
      } else if (_diff < 24) {
        return _diff + '小时前'
      } else {
        return moment(str).format('YYYY/MM/DD HH:mm:ss')
      }
    })
  }
}
