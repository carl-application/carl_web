import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import business from './modules/business'
import settings from './modules/settings'
import affiliations from './modules/affiliations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    business,
    settings,
    affiliations
  },
  strict: debug
})
