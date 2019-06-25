<template>
  <div class="container">
    <modal
      name="premium-modal"
      :width="'50%'"
      :height="'50%'"
    >
      <div class="modal-container">
        <div class="content">
          <div class="left">
            <h2>Moyen de paiement</h2>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick">
              <input type="hidden" name="hosted_button_id" value="Q7DAS2PPKVXWC">
              <input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal, le réflexe sécurité pour payer en ligne">
              <img alt="" border="0" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1">
            </form>
          </div>
          <div class="right">
            <h2>Devenir premium ?</h2>
            <p>Devenir premium, c'est avoir accès à un nombre illimité de notifications !</p>
            <p>Pour seulement {{getPremiumCost}} euros par mois, obtenez une réelle force marketing pour votre commerce.</p>
            <p>Vous pourrez également créer des sous-entités pour pouvoir gérer et observer les statistiques d'une chaîne de magasins !</p>
          </div>
        </div>
      </div>

    </modal>
    <div class="nav-bar">
      <div class="premium-container">
        <div class="premium" v-if="isPremium">Vous êtes premium !</div>
        <div
          class="become-premium"
          v-if="!isPremium"
          @click="showPaymentModal">Devenez premium</div>
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
import {REQUEST_AFFILIATIONS} from '../../store/actions/affiliations'

export default {
  data () {
    return {
      adminSelected: false
    }
  },
  methods: {
    showPaymentModal () {
      this.$modal.show('premium-modal')
    },
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
      return this.$store.getters.isAdmin || this.$store.getters.isPremium
    }
  },
  mounted () {
    // this.$router.push('Dashboard')
    this.$store.dispatch(REQUEST_CURRENT_BUSINESS).then(() => {
      this.$store.dispatch(REQUEST_AFFILIATIONS, this.$store.getters.isPremium)
    })
    this.$store.dispatch(REQUEST_SETTINGS)
  }
}
</script>
<style scoped src="./authenticated.css"></style>
