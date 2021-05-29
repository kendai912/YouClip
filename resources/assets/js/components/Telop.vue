<template>
  <div style="color:white; ">
    <div
      v-if="
        93 <= convertToSec(currentDisplayingTime) &&
          convertToSec(currentDisplayingTime) <= 96
      "
    >
      -----------TELOP-----------
    </div>
    <div>☆☆☆☆☆☆{{ convertToSec(currentDisplayingTime) }}☆☆☆☆☆☆☆</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isPlaying: "ytPlayer/isPlaying",
      isWatchingPlaylist: "ytPlayer/isWatchingPlaylist",
      currentDisplayingTimeInSecOfWatch:
        "ytPlayer/currentDisplayingTimeInSecOfWatch",
      currentTime: "youtube/currentTime",
    }),
    currentDisplayingTime() {
      if (this.isWatchingPlaylist) {
        return this.formatTime(this.currentDisplayingTimeInSecOfWatch);
      } else {
        return this.currentTime;
      }
    },
  },
  methods: {
    ...mapMutations({}),
  },
  beforeDestroy() {},
};
</script>
