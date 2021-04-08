<template>
  <div>
    <div class="pa-0 ma-0" style="position: relative; height: 40px;">
      <div
        style="
              position: absolute;
              height: 100%;
              top: 12px;
              left: 8px;
            "
      >
        <v-icon size="30" color="my-grey">mdi-play-box-multiple-outline</v-icon>
        <span>自分の切り抜き・いいねした切り抜き</span>
      </div>
    </div>
    <MyPlaylistItem
      v-if="myCreatedAndLikedPlaylist"
      v-bind:mediaItems="myCreatedAndLikedPlaylistMediaItems"
    />
  </div>
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
      tab: 1, //デフォルトは場面タブを表示
      items: ["切り抜き", "場面"],
    };
  },
  mixins: [myMixin],
  ...mapState({
    apiStatus: (state) => state.auth.apiStatus,
  }),
  computed: {
    ...mapGetters({
      myCreatedAndLikedPlaylist: "playlist/myCreatedAndLikedPlaylist",
      myCreatedAndLikedTagVideo: "tag/myCreatedAndLikedTagVideo",
      resetKey: "playlist/resetKey",
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
  watch: {
    resetKey() {
      this.$store.dispatch("playlist/loadMyCreatedAndLikedPlaylist");
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
  },
};
</script>
