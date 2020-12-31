<template>
  <div class="container--small">
    <HighlightHeader />
    <div class="highlight-body" ref="highlightBody">
      <div class="ytPlayerWrapper" ref="ytPlayerWrapper">
        <div id="playerYoutube"></div>
        <YTPlayerController v-show="isPlayerReady" ref="YTPlayerController" />
        <YTSeekBar
          v-show="isPlayerReady"
          ref="ytSeekBar"
          v-bind:bodyRef="highlightBodyRef"
        />
      </div>
      <v-sheet v-if="player != null" class="highlightControllerBody">
        <v-container class="ma-0 pa-0" fluid>
          <v-row class="ma-0 pa-0 text-left" align="start">
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

          <v-form ref="form">
            <v-row class="ma-0 pt-4" align="center">
              <v-col class="ma-0 pa-0">
                <v-card class="ma-0" tile elevation="0">
                  <v-row class="ma-0 pa-0">
                    <v-col class="ma-0 pa-0" justify="center">
                      <v-bottom-navigation
                        class="bottom_navigation_no_shadow"
                        elevation="0"
                        height="64"
                      >
                        <v-btn v-on:click.stop="tapStartBtn" class="ma-0 pa-0">
                          <span class="green--text text--lighten-1"
                            >開始時間を指定</span
                          >
                          <v-icon color="green lighten-1" x-large
                            >alarm_on</v-icon
                          >
                        </v-btn>
                      </v-bottom-navigation>
                    </v-col>
                  </v-row>
                  <v-row class="ma-0 pa-0" justify="center">
                    <v-col class="ma-0 pa-0" cols="3">
                      <v-text-field
                        v-model="startTimeInput"
                        v-bind:rules="startRules"
                        required
                        placeholder="0:00"
                        validate-on-blur
                        flat
                        class="ma-0 pa-0 centered-input"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col class="ma-0 pa-0">
                <v-card class="ma-0" tile elevation="0">
                  <v-row class="ma-0 pa-0">
                    <v-col class="ma-0 pa-0" justify="center">
                      <v-bottom-navigation
                        class="bottom_navigation_no_shadow"
                        elevation="0"
                        height="64"
                      >
                        <v-btn v-on:click.stop="tapStopBtn" class="ma-0 pa-0">
                          <span class="red--text text--darken-1"
                            >終了時間を指定</span
                          >
                          <v-icon color="red darken-1" x-large
                            >alarm_off</v-icon
                          >
                        </v-btn>
                      </v-bottom-navigation>
                    </v-col>
                  </v-row>
                  <v-row class="ma-0 pa-0" justify="center">
                    <v-col class="ma-0 pa-0" cols="3">
                      <v-text-field
                        v-model="endTimeInput"
                        v-bind:rules="endRules"
                        required
                        placeholder="0:00"
                        validate-on-blur
                        flat
                        class="ma-0 pa-0 centered-input"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
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
              <v-btn color="red lighten-2 white--text" v-on:click="next"
                >確認</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import HighlightHeader from "../components/HighlightHeader.vue";
import TagItem from "../components/TagItem.vue";
import TimeControl from "../components/TimeControl.vue";
import YTPlayerController from "../components/YTPlayerController";
import YTSeekBar from "../components/YTSeekBar";
import myMixin from "../util";

export default {
  components: {
    HighlightHeader,
    TagItem,
    TimeControl,
    YTPlayerController,
    YTSeekBar,
  },
  data() {
    return {
      show: true,
      snackbar: false,
      timeout: 5000,
      text: "シーンタグを登録しました",
      timer: null,
      startTimeInput: null,
      endTimeInput: null,
      highlightBodyRef: this.$refs.highlightBody,
      isPlayerReady: false,
      isAdding: false,
      isEditing: false,
      playlistIdToAdd: null,
      playlistIdToEdit: null,
      tagIdToEdit: null,
      startRules: [
        (v) => !!v || "開始時間を入力して下さい",
        (v) => {
          let regex = /^\d+:\d{1,2}$/;
          if (!v || regex.test(v)) {
            return true;
          }

          if (!regex.test(v)) {
            return "分:秒の形式で入力して下さい";
          }
        },
      ],
      endRules: [
        (v) => !!v || "終了時間を入力して下さい",
        (v) => {
          let regex = /^\d+:\d{1,2}$/;
          if (!v || regex.test(v)) {
            return true;
          }

          if (!regex.test(v)) {
            return "分:秒の形式で入力して下さい";
          }
        },
        (v) => {
          if (this.startTimeInput) {
            if (
              parseInt(this.convertToSec(v)) <=
              parseInt(this.convertToSec(this.startTimeInput))
            ) {
              return "開始時間より後ろの時間を入力下さい";
            }
          }
          return true;
        },
      ],
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
      player: "ytPlayerController/player",
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
        "切り抜く場面を指定"
      );

      //clear all data before loading
      this.clearAllInput();

      //既存プレイリストへの追加かシーンの編集か新規かを判別
      if (this.$route.path == "/add/highlight") {
        this.isAdding = true;
        this.playlistIdToAdd = this.$route.query.playlist;
      } else if (this.$route.path == "/edit/highlight") {
        this.playlistIdToEdit = this.$route.query.playlist;
        this.isEditing = true;
        this.tagIdToEdit = this.$route.query.tag;

        //動画・タグデータを取得
        await this.$store.dispatch(
          "watch/getTagAndVideoDataById",
          this.tagIdToEdit
        );

        //set default data for editing
        this.setEditingTimeData();
      }

      //倍速視聴を1倍のリセット
      this.$store.commit("watch/setPlaySpeed", 1);
    },
    setEditingTimeData() {
      this.$store.commit(
        "ytSeekBar/setStartTimeInput",
        this.formatToMinSec(this.tagAndVideoData[0].start)
      );
      this.$store.commit(
        "ytSeekBar/setEndTimeInput",
        this.formatToMinSec(this.tagAndVideoData[0].end)
      );
      this.$store.commit(
        "tagging/setStart",
        this.formatToMinSec(this.tagAndVideoData[0].start)
      );
      this.$store.commit(
        "tagging/setEnd",
        this.formatToMinSec(this.tagAndVideoData[0].end)
      );
      this.startTimeInput = this.formatToMinSec(this.tagAndVideoData[0].start);
      this.endTimeInput = this.formatToMinSec(this.tagAndVideoData[0].end);
    },
    //シーンタグ完了のトーストを表示
    taggingSucceed() {
      this.snackbar = true;
    },
    tapStartBtn() {
      this.startTimeInput = this.currentTime;

      // call child component's methods
      this.$refs.YTPlayerController.setImmediateHide();
      this.$refs.YTPlayerController.setIsPlaying();
      this.$refs.YTPlayerController.toggleController();

      this.player.playVideo();
    },
    tapStopBtn() {
      this.endTimeInput = this.currentTime;

      // call child component's methods
      this.$refs.YTPlayerController.toggleController();
      this.$refs.YTPlayerController.pauseVideo();
    },
    //youtubeIdおよび入力された開始・終了時間をセッションストレージに保存
    saveTimeInput(youtubeId, startTimeInput, endTimeInput) {
      let ytInputData = {
        youtubeId: youtubeId,
        startTimeInput: startTimeInput,
        endTimeInput: endTimeInput,
      };
      window.sessionStorage.setItem("ytInputData", JSON.stringify(ytInputData));
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
        this.startTimeInput = ytInputData.startTimeInput;
        this.endTimeInput = ytInputData.endTimeInput;
        this.$store.commit(
          "ytSeekBar/setStartTimeInput",
          ytInputData.startTimeInput
        );
        this.$store.commit(
          "ytSeekBar/setEndTimeInput",
          ytInputData.endTimeInput
        );
      }
    },
    // タグ入力へ進む
    next() {
      if (this.$refs.form.validate()) {
        this.$store.commit("tagging/setStart", this.startTimeInput);
        this.$store.commit("tagging/setEnd", this.endTimeInput);
        this.saveTimeInput(
          this.youtubeId,
          this.startTimeInput,
          this.endTimeInput
        );

        clearInterval(this.timer);

        if (this.isAdding) {
          //プレイリストへの追加用の確認ページを表示
          this.$router
            .push({
              path: "/add/confirm",
              query: {
                playlist: this.playlistIdToAdd,
                v: this.youtubeId,
              },
            })
            .catch((err) => {});
        } else if (this.isEditing) {
          //シーン編集用の確認ページを表示
          this.$router
            .push({
              path: "/edit/confirm",
              query: {
                playlist: this.playlistIdToEdit,
                tag: this.tagIdToEdit,
                v: this.youtubeId,
              },
            })
            .catch((err) => {});
        } else {
          //新規の確認ページを表示
          this.$router
            .push({
              path: "/youtube/confirm",
              query: {
                v: this.youtubeId,
              },
            })
            .catch((err) => {});
        }
      }
    },
    setYtPlayerCSS() {
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

      //開始・終了ボタンがiframeとseekbarの下に来るようにtopを調整
      $(".highlightControllerBody").css(
        "top",
        ($("iframe").width() * 9) / 16 + 15
      );
    },
  },
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route() {
      this.initialize();
    },
    startTimeInput() {
      this.$store.commit("ytSeekBar/setStartTimeInput", this.startTimeInput);
    },
    endTimeInput() {
      this.$store.commit("ytSeekBar/setEndTimeInput", this.endTimeInput);
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
    var tag = document.createElement("script");
    tag.src =
      "https://www.youtube.com/iframe_api?" + parseInt(new Date() / 1000);
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    let self = this;

    //Youtube Playerの初期処理
    window.onYouTubeIframeAPIReady = () => {
      //load start & end time
      this.loadTimeInput();

      let player = new YT.Player("playerYoutube", {
        width: "560",
        height: "315",
        videoId: this.youtubeId,
        playerVars: {
          start: this.startTimeInput
            ? this.convertToSec(this.startTimeInput)
            : "",
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
    };
    setTimeout(onYouTubeIframeAPIReady, 100);

    window.onPlayerReady = (event) => {
      self.setYtPlayerCSS();

      event.target.mute();
      event.target.playVideo();
      this.isPlayerReady = true;

      //現在の再生時間を取得しyoutubeストアのcurrentTimeにセット
      self.timer = setInterval(function() {
        //playerが取得した時間を「分:秒」に整形しcurrentTimeに格納
        let currentTime = self.formatTime(event.target.getCurrentTime());
        //currentTimeをyoutubeストアにセット
        self.$store.commit("youtube/setCurrentTime", currentTime);
      });

      //TagItemを表示に切り替え
      this.$store.commit("youtube/setIsReady", true);
    };

    window.onPlayerStateChange = (event) => {};

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
