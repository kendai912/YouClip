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

          <v-row class="ma-0 pt-4">
            <v-col class="text-center now-playing">
              <img
                src="/storage/icons/now_playing.svg"
                alt="now playing"
                loading="lazy"
              />
              <span>{{ start }}-{{ end }}の場面を再生中</span>
            </v-col>
          </v-row>

          <v-row class="ma-0 pa-0" align="center">
            <v-col>
              <v-form ref="form" class="ma-0 pa-0">
                <v-combobox
                  v-model="tags"
                  v-bind:items="tagItems"
                  required
                  validate-on-blur
                  chips
                  clearable
                  label="(任意) タグを入力　例: 「◯◯の場面」"
                  multiple
                  flat
                  dense
                  small-chips
                  class="sceneTagInputBox"
                >
                  <template v-slot:selection="{ attrs, item, selected }">
                    <v-chip
                      v-bind="attrs"
                      v-show="item"
                      :input-value="selected"
                      class="my-tag-chip pr-2"
                      text-color="black"
                      style="font-weight: normal; border-color: #bdbdbd"
                      outlined
                      small
                    >
                      {{ item }}
                    </v-chip>
                  </template>
                </v-combobox>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
      <v-snackbar v-model="snackbar" v-bind:timeout="timeout">
        {{ text }}
        <v-btn color="blue" text v-on:click="snackbar = false">Close</v-btn>
      </v-snackbar>

      <v-sheet
        v-if="player != null"
        tile
        class="ma-0 pa-0"
        width="100%"
        v-bind:class="isIOS ? 'iosBottomPosition' : 'bottomPosition'"
      >
        <v-container class="ma-0 pa-0" fluid>
          <v-row align="center" class="ma-0 pa-0">
            <v-col class="text-right ma-0 pa-2">
              <v-btn
                v-if="isVideoDataReady"
                color="red lighten-1 white--text"
                v-bind:disabled="isDisabled"
                v-on:click="confirm"
                >OK</v-btn
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
import { mapState, mapGetters, mapMutations } from "vuex";
import HighlightHeader from "../components/HighlightHeader.vue";
import YTIframe from "../components/YTIframe";
import YTPlayerController from "../components/YTPlayerController";
import YTSeekBar from "../components/YTSeekBar";
import NoLoginModal from "../components/NoLoginModal.vue";
import myMixin from "../util";

export default {
  components: {
    HighlightHeader,
    YTIframe,
    YTPlayerController,
    YTSeekBar,
    NoLoginModal,
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
    }),
    async initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);

      //headerの文言をセット
      this.$store.commit(
        "highlightHeader/setHeaderMessage",
        "切り抜いた場面を確認"
      );

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
      let ytInputData = JSON.parse(
        window.sessionStorage.getItem("ytInputData")
      );
      if (ytInputData && ytInputData.youtubeId == youtubeId) {
        this.$store.commit("tagging/setStart", ytInputData.startTimeInput);
        this.$store.commit("tagging/setEnd", ytInputData.endTimeInput);
        this.$store.commit(
          "ytSeekBar/setStartTimeInput",
          ytInputData.startTimeInput
        );
        this.$store.commit(
          "ytSeekBar/setEndTimeInput",
          ytInputData.endTimeInput
        );
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
        // setTimeout(async function() {
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
          self.$store.commit("snackbar/setSnackbar", true);
          self.$store.commit("snackbar/setTimeout", 5000);

          //return to the playlist edit page
          self.$router
            .push({
              path: "/highlight/scenelist",
            })
            .catch((err) => {});
        }

        //セッションに保存してある開始・終了時間データを破棄
        window.sessionStorage.removeItem("ytInputData");
        // });
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
      ? (dataOfYoutubeIdStartEndTime[0].start = "00:" + this.start)
      : (dataOfYoutubeIdStartEndTime[0].start = "");
    this.end
      ? (dataOfYoutubeIdStartEndTime[0].end = "00:" + this.end)
      : (dataOfYoutubeIdStartEndTime[0].end = "");
    dataOfYoutubeIdStartEndTime[0].scene_order = 1;

    this.putTagVideoIntolistOfYoutubeIdStartEndTime(
      listOfYoutubeIdStartEndTime,
      dataOfYoutubeIdStartEndTime
    );
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
