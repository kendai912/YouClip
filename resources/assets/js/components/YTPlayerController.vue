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
          v-bind:class="
            isIOS && !isPortraitScreen && isFullscreen
              ? 'ma-0 pa-0 text-center pb50px'
              : 'ma-0 pa-0 text-center'
          "
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
            <v-icon
              large
              v-if="!isFullscreen"
              v-on:click.stop.prevent="expandScreen"
              color="white"
              >mdi-fullscreen</v-icon
            >
            <v-icon
              large
              v-else
              v-on:click.stop.prevent="compressScreen"
              color="white"
              >mdi-fullscreen-exit</v-icon
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
      fullscreenWidth: 0,
      fullscreenHeight: 0,
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      player: "ytPlayer/player",
      isMuted: "ytPlayer/isMuted",
      isFullscreen: "ytPlayer/isFullscreen",
      isPlaying: "ytPlayer/isPlaying",
      isPortraitScreen: "ytPlayer/isPortraitScreen",
      isMobile: "ytSeekBar/isMobile",
      isIOS: "ytSeekBar/isIOS",
      currentTime: "youtube/currentTime",
      isNew: "youtube/isNew",
      newVideoData: "youtube/newVideoData",
      videoData: "youtube/videoData",
      showPlaySpeedModal: "playSpeedModal/showPlaySpeedModal",
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
      setIsFullscreen: "ytPlayer/setIsFullscreen",
      setIsPortraitScreen: "ytPlayer/setIsPortraitScreen",
      setIsMobile: "ytSeekBar/setIsMobile",
      setIsIOS: "ytSeekBar/setIsIOS",
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
        this.timer = setTimeout(function () {
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
    checkFullScreen() {
      let fullscreen_flag = false;

      if (
        document.fullscreenElement ||
        document.mozFullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      ) {
        fullscreen_flag = true;
      }

      return fullscreen_flag;
    },
    switchFullScreenMode(event) {
      if (this.isIOS) return;

      if (event.key === "f" || event.type === "click") {
        // フルスクリーン表示なら解除する
        if (this.checkFullScreen()) {
          this.mobileCheck() ? "" : this.setIsMobile(false);
          this.setIsFullscreen(false);
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
          this.revertFullScreenYtPlayerCSS();
          // 通常表示ならフルスクリーン表示位にする
        } else {
          this.mobileCheck() ? "" : this.setIsMobile(true);
          this.setIsFullscreen(true);
          if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
          } else if (document.body.mozRequestFullScreen) {
            document.body.mozRequestFullScreen();
          } else if (document.body.webkitRequestFullscreen) {
            document.body.webkitRequestFullscreen();
          } else if (document.body.msRequestFullscreen) {
            document.body.msRequestFullscreen();
          }
          this.setFullScreenYtPlayerCSS();
        }
      }
    },
    async expandScreen(event) {
      this.mobileCheck() ? "" : this.setIsMobile(true);
      this.setIsFullscreen(true);
      this.switchFullScreenMode(event);
      this.$nextTick(() => {
        this.setFullScreenYtPlayerCSS();
        this.$emit("setEventListeners");
      });
    },
    compressScreen(event) {
      this.mobileCheck() ? "" : this.setIsMobile(false);
      this.setIsFullscreen(false);
      this.switchFullScreenMode(event);
      this.$nextTick(() => {
        this.revertFullScreenYtPlayerCSS();
        this.$emit("setEventListeners");
      });
    },
    isWidthBasedFullscreeen() {
      if (this.isIOS) {
        this.fullscreenWidth = window.innerWidth;
        if (this.isPortraitScreen) {
          this.fullscreenHeight = window.innerHeight;
        } else {
          this.fullscreenHeight = window.outerHeight;
        }
      } else {
        this.fullscreenWidth = screen.availWidth;
        this.fullscreenHeight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        );
      }

      if (this.fullscreenHeight >= (this.fullscreenWidth * 9) / 16) {
        return true;
      } else {
        return false;
      }
    },
    expandIframe(isWidthBasedFullscreen) {
      if (isWidthBasedFullscreen) {
        $("iframe").width(this.fullscreenWidth);
      } else {
        $("iframe").width((this.fullscreenHeight * 16) / 9);
      }
      $("iframe").css({ position: "absolute", top: "0px" });
      $("iframe").height(1904);
    },
    adjustYTPlayerWrapper() {
      let playerHeight = ($("iframe").width() * 9) / 16;

      //表示領域の高さと幅をセット
      $(".ytPlayerWrapper").width("100vw");
      if (this.isPortraitScreen) {
        $(".ytPlayerWrapper").css(
          "height",
          playerHeight + ($("iframe").height() - playerHeight) / 2 + 15
        );
      } else if (!this.isPortraitScreen && this.isIOS) {
        $(".ytPlayerWrapper").css(
          "height",
          playerHeight + ($("iframe").height() - playerHeight) / 2
        );
      } else {
        $(".ytPlayerWrapper").css(
          "height",
          playerHeight + ($("iframe").height() - playerHeight) / 2
        );
      }

      //プレイヤーが画面の中央になるように上にずらす
      $(".ytPlayerWrapper").css({
        position: "fixed",
        top:
          (($("iframe").height() - playerHeight) / 2) * -1 +
          (this.fullscreenHeight - playerHeight) / 2,
        left: "0px",
      });
    },
    //オーバーレイコントローラーの高さをセット
    adjustYTPlayerController() {
      let playerHeight = ($("iframe").width() * 9) / 16;

      if (this.isPortraitScreen) {
        $(".iframeHeight").css({
          "padding-bottom": playerHeight,
          bottom: "15px",
        });
      } else if (!this.isPortraitScreen && this.isIOS) {
        $(".iframeHeight").css({
          "padding-bottom": playerHeight,
          bottom: "0px",
        });
      } else {
        $(".iframeHeight").css({
          "padding-bottom": playerHeight - 15,
          bottom: "15px",
        });
      }
    },
    adjustYTSeekBar() {
      let playerHeight = ($("iframe").width() * 9) / 16;
      let seekBarPositionWhenPortrait =
        playerHeight + ($("iframe").height() - playerHeight) / 2;
      let seekBarPositionWhenLandscapeIOS =
        playerHeight + ($("iframe").height() - playerHeight) / 2 - 50;
      let seekBarPositionWhenLandscape =
        playerHeight + ($("iframe").height() - playerHeight) / 2 - 15;

      this.$nextTick(() => {
        if (this.isPortraitScreen) {
          $(".ios-wrapper-mask").css("top", seekBarPositionWhenPortrait);
        } else if (!this.isPortraitScreen && this.isIOS) {
          $(".ios-wrapper-mask").css("top", seekBarPositionWhenLandscapeIOS);
        } else {
          $(".ios-wrapper-mask").css("top", seekBarPositionWhenLandscape);
        }
      });
    },
    setFullScreenYtPlayerCSS() {
      //画面の大きさから縦と横どちらに合わせるかを判定
      let isWidthBasedFullscreen = this.isWidthBasedFullscreeen();

      //iframeの縦・横のサイズをセット(縦は952 * 2 = 1904px、横は幅いっぱい)
      this.expandIframe(isWidthBasedFullscreen);

      //ytPlayerWrapperで表示する範囲をセット(iframeが見える範囲の高さをセットし、iframe上部の黒分が見えないよう上にスライド)
      this.adjustYTPlayerWrapper();

      //プレイヤーコントローラーの位置をfullscreen用に調整(seekbarを画面内に移動するためseekbar分の高さを短くする)
      this.adjustYTPlayerController();

      //seekbarが全画面表示でプレイヤー表示部の一番下になるように調整(iOS/縦/横でパターン分け)
      this.adjustYTSeekBar();
    },
    revertIframe() {
      $("iframe").width($(".watch-body").width());
      $("iframe").css({ position: "absolute", top: "0px" });
      $("iframe").height(952);
    },
    revertYTPlayerWrapper() {
      let playerHeight = ($("iframe").width() * 9) / 16;

      //fixedからabsoluteに戻す
      $(".ytPlayerWrapper").css({ position: "absolute", top: "0px" });

      //幅を戻す
      $(".ytPlayerWrapper").width("100%");

      //高さを戻す
      $(".ytPlayerWrapper").css(
        "height",
        playerHeight + ($("iframe").height() - playerHeight) / 2 + 15
      );

      //topの位置を戻す
      $(".ytPlayerWrapper").css(
        "top",
        (($("iframe").height() - playerHeight) / 2) * -1
      );
    },
    revertYTPlayerController() {
      $(".iframeHeight").css({
        "padding-bottom": "56.25%",
        bottom: "15px",
      });
    },
    revertYTSeekBar() {
      let playerHeight = ($("iframe").width() * 9) / 16;

      this.$nextTick(() => {
        if (this.isMobile) {
          $(".ios-wrapper-mask").css(
            "top",
            playerHeight + ($("iframe").height() - playerHeight) / 2
          );
        } else {
          $(".ytseekbar-wrapper").css(
            "top",
            playerHeight + ($("iframe").height() - playerHeight) / 2
          );
        }
      });
    },
    revertFullScreenYtPlayerCSS() {
      //iframeの縦・横のサイズを通常の表示に戻す
      this.revertIframe();

      //ytPlayerWrapperで表示する範囲を通常の表示に戻す
      this.revertYTPlayerWrapper();

      //プレイヤーコントローラーの位置を通常の表示に戻す(seekbarを画面内に移動するためseekbar分の高さを短くする)
      this.revertYTPlayerController();

      //seekbarがプレイヤーの下になるように戻す
      this.revertYTSeekBar();
    },
    exitFullscreenHandler() {
      if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        // フルスクリーン表示なら解除する
        this.mobileCheck() ? "" : this.setIsMobile(false);
        this.setIsFullscreen(false);
        this.revertFullScreenYtPlayerCSS();
        this.$nextTick(() => {
          this.$emit("setEventListeners");
        });
      }
    },
    handleOrientationChange() {
      let angle;
      angle = screen && screen.orientation && screen.orientation.angle;

      if (angle == null) {
        angle = window.orientation || 0;
      }

      if (angle % 180 !== 0) {
        this.setIsPortraitScreen(false);
      } else {
        this.setIsPortraitScreen(true);
      }
    },
    handleResize() {
      if (this.isFullscreen) {
        this.setFullScreenYtPlayerCSS();
      } else {
        this.revertFullScreenYtPlayerCSS();
      }
    },
  },
  mounted() {
    //iframeプレイヤーの表示から4秒後にプレイヤーコントロールボタンを非表示
    setTimeout(function () {
      $(".overlay").fadeOut(1000);
    }, 4000);

    this.handleOrientationChange();
    window.addEventListener("orientationchange", this.handleOrientationChange);

    // fボタン押下よるフルスクリーンモード制御キーボード入力の受付
    window.addEventListener("keydown", this.switchFullScreenMode);

    // escボタン押下によるフルスクリーンモード解除キーボード入力
    document.addEventListener("fullscreenchange", this.exitFullscreenHandler);
    document.addEventListener(
      "webkitfullscreenchange",
      this.exitFullscreenHandler
    );
    document.addEventListener(
      "mozfullscreenchange",
      this.exitFullscreenHandler
    );
    document.addEventListener("MSFullscreenChange", this.exitFullscreenHandler);

    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
