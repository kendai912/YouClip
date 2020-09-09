<template>
  <div class="container--small">
    <div class="px-3 pt-3" v-if="YTRecentVideos.length>0">
      最近シーン登録したYouTube動画
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
    //表示するYoutube検索結果の無限スクロール
    // async infinateScrollYTresults() {
    //   //ローディングを表示
    //   this.$store.commit("YTsearch/setIsYTLoading", true);

    //   //無限スクロールに合わせてYoutubeの検索結果を取得
    //   await this.$store.dispatch("YTsearch/YTsearch");

    //   //ローディングを非表示
    //   this.$store.commit("YTsearch/setIsYTLoading", false);
    // }
    async getYTRecentVideos() {
      //ローディングを表示
      this.$store.commit("YTsearch/setIsYTLoading", true);

      await this.$store.dispatch("YTsearch/YTRecentVideos");
      //ローディングを非表示
      this.$store.commit("YTsearch/setIsYTLoading", false);
    }
  },
  computed: {
    ...mapGetters({
      YTRecentVideos: "YTsearch/YTRecentVideos",
    })
  },
  created() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);
    //前回の検索結果を空にする
    this.$store.commit("YTsearch/clearYTRecentVideos");
    this.getYTRecentVideos();
    console.log("eeeeeeeeeeeeee", this.YTRecentVideos);
  }
};
</script>
