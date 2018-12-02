import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import commons from './store/commons'

export default new Vuex.Store({
  modules: {
    commons
  }
});
