<template>
  <v-app-bar color="white" dense>
    <v-toolbar-title>
      <router-link class="navbar__brand" to="/">YouClip</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="navbar__menu">
      <div v-if="isLogin" class="navbar__item">
        <button v-if="isLogin" class="button button--link" v-on:click="logout">Logout</button>
      </div>
      <div v-else class="navbar__item">
        <RouterLink class="button button--link" to="/login">Login</RouterLink>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      if (this.apiStatus) {
        this.$router.push("/login");
      }
    }
  },
  computed: {
    ...mapGetters({
      username: "auth/username"
    }),
    ...mapState({
      apiStatus: state => state.auth.apiStatus
    }),
    ...mapGetters({
      isLogin: "auth/check"
    })
  },
  created() {}
};
</script>
