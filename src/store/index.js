import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import pageHeader from './modules/pageHeader'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app,
    pageHeader,
    user,
    permission
  }
})
