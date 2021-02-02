<template>
  <div v-if="isMobile" class="ios-wrapper-mask">
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

  <div v-else class="ytseekbar-wrapper">
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
      isMobile: false,
      isIOS: false,
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      player: "ytPlayer/player",
      currentTime: "youtube/currentTime",
      isNew: "youtube/isNew",
      newVideoData: "youtube/newVideoData",
      videoData: "youtube/videoData",
      isReady: "youtube/isReady",
      startTimeInput: "ytSeekBar/startTimeInput",
      endTimeInput: "ytSeekBar/endTimeInput",
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
      if (this.isMobile) {
        return (
          $(".ios-ytseekbar-wrapper").width() *
          (this.convertToSec(this.currentTime) /
            this.convertToSec(this.duration))
        );
      } else {
        return (
          $(".ytseekbar-wrapper").width() *
          (this.convertToSec(this.currentTime) /
            this.convertToSec(this.duration))
        );
      }
    },
    contentLeft() {
      if (
        this.startTimeInput != null &&
        this.convertToSec(this.startTimeInput) &&
        this.isReady
      ) {
        if (this.isMobile) {
          return (
            $(".ios-ytseekbar-wrapper").width() *
            (this.convertToSec(this.startTimeInput) /
              this.convertToSec(this.duration))
          );
        } else {
          return (
            $(".ytseekbar-wrapper").width() *
            (this.convertToSec(this.startTimeInput) /
              this.convertToSec(this.duration))
          );
        }
      } else {
        return 0;
      }
    },
    contentWidth() {
      if (
        this.startTimeInput != null &&
        (this.convertToSec(this.startTimeInput) ||
          this.convertToSec(this.startTimeInput) === 0) &&
        this.isReady
      ) {
        if (
          this.endTimeInput != null &&
          this.convertToSec(this.endTimeInput) &&
          this.convertToSec(this.startTimeInput) <
            this.convertToSec(this.endTimeInput)
        ) {
          if (this.isMobile) {
            return (
              $(".ios-ytseekbar-wrapper").width() *
                (this.convertToSec(this.endTimeInput) /
                  this.convertToSec(this.duration)) -
              this.contentLeft
            );
          } else {
            return (
              $(".ytseekbar-wrapper").width() *
                (this.convertToSec(this.endTimeInput) /
                  this.convertToSec(this.duration)) -
              this.contentLeft
            );
          }
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
  methods: {
    ...mapMutations({}),
    getClickPosition(e) {
      e.preventDefault(); // prevent browser from moving objects, following links etc

      if (this.isIOS) {
        if (!this.ytseekbarPageX) {
          this.ytseekbarPageX = $(".ios-ytseekbar-mask").offset().left;
        }
        this.seekWidth = e.changedTouches[0].pageX - this.ytseekbarPageX;
      } else if (this.isMobile) {
        if (!this.ytseekbarPageX) {
          this.ytseekbarPageX = $(".ios-ytseekbar-mask").offset().left;
        }
        if (e.changedTouches) {
          this.seekWidth = e.changedTouches[0].pageX - this.ytseekbarPageX;
        } else {
          this.seekWidth = e.pageX - this.ytseekbarPageX;
        }
      } else {
        if (!this.ytseekbarPageX) {
          this.ytseekbarPageX = $(".ytseekbar-mask").offset().left;
        }
        this.seekWidth = e.pageX - this.ytseekbarPageX;
      }

      // change seek position
      if (this.isMobile) {
        this.player.seekTo(
          this.convertToSec(this.duration) *
            (this.seekWidth / $(".ios-ytseekbar-wrapper").width())
        );
      } else {
        this.player.seekTo(
          this.convertToSec(this.duration) *
            (this.seekWidth / $(".ytseekbar-wrapper").width())
        );
      }
    },
    detectMouseDown(e) {
      e.preventDefault(); // prevent browser from moving objects, following links etc

      // start listening to mouse movements
      if (this.isIOS) {
        this.bodyRef.addEventListener("touchmove", this.getClickPosition);
      } else if (this.isMobile) {
        this.bodyRef.addEventListener(
          "touchmove",
          function (e) {
            e.preventDefault();
            this.getClickPosition;
          },
          { passive: false }
        );
      } else {
        this.bodyRef.addEventListener("mousemove", this.getClickPosition);
      }
    },
    detectMouseUp(e) {
      // stop listening to mouse movements
      if (this.isMobile) {
        this.bodyRef.removeEventListener("touchmove", this.getClickPosition);
      } else {
        this.bodyRef.removeEventListener("mousemove", this.getClickPosition);
      }
    },
    detectMouseDownOfYtseekbarMask(e) {
      e.preventDefault(); // prevent browser from moving objects, following links etc
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
  },
  created() {},
  mounted() {
    this.isMobile = this.mobileCheck();
    this.isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);

    this.$nextTick(() => {
      if (this.isIOS) {
        this.$refs.iosYtseekHead.addEventListener(
          "touchstart",
          this.detectMouseDown
        );
        this.$refs.iosYtseekbarMask.addEventListener(
          "touchstart",
          this.detectMouseDownOfYtseekbarMask
        );
        window.addEventListener("touchend", this.detectMouseUp);
      } else if (this.isMobile) {
        this.$refs.iosYtseekHead.addEventListener(
          "touchstart",
          function (e) {
            e.preventDefault();
            this.detectMouseDown;
          },
          { passive: false }
        );
        this.$refs.iosYtseekbarMask.addEventListener(
          "click",
          this.detectMouseDownOfYtseekbarMask
        );
        window.addEventListener("touchend", this.detectMouseUp);
      } else {
        this.$refs.ytseekHead.addEventListener(
          "mousedown",
          this.detectMouseDown
        );
        this.$refs.ytseekbarMask.addEventListener(
          "click",
          this.detectMouseDownOfYtseekbarMask
        );
        window.addEventListener("mouseup", this.detectMouseUp);
      }
    });
  },
};
</script>
