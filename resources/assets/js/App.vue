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
      <Footer />
    </div>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { INTERNAL_SERVER_ERROR } from "./util";
import myMixin from "./util";

export default {
  components: {
    Navbar,
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
    this.$store.dispatch("tag/loadTagVideo");
    this.$store.dispatch("playlist/loadPlaylist");
    this.$store.dispatch("like/loadTagLike");
    this.$store.dispatch("likePlaylist/loadPlaylistLike");
  }
};
</script>
<style>
@import "../css/styles.css";
</style>
