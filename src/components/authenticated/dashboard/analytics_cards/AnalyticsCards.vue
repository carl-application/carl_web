<template>
  <div class="container">
    <div class="list">
      <div class="list-item">
        <div class="list-item-left" v-show="isVisitsCountLoading">
          <div class="loader"></div>
        </div>
        <div class="list-item-left" v-show="!isVisitsCountLoading">
          <p class="stats-number">{{visitsCount}}</p>
          <p class="stats-title">Visites aujourd'hui</p>
        </div>
        <div class="list-item-right">
          <img src="../../../../assets/icon_customers.png">
        </div>
      </div>
      <div class="list-item">
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
      <div class="list-item">
        <div class="list-item-left" v-show="isSexParityLoading">
          <div class="loader"></div>
        </div>
        <div class="list-item-left" v-show="!isSexParityLoading">
          <p class="stats-number">3800</p>
          <p class="stats-title">Visites ce mois-ci</p>
        </div>
        <div class="list-item-right">
          <img src="../../../../assets/icon_customers.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getTotalCustomersCount, getVisitsCountForDate} from '../../../../utils/api'

export default {
  name: 'AnalyticsCards',
  data: function () {
    return {
      isVisitsCountLoading: true,
      isTotalCustomersLoading: true,
      isSexParityLoading: true,
      visitsCount: 0,
      customersCount: 0
    }
  },
  mounted: function () {
    const now = new Date()
    getVisitsCountForDate(now.toISOString())
      .then((response) => {
        this.visitsCount = response.data.visitsCount
        this.isVisitsCountLoading = false
      })
      .catch((error) => {
        console.log(`Error getting visitsCount = ${error}`)
      })

    getTotalCustomersCount()
      .then((response) => {
        this.customersCount = response.data.customersCount
        this.isTotalCustomersLoading = false
      })
  }
}
</script>

<style scoped src="./analytics_cards.css"></style>
