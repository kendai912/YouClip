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
import Youtube from "../pages/Youtube.vue";

export default {
  components: {
    YTvideoSelectBox,
    Youtube,
  },
  data() {
    return {};
  },
  mixins: [myMixin],
  methods: {
    // コンポーネント遷移処理
    switchComponent() {
      if (this.$route.query.v != null) {
        // パラメーターvがある場合は、Youtubeコンポーネントを表示
        this.$store.commit("highlight/setDisplayComponent", "Youtube");
      } else {
        // パラメーターがない場合は、YTvideoSelectBoxコンポーネントを表示
        this.$store.commit("highlight/setDisplayComponent", "YTvideoSelectBox");
      }
    },
  },
  computed: {
    ...mapGetters({
      highlightTransitNext: "highlight/highlightTransitNext",
      displayComponent: "highlight/displayComponent",
    }),
  },
  watch: {
    $route() {
      this.switchComponent();
    },
  },
  created() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);

    //URLを元にコンポーネントを選択
    this.switchComponent();
  },
  async beforeRouteLeave(to, from, next) {
    let self = this;
    //戻るボタンが押された場合は左スライドにセット
    if (from.path == "/youtube" && to.path == "/highlight") {
      self.$store.commit("highlight/setHighlightTransitNext", false);
    }
    await next();

    //遷移後は右スライドに戻す
    self.$store.commit("highlight/setHighlightTransitNext", true);
  },
};
</script>
