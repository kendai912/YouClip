<template>
  <div class="iframeHeight">
    <v-sheet class="overlay" v-on:click.prevent="toggleController">
      <v-container class="ma-0 pa-0" fluid fill-height>
        <v-row
          class="ma-0 pa-0 text-center"
          align="center"
          style="height: 33.333%"
        >
        </v-row>
        <v-row
          class="ma-0 pa-0 text-center"
          align="center"
          justify="space-around"
          style="height: 33.333%"
        >
          <v-col>
            <v-icon
              x-large
              v-on:click.stop.prevent="backwardFiveSec"
              color="white"
              >replay_5</v-icon
            >
          </v-col>
          <v-col>
            <i
              v-if="isPlaying"
              v-on:click.stop.prevent="pauseVideo"
              class="fas fa-pause fa-2x"
              style="color: white"
            ></i>
            <i
              v-else
              v-on:click.stop.prevent="playVideo"
              class="fas fa-play fa-2x"
              style="color: white"
            ></i>
          </v-col>
          <v-col>
            <v-icon
              x-large
              v-on:click.stop.prevent="forwardFiveSec"
              color="white"
              >forward_5</v-icon
            >
          </v-col>
        </v-row>
        <v-row
          class="ma-0 pa-0 text-center"
          align="end"
          style="height: 33.333%"
        >
          <v-col align-self="end" class="text-left" style="color: white">
            {{ currentTime }} / {{ duration }}
          </v-col>
          <v-col align-self="end" class="text-right">
            <v-icon
              large
              v-on:click.stop.prevent="openPlaySpeedModal"
              color="white"
              >mdi-speedometer</v-icon
            >
            <v-icon
              large
              v-if="isMuted"
              v-on:click.stop.prevent="unmute"
              color="white"
              >volume_off</v-icon
            >
            <v-icon large v-else v-on:click.stop.prevent="mute" color="white"
              >volume_up</v-icon
            >
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet
      class="overlayWrap"
      v-on:click.prevent="toggleController"
    ></v-sheet>
    <PlaySpeedModal v-if="showPlaySpeedModal" v-bind:player="player" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import PlaySpeedModal from "../components/PlaySpeedModal.vue";
import myMixin from "../util";

export default {
  components: {
    PlaySpeedModal,
  },
  props: {},
  data() {
    return {
      ytPlayerControllerTransition: "overlayfade",
      timer: null,
      immediateHideFlag: false,
      isYTSeekBarTouchMoving: false,
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      player: "ytPlayer/player",
      isMuted: "ytPlayer/isMuted",
      currentTime: "youtube/currentTime",
      isNew: "youtube/isNew",
      newVideoData: "youtube/newVideoData",
      videoData: "youtube/videoData",
      showPlaySpeedModal: "playSpeedModal/showPlaySpeedModal",
      isPlaying: "ytPlayer/isPlaying",
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
    ...mapMutations({
      openPlaySpeedModal: "playSpeedModal/openPlaySpeedModal",
      setIsPlaying: "ytPlayer/setIsPlaying",
      setIsMuted: "ytPlayer/setIsMuted",
    }),
    setImmediateHide() {
      this.immediateHideFlag = true;
    },
    toggleController() {
      if (!this.immediateHideFlag) {
        //show ytPlayerController
        $(".overlay").fadeIn(10);

        // immdiately hide controller when touched continuously
        this.immediateHideFlag = true;

        //clear previous timer
        clearTimeout(this.timer);

        let self = this;
        //set timer and fadeout in 2.5sec
        this.timer = setTimeout(function() {
          self.immediateHideFlag = false;
          $(".overlay").fadeOut(500);
        }, 2500);
      } else {
        $(".overlay").fadeOut(10);
        this.immediateHideFlag = false;
      }
    },
    fadeInOutController() {
      this.immediateHideFlag = false;
      this.toggleController();
    },
    //再生
    playVideo() {
      this.fadeInOutController();

      this.$store.commit("ytPlayer/setIsPlaying", true);
      this.player.playVideo();
    },
    //一時停止
    pauseVideo() {
      this.fadeInOutController();

      //keep showing ytPlayerController when pausing
      setTimeout(() => {
        clearTimeout(this.timer);
      }, 10);

      this.$store.commit("ytPlayer/setIsPlaying", false);
      this.player.pauseVideo();
    },
    //YTseekBar touchmove
    showOnYTSeekBarTouchMove() {
      $(".overlay").fadeIn(10);
      clearTimeout(this.timer);
      this.immediateHideFlag = true;
      this.isYTSeekBarTouchMoving = true;
    },
    //YTseekBar touchend
    hideOnYTSeekBarTouchEnd() {
      if (this.isPlaying && this.isYTSeekBarTouchMoving) {
        this.fadeInOutController();
        this.isYTSeekBarTouchMoving = false;
      }
    },
    //5秒戻る
    backwardFiveSec() {
      this.fadeInOutController();
      this.player.seekTo(this.convertToSec(this.currentTime) - 5);
    },
    //5秒進む
    forwardFiveSec() {
      this.fadeInOutController();
      this.player.seekTo(this.convertToSec(this.currentTime) + 5);
    },
    unmute() {
      this.fadeInOutController();
      this.player.unMute();
      this.setIsMuted(false);
    },
    mute() {
      this.fadeInOutController();
      this.player.mute();
      this.setIsMuted(true);
    },
  },
  mounted() {
    //iframeプレイヤーの表示から4秒後にプレイヤーコントロールボタンを非表示
    setTimeout(function() {
      $(".overlay").fadeOut(1000);
    }, 4000);
  },
};
</script>
