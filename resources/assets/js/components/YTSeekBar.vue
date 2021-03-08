<template>
  <transition :name="immediateHideFlag ? 'immediate' : 'fade'">
    <div
      v-if="isMobile"
      v-show="showSeekbar"
      class="ios-wrapper-mask"
      key="ios-wrapper-mask"
    >
      <div class="ios-wrapper">
        <div class="ios-ytseekbar-wrapper">
          <div class="ios-ytseekbar-mask" ref="iosYtseekbarMask"></div>
          <div
            class="ios-ytseek-head"
            ref="iosYtseekHead"
            v-bind:style="'transform: translateX(' + progress + 'px)'"
          ></div>
          <div v-if="contentWidth >= 6">
            <div
              v-if="contentWidth"
              class="ios-left-triangle"
              v-bind:style="'left: ' + contentLeft + 'px;'"
            ></div>
            <div
              class="ios-highlight-content"
              v-bind:style="
                'left: calc(' +
                contentLeft +
                'px + 3px ); width: calc(' +
                contentWidth +
                'px - 6px);'
              "
            ></div>
            <div
              v-if="contentWidth"
              class="ios-right-triangle"
              v-bind:style="'left: calc(' + contentRight + 'px - 3px);'"
            ></div>
          </div>
          <div v-else>
            <div
              class="ios-highlight-content"
              v-bind:style="
                'left: ' + contentLeft + 'px; width: ' + contentWidth + 'px;'
              "
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      v-show="showSeekbar"
      class="ytseekbar-wrapper"
      key="ytseekbar-wrapper"
    >
      <div class="ytseekbar-mask" ref="ytseekbarMask"></div>
      <div
        class="ytseek-head"
        ref="ytseekHead"
        v-bind:style="'transform: translateX(' + progress + 'px)'"
      ></div>
      <div v-if="contentWidth >= 6">
        <div
          v-if="contentWidth"
          class="left-triangle"
          v-bind:style="'left: ' + contentLeft + 'px;'"
        ></div>
        <div
          class="highlight-content"
          v-bind:style="
            'left: calc(' +
            contentLeft +
            'px + 3px ); width: calc(' +
            contentWidth +
            'px - 6px);'
          "
        ></div>
        <div
          v-if="contentWidth"
          class="right-triangle"
          v-bind:style="'left: calc(' + contentRight + 'px - 3px);'"
        ></div>
      </div>
      <div v-else>
        <div
          class="highlight-content"
          v-bind:style="
            'left: ' + contentLeft + 'px; width: ' + contentWidth + 'px;'
          "
        ></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  props: {
    bodyRef: HTMLDivElement,
  },
  data() {
    return {
      seekWidth: 0,
      previousYtseekOffsetX: 0,
      previousYtseekPageX: null,
      ytseekbarPageX: null,
      canUseOntouch: false,
      fadeName: "immediate",
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      currentTime: "youtube/currentTime",
      isNew: "youtube/isNew",
      newVideoData: "youtube/newVideoData",
      videoData: "youtube/videoData",
      player: "ytPlayer/player",
      isPlayerReady: "ytPlayer/isPlayerReady",
      isFullscreen: "ytPlayer/isFullscreen",
      isPortraitScreen: "ytPlayer/isPortraitScreen",
      showSeekbar: "ytPlayer/showSeekbar",
      immediateHideFlag: "ytPlayer/immediateHideFlag",
      startTimeInput: "ytSeekBar/startTimeInput",
      endTimeInput: "ytSeekBar/endTimeInput",
      isMobile: "ytSeekBar/isMobile",
      isIOS: "ytSeekBar/isIOS",
      seekbarWidth: "ytSeekBar/seekbarWidth",
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
    progress() {
      return (
        this.seekbarWidth *
        (this.convertToSec(this.currentTime) / this.convertToSec(this.duration))
      );
    },
    contentLeft() {
      if (
        this.startTimeInput != null &&
        this.convertToSec(this.startTimeInput) &&
        this.isPlayerReady
      ) {
        return (
          this.seekbarWidth *
          (this.convertToSec(this.startTimeInput) /
            this.convertToSec(this.duration))
        );
      } else {
        return 0;
      }
    },
    contentWidth() {
      if (
        this.startTimeInput != null &&
        (this.convertToSec(this.startTimeInput) ||
          this.convertToSec(this.startTimeInput) === 0) &&
        this.isPlayerReady
      ) {
        if (
          this.endTimeInput != null &&
          this.convertToSec(this.endTimeInput) &&
          this.convertToSec(this.startTimeInput) <
            this.convertToSec(this.endTimeInput)
        ) {
          return (
            this.seekbarWidth *
              (this.convertToSec(this.endTimeInput) /
                this.convertToSec(this.duration)) -
            this.contentLeft
          );
        } else {
          return this.progress - this.contentLeft > 0
            ? this.progress - this.contentLeft
            : 0;
        }
      } else {
        return 0;
      }
    },
    contentRight() {
      return this.contentLeft + this.contentWidth;
    },
  },
  watch: {
    isFullscreen() {
      this._setSeekBarWidth();
    },
    isPortraitScreen() {
      this._setSeekBarWidth();
    },
    isPlayerReady() {
      this._setSeekBarWidth();
    },
  },
  methods: {
    ...mapMutations({
      setIsMobile: "ytSeekBar/setIsMobile",
      setIsIOS: "ytSeekBar/setIsIOS",
      setSeekbarWidth: "ytSeekBar/setSeekbarWidth",
    }),
    getClickPosition(e) {
      e.preventDefault(); // prevent browser from moving objects, following links etc

      if (this.isIOS) {
        this.ytseekbarPageX = $(".ios-ytseekbar-mask").offset().left;
        this.seekWidth = e.changedTouches[0].pageX - this.ytseekbarPageX;
      } else if (this.isMobile) {
        this.ytseekbarPageX = $(".ios-ytseekbar-mask").offset().left;
        if (e.changedTouches) {
          this.seekWidth = e.changedTouches[0].pageX - this.ytseekbarPageX;
        } else {
          this.seekWidth = e.pageX - this.ytseekbarPageX;
        }
      } else {
        this.ytseekbarPageX = $(".ytseekbar-mask").offset().left;
        this.seekWidth = e.pageX - this.ytseekbarPageX;
      }

      // change seek position
      this.player.seekTo(
        this.convertToSec(this.duration) * (this.seekWidth / this.seekbarWidth)
      );
    },
    detectMouseDown(e) {
      e.preventDefault(); // prevent browser from moving objects, following links etc

      // start listening to mouse movements
      let self = this;
      if (this.isIOS) {
        this.bodyRef.addEventListener("touchmove", self.getClickPosition, {
          passive: false,
        });
      } else if (this.isMobile) {
        if (this.canUseOntouch) {
          this.bodyRef.ontouchmove = self.getClickPosition;
        } else {
          this.bodyRef.addEventListener("touchmove", self.getClickPosition, {
            passive: false,
          });
        }
      } else {
        this.bodyRef.addEventListener("mousemove", self.getClickPosition, {
          passive: false,
        });
      }
      this.$emit("showOnYTSeekBarTouchMove");
    },
    detectMouseUp(e) {
      // stop listening to mouse movements
      let self = this;
      if (this.isMobile) {
        this.bodyRef.ontouchmove = null;
        this.bodyRef.removeEventListener("touchmove", this.getClickPosition);
      } else {
        this.bodyRef.removeEventListener("mousemove", self.getClickPosition, {
          passive: false,
        });
      }

      this.$emit("hideOnYTSeekBarTouchEnd");
    },
    detectMouseDownOfYtseekbarMask(e) {
      e.preventDefault(); // prevent browser from moving objects, following links etc
      this.$emit("fadeInOutController");
      this.getClickPosition(e);
    },
    setYtSeekbarWrapperTop() {
      //seekbarがiframeの下になるように高さを計算
      if (this.isMobile) {
        $(".ios-wrapper-mask").css(
          "top",
          ($(".ios-wrapper-mask").width() * 9) / 16 +
            (952 - ($(".ios-wrapper-mask").width() * 9) / 16) / 2
        );
      } else {
        $(".ytseekbar-wrapper").css(
          "top",
          ($(".ytseekbar-wrapper").width() * 9) / 16 +
            (952 - ($(".ytseekbar-wrapper").width() * 9) / 16) / 2
        );
      }
    },
    setEventListeners() {
      let self = this;
      if (this.isIOS) {
        this.$refs.iosYtseekHead.addEventListener(
          "touchstart",
          this.detectMouseDown
        );
        this.$refs.iosYtseekbarMask.addEventListener(
          "touchstart",
          function (e) {
            self.detectMouseDownOfYtseekbarMask(e);
            self.detectMouseDown(e);
          }
        );
        window.addEventListener("touchend", this.detectMouseUp);
      } else if (this.isMobile) {
        if (this.canUseOntouch) {
          this.$refs.iosYtseekHead.ontouchstart = this.detectMouseDown;
          this.$refs.iosYtseekbarMask.ontouchstart = this.detectMouseDown;
          this.$refs.iosYtseekHead.ontouchend = this.detectMouseUp;
          this.$refs.iosYtseekbarMask.ontouchend = this.detectMouseUp;
        } else {
          this.$refs.iosYtseekHead.addEventListener(
            "touchstart",
            this.detectMouseDown,
            { passive: false }
          );
          this.$refs.iosYtseekbarMask.addEventListener(
            "touchstart",
            this.detectMouseDown,
            { passive: false }
          );
          window.addEventListener("touchend", this.detectMouseUp);
        }

        this.$refs.iosYtseekbarMask.ontouchstart = function (e) {
          self.detectMouseDownOfYtseekbarMask(e);
          self.detectMouseDown(e);
        };
        this.$refs.iosYtseekbarMask.addEventListener(
          "touchstart",
          this.detectMouseDownOfYtseekbarMask
        );
        this.$refs.iosYtseekbarMask.addEventListener(
          "click",
          this.detectMouseDownOfYtseekbarMask
        );
      } else {
        this.$refs.ytseekHead.addEventListener(
          "mousedown",
          this.detectMouseDown
        );
        this.$refs.ytseekbarMask.addEventListener(
          "mousedown",
          this.detectMouseDown
        );
        this.$refs.ytseekbarMask.addEventListener(
          "click",
          this.detectMouseDownOfYtseekbarMask
        );
        window.addEventListener("mouseup", this.detectMouseUp);
      }

      window.addEventListener("resize", this._setSeekBarWidth);
    },
    _setSeekBarWidth() {
      if (this.isMobile) {
        if ($(".ios-ytseekbar-wrapper").width())
          this.setSeekbarWidth($(".ios-ytseekbar-wrapper").width());
      } else {
        if ($(".ytseekbar-wrapper").width())
          this.setSeekbarWidth($(".ytseekbar-wrapper").width());
      }
    },
  },
  created() {},
  mounted() {
    let isMobileFlag = this.mobileCheck();
    this.setIsMobile(isMobileFlag);
    let isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);
    this.setIsIOS(isIOS);

    var touch_event = window.ontouchstart;
    var touch_points = navigator.maxTouchPoints;
    if (touch_event !== undefined && 0 < touch_points) {
      // ontouchstartに対応
      this.canUseOntouch = true;
    }

    this.$nextTick(() => {
      this.setEventListeners();
    });
  },
};
</script>
