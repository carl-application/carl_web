<template>
  <div class="container">
    <div class="title">Répartition des âges</div>
    <div class="chart-container">
      <div v-show="hasData">
        <bar-chart :chart-data="datacollection" :width="600" :height="200" :options="charOptions">></bar-chart>
      </div>
      <div class="loader-container" v-show="!hasData">
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>
<script>
import BarChart from './BarChart'
import {getAgesRepartition} from '../../../../../utils/api'

export default {
  components: {BarChart},
  data () {
    return {
      datacollection: null,
      charOptions: {
        legend: {
          display: false
        }
      }
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
  watch: {
    storeSelectedAffiliations (subEntities) {
      this.fillData(subEntities)
    }
  },
  methods: {
    fillData (subEntities) {
      getAgesRepartition(subEntities)
        .then((response) => {
          const data = response.data
          this.datacollection = {
            labels: data.map((item) => item.label),
            datasets: [
              {
                label: 'Nombre de clients',
                backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#c47250'],
                data: data.map((item) => item.value)
              }
            ]
          }
        }).catch((error) => {
          console.error(`Error retrieving stats ${error}`)
        })
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
