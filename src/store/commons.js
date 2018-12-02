const commons = {
  namespaced: true,
  state: {
    touchDevice: false,
    footerHeight: 0
  },
  mutations: {
    newDeviceType (state, newType) {
      state.touchDevice = newType;
    },
    newFooterHeight (state, height) {
      state.footerHeight = height;
    }
  },
  actions: {
    deviceIsTouch ({commit}, type) {
      commit('newDeviceType', type)
    },
    changeFooterHeight ( {commit}, height ) {
      commit('newFooterHeight', height)
    }
  }
}
export default commons
