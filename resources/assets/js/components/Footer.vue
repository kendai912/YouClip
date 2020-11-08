<template>
  <v-bottom-navigation fixed v-bind:value="activeBtn" grow color="primary" class="my-footer-menu">
    <v-btn class="btn-footer my-footer-icon" to="/home" v-on:click="saveFooterTabIndex(0)">
      <span>ホーム</span>
      <v-icon>mdi-home-outline</v-icon>
    </v-btn>
    <v-btn class="btn-footer my-footer-home-icon my-footer-icon" to="/tagging" v-on:click="openHighlight(1)">
      <span>まとめ作成</span>
      <div>
        <v-icon>mdi-plus-circle-outline</v-icon>
      </div>
    </v-btn>

    <v-btn class="btn-footer my-footer-icon" to="/mypage" v-on:click="saveFooterTabIndex(2)">
      <span>マイページ</span>
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      activeBtn: 0,
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
    },
    openHighlight(index) {
      this.saveFooterTabIndex(index);

      // 表示するコンポーネントをYTvideoSelectBoxにセットし、まとめ作成ページに遷移
      this.$store.commit("highlight/setDisplayComponent", "YTvideoSelectBox");
      this.$router.push({
        path: "/highlight",
      });
    },
  },
  computed: {
    ...mapState({
      apiStatus: (state) => state.auth.apiStatus,
    }),
    ...mapGetters({
      isLogin: "auth/check",
    }),
  },
  mounted() {
    //以前に開いていたタブをセッションストレージからセット
    this.activeBtn = parseInt(window.sessionStorage.getItem("footerTabIndex"));
  },
};
</script>
