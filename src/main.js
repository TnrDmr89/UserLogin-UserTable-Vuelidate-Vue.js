import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import { router } from './routes'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
