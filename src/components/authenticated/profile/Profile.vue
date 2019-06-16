<template>
  <div class="panel-blue">
    <div class="content">
      <h1>Votre profil</h1>
      <div class="save" @click="save">
        <div v-if="!loading">Sauvegarder</div>
        <div class="loader" v-if="loading"></div>
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
import {getCurrentBusinessInfos, getAllImages, getAllLogos, updateBusiness} from './../../../utils/api'

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
    save () {
      this.loading = !this.loading
      console.log(`tags = ${JSON.stringify(this.tags)}`)

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

      console.log(`Sending : ${JSON.stringify(params)}`)

      updateBusiness(params)
        .then((response) => {
          console.log(`update business response = ${JSON.stringify(response)}`)
          if (response.status !== 200) {
            console.log(`Error update business`)
          } else {
            this.business = response.data
            this.selectedImage = this.business.image
            this.selectedLogo = this.business.logo
          }

          this.loading = false
        })
        .catch((error) => {
          console.log(`Error updating business : ${error}`)
          this.loading = false
        })
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
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
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
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
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
                  height: 40px
                  width: 40px
                  border-radius: 20px
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
                background-color: #eeeeee
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
