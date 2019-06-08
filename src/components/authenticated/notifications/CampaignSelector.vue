<template>
  <div>
    <div class="container" @click="show">
      <p>Sélectionner une audience</p>
      <font-awesome-icon icon="arrow-circle-down"/>
    </div>
    <modal
      name="modal"
      :width="700"
      :height="500"
    >
      <div class="loader-container" v-if="isLoading">
        <div class="loader"></div>
      </div>
      <div class="modal" v-if="!isLoading">
        <div class="left">
          <div
            class="campaign"
            v-show="!isLoading"
            v-for="(value, index) in campaigns"
            v-bind:key="index"
          >
            <div class="name">{{value.name}}</div>
            <div class="age-sex">
              <div class="age">{{generateAgeText(index)}}</div>
              <div class="sex-date">
                <div class="sex">
                  <p :class="{active: isMenLabelActive(index)}">HOMMES</p>
                  <p :class="{active: isWomenLabelActive(index)}">FEMMES</p>
                  <p :class="{active: isNpLabelActive(index)}">N.P</p>
                </div>
                <div class="date">
                  {{generateDateText(index)}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right"></div>
      </div>
    </modal>
  </div>
</template>

<script>
import {getCampaigns} from './../../../utils/api'

export default {
  data () {
    return {
      campaignsLoading: true,
      campaigns: []
    }
  },
  computed: {
    isLoading () {
      return this.campaignsLoading
    }
  },
  methods: {
    show () {
      this.$modal.show('modal')
      this.fetchCampaigns()
    },
    hide () {
      this.$modal.hide('modal')
    },
    fetchCampaigns () {
      getCampaigns()
        .then((response) => {
          this.campaigns = response.data
          this.campaignsLoading = false
        })
        .catch((error) => {
          console.error(`Error retrieving campaigns : ${error}`)
        })
    },
    generateAgeText (index) {
      const campaign = this.campaigns[index]
      let resultString = ''
      if (!campaign.ageMin && !campaign.ageMax) {
        resultString += 'Aucune restriction sur l\'âge'
      } else if (campaign.ageMin && campaign.ageMax) {
        resultString += `${campaign.ageMin} <= Age <= ${campaign.ageMax}`
      } else if (campaign.ageMin) {
        resultString += `Age >= ${campaign.ageMin}`
      } else {
        resultString += `Age <= ${campaign.ageMax}`
      }
      return resultString
    },
    isMenLabelActive (index) {
      return this.campaigns[index].men
    },
    isWomenLabelActive (index) {
      return this.campaigns[index].women
    },
    isNpLabelActive (index) {
      return this.campaigns[index].np
    },
    formatDateToString (date) {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    },
    generateDateText (index) {
      const campaign = this.campaigns[index]
      const startingDate = new Date(campaign.visitedPeriodStart)
      const endingDate = new Date(campaign.visitedPeriodEnd)
      let resultString = ''
      if (!campaign.visitedPeriodStart && !campaign.visitedPeriodEnd) {
        resultString += 'Aucune période spécifique'
      } else if (campaign.visitedPeriodStart && campaign.visitedPeriodEnd) {
        resultString += `Visite après ${this.formatDateToString(startingDate)} et avant ${this.formatDateToString(endingDate)}`
      } else if (campaign.visitedPeriodStart) {
        resultString += `Visite après ${this.formatDateToString(startingDate)}`
      } else {
        resultString += `Visite avant ${this.formatDateToString(endingDate)}`
      }
      return resultString
    }
  }
}
</script>

<style scoped lang="sass">
  .sex-date
    display: flex
    justify-content: space-between
    align-items: baseline
  .loader-container
    height: 100%
    width: 100%
    display: flex
    justify-content: center
    align-items: center
  .container
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px
    width: 100%
    height: 40px
    background-color: #f8f9fb
    border-radius: 10px

  .container:hover
    cursor: pointer

  .modal
    display: flex
    height: 100%
    width: 100%
    background-color: #f8f9fb
    .left
      display: flex
      width: 50%
      flex-direction: column
      justify-content: start
      align-items: center
      overflow: scroll
      padding: 20px
      .campaign
        height: 80px
        width: 100%
        padding: 10px
        border-radius: 10px
        background-color: white
        margin-bottom: 10px
        display: flex
        flex-direction: column
        justify-content: space-between
        .name
          font-size: 14px
          white-space: nowrap
          overflow: hidden
          font-weight: bold
          color: #007dfd
          text-overflow: ellipsis
          max-width: 100%
          margin-bottom: 10px
        .age
          font-size: 12px
        .date
          font-size: 8px
        .sex
          font-size: 8px
          display: flex
          p
            margin-right: 4px
          .active
            color: #007dfd

      .campaign:hover
        cursor: pointer
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
    .right
      width: 50%
      background-color: yellow
</style>
