<template>
  <div class="container">
    <div class="list">
      <div class="bloc-list-item">
        <div class="list-item">
          <div class="list-item-left" v-show="isVisitsCountLoading">
            <div class="loader"></div>
          </div>
          <div class="list-item-left" v-show="!isVisitsCountLoading">
            <p class="stats-title">Visites aujourd'hui</p>
            <p class="stats-number">{{visitsCount}}</p>
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
      </div>
      <!--<div class="pie-container" v-show="!isSexParityLoading">
        <div class="pie-legend">
          <p>Hommes: {{menCount}}</p>
          <p>Femmes: {{womenCount}}</p>
          <p>N.P: {{npCount}}</p>
        </div>
        <div class="pie">
          <pie :chartData="dataCollection" :options="charOptions"></pie>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import {getSexParity, getTotalCustomersCount, getVisitsCountForDate} from '../../../../utils/api'
import Pie from './pie/Pie'

export default {
  name: 'AnalyticsCards',
  components: {Pie},
  data: function () {
    return {
      isVisitsCountLoading: true,
      isTotalCustomersLoading: true,
      isSexParityLoading: true,
      visitsCount: 0,
      customersCount: 0,
      dataCollection: {},
      charOptions: {
        legend: {
          display: false
        }
      },
      menCount: 0,
      womenCount: 0,
      npCount: 0
    }
  },
  mounted: function () {
    this.fillData()
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
      .catch((error) => {
        console.log(`Error total customers count = ${error}`)
      })
  },
  methods: {
    fillData () {
      getSexParity()
        .then((response) => {
          this.menCount = response.data.men
          this.womenCount = response.data.women
          this.npCount = response.data.np
          this.dataCollection = {
            datasets: [{
              data: [this.menCount, this.womenCount, this.npCount],
              backgroundColor: ['#007dfd', '#F1D0FD', '#59CC57']
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
              'Hommes',
              'Femmes',
              'N.P'
            ]
          }
          this.isSexParityLoading = false
        })
        .catch((error) => {
          console.log(`Error getting sex parities = ${error}`)
        })
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style scoped src="./analytics_cards.css"></style>
