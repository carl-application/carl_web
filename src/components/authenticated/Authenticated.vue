<template>
  <div class="container">
    <div class="nav-bar">
      <img src="./../../assets/logo.png" id="logo">
      <router-link to="Dashboard">
        <div class="nav-item">
          Dashboard
        </div>
      </router-link>
      <router-link to="Notifications">
        <div class="nav-item">
          Notifications
        </div>
      </router-link>
      <div class="nav-item" @click="logout">
        Log out
      </div>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import {AUTH_LOGOUT} from '../../store/actions/auth'

export default {
  methods: {
    logout: function () {
      this.$store.dispatch(AUTH_LOGOUT, {}).then(() => {
        this.$router.push('Login')
      })
    }
  }
}
</script>
<style scoped src="./authenticated.css"></style>
