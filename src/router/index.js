import Vue from 'vue'
import VueRouter from 'vue-router'

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
        component: () => import('@/views/home/question/question.vue')
      },
      {
        path: '/home/user',
        component: () => import('@/views/home/user/user.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
