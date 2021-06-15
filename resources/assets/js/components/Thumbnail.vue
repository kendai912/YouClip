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
      <v-sheet v-if="isPlayerReady" class="highlightControllerBody">
        <v-stepper
          v-model="thumbStep"
          vertical
          class="bottom_navigation_no_shadow"
        >
          <v-stepper-step :complete="thumbStep > 1" step="1">
            サムネイルに使う場面を選択
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card elevation="0" class="mb-2">
              <v-btn
                block
                color="primary darken-2"
                dark
                height="45px"
                v-on:click="selectCurrentScene"
                style="font-size: 14px;"
                >いま再生中の場面を使う<br />(押すと一時停止します)</v-btn
              ></v-card
            >
          </v-stepper-content>

          <v-stepper-step :complete="thumbStep > 2" step="2"
            >(任意) サムネイルにテキストを挿入</v-stepper-step
          >
          <v-stepper-content step="2">
            <v-card elevation="0" class="mb-12">
              <v-container class="ma-0 pa-0" fluid>
                <v-row class="ma-0 pa-0" align="center">
                  <v-col class="ma-0 pa-0">
                    <v-form ref="form" class="ma-0 pa-0">
                      <v-row class="ma-0 pa-0">
                        <v-col class="pb-0">
                          <v-select
                            v-model="telopPosition"
                            v-bind:items="telopPositionList"
                            label="位置"
                            hide-details
                            dense
                            v-bind:rules="required"
                            class="telopLabel"
                          ></v-select
                        ></v-col>
                        <v-col class="pb-0">
                          <v-select
                            v-model="telopColor"
                            v-bind:items="telopColorList"
                            label="色"
                            hide-details
                            dense
                            v-bind:rules="required"
                            class="telopLabel"
                          ></v-select
                        ></v-col>
                        <v-col class="pb-0">
                          <v-select
                            v-model="telopSize"
                            v-bind:items="telopSizeList"
                            label="サイズ"
                            hide-details
                            dense
                            v-bind:rules="required"
                            class="telopLabel"
                          ></v-select
                        ></v-col>
                      </v-row>

                      <v-row class="ma-0 pa-0">
                        <v-col>
                          <v-text-field
                            v-model="telopText"
                            type="text"
                            name="telopText"
                            label="テキスト"
                            hide-details
                            dense
                            v-bind:rules="required"
                            class="telopLabel"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="auto" class="pr-3">
                          <v-btn
                            outlined
                            color="primary"
                            v-on:click.stop.prevent="insert"
                          >
                            挿入
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-col>
                </v-row>

                <v-row
                  v-if="telops.length"
                  class="ma-0 pa-3"
                  align="center"
                  justify="center"
                >
                  <v-data-table
                    :headers="headers"
                    :items="indexedTelops"
                    sort-by="start"
                    class="elevation-1 telop-table"
                    v-on:click:row="seekToTelop"
                    item-key="indexedId"
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-icon small v-on:click.stop.prevent="deleteTelop(item)">
                        mdi-delete
                      </v-icon>
                    </template>

                    <template v-slot:top>
                      <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                          <v-card-title class="subtitle-1"
                            >選択したテロップを削除しますか？</v-card-title
                          >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="closeDelete"
                              >キャンセル</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="deleteItemConfirm"
                              >削除する</v-btn
                            >
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </template>
                  </v-data-table>
                </v-row>

                <v-row
                  align="center"
                  class="ma-0 pa-0"
                  style="padding-top: 24px !important; padding-bottom: 128px !important; "
                >
                  <v-col class="ma-0 pa-3">
                    <v-btn
                      color="primary"
                      v-bind:disabled="isDisabled"
                      v-on:click="saveCustomThumbnail"
                      >完了</v-btn
                    >
                    <v-btn
                      text
                      v-bind:disabled="isDisabled"
                      v-on:click="returnToSelectCurrentScene"
                      >キャンセル</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-stepper-content>
        </v-stepper>
      </v-sheet>
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
      telopDuration: 1,
      telopText: "",
      required: [(value) => !!value || "必須項目です."],
      headers: [
        {
          text: "テキスト",
          value: "text",
          sortable: false,
        },
        { text: "", value: "actions", sortable: false, width: 24 },
      ],
      thumbStep: 1,
      isDisabled: false,
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
      youtubeId: "ytPlayer/youtubeId",
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
      setShowPlayerController: "ytPlayer/setShowPlayerController",
      setStep: "highlightHeader/setStep",
      setTelopsArrayIndex: "telop/setTelopsArrayIndex",
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
    selectCurrentScene() {
      this.setShowPlayerController(false);
      this.thumbStep = 2;
      this.$store.commit("ytPlayer/setIsPlaying", false);
      this.player.pauseVideo();
    },
    returnToSelectCurrentScene() {
      this.setShowPlayerController(true);
      this.thumbStep = 1;
      this.$store.commit("ytPlayer/setIsPlaying", true);
      this.player.playVideo();
      this.resetTelops();
    },
    insert() {
      if (this.$refs.form.validate()) {
        this.setTelopsArrayIndex(0);
        this.pushOneTelop({
          position: this.telopPosition,
          color: this.telopColor,
          size: this.telopSize,
          start: this.timeMath.toHis(this.currentTime),
          duration: this.telopDuration,
          text: this.telopText,
          id: "",
        });
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
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.deleteIndex = -1;
      });
    },
    async saveCustomThumbnail() {
      clearInterval(this.timer);

      //ローディングを表示し、完了ボタンを無効化
      this.$store.commit("highlightHeader/setIsLoading");
      this.isDisabled = true;

      let params = {
        playlistId: this.playlistIdUrl,
        youtubeId: this.youtubeId,
        start: this.timeMath.toHis(this.currentTime),
        telops: this.telops,
      };

      //カスタムサムネイルを保存
      await this.$store.dispatch("playlist/saveCustomThumbnail", params);

      //ローディングを非表示
      this.$store.commit("highlightHeader/setNotLoading");

      //display adding a new scene to existing playlist completion snackbar
      this.$store.commit(
        "snackbar/setText",
        "カスタムサムネイルを設定しました"
      );
      this.$store.commit("snackbar/seVertical", false);
      this.$store.commit("snackbar/setSnackbar", true);
      this.$store.commit("snackbar/setTimeout", 5000);

      //return to the playlist edit page
      console.log(this.$route.path);
      if (this.$route.path == "/highlight/thumbnail") {
        console.log("move to /highlight/title");
        this.$router
          .push({
            path: "/highlight/title",
          })
          .catch((err) => {});
      } else if (this.$route.path == "/edit/thumbnail") {
        console.log("move to /editmyplaylist");
        this.$router
          .push({
            path: "/editmyplaylist",
            query: {
              playlist: this.playlistIdUrl,
            },
          })
          .catch((err) => {});
      }
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

    //場面に紐づくTelopをリセット
    this.resetTelops();

    //YTSeekBarのクリックイベント用にボディのrefをセット
    this.highlightBodyRef = this.$refs.highlightBody;
  },
  beforeDestroy() {
    // 現在再生時間をセットするインターバルを停止する
    clearInterval(this.timer);

    this.$store.commit("ytPlayer/setIsWatchingPlaylist", false);
    this.setShowPlayerController(true);
  },
};
</script>
