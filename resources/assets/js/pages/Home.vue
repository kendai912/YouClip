<template>
  <div class="container--small">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      class="mx-auto homepage-tabs"
      grow
      hide-slider
      height="80"
    >
      <v-tab
        active-class="activated-tab"
        v-for="(item, key) in items"
        :key="item.tabName"
        v-on:click="
          setActiveTab(key);
          initialPaginate(key);
        "
      >
        <TabItem v-bind:selfTabIndex="key"
          ><template v-slot:tabIcon>{{ item.tabIcon }}</template
          ><template v-slot:tabName>{{ item.tabName }}</template>
        </TabItem>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="overflow: visible; ">
      <!-- <v-tab-item>
        <v-card flat>
          <PlaylistMediaItem
            v-bind:mediaItems="recommendMediaItems"
            v-bind:key="resetKey"
            ref="recommendMediaItems"
          />
        </v-card>
      </v-tab-item> -->
      <v-tab-item>
        <v-card flat>
          <PlaylistMediaItem
            v-bind:mediaItems="newMediaItems"
            ref="newMediaItems"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <PlaylistMediaItem
            v-bind:mediaItems="vtuberMediaItems"
            ref="vtuberMediaItems"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <PlaylistMediaItem
            v-bind:mediaItems="gameMediaItems"
            ref="gameMediaItems"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <PlaylistMediaItem
            v-bind:mediaItems="musicMediaItems"
            ref="musicMediaItems"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <PlaylistMediaItem
            v-bind:mediaItems="languageMediaItems"
            ref="languageMediaItems"
          />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import PlaylistMediaItem from "../components/PlaylistMediaItem.vue";
import TabItem from "../components/TabItem.vue";
import myMixin from "../util";

export default {
  metaInfo() {
    return {
      title: "YouClip - YouTube動画の切り抜きまとめサイト",
      meta: [
        {
          name: "description",
          content:
            "YouClipはYouTube動画の切り抜きまとめサイトです。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。また、みんなが作った人気の切り抜きまとめを見ることも可能です。",
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
          content: "YouClip - YouTube動画の切り抜きまとめサイト",
        },
        {
          property: "og:description",
          content:
            "YouClipはYouTube動画の切り抜きまとめサイトです。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜きまとめを誰でも簡単に作ることが出来ます。",
        },
        {
          property: "og:image",
          content:
            "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png",
        },
      ],
      link: [{ rel: "canonical", href: "https://youclip.jp" }],
    };
  },
  components: {
    PlaylistMediaItem,
    TabItem,
  },
  data() {
    return {
      tab: 0,
      items: [
        { tabIcon: "fas fa-fire", tabName: "急上昇" },
        { tabIcon: "fas fa-gamepad", tabName: "VTuber" },
        { tabIcon: "fas fa-gamepad", tabName: "ゲーム" },
        { tabIcon: "fas fa-music", tabName: "音楽" },
        { tabIcon: "fas fa-language", tabName: "語学" },
      ],
      page: 1,
      // recommendPage: 1,
      newPage: 1,
      vtuberPage: 1,
      gamePage: 1,
      musicPage: 1,
      languagePage: 1,
      // recommendPeriod: 1,
      newPeriod: 1,
      vtuberPeriod: 1,
      gamePeriod: 1,
      musicPeriod: 1,
      languagePeriod: 1,
      // recommendMediaItems: [],
      newMediaItems: [],
      vtuberMediaItems: [],
      gameMediaItems: [],
      musicMediaItems: [],
      languageMediaItems: [],
      topPositionOfItems: 0,
      itemHeight: "",
      contentsPerPage: 5,
    };
  },
  computed: {
    ...mapGetters({
      // playlistAndTagPaginationOfRecommend:
      //   "playlist/playlistAndTagPaginationOfRecommend",
      playlistAndTagPaginationOfNew: "playlist/playlistAndTagPaginationOfNew",
      playlistAndTagPaginationOfVTuber:
        "playlist/playlistAndTagPaginationOfVTuber",
      playlistAndTagPaginationOfGame: "playlist/playlistAndTagPaginationOfGame",
      playlistAndTagPaginationOfMusic:
        "playlist/playlistAndTagPaginationOfMusic",
      playlistAndTagPaginationOfLanguage:
        "playlist/playlistAndTagPaginationOfLanguage",
      // proceedPeriodOfRecommend: "playlist/proceedPeriodOfRecommend",
      proceedPeriodOfNew: "playlist/proceedPeriodOfNew",
      proceedPeriodOfVTuber: "playlist/proceedPeriodOfVTuber",
      proceedPeriodOfGame: "playlist/proceedPeriodOfGame",
      proceedPeriodOfMusic: "playlist/proceedPeriodOfMusic",
      proceedPeriodOfLanguage: "playlist/proceedPeriodOfLanguage",
      // toLoadRecommend: "playlist/toLoadRecommend",
      toLoadNew: "playlist/toLoadNew",
      toLoadVTuber: "playlist/toLoadVTuber",
      toLoadGame: "playlist/toLoadGame",
      toLoadMusic: "playlist/toLoadMusic",
      toLoadLanguage: "playlist/toLoadLanguage",
      // isIndexRecommendPlaylistAndTagPaginating:
      //   "playlist/isIndexRecommendPlaylistAndTagPaginating",
      isIndexNewPlaylistAndTagPaginating:
        "playlist/isIndexNewPlaylistAndTagPaginating",
      isIndexVTuberPlaylistAndTagPaginating:
        "playlist/isIndexVTuberPlaylistAndTagPaginating",
      isIndexGamePlaylistAndTagPaginating:
        "playlist/isIndexGamePlaylistAndTagPaginating",
      isIndexMusicPlaylistAndTagPaginating:
        "playlist/isIndexMusicPlaylistAndTagPaginating",
      isIndexLanguagePlaylistAndTagPaginating:
        "playlist/isIndexLanguagePlaylistAndTagPaginating",
      resetKey: "playlist/resetKey",
    }),
  },
  watch: {
    async resetKey() {
      this.resetTabPagination();
      this.resetMediaItems();

      let startPage = this.$route.query.page ? this.$route.query.page : 1;
      await this.initialLoad(startPage);

      this.setTopPositionOfItems();
      this.setItemHeight();
      let topPositionY =
        this.topPositionOfItems +
        this.contentsPerPage * this.itemHeight * (startPage - 1);
      if (startPage > 1) window.scrollTo(0, topPositionY);
    },
    proceedPeriodOfNew() {
      if (this.proceedPeriodOfNew) {
        this.newPeriod++;
        this.newPage = 1;
      }
      this.setProceedPeriodOfNew(false);
    },
    proceedPeriodOfVTuber() {
      if (this.proceedPeriodOfVTuber) {
        this.vtuberPeriod++;
        this.vtuberPage = 1;
      }
      this.setProceedPeriodOfVTuber(false);
    },
    proceedPeriodOfGame() {
      if (this.proceedPeriodOfGame) {
        this.gamePeriod++;
        this.gamePage = 1;
      }
      this.setProceedPeriodOfGame(false);
    },
    proceedPeriodOfMusic() {
      if (this.proceedPeriodOfMusic) {
        this.musicPeriod++;
        this.musicPage = 1;
      }
      this.setProceedPeriodOfMusic(false);
    },
    proceedPeriodOfLanguage() {
      if (this.proceedPeriodOfLanguage) {
        this.languagePeriod++;
        this.languagePage = 1;
      }
      this.setProceedPeriodOfLanguage(false);
    },
  },
  mixins: [myMixin],
  methods: {
    ...mapMutations({
      setActiveTabIndex: "navbar/setActiveTabIndex",
      // setProceedPeriodOfRecommend: "playlist/setProceedPeriodOfRecommend",
      setProceedPeriodOfNew: "playlist/setProceedPeriodOfNew",
      setProceedPeriodOfVTuber: "playlist/setProceedPeriodOfVTuber",
      setProceedPeriodOfGame: "playlist/setProceedPeriodOfGame",
      setProceedPeriodOfMusic: "playlist/setProceedPeriodOfMusic",
      setProceedPeriodOfLanguage: "playlist/setProceedPeriodOfLanguage",
    }),
    setActiveTab(key) {
      //開いたタブをセッションストレージに保存
      window.sessionStorage.setItem("topTabIndex", JSON.stringify(key));
      this.setActiveTabIndex(key);
    },
    //初回読み込み処理
    initialPaginate(key) {
      if (key == 0 && this.newPage == 1) this.infinateLoadPlaylistOfNew();
      if (key == 1 && this.vtuberPage == 1) this.infinateLoadPlaylistOfVTuber();
      if (key == 2 && this.gamePage == 1) this.infinateLoadPlaylistOfGame();
      if (key == 3 && this.musicPage == 1) {
        this.infinateLoadPlaylistOfMusic();
      }
      if (key == 4 && this.languagePage == 1) {
        this.infinateLoadPlaylistOfLanguage();
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
    // async infinateLoadPlaylistOfRecommend() {
    //   if (!this.toLoadRecommend) {
    //     this.$store.commit("loadingItem/setIsLoading", false);
    //     return;
    //   }

    //   //ローディングを表示
    //   this.$store.commit("loadingItem/setIsLoading", true);

    //   //無限スクロールに合わせてプレイリストのページネイションを取得
    //   await this.$store.dispatch(
    //     "playlist/indexPlaylistAndTagPaginationOfRecommend",
    //     { page: this.recommendPage++, period: this.recommendPeriod }
    //   );

    //   // ページネーションのデータをrecommendMediaItemsに格納
    //   this.putPlaylistTagIntoMediaItems(
    //     this.recommendMediaItems,
    //     this.playlistAndTagPaginationOfRecommend.data
    //   );

    //   if (this.playlistAndTagPaginationOfRecommend.data.length) {
    //     //ローディングを非表示
    //     this.$store.commit("loadingItem/setIsLoading", false);
    //   } else {
    //     //データが何も返って来なかった場合は次のデータを再度ロード
    //     this.infinateLoadPlaylistOfRecommend();
    //   }
    // },
    //【新着】表示するプレイリストの無限スクロール
    async infinateLoadPlaylistOfNew(numOfItems = 0) {
      if (!this.toLoadNew) {
        this.$store.commit("loadingItem/setIsLoading", false);
        return;
      }

      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //無限スクロールに合わせてプレイリストのページネイションを取得
      await this.$store.dispatch(
        "playlist/indexPlaylistAndTagPaginationOfNew",
        { page: this.newPage++, period: this.newPeriod }
      );

      //ページネーションのデータをNewMediaItemsに格納
      this.putPlaylistTagIntoMediaItems(
        this.newMediaItems,
        this.playlistAndTagPaginationOfNew.data
      );
      console.log(this.newMediaItems);

      let totalNumOfItems =
        numOfItems + this.playlistAndTagPaginationOfNew.data.length;

      if (totalNumOfItems >= 5) {
        //ローディングを非表示
        this.$store.commit("loadingItem/setIsLoading", false);
      } else {
        //データが何も返って来なかった場合は次のデータを再度ロード
        await this.infinateLoadPlaylistOfNew(totalNumOfItems);
      }
    },
    //【VTuber】表示するプレイリストの無限スクロール
    async infinateLoadPlaylistOfVTuber(numOfItems = 0) {
      if (!this.toLoadVTuber) {
        this.$store.commit("loadingItem/setIsLoading", false);
        return;
      }

      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //無限スクロールに合わせてプレイリストのページネイションを取得
      await this.$store.dispatch(
        "playlist/indexPlaylistAndTagPaginationOfVTuber",
        { page: this.vtuberPage++, period: this.vtuberPeriod }
      );

      //ページネーションのデータをvtuberMediaItemsに格納
      this.putPlaylistTagIntoMediaItems(
        this.vtuberMediaItems,
        this.playlistAndTagPaginationOfVTuber.data
      );

      let totalNumOfItems =
        numOfItems + this.playlistAndTagPaginationOfVTuber.data.length;

      if (totalNumOfItems >= 5) {
        //ローディングを非表示
        this.$store.commit("loadingItem/setIsLoading", false);
      } else {
        //データが何も返って来なかった場合は次のデータを再度ロード
        await this.infinateLoadPlaylistOfVTuber(totalNumOfItems);
      }
    },
    //【Game】表示するプレイリストの無限スクロール
    async infinateLoadPlaylistOfGame(numOfItems = 0) {
      if (!this.toLoadGame) {
        this.$store.commit("loadingItem/setIsLoading", false);
        return;
      }

      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //無限スクロールに合わせてプレイリストのページネイションを取得
      await this.$store.dispatch(
        "playlist/indexPlaylistAndTagPaginationOfGame",
        { page: this.gamePage++, period: this.gamePeriod }
      );

      //ページネーションのデータをgameMediaItemsに格納
      this.putPlaylistTagIntoMediaItems(
        this.gameMediaItems,
        this.playlistAndTagPaginationOfGame.data
      );

      let totalNumOfItems =
        numOfItems + this.playlistAndTagPaginationOfGame.data.length;

      if (totalNumOfItems >= 5) {
        //ローディングを非表示
        this.$store.commit("loadingItem/setIsLoading", false);
      } else {
        //データが何も返って来なかった場合は次のデータを再度ロード
        await this.infinateLoadPlaylistOfGame(totalNumOfItems);
      }
    },
    //【Music】表示するプレイリストの無限スクロール
    async infinateLoadPlaylistOfMusic(numOfItems = 0) {
      if (!this.toLoadMusic) {
        this.$store.commit("loadingItem/setIsLoading", false);
        return;
      }

      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //無限スクロールに合わせてプレイリストのページネイションを取得
      await this.$store.dispatch(
        "playlist/indexPlaylistAndTagPaginationOfMusic",
        { page: this.musicPage++, period: this.musicPeriod }
      );

      //ページネーションのデータをmusicMediaItemsに格納
      this.putPlaylistTagIntoMediaItems(
        this.musicMediaItems,
        this.playlistAndTagPaginationOfMusic.data
      );

      let totalNumOfItems =
        numOfItems + this.playlistAndTagPaginationOfMusic.data.length;

      if (totalNumOfItems >= 5) {
        //ローディングを非表示
        this.$store.commit("loadingItem/setIsLoading", false);
      } else {
        //データが何も返って来なかった場合は次のデータを再度ロード
        await this.infinateLoadPlaylistOfMusic(totalNumOfItems);
      }
    },
    //【Language】表示するプレイリストの無限スクロール
    async infinateLoadPlaylistOfLanguage(numOfItems = 0) {
      if (!this.toLoadLanguage) {
        this.$store.commit("loadingItem/setIsLoading", false);
        return;
      }

      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //無限スクロールに合わせてプレイリストのページネイションを取得
      await this.$store.dispatch(
        "playlist/indexPlaylistAndTagPaginationOfLanguage",
        { page: this.languagePage++, period: this.languagePeriod }
      );

      //ページネーションのデータをlanguageMediaItemsに格納
      this.putPlaylistTagIntoMediaItems(
        this.languageMediaItems,
        this.playlistAndTagPaginationOfLanguage.data
      );

      let totalNumOfItems =
        numOfItems + this.playlistAndTagPaginationOfLanguage.data.length;

      if (totalNumOfItems >= 5) {
        //ローディングを非表示
        this.$store.commit("loadingItem/setIsLoading", false);
      } else {
        //データが何も返って来なかった場合は次のデータを再度ロード
        await this.infinateLoadPlaylistOfLanguage(totalNumOfItems);
      }
    },
    getCurrentPagePosition() {
      let windowMiddlePosition =
        document.documentElement.scrollTop + window.innerHeight / 2;
      let page = 1;

      this.setTopPositionOfItems();
      this.setItemHeight();

      while (
        windowMiddlePosition >
        this.topPositionOfItems + this.itemHeight * this.contentsPerPage * page
      ) {
        page++;
      }

      return page;
    },
    getOffsetTop(element) {
      var top = 0;
      while (element) {
        top += element.offsetTop || 0;
        element = element.offsetParent;
      }

      return top;
    },
    updatePageQueryParameter(page) {
      if (page == 1) {
        this.$router
          .replace({
            path: "/",
          })
          .catch((err) => {});
      } else {
        window.history.replaceState(null, null, "/?page=" + page);
      }
    },
    setTopPositionOfItems() {
      if (this.tab == 0) {
        this.topPositionOfItems = this.getOffsetTop(
          this.$refs.newMediaItems.$refs.playlistMediaItemBox
        );
      } else if (this.tab == 1) {
        this.topPositionOfItems = this.getOffsetTop(
          this.$refs.vtuberMediaItems.$refs.playlistMediaItemBox
        );
      } else if (this.tab == 2) {
        this.topPositionOfItems = this.getOffsetTop(
          this.$refs.gameMediaItems.$refs.playlistMediaItemBox
        );
      } else if (this.tab == 3) {
        this.topPositionOfItems = this.getOffsetTop(
          this.$refs.musicMediaItems.$refs.playlistMediaItemBox
        );
      } else if (this.tab == 4) {
        this.topPositionOfItems = this.getOffsetTop(
          this.$refs.languageMediaItems.$refs.playlistMediaItemBox
        );
      }
    },
    setItemHeight() {
      if (this.tab == 0) {
        this.itemHeight = this.$refs.newMediaItems.$refs.playlistMediaItem
          ? this.$refs.newMediaItems.$refs.playlistMediaItem[0].clientHeight
          : 329;
      } else if (this.tab == 1) {
        this.itemHeight = this.$refs.vtuberMediaItems.$refs.playlistMediaItem
          ? this.$refs.vtuberMediaItems.$refs.playlistMediaItem[0].clientHeight
          : 329;
      } else if (this.tab == 2) {
        this.itemHeight = this.$refs.gameMediaItems.$refs.playlistMediaItem
          ? this.$refs.gameMediaItems.$refs.playlistMediaItem[0].clientHeight
          : 329;
      } else if (this.tab == 3) {
        this.itemHeight = this.$refs.musicMediaItems.$refs.playlistMediaItem
          ? this.$refs.musicMediaItems.$refs.playlistMediaItem[0].clientHeight
          : 329;
      } else if (this.tab == 4) {
        this.itemHeight = this.$refs.languageMediaItems.$refs.playlistMediaItem
          ? this.$refs.languageMediaItems.$refs.playlistMediaItem[0]
              .clientHeight
          : 329;
      }
    },
    async initialLoad(startPage) {
      for (let i = 0; i < startPage; i++) {
        if (this.tab == 0) await this.infinateLoadPlaylistOfNew();
        if (this.tab == 1) await this.infinateLoadPlaylistOfVTuber();
        if (this.tab == 2) await this.infinateLoadPlaylistOfGame();
        if (this.tab == 3) await this.infinateLoadPlaylistOfMusic();
        if (this.tab == 4) await this.infinateLoadPlaylistOfLanguage();
      }
    },
    resetTabPagination() {
      this.newPage = 1;
      this.vtuberPage = 1;
      this.gamePage = 1;
      this.musicPage = 1;
      this.languagePage = 1;
    },
    resetMediaItems() {
      this.newMediaItems = [];
      this.vtuberMediaItems = [];
      this.gameMediaItems = [];
      this.musicMediaItems = [];
      this.languageMediaItems = [];
    },
  },
  async mounted() {
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
    this.setActiveTabIndex(this.tab);

    // this.$store.commit("playlist/setToLoadRecommend", true);
    this.$store.commit("playlist/setToLoadNew", true);
    this.$store.commit("playlist/setToLoadVTuber", true);
    this.$store.commit("playlist/setToLoadGame", true);
    this.$store.commit("playlist/setToLoadMusic", true);
    this.$store.commit("playlist/setToLoadLanguage", true);

    window.onscroll = () => {
      this.page = this.getCurrentPagePosition();
      this.updatePageQueryParameter(this.page);

      //ウィンドウの下から50pxに達したら次のプレイリストアイテムを読み込み
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight + 50 >=
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        if (this.tab == 0 && !this.isIndexNewPlaylistAndTagPaginating)
          this.infinateLoadPlaylistOfNew();
        if (this.tab == 1 && !this.isIndexVTuberPlaylistAndTagPaginating)
          this.infinateLoadPlaylistOfVTuber();
        if (this.tab == 2 && !this.isIndexGamePlaylistAndTagPaginating)
          this.infinateLoadPlaylistOfGame();
        if (this.tab == 3 && !this.isIndexMusicPlaylistAndTagPaginating)
          this.infinateLoadPlaylistOfMusic();
        if (this.tab == 4 && !this.isIndexLanguagePlaylistAndTagPaginating)
          this.infinateLoadPlaylistOfLanguage();
      }
    };

    //initial load of each tab by page num
    let startPage = this.$route.query.page ? this.$route.query.page : 1;
    await this.initialLoad(startPage);

    this.setTopPositionOfItems();
    this.setItemHeight();
    let topPositionY =
      this.topPositionOfItems +
      this.contentsPerPage * this.itemHeight * (startPage - 1);
    if (startPage > 1) window.scrollTo(0, topPositionY);
  },
  created() {},
  beforeDestroy() {
    window.onscroll = null;
  },
};
</script>
