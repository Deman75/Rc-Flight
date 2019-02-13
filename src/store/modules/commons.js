export default {
  namespaced: true,
  state: {
    touchDevice: false,
    footerHeight: 0,
    navHeight: 0,
  },
  mutations: {
    newDeviceType (state, newType) {
      state.touchDevice = newType;
    },
    newFooterHeight (state, height) {
      state.footerHeight = height;
    },
    newNavHeight (state, height) {
      state.navHeight = height;
    }
  },
  actions: {
    deviceIsTouch ({commit}, type) {
      commit('newDeviceType', type)
    },
    changeFooterHeight ( {commit}, height ) {
      commit('newFooterHeight', height)
    },
    changeNavHeight ( {commit}, height ) {
      commit('newNavHeight', height)
    }
  }
};
