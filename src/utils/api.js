import axios from 'axios'
import {
  API_GET_TOTAL_CUSTOMERS_COUNT_URL,
  API_GET_VISITS_COUNT_URL,
  API_LOGIN_URL,
  API_SEX_PARITY_COUNT_URL
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

const getVisitsCountForDate = (date) => new Promise((resolve, reject) => {
  const params = {
    date: date
  }
  axios.get(API_GET_VISITS_COUNT_URL, {params})
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      console.log(`error gettinf visits count`)
      reject(error)
    })
})

const getTotalCustomersCount = (date) => new Promise((resolve, reject) => {
  const params = {
    date: date
  }
  axios.get(API_GET_TOTAL_CUSTOMERS_COUNT_URL, {params})
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

const getSexParity = () => new Promise((resolve, reject) => {
  axios.get(API_SEX_PARITY_COUNT_URL)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
})

export {login, getVisitsCountForDate, getTotalCustomersCount, getSexParity}
