import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '../components/home/Home'
import Authenticated from '../components/authenticated/Authenticated'
import Login from '../components/login/Login'
import Dashboard from '../components/authenticated/dashboard/Dashboard'
import Notifications from '../components/authenticated/notifications/Notifications'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/authenticated',
      name: 'Authenticated',
      component: Authenticated,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: '',
          component: Dashboard
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/notifications',
          name: 'Notifications',
          component: Notifications,
          beforeEnter: ifAuthenticated
        }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    }
  ]
})
