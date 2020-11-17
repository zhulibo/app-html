const state = {
  isLoading: false
};

const getters = {
  isLoading: state => state.isLoading,
}

const mutations = {
  updateLoadingState(state, flag) {
    state.isLoading = flag
  },
}

const actions = {
  onLoading({commit}, flag) {
    return new Promise(resolve => {
      // console.log(flag, 'flag')
      commit('updateLoadingState', flag)
      resolve()
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
