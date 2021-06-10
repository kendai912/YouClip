<template>
  <div class="telopItemContainer">
    <div
      v-for="(telop, key) in telops"
      v-bind:key="key"
      v-bind:class="
        columnPosition == 'upperLeft'
          ? 'telopItemUpperLeft'
          : columnPosition == 'upperCenter'
          ? 'telopItemUpperCenter'
          : columnPosition == 'upperRight'
          ? 'telopItemUpperRight'
          : columnPosition == 'middleLeft'
          ? 'telopItemMiddleLeft'
          : columnPosition == 'middleCenter'
          ? 'telopItemMiddleCenter'
          : columnPosition == 'middleRight'
          ? 'telopItemMiddleRight'
          : columnPosition == 'bottomLeft'
          ? 'telopItemBottomLeft'
          : columnPosition == 'bottomCenter'
          ? 'telopItemBottomCenter'
          : columnPosition == 'bottomRight'
          ? 'telopItemBottomRight'
          : ''
      "
    >
      <span
        v-if="
          convertToSec(formatToMinSec(telop.start)) <=
            convertToSec(currentTime) &&
            convertToSec(currentTime) <
              convertToSec(formatToMinSec(telop.start)) +
                Number(telop.duration) &&
            telop.position == columnPosition
        "
        v-bind:class="
          telop.color + 'Telop ' + telop.size + 'Telop telopFontFamily'
        "
      >
        {{ telop.text }}
      </span>
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
      currentTime: "youtube/currentTime",
      telops: "telop/telops",
    }),
  },

  methods: {
    ...mapMutations({}),
  },
  created() {},
  beforeDestroy() {},
};
</script>
