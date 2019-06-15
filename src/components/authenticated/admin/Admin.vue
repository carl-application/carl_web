<template>
  <div class="container">
    <v-dialog/>
    <h2>Ajouter une image de fond possible</h2>
    <div class="images">
      <div class="selector">
        <input
          type="file"
          multiple accept="image/*"
          @change="onFilePicked($event)"
          ref="fileInput"
        >
        <div class="buttons">
          <div
            class="button"
            @click="pickFile"
          >Sélectionner une image</div>
          <div
            class="button"
            @click="uploadImage"
          >
            <div class="loader" v-show="sendingImage"></div>
            <div v-show="!sendingImage">Ajouter l'image</div>
          </div>
        </div>
        <img :src="imageUrl" v-if="hasPickedImage"/>
      </div>
      <div class="existing-images">
        <div class="loader-container" v-show="loadingExistingImages">
          <div class="loader"></div>
        </div>
        <div
          class="image"
          v-for="(value, index) in existingImages"
          v-bind:key="index"
        >
          <img :src="getUrlFromImage(value)"/>
          <div class="delete" @click="deleteImage(value)">Supprimer</div>
        </div>
      </div>
    </div>

    <h2>Ajouter un logo possible</h2>
    <div class="images">
      <div class="selector">
        <input
          type="file"
          multiple accept="image/*"
          @change="onLogoFilePicked($event)"
          ref="logoFileInput"
        >
        <div class="buttons">
          <div
            class="button"
            @click="pickLogoFile"
          >Sélectionner un logo</div>
          <div
            class="button"
            @click="uploadLogo"
          >
            <div class="loader" v-show="sendingLogo"></div>
            <div v-show="!sendingLogo">Ajouter le logo</div>
          </div>
        </div>
        <div class="logo-container">
          <img :src="logoUrl" v-if="hasPickedLogo"/>
        </div>
      </div>
      <div class="existing-images">
        <div class="loader-container" v-show="loadingExistingLogos">
          <div class="loader"></div>
        </div>
        <div
          class="image"
          v-for="(value, index) in existingLogos"
          v-bind:key="index"
        >
          <div class="logo-container">
            <img :src="getUrlFromImage(value)"/>
          </div>
          <div class="delete" @click="deleteLogo(value)">Supprimer</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'
import 'firebase/storage'
import {adminCreateImage, getAllImages, adminDeleteImage, getAllLogos} from './../../../utils/api'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSENGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}
firebase.initializeApp(firebaseConfig)

export default {
  data () {
    return {
      file: File,
      logoFile: File,
      imageUrl: null,
      logoUrl: null,
      isSendingImage: false,
      isSendingLogo: false,
      existingImages: [],
      existingLogos: [],
      isLoadingExistingImages: false,
      isLoadingExistingLogos: false
    }
  },
  mounted () {
    this.loadExistingImages()
    this.loadExistingLogos()
  },
  computed: {
    loadingExistingImages () {
      return this.isLoadingExistingImages
    },
    loadingExistingLogos () {
      return this.isLoadingExistingLogos
    },
    sendingLogo () {
      return this.isSendingLogo
    },
    sendingImage () {
      return this.isSendingImage
    },
    hasPickedImage () {
      return this.imageUrl
    },
    hasPickedLogo () {
      return this.logoUrl
    }
  },
  methods: {
    pickLogoFile () {
      this.$refs.logoFileInput.click()
    },
    pickFile () {
      this.$refs.fileInput.click()
    },
    onLogoFilePicked (event) {
      this.logoFile = event.target.files[0]
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.logoUrl = fileReader.result
      })
      fileReader.readAsDataURL(this.logoFile)
    },
    onFilePicked (event) {
      this.file = event.target.files[0]
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(this.file)
    },
    async loadExistingImages () {
      this.isLoadingExistingImages = true
      try {
        const response = await getAllImages()
        this.existingImages = response.data
        this.isLoadingExistingImages = false
      } catch (error) {
        console.log(`Error retrieving all images ${error}`)
        this.isLoadingExistingImages = false
      }
    },
    async loadExistingLogos () {
      this.isLoadingExistingLogos = true
      try {
        const response = await getAllLogos()
        this.existingLogos = response.data
        this.isLoadingExistingLogos = false
      } catch (error) {
        console.log(`Error retrieving all logos ${error}`)
        this.isLoadingExistingLogos = false
      }
    },
    async uploadLogo () {
      if (!this.isSendingLogo) {
        this.isSendingLogo = true
        const fileName = this.logoFile.name
        try {
          await firebase.storage().ref(`logos/${fileName}`).put(this.logoFile)
          const url = await firebase.storage().ref(`logos/${fileName}`).getDownloadURL()
          const response = await adminCreateImage(url, 'logo')
          if (response.status === 200) {
            this.notifySuccess()
            this.loadExistingLogos()
          } else {
            this.notifyError()
          }
          this.isSendingLogo = false
        } catch (error) {
          console.error(`Error uploading logo : ${error}`)
          this.isSendingLogo = false
        }
      }
    },
    async uploadImage () {
      if (!this.isSendingImage) {
        this.isSendingImage = true
        const fileName = this.file.name
        try {
          await firebase.storage().ref(`images/${fileName}`).put(this.file)
          const url = await firebase.storage().ref(`images/${fileName}`).getDownloadURL()
          const response = await adminCreateImage(url)
          if (response.status === 200) {
            this.notifySuccess()
            this.loadExistingImages()
          } else {
            this.notifyError()
          }
          this.isSendingImage = false
        } catch (error) {
          console.error(`Error uploading image : ${error}`)
          this.isSendingImage = false
        }
      }
    },
    async deleteImage (image) {
      this.showConfirmationDialog(image.id)
    },
    async deleteLogo (image) {
      this.showConfirmationDialog(image.id)
    },
    async confirmDeletion (imageId) {
      this.$modal.hide('dialog')
      this.isLoadingExistingImages = true
      try {
        await adminDeleteImage(imageId)
        this.loadExistingImages()
        this.loadExistingLogos()
      } catch (error) {
        console.log(`Error deleting image ${error}`)
        this.isLoadingExistingImages = false
      }
    },
    showConfirmationDialog (imageId) {
      this.$modal.show('dialog', {
        title: 'Suppression d\'image',
        text: 'Etes-vous sur de vouloir supprimer cette image ?',
        buttons: [
          {
            title: 'Valider',
            handler: () => {
              this.confirmDeletion(imageId)
            }
          },
          {
            title: 'Annuler'
          }
        ]
      })
    },
    getUrlFromImage (image) {
      return image.url
    },
    notifySuccess () {
      this.$notify({
        group: 'notifications',
        type: 'success',
        duration: '8000',
        title: 'Succès de l\'envoi',
        text: `L'image a correctement été ajoutée`
      })
    },
    notifyError () {
      this.$notify({
        group: 'notifications',
        type: 'error',
        duration: '8000',
        title: 'Echec de l\'envoi',
        text: `L'image n'a pas correctement été ajoutée`
      })
    }
  }
}
</script>

<style scoped lang="sass">
  .container
    display: flex
    flex-direction: column
    padding: 30px
    h2
      font-size: 20px
      color: #858997
      margin-bottom: 15px
    .loader
      width: 10px
      height: 10px
    .images
      display: flex
      flex-direction: column
      .selector
        display: flex
        height: 200px
        align-items: center
      .existing-images
        width: 80%
        overflow: scroll
        height: 200px
        display: flex
        align-items: center
        .image
          margin-right: 10px
          display: flex
          flex-direction: column
          align-items: center
        .loader-container
          width: 100%
          height: 100%
          display: flex
          justify-content: center
          align-items: center
        .delete
          background-color: red
          margin-top: 10px
          padding: 10px
          border-radius: 10px
          color: white
          font-size: 12px
          width: 60px
          text-align: center
        .delete:hover
          cursor: pointer
      .buttons
        display: flex
        flex-direction: column
        margin-right: 20px
        .button
          background: linear-gradient(#007dfd, #0047fa)
          padding: 10px
          border-radius: 20px
          font-size: 14px
          width: 200px
          height: 15px
          color: white
          text-align: center
          margin-top: 10px
          display: flex
          justify-content: center
          align-items: center
        .button:hover
          cursor: pointer
      input
        display: none
      img
        height: 130px
        border-radius: 15px
        object-fit: cover
        width: 100px
      .logo-container
        height: 130px
        border-radius: 15px
        width: 100px
        background-color: #858997
        display: flex
        justify-content: center
        align-items: center
        img
          width: 40px
          height: 40px
          object-fit: contain
          border-radius: 20px

</style>
