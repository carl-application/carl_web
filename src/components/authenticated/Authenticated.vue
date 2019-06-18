<template>
  <div class="container">
    <div class="nav-bar">
      <!--<img src="./../../assets/logo.png" id="logo">-->
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
      return this.$store.getters.business && this.$store.getters.business.account.isAdmin
    },
    getAdminLogo () {
      if (!this.$store.getters.business.logo) return ''
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
