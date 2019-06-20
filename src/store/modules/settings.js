import {REQUEST_SETTINGS} from '../actions/settings'
import {adminGetSettings} from '../../utils/api'
import {REQUEST_SETTINGS_ERROR, REQUEST_SETTINGS_LOADING, REQUEST_SETTINGS_SUCCESS} from '../status/settings'

const state = {
  settings: null,
  status: ''
}

const getters = {
  premiumCost: state => state.settings ? state.settings.premiumCost : 0,
  nbFreeNotificationsPerMonth: state => state.settings ? state.settings.nbFreeNotificationsPerMonth : 0
}

const actions = {
  [REQUEST_SETTINGS]: ({commit, dispatch}) => {
    return new Promise(async (resolve, reject) => {
      commit(REQUEST_SETTINGS)
      try {
        const response = await adminGetSettings()
        commit(REQUEST_SETTINGS_SUCCESS, response.data)
        resolve(response.data)
      } catch (error) {
        commit(REQUEST_SETTINGS_ERROR, error)
        reject(error)
      }
    })
  }
}

const mutations = {
  [REQUEST_SETTINGS]: (state) => {
    state.status = REQUEST_SETTINGS_LOADING
  },
  [REQUEST_SETTINGS_SUCCESS]: (state, settings) => {
    state.status = REQUEST_SETTINGS_SUCCESS
    state.settings = settings
  },
  [REQUEST_SETTINGS_ERROR]: (state) => {
    state.status = REQUEST_SETTINGS_ERROR
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
