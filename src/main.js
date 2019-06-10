// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faPlus, faMinus, faArrowCircleDown, faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import VModal from 'vue-js-modal'
import Notifications from 'vue-notification'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.PLACES_API_KEY,
    libraries: 'places'
  }
})

library.add(faPlus, faMinus, faArrowCircleDown, faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VModal)
Vue.use(Notifications)
Vue.config.productionTip = false
axios.defaults.headers.common['Authorization'] = 'Basic Y29tLmNhcmwucG9zdG1hbjpiYWJ5YmVs'
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'

if (localStorage.getItem('user-token')) {
  const accessToken = localStorage.getItem('user-token')
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
