<template>
  <div class="blue-gradient-background page-container">
    <div class="container">
      <img src="../../assets/ic_carl.png"/>
      <h2>Hello, moi c'est Carl</h2>
      <h3>L'assistant de fidélité soucieux de votre vie privée</h3>
      <button class="white-button">Création de compte</button>
      <router-link to="Login" class="link">J'ai déjà un compte</router-link>
    </div>
  </div>
</template>

<script>
import login from './../login/Login'

export default {
  components: {login}
}
</script>

<style src="./home.css"></style>
