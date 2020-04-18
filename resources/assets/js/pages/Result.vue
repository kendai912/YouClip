<template>
  <div class="container--small">
    <h1>Result</h1>
    <div>
      <SearchBox />
    </div>
    <div>
      <ul class="tab">
        <li
          class="tab__item"
          v-bind:class="{ 'tab__item--active': tab == 1 }"
          v-on:click="tab = 1"
        >プレイリスト</li>
        <li
          class="tab__item"
          v-bind:class="{ 'tab__item--active': tab == 2 }"
          v-on:click="tab = 2"
        >シーン</li>
      </ul>
      <div class="panel" v-show="tab === 1">
        <IndexItem v-bind:mediaItems="playlistMediaItems" />
      </div>
      <div class="panel" v-show="tab === 2">
        <IndexItem v-bind:mediaItems="tagVideoMediaItems" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SearchBox from "../components/SearchBox.vue";
import IndexItem from "../components/IndexItem.vue";
import myMixin from "../util";

export default {
  components: {
    SearchBox,
    IndexItem
  },
  data() {
    return {
      tab: 1,
      pageOfPlaylist: 1,
      pageOfTagVideo: 1,
      playlistMediaItems: [],
      tagVideoMediaItems: []
    };
  },
  mixins: [myMixin],
  methods: {
    //i:s形式に変換
    formatToMinSec(His) {
      let min =
        parseInt(His.split(":")[0], 10) * 60 + parseInt(His.split(":")[1], 10);
      let sec = parseInt(His.split(":")[2], 10);
      return min + ":" + sec;
    },
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
      //タグデータをメディアアイテムに格納
      this.putTagVideoIntoMediaItems(
        this.tagVideoMediaItems,
        this.tagVideoResult
      );

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
    //シーンの検索結果の無限スクロール
    async infinateLoadTagVideSearchResult() {
      if (!this.tagVideoResultToLoad) return;

      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //シーンの検索ページネーションを実行
      await this.$store.dispatch(
        "search/searchTagVideoResult",
        this.pageOfTagVideo++
      );

      //タグデータをレコメンド画面に表示するメディアアイテムに格納
      this.putTagVideoIntoMediaItems(
        this.tagVideoMediaItems,
        this.tagVideoResult
      );

      //ローディングを非表示
      this.$store.commit("loadingItem/setIsLoading", false);
    }
  },
  computed: {
    ...mapGetters({
      searchQuery: "search/searchQuery",
      tagVideoResult: "search/tagVideoResult",
      playlistTagResult: "search/playlistTagResult",
      tagVideoResultToLoad: "search/tagVideoResultToLoad",
      playlistResultToLoad: "search/playlistResultToLoad",
      isSearchingPlaylistTagResult: "search/isSearchingPlaylistTagResult",
      isSearchingTagVideoResult: "search/isSearchingTagVideoResult"
    })
  },
  created() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);

    //ローディング表示用の変数をセット
    this.$store.commit("loadingItem/setNumberOfItemsPerPagination", 5);

    window.onscroll = () => {
      //ウィンドウの下から100pxに達したら次の検索結果を読み込み
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        if (this.tab == 1 && !this.isSearchingPlaylistTagResult) {
          this.infinateLoadPlaylistSearchResult();
        } else if (this.tab == 2 && !this.isSearchingTagVideoResult) {
          this.infinateLoadTagVideSearchResult();
        }
      }
    };
    this.initializeSearchResult();

    //戻るor進むが押された場合は画面を再ロード
    let self = this;
    let from = this.$route.path;
    window.addEventListener("popstate", function(e) {
      let to = self.$route.path;
      if (from == "/result" && to == "/result") {
        location.reload();
      }
    });
  }
};
</script>
