<template>
  <div class="container--small">
    <ul class="tab">
      <li
        class="tab__item"
        v-bind:class="{ 'tab__item--active': tab == 1 }"
        v-on:click="tab = 1"
      >カテゴリ1</li>
      <li
        class="tab__item"
        v-bind:class="{ 'tab__item--active': tab == 2 }"
        v-on:click="tab = 2"
      >カテゴリ2</li>
      <li
        class="tab__item"
        v-bind:class="{ 'tab__item--active': tab == 3 }"
        v-on:click="tab = 3"
      >カテゴリ3</li>
    </ul>
    <div class="panel" v-show="tab === 1">
      <IndexItem v-bind:mediaItems="mediaItems" />
    </div>
    <div class="panel" v-show="tab === 2">
      <h1>カテゴリ2の中身</h1>
    </div>
    <div class="panel" v-show="tab === 3">
      <h1>カテゴリ3の中身</h1>
    </div>
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
      tab: 1,
      page: 1,
      mediaItems: [] //レコメンド画面に表示するアイテム
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
    //表示するプレイリストの無限スクロール
    async infinateLoadPlaylist() {
      if (!this.toLoad) return;

      //ローディングを表示
      this.$store.commit("loadingItem/setIsLoading", true);

      //無限スクロールに合わせてプレイリストのページネイションを取得
      await this.$store.dispatch(
        "playlist/indexPlaylistAndTagPagination",
        this.page++
      );
      //ページネーションのデータをmediaItemsに格納
      this.putPlaylistTagIntoMediaItems(
        this.mediaItems,
        this.playlistAndTagPagination.data
      );

      //ローディングを非表示
      this.$store.commit("loadingItem/setIsLoading", false);
    }
  },
  computed: {
    ...mapGetters({
      playlistAndTagPagination: "playlist/playlistAndTagPagination",
      toLoad: "playlist/toLoad"
    })
  },
  mounted() {
    window.onscroll = () => {
      //ウィンドウの下から100pxに達したら次のプレイリストアイテムを読み込み
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.infinateLoadPlaylist();
      }
    };
    this.infinateLoadPlaylist();
  }
};
</script>
