<template>
  <div>
    <v-tabs v-model="tab" background-color="transparent" grow hide-slider>
      <v-tab v-for="(item, key) in items" :key="item" v-on:click="setActiveTab(key)">{{ item }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <IndexItem v-bind:mediaItems="myCreatedAndLikedPlaylistMediaItems" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <IndexItem v-bind:mediaItems="myCreatedAndLikedTagVideoMediaItems" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import MyPlaylist from "../components/MyPlaylist.vue";
import MyScene from "../components/MyScene.vue";
import IndexItem from "../components/IndexItem.vue";
import myMixin from "../util";

export default {
  components: {
    MyPlaylist,
    MyScene,
    IndexItem
  },
  props: {},
  data() {
    return {
      tab: null,
      items: ["プレイリスト", "シーン"]
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      myCreatedAndLikedPlaylist: "playlist/myCreatedAndLikedPlaylist",
      myCreatedAndLikedTagVideo: "tag/myCreatedAndLikedTagVideo"
    }),
    myCreatedAndLikedPlaylistMediaItems() {
      if (!this.myCreatedAndLikedPlaylist) return;

      // プレイリストのデータをmyCreatedAndLikedPlaylistMediaItemsに格納
      let mediaItems = [];
      this.putPlaylistTagIntoMediaItems(
        mediaItems,
        this.myCreatedAndLikedPlaylist
      );

      return mediaItems;
    },
    myCreatedAndLikedTagVideoMediaItems() {
      if (!this.myCreatedAndLikedTagVideo) return;

      // タグのデータをmyCreatedAndLikedTagVideoMediaItemsに格納
      let mediaItems = [];
      this.putTagVideoIntoMediaItems(
        mediaItems,
        this.myCreatedAndLikedTagVideo
      );

      return mediaItems;
    }
  },
  methods: {
    setActiveTab(key) {
      //開いたタブをセッションストレージに保存
      window.sessionStorage.setItem("myPageTabIndex", JSON.stringify(key));
    }
  },
  async created() {
    //以前に開いていたタブをセッションストレージからセット
    this.tab = parseInt(window.sessionStorage.getItem("myPageTabIndex"));
    //Likeまたは作成したプレイリストをロード
    await this.$store.dispatch("playlist/loadMyCreatedAndLikedPlaylist");
    //Likeまたは作成したタグをロード
    await this.$store.dispatch("tag/loadMyCreatedAndLikedTagVideo");
  }
};
</script>
