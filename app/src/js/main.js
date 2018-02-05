import Vue from 'vue'
import App from './App.vue'

Vue.use(VueLazyload);

var vm = new Vue({
  el: '#app',
  render: h => h(App)
});