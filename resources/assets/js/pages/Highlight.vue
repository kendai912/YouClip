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
import Complete from "../components/Complete.vue";

export default {
  metaInfo() {
    return {
      title: "切り抜きまとめ作成 - YouClip",
      meta: [
        {
          name: "description",
          content:
            "YouTube長時間動画の見所切り抜きサイト、YouClipの切り抜きまとめ作成ページです。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜きを誰でも簡単に作ることが出来ます。また、みんなが作った人気の切り抜きまとめを見ることも可能です。",
        },
        {
          property: "og:site_name",
          content: "YouClip",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: "https://youclip.jp",
        },
        {
          property: "og:title",
          content: "切り抜きまとめ作成 - YouClip",
        },
        {
          property: "og:description",
          content:
            "YouTube長時間動画の見所切り抜きサイト、YouClipの切り抜きまとめ作成ページです。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜きを誰でも簡単に作ることが出来ます。また、みんなが作った人気の切り抜きまとめを見ることも可能です。",
        },
        {
          property: "og:image",
          content:
            "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png",
        },
      ],
      link: [{ rel: "canonical", href: "https://youclip.jp/youtube" }],
    };
  },
  components: {
    YTvideoSelectBox,
    Youtube,
    Confirm,
    SceneList,
    Title,
    Complete,
  },
  data() {
    return {};
  },
  mixins: [myMixin],
  methods: {
    // コンポーネント遷移処理
    switchComponent() {
      if (this.$route.path == "/youtube/scene") {
        this.$store.commit("highlight/setDisplayComponent", "Youtube");
      } else if (this.$route.path == "/youtube/confirm") {
        this.$store.commit("highlight/setDisplayComponent", "Confirm");
      } else if (this.$route.path == "/highlight/scenelist") {
        this.$store.commit("highlight/setDisplayComponent", "SceneList");
      } else if (this.$route.path == "/highlight/title") {
        this.$store.commit("highlight/setDisplayComponent", "Title");
      } else if (this.$route.path == "/highlight/complete") {
        this.$store.commit("highlight/setDisplayComponent", "Complete");
      } else if (this.$route.path == "/add") {
        this.$store.commit("highlight/setDisplayComponent", "YTvideoSelectBox");
      } else if (this.$route.path == "/add/search") {
        this.$store.commit("highlight/setDisplayComponent", "YTvideoSelectBox");
      } else if (this.$route.path == "/add/scene") {
        this.$store.commit("highlight/setDisplayComponent", "Youtube");
      } else if (this.$route.path == "/add/confirm") {
        this.$store.commit("highlight/setDisplayComponent", "Confirm");
      } else if (this.$route.path == "/edit/scene") {
        this.$store.commit("highlight/setDisplayComponent", "Youtube");
      } else if (this.$route.path == "/edit/confirm") {
        this.$store.commit("highlight/setDisplayComponent", "Confirm");
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
    if (
      to.path == "/" ||
      to.path == "/mypage" ||
      to.path == "/login" ||
      to.path == "/editmyplaylist" ||
      to.path == "/tagging"
    ) {
      //hide iframe player first because it remains when moving to another page
      $("#player").hide();
    }

    let self = this;
    //戻るボタンが押された場合は左スライドにセット
    if (
      (from.path == "/youtube/scene" && to.path == "/youtube") ||
      (from.path == "/youtube/scene" && to.path == "/") ||
      (from.path == "/youtube/confirm" && to.path == "/youtube/scene") ||
      (from.path == "/youtube/confirm" && to.path == "/youtube") ||
      (from.path == "/highlight/scenelist" && to.path == "/youtube/scene") ||
      (from.path == "/highlight/scenelist" && to.path == "/youtube/confirm") ||
      (from.path == "/highlight/scenelist" && to.path == "/youtube") ||
      (from.path == "/highlight/title" && to.path == "/highlight/scenelist") ||
      (from.path == "/highlight/title" && to.path == "/youtube") ||
      (from.path == "/highlight/complete" && to.path == "/youtube") ||
      (from.path == "/add" && to.path == "/youtube") ||
      (from.path == "/add" && to.path == "/mypage") ||
      (from.path == "/add" && to.path == "/") ||
      (from.path == "/add/scene" && to.path == "/add") ||
      (from.path == "/add/scene" && to.path == "/youtube") ||
      (from.path == "/add/scene" && to.path == "/mypage") ||
      (from.path == "/add/scene" && to.path == "/") ||
      (from.path == "/add/confirm" && to.path == "/add/scene") ||
      (from.path == "/add/confirm" && to.path == "/youtube") ||
      (from.path == "/add/confirm" && to.path == "/mypage") ||
      (from.path == "/add/confirm" && to.path == "/") ||
      (from.path == "/add/confirm" && to.path == "/editmyplaylist") ||
      (from.path == "/edit/scene" && to.path == "/editmyplaylist") ||
      (from.path == "/edit/confirm" && to.path == "/edit/scene") ||
      (from.path == "/edit/confirm" && to.path == "/editmyplaylist") ||
      (from.path == "/edit/confirm" && to.path == "/youtube") ||
      (from.path == "/edit/confirm" && to.path == "/mypage") ||
      (from.path == "/edit/confirm" && to.path == "/")
    ) {
      self.$store.commit("highlight/setHighlightTransitNext", false);
    }
    await next();

    //遷移後は右スライドに戻す
    self.$store.commit("highlight/setHighlightTransitNext", true);
  },
};
</script>
