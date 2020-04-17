<template>
  <div class="container--small">
    <h1>YTResult</h1>
    <div>
      <YTSearchBox />
    </div>
    <div>
      <YTitem v-bind:YTitems="YTresult" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import YTSearchBox from "../components/YTSearchBox.vue";
import YTitem from "../components/YTitem.vue";
import myMixin from "../util";

export default {
  components: {
    YTSearchBox,
    YTitem
  },
  mixins: [myMixin],
  methods: {
    //表示するYoutube検索結果の無限スクロール
    async infinateScrollYTresults() {
      //ローディングを表示
      this.$store.commit("YTsearch/setIsYTLoading", true);

      //無限スクロールに合わせてYoutubeの検索結果を取得
      await this.$store.dispatch("YTsearch/YTsearch");

      //ローディングを非表示
      this.$store.commit("YTsearch/setIsYTLoading", false);
    }
  },
  computed: {
    ...mapGetters({
      YTsearchQuery: "YTsearch/YTsearchQuery",
      YTresult: "YTsearch/YTresult",
      isYTSearching: "YTsearch/isYTSearching",
      isYTLoading: "YTsearch/isYTLoading"
    })
  },
  mounted() {
    //ローディング表示用の変数をセット
    this.$store.commit("YTsearch/setNumberOfYTItemsPerPagination", 5);

    //URLのsearch_queryを検索ワードにセット
    this.$store.commit(
      "YTsearch/setYTsearchQuery",
      this.$route.query.search_query
    );

    window.onscroll = () => {
      //ウィンドウの下から100pxに達したら次のプレイリストアイテムを読み込み
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight;
      if (bottomOfWindow && !this.isYTSearching) {
        this.infinateScrollYTresults();
      }
    };
    this.infinateScrollYTresults();
  }
};
</script>
