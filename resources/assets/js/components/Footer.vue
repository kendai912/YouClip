<template>
  <v-bottom-navigation fixed v-bind:value="activeBtn" grow color="primary">
    <v-btn to="/home" class="py-2" v-on:click="saveFooterTabIndex(0)">
      <span>ホーム</span>
      <v-icon class="outlined-icon fz-36">mdi-home</v-icon>
    </v-btn>

    <v-btn to="/tagging" v-on:click="saveFooterTabIndex(1)">
      <span>シーン登録</span>
      <v-icon class="outlined-icon fz-36">mdi-plus-circle</v-icon>
    </v-btn>

    <v-btn to="/mypage" v-on:click="saveFooterTabIndex(2)">
      <span>マイページ</span>
      <v-icon class="outlined-icon fz-36">mdi-account</v-icon>
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
