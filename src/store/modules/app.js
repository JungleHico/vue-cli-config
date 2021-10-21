const app = {
  state: {
    // 侧边栏是否收起
    collapsed: sessionStorage.getItem('collapsed')
      ? JSON.parse(sessionStorage.getItem('collapsed'))
      : false
  },
  mutations: {
    SET_COLLAPSED (state, collapsed) {
      sessionStorage.setItem('collapsed', collapsed)
      state.collapsed = collapsed
    }
  },
  actions: {
    SetCollapsed ({ commit }, collapsed) {
      commit('SET_COLLAPSED', collapsed)
    }
  }
}

export default app
