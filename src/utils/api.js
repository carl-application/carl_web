import axios from 'axios'
import {
  API_ADD_IMAGE_URL,
  API_ADD_LOGO_URL,
  API_ADD_TAGS_URL,
  API_ADMIN_CREATE_IMAGE,
  API_ADMIN_DELETE_IMAGE,
  API_ADMIN_GET_SETTINGS,
  API_CHANGE_PASSSWORD,
  API_CREATE_CAMPAIGN,
  API_DELETE_BUSINESS,
  API_GET_AFFILIATIONS,
  API_GET_AGES_REPARTITION,
  API_GET_ALL_IMAGES,
  API_GET_ALL_LOGOS,
  API_GET_CAMPAIGNS,
  API_GET_CURRENT_BUSINESS_INFOS,
  API_GET_TOTAL_CUSTOMERS_COUNT_URL,
  API_GET_VISITS_COUNT_ON_LAST_MONTHS,
  API_GET_VISITS_COUNT_URL,
  API_LOGIN_URL,
  API_PUT_CURRENT_BUSINESS_DATA,
  API_REGISTER_URL,
  API_SEND_AFFILIATION_KEY,
  API_SEND_NOTIFICATION,
  API_ADMIN_SEND_NOTIFICATION,
  API_SEX_PARITY_COUNT_URL,
  API_SUSCRIBE_TO_PREMIUM
} from './api-routes'

const login = (username, password) => new Promise((resolve, reject) => {
  axios.post(API_LOGIN_URL, `username=${username}&password=${password}&grant_type=password`)
    .then((response) => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
})

const getVisitsCountForDate = (date, subEntities = [], showCurrentWhenSubEntities = false) => new Promise((resolve, reject) => {
  const params = {
    date: date,
    subEntities: subEntities,
    showCurrentWhenSubEntities: showCurrentWhenSubEntities
  }
  axios.post(API_GET_VISITS_COUNT_URL, params)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const getVisitsCountForLastMonths = (date, subEntities = [], showCurrentWhenSubEntities = false) => new Promise((resolve, reject) => {
  const params = {
    date: date,
    subEntities: subEntities,
    showCurrentWhenSubEntities: showCurrentWhenSubEntities
  }
  axios.post(API_GET_VISITS_COUNT_ON_LAST_MONTHS, params)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const getTotalCustomersCount = (date, subEntities = [], showCurrentWhenSubEntities = false) => new Promise((resolve, reject) => {
  const params = {
    date: date,
    subEntities: subEntities,
    showCurrentWhenSubEntities: showCurrentWhenSubEntities
  }
  axios.post(API_GET_TOTAL_CUSTOMERS_COUNT_URL, params)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const getSexParity = (subEntities = [], showCurrentWhenSubEntities = false) => new Promise((resolve, reject) => {
  axios.post(API_SEX_PARITY_COUNT_URL, {
    subEntities: subEntities,
    showCurrentWhenSubEntities: showCurrentWhenSubEntities
  })
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const getAgesRepartition = (subEntities = [], showCurrentWhenSubEntities = false) => new Promise((resolve, reject) => {
  axios.post(API_GET_AGES_REPARTITION, {
    subEntities: subEntities,
    showCurrentWhenSubEntities: showCurrentWhenSubEntities
  })
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const getCampaigns = () => new Promise((resolve, reject) => {
  axios.get(API_GET_CAMPAIGNS)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const createCampaign = (name, men, women, np, ageMin, ageMax, visitedPeriodStart, visitedPeriodEnd) => new Promise((resolve, reject) => {
  axios.post(API_CREATE_CAMPAIGN, {
    name: name,
    men: men,
    women: women,
    np: np,
    ageMin: ageMin,
    ageMax: ageMax,
    visitedPeriodStart: visitedPeriodStart,
    visitedPeriodEnd: visitedPeriodEnd
  })
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const sendNotification = (targetCampaignId, title, description) => new Promise((resolve, reject) => {
  const params = {
    targetCampaignId: targetCampaignId,
    title: title,
    description: description
  }
  axios.post(API_SEND_NOTIFICATION, null, {params})
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const adminSendNotification = (title, description) => new Promise((resolve, reject) => {
  const params = {
    title: title,
    description: description
  }
  axios.post(API_ADMIN_SEND_NOTIFICATION, null, {params})
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const getAllImages = () => new Promise((resolve, reject) => {
  axios.get(API_GET_ALL_IMAGES)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const getAllLogos = () => new Promise((resolve, reject) => {
  axios.get(API_GET_ALL_LOGOS)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const register = (username, password, name, address, fidelityMax, description, affiliationKey) => new Promise((resolve, reject) => {
  const params = {
    username: username,
    password: password,
    'business': {
      name: name,
      address: address,
      fidelityMax: fidelityMax,
      description: description,
      affiliationKey: affiliationKey
    }
  }

  axios.post(API_REGISTER_URL, params)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const addImage = (imageId) => new Promise((resolve, reject) => {
  axios.post(`${API_ADD_IMAGE_URL}/${imageId}`)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const addLogo = (logoId) => new Promise((resolve, reject) => {
  axios.post(`${API_ADD_LOGO_URL}/${logoId}`)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const addTags = (tags) => new Promise((resolve, reject) => {
  axios.post(API_ADD_TAGS_URL, tags)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const getCurrentBusinessInfos = () => new Promise((resolve, reject) => {
  axios.get(API_GET_CURRENT_BUSINESS_INFOS)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const updateBusiness = (params) => new Promise((resolve, reject) => {
  axios.put(API_PUT_CURRENT_BUSINESS_DATA, params)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const adminCreateImage = (url, type = 'image') => new Promise((resolve, reject) => {
  const image = {
    url: url,
    type: type
  }
  axios.post(API_ADMIN_CREATE_IMAGE, image)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const adminDeleteImage = (id) => new Promise((resolve, reject) => {
  axios.delete(`${API_ADMIN_DELETE_IMAGE}/${id}`)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const adminGetSettings = () => new Promise((resolve, reject) => {
  axios.get(API_ADMIN_GET_SETTINGS)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const changePassword = (newPassword) => new Promise((resolve, reject) => {
  const params = {
    'newPassword': newPassword
  }
  axios.put(API_CHANGE_PASSSWORD, {params})
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const subscribeToPremium = (token) => new Promise((resolve, reject) => {
  const params = {
    cardToken: token
  }
  axios.post(API_SUSCRIBE_TO_PREMIUM, null, {params})
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const sendAffiliationKey = (recipientEmail) => new Promise((resolve, reject) => {
  const params = {
    recipient: recipientEmail
  }
  axios.post(API_SEND_AFFILIATION_KEY, null, {params})
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const getAffiliations = () => new Promise((resolve, reject) => {
  axios.get(API_GET_AFFILIATIONS)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const deleteBusiness = () => new Promise((resolve, reject) => {
  axios.delete(API_DELETE_BUSINESS)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

export {
  login,
  getVisitsCountForDate,
  getVisitsCountForLastMonths,
  getTotalCustomersCount,
  getSexParity,
  getAgesRepartition,
  getCampaigns,
  createCampaign,
  sendNotification,
  getAllImages,
  getAllLogos,
  register,
  addImage,
  addTags,
  addLogo,
  getCurrentBusinessInfos,
  updateBusiness,
  adminCreateImage,
  adminDeleteImage,
  adminGetSettings,
  subscribeToPremium,
  changePassword,
  sendAffiliationKey,
  getAffiliations,
  deleteBusiness,
  adminSendNotification
}
