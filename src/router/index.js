import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '../components/home/Home'
import Authenticated from '../components/authenticated/Authenticated'
import Login from '../components/login/Login'
import Dashboard from '../components/authenticated/dashboard/Dashboard'
import Notifications from '../components/authenticated/notifications/Notifications'
import Register from '../components/register/Register'
import Profile from '../components/authenticated/profile/Profile'

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
      component: Authenticated,
      beforeEnter: ifAuthenticated,
      children: [
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
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile,
          beforeEnter: ifAuthenticated
        }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '*',
      redirect: '/',
      beforeEnter: ifNotAuthenticated
    }
  ]
})
