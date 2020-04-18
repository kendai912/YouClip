<template>
  <v-bottom-navigation fixed v-bind:value="activeBtn" grow color="primary" hide-on-scroll>
    <v-btn to="/home">
      <span>ホーム</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/search">
      <span>検索</span>
      <i class="fas fa-search fa-2x"></i>
    </v-btn>

    <v-btn to="/tagging">
      <span>シーン登録</span>
      <v-icon>mdi-plus-circle</v-icon>
    </v-btn>

    <v-btn to="/mypage">
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
      activeBtn: 1
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      if (this.apiStatus) {
        this.$router.push("/login");
      }
    }
  },
  computed: {
    ...mapState({
      apiStatus: state => state.auth.apiStatus
    }),
    ...mapGetters({
      isLogin: "auth/check"
    })
  }
};
</script>
