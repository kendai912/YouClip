<template>
  <div class="container--small">
    <HighlightHeader />
    <div class="highlight-body" ref="highlightBody">
      <div class="ytPlayerWrapper" ref="ytPlayerWrapper">
        <YTIframe
          v-if="ytIframeParameterReady"
          v-on:switchToPlayListIndexOf="switchToPlayListIndexOf"
        />
        <YTPlayerController v-show="isPlayerReady" ref="YTPlayerController" />
        <YTSeekBar
          v-show="isPlayerReady"
          ref="ytSeekBar"
          v-bind:bodyRef="highlightBodyRef"
        />
      </div>
      <v-sheet
        v-if="isPlayerReady && isVideoDataReady"
        class="highlightControllerBody"
      >
        <v-container class="ma-0 pa-0" fluid>
          <v-row class="ma-0 pa-0 text-left" align="center">
            <v-col>
              <v-img
                src="/storage/icons/yt_social_red.png"
                width="28px"
                max-height="28px"
                alt="YouTube logo"
                class="float-left mr-2"
              />
              <span v-if="isNew">{{ newVideoData.title }}</span>
              <span v-else>{{ videoData.title }}</span></v-col
            >
          </v-row>

          <v-row class="ma-0 pa-0">
            <v-col class="text-center now-playing">
              <img
                src="/storage/icons/now_playing.svg"
                alt="now playing"
                loading="lazy"
              />
              <span>{{
                $t("Confirm.playingClippedScene", { start: start, end: end })
              }}</span>
            </v-col>
          </v-row>

          <v-row class="ma-0 pa-0">
            <v-col class="text-left pb-0"
              >{{ $t("Confirm.insertTelopOption") }}
            </v-col>
          </v-row>

          <v-row class="ma-0 pa-0" align="center">
            <v-col class="ma-0 pa-0">
              <v-form ref="form" class="ma-0 pa-0">
                <v-row class="ma-0 pa-0">
                  <v-col class="pb-0">
                    <v-select
                      v-model="telopPosition"
                      v-bind:items="telopPositionList"
                      v-bind:label="$t('Confirm.telopPosition')"
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
                      v-bind:label="$t('Confirm.telopColor')"
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
                      v-bind:label="$t('Confirm.telopSize')"
                      hide-details
                      dense
                      v-bind:rules="required"
                      class="telopLabel"
                    ></v-select
                  ></v-col>
                  <v-col class="pb-0">
                    <v-text-field
                      v-model="telopDuration"
                      min="0"
                      max="999"
                      type="number"
                      v-bind:label="$t('Confirm.telopDuration')"
                      hide-details
                      dense
                      v-bind:suffix="$t('Confirm.telopDurationSuffix')"
                      v-bind:rules="required"
                      class="telopLabel"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="ma-0 pa-0">
                  <v-col>
                    <v-text-field
                      v-model="telopText"
                      type="text"
                      name="telopText"
                      v-bind:label="$t('Confirm.telopText')"
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
                      {{ $t("Confirm.insert") }}
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
                    <v-card-title class="subtitle-1">{{
                      $t("Confirm.deleteDialogSubtitle")
                    }}</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">{{
                        $t("Confirm.cancel")
                      }}</v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >{{ $t("Confirm.delete") }}</v-btn
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
            <v-col class="text-right ma-0 pa-3">
              <v-btn
                v-if="isVideoDataReady"
                color="primary darken-2 white--text"
                v-bind:disabled="isDisabled"
                v-on:click.stop.prevent="confirm"
                >{{ $t("Confirm.next") }}</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </div>
    <NoLoginModal v-if="showLoginModal" />
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
    NoLoginModal,
    Navbar,
  },
  data() {
    return {
      ytIframeParameterReady: false,
      timer: null,
      highlightBodyRef: this.$refs.highlightBody,
      isDisabled: false,
      playlistIdToAdd: null,
      playlistIdToEdit: null,
      tagIdToEdit: null,
      tags: [],
      tagItems: [],
      isIOS: false,
      isVideoDataReady: false,
      ytInputData: null,
      dialogDelete: false,
      deleteIndex: -1,
      telopPosition: "bottomCenter",
      telopPositionList: [
        { text: this.$t("Confirm.data.bottomLeft"), value: "bottomLeft" },
        { text: this.$t("Confirm.data.bottomCenter"), value: "bottomCenter" },
        { text: this.$t("Confirm.data.bottomRight"), value: "bottomRight" },
        { text: this.$t("Confirm.data.middleLeft"), value: "middleLeft" },
        { text: this.$t("Confirm.data.middleCenter"), value: "middleCenter" },
        { text: this.$t("Confirm.data.middleRight"), value: "middleRight" },
        { text: this.$t("Confirm.data.upperLeft"), value: "upperLeft" },
        { text: this.$t("Confirm.data.upperCenter"), value: "upperCenter" },
        { text: this.$t("Confirm.data.upperRight"), value: "upperRight" },
      ],
      telopColor: "white",
      telopColorList: [
        { text: this.$t("Confirm.data.white"), value: "white" },
        { text: this.$t("Confirm.data.red"), value: "red" },
        { text: this.$t("Confirm.data.pink"), value: "pink" },
        { text: this.$t("Confirm.data.yellow"), value: "yellow" },
        { text: this.$t("Confirm.data.green"), value: "green" },
        { text: this.$t("Confirm.data.cyan"), value: "cyan" },
        { text: this.$t("Confirm.data.blue"), value: "blue" },
        { text: this.$t("Confirm.data.purple"), value: "purple" },
        { text: this.$t("Confirm.data.black"), value: "black" },
      ],
      telopSize: "medium",
      telopSizeList: [
        { text: this.$t("Confirm.data.large"), value: "large" },
        { text: this.$t("Confirm.data.medium"), value: "medium" },
        { text: this.$t("Confirm.data.small"), value: "small" },
      ],
      telopDuration: 3,
      telopText: "",
      required: [(value) => !!value || this.$t("Confirm.data.required")],
      headers: [
        {
          text: this.$t("Confirm.data.start"),
          value: "start",
          sortable: false,
          width: "15%",
        },
        {
          text: this.$t("Confirm.data.duration"),
          value: "duration",
          sortable: false,
          width: "15%",
        },
        {
          text: this.$t("Confirm.data.telop"),
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
      tagDataArray: "youtube/tagDataArray",
      isNew: "youtube/isNew",
      newVideoData: "youtube/newVideoData",
      videoData: "youtube/videoData",
      currentTime: "youtube/currentTime",
      currentCategory: "youtube/currentCategory",
      start: "tagging/start",
      end: "tagging/end",
      privacySetting: "tagging/privacySetting",
      isAdding: "tagging/isAdding",
      isEditing: "tagging/isEditing",
      showLoginModal: "noLoginModal/showLoginModal",
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
      setPlayer: "ytPlayer/setPlayer",
      setIsMuted: "ytPlayer/setIsMuted",
      setIsPlaying: "ytPlayer/setIsPlaying",
      setIsNew: "youtube/setIsNew",
      setIsAdding: "tagging/setIsAdding",
      setIsEditing: "tagging/setIsEditing",
      setStep: "highlightHeader/setStep",
      pushOneTelop: "telop/pushOneTelop",
      pushTelops: "telop/pushTelops",
      resetTelops: "telop/resetTelops",
    }),
    ...mapActions({
      deleteOneTelop: "telop/deleteOneTelop",
    }),
    async initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);

      //headerの文言とステップをセット
      this.$store.commit(
        "highlightHeader/setHeaderMessage",
        this.$t("Confirm.methods.telopInsertPage")
      );
      this.setStep(3);

      //clear all data before loading
      this.clearAllInput();

      //既存プレイリストへの追加かシーンの編集か新規かを判別
      if (this.$route.path == "/add/confirm") {
        this.setIsAdding(true);
        this.playlistIdToAdd = this.$route.query.playlist;
      } else if (this.$route.path == "/edit/confirm") {
        this.playlistIdToEdit = this.$route.query.playlist;
        this.setIsEditing(true);
        this.tagIdToEdit = this.$route.query.tag;

        //動画・タグデータを取得
        await this.$store.dispatch(
          "watch/getTagAndVideoDataById",
          this.tagIdToEdit
        );

        //set tags data for editing
        this.setEditingTagAndTelopData();
      }

      //倍速視聴を1倍のリセット
      this.$store.commit("ytPlayer/setPlaySpeed", 1);

      this.isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);

      //highlightHeaderを設定
      this.$store.commit("highlightHeader/setShowSteps", true);
      this.$store.commit("highlightHeader/setShowBackIcon", true);
    },
    //set tags data for editing
    setEditingTagAndTelopData() {
      let defaultTags = this.tagAndVideoData[0].tags.split(/::/);
      this.$store.commit("tagging/setTags", defaultTags);
      this.tags = defaultTags;

      if (this.tagAndVideoData[0].telops) {
        this.pushTelops(this.tagAndVideoData[0].telops);
      } else {
        this.resetTelops();
      }
    },
    checkRouting() {
      if (this.start == null || this.end == null) {
        this.$router
          .push({
            path: "/youtube",
          })
          .catch((err) => {});
      }
    },
    clearAllInput() {
      this.$store.commit("ytSeekBar/setStartTimeInput", null);
      this.$store.commit("ytSeekBar/setEndTimeInput", null);
      this.$store.commit("tagging/setTags", "");
      this.$store.commit("tagging/setStart", "");
      this.$store.commit("tagging/setEnd", "");
      this.$store.commit("tagging/setPrivacySetting", "public");
      this.setIsAdding(false);
      this.setIsEditing(false);
    },
    //以前入力された開始・終了時間をセッションストレージからロード
    loadTimeInput(youtubeId) {
      this.ytInputData = JSON.parse(
        window.sessionStorage.getItem("ytInputData")
      );
      if (this.ytInputData && this.ytInputData.youtubeId == youtubeId) {
        this.$store.commit("tagging/setStart", this.ytInputData.startTimeInput);
        this.$store.commit("tagging/setEnd", this.ytInputData.endTimeInput);
        this.$store.commit(
          "ytSeekBar/setStartTimeInput",
          this.ytInputData.startTimeInput
        );
        this.$store.commit(
          "ytSeekBar/setEndTimeInput",
          this.ytInputData.endTimeInput
        );
        if (this.ytInputData.telops) {
          this.pushTelops(this.ytInputData.telops);
        }
      } else {
        this.resetTelops();
      }
      this.checkRouting();
    },
    // 確認モーダル表示へ進む
    async confirm() {
      if (!this.isLogin) {
        //未ログインの場合
        this.$store.commit("noLoginModal/openLoginModal");
        this.$store.commit(
          "noLoginModal/setMessageWhenNotLogined",
          this.$t("Confirm.methods.messageWhenNotLogined")
        );
      } else {
        clearInterval(this.timer);

        let self = this;
        //ログイン済の場合
        if (self.isEditing) {
          //編集の場合
          //入力済データ(除く、保存先プレイリスト)をセット
          self.$store.commit("tagging/setTagId", self.tagIdToEdit);
          self.$store.commit("tagging/setTags", self.tags);
          self.$store.commit("tagging/setTelops", self.telops);
          self.$store.commit("tagging/setPrivacySetting", "public");

          //新しく作成したplaylistIdをセット
          self.$store.commit(
            "tagging/setMyPlaylistToSave",
            self.playlistIdToEdit
          );

          //ローディングを表示し、OKボタンを無効化
          self.$store.commit("highlightHeader/setIsLoading");
          self.isDisabled = true;

          //場面のデータをDBで更新
          await self.$store.dispatch("tagging/updateSceneTags");

          //場面のサムネイルとプレビューを取得しS3に保存(非同期)
          self.$store.dispatch("tagging/storeTagThumbAndPreview");

          //ローディングを非表示
          self.$store.commit("highlightHeader/setNotLoading");

          //display editting a new scene completion snackbar
          self.$store.commit("snackbar/setText", this.$t("Confirm.methods.sceneUpdated"));
          self.$store.commit("snackbar/seVertical", false);
          self.$store.commit("snackbar/setSnackbar", true);
          self.$store.commit("snackbar/setTimeout", 5000);

          //return to the playlist edit page
          self.$router
            .push({
              path: "/editmyplaylist",
              query: {
                playlist: self.playlistIdToEdit,
              },
            })
            .catch((err) => {});
        } else if (self.isAdding) {
          //in case of adding to existing playlist
          //入力済データをセット
          self.$store.commit("tagging/setTags", self.tags);
          self.$store.commit("tagging/setTelops", self.telops);
          self.$store.commit("tagging/setPrivacySetting", "public");

          //新しく場面を追加する既存のplaylistIdをセット
          self.$store.commit(
            "tagging/setMyPlaylistToSave",
            self.playlistIdToAdd
          );

          //ローディングを表示し、OKボタンを無効化
          self.$store.commit("highlightHeader/setIsLoading");
          self.isDisabled = true;

          //場面のデータを登録
          await self.$store.dispatch("tagging/storeSceneTags");

          //場面のサムネイルとプレビューを取得しS3に保存(非同期)
          self.$store.dispatch("tagging/storeTagThumbAndPreview");

          //ローディングを非表示
          self.$store.commit("highlightHeader/setNotLoading");

          //display adding a new scene to existing playlist completion snackbar
          self.$store.commit("snackbar/setText", this.$t("Confirm.methods.newSceneAdded"));
          this.$store.commit("snackbar/seVertical", false);
          self.$store.commit("snackbar/setSnackbar", true);
          self.$store.commit("snackbar/setTimeout", 5000);

          //return to the playlist edit page
          self.$router
            .push({
              path: "/editmyplaylist",
              query: {
                playlist: self.playlistIdToAdd,
              },
            })
            .catch((err) => {});
        } else {
          //新規の場合
          //入力済データをセット
          self.$store.commit("tagging/setTags", self.tags);
          self.$store.commit("tagging/setTelops", self.telops);
          self.$store.commit("tagging/setPrivacySetting", "public");

          //check if there is editing new playlist
          await self.$store.dispatch("playlist/getNewPlaylistId");
          if (!self.newPlaylistId) {
            //プレイリストを新規作成しIDをplaylist storeのnewPlaylistIdに保存
            await self.$store.dispatch("playlist/createPlaylist", {
              newPlaylistName: "",
              privacySetting: self.privacySetting,
              currentTagId: "",
              playlistCategory: self.recategorize(self.currentCategory),
            });
          }

          //新しく作成したplaylistIdをセット
          self.$store.commit("tagging/setMyPlaylistToSave", self.newPlaylistId);

          //ローディングを表示し、OKボタンを無効化
          self.$store.commit("highlightHeader/setIsLoading");
          self.isDisabled = true;

          //場面のデータをDBに登録
          await self.$store.dispatch("tagging/storeSceneTags");

          //場面のサムネイルとプレビューを取得しS3に保存(非同期)
          self.$store.dispatch("tagging/storeTagThumbAndPreview");

          //ローディングを非表示
          self.$store.commit("highlightHeader/setNotLoading");

          //display adding a new scene to existing playlist completion snackbar
          self.$store.commit("snackbar/setText", this.$t("Confirm.methods.clippedScene"));
          this.$store.commit("snackbar/seVertical", false);
          self.$store.commit("snackbar/setSnackbar", true);
          self.$store.commit("snackbar/setTimeout", 5000);

          //return to the playlist edit page
          self.$router
            .push({
              path: "/highlight/scenelist",
            })
            .catch((err) => {});
        }

        this.resetTelops();

        //「続けて他の場面を切り抜く」用に開始時間に今回の終了時間をセット
        this.saveTimeInput(this.youtubeId, this.end, "0:00");
      }
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
          path: "/youtube/confirm",
          query: {
            v: this.youtubeId,
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
    recategorize(currentYtCategory) {
      if (currentYtCategory == "Sports") {
        return "Sports";
      } else if (currentYtCategory == "Gaming") {
        return "Game";
      } else {
        return "Other";
      }
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

    //必要データを取得するまでTagItemは非表示
    this.$store.commit("youtube/setIsReady", false);

    //URLからyoutubeIdを格納
    let youtubeId = this.$route.query.v;

    //load start & end time
    this.loadTimeInput(youtubeId);

    //必要データを取得
    this.$store.commit("youtube/setYoutubeId", youtubeId);
    await this.$store.dispatch("youtube/getVideo", youtubeId);

    if (this.isNew) {
      //新規動画・タグの場合はData APIから取得
      await this.$store.dispatch("youtube/getNewVideoData");
    }
    this.isVideoDataReady = true;

    //YTPlayerのまとめの再生に必要なパラメータをセット
    let listOfYoutubeIdStartEndTime = [];
    let dataOfYoutubeIdStartEndTime = [];
    dataOfYoutubeIdStartEndTime[0] = [];
    dataOfYoutubeIdStartEndTime[0].youtubeId = youtubeId;
    this.start
      ? (dataOfYoutubeIdStartEndTime[0].start = this.start)
      : (dataOfYoutubeIdStartEndTime[0].start = "");
    this.end
      ? (dataOfYoutubeIdStartEndTime[0].end = this.end)
      : (dataOfYoutubeIdStartEndTime[0].end = "");
    dataOfYoutubeIdStartEndTime[0].scene_order = 1;

    this.putTagVideoIntolistOfYoutubeIdStartEndTime(
      listOfYoutubeIdStartEndTime,
      dataOfYoutubeIdStartEndTime
    );
    this.addFirstSceneOfYouTubeIdFlg(listOfYoutubeIdStartEndTime);
    this.$store.commit(
      "ytPlayer/setListOfYoutubeIdStartEndTime",
      listOfYoutubeIdStartEndTime
    );
    this.$store.commit("ytPlayer/setListIndex", 0);
    this.ytIframeParameterReady = true;

    //YTSeekBarのクリックイベント用にボディのrefをセット
    this.highlightBodyRef = this.$refs.highlightBody;
  },
  beforeDestroy() {
    // シーンタグ付けコンポーネントの現在再生時間をセットするインターバルを停止する
    clearInterval(this.timer);

    //headerの戻るアイコンを非表示
    this.$store.commit("highlightHeader/setShowBackIcon", false);
  },
};
</script>
