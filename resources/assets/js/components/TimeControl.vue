<template>
  <v-sheet height="360" tile class="text-center">
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
          <v-col></v-col>
          <v-col class="ma-0 pa-0">
            <v-card class="ma-0" tile elevation="0">
              <div>
                <v-bottom-navigation class="bottom_navigation_no_shadow" elevation="0">
                  <v-btn v-on:click="tapStartBtn">
                    <span>START</span>
                    <v-icon x-large>alarm_on</v-icon>
                  </v-btn>
                </v-bottom-navigation>
              </div>
              <div>
                <v-text-field
                  v-model="startTimeInput"
                  v-bind:rules="startRules"
                  ref="startBtn"
                  required
                  placeholder="0:00"
                  validate-on-blur
                  flat
                ></v-text-field>
              </div>
            </v-card>
          </v-col>

          <v-col></v-col>

          <v-col class="ma-0 pa-0">
            <v-card class="ma-0" tile elevation="0">
              <div>
                <v-bottom-navigation class="bottom_navigation_no_shadow" elevation="0">
                  <v-btn v-on:click="tapStopBtn">
                    <span>STOP</span>
                    <v-icon x-large>alarm_off</v-icon>
                  </v-btn>
                </v-bottom-navigation>
              </div>
              <div>
                <v-text-field
                  v-model="endTimeInput"
                  v-bind:rules="endRules"
                  ref="stopBtn"
                  required
                  placeholder="0:00"
                  validate-on-blur
                  flat
                ></v-text-field>
              </div>
            </v-card>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-sheet tile class="ma-0 pa-0 bottom-position" width="100%">
      <v-container class="ma-0 pa-0" fluid>
        <v-row align="center" class="ma-0 pa-0">
          <v-col class="text-left ma-0">
            <i v-on:click="back" class="fas fa-arrow-left fa-2x my-grey"></i>
          </v-col>
          <v-col class="text-right ma-0">
            <div>
              <v-btn color="error" v-on:click="next">次へ</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-sheet>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  props: {
    player: Object
  },
  data() {
    return {
      sheet: true,
      slider: { val: 0, color: "red" },
      sliderInterval: null,
      startTimeInput: null,
      endTimeInput: null,
      startRules: [
        v => !!v || "開始時間を入力して下さい",
        v => {
          let regex = /^\d+:\d{1,2}$/;
          if (!v || regex.test(v)) {
            return true;
          }

          if (!regex.test(v)) {
            return "分:秒の形式で入力して下さい";
          }
        }
      ],
      endRules: [
        v => !!v || "終了時間を入力して下さい",
        v => {
          let regex = /^\d+:\d{1,2}$/;
          if (!v || regex.test(v)) {
            return true;
          }

          if (!regex.test(v)) {
            return "分:秒の形式で入力して下さい";
          }
        },
        v => {
          if (this.startTimeInput) {
            if (
              parseInt(this.convertToSec(v)) <=
              parseInt(this.convertToSec(this.startTimeInput))
            ) {
              return "開始時間より後ろの時間を入力下さい";
            }
          }
          return true;
        }
      ]
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
      isEditting: "tagging/isEditting"
    }),
    currentPositionTime() {
      //sliderをドラッグした位置の秒数を取得
      let currentPositionSec =
        this.convertToSec(this.duration) * (this.slider.val / 100);

      //分:秒のフォーマットに変換
      return this.formatTime(currentPositionSec);
    },
    duration() {
      return this.isNew
        ? this.newVideoData.duration
        : this.formatToMinSec(this.videoData.duration);
    }
  },
  methods: {
    //0.8秒毎に現在のplayerの再生時間を取得しv-sliderの位置に反映
    startUpdateSlider() {
      let self = this;
      self.sliderInterval = setInterval(function() {
        let sliderPosition =
          100 *
          (self.convertToSec(self.currentTime) /
            self.convertToSec(self.duration));

        self.slider.val = sliderPosition;
      }, 800);
    },
    stopUpdateSlider() {
      clearInterval(this.sliderInterval);
    },
    //sliderをクリックした場合、その地点までplayerの再生時間をジャンプ
    seekToAndRestartMouseup(end) {
      let self = this;
      setTimeout(function() {
        self.player.seekTo(
          self.convertToSec(self.duration) * (self.slider.val / 100)
        );
        self.startUpdateSlider();
      }, 1000);
    },
    //sliderをドラッグした場合、その地点までplayerの再生時間をジャンプ
    async seekToAndRestartEnd(end) {
      await this.player.seekTo(this.convertToSec(this.duration) * (end / 100));
      this.startUpdateSlider();
    },
    tapStartBtn() {
      this.startTimeInput = this.currentTime;
      //バリデーションチェックのためフォーカスを開始時間フォームに移す
      this.$refs.startBtn.focus();
      this.player.playVideo();
    },
    tapStopBtn() {
      this.endTimeInput = this.currentTime;
      //バリデーションチェックのためフォーカスを終了時間フォームに移す
      this.$refs.stopBtn.focus();
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
      }
    },
    back() {
      this.isEditting
        ? this.$store.commit("tagging/setShowSceneTagControl", false)
        : this.$router.go(-1);
    },
    //初期化処理
    initialize() {
      //0.8秒毎に現在のplayerの再生時間を取得しv-sliderの位置に反映
      this.startUpdateSlider();

      //戻るボタンから表示された際の既入力値のセット
      this.startTimeInput = this.$store.getters["tagging/start"];
      this.endTimeInput = this.$store.getters["tagging/end"];

      //シーンタグの遷移モードを変更(true:右スライド, false:左スライド)
      this.$store.commit("tagging/setControlTransitNext", true);
    }
  },
  created() {
    this.initialize();
  }
};
</script>
