<template>
  <div class="container--small">
    <HighlightHeader />
    <div class="highlight-body" ref="highlightBody">
      <div class="ytPlayerWrapper" ref="ytPlayerWrapper">
        <div id="player"></div>
        <YTPlayerController v-show="isPlayerReady" ref="YTPlayerController" />
        <YTSeekBar
          v-show="isPlayerReady"
          ref="ytSeekBar"
          v-bind:highlightBodyRef="highlightBodyRef"
        />
      </div>
      <v-sheet v-if="player != null" class="highlightControllerBody">
        <v-container class="ma-0 pa-0" fluid>
          <v-row class="ma-0 pa-0 text-left" align="center">
            <v-col>
              <v-img
                src="/storage/icons/yt_social_red.png"
                width="28px"
                max-height="28px"
                class="float-left mr-2"
              />
              <span v-if="isNew">{{ newVideoData.title }}</span>
              <span v-else>{{ videoData.title }}</span></v-col
            >
          </v-row>

          <v-row class="ma-0 pt-4">
            <v-col class="text-center now-playing">
              <img src="/storage/icons/now_playing.svg" />
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
                      style="font-weight: normal; border-color:#bdbdbd;"
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
        class="ma-0 pa-0 bottom-position"
        width="100%"
      >
        <v-container class="ma-0 pa-0" fluid>
          <v-row align="center" class="ma-0 pa-0">
            <v-col class="text-right ma-0 pa-2">
              <v-btn
                color="red lighten-2 white--text"
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
    <ConfirmationModal v-if="showConfirmationModal" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import HighlightHeader from "../components/HighlightHeader.vue";
import TagItem from "../components/TagItem.vue";
import TimeControl from "../components/TimeControl.vue";
import YTPlayerController from "../components/YTPlayerController";
import YTSeekBar from "../components/YTSeekBar";
import NoLoginModal from "../components/NoLoginModal.vue";
import ConfirmationModal from "../components/ConfirmationModal.vue";
import myMixin from "../util";

export default {
  components: {
    HighlightHeader,
    TagItem,
    TimeControl,
    YTPlayerController,
    YTSeekBar,
    NoLoginModal,
    ConfirmationModal,
  },
  data() {
    return {
      show: true,
      snackbar: false,
      timeout: 5000,
      text: "シーンタグを登録しました",
      timer: null,
      highlightBodyRef: this.$refs.highlightBody,
      isPlayerReady: false,
      isPlaying: true,
      isDisabled: false,
      isAdding: false,
      isEditing: false,
      playlistIdToAdd: null,
      playlistIdToEdit: null,
      tagIdToEdit: null,
      tags: [],
      tagItems: [],
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isLogin: "auth/check",
      youtubeId: "youtube/youtubeId",
      tagDataArray: "youtube/tagDataArray",
      isNew: "youtube/isNew",
      newVideoData: "youtube/newVideoData",
      videoData: "youtube/videoData",
      currentTime: "youtube/currentTime",
      currentCategory: "youtube/currentCategory",
      player: "ytPlayerController/player",
      start: "tagging/start",
      end: "tagging/end",
      privacySetting: "tagging/privacySetting",
      showLoginModal: "noLoginModal/showLoginModal",
      newPlaylistId: "playlist/newPlaylistId",
      showConfirmationModal: "confirmationModal/showConfirmationModal",
      tagAndVideoData: "watch/tagAndVideoData",
    }),
  },
  methods: {
    ...mapMutations({
      setPlayer: "ytPlayerController/setPlayer",
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
        this.isAdding = true;
        this.playlistIdToAdd = this.$route.query.playlist;
      } else if (this.$route.path == "/edit/confirm") {
        this.playlistIdToEdit = this.$route.query.playlist;
        this.isEditing = true;
        this.tagIdToEdit = this.$route.query.tag;

        //動画・タグデータを取得
        await this.$store.dispatch(
          "watch/getTagAndVideoDataById",
          this.tagIdToEdit
        );

        //set tags data for editing
        this.setEditingTagData();
      }
    },
    //set tags data for editing
    setEditingTagData() {
      let defaultTags = this.tagAndVideoData[0].tags.split(/::/);
      this.$store.commit("tagging/setTags", defaultTags);
      this.tags = defaultTags;
    },
    //シーンタグ完了のトーストを表示
    taggingSucceed() {
      this.snackbar = true;
    },
    checkRouting() {
      if (this.start == null || this.end == null) {
        this.$router
          .push({
            path: "/highlight",
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
    },
    //以前入力された開始・終了時間をセッションストレージからロード
    loadTimeInput() {
      let ytInputData = JSON.parse(
        window.sessionStorage.getItem("ytInputData")
      );
      if (ytInputData && ytInputData.youtubeId == this.youtubeId) {
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
    confirm() {
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
        setTimeout(async function() {
          //ログイン済の場合
          if (self.isEditing) {
            //編集の場合
            //入力済データ(除く、保存先プレイリスト)をセット
            self.$store.commit("tagging/setTagId", self.tagIdToEdit);
            self.$store.commit("tagging/setTags", self.tags);
            self.$store.commit("tagging/setPrivacySetting", "public");

            //ローディングを表示し、OKボタンを無効化
            self.$store.commit("highlightHeader/setIsLoading");
            self.isDisabled = true;

            //シーンを更新
            await self.$store.dispatch("tagging/updateSceneTags");

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
                playlistName: "",
                privacySetting: self.privacySetting,
                currentTagId: "",
                currentCategory: self.currentCategory,
              });
            }

            //新しく作成したplaylistIdをセット
            self.$store.commit(
              "tagging/setMyPlaylistToSave",
              self.newPlaylistId
            );

            //ローディングを表示し、OKボタンを無効化
            self.$store.commit("highlightHeader/setIsLoading");
            self.isDisabled = true;

            //場面のデータを登録
            await self.$store.dispatch("tagging/storeSceneTags");

            //ローディングを非表示
            self.$store.commit("highlightHeader/setNotLoading");

            //display scene tagging complete modal
            self.$store.commit("confirmationModal/openConfirmationModal");
          }

          //セッションに保存してある開始・終了時間データを破棄
          window.sessionStorage.removeItem("ytInputData");
        });
      }
    },
  },
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route() {
      this.initialize();
    },
    isPlayerReady() {
      this.isPlayerReady ? this.$refs.ytSeekBar.setYtSeekbarWrapperTop() : "";
    },
  },
  async created() {
    this.initialize();

    //必要データを取得するまでTagItemは非表示
    this.$store.commit("youtube/setIsReady", false);

    //URLからyoutubeIdを格納
    let youtubeId = this.$route.query.v;

    //必要データを取得
    this.$store.commit("youtube/setYoutubeId", youtubeId);
    await this.$store.dispatch("youtube/getVideo");
    await this.$store.dispatch("youtube/getTag");

    if (this.isNew) {
      //新規動画・タグの場合はData APIから取得
      await this.$store.dispatch("youtube/getNewVideoData");
    }

    //ログイン済の場合ユーザーが作成したプレイリスト一覧を取得
    if (this.isLogin) {
      this.$store.dispatch("playlist/getMyCreatedPlaylist");
    }

    // This code loads the IFrame Player API code asynchronously.
    console.log("loading iframe script");
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    let self = this;

    //Youtube Playerの初期処理
    window.onYouTubeIframeAPIReady = () => {
      console.log("onYouTubeIframeAPIReady");
      //load start & end time
      this.loadTimeInput();

      let player = new YT.Player("player", {
        width: "560",
        height: "315",
        videoId: this.youtubeId,
        playerVars: {
          start: this.start ? this.convertToSec(this.start) : "",
          end: this.end ? this.convertToSec(this.end) : "",
          playsinline: 1,
          autoplay: 1,
          iv_load_policy: 3, //アノテーション非表示
          modestbranding: 1, //YouTubeロゴ非表示
          rel: 0, //関連動画非表示
          controls: 0, //プレイーコントロールを非表示
          fs: 0, //全画面表示ボタンを非表示
          iv_load_policy: 3, //動画アノテーションを非表示
          modestbranding: 1, //YouTubeロゴ非表示
          enablejsapi: 1, //postMessageを有効にするのに必要
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });

      //playerインスタンスをytPlayerControllerストアに格納
      self.setPlayer(player);
      console.log(player);

      //iframeの縦・横のサイズをセット(縦は952px、横は幅いっぱい)
      $("iframe").width($(".ytPlayerWrapper").width());
      $("iframe").height(952);

      //iframeとseekbarが見える範囲の高さをセットし、iframe上部の黒分が見えないよう上にスライド
      $(".ytPlayerWrapper").css(
        "height",
        ($("iframe").width() * 9) / 16 +
          (952 - ($("iframe").width() * 9) / 16) / 2 +
          15
      );
      $(".ytPlayerWrapper").css(
        "top",
        (($("iframe").height() - ($("iframe").width() * 9) / 16) / 2) * -1
      );

      this.$nextTick(() => {
        //開始・終了ボタンがiframeとseekbarの下に来るようにtopを調整
        $(".highlightControllerBody").css(
          "top",
          ($("iframe").width() * 9) / 16 + 15
        );
      });
    };
    // setTimeout(onYouTubeIframeAPIReady, 10);
    setTimeout(onYouTubeIframeAPIReady, 2000);

    window.onPlayerReady = (event) => {
      event.target.mute();
      event.target.playVideo();
      this.isPlayerReady = true;

      //1秒毎に現在の再生時間を取得しyoutubeストアのcurrentTimeにセット
      self.timer = setInterval(function() {
        //playerが取得した時間を「分:秒」に整形しcurrentTimeに格納
        let currentTime = self.formatTime(event.target.getCurrentTime());
        //currentTimeをyoutubeストアにセット
        self.$store.commit("youtube/setCurrentTime", currentTime);
      }, 1000);

      //TagItemを表示に切り替え
      this.$store.commit("youtube/setIsReady", true);
    };

    window.onPlayerStateChange = (event) => {
      if (event.data == YT.PlayerState.ENDED && this.isPlaying) {
        //フラグを停止中に反転
        this.isPlaying = !this.isPlaying;

        //リピート再生(開始時間に戻る)
        this.player.seekTo(this.convertToSec(this.start));
      }

      if (event.data == YT.PlayerState.PLAYING) {
        //フラグを再生中にセット
        this.isPlaying = true;
      }
    };

    //プレイリスト再生で戻るor進むが押された場合は画面を再ロード
    // let from = this.$route.path;
    // window.addEventListener("popstate", function(e) {
    //   let to = self.$route.path;
    //   if (from == "/youtube/confirm" && to == "/youtube/confirm") {
    //     location.reload();
    //   }
    // });

    //YTSeekBarのクリックイベント用にボディのrefをセット
    this.highlightBodyRef = this.$refs.highlightBody;
  },
  mounted() {
    //headerの戻るアイコンを表示
    this.$store.commit("highlightHeader/setShowBackIcon", true);
  },
  beforeDestroy() {
    // シーンタグ付けコンポーネントの現在再生時間をセットするインターバルを停止する
    clearInterval(this.timer);

    //headerの戻るアイコンを非表示
    this.$store.commit("highlightHeader/setShowBackIcon", false);
  },
};
</script>
