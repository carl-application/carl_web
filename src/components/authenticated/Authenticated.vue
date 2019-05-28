<template>
  <div class="container">
    <div class="nav-bar">
      <!--<img src="./../../assets/logo.png" id="logo">-->
      <router-link to="Dashboard">
        <div class="nav-item">
          <div class="nav-item-left"><img src="../../assets/ic_small_chart.png"/></div>
          <div class="nav-item-right">Dashboard</div>
        </div>
      </router-link>
      <router-link to="Notifications">
        <div class="nav-item">
          <div class="nav-item-left"><img src="../../assets/ic_small_notification.png"/></div>
          <div class="nav-item-right">Notifications</div>
        </div>
      </router-link>
      <div class="nav-item" @click.prevent="logout">
        <div class="nav-item-left"></div>
        <div class="nav-item-right">Déconnexion</div>
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
