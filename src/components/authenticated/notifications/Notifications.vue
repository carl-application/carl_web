<template>
  <div class="panel-blue">
    <div class="content">
      <h1>Notifications</h1>
      <p class="subtitle">Evoyer une notification à un groupe d'utilisateur !</p>
      <div class="login">
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
            required v-model="shortDescription"
            placeholder="Courte description"></textarea>
          <div class="textarea-right">{{getshortDescriptionLength}}/60</div>
        </div>
        <div class="input">
          <textarea
            required v-model="description"
            placeholder="Description"></textarea>
          <div class="textarea-right">{{getDescriptionLength}}/300</div>
        </div>
        <campaign-selector id="campaign-selector"></campaign-selector>
      </div>
    </div>
  </div>
</template>

<script>
import CampaignSelector from './CampaignSelector'
export default {
  components: {CampaignSelector},
  data () {
    return {
      title: '',
      shortDescription: '',
      description: ''
    }
  },
  computed: {
    getTitleLength () {
      return this.title.length
    },
    getshortDescriptionLength () {
      return this.shortDescription.length
    },
    getDescriptionLength () {
      return this.description.length
    }
  }
}
</script>

<style scoped lang="sass">

  #campaign-selector
    width: 500px
  .content
    display: flex
    flex-direction: column
  .subtitle
    margin: 0
  .login input:focus
    outline: none
  .login textarea:focus
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

  .login input
    height: 40px
    width: 500px
    border-radius: 10px 0 0 10px
    border-width: 0
    font-size: 16px
    color: black
    background-color: #f8f9fb
    padding: 10px

  .login textarea
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
      padding: 100px

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
</style>
