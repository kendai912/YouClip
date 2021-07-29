<template>
  <div class="iframeHeight">
    <div v-if="isMutedDefault" class="unmuteDefaultBtn">
      <v-btn color="white lighten-3" height="32" v-on:click="unmuteDefault">
        <v-icon left> volume_off </v-icon>
        {{ $t("YTPlayerController.unmute") }}
      </v-btn>
    </div>
    <v-sheet
      v-if="showPlayerController"
      class="overlay"
      v-on:click.prevent="
        toggleController();
        unmuteDefault();
      "
    >
      <v-container class="ma-0 pa-0" fluid fill-height>
        <v-row
          class="ma-0 pa-0 text-center"
          align="center"
          style="height: 33.333%"
        >
          <v-col
            v-if="isFullscreen && isWatchingPlaylist"
            align-self="start"
            class="text-left"
            style="font-size: calc(1rem * (16 / 14)); color: white"
          >
            {{ playlistName }}
          </v-col>
        </v-row>
        <v-row
          class="ma-0 pa-0 text-center"
          align="center"
          justify="space-around"
          style="height: 33.333%"
        >
          <v-col
            v-if="isWatchingPlaylist"
            class="ma-0 pt-3 pr-2 pb-3 pl-2"
            v-on:click.stop.prevent="
              backToPrevious();
              unmuteDefault();
            "
          >
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-icon large color="white">arrow_back</v-icon>
              </v-col>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <span style="font-size: calc(1rem * (12 / 14)); color: white">{{
                  $t("YTPlayerController.back")
                }}</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-icon
              x-large
              v-on:click.stop.prevent="
                backwardFiveSec();
                unmuteDefault();
              "
              color="white"
              >replay_5</v-icon
            >
          </v-col>
          <v-col>
            <i
              v-if="isPlaying"
              v-on:click.stop.prevent="
                pauseVideo();
                unmuteDefault();
              "
              class="fas fa-pause fa-2x"
              style="color: white"
            ></i>
            <i
              v-else
              v-on:click.stop.prevent="
                playVideo();
                unmuteDefault();
              "
              class="fas fa-play fa-2x"
              style="color: white"
            ></i>
          </v-col>
          <v-col>
            <v-icon
              x-large
              v-on:click.stop.prevent="
                forwardFiveSec();
                unmuteDefault();
              "
              color="white"
              >forward_5</v-icon
            >
          </v-col>
          <v-col
            v-if="isWatchingPlaylist"
            class="ma-0 pt-3 pr-2 pb-3 pl-2"
            v-on:click.stop.prevent="
              moveToNext();
              unmuteDefault();
            "
          >
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-icon large color="white">arrow_forward</v-icon>
              </v-col>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <span style="font-size: calc(1rem * (12 / 14)); color: white">{{
                  $t("YTPlayerController.next")
                }}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row
          v-bind:class="
            isMobile && !isPortraitScreen && isFullscreen
              ? 'ma-0 pa-0 text-center pb50px'
              : 'ma-0 pa-0 text-center'
          "
          align="end"
          style="height: 33.333%"
        >
          <v-col align-self="end" class="text-left" style="color: white">
            {{ currentDisplayingTime }} / {{ duration }}
          </v-col>
          <v-col align-self="end" class="text-right">
            <v-icon large v-on:click.prevent="openPlaySpeedModal" color="white"
              >mdi-speedometer</v-icon
            >
            <v-icon
              large
              v-if="isMuted"
              v-on:click.stop.prevent="
                unmute();
                unmuteDefault();
              "
              color="white"
              >volume_off</v-icon
            >
            <v-icon large v-else v-on:click.stop.prevent="mute()" color="white"
              >volume_up</v-icon
            >
            <v-icon
              large
              v-if="!isFullscreen"
              v-show="isWatchingPlaylist"
              v-on:click.stop.prevent="
                expandScreen($event);
                unmuteDefault();
              "
              color="white"
              >mdi-fullscreen</v-icon
            >
            <v-icon
              large
              v-else
              v-show="isWatchingPlaylist"
              v-on:click.stop.prevent="
                compressScreen($event);
                unmuteDefault();
              "
              color="white"
              >mdi-fullscreen-exit</v-icon
            >
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-sheet
      class="overlayWrap"
      v-on:click.prevent="
        toggleController();
        unmuteDefault();
      "
    ></v-sheet>
    <Telop />
    <PlaySpeedModal v-if="showPlaySpeedModal" v-bind:player="player" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";
import PlaySpeedModal from "../components/PlaySpeedModal.vue";
import Telop from "../components/Telop.vue";

export default {
  components: {
    PlaySpeedModal,
    Telop,
  },
  props: {},
  data() {
    return {
      ytPlayerControllerTransition: "overlayfade",
      timer: null,
      isYTSeekBarTouchMoving: false,
      fullscreenWidth: 0,
      fullscreenHeight: 0,
      isMutedDefault: true,
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      playlistName: "watch/playlistName",
      playerArray: "ytPlayer/playerArray",
      player: "ytPlayer/player",
      isMuted: "ytPlayer/isMuted",
      isFullscreen: "ytPlayer/isFullscreen",
      isPlaying: "ytPlayer/isPlaying",
      isPortraitScreen: "ytPlayer/isPortraitScreen",
      showSeekbar: "ytPlayer/showSeekbar",
      immediateHideFlag: "ytPlayer/immediateHideFlag",
      listOfYoutubeIdStartEndTime: "ytPlayer/listOfYoutubeIdStartEndTime",
      startHis: "ytPlayer/start",
      endHis: "ytPlayer/end",
      listIndex: "ytPlayer/listIndex",
      isWatchingPlaylist: "ytPlayer/isWatchingPlaylist",
      isFadingOut: "ytPlayer/isFadingOut",
      currentDisplayingTimeInSecOfWatch:
        "ytPlayer/currentDisplayingTimeInSecOfWatch",
      showPlayerController: "ytPlayer/showPlayerController",
      isMobile: "ytSeekBar/isMobile",
      isIOS: "ytSeekBar/isIOS",
      currentTime: "youtube/currentTime",
      isNew: "youtube/isNew",
      newVideoData: "youtube/newVideoData",
      videoData: "youtube/videoData",
      showPlaySpeedModal: "playSpeedModal/showPlaySpeedModal",
      isEditing: "tagging/isEditing",
    }),
    currentDisplayingTime() {
      if (this.isWatchingPlaylist) {
        return this.formatTime(this.currentDisplayingTimeInSecOfWatch);
      } else {
        return this.currentTime;
      }
    },
    duration() {
      if (this.isNew) {
        return this.newVideoData ? this.newVideoData.duration : "0:00";
      } else if (this.isWatchingPlaylist) {
        let durationInSec = "0:00:00";

        if (this.listOfYoutubeIdStartEndTime)
          this.listOfYoutubeIdStartEndTime.forEach((item) => {
            durationInSec = this.timeMath.sum(durationInSec, item.duration);
          });

        this.setDurationInSecOfWatch(
          this.convertToSec(this.formatToMinSec(durationInSec))
        );
        return this.formatToMinSec(durationInSec);
      } else {
        return this.videoData
          ? this.formatToMinSec(this.videoData.duration)
          : "0:00";
      }
    },
    startIs() {
      return this.formatToMinSec(this.startHis);
    },
    endIs() {
      return this.formatToMinSec(this.endHis);
    },
  },
  methods: {
    ...mapMutations({
      openPlaySpeedModal: "playSpeedModal/openPlaySpeedModal",
      setIsPlaying: "ytPlayer/setIsPlaying",
      setIsMuted: "ytPlayer/setIsMuted",
      setIsFullscreen: "ytPlayer/setIsFullscreen",
      setIsPortraitScreen: "ytPlayer/setIsPortraitScreen",
      setShowSeekbar: "ytPlayer/setShowSeekbar",
      setImmediateHideFlag: "ytPlayer/setImmediateHideFlag",
      setListIndex: "ytPlayer/setListIndex",
      setIsFadingOut: "ytPlayer/setIsFadingOut",
      setCurrentDisplayingTimeInSecOfWatch:
        "ytPlayer/setCurrentDisplayingTimeInSecOfWatch",
      setDurationInSecOfWatch: "ytPlayer/setDurationInSecOfWatch",
      setShowPlayerController: "ytPlayer/setShowPlayerController",
      setIsMobile: "ytSeekBar/setIsMobile",
      setIsIOS: "ytSeekBar/setIsIOS",
      setIsNew: "youtube/setIsNew",
    }),
    setImmediateHide() {
      this.setImmediateHideFlag(true);
    },
    toggleController() {
      let self = this;
      if (!this.immediateHideFlag) {
        //show ytPlayerController
        $(".overlay").fadeIn(10);
        if (this.isMobile && this.isFullscreen) {
          this.setShowSeekbar(true);
        }

        setTimeout(() => {
          // immdiately hide controller when touched continuously
          self.setImmediateHideFlag(true);

          //clear previous timer
          clearTimeout(self.timer);

          //set timer and fadeout in 2.5sec
          self.timer = setTimeout(function() {
            if (self.isPlaying) {
              self.setIsFadingOut(true);
              $(".overlay").fadeOut(500);
              if (self.isMobile && self.isFullscreen) {
                self.setShowSeekbar(false);
              }

              self.setImmediateHideFlag(false);
              setTimeout(function() {
                self.setIsFadingOut(false);
              }, 500);
            }
          }, 2500);
        }, 10);
      } else {
        $(".overlay").fadeOut(10);
        if (this.isMobile && this.isFullscreen) {
          this.setShowSeekbar(false);
        }
        setTimeout(() => {
          self.setImmediateHideFlag(false);
        }, 10);
      }
    },
    fadeInOutController() {
      this.setImmediateHideFlag(false);
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
      let self = this;
      setTimeout(() => {
        clearTimeout(self.timer);
      }, 10);

      this.$store.commit("ytPlayer/setIsPlaying", false);
      this.player.pauseVideo();
    },
    //YTseekBar touchmove
    showOnYTSeekBarTouchMove() {
      $(".overlay").fadeIn(10);
      clearTimeout(this.timer);
      this.setImmediateHideFlag(true);
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
      let backwardTimeInSec = this.convertToSec(this.currentDisplayingTime) - 5;

      if (this.isWatchingPlaylist) {
        this.$store.dispatch(
          "ytPlayer/seekToDisplayingTime",
          backwardTimeInSec
        );
      } else {
        this.player.seekTo(backwardTimeInSec);
      }
    },
    //5秒進む
    forwardFiveSec() {
      this.fadeInOutController();
      let forwardTimeInSec = this.convertToSec(this.currentDisplayingTime) + 5;

      if (this.isWatchingPlaylist) {
        this.$store.dispatch("ytPlayer/seekToDisplayingTime", forwardTimeInSec);
      } else {
        this.player.seekTo(forwardTimeInSec);
      }
    },
    unmuteDefault() {
      if (this.isMutedDefault) {
        let self = this;
        Object.keys(this.playerArray).forEach((key) => {
          self.playerArray[key].unMute();
        });

        this.setIsMuted(false);
        this.isMutedDefault = false;
      }
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

      if (event.type === "click") {
        // フルスクリーン表示なら解除する
        if (this.checkFullScreen()) {
          this.mobileCheck() ? "" : this.setIsMobile(false);
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
          // 通常表示ならフルスクリーン表示にする
        } else {
          this.mobileCheck() ? "" : this.setIsMobile(true);
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
      } else if (event.key === "Esc" || event.type === "Escape") {
        // フルスクリーン表示なら解除する
        if (this.checkFullScreen()) {
          this.mobileCheck() ? "" : this.setIsMobile(false);
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
        }
      }
    },
    expandScreen(event) {
      this.mobileCheck() ? "" : this.setIsMobile(true);
      this.switchFullScreenMode(event);
      this.$nextTick(() => {
        this.setFullScreenYtPlayerCSS();
        this.setIsFullscreen(true);
        if (!this.mobileCheck()) this.$emit("setEventListeners");
      });
    },
    async compressScreen(event) {
      if (this.isFadingOut) {
        await this.sleep(500);
      }
      this.mobileCheck() ? "" : this.setIsMobile(false);
      this.switchFullScreenMode(event);
      this.$nextTick(() => {
        this.revertFullScreenYtPlayerCSS();
        this.setIsFullscreen(false);
        if (!this.mobileCheck()) this.$emit("setEventListeners");
      });
      this.setShowSeekbar(true);
    },
    sleep(waitSec) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve();
        }, waitSec);
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
      // set iframe width
      if (isWidthBasedFullscreen) {
        $("iframe").width(this.fullscreenWidth);
      } else {
        $("iframe").width((this.fullscreenHeight * 16) / 9);
      }

      // set iframe height
      $("iframe").height(($("iframe").width() * 9) / 16);
      // $("iframe").height(1904);

      // set iframe position
      $("iframe").css({ position: "absolute !important", top: "0px" });
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
      } else if (!this.isPortraitScreen && this.isMobile) {
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
      let seekBarPositionWhenLandscapeMobile =
        playerHeight + ($("iframe").height() - playerHeight) / 2 - 50;
      let seekBarPositionWhenLandscape =
        playerHeight + ($("iframe").height() - playerHeight) / 2 - 15;

      this.$nextTick(() => {
        if (this.isPortraitScreen) {
          $(".ios-wrapper-mask").css("top", seekBarPositionWhenPortrait);
        } else if (!this.isPortraitScreen && this.isMobile) {
          $(".ios-wrapper-mask").css("top", seekBarPositionWhenLandscapeMobile);
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
      $("iframe").height(($("iframe").width() * 9) / 16);
      // $("iframe").height(952);
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
    fullscreenHandler(event) {
      if (this.checkFullScreen()) {
        if (
          event.type === "click" ||
          event.key === "Esc" ||
          event.type === "Escape"
        )
          this.compressScreen(event);
      } else {
        if (event.type === "click") this.expandScreen(event);
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
    //前の場面を再生
    backToPrevious() {
      if (this.isEditing || this.listOfYoutubeIdStartEndTime.length == 1) {
        //現在と同じシーンをリピート(開始時間に戻る)
        this.player.seekTo(this.convertToSec(this.startIs));
      } else if (this.listOfYoutubeIdStartEndTime.length > 1) {
        //まとめ再生の場合
        if (this.listIndex == 0) {
          // 最初の場面の場合は最後の場面のパラメータをセット
          this.$emit(
            "switchToPlayListIndexOf",
            Number(this.listOfYoutubeIdStartEndTime.length) - 1
          );
        } else {
          //最初の場面以外は前の場面へ
          this.$emit("switchToPlayListIndexOf", Number(this.listIndex) - 1);
        }
      }
    },
    //次の場面を再生
    moveToNext() {
      if (this.isEditing || this.listOfYoutubeIdStartEndTime.length == 1) {
        //現在と同じシーンをリピート(開始時間に戻る)
        this.player.seekTo(this.convertToSec(this.startIs));
      } else if (this.listOfYoutubeIdStartEndTime.length > 1) {
        //まとめ再生の場合
        if (this.listIndex < this.listOfYoutubeIdStartEndTime.length - 1) {
          // //最後のシーンでない場合は次のシーンのパラメータをセット
          this.$emit("switchToPlayListIndexOf", Number(this.listIndex) + 1);
        } else if (
          this.listIndex >=
          this.listOfYoutubeIdStartEndTime.length - 1
        ) {
          //最後のシーンの場合は先頭に戻る
          this.$emit("switchToPlayListIndexOf", 0);
        }
      }
    },
  },
  mounted() {
    this.setShowPlayerController(true);
    //iframeプレイヤーの表示から4秒後にプレイヤーコントロールボタンを非表示
    let self = this;
    setTimeout(function() {
      $(".overlay").fadeOut(1000);
      if (self.isMobile && self.isFullscreen) {
        self.setShowSeekbar(false);
      }
    }, 4000);

    this.handleOrientationChange();
    window.addEventListener("orientationchange", this.handleOrientationChange);

    // fボタン押下よるフルスクリーンモード制御キーボード入力の受付
    if (this.isWatchingPlaylist)
      window.addEventListener("keydown", this.fullscreenHandler);

    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener(
      "orientationchange",
      this.handleOrientationChange
    );
    window.removeEventListener("keydown", this.fullscreenHandler);
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
