import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { getLocal } from '@/utils/local.js'
import { auInfo } from '@/api/user.js'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/login/login.vue') },
  {
    path: '/home',
    component: () => import('@/views/home/home.vue'),
    redirect: '/home/user',
    children: [
      {
        path: '/home/company',
        component: () => import('@/views/home/company/company.vue')
      },
      {
        path: '/home/found',
        component: () => import('@/views/home/found/found.vue')
      },
      {
        path: '/home/question',
        component: () => import('@/views/home/question/question.vue'),
        meta: {
          needLogin: true
        }
      },
      {
        path: '/home/user',
        component: () => import('@/views/home/user/user.vue'),
        meta: {
          needLogin: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 导航守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.needLogin) {
    next()
  } else {
    // store === this.$store
    if (store.state.isLogin) {
      next()
    } else {
      if (!getLocal('token')) {
        next('/login')
      } else {
        auInfo().then(res => {
          window.console.log('导航守卫获取用户信息:', res)
          // 存储用户信息
          store.commit('setUserInfo', res.data)
          // 设置登陆状态为true
          store.commit('setStatus', true)
          next()
        })
      }
    }
  }
})

export default router
