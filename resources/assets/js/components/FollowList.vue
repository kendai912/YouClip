<template>
  <div>
    <v-tabs v-model="tab" background-color="transparent" grow hide-slider>
      <v-tab
        v-for="(item, key) in items"
        :key="item"
        v-on:click="setActiveTab(key)"
        >{{ item }}</v-tab
      >
    </v-tabs>

    <v-tabs-items
      v-model="tab"
      class="pb-14"
      style="background-color: transparent"
    >
      <v-tab-item>
        <v-card flat>
          <MyPlaylistItem v-bind:mediaItems="publicPlaylistMediaItems" />
          <!-- <MyPlaylistItem v-bind:mediaItems="myPlaylist" /> -->
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <MyTagItem v-bind:mediaItems="createdTagListMediaItems" />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import MyPlaylistItem from "../components/MyPlaylistItem.vue";
import MyTagItem from "../components/MyTagItem.vue";
// import PlaylistMediaItem from "../components/PlaylistMediaItem.vue";
import myMixin from "../util";

export default {
  components: {
    MyPlaylistItem,
    MyTagItem,
    // PlaylistMediaItem
  },
  props: {},
  data() {
    return {
      tab: 1, //デフォルトはシーンタブを表示
      items: ["プレイリスト", "シーン"],
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      myCreatedAndLikedPlaylist: "playlist/myCreatedAndLikedPlaylist",
      myCreatedAndLikedTagVideo: "tag/myCreatedAndLikedTagVideo",
      publicPlaylist: "playlist/publicPlaylist",
      createdSceneList: "playlist/createdSceneList",
    }),
    publicPlaylistMediaItems() {
      if (!this.publicPlaylist) return;

      // プレイリストのデータをmyCreatedAndLikedPlaylistMediaItemsに格納
      let mediaItems = [];
      this.putPlaylistTagIntoMediaItems(mediaItems, this.publicPlaylist);
      return mediaItems;
    },
    createdTagListMediaItems() {
      if (!this.createdSceneList) return;

      // プレイリストのデータをmyCreatedAndLikedPlaylistMediaItemsに格納
      let mediaItems = [];
      this.putTagVideoIntoMediaItems(mediaItems, this.createdSceneList);
      var groupedData = Object.values(
        mediaItems.reduce(
          (
            result,
            {
              video_id,
              category,
              id,
              title,
              thumbnail,
              created_at,
              timeSince,
              tagsList,
              tags,
              tagArray,
              totalDuration,
              start,
              end,
              preview,
              previewgif,
              sceneCount,
              likeCount,
              user_id,
            }
          ) => {
            // Create new group
            if (!result[video_id]) {
              result[video_id] = {
                video_id,
                title,
                tagVideoData: [],
              };
            }
            // if (!result[title]) {
            //   result[title]
            // }
            // Append to group
            result[video_id].tagVideoData.push({
              category,
              id,
              title,
              thumbnail,
              created_at,
              timeSince,
              tagsList,
              tags,
              tagArray,
              totalDuration,
              start,
              end,
              preview,
              previewgif,
              sceneCount,
              likeCount,
              user_id,
            });
            return result;
          },
          {}
        )
      );
      groupedData.sort((a, b) => (a.video_id < b.video_id ? 1 : -1));
      return groupedData;
    },
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

      var groupedData = Object.values(
        mediaItems.reduce(
          (
            result,
            {
              video_id,
              category,
              id,
              title,
              thumbnail,
              created_at,
              timeSince,
              tagsList,
              tags,
              tagArray,
              totalDuration,
              start,
              end,
              preview,
              previewgif,
              sceneCount,
              likeCount,
              user_id,
            }
          ) => {
            // Create new group
            if (!result[video_id]) {
              result[video_id] = {
                video_id,
                title,
                tagVideoData: [],
              };
            }
            // if (!result[title]) {
            //   result[title]
            // }
            // Append to group
            result[video_id].tagVideoData.push({
              category,
              id,
              title,
              thumbnail,
              created_at,
              timeSince,
              tagsList,
              tags,
              tagArray,
              totalDuration,
              start,
              end,
              preview,
              previewgif,
              sceneCount,
              likeCount,
              user_id,
            });
            return result;
          },
          {}
        )
      );
      groupedData.sort((a, b) => (a.video_id < b.video_id ? 1 : -1));
      return groupedData;
    },
  },
  methods: {
    setActiveTab(key) {
      //開いたタブをセッションストレージに保存
      window.sessionStorage.setItem("myPageTabIndex", JSON.stringify(key));
    },
  },
  async created() {
    //以前に開いていたタブをセッションストレージからセット
    window.sessionStorage.getItem("myPageTabIndex")
      ? (this.tab = parseInt(window.sessionStorage.getItem("myPageTabIndex")))
      : "";
    //Likeまたは作成したプレイリストをロード
    await this.$store.dispatch("playlist/loadMyCreatedAndLikedPlaylist");
    // this.myCreatedAndLikedPlaylistMediaItems();
    //Likeまたは作成したタグをロード
    await this.$store.dispatch("tag/loadMyCreatedAndLikedTagVideo");
    let created_user = this.$route.query.user_id;
    await this.$store.dispatch(
      "playlist/loadPublicPlaylistAndScenelist",
      created_user
    );
  },
};
</script>
