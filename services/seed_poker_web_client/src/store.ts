import Vue from 'vue';
import Vuex from 'vuex';
import actions from './vuex/actions';
import state from './vuex/state';
import mutations from './vuex/mutations';
import getters from './vuex/getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
});
