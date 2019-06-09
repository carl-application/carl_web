<template>
  <div>
    <div class="container" @click="show">
      <p>{{label}}</p>
      <font-awesome-icon icon="arrow-circle-down"/>
    </div>
    <modal
      name="modal"
      :width="'60%'"
      :height="'80%'"
    >
      <div class="loader-container" v-if="isLoading">
        <div class="loader"></div>
      </div>
      <div class="modal" v-if="!isLoading">
        <div class="left">
          <h2>Sélectionner une audience</h2>
          <div class="campaigns-container">
            <div class="empty-campaigns" v-show="!hasCampaigns">
              <img src="./../../../assets/ic_carl.png" id="logo">
              <div class="title">Vous n'avez aucune audience pour le moment !</div>
            </div>
            <div
            class="campaign"
            v-show="hasCampaigns"
            v-for="(value, index) in campaigns"
            @click="selectCampaign(index)"
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
        </div>
        <div class="right">
          <h2>Créer une audience</h2>
          <input
            required v-model="campaignName"
            type="text"
            placeholder="Nom de l'audience"
          />
          <sex-selector :value="campaignSexes"></sex-selector>
          <div class="inputs-container">
            <div class="label-input">
              <div class="label">Age minimum (si besoin)</div>
              <input
                required v-model="campaignAgeMin"
                type="number"
                placeholder="Aucun"
              />
            </div>
            <div class="label-input">
              <div class="label">Age maximum (si besoin)</div>
              <input
                required v-model="campaignAgeMax"
                type="number"
                :aria-valuemin="campaignAgeMin"
                placeholder="Aucun"
              />
            </div>
          </div>
          <h3>Période visitée par le client</h3>
          <div class="inputs-container">
            <div class="label-input">
              <div class="label">Visite à partir du</div>
              <input
                required v-model="campaignPeriodStart"
                type="date"
              />
            </div>
            <div class="label-input">
              <div class="label">Visite avant le</div>
              <input
                required v-model="campaignPeriodEnd"
                type="date"
              />
            </div>
          </div>
          <div class="error-button">
            <div class="error" v-show="hasErrors">{{error}}</div>
            <div class="blue-button" @click="addCampaign">Valider</div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import {getCampaigns, createCampaign} from './../../../utils/api'
import SexSelector from './SexSelector'
export default {
  components: {SexSelector},
  data () {
    return {
      loading: true,
      campaigns: [],
      campaignName: '',
      campaignAgeMin: null,
      campaignAgeMax: null,
      campaignPeriodStart: null,
      campaignPeriodEnd: null,
      campaignSexes: {
        men: false,
        women: false,
        np: false
      },
      selectedCampaign: null,
      error: null
    }
  },
  computed: {
    label () {
      return this.selectedCampaign ? this.selectedCampaign.name : 'Sélectionner une audience'
    },
    isLoading () {
      return this.loading
    },
    hasCampaigns () {
      return this.campaigns && this.campaigns.length > 0
    }
  },
  methods: {
    show () {
      this.clearNewCampaignForm()
      this.$modal.show('modal')
      this.fetchCampaigns()
    },
    hide () {
      this.$modal.hide('modal')
    },
    hasErrors () {
      return this.error
    },
    clearNewCampaignForm () {
      this.error = ''
      this.campaignName = ''
      this.campaignAgeMin = null
      this.campaignAgeMax = null
      this.campaignPeriodStart = null
      this.campaignPeriodEnd = null
      this.campaignSexes = {
        men: false,
        women: false,
        np: false
      }
    },
    fetchCampaigns () {
      getCampaigns()
        .then((response) => {
          this.campaigns = response.data
          this.loading = false
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
    },
    addCampaign () {
      if (!this.campaignName) {
        this.error = 'Le nom de la campagne est obligatoire'
        return
      }

      if ((this.campaignAgeMin && isNaN(this.campaignAgeMin)) || (this.campaignAgeMin && this.campaignAgeMin < 0)) {
        this.error = 'l\'âge minimum doit être un chiffre positif'
      }

      if ((this.campaignAgeMax && isNaN(this.campaignAgeMax)) || (this.campaignAgeMax && this.campaignAgeMax < 0)) {
        this.error = 'l\'âge maximum doit être un chiffre positif'
      }

      if (this.campaignAgeMin && this.campaignAgeMax && this.campaignAgeMin > this.campaignAgeMax) {
        this.error = 'L\'âge maximum est inférieur au minimum'
      }

      if (this.campaignPeriodStart) {
        const date = new Date(this.campaignPeriodStart)
        if (isNaN(date.getFullYear())) {
          this.error = 'Les dates doivent être au format date'
        }
      }

      if (this.campaignPeriodEnd) {
        const date = new Date(this.campaignPeriodEnd)
        if (isNaN(date.getFullYear())) {
          this.error = 'Les dates doivent être au format date'
        }
      }

      if (this.campaignPeriodStart && this.campaignPeriodEnd) {
        const startDate = new Date(this.campaignPeriodStart)
        const endDate = new Date(this.campaignPeriodEnd)
        if (endDate < startDate) {
          this.error = 'Date de fin inférieure au début'
        }
      }

      this.loading = true
      createCampaign(
        this.campaignName,
        this.campaignSexes.men,
        this.campaignSexes.women,
        this.campaignSexes.np,
        parseInt(this.campaignAgeMin, 10),
        parseInt(this.campaignAgeMax, 10),
        this.campaignPeriodStart,
        this.campaignPeriodEnd
      ).then((response) => {
        console.log(`reponse.data = ${JSON.stringify(response.data)}`)
        this.campaigns.unshift(response.data)
        this.loading = false
      }).catch((error) => {
        console.error(`Error creating campaign = ${error}`)
      })
    },
    selectCampaign (index) {
      this.selectedCampaign = this.campaigns[index]
      this.$emit('selected', this.campaigns[index].id)
      this.hide()
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
    color: white
    height: 40px
    background-color: #ffa214
    border-radius: 10px
    h2
      color: #858997
      font-size: 20px

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
      background: linear-gradient(#007dfd, #0047fa)
      padding: 10px
      h2
        color: white

      .campaigns-container
        overflow: scroll
        width: 90%
        height: 100%
        padding: 5px
        .empty-campaigns
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          height: 100%
          img
            width: 100px
            height: 100px
          .title
            color: white
            text-align: center
            font-size: 18px
        .campaign
          height: 80px
          width: 95%
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
          background-color: #e8e8e8
          box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)
    .right
      display: flex
      flex-basis: 50%
      flex-direction: column
      background-color: #f8f9fb
      justify-content: start
      align-items: center
      padding: 10px
      input
        height: 20px
        width: 80%
        border-radius: 10px
        border-width: 0
        font-size: 14px
        color: black
        background-color: white
        margin-bottom: 10px
        padding: 10px
      input:focus
        outline: none
      .error-button
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        height: 100%
        .error
          font-size: 14px
          height: 20px
          text-align: center
          color: red
          margin-bottom: 5px
        .blue-button
          width: 100px
          color: white
          text-align: center
          font-size: 14px
          padding: 10px
          background: #007dfd
          border-radius: 20px
        .blue-button:focus
          outline: none
        .blue-button:hover
          cursor: pointer
        .blue-button:active
          background-color: #006EDC
          margin: 0
          border: none

      .inputs-container
        display: flex
        justify-content: center
        margin-top: 15px
        width: 100%
        .label-input
          display: flex
          flex-direction: column
          .label
            font-size: 10px
            margin-bottom: 10px
      h3
        color: #858997
        font-size: 16px
        align-self: start
</style>
