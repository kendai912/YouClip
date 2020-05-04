<template>
  <div class="container--small">
    <div v-if="isLogin">
      <MyList />
    </div>
    <v-card v-else class="text-center pa-3 ma-3" title elevation="0">
      <v-icon size="120">video_library</v-icon>
      <v-card-title class="pa-1 mt-2 justify-center">ログインが必要です</v-card-title>
      <v-card-subtitle class="pa-1 mt-0 darkgrey--text">ログインすると、イイねやタグ付けしたプレイリスト・シーンにアクセス出来ます</v-card-subtitle>
      <v-card-actions class="justify-center pa-1 mt-4">
        <v-btn v-on:click="openLoginPage" outlined style="color: rgb(6, 95, 212);">
          <i class="fas fa-user-circle fa-2x" style="color: rgb(6, 95, 212);"></i>ログイン
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import MyList from "../components/MyList.vue";
import myMixin from "../util";

export default {
  components: {
    MyList
  },
  props: {},
  mixins: [myMixin],
  methods: {
    ...mapMutations({}),
    openLoginPage() {
      //ログインページを表示
      this.$router
        .push({
          path: "/login"
        })
        .catch(err => {});
    }
  },
  computed: {
    ...mapGetters({
      isLogin: "auth/check"
    })
  },
  created() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);

    //リンク先の検索結果ページを初期化
    this.$store.commit("search/setTagVideoResult", null);
    this.$store.commit("search/setPlaylistTagResult", null);
  }
};
</script>
