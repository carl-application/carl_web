<template>
  <div>
    <h1>Authenticated vue</h1>
    <button @click="logout">Log out</button>
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
