import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

Vue.config.productionTip = false

//Vue实例用做事件总线
Vue.prototype.$bus=new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
