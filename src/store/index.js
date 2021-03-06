import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from './getters'
import login from './modules/login'
import loading from './modules/loading'

export default new Vuex.Store({
  getters,
  modules: {
    login,
    loading,
  }
})