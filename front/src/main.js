import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue';
import app from './App.vue';

import router from './router';
import VueQRCodeComponent from 'vue-qrcode-component';
import VueQrcodeReader from "vue-qrcode-reader";

Vue.component('qr-code', VueQRCodeComponent);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueQrcodeReader);

new Vue({
  render: (h) => h(app),
  router,
}).$mount('#app');