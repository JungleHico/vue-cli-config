import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import BasicLayout from '../layouts/BasicLayout'

Vue.use(Router)

// hack router push callback（避免某些版本的vue-router跳转到相同页面报错）
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('../views/Home')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  },
  {
    path: '/*',
    redirect: '/404'
  }
]

const router = new Router({
  mode: 'history',
  routes
})

// 路由守卫，登录拦截
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    if (store.state.user.loginInfo) {
      // vuex 可以获取到登录状态，说明 token 有效
      next()
    } else {
      // 刷新页面，或者关闭页面后重新打开，vuex 失效，则重新获取
      store.dispatch('GetLoginInfo')
        .then(res => {
        // 可以获取到登录状态，说明 token 仍然有效
          next()
        })
        .catch(error => {
        // 获取失败，重新登录
          console.log(error)
          store.dispatch('Logout').then(() => {
            next('/login')
          })
        })
    }
  } else {
    // 没有 token（未登录/已经退出登录），跳转到登录页
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

export default router
