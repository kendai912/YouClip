<template>
  <div class="ytseekbar-wrapper" ref="ytseekbarWrapper">
    <div
      class="ytseek-head"
      ref="ytseekHead"
      v-bind:style="'transform: translateX(' + progress + 'px)'"
    >
      <div class="ytseek-innder"></div>
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
        $(".ytseekbar-wrapper").width() *
        (this.convertToSec(this.currentTime) / this.convertToSec(this.duration))
      );
    },
  },
  methods: {
    ...mapMutations({}),
    getClickPosition(e) {
      // e.preventDefault();

      if (e.srcElement.clientWidth > 300) {
        //when the srcElement is not ytseek-head/ytseek-inner
        this.seekWidth = e.offsetX;
      } else if (e.srcElement.clientWidth <= 10 && e.target.tagName != "SPAN") {
        //when the srcElement is ytseek-head/ytseek-inner
        let moveX = e.offsetX - this.previousYtseekOffsetX;
        this.seekWidth = this.seekWidth + moveX;
        this.previousYtseekOffsetX = e.offsetX;
      }

      // change seek position
      this.player.seekTo(
        this.convertToSec(this.duration) *
          (this.seekWidth / $(".ytseekbar-wrapper").width())
      );
    },
    detectMouseDown(e) {
      e.preventDefault(); // prevent browser from moving objects, following links etc

      // start listening to mouse movements
      this.highlightBodyRef.addEventListener(
        "mousemove",
        this.getClickPosition
      );
    },
    detectMouseUp(e) {
      // stop listening to mouse movements
      this.highlightBodyRef.removeEventListener(
        "mousemove",
        this.getClickPosition
      );
      this.previousYtseekOffsetX = 0;
    },
  },
  mounted() {
    //seekbarがiframeの下になるように高さを計算
    $(".ytseekbar-wrapper").css(
      "top",
      ($(".ytseekbar-wrapper").width() * 9) / 16 +
        (952 - ($(".ytseekbar-wrapper").width() * 9) / 16) / 2
    );

    this.$refs.ytseekHead.addEventListener("mousedown", this.detectMouseDown);
    window.addEventListener("mouseup", this.detectMouseUp);
  },
};
</script>
