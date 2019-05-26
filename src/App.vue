<template>
  <div id="app">
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  name: 'app',
  created: function () {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push('Authenticated')
    } else {
      this.$router.push('Login')
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  color: #2e426b;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>
