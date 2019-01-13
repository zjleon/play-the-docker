import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './side-effects/websocket';
import './side-effects/precache';
import './registerServiceWorker';
// @ts-ignore
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import theme from './assets/theme';

Vue.use(Vuetify, {
  theme,
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
