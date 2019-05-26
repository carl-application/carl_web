import {AUTH_ERROR, AUTH_LOGOUT, AUTH_REQUEST, AUTH_SUCCESS} from '../actions/auth'
import apiCall from '../../utils/api'
import {AUTH_STATUS_ERROR, AUTH_STATUS_INITIAL, AUTH_STATUS_LOADING, AUTH_STATUS_SUCCESS} from '../status/auth'
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
      apiCall({url: 'auth', data: user, method: 'POST'})
        .then(resp => {
          localStorage.setItem('user-token', resp.token)
          axios.defaults.headers.common['Authorization'] = resp.token
          commit(AUTH_SUCCESS, resp)
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
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = AUTH_STATUS_LOADING
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = AUTH_STATUS_SUCCESS
    state.token = resp.token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = AUTH_STATUS_ERROR
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
