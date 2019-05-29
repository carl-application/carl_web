<template>
  <div class="analytics-card">
    <div class="list-item-left" v-show="isTotalCustomersLoading">
      <div class="loader"></div>
    </div>
    <div class="list-item-left" v-show="!isTotalCustomersLoading">
      <p class="stats-number">{{customersCount}}</p>
      <p class="stats-title">Clients uniques au total</p>
    </div>
    <div class="list-item-right">
      <img src="../../../../assets/icon_customers.png">
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      customersCount: 0
    }
  }
}
</script>

<style scoped lang="sass">
  .analytics-card
    background-color: white
    display: flex
    box-sizing: border-box
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)
    padding: 15px
    border-radius: 20px
    justify-content: space-between
    align-items: center
    width: 300px

  .list-item-left
    display: flex
    flex-direction: column
    justify-content: space-between
    height: 80%

    .stats-number
      margin: 0
      font-size: 26px
      color: black
      font-weight: bold

    .stats-title
      font-size: 14px
      color: #858997
      font-weight: bold
</style>
