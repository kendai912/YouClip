<template>
  <div class="container--small">
    <HighlightHeader />
    <div class="highlight-body" ref="highlightBody">
      <div class="ytPlayerWrapper" ref="ytPlayerWrapper">
        <YTIframe
          v-if="ytIframeParameterReady"
          v-on:switchToPlayListIndexOf="switchToPlayListIndexOf"
        />
        <YTPlayerController
          v-show="isPlayerReady"
          ref="YTPlayerController"
          v-on:switchToPlayListIndexOf="switchToPlayListIndexOf"
          v-on:setEventListeners="setEventListeners"
        />
        <YTSeekBar
          v-show="isPlayerReady"
          ref="ytSeekBar"
          v-bind:bodyRef="highlightBodyRef"
          v-on:fadeInOutController="fadeInOutController"
          v-on:showOnYTSeekBarTouchMove="showOnYTSeekBarTouchMove"
          v-on:hideOnYTSeekBarTouchEnd="hideOnYTSeekBarTouchEnd"
        />
      </div>
    </div>
    <v-snackbar v-model="snackbar" v-bind:timeout="timeout">
      {{ text }}
      <v-btn color="blue" text v-on:click.stop.prevent="snackbar = false"
        >Close</v-btn
      >
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import HighlightHeader from "../components/HighlightHeader.vue";
import YTIframe from "../components/YTIframe";
import YTPlayerController from "../components/YTPlayerController";
import YTSeekBar from "../components/YTSeekBar";
import NoLoginModal from "../components/NoLoginModal.vue";
import myMixin from "../util";
import Navbar from "./Navbar.vue";

export default {
  components: {
    HighlightHeader,
    YTIframe,
    YTPlayerController,
    YTSeekBar,
    Navbar,
  },
  data() {
    return {
      snackbar: false,
      timeout: 5000,
      text: "カスタムサムネイルを設定しました",
      ytIframeParameterReady: false,
      timer: null,
      highlightBodyRef: this.$refs.highlightBody,
      isDisabled: false,
      tags: [],
      tagItems: [],
      dialogDelete: false,
      deleteIndex: -1,
      telopPosition: "bottomCenter",
      telopPositionList: [
        { text: "下段左", value: "bottomLeft" },
        { text: "下段中央", value: "bottomCenter" },
        { text: "下段右", value: "bottomRight" },
        { text: "中段左", value: "middleLeft" },
        { text: "中段中央", value: "middleCenter" },
        { text: "中段右", value: "middleRight" },
        { text: "上段左", value: "upperLeft" },
        { text: "上段中央", value: "upperCenter" },
        { text: "上段右", value: "upperRight" },
      ],
      telopColor: "white",
      telopColorList: [
        { text: "白", value: "white" },
        { text: "赤", value: "red" },
        { text: "ピンク", value: "pink" },
        { text: "黄", value: "yellow" },
        { text: "緑", value: "green" },
        { text: "水色", value: "cyan" },
        { text: "青", value: "blue" },
        { text: "紫", value: "purple" },
        { text: "黒", value: "black" },
      ],
      telopSize: "medium",
      telopSizeList: [
        { text: "大", value: "large" },
        { text: "中", value: "medium" },
        { text: "小", value: "small" },
      ],
      telopDuration: 3,
      telopText: "",
      required: [(value) => !!value || "必須項目です."],
      headers: [
        { text: "開始", value: "start", sortable: false, width: "15%" },
        {
          text: "表示(秒)",
          value: "duration",
          sortable: false,
          width: "15%",
        },
        {
          text: "テロップ",
          value: "text",
          sortable: false,
        },
        { text: "", value: "actions", sortable: false },
      ],
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isLogin: "auth/check",
      user_id: "auth/user_id",
      myPlaylistToSave: "tagging/myPlaylistToSave",
      playlistAndTagVideoData: "watch/playlistAndTagVideoData",
      tagDataArray: "youtube/tagDataArray",
      currentTime: "youtube/currentTime",
      isEditing: "tagging/isEditing",
      newPlaylistId: "playlist/newPlaylistId",
      youtubeId: "ytPlayer/youtubeId",
      player: "ytPlayer/player",
      isPlayerReady: "ytPlayer/isPlayerReady",
      isMuted: "ytPlayer/isMuted",
      isPlaying: "ytPlayer/isPlaying",
      tagAndVideoData: "watch/tagAndVideoData",
      telops: "telop/telops",
      telopsArray: "telop/telopsArray",
    }),
    indexedTelops() {
      return this.telops.map((telop, index) => ({
        indexedId: index,
        ...telop,
      }));
    },
  },
  methods: {
    ...mapMutations({
      setIsMuted: "ytPlayer/setIsMuted",
      setIsPlaying: "ytPlayer/setIsPlaying",
      setStep: "highlightHeader/setStep",
      pushOneTelop: "telop/pushOneTelop",
      pushTelops: "telop/pushTelops",
      resetTelops: "telop/resetTelops",
    }),
    ...mapActions({
      deleteOneTelop: "telop/deleteOneTelop",
    }),
    initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);

      //headerの文言とステップをセット
      this.$store.commit(
        "highlightHeader/setHeaderMessage",
        "カスタムサムネイルを選択"
      );
      this.setStep(5);

      //倍速視聴を1倍のリセット
      this.$store.commit("ytPlayer/setPlaySpeed", 1);

      this.$store.commit("ytPlayer/setIsWatchingPlaylist", true);

      //highlightHeaderを設定
      this.$store.commit("highlightHeader/setShowSteps", false);
      this.$store.commit("highlightHeader/setShowBackIcon", true);
    },
    unmute() {
      this.player.unMute();
      this.setIsMuted(false);
    },
    mute() {
      this.player.mute();
      this.setIsMuted(true);
    },
    switchToPlayListIndexOf(index) {
      //URLを更新
      this.$router
        .push({
          path: "/highlight/thumbnail",
          query: {
            playlist: this.playlistIdUrl,
            index: index,
          },
        })
        .catch((err) => {});

      //次のシーンをロードし再生
      this.$store.dispatch("ytPlayer/playListIndexOf", index);
    },
    insert() {
      if (this.$refs.form.validate()) {
        this.pushOneTelop({
          position: this.telopPosition,
          color: this.telopColor,
          size: this.telopSize,
          start: this.timeMath.toHis(this.currentTime),
          duration: this.telopDuration,
          text: this.telopText,
          id: "",
        });

        this.ytInputData.telops = this.telops;
        window.sessionStorage.setItem(
          "ytInputData",
          JSON.stringify(this.ytInputData)
        );
      }
    },
    seekToTelop(row) {
      this.player.seekTo(this.convertToSec(this.formatToMinSec(row.start)));
    },
    deleteTelop(item) {
      this.deleteIndex = this.indexedTelops.indexOf(item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteOneTelop(this.deleteIndex);
      this.deleteOneTelopFromSessionStorage(this.deleteIndex);
      this.closeDelete();
    },
    deleteOneTelopFromSessionStorage(deleteIndex) {
      this.ytInputData = JSON.parse(
        window.sessionStorage.getItem("ytInputData")
      );
      if (this.ytInputData.telops) {
        this.ytInputData.telops.splice(deleteIndex, 1);
        window.sessionStorage.setItem(
          "ytInputData",
          JSON.stringify(this.ytInputData)
        );
      }
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.deleteIndex = -1;
      });
    },
    setEventListeners() {
      this.$refs.ytSeekBar.setEventListeners();
    },
    fadeInOutController() {
      this.$refs.YTPlayerController.fadeInOutController();
    },
    showOnYTSeekBarTouchMove() {
      this.$refs.YTPlayerController.showOnYTSeekBarTouchMove();
    },
    hideOnYTSeekBarTouchEnd() {
      this.$refs.YTPlayerController.hideOnYTSeekBarTouchEnd();
    },
  },
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route() {
      this.initialize();
    },
    isPlayerReady() {
      if (this.isPlayerReady) {
        this.setYtPlayerCSS();
        this.$refs.ytSeekBar.setYtSeekbarWrapperTop();
      }
    },
  },
  async created() {
    this.initialize();

    //URLのクエリパラメータからまとめIDとインデックスを取得
    this.playlistIdUrl = this.$route.query.playlist;
    this.indexUrl = this.$route.query.index;

    //まとめおよび動画・タグデータを取得
    await this.$store.dispatch(
      "watch/getPlaylistAndTagVideoDataById",
      this.playlistIdUrl
    );
    console.log(this.playlistAndTagVideoData);
    if (this.playlistAndTagVideoData.user_id != this.user_id) {
      this.$store.commit("error/setCode", 403);
    }

    //YTPlayerのまとめの再生に必要なパラメータをセット
    let listOfYoutubeIdStartEndTime = [];
    this.putTagVideoIntolistOfYoutubeIdStartEndTime(
      listOfYoutubeIdStartEndTime,
      this.playlistAndTagVideoData.tagVideoData
    );
    listOfYoutubeIdStartEndTime.sort((a, b) =>
      a.scene_order > b.scene_order ? 1 : -1
    );
    this.addFirstSceneOfYouTubeIdFlg(listOfYoutubeIdStartEndTime);
    this.$store.commit(
      "ytPlayer/setListOfYoutubeIdStartEndTime",
      listOfYoutubeIdStartEndTime
    );
    this.$store.commit("ytPlayer/setListIndex", this.indexUrl);
    this.ytIframeParameterReady = true;

    //Telopに必要なパラメータをセット
    this.resetTelops();
    this.playlistAndTagVideoData.tagVideoData.forEach((item) => {
      this.pushTelops(item.telops);
    });

    //YTSeekBarのクリックイベント用にボディのrefをセット
    this.highlightBodyRef = this.$refs.highlightBody;
  },
  beforeDestroy() {
    // 現在再生時間をセットするインターバルを停止する
    clearInterval(this.timer);

    this.$store.commit("ytPlayer/setIsWatchingPlaylist", false);
  },
};
</script>
