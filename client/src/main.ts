import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VeeValidate from 'vee-validate';
import 'izitoast/dist/css/iziToast.min.css';

var VueIziToast = require('vue-izitoast')
var VueCookie = require('vue-cookie');
var VueMoment = require('vue-moment')

Vue.use(VueIziToast);
Vue.use(VeeValidate);
Vue.use(VueMoment);
Vue.use(VueCookie);

Vue.config.productionTip = false;

new Vue({
  router: router,
  render: h => h(App)
}).$mount("#app");