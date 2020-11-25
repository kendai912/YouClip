<template>
  <div class="container--small">
    <HighlightHeader />
    <div class="highlight-body">
      <div class="ytPlayerWrapper">
        <div id="player"></div>
      </div>
      <v-sheet tile v-if="player != null" class="highlightControllerBody">
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
          <v-row
            class="ma-0 pt-2 text-center"
            align="center"
            justify="space-around"
          >
            <v-col v-on:click="backwardFiveSec">
              <span>
                5秒戻る
                <i class="fas fa-step-backward fa-2x"></i>
              </span>
            </v-col>
            <v-col>
              <span>{{ currentTime }} / {{ duration }}</span>
            </v-col>
            <v-col v-on:click="forwardFiveSec">
              <span>
                <i class="fas fa-step-forward fa-2x"></i>
                5秒進む
              </span>
            </v-col>
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
                        <v-btn v-on:click="tapStartBtn" class="ma-0 pa-0">
                          <span class="green--text text--lighten-1">開始</span>
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
                        <v-btn v-on:click="tapStopBtn" class="ma-0 pa-0">
                          <span class="red--text text--darken-1">終了</span>
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
    </div>

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
</template>

<script>
import { mapState, mapGetters } from "vuex";
import HighlightHeader from "../components/HighlightHeader.vue";
import TagItem from "../components/TagItem.vue";
import TimeControl from "../components/TimeControl.vue";
import myMixin from "../util";

export default {
  components: {
    HighlightHeader,
    TagItem,
    TimeControl,
  },
  data() {
    return {
      show: true,
      player: null,
      snackbar: false,
      timeout: 5000,
      text: "シーンタグを登録しました",
      timer: null,
      startTimeInput: null,
      endTimeInput: null,
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
      currentTime: "youtube/currentTime",
      isNew: "youtube/isNew",
      videoData: "youtube/videoData",
      newVideoData: "youtube/newVideoData",
    }),
    duration() {
      if (this.isNew) {
        return this.newVideoData ? this.newVideoData.duration : "0:00";
      } else {
        return this.videoData
          ? this.formatToMinSec(this.videoData.duration)
          : "0:00";
      }
    },
  },
  methods: {
    initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);

      //headerの文言をセット
      this.$store.commit(
        "highlightHeader/setHeaderMessage",
        "切り抜く場面を指定"
      );

      //headerに戻るアイコンを表示
      this.$store.commit("highlightHeader/setShowBackIcon", true);
    },
    //シーンタグ完了のトーストを表示
    taggingSucceed() {
      this.snackbar = true;
    },
    //5秒戻る
    backwardFiveSec() {
      this.player.seekTo(this.convertToSec(this.currentTime) - 5);
    },
    //5秒進む
    forwardFiveSec() {
      this.player.seekTo(this.convertToSec(this.currentTime) + 5);
    },
    tapStartBtn() {
      this.startTimeInput = this.currentTime;
      this.player.playVideo();
    },
    tapStopBtn() {
      this.endTimeInput = this.currentTime;
      this.player.pauseVideo();
    },
    // タグ入力へ進む
    next() {
      // if (this.$refs.form.validate()) {
      //   this.$store.commit("tagging/setStart", this.startTimeInput);
      //   this.$store.commit("tagging/setEnd", this.endTimeInput);
      //   this.$store.commit("highlight/setDisplayComponent", "Scene");
      // }
    },
  },
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route() {
      this.initialize();
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
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    let self = this;

    //Youtube Playerの初期処理
    window.onYouTubeIframeAPIReady = () => {
      self.player = new YT.Player("player", {
        width: "560",
        height: "315",
        videoId: this.youtubeId,
        playerVars: {
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

      //iframeの縦・横のサイズをセット(縦は952px、横は幅いっぱい)
      $("iframe").width($(".ytPlayerWrapper").width());
      $("iframe").height(952);

      //iframeが見える範囲の高さをセットし、iframe上部の黒分が見えないよう上にスライド
      $(".ytPlayerWrapper").css(
        "height",
        ($("iframe").width() * 9) / 16 +
          (952 - ($("iframe").width() * 9) / 16) / 2
      );
      $(".ytPlayerWrapper").css(
        "top",
        (($("iframe").height() - ($("iframe").width() * 9) / 16) / 2) * -1
      );

      //開始・終了ボタンがiframeの下に来るようにtopを調整
      this.$nextTick(() => {
        $(".highlightControllerBody").css(
          "top",
          ($("iframe").width() * 9) / 16
        );
      });
    };
    setTimeout(onYouTubeIframeAPIReady, 10);

    window.onPlayerReady = (event) => {
      event.target.mute();
      event.target.playVideo();
      this.isPlayerReady = true;

      //0.4秒毎に現在の再生時間を取得しyoutubeストアのcurrentTimeにセット
      self.timer = setInterval(function() {
        //playerが取得した時間を「分:秒」に整形しcurrentTimeに格納
        let currentTime = self.formatTime(event.target.getCurrentTime());
        //currentTimeをyoutubeストアにセット
        self.$store.commit("youtube/setCurrentTime", currentTime);
      }, 400);

      //TagItemを表示に切り替え
      this.$store.commit("youtube/setIsReady", true);
    };

    window.onPlayerStateChange = (event) => {};

    //プレイリスト再生で戻るor進むが押された場合は画面を再ロード
    let from = this.$route.path;
    window.addEventListener("popstate", function(e) {
      let to = self.$route.path;
      if (from == "/youtube" && to == "/youtube") {
        location.reload();
      }
    });
  },
  beforeDestroy() {
    // シーンタグ付けコンポーネントの現在再生時間をセットするインターバルを停止する
    clearInterval(this.timer);

    //headerの戻るアイコンを非表示
    this.$store.commit("highlightHeader/setShowBackIcon", false);
  },
};
</script>
