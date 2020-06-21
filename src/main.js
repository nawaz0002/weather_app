import Vue from 'vue'
window.Vue = Vue;
import App from './App.vue'

Vue.config.productionTip = false

new window.Vue({
  render: h => h(App),
}).$mount('#app')
