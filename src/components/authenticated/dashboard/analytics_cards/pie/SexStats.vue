<template>
  <div>
    <div class="container" v-if="!isLoading">
      <div class="title">Paritée</div>
      <div class="body">
        <div class="pie-legend">
          <div class="legend-item"><span class="bullet men"></span> <p>Hommes</p></div>
          <div class="legend-item"><span class="bullet women"></span><p>Femmes</p></div>
          <div class="legend-item"><span class="bullet np"></span><p>N.P</p></div>
        </div>
        <div class="pie-container">
          <pie class="pie" :chartData="dataCollection" :options="charOptions"></pie>
        </div>
      </div>
    </div>
    <div class="loader-container" v-if="isLoading">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import Pie from './Pie'
import {getSexParity} from '../../../../../utils/api'

export default {
  components: {Pie},
  data () {
    return {
      colors: ['#007dfd', '#F1D0FD', '#59CC57'],
      dataCollection: null,
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
    isLoading () {
      return !this.dataCollection
    }
  },
  watch: {
    storeSelectedAffiliations (subEntities) {
      getSexParity(subEntities)
        .then((response) => {
          const menCount = response.data.men
          const womenCount = response.data.women
          const npCount = response.data.np
          this.dataCollection = {
            datasets: [{
              data: [menCount, womenCount, npCount],
              backgroundColor: [this.colors[0], this.colors[1], this.colors[2]]
            }],

            labels: [
              'Hommes',
              'Femmes',
              'N.P'
            ]
          }
        })
        .catch((error) => {
          console.log(`Error getting sex parities = ${error}`)
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
    align-items: start
    padding: 15px
    width: 350px
    height: 300px

  .loader-container
    background-color: white
    display: flex
    flex-direction: column
    box-sizing: border-box
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border-radius: 15px
    align-items: center
    justify-content: center
    width: 350px
    height: 300px

  .body
    display: flex
    height: 100%
    width: 100%
    flex-direction: column
    justify-content: start
    align-items: center

    .pie-legend
      display: flex
      align-self: start
      justify-content: start
      margin-top: 20px
      width: 90%
      p
        font-size: 12px
        color: #858997
        margin: 0 10px 0 0

      .legend-item
        display: flex
        justify-content: start
        align-items: center
        .bullet
          width: 10px
          height: 10px
          border-radius: 10px
          margin-right: 5px
        .men
          background-color: #007dfd
        .women
          background-color: #F1D0FD
        .np
          background-color: #59CC57

    .pie-container
      height: 50%
      width: 50%
      display: flex
      justify-content: center
      align-items: center
      margin-top: 20px

      .pie
        width: 90%
        height: 90%
        margin: 0
  .title
    font-size: 12px
    margin: 0
    color: #858997
    font-weight: bold

</style>
