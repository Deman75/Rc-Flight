import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import storeObject from './store/index.js'

export function createStore() {

  const store = new Vuex.Store(storeObject);

  return {store};

}
