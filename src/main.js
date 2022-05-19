import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import Auth from './Entity/Auth';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false;

Vue.prototype.$userLogged = Auth;

// 5
Vue.use(VueApollo)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
})