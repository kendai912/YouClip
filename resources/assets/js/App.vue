<template>
  <v-app>
    <div>
      <Navbar v-if="showNavbar" />
      <div id="searchDropdown" />
      <RouterView />
      <Snackbar />
      <Footer />
    </div>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
// import Navbar from "./components/Navbar.vue";
const Navbar = () => import("./components/Navbar.vue");
// import Snackbar from "./components/Snackbar.vue";
const Snackbar = () => import("./components/Snackbar.vue");
// import Footer from "./components/Footer.vue";
const Footer = () => import("./components/Footer.vue");
import { INTERNAL_SERVER_ERROR, FORBIDDEN, UNAUTHORIZED } from "./util";
import myMixin from "./util";

export default {
  components: {
    Navbar,
    Snackbar,
    Footer,
  },
  data() {
    return {};
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
    //URLのtoastパラメータを見てトーストを表示
    if (window.sessionStorage.getItem("deleteSuccess")) {
      this.$store.commit("snackbar/setText", "シーンタグを削除しました");
      this.$store.commit("snackbar/setSnackbar", true);
      this.$store.commit("snackbar/setTimeout", 5000);
      window.sessionStorage.removeItem("deleteSuccess");
    }
  },
  mounted() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(function(registration) {
          console.log("SW registration successful: ", registration.scope);
        })
        .catch(function(err) {
          console.log("SW registration failed: ", err);
        });
    }
  },
};
</script>

<style>
@import "../css/styles.css";
</style>
