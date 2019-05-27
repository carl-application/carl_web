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
      this.$router.push('Dashboard')
    } else {
      this.$router.push('Login')
    }
  }
}
</script>

<style src="./app.css"></style>
