import {AUTH_ERROR, AUTH_LOGOUT, AUTH_REQUEST, AUTH_SUCCESS} from '../actions/auth'
import {login} from '../../utils/api'
import {AUTH_STATUS_ERROR_CREDENTIALS, AUTH_STATUS_INITIAL, AUTH_STATUS_LOADING, AUTH_STATUS_SUCCESS} from '../status/auth'
import axios from 'axios'

const state = {token: localStorage.getItem('user-token') || '', status: AUTH_STATUS_INITIAL, hasLoadedOnce: false}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      login(user.username, user.password)
        .then(resp => {
          const accessToken = resp['access_token']
          localStorage.setItem('user-token', accessToken)
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
          commit(AUTH_SUCCESS, accessToken)
          resolve(resp)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('user-token')
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      axios.defaults.headers.common['Authorization'] = 'Basic Y29tLmNhcmwucG9zdG1hbjpiYWJ5YmVs'
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = AUTH_STATUS_LOADING
  },
  [AUTH_SUCCESS]: (state, accessToken) => {
    state.status = AUTH_STATUS_SUCCESS
    state.token = accessToken
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = AUTH_STATUS_ERROR_CREDENTIALS
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
