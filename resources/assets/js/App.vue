<template>
  <v-app>
    <div>
      <Navbar v-if="showNavbar" />
      <RouterView />
      <Snackbar />
      <Footer />
    </div>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Navbar from "./components/Navbar.vue";
import Snackbar from "./components/Snackbar.vue";
import Footer from "./components/Footer.vue";
import { INTERNAL_SERVER_ERROR, FORBIDDEN, UNAUTHORIZED } from "./util";
import myMixin from "./util";

export default {
  components: {
    Navbar,
    Snackbar,
    Footer,
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      showNavbar: "navbar/showNavbar",
      auth_check: "auth/check",
    }),
    errorCode() {
      return this.$store.state.error.code;
    },
  },
  watch: {
    errorCode: {
      handler(val) {
        if (val === INTERNAL_SERVER_ERROR) {
          this.$router.push("/500");
        } else if (val === FORBIDDEN) {
          this.$router.push("/403");
        } else if (val === UNAUTHORIZED) {
          this.$store.commit("auth/setUser", null);
          this.$router.push("/login");
        }
      },
      immediate: true, //createdと同じ
    },
    $route() {
      this.$store.commit("error/setCode", null);
    },
  },
  created() {
    this.$store.dispatch("like/loadTagLike");
    this.$store.dispatch("likePlaylist/loadPlaylistLike");

    //URLのtoastパラメータを見てトーストを表示
    if (window.sessionStorage.getItem("deleteSuccess")) {
      this.$store.commit("snackbar/setText", "シーンタグを削除しました");
      this.$store.commit("snackbar/setSnackbar", true);
      this.$store.commit("snackbar/setTimeout", 5000);
      window.sessionStorage.removeItem("deleteSuccess");
    }
  },
};
</script>
<style>
@import "../css/styles.css";
</style>
