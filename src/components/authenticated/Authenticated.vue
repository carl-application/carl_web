<template>
  <div class="container">
    <!--<modal
      name="premium-modal"
      :width="'50%'"
      :height="'50%'"
    >
      <div class="modal-container">
        <div class="content">
          <div class="left">
            <h2>Moyen de paiement</h2>
            <div class='credit-card-inputs' :class='{ complete }'>
              <card-number class='stripe-element card-number'
                           ref='cardNumber'
                           :stripe='stripeKey'
                           :options='options'
                           @change='number = $event.complete'
              ></card-number>
              <card-expiry class='stripe-element card-expiry'
                           ref='cardExpiry'
                           :stripe='stripeKey'
                           :options='options'
                           @change='expiry = $event.complete'
              ></card-expiry>
              <card-cvc class='stripe-element card-cvc'
                    ref='cardCvc'
                    :stripe='stripeKey'
                    :options='options'
                    @change='cvc = $event.complete'
          ></card-cvc>
            </div>
            <div class="price">{{getPremiumCost}} Euros / mois</div>
            <div class='pay-with-stripe' @click='pay' :disabled='!complete'>
              <div v-if="!isPaying">Payer</div>
              <div class="loader" v-if="isPaying"></div>
            </div>
          </div>
          <div class="right">
            <h2>Devenir premium ?</h2>
            <p>Devenir premium, c'est avoir accès à un nombre illimité de notifications !</p>
            <p>Pour seulement {{getPremiumCost}} euros par mois, obtenez une réelle force marketing pour votre commerce.</p>
          </div>
        </div>
      </div>

    </modal>-->
    <div class="nav-bar">
      <div class="premium-container">
        <div class="premium" v-if="isPremium">Vous êtes premium !</div>
        <!--<div class="become-premium"  v-if="!isPremium">Devenez premium</div>-->
      </div>
      <router-link to="Dashboard">
        <div class="nav-item">
          <div class="nav-item-left">
            <font-awesome-icon
              icon="chart-bar"
            />
          </div>
          <div class="nav-item-right">Dashboard</div>
        </div>
      </router-link>
      <router-link to="Notifications">
        <div class="nav-item">
          <div class="nav-item-left">
            <font-awesome-icon
              icon="bell"
            />
          </div>
          <div class="nav-item-right">Notifications</div>
        </div>
      </router-link>
      <router-link to="Admin" v-if="isAdmin">
        <div class="nav-item">
          <div class="nav-item-left">
            <font-awesome-icon
              icon="user-shield"
            />
          </div>
          <div class="nav-item-right">Admin</div>
        </div>
      </router-link>
      <div class="nav-item" @click.prevent="logout">
        <div class="nav-item-left"></div>
        <div class="nav-item-right">Déconnexion</div>
      </div>
      <router-link to="Profile">
        <div class="profile" v-if="hasLoadedBusiness">
          <img :src="getAdminLogo"/>
          <div class="name">{{this.$store.getters.business.name}}</div>
          <font-awesome-icon
            icon="pen"
            :style="{ color: 'black', fontSize: '12px'}"
          />
        </div>
      </router-link>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import {AUTH_LOGOUT} from '../../store/actions/auth'
import {REQUEST_CURRENT_BUSINESS} from '../../store/actions/business'
import {REQUEST_STATUS_CURRENT_BUSINESS_SUCCESS} from '../../store/status/business'
import {REQUEST_SETTINGS} from '../../store/actions/settings'
// import {subscribeToPremium} from '../../utils/api'

export default {
  data () {
    return {
      adminSelected: false
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch(AUTH_LOGOUT, {}).then(() => {
        this.$router.push('Login')
      })
    }
  },
  computed: {
    isAdminSelected () {
      return this.adminSelected
    },
    hasLoadedBusiness () {
      return this.$store.getters.businessStatus === REQUEST_STATUS_CURRENT_BUSINESS_SUCCESS
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    },
    getAdminLogo () {
      if (!this.$store.getters.business || !this.$store.getters.business.logo) return ''
      return this.$store.getters.business.logo.url
    },
    getPremiumCost () {
      if (!this.$store.getters.premiumCost) return null
      return this.$store.getters.premiumCost
    },
    isPremium () {
      return this.$store.getters.isAdmin || this.$store.isPremium
    }
  },
  mounted () {
    // this.$router.push('Dashboard')
    this.$store.dispatch(REQUEST_CURRENT_BUSINESS)
    this.$store.dispatch(REQUEST_SETTINGS)
  }
}
</script>
<style scoped src="./authenticated.css"></style>
