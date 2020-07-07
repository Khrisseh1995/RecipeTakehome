import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
Vue.config.productionTip = false
import VueMq from 'vue-mq'
Vue.use(VueMq, {
  breakpoints: {
    sm: 800,
    md: 1250,
    lg: Infinity,
  }
})
new Vue({
  store,
  router,  
  render: h => h(App),
}).$mount('#app')
