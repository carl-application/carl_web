<template>
  <div class="graph">
    <div class="sticks">
      <div class="value tooltip"
           v-for="(value, index) in reversedWeekValues"
           v-bind:key="index"
           v-bind:style="{ height: getHeight(index) + 'px' }">
        <span class="tooltiptext">{{getToolTip(index)}}</span>
      </div>
    </div>
    <div class="labels">
      <span class="label" v-for="(label, index) in getLabels" v-bind:key="index">{{label}}</span>
    </div>
  </div>
</template>
<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */

export default {
  props: {
    weekValues: Array,
    weekDays: Array,
    tooltipLabelSingular: String,
    tooltipLabelPlural: String
  },
  data () {
    return {
      days: ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    }
  },
  methods: {
    getHeight (index) {
      const totalHeight = 100
      const weekValue = this.weekValues[index]
      return weekValue / (this.maxValue > 0 ? this.maxValue : 1) * totalHeight + 1
    },
    getToolTip (index) {
      return this.reversedWeekValues[index] > 1
        ? `${this.reversedWeekValues[index]} ${this.tooltipLabelPlural}`
        : `${this.reversedWeekValues[index]} ${this.tooltipLabelSingular}`
    }
  },
  computed: {
    getLabels () {
      const labels = []
      for (let i of this.weekDays) {
        labels.push(this.days[i - 1])
      }
      return labels.reverse()
    },
    reversedWeekValues () {
      return this.weekValues.reverse()
    },
    maxValue () {
      return Math.max(...this.weekValues)
    }
  }
}
</script>
<style scoped lang="sass">
  .graph
    display: flex
    flex-direction: column
    justify-content: flex-end
    height: 100%
      background-color: rebeccapurple
    .sticks
      display: flex
      align-items: baseline

      .value
        background-color: #5351fb
        border-radius: 10px 10px 0 0
        margin: 1px
        flex: 1
    .labels
      display: flex
      justify-content: space-between
      align-items: center
      .label
        font-size: 10px
        color: #005ffb
        text-align: center
        flex: 1
  .tooltip
    position: relative
    display: inline-block
    cursor: pointer
  .tooltip .tooltiptext
    visibility: hidden
    width: 120px
    background-color: black
    color: #fff
    text-align: center
    border-radius: 6px
    padding: 5px 0
    /* Position the tooltip */
    position: absolute
    z-index: 1

  .tooltip:hover .tooltiptext
    visibility: visible
</style>
