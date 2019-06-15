import {
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from '../actions/auth'
import {addImage, addLogo, addTags, login, register} from '../../utils/api'
import {
  AUTH_STATUS_ERROR_CREDENTIALS,
  AUTH_STATUS_INITIAL,
  AUTH_STATUS_LOADING,
  AUTH_STATUS_SUCCESS,
  REGISTER_STATUS_ERROR_CREDENTIALS,
  REGISTER_STATUS_LOADING,
  REGISTER_STATUS_SUCCESS
} from '../status/auth'
import axios from 'axios'

const state = {
  token: localStorage.getItem('user-token') || '',
  status: AUTH_STATUS_INITIAL,
  hasLoadedOnce: false
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise(async (resolve, reject) => {
      commit(AUTH_REQUEST)
      try {
        const responseData = await login(user.username, user.password)
        const accessToken = responseData['access_token']
        localStorage.setItem('user-token', accessToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        commit(AUTH_SUCCESS, accessToken)
        resolve(responseData)
      } catch (error) {
        commit(AUTH_ERROR, error)
        localStorage.removeItem('user-token')
        reject(error)
      }
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      axios.defaults.headers.common['Authorization'] = 'Basic Y29tLmNhcmwucG9zdG1hbjpiYWJ5YmVs'
      resolve()
    })
  },
  [REGISTER_REQUEST]: ({commit, dispatch}, registrationData) => {
    return new Promise(async (resolve, reject) => {
      commit(REGISTER_REQUEST)
      try {
        const registerResponse = await register(
          registrationData.email,
          registrationData.password,
          registrationData.name,
          registrationData.address,
          parseInt(registrationData.nbPoints),
          registrationData.description)

        const accessToken = registerResponse.data['authorization']['access_token']
        localStorage.setItem('user-token', accessToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

        await addImage(registrationData.selectedImage.id)
        await addLogo(registrationData.selectedLogo.id)
        const tagsToSend = []
        registrationData.tags.forEach((tag) => {
          tagsToSend.push({
            'name': tag
          })
        })
        await addTags(tagsToSend)
        commit(REGISTER_SUCCESS, accessToken)
        resolve()
      } catch (error) {
        commit(REGISTER_ERROR, error)
        reject(error)
      }
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = AUTH_STATUS_LOADING
  },
  [REGISTER_REQUEST]: (state) => {
    state.status = REGISTER_STATUS_LOADING
  },
  [AUTH_SUCCESS]: (state, accessToken) => {
    state.status = AUTH_STATUS_SUCCESS
    state.token = accessToken
    state.hasLoadedOnce = true
  },
  [REGISTER_SUCCESS]: (state, accessToken) => {
    state.status = REGISTER_STATUS_SUCCESS
    state.token = accessToken
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = AUTH_STATUS_ERROR_CREDENTIALS
    state.hasLoadedOnce = true
  },
  [REGISTER_ERROR]: (state) => {
    state.status = REGISTER_STATUS_ERROR_CREDENTIALS
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
