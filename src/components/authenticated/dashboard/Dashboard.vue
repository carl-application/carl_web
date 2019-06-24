<template>
  <div class="panel-blue">
    <div class="content">
      <div class="left">
        <h1>Hello !</h1>
        <p class="subtitle">Voici votre dashboard</p>
      </div>
      <div class="right" v-if="isPremium">
        <affiliation-selector></affiliation-selector>
      </div>
    </div>
    <div class="panel">
      <vue-scroll :ops="ops">
        <div class="panel-wrapper">
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
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import AnalyticsCard from './analytics_cards/AnalyticsCard.vue'
import {getVisitsCountForDate, getTotalCustomersCount} from '../../../utils/api'
import SexStats from './analytics_cards/pie/SexStats'
import MonthsStats from './analytics_cards/months_chart/MonthChart'
import AgesStats from './analytics_cards/ages_chart/AgesChart'
import VueScroll from 'vuescroll/dist/vuescroll-slide'
import AffiliationSelector from './../affiliation/AffiliationSelector'

export default {
  components: {AnalyticsCard, SexStats, MonthsStats, AgesStats, VueScroll, AffiliationSelector},
  data () {
    return {
      ops: {
        vuescroll: {
          sizeStrategy: 'number',
          zooming: false,
          scroller: {
            boucing: false
          }
        },
        scrollPanel: {
          scrollingX: true,
          scrollingY: false
        },
        bar: {
          background: '#007dfd',
          keepShow: true
        }
      }
    }
  },
  computed: {
    isPremium () {
      return this.$store.getters.isAdmin || this.$store.getters.isPremium
    }
  },
  methods: {
    visitsCountForDate (date, subEntities, showCurrentWhenSubEntities) {
      return getVisitsCountForDate(date, subEntities, showCurrentWhenSubEntities)
    },
    totalCUstomersCount (date, subEntities, showCurrentWhenSubEntities) {
      return getTotalCustomersCount(date, subEntities, showCurrentWhenSubEntities)
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
      padding: 50px
      display: flex
      flex-direction: row
      justify-content: space-between

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
      overflow: hidden
      padding: 20px
      position: absolute
      bottom: -130px
      right: 0
      width: 85%
    .panel:hover
      cursor: pointer

    .panel-wrapper
      align-items: start
      display: flex
      flex-flow: column wrap
      padding-bottom: 30px
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

    .__panel
      margin-bottom: 20px
</style>
