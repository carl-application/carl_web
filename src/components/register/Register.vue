<template>
  <div class="page">
    <img src="./../../assets/ic_carl.png" id="logo">
    <h2>Créons votre compte ensemble !</h2>
    <div class="top">
      <div class="left">
        <h3>Informations générales</h3>
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
          type="text"
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
        <h3>Faites-vous beau pour vos clients !</h3>
        <div class="label">Choisissez l'image de fond de votre carte :</div>
        <div class="images-container">
          <div class="loader-container" v-show="imagesLoading"><div class="loader"></div></div>
          <vue-scroll :ops="ops">
            <div class="images-wrapper">
              <div
                class="image"
                v-show="!imagesLoading"
                v-for="(value, index) in images"
                v-bind:key="index"
              >
                <img :src="getUrl(value)">
              </div>
            </div>
          </vue-scroll>
        </div>
        <div class="label">Choisissez le logo qui se posera dessus :</div>
        <div class="images-container">
          <div class="loader-container" v-show="logosLoading"><div class="loader"></div></div>
          <vue-scroll :ops="ops">
            <div class="images-wrapper">
              <div
                class="image"
                v-show="!logosLoading"
                v-for="(value, index) in logos"
                v-bind:key="index"
              >
                <div class="logo-container">
                  <div class="logo">
                    <img :src="getUrl(value)"/>
                  </div>
                </div>
              </div>
            </div>
          </vue-scroll>
        </div>
      </div>
    </div>
    <div class="bottom">
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
  </div>
</template>

<script>
import {getAllImages, getAllLogos} from './../../utils/api'
import VueScroll from 'vuescroll/dist/vuescroll-slide'
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
      tagModel: null,
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
          background: '#FFFFFF',
          keepShow: true
        }
      }
    }
  },
  methods: {
    setPlace (a) {
      console.log(`${JSON.stringify(a)}`)
    },
    getUrl (value) {
      return value.url
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
      console.log(`ok`)
      this.tags.splice(index, 1)
    }
  },
  mounted () {
    getAllImages()
      .then((response) => {
        this.images = response.data
        this.imagesLoading = false
      })
      .catch((error) => {
        console.error(`Error retrieving all images = ${error}`)
      })

    getAllLogos()
      .then((response) => {
        this.logos = response.data
        this.logosLoading = false
      })
      .catch((error) => {
        console.error(`Error retrieving all logos = ${error}`)
      })
  }
}
</script>

<style scoped lang="sass">
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
    .bottom
      display: flex
      flex-direction: column
      margin-top: 30px
      width: 90%
      align-items: start
      .tags-container
        display: flex
        width: 50%
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
          text-align: center
          border-radius: 20px
          p
            flex: 1
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
      padding: 10px
      flex: 1
      .left
        flex: 1
        .label
          margin-top: 25px
      .right
        flex: 1

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
