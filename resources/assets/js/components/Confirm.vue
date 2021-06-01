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
              <span>切り抜いた場面({{ start }}-{{ end }})を再生中</span>
            </v-col>
          </v-row>

          <v-row class="ma-0 pa-0">
            <v-col class="text-left pb-0"
              >(任意) いま再生中の画面にテロップを挿入
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
                  <v-col class="pb-0">
                    <v-text-field
                      v-model="telopDuration"
                      min="0"
                      max="999"
                      type="number"
                      label="表示"
                      hide-details
                      dense
                      suffix="秒"
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
                      label="テロップ"
                      hide-details
                      dense
                      v-bind:rules="required"
                      class="telopLabel"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="auto" class="pr-3">
                    <v-btn outlined color="primary" v-on:click="insert">
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
              :items="telops"
              sort-by="telopStart"
              hide-default-footer
              class="elevation-1 telop-table"
              v-on:click:row="seekToTelop"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon small v-on:click="deleteTelop(item)">
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
                      <v-btn color="blue darken-1" text @click="closeDelete"
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
            <v-col class="text-right ma-0 pa-3">
              <v-btn
                v-if="isVideoDataReady"
                color="primary darken-2 white--text"
                v-bind:disabled="isDisabled"
                v-on:click="confirm"
                >次へ</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </div>
    <v-snackbar v-model="snackbar" v-bind:timeout="timeout">
      {{ text }}
      <v-btn color="blue" text v-on:click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <NoLoginModal v-if="showLoginModal" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
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
      snackbar: false,
      timeout: 5000,
      text: "シーンタグを登録しました",
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
      telopDuration: 2,
      telopText: "",
      required: [(value) => !!value || "必須項目です."],
      headers: [
        { text: "開始", value: "telopStart", sortable: false, width: "15%" },
        {
          text: "表示(秒)",
          value: "telopDuration",
          sortable: false,
          width: "15%",
        },
        {
          text: "テロップ",
          value: "telopText",
          sortable: false,
        },
        { text: "", value: "actions", sortable: false },
      ],
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
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
    }),
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
      setTelops: "telop/setTelops",
      pushTelops: "telop/pushTelops",
      spliceTelops: "telop/spliceTelops",
    }),
    async initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);

      //headerの文言とステップをセット
      this.$store.commit(
        "highlightHeader/setHeaderMessage",
        "切り抜いた場面を確認"
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
        this.setEditingTagData();
      }

      //倍速視聴を1倍のリセット
      this.$store.commit("ytPlayer/setPlaySpeed", 1);

      this.isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);

      //headerの戻るアイコンを表示
      this.$store.commit("highlightHeader/setShowBackIcon", true);
    },
    //set tags data for editing
    setEditingTagData() {
      let defaultTags = this.tagAndVideoData[0].tags.split(/::/);
      this.$store.commit("tagging/setTags", defaultTags);
      this.tags = defaultTags;
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
          this.setTelops(this.ytInputData.telops);
        } else {
          this.setTelops([]);
        }
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
          "切り抜いた場面を保存するには、ログインしてください。(入力データは保持されます)"
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
          self.$store.commit("snackbar/setText", "場面を更新しました");
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
          self.$store.commit("snackbar/setText", "新しい場面を追加しました");
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
          self.$store.commit("tagging/setPrivacySetting", "public");

          //check if there is editing new playlist
          await self.$store.dispatch("playlist/getNewPlaylistId");
          if (!self.newPlaylistId) {
            //プレイリストを新規作成しIDをplaylist storeのnewPlaylistIdに保存
            await self.$store.dispatch("playlist/createPlaylist", {
              newPlaylistName: "",
              privacySetting: self.privacySetting,
              currentTagId: "",
              currentCategory: self.currentCategory,
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
          self.$store.commit("snackbar/setText", "新しい場面を追加しました");
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
        this.pushTelops({
          telopPosition: this.telopPosition,
          telopColor: this.telopColor,
          telopSize: this.telopSize,
          telopStart: this.timeMath.toHis(this.currentTime),
          telopDuration: this.telopDuration,
          telopText: this.telopText,
        });

        this.ytInputData.telops = this.telops;
        window.sessionStorage.setItem(
          "ytInputData",
          JSON.stringify(this.ytInputData)
        );
      }
    },
    seekToTelop(row) {
      this.player.seekTo(
        this.convertToSec(this.formatToMinSec(row.telopStart))
      );
    },
    deleteTelop(item) {
      this.deleteIndex = this.telops.indexOf(item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.spliceTelops(this.deleteIndex);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.deleteIndex = -1;
      });
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
    await this.$store.dispatch("youtube/getTag");

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
