<template>
  <div class="page">
    <div class="container">
      <div class="form-container">
        <form class="login" @submit.prevent="login">
          <div><img src="./../../assets/logo.png" id="logo"></div>
          <label>Nom d'utilisateur</label>
          <input
            required v-model="username"
            type="text"
            placeholder="Username"
            :class="{disabled: isLoading}"
            :disabled="isLoading"
          />
          <label>Mot de passe</label>
          <input
            required v-model="password"
            type="password"
            placeholder="Password"
            :class="{disabled: isLoading}"
            :disabled="isLoading"
          />
          <hr/>
          <p v-if="errorCredentials" class="error-credentials">Identifiants incorrect</p>
          <button type="submit" v-show="!isLoading">Connexion</button>
          <div class="loader" v-show="isLoading"></div>
          <p>Pas encore de compte ?
            <router-link to="Register">Inscrivez-vous !</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {AUTH_REQUEST} from '../../store/actions/auth'
import {AUTH_STATUS_LOADING, AUTH_STATUS_ERROR_CREDENTIALS} from '../../store/status/auth'

export default {
  name: 'login',
  data () {
    return {
      username: 'midipile@gmail.com',
      password: 'totoro'
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.authStatus === AUTH_STATUS_LOADING
    },
    errorCredentials () {
      return this.$store.getters.authStatus === AUTH_STATUS_ERROR_CREDENTIALS
    }
  },
  methods: {
    login: function () {
      const {username, password} = this
      this.$store.dispatch(AUTH_REQUEST, {username, password}).then(() => {
        this.$router.push('Dashboard')
      }).catch(_ => {
      })
    }
  }
}
</script>

<style scoped src="./login.css"></style>
