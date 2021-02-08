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
      <v-sheet v-if="isPlayerReady" class="highlightControllerBody">
        <v-container class="ma-0 pa-0" fluid>
          <v-row class="ma-0 pa-0 text-left" align="start">
            <v-col>
              <v-img
                src="/storage/icons/yt_social_red.png"
                width="28px"
                max-height="28px"
                class="float-left mr-2"
                alt="YouTube logo"
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

      <v-sheet
        v-if="player != null"
        tile
        class="ma-0 pa-0"
        v-bind:class="isIOS ? 'iosBottomPosition' : 'bottomPosition'"
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
import YTIframe from "../components/YTIframe";
import YTPlayerController from "../components/YTPlayerController";
import YTSeekBar from "../components/YTSeekBar";
import myMixin from "../util";

export default {
  components: {
    HighlightHeader,
    YTIframe,
    YTPlayerController,
    YTSeekBar,
  },
  data() {
    return {
      ytIframeParameterReady: false,
      timer: null,
      startTimeInput: null,
      endTimeInput: null,
      highlightBodyRef: this.$refs.highlightBody,
      isAdding: false,
      isEditing: false,
      playlistIdToAdd: null,
      playlistIdToEdit: null,
      tagIdToEdit: null,
      isIOS: false,
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
      tagAndVideoData: "watch/tagAndVideoData",
      tagDataArray: "youtube/tagDataArray",
      isNew: "youtube/isNew",
      newVideoData: "youtube/newVideoData",
      videoData: "youtube/videoData",
      currentTime: "youtube/currentTime",
      youtubeId: "ytPlayer/youtubeId",
      player: "ytPlayer/player",
      isPlayerReady: "ytPlayer/isPlayerReady",
      isMuted: "ytPlayer/isMuted",
    }),
  },
  methods: {
    ...mapMutations({
      setPlayer: "ytPlayer/setPlayer",
      setIsMuted: "ytPlayer/setIsMuted",
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
        this.isEditing = true;
        this.playlistIdToEdit = this.$route.query.playlist;
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
      this.$store.commit("ytPlayer/setPlaySpeed", 1);

      this.isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);

      //headerの戻るアイコンを表示
      this.$store.commit("highlightHeader/setShowBackIcon", true);
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
    loadTimeInput(youtubeId) {
      let ytInputData = JSON.parse(
        window.sessionStorage.getItem("ytInputData")
      );
      if (ytInputData && ytInputData.youtubeId == youtubeId) {
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
          path: "/youtube/highlight",
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
    startTimeInput() {
      this.$store.commit("ytSeekBar/setStartTimeInput", this.startTimeInput);
    },
    endTimeInput() {
      this.$store.commit("ytSeekBar/setEndTimeInput", this.endTimeInput);
    },
    isPlayerReady() {
      if (this.isPlayerReady) {
        this.setYtPlayerCSS();
        this.$refs.ytSeekBar.setYtSeekbarWrapperTop();
      }
    },
  },
  async mounted() {
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

    //load start & end time
    this.loadTimeInput(youtubeId);

    //YTPlayerのまとめの再生に必要なパラメータをセット
    let listOfYoutubeIdStartEndTime = [];
    let dataOfYoutubeIdStartEndTime = [];
    dataOfYoutubeIdStartEndTime[0] = [];
    dataOfYoutubeIdStartEndTime[0].youtubeId = youtubeId;
    this.startTimeInput
      ? (dataOfYoutubeIdStartEndTime[0].start = "00:" + this.startTimeInput)
      : (dataOfYoutubeIdStartEndTime[0].start = "");
    dataOfYoutubeIdStartEndTime[0].end = "";
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
    //headerの戻るアイコンを非表示
    this.$store.commit("highlightHeader/setShowBackIcon", false);
  },
};
</script>
