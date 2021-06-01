<template>
  <div>
    <div v-for="(telop, key) in telops" v-bind:key="key">
      <span
        v-if="
          convertToSec(formatToMinSec(telop.telopStart)) <=
            convertToSec(currentDisplayingTime) &&
            convertToSec(currentDisplayingTime) <
              convertToSec(formatToMinSec(telop.telopStart)) +
                Number(telop.telopDuration) &&
            telop.telopPosition == columnPosition
        "
        v-bind:class="telop.telopColor + 'Telop ' + telop.telopSize + 'Telop'"
        >{{ telop.telopText }}</span
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  components: {},
  props: {
    columnPosition: String,
  },
  data() {
    return {};
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      currentDisplayingTimeInSecOfWatch:
        "ytPlayer/currentDisplayingTimeInSecOfWatch",
      currentTime: "youtube/currentTime",
      telops: "telop/telops",
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
  created() {},
  beforeDestroy() {},
};
</script>
