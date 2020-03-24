<template>
  <div class="text-center">
    <v-bottom-sheet v-if="isReady" v-model="sheet" hide-overlay persistent>
      <v-sheet class="text-center" height="450px">
        <div>
          <v-btn class="mt-6" text color="error" @click="sheet = !sheet"
            >＜</v-btn
          ><span>開始・終了時間を指定</span>
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
            {{ currentPositionTime }}
          </template></v-slider
        >
        <div>
          <span v-on:click="backwardThirtySec"
            >30<i class="fas fa-fast-backward"></i
          ></span>
          <span v-on:click="backwardFiveSec"
            >5<i class="fas fa-step-backward"></i
          ></span>
          <span v-on:click="playVideo"><i class="fas fa-play"></i></span>
          <span v-on:click="pauseVideo"><i class="fas fa-pause"></i></span>
          <span v-on:click="forwardFiveSec"
            ><i class="fas fa-step-forward"></i>5</span
          >
          <span v-on:click="forwardThirtySec"
            ><i class="fas fa-fast-forward"></i>30</span
          >
        </div>
        <div>
          <span>{{ currentTime }} / {{ newVideoData.duration }}</span>
        </div>
        <div>
          <div>
            <v-btn
              v-on:click="tapStartBtn"
              class="mx-2"
              dark
              fab
              elevation="0"
              small
              color="primary"
            >
              <v-icon dark>START</v-icon>
            </v-btn>
          </div>
          <div>
            <v-text-field
              v-model="startTimeInput"
              placeholder="0:00"
              solo
            ></v-text-field>
          </div>
        </div>
        <div>
          <div>
            <v-btn
              v-on:click="tapStopBtn"
              class="mx-2"
              dark
              fab
              elevation="0"
              small
              color="primary"
            >
              <v-icon dark>STOP</v-icon>
            </v-btn>
          </div>
          <div>
            <v-text-field
              v-model="endTimeInput"
              placeholder="0:00"
              solo
            ></v-text-field>
          </div>
        </div>
        <v-btn class="mt-6" text color="error" @click="sheet = !sheet"
          >次へ</v-btn
        >
      </v-sheet>
    </v-bottom-sheet>
  </div>
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
      endTimeInput: null
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      currentTime: "youtube/currentTime",
      newVideoData: "youtube/newVideoData",
      isReady: "youtube/isReady"
    }),
    currentPositionTime() {
      //sliderをドラッグした位置の秒数を取得
      let currentPositionSec =
        this.convertToSec(this.newVideoData.duration) * (this.slider.val / 100);

      //分:秒のフォーマットに変換
      return this.formatTime(currentPositionSec);
    }
  },
  methods: {
    //0.8秒に現在のplayerの再生時間を取得しv-sliderの位置に反映
    startUpdateSlider() {
      let self = this;
      self.sliderInterval = setInterval(function() {
        let sliderPosition =
          100 *
          (self.convertToSec(self.currentTime) /
            self.convertToSec(self.newVideoData.duration));

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
          self.convertToSec(self.newVideoData.duration) *
            (self.slider.val / 100)
        );
        self.startUpdateSlider();
      }, 1000);
    },
    //sliderをドラッグした場合、その地点までplayerの再生時間をジャンプ
    async seekToAndRestartEnd(end) {
      await this.player.seekTo(
        this.convertToSec(this.newVideoData.duration) * (end / 100)
      );
      this.startUpdateSlider();
    },
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
    }
  },
  created() {
    this.startUpdateSlider();
  }
};
</script>
