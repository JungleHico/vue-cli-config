// 路由权限管理
import { constantRouterMap, asyncRouterMap } from '@/router/index'

// 判断用户是否拥有当前页面的权限
function hasPermission (route, roles) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.includes(role))
  }
  return true
}

// 根据权限过滤，获取动态路由表
function filterAsyncRouters (routerMap, roles) {
  let accessedRouters = routerMap.filter(route => {
    // 超级管理员，返回全部路由
    if (roles.includes('admin')) {
      return true
    }
    // 用户有权限
    if (hasPermission(route, roles)) {
      // 处理子路由
      if (route.children && route.children.length) {
        route.children = filterAsyncRouters(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS (state, routers) {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, roles) {
      return new Promise(resolve => {
        // 根据role权限做筛选
        const accessedRouters = filterAsyncRouters(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        // TODO Vuex user中应该管理roles(Array)状态，此处略
        commit('SET_USER_ROLES', roles)
        resolve()
      })
    }
  }
}

export default permission
