<template>
  <div class="container--small full-height">
    <HighlightHeader />
    <YTSearchBox />
    <div v-if="YTsearchQuery" class="highlight-body">
      <div class="px-3 pt-4">
        <v-img
          src="/storage/icons/yt_social_red.png"
          width="28px"
          max-height="28px"
          alt="YouTube logo"
          class="float-left mr-2"
        />
        <h2 class="fz-14">YouTube検索結果</h2>
      </div>
      <YTitem v-bind:YTitems="YTresult" />
    </div>

    <div v-else class="highlight-body">
      <div class="px-3 pt-3" v-if="YTRecentVideos.length > 0">
        <v-img
          src="/storage/icons/yt_social_red.png"
          width="28px"
          max-height="28px"
          alt="YouTube logo"
          class="float-left mr-2"
        />
        <h2 class="fz-14">最近切り抜いたYouTube動画</h2>
      </div>
      <YTitem v-bind:YTitems="YTRecentVideos" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";
import HighlightHeader from "../components/HighlightHeader.vue";
import YTitem from "../components/YTitem.vue";
import YTSearchBox from "../components/YTSearchBox.vue";

export default {
  components: {
    HighlightHeader,
    YTitem,
    YTSearchBox,
  },
  data() {
    return {
      headerWord: "切り抜きまとめを作成",
      from: null,
    };
  },
  ...mapGetters({
    isAdding: "tagging/isAdding",
    myPlaylistToSave: "tagging/myPlaylistToSave",
  }),
  mixins: [myMixin],
  methods: {
    ...mapMutations({
      setIsAdding: "tagging/setIsAdding",
      setMyPlaylistToSave: "tagging/setMyPlaylistToSave",
      setStep: "highlightHeader/setStep",
    }),
    setHeaderBackIcon() {
      this.$nextTick(() => {
        if (
          this.$route.path == "/add" ||
          this.$route.path == "/add/search" ||
          this.$route.query.return == "true"
        ) {
          //追加の場合、もしくはreturnフラグがtrueの場合は、headerの戻るアイコンを表示
          this.$store.commit("highlightHeader/setShowSteps", true);
          this.$store.commit("highlightHeader/setShowBackIcon", true);
        } else {
          //デフォルトではheaderの戻るアイコンを非表示
          this.$store.commit("highlightHeader/setShowBackIcon", false);
        }
      });
    },
    initialize() {
      //highlightHeaderの設定
      this.setHeaderBackIcon();
      this.setStep(1);

      //既存のプレイリストへの追加か判別
      if (this.$route.path == "/add" || this.$route.path == "/add/search") {
        this.setIsAdding(true);
        this.setMyPlaylistToSave(this.$route.query.playlist);

        //headerの文言を追加用に修正
        this.headerWord = "切り抜きまとめに追加";
      } else {
        this.setIsAdding(false);
        this.setMyPlaylistToSave("none");
      }

      //URLのsearch_queryを検索ワードにセット
      this.$store.commit(
        "YTsearch/setYTsearchQuery",
        this.$route.query.search_query
      );

      //前回の検索結果を空にする
      this.$store.commit("YTsearch/clearYTResult");
      this.$store.commit("YTsearch/setYTResultPageNumber", 1);
      this.$store.commit("YTsearch/setYTSearchKey", "");
      this.$store.commit("YTsearch/setYTSearchPageToken", "");

      if (this.YTsearchQuery == null) {
        //検索ワードがセットされていない場合、最近切り抜いたYouTube動画を表示
        this.$store.commit(
          "highlightHeader/setHeaderMessage",
          this.headerWord + "する動画を検索"
        );
        this.getYTRecentVideos();
      } else {
        //検索ワードがセットされている場合、YouTube検索結果を表示
        this.$store.commit(
          "highlightHeader/setHeaderMessage",
          this.headerWord + "する動画を選択"
        );
        this.showYTresult();
      }
    },
    async getYTRecentVideos() {
      // remove event listener of searchquery showYTresult()
      window.onscroll = null;

      // 前回の検索結果を空にする
      this.$store.commit("YTsearch/clearYTRecentVideos");

      // ローディングを表示
      this.$store.commit("YTsearch/setIsYTLoading", true);

      // 切り抜きまとめを作成したYouTube動画履歴データを取得
      await this.$store.dispatch("YTsearch/YTRecentVideos");

      // ローディングを非表示
      this.$store.commit("YTsearch/setIsYTLoading", false);
    },
    //表示するYoutube検索結果の無限スクロール
    async infinateScrollYTresults() {
      //ローディングを表示
      this.$store.commit("YTsearch/setIsYTLoading", true);

      //無限スクロールに合わせてYoutubeの検索結果を取得
      await this.$store.dispatch("YTsearch/YTsearch", this.pageNumber);
      this.$store.commit("YTsearch/setYTResultPageNumber", this.pageNumber + 1);

      //ローディングを非表示
      this.$store.commit("YTsearch/setIsYTLoading", false);
    },
    showYTresult() {
      //ローディング表示用の変数をセット
      this.$store.commit("YTsearch/setNumberOfYTItemsPerPagination", 8);

      window.onscroll = () => {
        //ウィンドウの下に達したら次のプレイリストアイテムを読み込み
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
  },
  computed: {
    ...mapGetters({
      YTsearchQuery: "YTsearch/YTsearchQuery",
      YTresult: "YTsearch/YTresult",
      YTRecentVideos: "YTsearch/YTRecentVideos",
      isYTSearching: "YTsearch/isYTSearching",
      isYTLoading: "YTsearch/isYTLoading",
      pageNumber: "YTsearch/YTResultPageNumber",
      showBackIcon: "highlightHeader/showBackIcon",
    }),
  },
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route() {
      this.initialize();
    },
  },
  created() {
    this.initialize();
  },
};
</script>
