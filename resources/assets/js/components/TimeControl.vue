<template>
  <v-sheet class="text-center" height="450px">
    <div>
      <a v-on:click="back">
        <i class="fas fa-chevron-left"></i>
      </a>
      <span>開始・終了時間を指定</span>
    </div>
    <v-slider
      v-model="slider.val"
      v-on:mousedown="stopUpdateSlider"
      v-on:mouseup="seekToAndRestartMouseup"
      v-on:end="seekToAndRestartEnd"
      ticks="always"
      tick-size="0.01"
      :thumb-color="slider.color"
      thumb-label="always"
      step="0.01"
    >
      <template v-slot:thumb-label="{ value }">
        {{
        currentPositionTime
        }}
      </template>
    </v-slider>
    <div>
      <span v-on:click="backwardThirtySec">
        30
        <i class="fas fa-fast-backward"></i>
      </span>
      <span v-on:click="backwardFiveSec">
        5
        <i class="fas fa-step-backward"></i>
      </span>
      <span v-on:click="playVideo">
        <i class="fas fa-play"></i>
      </span>
      <span v-on:click="pauseVideo">
        <i class="fas fa-pause"></i>
      </span>
      <span v-on:click="forwardFiveSec">
        <i class="fas fa-step-forward"></i>5
      </span>
      <span v-on:click="forwardThirtySec">
        <i class="fas fa-fast-forward"></i>30
      </span>
    </div>
    <div>
      <span>{{ currentTime }} / {{ duration }}</span>
    </div>
    <v-form ref="form">
      <div>
        <div>
          <v-btn v-on:click="tapStartBtn" class="mx-2" dark fab elevation="0" small color="primary">
            <v-icon dark>START</v-icon>
          </v-btn>
        </div>
        <div>
          <v-text-field
            v-model="startTimeInput"
            v-bind:rules="startRules"
            ref="startBtn"
            required
            placeholder="0:00"
            solo
            validate-on-blur
          ></v-text-field>
        </div>
      </div>
      <div>
        <div>
          <v-btn v-on:click="tapStopBtn" class="mx-2" dark fab elevation="0" small color="primary">
            <v-icon dark>STOP</v-icon>
          </v-btn>
        </div>
        <div>
          <v-text-field
            v-model="endTimeInput"
            v-bind:rules="endRules"
            ref="stopBtn"
            required
            placeholder="0:00"
            solo
            validate-on-blur
          ></v-text-field>
        </div>
      </div>
    </v-form>
    <v-btn class="mt-6" text color="error" v-on:click="next">次へ</v-btn>
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
