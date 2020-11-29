import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import store from "./stores/store";
import zds from '@zoov/design-system';

import * as components from '@zoov/design-system/src/components'

Vue.use(zds, { components });
  
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCAHJD1RQ4stshwWms5a8QQ6RdgxcDHs5s',
    libraries: 'places', 
  },
})

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
