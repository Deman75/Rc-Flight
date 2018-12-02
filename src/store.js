import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    touchDevice: false,
  },
  mutations: {
    newDeviceType (state, newType) {
      state.touchDevice = newType;
      console.log(newType);
    }
  },
  actions: {
    deviceIsTouch ({commit}, type) {
      commit('newDeviceType', type)
    }
  }
});
