<template>
  <div class="container--small">
    <div class="px-3 pt-3" v-if="YTRecentVideos.length > 0">
      <v-img
        src="/storage/icons/yt_social_red.png"
        width="28px"
        max-height="28px"
        class="float-left mr-2"
      />
      <span>最近シーン登録したYouTube動画</span>
    </div>
    <YTSearchBox />
    <YTRecentItem v-bind:YTRecentItems="YTRecentVideos" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import YTRecentItem from "../components/YTRecentItem.vue";
import YTSearchBox from "../components/YTSearchBox.vue";
import myMixin from "../util";

export default {
  components: {
    YTSearchBox,
    YTRecentItem,
  },
  data() {
    return {};
  },
  mixins: [myMixin],
  methods: {
    async getYTRecentVideos() {
      //ローディングを表示
      this.$store.commit("YTsearch/setIsYTLoading", true);

      await this.$store.dispatch("YTsearch/YTRecentVideos");
      //ローディングを非表示
      this.$store.commit("YTsearch/setIsYTLoading", false);
    },
  },
  computed: {
    ...mapGetters({
      YTRecentVideos: "YTsearch/YTRecentVideos",
    }),
  },
  created() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);
    //前回の検索結果を空にする
    this.$store.commit("YTsearch/clearYTRecentVideos");
    this.getYTRecentVideos();
  },
};
</script>
