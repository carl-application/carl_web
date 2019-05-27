import axios from 'axios'
import {API_LOGIN_URL} from './api-routes'

const mocks = {
  'auth': {'POST': {token: 'This-is-a-mocked-token'}},
  'user/me': {'GET': {name: 'doggo', title: 'sir'}}
}

const login = (username, password) => new Promise((resolve, reject) => {
  axios.post(API_LOGIN_URL, `username=${username}&password=${password}&grant_type=password`)
    .then((response) => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
})

const apiCall = ({url, method, ...args}) => new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      resolve(mocks[url][method || 'GET'])
      console.log(`Mocked '${url}' - ${method || 'GET'}`)
      console.log('response: ', mocks[url][method || 'GET'])
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

export {apiCall, login}
