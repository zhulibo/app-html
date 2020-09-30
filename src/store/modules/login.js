const state = {
  userInfo: {},
};

const getters = {
  userInfo: state => state.userInfo,
}

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
}

const actions = {
  updateUserInfo({commit}, userInfo) {
    return new Promise(resolve => {
      // console.log(userInfo)
      commit('setUserInfo', userInfo)
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
