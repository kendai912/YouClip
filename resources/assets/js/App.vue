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
  data() {
    return {
      jsonld: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "ホーム",
              item: "https://youclip.jp",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "再生",
              item: "https://youclip.jp/watch",
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "まとめ作成",
              item: "https://youclip.jp/youtube",
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "マイページ",
              item: "https://youclip.jp/mypage",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "ログイン",
              item: "https://youclip.jp/login",
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "マイページ",
              item: "https://youclip.jp/mypage",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "新規登録",
              item: "https://youclip.jp/register",
            },
          ],
        },
      ],
    };
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
};
</script>
<script v-html="jsonld" , type="application/ld+json"></script>

<style>
@import "../css/styles.css";
</style>
