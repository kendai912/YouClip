<template>
  <div class="container--small">
    <h1>Result</h1>
    <div>
      <SearchBox />
    </div>
    <div>
      <IndexItem v-bind:mediaItems="mediaItems" />
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
    }
  },
  computed: {
    ...mapGetters({
      searchQuery: "search/searchQuery",
      tagVideoResult: "search/tagVideoResult",
      playlistTagResult: "search/playlistTagResult"
    }),
    //レコメンド画面に表示するアイテム
    mediaItems() {
      let mediaItems = [];

      //タグデータをレコメンド画面に表示するメディアアイテムに格納
      this.putTagVideoIntoMediaItems(mediaItems, this.tagVideoResult);

      //プレイリストデータをメディアアイテムに追加格納
      this.putPlaylistTagIntoMediaItems(mediaItems, this.playlistTagResult);

      //作成日の降順(新しい日付が上)に並び替え
      return mediaItems.sort((a, b) => {
        return a.created_at < b.created_at
          ? 1
          : a.created_at > b.created_at
          ? -1
          : 0;
      });
    }
  },
  async created() {
    //リロードされた場合はURLのsearch_queryを元に再度検索を実行
    this.$store.commit("search/setSearchQuery", this.$route.query.search_query);
    await this.$store.dispatch("search/search");

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
