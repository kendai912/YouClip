<template>
  <div class="container--small">
    <v-tabs v-model="tab" background-color="transparent" grow hide-slider>
      <v-tab
        v-for="(item, key) in items"
        :key="item"
        v-on:click="setActiveTab(key); initialPaginate(key)"
      >{{ item }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <IndexItem v-bind:mediaItems="recommendMediaItems" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <IndexItem v-bind:mediaItems="newMediaItems" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <IndexItem v-bind:mediaItems="sportsMediaItems" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <IndexItem v-bind:mediaItems="entertainmentMediaItems" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import IndexItem from "../components/IndexItem.vue";
import myMixin from "../util";

export default {
  components: {
    IndexItem
  },
  data() {
    return {
      tab: 0,
      items: ["おすすめ", "新着", "スポーツ", "エンターテイメント"],
      recommendPage: 1,
      newPage: 1,
      sportsPage: 1,
      entertainmentPage: 1,
      recommendMediaItems: [],
      newMediaItems: [],
      sportsMediaItems: [],
      entertainmentMediaItems: []
    };
  },
  mixins: [myMixin],
  methods: {
    setActiveTab(key) {
      //開いたタブをセッションストレージに保存
      window.sessionStorage.setItem("topTabIndex", JSON.stringify(key));
    },
    //初回読み込み処理
    initialPaginate(key) {
      if (key == 0 && this.recommendPage == 1)
        this.infinateLoadPlaylistOfRecommend();
      if (key == 1 && this.newPage == 1) this.infinateLoadPlaylistOfNew();
      if (key == 2 && this.sportsPage == 1) this.infinateLoadPlaylistOfSports();
      if (key == 3 && this.entertainmentPage == 1) {
        this.infinateLoadPlaylistOfEntertainment();
      }
    },
    //i:s形式に変換
    formatToMinSec(His) {
      let min =
        parseInt(His.split(":")[0], 10) * 60 + parseInt(His.split(":")[1], 10);
      let sec = parseInt(His.split(":")[2], 10);
      return min + ":" + sec;
    },
    //【レコメンド】表示するプレイリストの無限スクロール
    async infinateLoadPlaylistOfRecommend() {
      if (!this.toLoadRecommend) return;

      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //無限スクロールに合わせてプレイリストのページネイションを取得
      await this.$store.dispatch(
        "playlist/indexPlaylistAndTagPaginationOfRecommend",
        this.recommendPage++
      );
      // ページネーションのデータをrecommendMediaItemsに格納
      this.putPlaylistTagIntoMediaItems(
        this.recommendMediaItems,
        this.playlistAndTagPaginationOfRecommend.data
      );

      //ローディングを非表示
      this.$store.commit("loadingItem/setIsLoading", false);
    },
    //【新着】表示するプレイリストの無限スクロール
    async infinateLoadPlaylistOfNew() {
      if (!this.toLoadNew) return;

      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //無限スクロールに合わせてプレイリストのページネイションを取得
      await this.$store.dispatch(
        "playlist/indexPlaylistAndTagPaginationOfNew",
        this.newPage++
      );
      //ページネーションのデータをNewMediaItemsに格納
      this.putPlaylistTagIntoMediaItems(
        this.newMediaItems,
        this.playlistAndTagPaginationOfNew.data
      );

      //ローディングを非表示
      this.$store.commit("loadingItem/setIsLoading", false);
    },
    //【スポーツ】表示するプレイリストの無限スクロール
    async infinateLoadPlaylistOfSports() {
      if (!this.toLoadSports) return;

      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //無限スクロールに合わせてプレイリストのページネイションを取得
      await this.$store.dispatch(
        "playlist/indexPlaylistAndTagPaginationOfSports",
        this.sportsPage++
      );
      //ページネーションのデータをSportsMediaItemsに格納
      this.putPlaylistTagIntoMediaItems(
        this.sportsMediaItems,
        this.playlistAndTagPaginationOfSports.data
      );

      //ローディングを非表示
      this.$store.commit("loadingItem/setIsLoading", false);
    },
    //【エンターテイメント】表示するプレイリストの無限スクロール
    async infinateLoadPlaylistOfEntertainment() {
      if (!this.toLoadEntertainment) return;

      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //無限スクロールに合わせてプレイリストのページネイションを取得
      await this.$store.dispatch(
        "playlist/indexPlaylistAndTagPaginationOfEntertainment",
        this.entertainmentPage++
      );
      //ページネーションのデータをEntertainmentMediaItemsに格納
      this.putPlaylistTagIntoMediaItems(
        this.entertainmentMediaItems,
        this.playlistAndTagPaginationOfEntertainment.data
      );

      //ローディングを非表示
      this.$store.commit("loadingItem/setIsLoading", false);
    }
  },
  computed: {
    ...mapGetters({
      playlistAndTagPaginationOfRecommend:
        "playlist/playlistAndTagPaginationOfRecommend",
      playlistAndTagPaginationOfNew: "playlist/playlistAndTagPaginationOfNew",
      playlistAndTagPaginationOfSports:
        "playlist/playlistAndTagPaginationOfSports",
      playlistAndTagPaginationOfEntertainment:
        "playlist/playlistAndTagPaginationOfEntertainment",
      toLoadRecommend: "playlist/toLoadRecommend",
      toLoadNew: "playlist/toLoadNew",
      toLoadSports: "playlist/toLoadSports",
      toLoadEntertainment: "playlist/toLoadEntertainment",
      isIndexRecommendPlaylistAndTagPaginating:
        "playlist/isIndexRecommendPlaylistAndTagPaginating",
      isIndexNewPlaylistAndTagPaginating:
        "playlist/isIndexNewPlaylistAndTagPaginating",
      isIndexSportsPlaylistAndTagPaginating:
        "playlist/isIndexSportsPlaylistAndTagPaginating",
      isIndexEntertainmentPlaylistAndTagPaginating:
        "playlist/isIndexEntertainmentPlaylistAndTagPaginating"
    })
  },
  mounted() {
    //以前に開いていたタブをセッションストレージからセット
    this.tab = parseInt(window.sessionStorage.getItem("topTabIndex"));

    this.$store.commit("playlist/setToLoadRecommend", true);
    this.$store.commit("playlist/setToLoadNew", true);
    this.$store.commit("playlist/setToLoadSports", true);
    this.$store.commit("playlist/setToLoadEntertainment", true);

    window.onscroll = () => {
      //ウィンドウの下から100pxに達したら次のプレイリストアイテムを読み込み
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        if (this.tab == 0 && !this.isIndexRecommendPlaylistAndTagPaginating)
          this.infinateLoadPlaylistOfRecommend();
        if (this.tab == 1 && !this.isIndexNewPlaylistAndTagPaginating)
          this.infinateLoadPlaylistOfNew();
        if (this.tab == 2 && !this.isIndexSportsPlaylistAndTagPaginating)
          this.infinateLoadPlaylistOfSports();
        if (this.tab == 3 && !this.isIndexEntertainmentPlaylistAndTagPaginating)
          this.infinateLoadPlaylistOfEntertainment();
      }
    };
    if (this.tab == 0) this.infinateLoadPlaylistOfRecommend();
    if (this.tab == 1) this.infinateLoadPlaylistOfNew();
    if (this.tab == 2) this.infinateLoadPlaylistOfSports();
    if (this.tab == 3) this.infinateLoadPlaylistOfEntertainment();
  }
};
</script>
