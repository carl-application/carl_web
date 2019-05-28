<template>
  <div class="panel-blue">
    <div class="panel">
      <h1>Hello, Midi pile.</h1>
      <p class="subtitle">Voici votre dashboard</p>
      <AnalyticsCards></AnalyticsCards>
    </div>
  </div>
</template>

<script>
import AnalyticsCards from './analytics_cards/AnalyticsCards.vue'

export default {
  components: {AnalyticsCards}
}
</script>

<style scoped>
.panel-blue {
  position: absolute;
  top: 0;
  left: 25%;
  right: 0;
  bottom: 30%;
  background: linear-gradient(#007dfd, #0047fa);
  border-radius: 0 0 0 200px;
}
.panel {
  background-color: transparent;
  height: 100%;
  padding-left: 10%;
  display: flex;
  align-items: start;
  flex-direction: column;
}

.panel h1 {
  color: white;
  font-size: 40px;
  margin: 40px 0 0 0;
}

.panel p {
  color: white;
  font-size: 20px;
  margin-bottom: 10%;
}
</style>
