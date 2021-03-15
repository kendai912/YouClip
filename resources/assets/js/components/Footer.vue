<template>
  <v-bottom-navigation
    fixed
    v-bind:value="activeBtn"
    grow
    color="primary"
    v-bind:class="{ zIndex6: !isPortraitScreen && !isFullscreen }"
  >
    <v-btn to="/home" v-on:click="saveFooterTabIndex(0)">
      <span>ホーム</span>
      <v-icon large>mdi-home-outline</v-icon>
    </v-btn>

    <v-btn to="/youtube" v-on:click="setHighlight(1)">
      <span>まとめ作成</span>
      <div>
        <v-icon large>mdi-plus-box</v-icon>
      </div>
    </v-btn>

    <v-btn to="/mypage" v-on:click="saveFooterTabIndex(2)">
      <span>マイページ</span>
      <v-icon large>mdi-account-outline</v-icon>
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
    //開いたタブをセッションストレージに保存
    saveFooterTabIndex(index) {
      window.sessionStorage.setItem("footerTabIndex", JSON.stringify(index));
    },
    async setHighlight(index) {
      this.saveFooterTabIndex(index);

      // 表示するコンポーネントをYTvideoSelectBoxにセットし、まとめ作成ページに遷移
      this.$store.commit("highlight/setDisplayComponent", "YTvideoSelectBox");

      //check if there is editing new playlist
      if (this.isLogin) await this.$store.dispatch("playlist/getNewPlaylistId");
      if (this.newPlaylistId) {
        await this.loadSceneList();
        //作成中のプレイリストデータがあればsnackbarを表示
        if (this.playlistAndTagVideoData.tagVideoData.length >= 1) {
          this.$store.commit("snackbar/setText", " 作成中のまとめがあります");
          this.$store.commit("snackbar/seVertical", true);
          this.$store.commit("snackbar/setSnackbar", true);
          this.$store.commit("snackbar/setTimeout", 5000);
        }
      }
    },
    //作成中のプレイリストDataを取得
    async loadSceneList() {
      await this.$store.dispatch(
        "watch/getPlaylistAndTagVideoDataById",
        this.newPlaylistId
      );
    },
  },
  computed: {
    ...mapState({
      apiStatus: (state) => state.auth.apiStatus,
    }),
    ...mapGetters({
      isLogin: "auth/check",
      isPortraitScreen: "ytPlayer/isPortraitScreen",
      isFullscreen: "ytPlayer/isFullscreen",
      newPlaylistId: "playlist/newPlaylistId",
      playlistAndTagVideoData: "watch/playlistAndTagVideoData",
    }),
  },
  mounted() {
    //以前に開いていたタブをセッションストレージからセット
    this.activeBtn = parseInt(window.sessionStorage.getItem("footerTabIndex"));
  },
};
</script>
