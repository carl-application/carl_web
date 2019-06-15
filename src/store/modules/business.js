import {
  REQUEST_CURRENT_BUSINESS,
  REQUEST_CURRENT_BUSINESS_SUCCESS,
  REQUEST_CURRENT_BUSINESS_ERROR
} from '../actions/business'
import {getCurrentBusinessInfos} from '../../utils/api'
import {
  REQUEST_STATUS_CURRENT_BUSINESS_LOADING,
  REQUEST_STATUS_CURRENT_BUSINESS_SUCCESS,
  REQUEST_STATUS_CURRENT_BUSINESS_ERROR
} from '../status/business'

const state = {
  business: null,
  status: ''
}

const getters = {
  business: state => state.business,
  businessStatus: state => state.status,
  isAdmin: state => state.business.account.isAdmin
}

const actions = {
  [REQUEST_CURRENT_BUSINESS]: ({commit, dispatch}) => {
    return new Promise(async (resolve, reject) => {
      commit(REQUEST_CURRENT_BUSINESS)
      try {
        const response = await getCurrentBusinessInfos()
        commit(REQUEST_CURRENT_BUSINESS_SUCCESS, response.data)
        resolve(response.data)
      } catch (error) {
        commit(REQUEST_CURRENT_BUSINESS_ERROR, error)
        reject(error)
      }
    })
  }
}

const mutations = {
  [REQUEST_CURRENT_BUSINESS]: (state) => {
    state.status = REQUEST_STATUS_CURRENT_BUSINESS_LOADING
  },
  [REQUEST_CURRENT_BUSINESS_SUCCESS]: (state, currentBusiness) => {
    state.status = REQUEST_STATUS_CURRENT_BUSINESS_SUCCESS
    state.business = currentBusiness
  },
  [REQUEST_CURRENT_BUSINESS_ERROR]: (state) => {
    state.status = REQUEST_STATUS_CURRENT_BUSINESS_ERROR
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
