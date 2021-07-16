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
        <span>{{ $t("Footer.home") }}</span>
        <v-icon large>mdi-home-outline</v-icon>
      </v-btn>

      <v-btn to="/youtube" id="youtube" v-on:click="setHighlight(1)">
        <span>{{ $t("Footer.clip") }}</span>
        <div>
          <v-icon large>mdi-content-cut</v-icon>
        </div>
      </v-btn>

      <v-btn to="/mypage" id="mypage" v-on:click="saveFooterTabIndex(2)">
        <span>{{ $t("Footer.myPage") }}</span>
        <v-icon large>mdi-account-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-tour
      name="myTour"
      :steps="steps"
      :options="myOptions"
      :callbacks="myCallbacks"
    >
    </v-tour>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      activeBtn: 0,
      steps: [
        // {
        //   target: "#home",
        //   content: `みんなの切り抜きを見る`,
        // },
        {
          target: "#youtube",
          content: this.$t("Footer.data.steps"),
        },
        // {
        //   target: "#mypage",
        //   content: "自分が作成＆いいねした切り抜きを確認する",
        // },
      ],
      myOptions: {
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: this.$t("Footer.data.buttonSkip"),
          buttonPrevious: this.$t("Footer.data.buttonPrevious"),
          buttonNext: this.$t("Footer.data.buttonNext"),
          buttonStop: this.$t("Footer.data.buttonStop"),
        },
      },
      myCallbacks: {
        onFinish: this.myCustomOnFinishCallback,
      },
    };
  },
  methods: {
    ...mapMutations({
      setShowBoarding: "onboarding/setShowBoarding",
      setShowProfileTour: "onboarding/setShowProfileTour",
    }),
    //開いたタブをセッションストレージに保存
    saveFooterTabIndex(index) {
      window.sessionStorage.setItem("footerTabIndex", JSON.stringify(index));
      this.checkAndDisplayBoarding();
    },
    async setHighlight(index) {
      this.saveFooterTabIndex(index);

      // 表示するコンポーネントをYTvideoSelectBoxにセットし、切り抜き作成ページに遷移
      this.$store.commit("highlight/setDisplayComponent", "YTvideoSelectBox");

      //check if there is editing new playlist
      if (this.isLogin) {
        await this.$store.dispatch("playlist/getNewPlaylistId");
        if (this.newPlaylistId) {
          await this.loadSceneList();
          //作成中のプレイリストデータがあればsnackbarを表示
          if (this.playlistAndTagVideoData?.tagVideoData?.length >= 1) {
            this.$store.commit(
              "snackbar/setText",
              this.$t("Footer.methods.clipBeingCreated")
            );
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
    myCustomOnFinishCallback() {
      if (this.isBoardalFinished) this.setShowProfileTour(true);
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
      isBoardalFinished: "onboarding/isBoardalFinished",
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
