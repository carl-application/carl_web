<template>
  <div>
    <div class="selector-button" @click="showModal">
      <div class="button">Affiliations concernées</div>
      <font-awesome-icon icon="arrow-circle-down"/>
    </div>
    <modal
      name="modal"
      width="500px"
      :height="'80%'"
    >
      <div class="container">
        <h2>Affiliations concernées</h2>
        <p>Vous ne pourrez exclure les données de votre carte {{currentBusinessName}} qu'en sélectionnant au moins une affiliation</p>
        <div class="affiliations-container">
          <div class="loader-container" v-if="areAffiliationsLoading">
            <div class="loader"></div>
          </div>
          <div class="empty-affiliations" v-if="hasNoAffiliations">
            <img src="./../../../assets/ic_carl.png" id="empty">
            <div class="title">Vous n'avez aucune affiliation pour le moment !</div>
            <div class="subtitle">Les statistiques affichées sont donc les vôtres</div>
          </div>
          <div class="loaded-container">
            <div class="affiliation-item">
              <div
                class="affiliation current"
                @click="toggleCurrentSelection()"
              >
                <div class="images">
                  <img :src="currentBusinessLogo" class="logo"/>
                </div>
                <div class="infos">
                  <div class="name">Inclure vos données ?</div>
                  <div class="address">Les données de la carte {{currentBusinessName}} seront prises en compte</div>
                </div>
              </div>
              <div
                class="select"
                :class="{selected: isCurrentSelected()}"
                @click="toggleCurrentSelection()"
              ></div>
            </div>
            <div
              class="affiliation-item"
              v-show="hasAffiliations"
              v-for="(value, index) in affiliations"
              v-bind:key="index"
            >
              <div
                class="affiliation"
                @click="toggleAffiliationSelection(value.id)"
              >
                <div
                  class="images"
                >
                  <img :src="logoUrl(value)" class="logo"/>
                </div>
                <div class="infos">
                  <div class="name">{{value.name}}</div>
                  <div class="address">{{value.address}}</div>
                </div>
              </div>
              <div
                class="select"
                :class="{selected: isAffiliationSelected(value.id)}"
                @click="toggleAffiliationSelection(value.id)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import {TOGGLE_AFFILIATION, TOGGLE_SHOWING_CURRENT} from '../../../store/actions/affiliations'
import {REQUEST_AFFILIATIONS_LOADING} from '../../../store/status/affiliations'

export default {
  computed: {
    currentBusinessName () {
      return this.$store.getters.business.name
    },
    affiliations () {
      return this.$store.getters.storedAffiliations
    },
    areAffiliationsLoading () {
      return this.$store.getters.status === REQUEST_AFFILIATIONS_LOADING
    },
    hasNoAffiliations () {
      return this.$store.getters.status !== REQUEST_AFFILIATIONS_LOADING && this.affiliations && this.affiliations.length === 0
    },
    hasAffiliations () {
      return this.$store.getters.status !== REQUEST_AFFILIATIONS_LOADING && this.affiliations && this.affiliations.length > 0
    },
    currentBusinessLogo () {
      if (!this.$store.getters.business || !this.$store.getters.business.logo) return ''
      return this.$store.getters.business.logo.url
    }
  },
  methods: {
    showModal () {
      this.$modal.show('modal')
    },
    logoUrl (affiliation) {
      return affiliation && affiliation.logo && affiliation.logo.url
    },
    isAffiliationSelected (affiliationId) {
      return this.$store.getters.selectedAffiliations.includes(affiliationId)
    },
    isCurrentSelected () {
      return this.$store.getters.showCurrentWhenSubEntities
    },
    toggleAffiliationSelection (affiliationId) {
      this.$store.dispatch(TOGGLE_AFFILIATION, affiliationId)
    },
    toggleCurrentSelection () {
      this.$store.dispatch(TOGGLE_SHOWING_CURRENT)
    }
  }
}
</script>
<style scoped lang="sass">
  .selector-button
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    padding: 10px
    width: 100%
    color: white
    height: 40px
    background-color: #ffa214
    border-radius: 10px
  .selector-button:hover
    cursor: pointer
  .container
    display: flex
    flex-direction: column
    background-color: #f8f9fb
    height: 100%
    width: 100%
    align-items: center
    .validation
      position: absolute
      display: flex
      justify-content: center
      align-items: center
      width: 40px
      height: 40px
      bottom: 40px
      right: 40px
      background-color: #0C9
      color: #FFF
      border-radius: 50px
      text-align: center
      box-shadow: 2px 2px 3px #999
    .validation:hover
      cursor: pointer
    h2
      color: #858997
      font-size: 20px
    p
      color: #858997
      font-size: 14px
      text-align: center
    .loader-container
      height: 90%
      display: flex
      justify-content: center
      align-items: center
    .affiliations-container
      height: 100%
      width: 100%
      overflow: scroll
      .affiliation-item
        display: flex
        flex-direction: row
        justify-content: space-around
        align-items: center
        padding: 10px
        width: 100%
        .select
          height: 20px
          width: 20px
          border-radius: 30px
          background-color: white
        .select:hover
          cursor: pointer
        .selected
          background: linear-gradient(#007dfd, #0047fa)
        .affiliation:hover
          cursor: pointer
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
        .current
          padding: 15px
        .affiliation
          display: flex
          flex-direction: row
          align-items: center
          background-color: white
          border-radius: 10px
          padding: 10px
          width: 50%
          .infos
            display: flex
            flex-direction: column
            .name
              font-size: 14px
              font-weight: bold
            .address
              font-size: 12px
              color: #858997
          .images
            height: 60px
            width: 40px
            border-radius: 5px
            display: flex
            justify-content: center
            align-items: center
            margin-right: 10px
            #image
              height: 50px
              width: 40px
              border-radius: 10px
              object-fit: cover
            .logo
              height: 25px
              width: 25px
              object-fit: contain
      .empty-affiliations
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        height: 80%
        #empty
          width: 100px
          height: 100px
        .title
          font-size: 16px
          font-weight: bold
          margin-top: 5px
        .subtitle
          font-size: 14px
          margin-top: 5px
</style>
