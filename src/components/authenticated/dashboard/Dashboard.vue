<template>
  <div class="panel-blue">
    <div class="content">
      <h1>Hello !</h1>
      <p class="subtitle">Voici votre dashboard</p>
    </div>
    <div class="panel">
      <div class="card-visits">
        <AnalyticsCard
          class="card"
          title="Visites d'aujourd'hui"
          :value-retriever="visitsCountForDate"
          tooltip-label-singular="Visite"
          tooltip-label-plural="Visites"
        />
      </div>
      <div class="card-customers">
        <AnalyticsCard
          class="card"
          title="Nombre de clients au total"
          :value-retriever="totalCUstomersCount"
          tooltip-label-singular="Client"
          tooltip-label-plural="Clients"
        />
      </div>
      <div class="card-stats">
        <sex-stats></sex-stats>
      </div>
      <div class="card-stats">
        <ages-stats></ages-stats>
      </div>
      <div class="card-stats">
        <months-stats></months-stats>
      </div>
    </div>
  </div>
</template>

<script>
import AnalyticsCard from './analytics_cards/AnalyticsCard.vue'
import {getVisitsCountForDate, getTotalCustomersCount} from '../../../utils/api'
import SexStats from './analytics_cards/pie/SexStats'
import MonthsStats from './analytics_cards/months_chart/MonthChart'
import AgesStats from './analytics_cards/ages_chart/AgesChart'
import Scroller from 'vue-scroller'

export default {
  components: {AnalyticsCard, SexStats, MonthsStats, AgesStats, Scroller},
  methods: {
    visitsCountForDate (date) {
      return getVisitsCountForDate(date)
    },
    totalCUstomersCount (date) {
      return getTotalCustomersCount(date)
    }
  }
}
</script>

<style scoped lang="sass">
  .panel-blue
    position: absolute
    top: 0
    left: 25%
    right: 0
    bottom: 30%
    background: linear-gradient(#007dfd, #0047fa)
    border-radius: 0 0 0 200px

    .content
      padding: 100px

    h1
      color: white
      font-size: 40px
      font-family: 'Roboto Regular', sans-serif
      margin: 0

    p
      color: white
      font-size: 20px
      margin-bottom: 10%

    .panel
      align-items: start
      background-color: transparent
      display: flex
      flex-flow: column wrap
      position: absolute
      bottom: -100px
      left: 100px
      height: 300px

      .card
        height: 100%
        margin-right: 40px

      .card-visits
        box-sizing: border-box
        height: 140px
        padding-bottom: 20px

      .card-customers
        box-sizing: border-box
        height: 140px
        padding-top: 20px

      .card-stats
        flex-basis: 100%
        margin-right: 40px
</style>
