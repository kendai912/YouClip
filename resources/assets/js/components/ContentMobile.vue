<template>
  <div v-if="contentWidth >= 6">
    <div
      v-if="contentWidth"
      v-bind:class="
        listIndex == contentIndex
          ? 'ios-left-triangle-of-watch-now-playing'
          : 'ios-left-triangle-of-watch'
      "
      v-bind:style="'left: ' + contentLeft + 'px;'"
    ></div>
    <div
      v-bind:class="
        listIndex == contentIndex
          ? 'ios-highlight-content-of-watch-now-playing'
          : 'ios-highlight-content-of-watch'
      "
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
      v-bind:class="
        listIndex == contentIndex
          ? 'ios-right-triangle-of-watch-now-playing'
          : 'ios-right-triangle-of-watch'
      "
      v-bind:style="'left: calc(' + contentRight + 'px - 3px);'"
    ></div>
  </div>
  <div v-else>
    <div
      v-bind:class="
        listIndex == contentIndex
          ? 'ios-highlight-content-of-watch-now-playing'
          : 'ios-highlight-content-of-watch'
      "
      v-bind:style="
        'left: ' + contentLeft + 'px; width: ' + contentWidth + 'px;'
      "
    ></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  components: {},
  props: {
    contentIndex: Number,
  },
  data() {
    return {};
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isPlayerReady: "ytPlayer/isPlayerReady",
      seekbarWidth: "ytSeekBar/seekbarWidth",
      listIndex: "ytPlayer/listIndex",
      durationInSecOfWatch: "ytPlayer/durationInSecOfWatch",
      listOfYoutubeIdStartEndTime: "ytPlayer/listOfYoutubeIdStartEndTime",
    }),
    contentLeft() {
      if (this.isPlayerReady && this.listOfYoutubeIdStartEndTime) {
        let totalDurationOfPreviousScenesInSec = 0;

        for (let i = 0; i < this.contentIndex; i++) {
          totalDurationOfPreviousScenesInSec += this.convertToSec(
            this.formatToMinSec(this.listOfYoutubeIdStartEndTime[i].duration)
          );
        }

        return (
          this.seekbarWidth *
          (totalDurationOfPreviousScenesInSec / this.durationInSecOfWatch)
        );
      } else {
        return 0;
      }
    },
    contentWidth() {
      if (this.isPlayerReady && this.listOfYoutubeIdStartEndTime ) {
        return (
          this.seekbarWidth *
          (this.convertToSec(
            this.formatToMinSec(
              this.listOfYoutubeIdStartEndTime[this.contentIndex].duration
            )
          ) /
            this.durationInSecOfWatch)
        );
      } else {
        return 0;
      }
    },
    contentRight() {
      return this.contentLeft + this.contentWidth;
    },
  },
  watch: {},
  methods: {
    ...mapMutations({}),
  },
  created() {},
  mounted() {},
};
</script>
