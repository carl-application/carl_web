<template>
  <div class="page blue-gradient-background">
    <div class="form-container">
      <form class="login" @submit.prevent="login">
        <img src="./../../assets/ic_carl.png" id="logo">
        <h2>Vous avez déjà un compte CARL ?</h2>
        <input
          required v-model="username"
          type="text"
          placeholder="Nom utilisateur..."
          :class="{disabled: isLoading}"
          :disabled="isLoading"
        />
        <input
          required v-model="password"
          type="password"
          placeholder="Mot de passe..."
          :class="{disabled: isLoading}"
          :disabled="isLoading"
        />
        <p v-if="errorCredentials" class="error-credentials">Identifiants incorrect</p>
        <button type="submit" class="white-button" v-show="!isLoading">Connexion</button>
        <div class="loader-container"><div class="loader" v-show="isLoading"></div></div>
        <p>Pas encore de compte ?
          <router-link to="Register">Inscrivez-vous !</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import {AUTH_REQUEST} from '../../store/actions/auth'
import {AUTH_STATUS_ERROR_CREDENTIALS, AUTH_STATUS_LOADING} from '../../store/status/auth'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
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
