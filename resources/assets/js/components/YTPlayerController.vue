<template>
  <div class="iframeHeight">
    <v-sheet class="overlay" v-on:click="toggleController">
      <v-container class="ma-0 pa-0" fluid fill-height>
        <v-row
          class="ma-0 pa-0 text-center"
          align="center"
          style="height: 33.333%;"
        >
        </v-row>
        <v-row
          class="ma-0 pa-0 text-center"
          align="center"
          justify="space-around"
          style="height: 33.333%;"
        >
          <v-col>
            <v-icon x-large v-on:click.stop="backwardFiveSec" color="white"
              >replay_5</v-icon
            >
          </v-col>
          <v-col>
            <i
              v-if="isPlaying"
              v-on:click.stop="pauseVideo"
              class="fas fa-pause fa-2x"
              style="color: white;"
            ></i>
            <i
              v-else
              v-on:click.stop="playVideo"
              class="fas fa-play fa-2x"
              style="color: white;"
            ></i>
          </v-col>
          <v-col>
            <v-icon x-large v-on:click.stop="forwardFiveSec" color="white"
              >forward_5</v-icon
            >
          </v-col>
        </v-row>
        <v-row
          class="ma-0 pa-0 text-center"
          align="end"
          style="height: 33.333%;"
        >
          <v-col align-self="end" class="text-left" style="color: white;">
            {{ currentTime }} / {{ duration }}
          </v-col>
          <v-col align-self="end" class="text-right">
            <v-icon large v-on:click="openPlaySpeedModal" color="white"
              >mdi-speedometer</v-icon
            >
            <v-icon large v-if="isMuted" v-on:click.stop="unmute" color="white"
              >volume_off</v-icon
            >
            <v-icon large v-else v-on:click.stop="mute" color="white"
              >volume_up</v-icon
            >
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet class="overlayWrap" v-on:click="toggleController"></v-sheet>
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
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      player: "ytPlayerController/player",
      isMuted: "ytPlayerController/isMuted",
      currentTime: "youtube/currentTime",
      isNew: "youtube/isNew",
      newVideoData: "youtube/newVideoData",
      videoData: "youtube/videoData",
      showPlaySpeedModal: "playSpeedModal/showPlaySpeedModal",
      isPlaying: "watch/isPlaying",
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
      setIsPlaying: "watch/setIsPlaying",
      setIsMuted: "ytPlayerController/setIsMuted",
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

        //set timer and fadeout in 2.5sec
        this.timer = setTimeout(function() {
          this.immediateHideFlag = false;
          $(".overlay").fadeOut(500);
        }, 2500);
      } else {
        $(".overlay").fadeOut(10);
        this.immediateHideFlag = false;
      }
    },
    fadeOutController() {
      this.immediateHideFlag = false;
      this.toggleController();
    },
    //再生
    playVideo() {
      this.fadeOutController();

      this.$store.commit("watch/setIsPlaying", true);
      this.player.playVideo();
    },
    //一時停止
    pauseVideo() {
      this.fadeOutController();

      //keep showing ytPlayerController when pausing
      setTimeout(() => {
        clearTimeout(this.timer);
      }, 10);

      this.$store.commit("watch/setIsPlaying", false);
      this.player.pauseVideo();
    },
    //5秒戻る
    backwardFiveSec() {
      this.fadeOutController();
      this.player.seekTo(this.convertToSec(this.currentTime) - 5);
    },
    //5秒進む
    forwardFiveSec() {
      this.fadeOutController();
      this.player.seekTo(this.convertToSec(this.currentTime) + 5);
    },
    unmute() {
      this.fadeOutController();
      this.player.unMute();
      this.setIsMuted(false);
    },
    mute() {
      this.fadeOutController();
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
