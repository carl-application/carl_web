import {REQUEST_AFFILIATIONS, TOGGLE_AFFILIATION, UPDATE_AFFILIATIONS} from '../actions/affiliations'

import {
  REQUEST_AFFILIATIONS_ERROR,
  REQUEST_AFFILIATIONS_LOADING,
  REQUEST_AFFILIATIONS_SUCCESS
} from '../status/affiliations'

import {getAffiliations} from '../../utils/api'

const state = {
  affiliations: null,
  selectedAffiliationsIds: null,
  status: '',
  loadedOnce: false
}

const getters = {
  storedAffiliations: state => state.affiliations,
  selectedAffiliations: state => state.selectedAffiliationsIds,
  hasLoadedOnce: state => state.loadedOnce
}

const actions = {
  [REQUEST_AFFILIATIONS]: ({commit, dispatch}, isPremium) => {
    return new Promise(async (resolve, reject) => {
      commit(REQUEST_AFFILIATIONS)
      if (!isPremium) {
        commit(REQUEST_AFFILIATIONS_SUCCESS, [])
        resolve([])
      } else {
        try {
          const response = await getAffiliations()
          commit(REQUEST_AFFILIATIONS_SUCCESS, response.data)
          resolve(response.data)
        } catch (error) {
          commit(REQUEST_AFFILIATIONS_ERROR, error)
        }
      }
    })
  },
  [UPDATE_AFFILIATIONS]: ({commit, dispatch}, newAffiliations) => {
    return new Promise(async (resolve, reject) => {
      commit(UPDATE_AFFILIATIONS, newAffiliations)
      resolve()
    })
  },
  [TOGGLE_AFFILIATION]: ({commit, dispatch}, affiliationID) => {
    return new Promise(async (resolve, reject) => {
      commit(TOGGLE_AFFILIATION, affiliationID)
      resolve()
    })
  }
}

const mutations = {
  [TOGGLE_AFFILIATION]: (state, affiliationID) => {
    const temp = state.selectedAffiliationsIds
    if (temp.includes(affiliationID)) {
      const index = temp.indexOf(affiliationID)
      temp.splice(index, 1)
    } else {
      temp.push(affiliationID)
    }
    state.selectedAffiliationsIds = temp
  },
  [UPDATE_AFFILIATIONS]: (state, affiliations) => {
    state.affiliations = affiliations
    affiliations.map((aff) => state.selectedAffiliationsIds.push(aff.id))
  },
  [REQUEST_AFFILIATIONS]: (state) => {
    state.status = REQUEST_AFFILIATIONS_LOADING
  },
  [REQUEST_AFFILIATIONS_SUCCESS]: (state, affiliations) => {
    state.status = REQUEST_AFFILIATIONS_SUCCESS
    state.affiliations = affiliations
    state.selectedAffiliationsIds = []
    affiliations.map((aff) => state.selectedAffiliationsIds.push(aff.id))
    state.loadedOnce = true
  },
  [REQUEST_AFFILIATIONS_ERROR]: (state) => {
    state.status = REQUEST_AFFILIATIONS_ERROR
    state.affiliations = []
    state.selectedAffiliationsIds = []
    state.loadedOnce = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
