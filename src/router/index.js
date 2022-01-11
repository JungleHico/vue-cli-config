import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import BasicLayout from '@/layouts/BasicLayout'
import RouteView from '@/layouts/RouteView'

Vue.use(VueRouter)

// hack router push callback（避免vue-router跳转到相同页面报错）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

// 通用路由表
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  }
]

// 动态路由表
export const asyncRouterMap = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home'),
        meta: { title: '首页', icon: 'home' }
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/User'),
        meta: { title: '用户管理', icon: 'user', roles: ['operator'] }
      },
      {
        path: '/system',
        meta: { title: '系统管理', icon: 'setting', roles: ['admin'] },
        component: RouteView,
        children: [
          {
            path: '/system/role',
            name: 'SystemRole',
            component: () => import('@/views/system/SystemRole'),
            meta: { title: '角色管理' }
          },
          {
            path: '/system/menu',
            name: 'SystemMenu',
            component: () => import('@/views/system/SystemMenu'),
            meta: { title: '菜单管理' }
          }
        ]
      }
    ]
  },
  {
    path: '/*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

// 免登录白名单
const whiteList = ['/login', '/404']

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     next()
//   } else {
//     if (whiteList.includes(to.path)) {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })

// 路由守卫，登录拦截
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (store.state.user.roles.length) {
        // vuex 可以获取到用户信息，说明 token 有效
        next()
      } else {
        // 刷新页面，或者关闭页面后重新打开，vuex 失效，则重新获取
        store.dispatch('GetInfo')
          .then(() => {
            // 动态分发路由
            const roles = store.state.user.roles
            store.dispatch('GenerateRoutes', roles).then(() => {
              router.addRoutes(store.state.permission.addRouters)
              // hack 方法，确保 addRoutes 已完成
              next({ ...to, replace: true })
            })
          })
          .catch(() => {
            // 获取失败，重新登录
            Notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            store.dispatch('Logout').then(() => {
              next('/login')
            })
          })
      }
    }
  } else {
    // 无 token
    if (whiteList.includes(to.path)) {
      // 免登录白名单，不需要登录
      next()
    } else {
      // 跳转到登录页
      next('/login')
    }
  }
})

export default router
