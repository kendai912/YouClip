<template>
  <v-app>
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <div class="container">
          <RouterView />
        </div>
      </main>
      <Snackbar />
      <Footer />
    </div>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Snackbar from "./components/Snackbar.vue";
import Footer from "./components/Footer.vue";
import { INTERNAL_SERVER_ERROR } from "./util";
import myMixin from "./util";

export default {
  components: {
    Navbar,
    Snackbar,
    Footer
  },
  mixins: [myMixin],
  computed: {
    errorCode() {
      return this.$store.state.error.code;
    }
  },
  watch: {
    errorCode: {
      handler(val) {
        if (val === INTERNAL_SERVER_ERROR) {
          this.$router.push("/500");
        }
      },
      immediate: true //createdと同じ
    },
    $route() {
      this.$store.commit("error/setCode", null);
    }
  },
  created() {
    this.$store.dispatch("like/loadTagLike");
    this.$store.dispatch("likePlaylist/loadPlaylistLike");

    //URLのtoastパラメータを見てトーストを表示
    if (window.sessionStorage.getItem("updateSuccess")) {
      this.$store.commit("snackbar/setColor", "blue");
      this.$store.commit("snackbar/setText", "シーンタグを更新しました");
      this.$store.commit("snackbar/setSnackbar", true);
      window.sessionStorage.removeItem("updateSuccess");
    } else if (window.sessionStorage.getItem("deleteSuccess")) {
      this.$store.commit("snackbar/setColor", "grey lighten-1");
      this.$store.commit("snackbar/setText", "シーンタグを削除しました");
      this.$store.commit("snackbar/setSnackbar", true);
      window.sessionStorage.removeItem("deleteSuccess");
    }
  }
};
</script>
<style>
@import "../css/styles.css";
</style>
