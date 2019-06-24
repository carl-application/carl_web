<template>
  <div class="container">
    <div class="title">Nombres de visites depuis 12 mois</div>
    <div class="chart-container">
      <div v-show="hasData">
        <line-chart :chart-data="datacollection" :width="600" :height="200">></line-chart>
      </div>
      <div class="loader-container" v-show="!hasData">
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from './LineChart'
import {getVisitsCountForLastMonths} from '../../../../../utils/api'
import momentTz from 'moment-timezone'

export default {
  components: {LineChart},
  data () {
    return {
      datacollection: null,
      date: momentTz().tz('Europe/Paris').format(),
      monthsLabels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  },
  computed: {
    storeSelectedAffiliations () {
      return this.$store.getters.selectedAffiliations
    },
    hasData () {
      return this.datacollection
    }
  },
  mounted () {
    if (this.$store.getters.hasLoadedOnce) {
      this.fillData(this.$store.getters.selectedAffiliations)
    }
  },
  watch: {
    storeSelectedAffiliations (subEntities) {
      this.fillData(subEntities)
    }
  },
  methods: {
    fillData (subEntities) {
      const formattedDate = this.date.slice(0, this.date.indexOf('+'))
      getVisitsCountForLastMonths(formattedDate, subEntities)
        .then((response) => {
          const data = response.data
          this.datacollection = {
            labels: data.correspondingMonths.map((i) => this.monthsLabels[i - 1]).reverse(),
            datasets: [
              {
                label: 'Nombre de visites',
                data: data.monthsCounts.map((i) => i).reverse(),
                backgroundColor: [
                  'rgba(0,125,253, 0.3)'
                ],
                borderColor: [
                  'rgba(0,125,253, 0.3)'
                ],
                borderWidth: 1
              }
            ]
          }
        }).catch((error) => {
          console.error(`Error retrieving stats ${error}`)
        })
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>
<style scoped lang="sass">
  .container
    background-color: white
    display: flex
    flex-direction: column
    box-sizing: border-box
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border-radius: 15px
    justify-content: center
    align-items: start
    padding: 15px
    width: 700px
    height: 300px
    .title
      font-size: 12px
      margin: 0
      color: #858997
      font-weight: bold

    .chart-container
      width: 100%
      height: 100%
      display: flex
      justify-content: center
      align-items: center
      margin-top: 20px

</style>
