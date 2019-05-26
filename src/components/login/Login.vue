<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="Username"/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <hr/>
      <button type="submit">Login</button>
    </form>
    <p v-if="isLoading">Loading ...</p>
  </div>
</template>

<script>
import {AUTH_REQUEST} from '../../store/actions/auth'
import {AUTH_STATUS_LOADING} from '../../store/status/auth'

export default {
  name: 'login',
  data () {
    return {
      username: 'thomas@gmail.com',
      password: 'totoro'
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.authStatus === AUTH_STATUS_LOADING
    }
  },
  methods: {
    login: function () {
      const {username, password} = this
      this.$store.dispatch(AUTH_REQUEST, {username, password}).then(() => {
        this.$router.push('Authenticated')
      })
    }
  }
}
</script>

<style>
  .login {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
  }
</style>
