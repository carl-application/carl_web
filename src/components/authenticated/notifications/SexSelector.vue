<template>
  <div class="container">
    <div
      class="item"
      @click="toggle('men')"
      :class="{selected: isMenSelected}"
    >Hommes
    </div>
    <div
      class="item"
      @click="toggle('women')"
      :class="{selected: isWomenSelected}"
    >Femmes
    </div>
    <div
      class="item"
      @click="toggle('np')"
      :class="{selected: isNpSelected}"
    >N.P
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      men: Boolean,
      women: Boolean,
      np: Boolean
    }
  },
  data () {
    return {
      selected: this.value
    }
  },
  computed: {
    isNpSelected () {
      return this.selected.np
    },
    isWomenSelected () {
      return this.selected.women
    },
    isMenSelected () {
      return this.selected.men
    }
  },
  methods: {
    toggle (type) {
      const isSelected = this.selected[type]
      this.selected[type] = !isSelected
    }
  }
}
</script>

<style scoped lang="sass">
  .container
    display: flex
    justify-content: space-around
    background-color: #f8f9fb
    .item
      width: 60px
      text-align: center
      font-size: 12px
      background-color: white
      color: black
      padding: 10px
      border-radius: 20px
    .item:hover
      background-color: rgba(0, 124, 255, 0.2)
      color: white
    .selected
      background-color: #007dfd
      color: white
</style>
