import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from './plugins/axios';
import '@babel/polyfill';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
