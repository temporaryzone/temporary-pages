import Vue from 'vue'
import App from './App.vue'
import VueLazyload from "vue-lazyload";
import VueBus from 'vue-bus';

Vue.use(VueLazyload);
Vue.use(VueBus);

window.pages = {};

window.pages.vm = new Vue({
  el: '#app',
  render: h => h(App)
});

