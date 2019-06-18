<template>
  <div class="container">
    <h2>What informations do we collect ?</h2>
    <p>We only collect informations that are needed in order for the application to work well.</p>
    <p>Are collected the basic informations asked when registering as a user :</p>
    <ul>
      <li>Name</li>
      <li>Email address</li>
      <li>Birth date</li>
      <li>Sex</li>
    </ul>
    <div class="important">
      <p>The email address will NEVER be accessible for businesses.</p>
      <p>Email address is only used in order to be able to retrieve user's password if needed and to be able to send news to users.</p>
    </div>
    <h2>Why do we collect these informations ?</h2>
    <p>The idea of the application is to give businesses data about their customers.</p>
    <p>That is why we collect these data</p>
    <div class="important">
      <p>Because the businesses will never have access to the email addresses, the informations given to businesses will never be linked to users !</p>
      <p>Users will always be anonymous in the application</p>
    </div>

    <h2>Why do we need an access to the camera in the application ?</h2>
    <p>Accessing the camera of your device enable us to scan the businesses QRCode in order to valid a visit</p>
    <p>Camera is only used in this purpose and no images are stored</p>

    <h2>Changes to our Privacy Policy</h2>
    <p>If we decide to change our privacy policy, we will post those changes on this page.</p>

    <h2>Contact us</h2>
    <p>If there are any questions regarding this privacy policy you may contact us using the information below.</p>
    <p>carl.fidelity@gmail.com</p>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="sass">
  .container
    background: linear-gradient(#007dfd, #0047fa)
    display: flex
    flex-direction: column
    align-items: start
    padding: 20px 0 0 100px
    h2
      color: white
      font-size: 22px
      font-weight: bold
    p
      font-size: 16px
      color: black
    .important
      background-color: rosybrown
      padding: 10px
      border-radius: 10px
      margin-top: 10px
      p
        color: white
</style>
