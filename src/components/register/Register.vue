<template>
  <div class="page">
    <img src="./../../assets/ic_carl.png" id="logo">
    <h2>Créons votre compte ensemble !</h2>
    <div class="error-container" v-if="hasError">
      <p>{{error}}</p>
    </div>
    <div class="part" v-if="isPart1()">
      <div class="left">
        <div class="label">Nom :</div>
        <input
          required v-model="name"
          placeholder="Nom de l'entité"
          type="text"
        />
        <div class="label">Une petite description de votre programme de fidélité :</div>
        <textarea
          required v-model="description"
          placeholder="1 plat acheté pour 1 plat offert !"
        ></textarea>
        <div class="label">A quelle adresse vos clients vous trouveront-ils ? :</div>
        <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
        <div class="label">Combien de points un client doit-il obtenir ?:</div>
        <input
          required v-model="nbPoints"
          placeholder="10"
          type="number"
          aria-valuemin="0"
        />
      </div>
      <div class="right">
        <div class="top">
          <h3>Informations générales</h3>
          <p>Ces informations sont votre fiche d'identité !</p>
          <p>Pensez à donner une description basique et simple de votre système de fidélité, ne cherchez pas trop loin, cela doit être tape à l'oeil!</p>
        </div>
        <div class="bottom">
          <div class="button" @click="next">Passons à la suite</div>
        </div>
      </div>
    </div>
    <div class="part" v-if="isPart2()">
      <div class="left">
        <div class="label">Choisissez l'image de fond de votre carte :</div>
        <div class="images-container">
          <div class="loader-container" v-show="imagesLoading"><div class="loader"></div></div>
            <div class="images-wrapper">
              <div
                class="image"
                v-show="!imagesLoading"
                v-for="(value, index) in images"
                v-bind:key="index"
                @click="select(value)"
              >
                <img :src="getUrl(value)">
              </div>
            </div>
        </div>
        <div class="label">Image choisie :</div>
        <div class="selected-image" v-show="!imagesLoading">
          <img :src="getUrl(selectedImage)">
        </div>
      </div>
      <div class="right">
        <div class="top">
          <h3>Choix d'une image</h3>
          <p>Cette image apparaîtra comme image de fond de votre carte de fidélité</p>
          <p>Pour préserver une certaine esthetique, nous proposons un choix varié d'images</p>
        </div>
        <div class="bottom">
          <div class="button" @click="prev">Précédent</div>
          <div class="button" @click="next">Passons à la suite</div>
        </div>
      </div>
    </div>
    <div class="part" v-if="isPart3()">
      <div class="left">
        <div class="label">Choisissez le logo qui se posera sur votre image :</div>
        <div class="images-container">
          <div class="loader-container" v-show="logosLoading"><div class="loader"></div></div>
            <div class="images-wrapper">
              <div
                class="image"
                v-show="!logosLoading"
                v-for="(value, index) in logos"
                @click="selectLogo(value)"
                v-bind:key="index"
              >
                <div class="logo-container">
                  <div class="logo">
                    <img :src="getUrl(value)"/>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="label">Logo choisi :</div>
        <div class="selected-logo-container"  v-show="!logosLoading">
          <div class="selected-logo">
            <img :src="getUrl(selectedLogo)">
          </div>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <h3>Choix d'un logo</h3>
          <p>Ce logo, c'est la deuxième touche d'unicité de votre carte, alors choixissez le bien !</p>
          <p>Vous pourrez plus tard mettre votre propre logo avec la version premium :)</p>
        </div>
        <div class="bottom">
          <div class="button" @click="prev">Précédent</div>
          <div class="button" @click="next">Passons à la suite</div>
        </div>
      </div>
    </div>
    <div class="part" v-if="isPart4()">
      <div class="left">
        <div class="label">Ajoutez des tags correpondants à votre enseigne :</div>
        <input
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
      <div class="right">
        <div class="top">
          <h3>Choix des tags</h3>
          <p>Les tags sont les petits "plus" qui caractérisent votre entreprise !</p>
        </div>
        <div class="bottom">
          <div class="button" @click="prev">Précédent</div>
          <div class="button" @click="next">Passons à la suite</div>
        </div>
      </div>
    </div>
    <div class="part" v-if="isPart5()">
      <div class="left">
        <div class="label">Email :</div>
        <input
          required v-model="email"
          placeholder="Votre email"
          type="email"
        />
        <div class="label">Mot de passe :</div>
        <input
          required v-model="password"
          placeholder="Un mot de passe"
          type="password"
        />
        <div class="label">Confirmation :</div>
        <input
          required v-model="passwordConfirmation"
          placeholder="Un mot de passe"
          type="password"
        />
      </div>
      <div class="right">
        <div class="top">
          <h3>Identifiants</h3>
          <p>Un dernier petit effort !</p>
        </div>
        <div class="bottom">
          <div class="button" @click="prev">Précédent</div>
          <div class="button" @click="register">
            <div v-if="!isLoading">Valider</div>
            <div class="loader" v-if="loading"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getAllImages, getAllLogos} from './../../utils/api'
import VueScroll from 'vuescroll/dist/vuescroll-slide'
import {REGISTER_REQUEST} from '../../store/actions/auth'
import {REGISTER_STATUS_LOADING} from '../../store/status/auth'

export default {
  components: {VueScroll},
  data () {
    return {
      name: '',
      description: '',
      nbPoints: null,
      images: [],
      logos: [],
      imagesLoading: true,
      logosLoading: true,
      tags: [],
      address: null,
      tagModel: null,
      currentPart: 1,
      selectedImage: '',
      selectedLogo: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      error: null
    }
  },
  methods: {
    isPart1 () {
      return this.currentPart === 1
    },
    isPart2 () {
      return this.currentPart === 2
    },
    isPart3 () {
      return this.currentPart === 3
    },
    isPart4 () {
      return this.currentPart === 4
    },
    isPart5 () {
      return this.currentPart === 5
    },
    next () {
      if (this.currentPart === 1) {
        if (!this.name || !this.address || !this.nbPoints) {
          this.error = 'Tous les champs doivent être renseignés'
          return
        }
      }
      this.error = null
      this.currentPart += 1
    },
    prev () {
      this.error = null
      this.currentPart -= 1
    },
    setPlace (a) {
      this.address = a.formatted_address
    },
    getUrl (value) {
      return value.url
    },
    select (value) {
      this.selectedImage = value
    },
    selectLogo (value) {
      this.selectedLogo = value
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
    register () {
      if (!this.email || !this.password || !this.passwordConfirmation) {
        this.error = 'Tous les champs doivent être renseignés'
        return
      }
      if (this.password !== this.passwordConfirmation) {
        this.error = 'Les deux mots de passe ne sont pas identiques'
        return
      }

      this.loading = true
      this.error = null
      const registerData = {
        email: this.email,
        password: this.password,
        name: this.name,
        address: this.address,
        nbPoints: this.nbPoints,
        description: this.description,
        selectedImage: this.selectedImage,
        selectedLogo: this.selectedLogo,
        tags: this.tags
      }
      this.$store.dispatch(REGISTER_REQUEST, registerData)
        .then(() => {
          this.$router.push('Dashboard')
        }).catch((_) => {
        })
    }
  },
  computed: {
    hasError () {
      return this.error
    },
    isLoading () {
      return this.$store.getters.authStatus === REGISTER_STATUS_LOADING
    }
  },
  mounted () {
    getAllImages()
      .then((response) => {
        this.images = response.data
        this.selectedImage = this.images[0]
        this.imagesLoading = false
      })
      .catch((error) => {
        console.error(`Error retrieving all images = ${error}`)
      })

    getAllLogos()
      .then((response) => {
        this.logos = response.data
        this.selectedLogo = this.logos[0]
        this.logosLoading = false
      })
      .catch((error) => {
        console.error(`Error retrieving all logos = ${error}`)
      })
  }
}
</script>

<style scoped lang="sass">
  .loader
    height: 8px
    width: 8px
  .error-container
    height: 20px
    display: flex
    margin-bottom: 15px
    padding: 10px 20px 10px 20px
    background-color: #c85c58
    font-size: 16px
    color: white
    justify-content: center
    align-items: center
    border-radius: 10px

  .part
    display: flex
    width: 90%
    .left
      flex: 1
    .right
      flex: 1
      display: flex
      flex-direction: column
      min-height: 300px
      justify-content: space-between
      .top
        display: flex
        flex-direction: column
      .bottom
        display: flex
        flex-direction: row
        .button
          display: flex
          justify-content: center
          align-items: center
          background-color: white
          margin-right: 10px
          width: 150px
          padding: 10px
          font-size: 14px
          text-align: center
          border-radius: 10px
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
        .button:hover
          cursor: pointer
        .button:active
          background-color: whitesmoke
      p
        font-size: 14px
        margin: 5px 0 0 0
        color: white

  .__panel
   margin-bottom: 30px
  .page
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    padding: 20px 20px 200px 20px
    background: linear-gradient(#007dfd, #0047fa)
    .label
      font-size: 14px
      color: white
      font-weight: bold
      margin-bottom: 5px
      margin-top: 15px
      padding-left: 5px
    img
      width: 150px
      height: 150px
    h2
      margin: 20px 0 20px 0
      font-size: 26px
      color: white
    .tags-container
      display: flex
      width: 60%
      height: 60px
      overflow: scroll
      margin-top: 10px
      .tag
        color: white
        height: 20px
        min-width: 50px
        padding: 5px 10px 5px 10px
        font-size: 12px
        display: flex
        margin-right: 5px
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
    .top
      display: flex
      flex-direction: row
      align-items: start
      width: 90%
      height: 100%
      padding: 10px
      flex: 1
      .left
        flex: 1
        .label
          margin-top: 25px

      .right
        min-height: 300px
        flex: 1
    .selected-logo-container
      background-color: grey
      display: flex
      height: 140px
      width: 100px
      margin-top: 15px
      justify-content: center
      align-items: center
      border-radius: 20px
      .selected-logo
        img
          object-fit: cover
          height: 40px
          border-radius: 50px
          width: 40px
    .selected-image
      margin-top: 30px
      img
        object-fit: cover
        height: 140px
        border-radius: 20px
        width: 100px
    h3
      font-size: 22px
      color: white
      text-align: start
      display: inline
      margin: 0
    textarea
      height: 40px
      width: 60%
      margin: 0
      border-radius: 10px
      resize: none
      border-width: 0
      font-size: 14px
      color: black
      background-color: white
      padding: 10px
      display: inherit
    textarea:focus
      outline: none
    .loader-container
      display: flex
      justify-content: center
      align-items: center
      width: 100%
      height: 100%
    .images-container
      margin-top: 20px
      overflow: hidden
      height: 140px
      .images-wrapper
        display: flex
        width: 70%
        overflow: scroll
        .logo-container
          width: 100px
          height: 140px
          border-radius: 20px
          background-color: gray
          display: flex
          justify-content: center
          align-items: center
          .logo
            img
              object-fit: cover
              height: 40px
              width: 40px
        .image:hover
          cursor: pointer
        .image
          margin-right: 20px
          height: 100%
          img
            object-fit: cover
            height: 140px
            width: 100px
            border-radius: 20px
    input
      height: 20px
      width: 60%
      border-radius: 10px
      border-width: 0
      font-size: 14px
      color: black
      background-color: white
      padding: 10px
    input:focus
      outline: none
</style>
