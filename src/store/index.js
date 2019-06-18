import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import business from './modules/business'
import settings from './modules/settings'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    business,
    settings
  },
  strict: debug
})
