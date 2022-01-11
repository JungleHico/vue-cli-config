const pageHeader = {
  state: {
    visitedRoutes: [] // 页头导航tabs
  },
  getters: {
    // 缓存组件
    cachedViews (state) {
      return state.visitedRoutes
        .filter(route => {
          if (route.meta?.noKeepAlive) {
            return false
          }
          return true
        })
        .map(route => route.name)
    }
  },
  mutations: {
    ADD_VISITED_ROUTES (state, route) {
      const index = state.visitedRoutes
        .findIndex(visitedRoute => visitedRoute.fullPath === route.fullPath)
      if (index < 0) {
        state.visitedRoutes.push(route)
      }
    },
    DEL_VISITED_ROUTES_BY_PATH (state, fullPath) {
      const index = state.visitedRoutes
        .findIndex(visitedRoute => visitedRoute.fullPath === fullPath)
      if (index >= 0) {
        state.visitedRoutes.splice(index, 1)
      }
    },
    SET_VISITED_ROUTES (state, visitedRoutes) {
      state.visitedRoutes = visitedRoutes
    }
  },
  actions: {
    AddVisitedRoutes ({ commit }, route) {
      commit('ADD_VISITED_ROUTES', route)
    },
    DelVisitedRoutesByPath ({ commit }, fullPath) {
      commit('DEL_VISITED_ROUTES_BY_PATH', fullPath)
    },
    SetVisitedRoutes ({ commit }, visitedRoutes) {
      commit('SET_VISITED_ROUTES', visitedRoutes)
    }
  }
}

export default pageHeader
