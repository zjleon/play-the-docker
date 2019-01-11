import Vue from 'vue';
import Vuex from 'vuex';
import actions from './vuex/actions';
import state from './vuex/state';
import mutations from './vuex/mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
});
