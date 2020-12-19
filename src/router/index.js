import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { getLocal } from '@/utils/local'
import { auInfo } from '@/api/user'

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
        component: () => import('@/views/home/company/company.vue'),
        meta: {
          needTab: true
        }
      },
      {
        path: '/home/found',
        component: () => import('@/views/home/found/found.vue'),
        meta: {
          needTab: true
        }
      },
      {
        path: '/home/shareList',
        component: () => import('@/views/home/found/shareList.vue'),
        meta: {}
        // alias: '/home/shareList' // 只是定义一个路由别名,名字不同
      },
      {
        path: '/home/shareInfo/:id?',
        component: () => import('@/views/home/found/shareInfo.vue'),
        meta: {}
      },
      {
        path: '/home/question',
        component: () => import('@/views/home/question/question.vue'),
        meta: {
          needLogin: true,
          needTab: true
        }
      },
      {
        path: '/home/user',
        component: () => import('@/views/home/user/user.vue'),
        meta: {
          needLogin: true,
          needTab: true
        }
      },
      {
        path: '/home/myInfo',
        component: () => import('@/views/home/user/myInfo.vue'),
        meta: {
          needLogin: true
        }
      },
      {
        path: '/home/editInfo',
        component: () => import('@/views/home/user/editInfo.vue'),
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
// 前置导航守卫

router.beforeEach((to, from, next) => {
  // 页面切换时,取消所有接口调用
  window.cancelAxios('', true)
  // 判断是否需要登录,在路由元设置一个参数needLogin判断
  if (!to.meta.needLogin) {
    // 不需要登录的页面,直接通过
    next()
  } else {
    // 需要登录的页面,判断是否已经登录,如果已经登录,直接通过
    if (store.state.isLogin) {
      next()
    } else {
      // 如果没有登录,判断是否有token,如果存在token
      if (getLocal('token')) {
        // 获取用户信息
        auInfo()
          .then(res => {
            // 保存用户信息到vuex
            store.commit('setUserInfo', res.data)
            // 保存登录状态
            store.commit('setStatus', true)
            // 通过
            next()
          })
          .catch(() => {})
      } else {
        // 设置从哪里来,登录后回到那里去
        // 通过路由传参
        next('/login?redirect=' + to.fullPath)
      }
    }
  }
})

// 路由跳转时的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
