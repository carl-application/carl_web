// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faPlus, faMinus, faArrowCircleDown, faTimes, faUserShield, faBell, faChartBar, faPen} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import VModal from 'vue-js-modal'
import Notifications from 'vue-notification'
import * as VueGoogleMaps from 'vue2-google-maps'

console.log(`NODE_ENV ${JSON.stringify(process.env.NODE_ENV)}`)
console.log(`SLEEPY ${JSON.stringify(process.env.PLACES_API_KEY)}`)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.PLACES_API_KEY,
    libraries: 'places'
  }
})

library.add(faPlus, faMinus, faArrowCircleDown, faTimes, faUserShield, faBell, faChartBar, faPen)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VModal, { dialog: true })
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
