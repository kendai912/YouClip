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
import YTvideoSelectBox from "../components/YTvideoSelectBox.vue";
import Youtube from "../components/Youtube.vue";
import Confirm from "../components/Confirm.vue";
import SceneList from "../components/SceneList.vue";
import Title from "../components/Title.vue";

export default {
  components: {
    YTvideoSelectBox,
    Youtube,
    Confirm,
    SceneList,
    Title,
  },
  data() {
    return {};
  },
  mixins: [myMixin],
  methods: {
    // コンポーネント遷移処理
    switchComponent() {
      if (this.$route.path == "/youtube/highlight") {
        this.$store.commit("highlight/setDisplayComponent", "Youtube");
      } else if (this.$route.path == "/youtube/confirm") {
        this.$store.commit("highlight/setDisplayComponent", "Confirm");
      } else if (this.$route.path == "/youtube/scenelist") {
        this.$store.commit("highlight/setDisplayComponent", "SceneList");
      } else if (this.$route.path == "/youtube/title") {
        this.$store.commit("highlight/setDisplayComponent", "Title");
      } else {
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
    if (
      (from.path == "/youtube/highlight" && to.path == "/highlight") ||
      (from.path == "/youtube/confirm" && to.path == "/youtube/highlight") ||
      (from.path == "/youtube/scenelist" && to.path == "/youtube/confirm") ||
      (from.path == "/youtube/scenelist" && to.path == "/highlight") ||
      (from.path == "/youtube/title" && to.path == "/youtube/scenelist")
    ) {
      self.$store.commit("highlight/setHighlightTransitNext", false);
    }
    await next();

    //遷移後は右スライドに戻す
    self.$store.commit("highlight/setHighlightTransitNext", true);
  },
};
</script>
