<template>
  <transition
    v-bind:name="highlightTransitNext ? 'transitForward' : 'transitBackward'"
  >
    <component v-bind:is="displayComponent"></component>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";
import YTvideoSelectBox from "./YTvideoSelectBox.vue";

export default {
  components: {
    YTvideoSelectBox,
  },
  data() {
    return {};
  },
  mixins: [myMixin],
  methods: {},
  computed: {
    ...mapGetters({
      highlightTransitNext: "highlight/highlightTransitNext",
      displayComponent: "highlight/displayComponent",
    }),
  },
  created() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);
  },
};
</script>
