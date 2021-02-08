<template>
  <div class="container--small">
    <div class="px-3 pt-3">
      <v-img
        src="/storage/icons/yt_social_red.png"
        width="28px"
        max-height="28px"
        class="float-left mr-2"
      />
      <span>YouTube検索結果</span>
    </div>
    <YTSearchBox />
    <YTitem v-bind:YTitems="YTresult" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import YTSearchBox from "../components/YTSearchBox.vue";
import YTitem from "../components/YTitem.vue";
import myMixin from "../util";

export default {
  metaInfo() {
    return {
      title:
        "「" +
        this.$route.query.search_query +
        "」のYouTube検索結果(まとめ作成) - YouClip",
      meta: [
        {
          name: "description",
          content:
            "YouTube動画のまとめ作成ツール、YouClipでの「" +
            this.$route.query.search_query +
            "」のYouTube検索結果です。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。また、みんなが作った人気のまとめを見ることも可能です。",
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
          content: "https://youclip.jp" + this.$route.fullPath,
        },
        {
          property: "og:title",
          content:
            "「" +
            this.$route.query.search_query +
            "」のYouTube検索結果(まとめ作成) - YouClip",
        },
        {
          property: "og:description",
          content:
            "YouTube動画のまとめ作成ツール、YouClipでの「" +
            this.$route.query.search_query +
            "」のYouTube検索結果です。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。",
        },
        {
          property: "og:image",
          content:
            "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png",
        },
      ],
      link: [
        { rel: "canonical", href: "https://youclip.jp" + this.$route.path },
      ],
    };
  },
  components: {
    YTSearchBox,
    YTitem,
  },
  data() {
    return {
      pageNumber: 1,
    };
  },
  mixins: [myMixin],
  methods: {
    //表示するYoutube検索結果の無限スクロール
    async infinateScrollYTresults() {
      //ローディングを表示
      this.$store.commit("YTsearch/setIsYTLoading", true);

      //無限スクロールに合わせてYoutubeの検索結果を取得
      await this.$store.dispatch("YTsearch/YTsearch", this.pageNumber);
      this.pageNumber++;

      //ローディングを非表示
      this.$store.commit("YTsearch/setIsYTLoading", false);
    },
  },
  computed: {
    ...mapGetters({
      YTsearchQuery: "YTsearch/YTsearchQuery",
      YTresult: "YTsearch/YTresult",
      isYTSearching: "YTsearch/isYTSearching",
      isYTLoading: "YTsearch/isYTLoading",
    }),
  },
  mounted() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);

    //ローディング表示用の変数をセット
    this.$store.commit("YTsearch/setNumberOfYTItemsPerPagination", 8);

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

    this.$store.commit("tagging/setTags", "");
    this.$store.commit("tagging/setStart", "");
    this.$store.commit("tagging/setEnd", "");
  },
};
</script>
