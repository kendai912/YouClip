<template>
  <div class="text-center">
    <v-bottom-sheet v-if="isReady" v-model="sheet" hide-overlay persistent>
      <transition
        v-bind:name="controlTransitNext ? 'controle-next' : 'controle-previous'"
      >
        <component
          v-bind:is="showTaggingControl"
          v-bind:player="player"
          v-on:taggingSucceed="taggingSucceed"
        ></component>
      </transition>
    </v-bottom-sheet>
    <v-snackbar v-model="snackbar" v-bind:timeout="timeout">
      {{ text }}
      <v-btn color="blue" text v-on:click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";
import TimeControl from "../components/TimeControl.vue";
import TaggingControl from "../components/TaggingControl.vue";

export default {
  components: {
    TimeControl,
    TaggingControl
  },
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
      snackbar: false,
      timeout: 3000,
      text: "シーンタグを登録しました"
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
      showTaggingControl: "tagging/showTaggingControl",
      controlTransitNext: "tagging/controlTransitNext"
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
    //シーンタグ完了のトーストを表示
    taggingSucceed() {
      this.snackbar = true;
    }
  },
  created() {
    this.startUpdateSlider();
  }
};
</script>
