import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { createProvider } from './vue-apollo'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3000'),
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  }),
)

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    this.$store.dispatch('tokenSearch')
  },
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app')
