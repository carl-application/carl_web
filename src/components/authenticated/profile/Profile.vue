<template>
  <div class="panel-blue">
    <modal
      name="sendMail"
      width="400px"
      height="400px"
    >
      <div class="send-mail">
        <img src="./../../../assets/ic_carl.png" id="send-mail-logo">
        <div class="text">
          <p>Nous enverrons pour vous un email à votre collaborateur pour lui partager votre clé d'affiliation</p>
          <p>Son adresse mail ne sera en aucun cas sauvegardée</p>
        </div>
        <input
          required v-model="affiliationRecipientEmail"
          placeholder="Adresse email"
          type="email"
        />
        <div class="send" @click="send">
          <div v-if="!sendingMail">Envoyer</div>
          <div class="loader" v-if="sendingMail"></div>
        </div>
        <div class="error" v-if="errorSendingEmail">{{emailSentError}}</div>
        <div class="success" v-if="hasWellSentEmail">{{emailSentSuccess}}</div>
      </div>
    </modal>
    <modal
      name="question"
      width="500px"
      :height="'90%'"
    >
      <div class="informations">
        <img src="./../../../assets/ic_carl.png" id="logo">
        <h2>Clé d'affiliation ? Quézako ?</h2>
        <p>Chez Carl, nous savons qu'il est possible qu'une seule carte de fidélité ne convienne pas à vos besoins.</p>
        <p>En effet, peut-être êtes-vous propriétaire d'une chaîne de magasin et souhaiteriez mettre en place plusieurs cartes de fidélités.</p>
        <p>Si c'est votre cas, alor sle système d'affiliation Carl est fait pour vous !</p>
        <p>Lorsqu'un compte pro sera créé en renseignant cette clé d'affiliation, alors ce compte sera.. affilié au vôtre !</p>
        <p>Concretement, cela signifiera alors que vous aurez un accès total aux statistiques générées par ce "sous-compte".</p>
        <p>Dans le cadre d'une chaîne de magasins, vous aurez alors accès aux statistiques de tous vos magasins et pourrez les comparer.</p>
        <p>Chaque magasin n'aura en revanche accès qu'auw statistiques qui lui sont propre !</p>
        <p>N'attendez plus et partager votre clé à vos managers !</p>
        <p>Vous pouvez copier coller la clé affichée ou utiliser notre système d'enoi de mail</p>
      </div>
    </modal>
    <div class="content">
      <div class="left-header">
        <h1>Votre profil</h1>
        <div class="save" @click="save">
          <div v-if="!loading">Sauvegarder</div>
          <div class="loader" v-if="loading"></div>
        </div>
      </div>
      <div class="right-header" v-if="isPremium">
        <div class="labelized-input">
          <p class="label">Votre clé d'affiliation :</p>
          <div class="affiliationkey">
            <input
              required v-model="getAffiliationKey"
              placeholder="clé d'affiliation.."
              type="text"
              disabled="true"
            />
            <font-awesome-icon
              id="affiliation-question-icon"
              icon="question-circle"
              @click="showAffiliationQuestion"
              :style="{ color: 'white', fontSize: '30px'}"
            />
            <div class="show-email-button" @click="sendMail">Envoyer</div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel">
      <vue-scroll :ops="ops">
        <div class="panel-wrapper">
          <div class="card">
            <div v-if="!mayShowCards" class="loader-container">
              <div class="loader"></div>
            </div>
            <div class="card-loaded" v-if="mayShowCards">
              <div class="title">Modifiez vos nom / description / addresse</div>
              <div class="card-content">
                <div class="labelized-input">
                  <p class="label">Nom :</p>
                  <input
                    required v-model="business.name"
                    placeholder="Nom de l'entité"
                    type="text"
                  />
                </div>
                <div class="labelized-input">
                  <p class="label">Description :</p>
                  <textarea
                    required v-model="business.description"
                    placeholder="Ce que votre client pourra gagner !"
                  ></textarea>
                </div>
                <div class="labelized-input">
                  <p class="label">Adresse :</p>
                  <gmap-autocomplete
                    id="address-input"
                    @place_changed="setPlace"
                    :placeholder="business.address"
                  ></gmap-autocomplete>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div v-if="!mayShowCards" class="loader-container">
              <div class="loader"></div>
            </div>
            <div class="card-loaded" v-if="mayShowCards">
              <div class="title">Modifiez les caractéristiques de votre carte</div>
              <div class="card-content">
                <div class="labelized-input">
                  <p class="label">Nombre de points requis :</p>
                  <input
                    required v-model="business.fidelityMax"
                    placeholder="Nombre de points requis"
                    type="number"
                  />
                </div>
                <div class="labelized-input">
                  <p class="label">Nombre de scan par jour par utilisateur :</p>
                  <input
                    required v-model="business.nbScanPerDay"
                    placeholder="1"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div v-if="!mayShowCards" class="loader-container">
              <div class="loader"></div>
            </div>
            <div class="card-loaded" v-if="mayShowCards">
              <div class="title">Modifiez vos tags</div>
              <div class="card-content">
                <input
                  id="tags-input"
                  v-model="tagModel"
                  placeholder="Ajoutez un tag"
                  type="text"
                  v-on:keyup.enter="addTag"
                />
                <div class="tags-container">
                  <div
                    class="tag"
                    v-for="(value, index) in tags"
                    :class="{purple: isTagPurple(index), pink: isTagpink(index), green: isTagGreen(index)}"
                    v-bind:key="index">
                    <p>{{value}}</p>
                    <font-awesome-icon icon="times" class="tag-icon" v-on:click="removeTag(index)"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="big-card">
            <div v-if="!mayShowImages" class="loader-container">
              <div class="loader"></div>
            </div>
            <div class="card-loaded" v-if="mayShowImages">
              <div class="title">Modifiez votre image</div>
              <div class="card-content">
                <div class="images-wrapper">
                  <div
                    class="image"
                    v-for="(value, index) in images"
                    @click="selectImage(value)"
                    v-bind:key="index"
                  >
                    <img :src="getUrl(value)"/>
                  </div>
                </div>
                <div class="selected-image">
                  <div class="label">Image choisie :</div>
                  <img :src="getUrl(selectedImage)"/>
                </div>
              </div>
            </div>
          </div>
          <div class="big-card">
            <div v-if="!mayShowLogos" class="loader-container">
              <div class="loader"></div>
            </div>
            <div class="card-loaded" v-if="mayShowLogos">
              <div class="title">Modifiez votre logo</div>
              <div class="card-content">
                <div class="logos-wrapper">
                  <div
                    class="image"
                    v-for="(value, index) in logos"
                    @click="selectLogo(value)"
                    v-bind:key="index"
                  >
                    <img :src="getUrl(value)"/>
                  </div>
                </div>
                <div class="selected-logo">
                  <div class="label">logo choisi :</div>
                  <div class="image">
                    <img :src="getUrl(selectedLogo)"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import VueScroll from 'vuescroll/dist/vuescroll-slide'
import {
  getAllImages,
  getAllLogos,
  getCurrentBusinessInfos,
  updateBusiness,
  sendAffiliationKey
} from './../../../utils/api'

export default {
  components: {VueScroll},
  data () {
    return {
      business: null,
      tagModel: null,
      tags: [],
      images: null,
      selectedImage: null,
      logos: null,
      selectedLogo: null,
      selectedAddress: null,
      loading: false,
      oldPassword: null,
      newPassword: null,
      newPasswordRepeat: null,
      passwordError: null,
      affiliationRecipientEmail: null,
      isSendingMail: false,
      emailSentError: null,
      emailSentSuccess: null,
      ops: {
        vuescroll: {
          sizeStrategy: 'number',
          zooming: false,
          scroller: {
            boucing: false
          }
        },
        scrollPanel: {
          scrollingX: true,
          scrollingY: false
        },
        bar: {
          background: '#007dfd',
          keepShow: true
        }
      }
    }
  },
  methods: {
    async send () {
      if (!this.affiliationRecipientEmail) {
        this.emailSentError = 'Veuillez renseigner une adresse mail'
        return
      }
      this.isSendingMail = true
      const response = await sendAffiliationKey(this.affiliationRecipientEmail)

      if (response.status !== 200) {
        this.emailSentError = 'Une erreur est survenue!'
      } else {
        this.emailSentSuccess = 'Email envoyé !'
      }

      this.isSendingMail = false
    },
    sendMail () {
      this.$modal.show('sendMail')
    },
    showAffiliationQuestion () {
      this.$modal.show('question')
    },
    setPlace (address) {
      this.selectedAddress = address.formatted_address
      console.log(`this.business.address = ${JSON.stringify(this.business.address)}`)
    },
    addTag () {
      this.tags.push(this.tagModel)
      this.tagModel = null
    },
    isTagPurple (index) {
      return index % 2 !== 0 && index % 3 !== 0 && index !== 0
    },
    isTagpink (index) {
      return index % 2 === 0 && index % 3 !== 0 && index !== 0
    },
    isTagGreen (index) {
      return index === 0 || index % 3 === 0
    },
    removeTag (index) {
      this.tags.splice(index, 1)
    },
    selectImage (value) {
      this.selectedImage = value
    },
    selectLogo (value) {
      this.selectedLogo = value
    },
    getUrl (image) {
      if (!image) return ''
      return image.url
    },
    async save () {
      this.loading = !this.loading

      let params = {
        name: this.business.name,
        description: this.business.description,
        address: this.selectedAddress,
        fidelityMax: parseInt(this.business.fidelityMax),
        nbScanPerDay: parseInt(this.business.nbScanPerDay),
        imageId: parseInt(this.selectedImage.id),
        logoId: parseInt(this.selectedLogo.id),
        stringTags: this.tags
      }

      try {
        const response = await updateBusiness(params)
        if (response.status !== 200) {
          console.log(`Error update business`)
        } else {
          this.business = response.data
          this.selectedImage = this.business.image
          this.selectedLogo = this.business.logo
        }
        this.loading = false
      } catch (error) {
        console.log(`Error updating business : ${error}`)
        this.loading = false
      }
    }
  },
  mounted () {
    getCurrentBusinessInfos()
      .then((response) => {
        this.business = response.data
        this.tags = this.business.tags.map((item) => item.name)
        this.selectedLogo = this.business.logo
        this.selectedImage = this.business.image
      })
      .catch((error) => {
        console.error(`Error retrieving business infos : ${error}`)
      })

    getAllImages()
      .then((response) => {
        this.images = response.data
      })
      .catch((error) => {
        console.error(`Error retrieving all images = ${error}`)
      })

    getAllLogos()
      .then((response) => {
        this.logos = response.data
      })
      .catch((error) => {
        console.error(`Error retrieving all logos = ${error}`)
      })
  },
  computed: {
    hasWellSentEmail () {
      return this.emailSentSuccess
    },
    errorSendingEmail () {
      return this.emailSentError
    },
    sendingMail () {
      return this.isSendingMail
    },
    getAffiliationKey () {
      return this.$store.getters.affiliationKey
    },
    isPremium () {
      return this.$store.getters.isAdmin || this.$store.getters.isPremium
    },
    hasLoaded () {
      return this.business
    },
    hasImages () {
      return this.images
    },
    hasLogos () {
      return this.logos
    },
    mayShowCards () {
      return this.business && !this.loading
    },
    mayShowImages () {
      return this.images && !this.loading
    },
    mayShowLogos () {
      return this.logos && !this.loading
    }
  }
}
</script>

<style scoped lang="sass">
  .send-mail
    display: flex
    flex-direction: column
    height: 100%
    width: 100%
    align-items: center
    justify-content: space-around
    background: linear-gradient(#007dfd, #0047fa)
    .success
      height: 30px
      color: #41ff25
      font-size: 14px
    .error
      height: 30px
      color: red
      font-size: 14px
    #send-mail-logo
      width: 120px
      height: 120px
    .text
      display: flex
      flex-direction: column
      align-items: center
      p
        font-size: 14px
        color: white
        margin: 5px 0 5px 0
        width: 90%
        text-justify: auto
    .send
      padding: 10px
      border-radius: 5px
      width: 80px
      color: white
      font-size: 14px
      background-color: #ffa214
      text-align: center
      display: flex
      justify-content: center
      align-items: center
      margin-left: 10px
      .loader
        width: 8px
        height: 8px
    .send:hover
      cursor: pointer
    input
      height: 20px
      border-radius: 10px
      border-width: 0
      margin-right: 10px
      width: 60%
      font-size: 14px
      color: black
      background-color: white
      padding: 10px
    input:focus
      outline: none
  .informations
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    width: 100%
    padding-left: 10px
    padding-right: 10px
    height: 100%
    background: linear-gradient(#007dfd, #0047fa)
    #logo
      height: 120px
      width: 120px
    h2
      font-size: 18px
      color: white
      font-weight: bold
      margin-bottom: 10px
    p
      font-size: 14px
      color: white
      margin: 5px 0 5px 0
      width: 90%
      text-justify: auto
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
      display: flex
      flex-direction: row
      justify-content: space-between
      .right-header
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        width: 50%
        .labelized-input
          width: 100%
          .label
            color: white
            font-size: 14px
          .affiliationkey
            display: flex
            flex-direction: row
            align-items: center
            #affiliation-question-icon:hover
              cursor: pointer
            .show-email-button
              padding: 10px
              border-radius: 5px
              width: 80px
              color: white
              font-size: 14px
              background-color: #ffa214
              text-align: center
              margin-left: 10px
            .show-email-button:hover
              cursor: pointer
            input
              height: 20px
              border-radius: 10px
              border-width: 0
              margin-right: 10px
              width: 60%
              font-size: 14px
              color: black
              background-color: white
              padding: 10px
            input:focus
              outline: none
      h1
        color: white
        font-size: 40px
        font-family: 'Roboto Regular', sans-serif
        margin: 0
      .save
        width: 100px
        height: 20px
        background-color: #ffa214
        padding: 15px
        color: white
        font-weight: bold
        font-size: 14px
        text-align: center
        margin-top: 15px
        border-radius: 10px
        display: flex
        justify-content: center
        align-items: center
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)
        .loader
          height: 8px
          width: 8px
      .save:hover
        cursor: pointer
    .panel
      overflow: hidden
      padding: 20px
      position: absolute
      bottom: -130px
      right: 0
      width: 85%
      .panel-wrapper
        align-items: start
        display: flex
        justify-content: start
        flex-flow: column wrap
        padding: 50px 0 30px 0
        height: 300px
        .big-card
          width: 500px
        .card
          width: 300px
        .card, .big-card
          height: 100%
          box-sizing: border-box
          background-color: white
          margin-right: 20px
          border-radius: 15px
          padding: 20px
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
          .loader-container
            display: flex
            justify-content: center
            align-items: center
            height: 100%
          .card-loaded
            height: 100%
            width: 100%
          .title
            font-size: 12px
            color: #858997
            font-weight: bold
            margin-bottom: 10px
          .card-content
            height: 100%
            width: 100%
            box-sizing: border-box
            display: flex
            flex-direction: column
            justify-content: start
            align-items: center
            .password-error
              color: red
              font-size: 14px
              margin-top: 10px
            .selected-logo
              display: flex
              flex-direction: column
              align-items: start
              margin-top: 10px
              width: 100%
              .label
                font-size: 12px
                color: #858997
                margin-bottom: 5px
              .image
                height: 100px
                border-radius: 15px
                width: 70px
                background-color: #eeeeee
                display: flex
                justify-content: center
                align-items: center
                img
                  height: 30px
                  width: 30px
                  object-fit: contain
            .selected-image
              height: 100px
              display: flex
              flex-direction: column
              align-items: start
              margin-top: 10px
              width: 100%
              .label
                font-size: 12px
                color: #858997
                margin-bottom: 5px
              img
                height: 100px
                border-radius: 15px
                object-fit: cover
                width: 70px
            .images-wrapper
              width: 100%
              display: flex
              justify-content: start
              overflow: scroll
              .image
                margin-right: 10px
                img
                  height: 100px
                  border-radius: 15px
                  object-fit: cover
                  width: 70px
              .image:hover
                cursor: pointer
            .logos-wrapper
              width: 100%
              display: flex
              overflow: scroll
              .image
                margin-right: 10px
                height: 100px
                border-radius: 15px
                width: 70px
                display: flex
                justify-content: center
                align-items: center
                img
                  height: 40px
                  width: 40px
                  object-fit: contain
                  box-sizing: border-box
              .image:hover
                cursor: pointer
            .tags-container
              display: flex
              flex-wrap: wrap
              overflow: scroll
              width: 100%
              margin-top: 10px
              margin-bottom: 10px
              .tag
                color: white
                height: 20px
                min-width: 50px
                padding: 5px 10px 5px 10px
                font-size: 12px
                display: flex
                margin-right: 5px
                margin-top: 5px
                flex-direction: row
                justify-content: center
                align-items: center
                border-radius: 20px
                p
                  flex: 1
                  text-align: center
                .tag-icon
                  width: 10px
                  height: 10px
                .tag-icon:hover
                  cursor: pointer
              .green
                background-color: #41ff25
              .purple
                background-color: purple
              .pink
                background-color: pink
            .labelized-input
              margin-top: 10px
              width: 100%
              .label
                align-self: start
                font-size: 12px
                color: #858997
                margin: 0 0 5px 5px
            #tags-input
              margin-top: 30px
            input
              height: 20px
              border-radius: 10px
              border-width: 0
              width: 90%
              font-size: 14px
              color: black
              background-color: #eeeeee
              padding: 10px
            input:focus
              outline: none
            textarea
              height: 40px
              width: 90%
              margin: 0
              border-radius: 10px
              resize: none
              border-width: 0
              font-size: 14px
              color: black
              background-color: #eeeeee
              padding: 10px
              display: inherit
            textarea:focus
              outline: none

</style>
