import { login, getLoginInfo } from '@/api/user'

const user = {
  state: {
    loginInfo: null
  },
  mutations: {
    SET_LOGIN_INFO (state, loginInfo) {
      state.loginInfo = loginInfo
    }
  },
  actions: {
    // 封装登录接口
    async Login ({ commit }, account) {
      try {
        // TODO 登陆接口
        const res = await login(account)
        if (res.data.data && res.data.data.token) {
          const token = res.data.data.token
          // 缓存token
          localStorage.setItem('token', `Bearer ${token}`)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 获取用户基本信息（判断token是否过期）
    async GetLoginInfo ({ commit }) {
      try {
        const res = await getLoginInfo()
        console.log(res)
        const loginInfo = res.data.data
        if (loginInfo) {
          commit('SET_LOGIN_INFO', loginInfo)
        }
        return res
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 退出登录
    async Logout ({ commit }) {
      // TODO 退出登录接口
      localStorage.removeItem('token')
      commit('SET_LOGIN_INFO', null)
    }
  }
}

export default user
