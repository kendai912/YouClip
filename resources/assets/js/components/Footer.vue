<template>
  <div>
    <v-bottom-navigation
      fixed
      v-bind:value="activeBtn"
      grow
      color="primary"
      v-bind:class="{ zIndex6: !isPortraitScreen && !isFullscreen }"
    >
      <v-btn to="/home" id="home" v-on:click="saveFooterTabIndex(0)">
        <span>ホーム</span>
        <v-icon large>mdi-home-outline</v-icon>
      </v-btn>

      <v-btn to="/youtube" id="youtube" v-on:click="setHighlight(1)">
        <span>まとめ作成</span>
        <div>
          <v-icon large>mdi-plus-box</v-icon>
        </div>
      </v-btn>

      <v-btn to="/mypage" id="mypage" v-on:click="saveFooterTabIndex(2)">
        <span>マイページ</span>
        <v-icon large>mdi-account-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-tour name="myTour" :steps="steps" :options="myOptions"> </v-tour>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      activeBtn: 0,
      steps: [
        {
          target: "#home",
          content: `みんなのまとめを見る`,
        },
        {
          target: "#youtube",
          content: "YouTube動画を切り抜きまとめを作成する",
        },
        {
          target: "#mypage",
          content: "自分が作成＆いいねしたまとめを確認する",
        },
      ],
      myOptions: {
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: "スキップ",
          buttonPrevious: "戻る",
          buttonNext: "次へ",
          buttonStop: "OK",
        },
      },
    };
  },
  methods: {
    ...mapMutations({
      setShowBoarding: "onboarding/setShowBoarding",
    }),
    //開いたタブをセッションストレージに保存
    saveFooterTabIndex(index) {
      window.sessionStorage.setItem("footerTabIndex", JSON.stringify(index));
      this.checkAndDisplayBoarding();
    },
    async setHighlight(index) {
      this.saveFooterTabIndex(index);

      // 表示するコンポーネントをYTvideoSelectBoxにセットし、まとめ作成ページに遷移
      this.$store.commit("highlight/setDisplayComponent", "YTvideoSelectBox");

      //check if there is editing new playlist
      if (this.isLogin) {
        await this.$store.dispatch("playlist/getNewPlaylistId");
        if (this.newPlaylistId) {
          await this.loadSceneList();
          //作成中のプレイリストデータがあればsnackbarを表示
          if (this.playlistAndTagVideoData?.tagVideoData?.length >= 1) {
            this.$store.commit("snackbar/setText", " 作成中のまとめがあります");
            this.$store.commit("snackbar/seVertical", true);
            this.$store.commit("snackbar/setSnackbar", true);
            this.$store.commit("snackbar/setTimeout", 5000);
          }
        }
      }

      this.checkAndDisplayBoarding();
    },
    checkAndDisplayBoarding() {
      let notShowBoarding = JSON.parse(localStorage.getItem("notShowBoarding"));
      if (!notShowBoarding) {
        this.setShowBoarding(true);
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
      showFooterTour: "onboarding/showFooterTour",
    }),
  },
  watch: {
    showFooterTour() {
      if (this.showFooterTour) this.$tours["myTour"].start();
    },
  },
  mounted() {
    //以前に開いていたタブをセッションストレージからセット
    this.activeBtn = parseInt(window.sessionStorage.getItem("footerTabIndex"));
  },
};
</script>
