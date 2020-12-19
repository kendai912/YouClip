<template>
  <div v-if="isIOS" class="ios-wrapper">
    <div class="ios-ytseekbar-wrapper">
      <div class="ios-ytseekbar-mask"></div>
      <div
        class="ios-ytseek-head"
        ref="ytseekHead"
        v-bind:style="'transform: translateX(' + progress + 'px)'"
      >
        <div class="ytseek-innder"></div>
      </div>
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

  <div v-else class="ytseekbar-wrapper">
    <div class="ytseekbar-mask"></div>
    <div
      class="ytseek-head"
      ref="ytseekHead"
      v-bind:style="'transform: translateX(' + progress + 'px)'"
    >
      <div class="ytseek-innder"></div>
    </div>
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
    highlightBodyRef: HTMLDivElement,
  },
  data() {
    return {
      seekWidth: 0,
      previousYtseekOffsetX: 0,
      isMobile: false,
      isIOS: true,
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      player: "ytPlayerController/player",
      currentTime: "youtube/currentTime",
      isNew: "youtube/isNew",
      newVideoData: "youtube/newVideoData",
      videoData: "youtube/videoData",
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
      if (this.isIOS) {
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
        this.convertToSec(this.startTimeInput)
      ) {
        if (this.isIOS) {
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
          this.convertToSec(this.startTimeInput) === 0)
      ) {
        if (
          this.endTimeInput != null &&
          this.convertToSec(this.endTimeInput) &&
          this.convertToSec(this.startTimeInput) <
            this.convertToSec(this.endTimeInput)
        ) {
          if (this.isIOS) {
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
      if (e.srcElement.clientWidth > 300) {
        //when the srcElement is not ytseek-head/ytseek-inner
        if (this.isMobile) {
          this.seekWidth = e.changedTouches[0].clientX;
        } else {
          this.seekWidth = e.offsetX;
        }
      } else if (e.srcElement.clientWidth <= 10 && e.target.tagName != "SPAN") {
        //when the srcElement is ytseek-head/ytseek-inner
        if (this.isMobile) {
          if (this.previousYtseekOffsetX == null) {
            this.previousYtseekOffsetX = e.changedTouches[0].clientX;
          }
          let moveX = e.changedTouches[0].clientX - this.previousYtseekOffsetX;
          this.seekWidth = this.seekWidth + moveX;
          this.previousYtseekOffsetX = e.changedTouches[0].clientX;
        } else {
          if (this.previousYtseekOffsetX == null) {
            this.previousYtseekOffsetX = e.offsetX;
          }
          let moveX = e.offsetX - this.previousYtseekOffsetX;
          this.seekWidth = this.seekWidth + moveX;
          this.previousYtseekOffsetX = e.offsetX;
        }
      }

      // change seek position
      if (this.isIOS) {
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
      if (this.isMobile) {
        this.highlightBodyRef.addEventListener(
          "touchmove",
          this.getClickPosition
        );
      } else {
        this.highlightBodyRef.addEventListener(
          "mousemove",
          this.getClickPosition
        );
      }
    },
    detectMouseUp(e) {
      // stop listening to mouse movements
      if (this.isMobile) {
        this.highlightBodyRef.removeEventListener(
          "touchmove",
          this.getClickPosition
        );
      } else {
        this.highlightBodyRef.removeEventListener(
          "mousemove",
          this.getClickPosition
        );
      }
      this.previousYtseekOffsetX = null;
    },
    setYtSeekbarWrapperTop() {
      //seekbarがiframeの下になるように高さを計算
      if (this.isIOS) {
        $(".ios-wrapper").css(
          "top",
          (($(".ios-wrapper").width() + 48) * 9) / 16 +
            (952 - (($(".ios-wrapper").width() + 48) * 9) / 16) / 2
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
  created() {
    this.isMobile = this.mobileCheck();
  },
  mounted() {
    //iOS端末か判定
    this.isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);

    //モバイルか判定
    if (this.isMobile) {
      this.$refs.ytseekHead.addEventListener(
        "touchstart",
        this.detectMouseDown
      );
      window.addEventListener("touchend", this.detectMouseUp);
    } else {
      this.$refs.ytseekHead.addEventListener("mousedown", this.detectMouseDown);
      window.addEventListener("mouseup", this.detectMouseUp);
    }
  },
};
</script>
