<template>
  <div>
    <div class="analytics-card" v-show="hasValue">
      <div class="list-item-left">
        <p class="stats-title">{{title}}</p>
        <div class="evolution" v-show="hasEvolved">
          <font-awesome-icon icon="plus" :style="{ color: 'green', fontSize: '8px'}" v-if="hasProgressed"/>
          <font-awesome-icon icon="minus" :style="{ color: 'red', fontSize: '8px'}" v-else/>
          <p class="stats-evolution" :class="{ 'no-progress': !hasProgressed, 'progress': hasProgressed}">
            {{evolution.toFixed(2)}}%</p>
        </div>
        <p class="stats-number">{{count}}</p>
      </div>
      <div class="list-item-right">
        <week-chart
          :week-values="weekCounts"
          :week-days="weekDays"
          :tooltip-label-singular="singularTooltip"
          :tooltip-label-plural="plutalTooltip"
        ></week-chart>
      </div>
    </div>
    <div v-show="!hasValue" class="loader-container">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import WeekChart from './week_chart/WeekChart'
import momentTz from 'moment-timezone'

export default {
  components: {WeekChart},
  props: {
    title: String,
    valueRetriever: {type: Function},
    tooltipLabelSingular: String,
    tooltipLabelPlural: String,
    selectedAffiliation: Array
  },
  data () {
    return {
      value: null,
      date: momentTz().tz('Europe/Paris').format()
    }
  },
  mounted () {
    if (this.$store.getters.hasLoadedOnce) {
      console.log(`has loaded once `)
      const formattedDate = this.date.slice(0, this.date.indexOf('+'))
      this.valueRetriever(formattedDate, this.$store.getters.selectedAffiliations)
        .then((response) => {
          this.value = response.data
        })
        .catch((error) => {
          console.error(`Error getting values = ${error}`)
        })
    }
  },
  computed: {
    storeSelectedAffiliations () {
      return this.$store.getters.selectedAffiliations
    },
    singularTooltip () {
      return this.tooltipLabelSingular
    },
    plutalTooltip () {
      return this.tooltipLabelPlural
    },
    hasValue () {
      return this.value
    },
    hasEvolved () {
      return this.value && this.value.hasEvolve
    },
    hasProgressed () {
      return this.value && this.value.hasEvolve && this.value.evolution > 0
    },
    weekCounts () {
      return this.value ? this.value.weekCounts : []
    },
    weekDays () {
      return this.value ? this.value.correspondingDaysOfWeek : []
    },
    evolution () {
      if (!this.value) {
        return 0
      } else {
        if (this.value.evolution > 0) {
          return this.value.evolution
        } else {
          return -this.value.evolution
        }
      }
    },
    count () {
      return this.value ? this.value.count : 0
    }
  },
  watch: {
    storeSelectedAffiliations (subEntities) {
      const formattedDate = this.date.slice(0, this.date.indexOf('+'))
      this.valueRetriever(formattedDate, subEntities)
        .then((response) => {
          this.value = response.data
        })
        .catch((error) => {
          console.error(`Error getting values = ${error}`)
        })
    }
  }
}
</script>

<style scoped lang="sass">
  .loader-container
    background-color: white
    display: flex
    box-sizing: border-box
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding: 15px
    border-radius: 15px
    justify-content: center
    align-items: center
    height: 140px
    width: 350px
  .analytics-card
    background-color: white
    display: flex
    box-sizing: border-box
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border-radius: 15px
    justify-content: space-between
    align-items: center
    padding: 15px
    height: 140px
    width: 350px

    .list-item-left
      display: flex
      flex: 2
      flex-direction: column
      justify-content: space-between
      height: 100%
      .stats-number
        font-size: 24px
        margin: 0
        color: black
        font-weight: bold
      .stats-title
        font-size: 12px
        margin: 0
        color: #858997
        font-weight: bold
      .evolution
        display: flex
        justify-content: start
        align-items: baseline
        .stats-evolution
          margin: 40px 0 0 5px
          font-size: 14px
        .no-progress
          color: red
        .progress
          color: green
    .list-item-right
      flex: 1
      height: 100%

</style>
