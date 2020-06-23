import Vue from 'vue'
window.Vue = Vue;
import App from './App.vue'
import ChartKick from 'vue-chartkick';
import Chart from 'chart.js'

Vue.use(ChartKick.use(Chart))
Vue.config.productionTip = false

new window.Vue({
  render: h => h(App),
}).$mount('#app')
