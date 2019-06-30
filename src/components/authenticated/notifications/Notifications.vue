<template>
  <div class="panel-blue">
    <div class="content">
      <h1>Notifications</h1>
      <p class="subtitle">Envoyez une notification à un groupe d'utilisateur !</p>
      <div class="input">
        <input
          required v-model="title"
          type="text"
          placeholder="Titre"
        />
        <div class="input-right">{{getTitleLength}}/30</div>
      </div>
      <div class="input">
        <textarea
          required v-model="description"
          placeholder="Description"></textarea>
        <div class="textarea-right">{{getDescriptionLength}}/300</div>
      </div>
      <campaign-selector
        id="campaign-selector"
        @selected="campaignSelected"
        v-if="!isAdmin"
      ></campaign-selector>
      <div class="validation-error">
        <div class="validation" @click="send">
          <div v-if="!loading">Envoyer</div>
          <div class="loader" v-if="loading"></div>
        </div>
        <div class="error">{{error}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CampaignSelector from './CampaignSelector'
import {sendNotification, adminSendNotification} from './../../../utils/api'
export default {
  components: {CampaignSelector},
  data () {
    return {
      title: '',
      description: '',
      selectedCampaignId: null,
      loading: false,
      error: null
    }
  },
  computed: {
    getTitleLength () {
      return this.title.length
    },
    getDescriptionLength () {
      return this.description.length
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    }
  },
  methods: {
    campaignSelected (id) {
      this.selectedCampaignId = id
    },
    sendWhenAdmin () {
      this.error = null
      this.loading = true

      adminSendNotification(
        this.title,
        this.description
      ).then((response) => {
        this.sendingNotificationResponseHandler(response)
      }).catch((error) => {
        console.error(error)
        this.notifyError()
        this.clear()
      })
    },
    send () {
      if (this.loading) return

      if (!this.title || !this.description) {
        this.error = 'Tous les champs doivent être renseignés'
        return
      }

      if (this.title.length > 30) {
        this.error = 'Le titre ne peut exceder 30 caractères'
        return
      }

      if (this.description.length > 300) {
        this.error = 'La description ne peut exceder 300 caractères'
        return
      }

      if (this.$store.getters.isAdmin) {
        this.sendWhenAdmin()
        return
      }

      if (!this.selectedCampaignId || isNaN(this.selectedCampaignId)) {
        this.error = 'Aucune audience n\'a été séléctionnée'
        return
      }

      this.error = null
      this.loading = true

      sendNotification(
        parseInt(this.selectedCampaignId),
        this.title,
        this.description
      ).then((response) => {
        this.sendingNotificationResponseHandler(response)
      }).catch((error) => {
        console.error(error)
        this.notifyError()
        this.clear()
      })
    },
    sendingNotificationResponseHandler (response) {
      if (response.data.success) {
        this.notifySuccess(response.data.nbMatchedUsers)
      } else {
        if (response.data.error === 2) {
          const nbNotificationsPerMonth = this.$store.getters.nbFreeNotificationsPerMonth
          this.notifyError(`Vous avez dépassé la limite autorisée de notifications en version gratuite (${nbNotificationsPerMonth} par mois) !`)
        } else {
          this.notifyError('La notification n\'a pas correctement été envoyée')
        }
      }
      this.clear()
    },
    notifySuccess (nbMatchedUsers) {
      this.$notify({
        group: 'notifications',
        type: 'success',
        duration: '8000',
        title: 'Succès de l\'envoi',
        text: `La notification a correctement été envoyée aux ${nbMatchedUsers} utilisateurs ciblés !`
      })
    },
    notifyError (text) {
      this.$notify({
        group: 'notifications',
        type: 'error',
        duration: '5000',
        title: 'Echec de l\'envoi',
        text: text
      })
    },
    clear () {
      this.loading = false
      this.title = ''
      this.description = ''
    }
  }
}
</script>

<style scoped lang="sass">
  .validation-error
    position: absolute
    bottom: -120px
  .validation
    width: 100px
    height: 40px
    display: flex
    justify-content: center
    align-items: center
    border-radius: 30px
    text-align: center
    margin-top: 10px
    background-color: #007dfd
    font-size: 14px
    color: white
    .loader
      height: 10px
      width: 10px
  .validation:hover
    cursor: pointer
  .validation:active
    background-color: #0047fa
  #campaign-selector
    margin-top: 10px
    width: 500px
  .content
    display: flex
    flex-direction: column
  .subtitle
    margin: 0

  input:focus
    outline: none
  textarea:focus
    outline: none

  .input
    display: flex
    margin-bottom: 10px
    .input-right
      padding: 10px
      display: flex
      justify-content: center
      align-items: center
      background-color: #f8f9fb
      border-radius: 0 10px 10px 0
      height: 40px
      width: 50px

    .textarea-right
     padding: 10px
     display: flex
     justify-content: center
     align-items: center
     background-color: #f8f9fb
     border-radius: 0 10px 10px 0
     height: 60px
     width: 50px

    input
      height: 40px
      width: 500px
      border-radius: 10px 0 0 10px
      border-width: 0
      font-size: 16px
      color: black
      background-color: #f8f9fb
      padding: 10px

    textarea
      height: 60px
      width: 500px
      border-radius: 10px 0 0 10px
      border-width: 0
      font-size: 16px
      color: black
      background-color: #f8f9fb
      resize: none
      padding: 10px

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

    h1
      color: white
      font-size: 40px
      font-family: 'Roboto Regular', sans-serif
      margin: 0

    p
      color: white
      font-size: 20px
      margin-bottom: 30px

    .panel
      overflow: hidden
      padding: 20px
      position: absolute
      bottom: -100px
      right: 0
      width: 85%

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
  .error
    height: 30px
    color: red
    margin-top: 15px
</style>
