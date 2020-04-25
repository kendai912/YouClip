<template>
  <v-bottom-navigation fixed v-bind:value="activeBtn" grow color="primary">
    <v-btn to="/home" v-on:click="saveFooterTabIndex(0)">
      <span>ホーム</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/search" v-on:click="saveFooterTabIndex(1)">
      <span>検索</span>
      <i class="fas fa-search fa-2x"></i>
    </v-btn>

    <v-btn to="/tagging" v-on:click="saveFooterTabIndex(2)">
      <span>シーン登録</span>
      <v-icon>mdi-plus-circle</v-icon>
    </v-btn>

    <v-btn to="/mypage" v-on:click="saveFooterTabIndex(3)">
      <span>マイページ</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      activeBtn: 0
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      if (this.apiStatus) {
        this.$router.push("/login");
      }
    },
    //開いたタブをセッションストレージに保存
    saveFooterTabIndex(index) {
      window.sessionStorage.setItem("footerTabIndex", JSON.stringify(index));
    }
  },
  computed: {
    ...mapState({
      apiStatus: state => state.auth.apiStatus
    }),
    ...mapGetters({
      isLogin: "auth/check"
    })
  },
  mounted() {
    //以前に開いていたタブをセッションストレージからセット
    this.activeBtn = parseInt(window.sessionStorage.getItem("footerTabIndex"));
  }
};
</script>
