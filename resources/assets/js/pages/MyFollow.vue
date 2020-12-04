<template>
  <div class="container--small">
    <div v-if="isLogin">
      <MyFollowProfile />
      <FollowList />
      <!-- <v-card flat>
        <PublicPlaylistSceneItem v-bind:playlistItems="publicPlaylistMediaItems" v-bind:createdTagItems="createdTagListMediaItems" />
      </v-card> -->
    </div>
    <v-card v-else class="text-center pa-3 ma-3 body-color" title elevation="0">
      <v-card-title class="pa-0 ma-0 justify-center">
        <v-icon class="pa-0 ma-0" size="100">video_library</v-icon>
      </v-card-title>
      <v-card-title class="pa-1 mt-2 mx-0 justify-center">ログインが必要です</v-card-title>
      <v-card-subtitle class="pa-1 mt-0 mx-0 darkgrey--text">ログインすると、まとめを作成したYouTube動画にアクセス出来ます</v-card-subtitle>
      <v-card-actions class="justify-center pa-1 mt-4 mx-2">
        <v-container class="ma-0 pa-0">
          <v-row class="ma-0 pa-0 justify-center">
            <v-btn
              width="300px"
              height="45px"
              color="green lighten-1"
              class="white--text"
              v-on:click="openLoginPage"
              style="font-size: 14px; "
            >ログイン</v-btn>
          </v-row>
          <v-row class="ma-0 pa-0 justify-center" align="center" style="height: 70px;">
            <v-col class="ma-0 pa-0">
              <div style="height: 1px; background-color: rgba(var(--b38,219,219,219),1)"></div>
            </v-col>
            <v-col class="ma-0 pa-0" cols="6">
              <v-card-text>はじめての方はこちら</v-card-text>
            </v-col>
            <v-col class="ma-0 pa-0">
              <div style="height: 1px; background-color: rgba(var(--b38,219,219,219),1)"></div>
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0 justify-center">
            <v-btn
              width="300px"
              height="45px"
              outlined
              color="green lighten-1"
              class="white--text"
              v-on:click="openRegisterPage"
              style="font-size: 14px;"
            >新規登録</v-btn>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import MyFollowProfile from "../components/MyFollowProfile.vue";
import FollowList from "../components/FollowList.vue";
import myMixin from "../util";

export default {
  components: {
    MyFollowProfile,
    FollowList
  },
  props: {},
  mixins: [myMixin],
  methods: {
    ...mapMutations({}),
    openLoginPage() {
      //ログインページを表示
      this.$router
        .push({
          path: "/login",
        })
        .catch((err) => {});
    },
    openRegisterPage() {
      //新規登録ページを表示
      this.$router
        .push({
          path: "/register",
        })
        .catch((err) => {});
    },
  },
  computed: {
    ...mapGetters({
      isLogin: "auth/check",
    }),
  },
  async mounted() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);

    //リンク先の検索結果ページを初期化
    this.$store.commit("search/setTagVideoResult", null);
    this.$store.commit("search/setPlaylistTagResult", null);
  },
};
</script>
