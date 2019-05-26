<template>
  <div class="container">
    <h1>Dashboard</h1>
    <div class="list">
      <div class="list-item">
        <div class="list-item-left">
          <p class="stats-number">220</p>
          <p class="stats-title">Visites aujourd'hui</p>
        </div>
        <div class="list-item-right">
          <img src="../../../assets/icon_customers.png">
        </div>
      </div>
      <div class="list-item">
        <div class="list-item-left">
          <p class="stats-number">1260</p>
          <p class="stats-title">Visites cette semaine</p>
        </div>
        <div class="list-item-right">
          <img src="../../../assets/icon_customers.png">
        </div>
      </div>
      <div class="list-item">
        <div class="list-item-left">
          <p class="stats-number">3800</p>
          <p class="stats-title">Visites ce mois-ci</p>
        </div>
        <div class="list-item-right">
          <img src="../../../assets/icon_customers.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .list {
    display: flex;
    justify-content: space-between;
    height: 100px;
  }

  .list-item {
    height: 100px;
    flex: 1;
    margin: 5px;
    display: flex;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    padding: 15px;
    border-radius: 10px;
    justify-content: space-between;
    align-items: center;
    min-width: 250px;
  }

  .list-item-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }

  .list-item-left .stats-number {
    margin: 0;
    font-size: 22px;
    color: pink;
    font-weight: bold;
  }

  .list-item-left .stats-title {
    font-size: 18px;
    color: black;
    font-weight: bold;
  }
</style>
