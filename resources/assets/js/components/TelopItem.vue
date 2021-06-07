<template>
  <div
    class="d-flex align-center"
    v-bind:class="
      columnPosition.includes('Left')
        ? 'justify-start'
        : columnPosition.includes('Center')
        ? 'justify-center'
        : columnPosition.includes('Right')
        ? 'justify-end'
        : ''
    "
  >
    <div v-for="(telop, key) in telops" v-bind:key="key">
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
        style="text-align: left;"
        >{{ telop.text }}</span
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
