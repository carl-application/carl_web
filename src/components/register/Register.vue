<template>
  <div class="page">
    <img src="./../../assets/ic_carl.png" id="logo">
    <h2>Pas encore de compte ? Créeons le ensemble !</h2>
    <div class="container">
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
          type="text"
        ></textarea>
        <div class="label">A quelle adresse vos clients vous trouveront-ils ? :</div>
        <gmap-autocomplete></gmap-autocomplete>
      </div>
      <div class="right">ok</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      description: ''
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="sass">
  .page
    display: flex
    flex-direction: column
    align-items: center
    width: 100vw
    height: 100vh
    padding: 20px
    background: linear-gradient(#007dfd, #0047fa)
    img
      width: 100px
      height: 100px
    h2
      margin: 10px 0 20px 0
      font-size: 20px
      color: white
    .container
      display: flex
      flex-direction: row
      align-items: start
      width: 90%
      padding: 10px
      flex: 1
      .left
        flex: 1
      .right
        flex: 1
        background-color: yellow

      .label
        font-size: 14px
        color: white
        font-weight: bold
        margin-bottom: 5px
        margin-top: 15px
        padding-left: 5px
      textarea
        height: 40px
        width: 400px
        border-radius: 10px
        resize: none
        border-width: 0
        font-size: 14px
        color: black
        background-color: white
        padding: 10px
      textarea:focus
        outline: none
      input
        height: 20px
        width: 300px
        border-radius: 10px
        border-width: 0
        font-size: 14px
        color: black
        background-color: white
        padding: 10px
      input:focus
        outline: none
</style>
