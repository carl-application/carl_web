'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PLACES_API_KEY: '"AIzaSyAESY7otFyp5_STycjYwUCqkcjtqIpXhsw"',

  FIREBASE_API_KEY: '"AIzaSyAESY7otFyp5_STycjYwUCqkcjtqIpXhsw"',
  FIREBASE_AUTH_DOMAIN: '"carl-application.firebaseapp.com"',
  FIREBASE_DATABASE_URL: '"https://carl-application.firebaseio.com"',
  FIREBASE_PROJECT_ID: '"carl-application"',
  FIREBASE_STORAGE_BUCKET: '"carl-application.appspot.com"',
  FIREBASE_MESSENGING_SENDER_ID: '"791112122663"',
  FIREBASE_APP_ID: '"1:791112122663:web:0b5273aefac86a49"',
  STRIPE_PUBLIC_KEY: '"pk_test_EGfpFUNkxVpEdPFVTvhnKx2u00xcZVLyay"'
})
