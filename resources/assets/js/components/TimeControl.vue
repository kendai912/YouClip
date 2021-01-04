<template>
  <v-sheet height="240" tile class="text-center">
    <v-sheet tile class="ma-0 pa-1">
      <v-container class="ma-0 pa-0" fluid>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <span>開始・終了時間を指定</span>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-divider></v-divider>

    <v-container class="ma-0 pa-0" fluid>
      <v-row class="ma-0 pa-0" align="center" justify="space-around">
        <v-col v-on:click="backwardThirtySec" class="ma-0 pa-0">
          <span>
            30
            <i class="fas fa-fast-backward fa-2x"></i>
          </span>
        </v-col>
        <v-col v-on:click="backwardFiveSec">
          <span>
            5
            <i class="fas fa-step-backward fa-2x"></i>
          </span>
        </v-col>
        <v-col>
          <i v-on:click="playVideo" class="fas fa-play fa-2x"></i>
          <i v-on:click="pauseVideo" class="fas fa-pause fa-2x"></i>
        </v-col>
        <v-col v-on:click="forwardFiveSec">
          <span>
            <i class="fas fa-step-forward fa-2x"></i>
            5
          </span>
        </v-col>
        <v-col v-on:click="forwardThirtySec">
          <span>
            <i class="fas fa-fast-forward fa-2x"></i>
            30
          </span>
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0">
        <v-col class="ma-0 pa-0">
          <span>{{ currentTime }} / {{ duration }}</span>
        </v-col>
      </v-row>
    </v-container>

    <v-form ref="form">
      <v-container class="ma-0 pa-0" fluid>
        <v-row class="ma-0 pa-0" align="center">
          <v-col class="ma-0 pa-0">
            <v-card class="ma-0" tile elevation="0">
              <v-row class="ma-0 pa-0 flex-nowrap">
                <v-col class="ma-0 pa-0 d-flex align-start">
                  <v-bottom-navigation
                    class="bottom_navigation_no_shadow"
                    elevation="0"
                    height="64"
                    style="justify-content: flex-end;"
                  >
                    <v-btn v-on:click="tapStartBtn" class="ma-0 pa-0">
                      <span>START</span>
                      <v-icon x-large>alarm_on</v-icon>
                    </v-btn>
                  </v-bottom-navigation>
                </v-col>
                <v-col class="ma-0 pa-0 d-flex align-end">
                  <v-text-field
                    v-model="startTimeInput"
                    v-bind:rules="startRules"
                    required
                    placeholder="0:00"
                    validate-on-blur
                    flat
                    class="ma-0 pa-0 short-text-field"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col class="ma-0 pa-0">
            <v-card class="ma-0" tile elevation="0">
              <v-row class="ma-0 pa-0 flex-nowrap">
                <v-col class="ma-0 pa-0 d-flex align-start">
                  <v-bottom-navigation
                    class="bottom_navigation_no_shadow"
                    elevation="0"
                    height="64"
                    style="justify-content: flex-end;"
                  >
                    <v-btn v-on:click="tapStopBtn" class="ma-0 pa-0">
                      <span>STOP</span>
                      <v-icon x-large>alarm_off</v-icon>
                    </v-btn>
                  </v-bottom-navigation>
                </v-col>
                <v-col class="ma-0 pa-0 d-flex align-end">
                  <v-text-field
                    v-model="endTimeInput"
                    v-bind:rules="endRules"
                    required
                    placeholder="0:00"
                    validate-on-blur
                    flat
                    class="ma-0 pa-0 short-text-field"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-sheet tile class="ma-0 pa-0 iosBottomPosition" width="100%">
      <v-container class="ma-0 pa-0" fluid>
        <v-row align="center" class="ma-0 pa-0">
          <v-col class="text-left ma-0 pa-1">
            <i v-on:click="back" class="fas fa-arrow-left fa-2x my-grey"></i>
          </v-col>
          <v-col class="text-center ma-0 pa-1">
            <v-bottom-navigation
              class="bottom_navigation_no_shadow"
              elevation="0"
            >
              <v-btn
                v-on:click="openPlaySpeedModal"
                class="ma-0 pa-0 narrow-btn"
              >
                <span>倍速視聴</span>
                <v-img
                  src="/storage/icons/play_speed.png"
                  width="36px"
                  max-height="36px"
                />
              </v-btn>
              <v-btn v-if="isMuted" v-on:click="unmute">
                <span>ミュート解除</span>
                <v-icon large>volume_off</v-icon>
              </v-btn>
              <v-btn v-else v-on:click="mute">
                <span>ミュート</span>
                <v-icon large>volume_up</v-icon>
              </v-btn>
            </v-bottom-navigation>
          </v-col>
          <v-col class="text-right ma-0 pa-1">
            <div>
              <v-btn color="error" v-on:click="next">次へ</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <PlaySpeedModal v-if="showPlaySpeedModal" v-bind:player="player" />
  </v-sheet>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";
import PlaySpeedModal from "../components/PlaySpeedModal.vue";

export default {
  components: {
    PlaySpeedModal,
  },
  props: {
    player: Object,
  },
  data() {
    return {
      sheet: true,
      slider: { val: 0, color: "red" },
      sliderInterval: null,
      startTimeInput: null,
      endTimeInput: null,
      isMuted: true,
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
      currentTime: "youtube/currentTime",
      videoData: "youtube/videoData",
      newVideoData: "youtube/newVideoData",
      isReady: "youtube/isReady",
      isNew: "youtube/isNew",
      isEditing: "tagging/isEditing",
      showPlaySpeedModal: "playSpeedModal/showPlaySpeedModal",
      isLogin: "auth/check",
    }),
    duration() {
      return this.isNew
        ? this.newVideoData.duration
        : this.formatToMinSec(this.videoData.duration);
    },
  },
  methods: {
    ...mapMutations({
      openPlaySpeedModal: "playSpeedModal/openPlaySpeedModal",
    }),
    tapStartBtn() {
      this.startTimeInput = this.currentTime;
      this.player.playVideo();
    },
    tapStopBtn() {
      this.endTimeInput = this.currentTime;
      this.player.pauseVideo();
    },
    //再生
    playVideo() {
      this.player.playVideo();
    },
    //一時停止
    pauseVideo() {
      this.player.pauseVideo();
    },
    //30秒戻る
    backwardThirtySec() {
      this.player.seekTo(this.convertToSec(this.currentTime) - 30);
    },
    //5秒戻る
    backwardFiveSec() {
      this.player.seekTo(this.convertToSec(this.currentTime) - 5);
    },
    //30秒進む
    forwardThirtySec() {
      this.player.seekTo(this.convertToSec(this.currentTime) + 30);
    },
    //5秒進む
    forwardFiveSec() {
      this.player.seekTo(this.convertToSec(this.currentTime) + 5);
    },
    // タグ入力へ進む
    next() {
      if (this.$refs.form.validate()) {
        this.$store.commit("tagging/setStart", this.startTimeInput);
        this.$store.commit("tagging/setEnd", this.endTimeInput);
        this.$store.commit("tagging/setShowTaggingControl", "TaggingControl");
        if (!this.isLogin) {
          localStorage.setItem("startTime", this.startTimeInput);
          localStorage.setItem("endTime", this.endTimeInput);
          localStorage.setItem("showTaggingControl", "TaggingControl");
        }
      }
    },
    back() {
      this.isEditing
        ? this.$store.commit("tagging/setShowSceneTagControl", false)
        : this.$router.go(-1);

      //編集モードフラグを解除
      this.$store.commit("tagging/setIsEditing", false);
    },
    unmute() {
      this.player.unMute();
      this.isMuted = false;
    },
    mute() {
      this.player.mute();
      this.isMuted = true;
    },
    //初期化処理
    initialize() {
      if (localStorage.getItem("startTime")) {
        this.startTimeInput = localStorage.getItem("startTime");
      } else {
        this.startTimeInput = this.$store.getters["tagging/start"];
      }

      if (localStorage.getItem("endTime")) {
        this.endTimeInput = localStorage.getItem("endTime");
      } else {
        this.endTimeInput = this.$store.getters["tagging/end"];
      }

      //シーンタグの遷移モードを変更(true:右スライド, false:左スライド)
      this.$store.commit("tagging/setControlTransitNext", true);
    },
  },
  created() {
    this.initialize();
  },
};
</script>
