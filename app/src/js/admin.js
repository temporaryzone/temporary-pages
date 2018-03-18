import Vue from 'vue'
import App from './Admin.vue'
import VueLazyload from "vue-lazyload";
import VueBus from 'vue-bus';

Vue.use(VueLazyload);
Vue.use(VueBus);

window.pages = {};

window.pages.vm = new Vue({
  el: '#admin',
  render: h => h(App)
});

