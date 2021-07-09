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
            v-bind:mediaItems="otherMediaItems"
            ref="otherMediaItems"
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
      title: this.$t("Home.MetaInfo.title"),
      meta: [
        {
          name: "description",
          content: this.$t("Home.MetaInfo.description"),
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
          content: "https://youclip.app",
        },
        {
          property: "og:title",
          content: this.$t("Home.MetaInfo.title"),
        },
        {
          property: "og:description",
          content: this.$t("Home.MetaInfo.description"),
        },
        {
          property: "og:image",
          content:
            "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png",
        },
      ],
      link: [
        { rel: "canonical", href: "https://youclip.app" },
        {
          rel: "alternate",
          hreflang: "en",
          href: "https://youclip.app" + "?hl=en",
        },
        {
          rel: "alternate",
          hreflang: "ja",
          href: "https://youclip.app" + "?hl=ja",
        },
      ],
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
        { tabIcon: "fas fa-fire", tabName: this.$t("Home.data.popular") },
        { tabIcon: "fas fa-gamepad", tabName: "VTuber" },
        { tabIcon: "fas fa-gamepad", tabName: this.$t("Home.data.game") },
        { tabIcon: "more_horiz", tabName: this.$t("Home.data.others") },
      ],
      page: 1,
      newPage: 1,
      vtuberPage: 1,
      gamePage: 1,
      otherPage: 1,
      newPeriod: 1,
      vtuberPeriod: 1,
      gamePeriod: 1,
      otherPeriod: 1,
      newMediaItems: [],
      vtuberMediaItems: [],
      gameMediaItems: [],
      otherMediaItems: [],
      topPositionOfItems: 0,
      itemHeight: "",
      contentsPerPage: 5,
      isOnHome: true,
    };
  },
  computed: {
    ...mapGetters({
      playlistAndTagPaginationOfNew: "playlist/playlistAndTagPaginationOfNew",
      playlistAndTagPaginationOfVTuber:
        "playlist/playlistAndTagPaginationOfVTuber",
      playlistAndTagPaginationOfGame: "playlist/playlistAndTagPaginationOfGame",
      playlistAndTagPaginationOfOther:
        "playlist/playlistAndTagPaginationOfOther",
      proceedPeriodOfNew: "playlist/proceedPeriodOfNew",
      proceedPeriodOfVTuber: "playlist/proceedPeriodOfVTuber",
      proceedPeriodOfGame: "playlist/proceedPeriodOfGame",
      proceedPeriodOfOther: "playlist/proceedPeriodOfOther",
      toLoadNew: "playlist/toLoadNew",
      toLoadVTuber: "playlist/toLoadVTuber",
      toLoadGame: "playlist/toLoadGame",
      toLoadOther: "playlist/toLoadOther",
      isIndexNewPlaylistAndTagPaginating:
        "playlist/isIndexNewPlaylistAndTagPaginating",
      isIndexVTuberPlaylistAndTagPaginating:
        "playlist/isIndexVTuberPlaylistAndTagPaginating",
      isIndexGamePlaylistAndTagPaginating:
        "playlist/isIndexGamePlaylistAndTagPaginating",
      isIndexOtherPlaylistAndTagPaginating:
        "playlist/isIndexOtherPlaylistAndTagPaginating",
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
  },
  mixins: [myMixin],
  methods: {
    ...mapMutations({
      setActiveTabIndex: "navbar/setActiveTabIndex",
      setProceedPeriodOfNew: "playlist/setProceedPeriodOfNew",
      setProceedPeriodOfVTuber: "playlist/setProceedPeriodOfVTuber",
      setProceedPeriodOfGame: "playlist/setProceedPeriodOfGame",
      setProceedPeriodOfOther: "playlist/setProceedPeriodOfOther",
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
      if (key == 3 && this.otherPage == 1) this.infinateLoadPlaylistOfOther();
    },
    //i:s形式に変換
    formatToMinSec(His) {
      let min =
        parseInt(His.split(":")[0], 10) * 60 + parseInt(His.split(":")[1], 10);
      let sec = parseInt(His.split(":")[2], 10);
      return min + ":" + sec;
    },
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

      // 現在のperiodのlast_pageに達したので次のperiodの最初にパラメータを変更
      if (this.proceedPeriodOfNew) {
        this.newPeriod++;
        this.newPage = 1;
      }
      this.setProceedPeriodOfNew(false);

      let totalNumOfItems =
        numOfItems + this.playlistAndTagPaginationOfNew.data.length;

      if (totalNumOfItems >= 5) {
        //ローディングを非表示
        this.$store.commit("loadingItem/setIsLoading", false);
      } else if (this.isOnHome) {
        //データ数が5未満の場合は次のデータを再度ロード
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

      // 現在のperiodのlast_pageに達したので次のperiodの最初にパラメータを変更
      if (this.proceedPeriodOfVTuber) {
        this.vtuberPeriod++;
        this.vtuberPage = 1;
      }
      this.setProceedPeriodOfVTuber(false);

      let totalNumOfItems =
        numOfItems + this.playlistAndTagPaginationOfVTuber.data.length;

      if (totalNumOfItems >= 5) {
        //ローディングを非表示
        this.$store.commit("loadingItem/setIsLoading", false);
      } else if (this.isOnHome) {
        //データ数が5未満の場合は次のデータを再度ロード
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

      // 現在のperiodのlast_pageに達したので次のperiodの最初にパラメータを変更
      if (this.proceedPeriodOfGame) {
        this.gamePeriod++;
        this.gamePage = 1;
      }
      this.setProceedPeriodOfGame(false);

      let totalNumOfItems =
        numOfItems + this.playlistAndTagPaginationOfGame.data.length;

      if (totalNumOfItems >= 5) {
        //ローディングを非表示
        this.$store.commit("loadingItem/setIsLoading", false);
      } else if (this.isOnHome) {
        //データ数が5未満の場合は次のデータを再度ロード
        await this.infinateLoadPlaylistOfGame(totalNumOfItems);
      }
    },
    //【Other】表示するプレイリストの無限スクロール
    async infinateLoadPlaylistOfOther(numOfItems = 0) {
      if (!this.toLoadOther) {
        this.$store.commit("loadingItem/setIsLoading", false);
        return;
      }

      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //無限スクロールに合わせてプレイリストのページネイションを取得
      await this.$store.dispatch(
        "playlist/indexPlaylistAndTagPaginationOfOther",
        { page: this.otherPage++, period: this.otherPeriod }
      );

      //ページネーションのデータをOtherMediaItemsに格納
      this.putPlaylistTagIntoMediaItems(
        this.otherMediaItems,
        this.playlistAndTagPaginationOfOther.data
      );

      // 現在のperiodのlast_pageに達したので次のperiodの最初にパラメータを変更
      if (this.proceedPeriodOfOther) {
        this.otherPeriod++;
        this.otherPage = 1;
      }
      this.setProceedPeriodOfOther(false);

      let totalNumOfItems =
        numOfItems + this.playlistAndTagPaginationOfOther.data.length;

      if (totalNumOfItems >= 5) {
        //ローディングを非表示
        this.$store.commit("loadingItem/setIsLoading", false);
      } else if (this.isOnHome) {
        //データ数が5未満の場合は次のデータを再度ロード
        await this.infinateLoadPlaylistOfOther(totalNumOfItems);
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
        this.$router
          .replace({
            path: "/",
            query: { page: page },
          })
          .catch((err) => {});
      }
    },
    setTopPositionOfItems() {
      if (this.tab == 0) {
        this.topPositionOfItems =
          typeof this.$refs.newMediaItems !== "undefined"
            ? this.getOffsetTop(
                this.$refs.newMediaItems.$refs.playlistMediaItemBox
              )
            : 128;
      } else if (this.tab == 1) {
        this.topPositionOfItems =
          typeof this.$refs.vtuberMediaItems !== "undefined"
            ? this.getOffsetTop(
                this.$refs.vtuberMediaItems.$refs.playlistMediaItemBox
              )
            : 128;
      } else if (this.tab == 2) {
        this.topPositionOfItems =
          typeof this.$refs.gameMediaItems !== "undefined"
            ? this.getOffsetTop(
                this.$refs.gameMediaItems.$refs.playlistMediaItemBox
              )
            : 128;
      } else if (this.tab == 3) {
        this.topPositionOfItems =
          typeof this.$refs.otherMediaItems !== "undefined"
            ? this.getOffsetTop(
                this.$refs.otherMediaItems.$refs.playlistMediaItemBox
              )
            : 128;
      }
    },
    setItemHeight() {
      if (this.tab == 0) {
        this.itemHeight =
          typeof this.$refs.newMediaItems?.$refs.playlistMediaItem !==
          "undefined"
            ? this.$refs.newMediaItems.$refs.playlistMediaItem[0].clientHeight
            : 329;
      } else if (this.tab == 1) {
        this.itemHeight =
          typeof this.$refs.vtuberMediaItems?.$refs.playlistMediaItem !==
          "undefined"
            ? this.$refs.vtuberMediaItems.$refs.playlistMediaItem[0]
                .clientHeight
            : 329;
      } else if (this.tab == 2) {
        this.itemHeight =
          typeof this.$refs.gameMediaItems?.$refs.playlistMediaItem !==
          "undefined"
            ? this.$refs.gameMediaItems.$refs.playlistMediaItem[0].clientHeight
            : 329;
      } else if (this.tab == 3) {
        this.itemHeight =
          typeof this.$refs.otherMediaItems?.$refs.playlistMediaItem !==
          "undefined"
            ? this.$refs.otherMediaItems.$refs.playlistMediaItem[0]
                .clientHeight
            : 329;
      }
    },
    async initialLoad(startPage) {
      for (let i = 0; i < startPage; i++) {
        if (this.tab == 0) await this.infinateLoadPlaylistOfNew();
        if (this.tab == 1) await this.infinateLoadPlaylistOfVTuber();
        if (this.tab == 2) await this.infinateLoadPlaylistOfGame();
        if (this.tab == 3) await this.infinateLoadPlaylistOfOther();
      }
    },
    resetTabPagination() {
      this.newPage = 1;
      this.vtuberPage = 1;
      this.gamePage = 1;
      this.otherPage = 1;
    },
    resetMediaItems() {
      this.newMediaItems = [];
      this.vtuberMediaItems = [];
      this.gameMediaItems = [];
      this.otherMediaItems = [];
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
    this.$store.commit("playlist/setToLoadOther", true);

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
        if (this.tab == 3 && !this.isIndexOtherPlaylistAndTagPaginating)
          this.infinateLoadPlaylistOfOther();
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

    // parameter necessary to prevent inifinit loop
    this.isOnHome = false;
  },
};
</script>
