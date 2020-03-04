<template>
  <nav class="navbar">
    <RouterLink class="navbar__brand" to="/">
      ScenePicks
    </RouterLink>
    <div class="navbar__menu">
      <div v-if="isLogin" class="navbar__item">
        <button v-if="isLogin" class="button button--link" v-on:click="logout">
          Logout
        </button>
      </div>
      <div v-else class="navbar__item">
        <RouterLink class="button button--link" to="/login">
          Login / Register
        </RouterLink>
      </div>
    </div>
  </nav>
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
    // username() {
    //   return this.$store.getters["auth/username"];
    // },
    // isLogin() {
    //   return this.$store.getters["auth/check"];
    // }
    ...mapGetters({
      username: "auth/username"
    }),
    ...mapState({
      apiStatus: state => state.auth.apiStatus
    }),
    ...mapGetters({
      isLogin: "auth/check"
    })
  }
};
</script>
