<template>
  <v-card flat class="ma-0 pa-0 px-2">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      centered
      grow
      icons-and-text
      height="60"
    >
      <v-tab
        active-class="activated-tab"
        v-for="(item, key) in items"
        :key="key"
      >
        {{ item.tabName }}
        <v-icon>{{ item.tabIcon }}</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <MyPlaylistItem
          v-if="myCreatedPlaylist"
          v-bind:mediaItems="myCreatedPlaylistMediaItems"
        />
      </v-tab-item>
      <v-tab-item>
        <MyPlaylistItem
          v-if="myLikedPlaylist"
          v-bind:mediaItems="myLikedPlaylistMediaItems"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import MyPlaylistItem from "../components/MyPlaylistItem.vue";
import MyTagItem from "../components/MyTagItem.vue";
import myMixin from "../util";

export default {
  components: {
    MyPlaylistItem,
    MyTagItem,
  },
  props: {},
  data() {
    return {
      tab: 0,
      items: [
        {
          tabIcon: "mdi-play-box-multiple-outline",
          tabName: this.$t("MyList.createdClip"),
        },
        { tabIcon: "mdi-heart-outline", tabName: this.$t("MyList.likedClip") },
      ],
    };
  },
  mixins: [myMixin],
  ...mapState({
    apiStatus: (state) => state.auth.apiStatus,
  }),
  computed: {
    ...mapGetters({
      myCreatedPlaylist: "playlist/myCreatedPlaylist",
      myLikedPlaylist: "playlist/myLikedPlaylist",
      resetKey: "playlist/resetKey",
    }),
    myCreatedPlaylistMediaItems() {
      if (!this.myCreatedPlaylist) return;

      // プレイリストのデータをmyCreatedPlaylistMediaItemsに格納
      let mediaItems = [];
      this.putPlaylistTagIntoMediaItems(mediaItems, this.myCreatedPlaylist);
      return mediaItems;
    },
    myLikedPlaylistMediaItems() {
      if (!this.myLikedPlaylist) return;

      // プレイリストのデータをmyLikedPlaylistMediaItemsに格納
      let mediaItems = [];
      this.putPlaylistTagIntoMediaItems(mediaItems, this.myLikedPlaylist);
      return mediaItems;
    },
  },
  watch: {
    resetKey() {
      this.$store.dispatch("playlist/loadMyCreatedAndLikedPlaylist");
    },
  },
  methods: {},
  async created() {
    //以前に開いていたタブをセッションストレージからセット
    window.sessionStorage.getItem("myPageTabIndex")
      ? (this.tab = parseInt(window.sessionStorage.getItem("myPageTabIndex")))
      : "";
    //Likeまたは作成したプレイリストをロード
    await this.$store.dispatch("playlist/loadMyCreatedPlaylist");
    await this.$store.dispatch("playlist/loadMyLikedPlaylist");
  },
};
</script>
