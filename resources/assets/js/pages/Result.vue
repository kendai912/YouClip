<template>
  <div class="container--small">
    <v-card flat class="mt-4">
      <PlaylistMediaItem v-bind:mediaItems="playlistMediaItems" />
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PlaylistMediaItem from "../components/PlaylistMediaItem.vue";
import SceneMediaItem from "../components/SceneMediaItem.vue";
import myMixin from "../util";

export default {
  metaInfo() {
    return {
      title:
        "「" +
        this.$route.query.search_query +
        "」のYouTube動画まとめ検索結果 - YouClip",
      meta: [
        {
          name: "description",
          content:
            "YouTube動画のまとめ作成ツール、YouClipでの「" +
            this.$route.query.search_query +
            "」に関するYouTube動画まとめ検索結果です。YouClipでは、ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。また、みんなが作った人気のまとめを見ることも可能です。",
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
            "」のYouTube動画まとめ検索結果 - YouClip",
        },
        {
          property: "og:description",
          content:
            "YouTube動画のまとめ作成ツール、YouClipでの「" +
            this.$route.query.search_query +
            "」に関するYouTube動画まとめ検索結果です。YouClipでは、ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。",
        },
        {
          property: "og:image",
          content:
            "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png",
        },
      ],
    };
  },
  components: {
    PlaylistMediaItem,
    SceneMediaItem,
  },
  data() {
    return {
      tab: null,
      items: ["まとめ", "場面"],
      pageOfPlaylist: 1,
      playlistMediaItems: [],
    };
  },
  mixins: [myMixin],
  methods: {
    //初回ロード
    async initializeSearchResult() {
      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //URLのsearch_queryを元に検索ページネーションを実行
      this.$store.commit(
        "search/setSearchQuery",
        this.$route.query.search_query
      );
      await this.$store.dispatch("search/search", this.pageOfPlaylist++);
      this.pageOfTagVideo++;

      //プレイリストデータをメディアアイテムに追加格納
      this.putPlaylistTagIntoMediaItems(
        this.playlistMediaItems,
        this.playlistTagResult
      );
      //有効アイテム数が5未満の場合、スクロールイベントが発生しないのでマニュアルで次ページを読み込み
      if (this.playlistMediaItems.length < 5 && this.playlistResultToLoad)
        this.infinateLoadPlaylistSearchResult();

      //ローディングを非表示
      this.$store.commit("loadingItem/setIsLoading", false);
    },
    //プレイリストの検索結果の無限スクロール
    async infinateLoadPlaylistSearchResult() {
      if (!this.playlistResultToLoad) return;

      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //プレイリストの検索ページネーションを実行
      await this.$store.dispatch(
        "search/searchPlaylistTagResult",
        this.pageOfPlaylist++
      );

      //プレイリストデータをメディアアイテムに追加格納
      this.putPlaylistTagIntoMediaItems(
        this.playlistMediaItems,
        this.playlistTagResult
      );

      //ローディングを非表示
      this.$store.commit("loadingItem/setIsLoading", false);
    },
    resetSearchResult() {
      this.pageOfPlaylist = 1;
      this.playlistMediaItems = [];
    },
    setActiveTab(key) {
      //開いたタブをセッションストレージに保存
      window.sessionStorage.setItem("searchTabIndex", JSON.stringify(key));
    },
  },
  computed: {
    ...mapGetters({
      // searchQuery: "search/searchQuery",
      tagVideoResult: "search/tagVideoResult",
      playlistTagResult: "search/playlistTagResult",
      tagVideoResultToLoad: "search/tagVideoResultToLoad",
      playlistResultToLoad: "search/playlistResultToLoad",
      isSearchingPlaylistTagResult: "search/isSearchingPlaylistTagResult",
      isSearchingTagVideoResult: "search/isSearchingTagVideoResult",
    }),
  },
  watch: {
    $route() {
      this.resetSearchResult();
      this.initializeSearchResult();
    },
  },
  created() {
    //ナビバーを表示
    this.$store.commit("navbar/setShowNavbar", true);

    //検索バーをactiveにし、検索ワードをセット
    this.$store.commit("navbar/setIsActiveSearch", true);
    this.$store.commit("navbar/setSearchquery", this.$route.query.search_query);

    //ローディング表示用の変数をセット
    this.$store.commit("loadingItem/setNumberOfItemsPerPagination", 5);

    window.onscroll = () => {
      //ウィンドウの下から100pxに達したら次の検索結果を読み込み
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.infinateLoadPlaylistSearchResult();
      }
    };
    this.initializeSearchResult();

    //戻るor進むが押された場合は画面を再ロード
    // let self = this;
    // let from = this.$route.path;
    // window.addEventListener("popstate", function(e) {
    //   let to = self.$route.path;
    //   if (from == "/result" && to == "/result") {
    //     location.reload();
    //   }
    // });
  },
};
</script>
