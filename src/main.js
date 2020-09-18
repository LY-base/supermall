import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() // 添加事件总线，监听scroll的滑动问题

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
