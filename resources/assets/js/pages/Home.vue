<template>
  <div class="container--small">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      class="mx-auto homepage-tabs"
      grow
      hide-slider
    >
      <v-tab
        active-class="activated-tab"
        v-for="(item, key) in items"
        :key="item"
        v-on:click="
          setActiveTab(key);
          initialPaginate(key);
        "
        ><span style="font-size: 1.214285rem !important">{{
          item
        }}</span></v-tab
      >
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <PlaylistMediaItem
            v-bind:mediaItems="recommendMediaItems"
            v-bind:key="resetKey"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <PlaylistMediaItem
            v-bind:mediaItems="newMediaItems"
            v-bind:key="resetKey"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <PlaylistMediaItem
            v-bind:mediaItems="sportsMediaItems"
            v-bind:key="resetKey"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <PlaylistMediaItem
            v-bind:mediaItems="entertainmentMediaItems"
            v-bind:key="resetKey"
          />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PlaylistMediaItem from "../components/PlaylistMediaItem.vue";
import myMixin from "../util";

export default {
  metaInfo() {
    return {
      title: "YouClip - YouTube動画のまとめ作成ツール",
      meta: [
        {
          name: "description",
          content:
            "YouClipはYouTube動画のまとめ作成ツールです。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。また、みんなが作った人気のまとめを見ることも可能です。",
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
          content: "YouClip - YouTube動画のまとめ作成ツール",
        },
        {
          property: "og:description",
          content:
            "YouClipはYouTube動画のまとめ作成ツールです。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。",
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
  },
  data() {
    return {
      tab: 0,
      // items: ["おすすめ", "新着", "スポーツ", "エンターテイメント"],
      items: ["おすすめ", "新着"],
      recommendPage: 1,
      newPage: 1,
      sportsPage: 1,
      entertainmentPage: 1,
      recommendMediaItems: [],
      newMediaItems: [],
      sportsMediaItems: [],
      entertainmentMediaItems: [],
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
      // // ページネーションのデータをrecommendMediaItemsに格納
      // this.playlistAndTagPaginationOfRecommend &&
      //   this.putPlaylistTagIntoMediaItems(
      //     this.recommendMediaItems,
      //     this.playlistAndTagPaginationOfRecommend.data
      //   );
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
    },
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
        "playlist/isIndexEntertainmentPlaylistAndTagPaginating",
      resetKey: "playlist/resetKey",
    }),
  },
  mounted() {
    //ナビバーのデータをリセットし表示
    this.$store.commit("navbar/resetNavbar");
    this.$store.commit("navbar/setShowNavbar", true);

    //タグおよびプレイリストのLikeデータをロード
    this.$store.dispatch("like/loadTagLike");
    this.$store.dispatch("likePlaylist/loadPlaylistLike");

    //以前に開いていたタブをセッションストレージからセット
    window.sessionStorage.getItem("topTabIndex")
      ? (this.tab = parseInt(window.sessionStorage.getItem("topTabIndex")))
      : "";

    this.$store.commit("playlist/setToLoadRecommend", true);
    this.$store.commit("playlist/setToLoadNew", true);
    this.$store.commit("playlist/setToLoadSports", true);
    this.$store.commit("playlist/setToLoadEntertainment", true);

    window.onscroll = () => {
      //ウィンドウの下から50pxに達したら次のプレイリストアイテムを読み込み
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight + 50 >=
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
  },
  created() {},
};
</script>
