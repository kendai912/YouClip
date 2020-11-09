<template>
  <div>
<!--    <v-tabs v-model="tab" background-color="transparent" grow hide-slider>-->
<!--      <v-tab v-for="(item, key) in items" :key="item" v-on:click="setActiveTab(key)">{{ item }}</v-tab>-->
<!--    </v-tabs>-->

<!--    <v-tabs-items v-model="tab" class="pb-14" style="background-color: transparent">-->
<!--      <v-tab-item>-->
<!--        <v-card flat>-->
<!--          <MyPlaylistItem v-bind:mediaItems="myCreatedAndLikedPlaylistMediaItems" />-->
<!--          &lt;!&ndash; <MyPlaylistItem v-bind:mediaItems="myPlaylist" /> &ndash;&gt;-->
<!--        </v-card>-->
<!--      </v-tab-item>-->
<!--      <v-tab-item>-->
<!--        <v-card flat>-->
<!--          <MyTagItem v-bind:mediaItems="myCreatedAndLikedTagVideoMediaItems" />-->
<!--        </v-card>-->
<!--      </v-tab-item>-->
<!--    </v-tabs-items>-->
    <MyPlaylistItem v-bind:mediaItems="myCreatedAndLikedPlaylistMediaItems" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import MyPlaylist from "../components/MyPlaylist.vue";
import MyScene from "../components/MyScene.vue";
import MyPlaylistItem from "../components/MyPlaylistItem.vue";
import MyTagItem from "../components/MyTagItem.vue";
// import PlaylistMediaItem from "../components/PlaylistMediaItem.vue";
import myMixin from "../util";

export default {
  components: {
    MyPlaylist,
    MyScene,
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

      var groupedData = Object.values(mediaItems.reduce((result, {
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
      }) => {
        // Create new group
        if (!result[video_id]) { 
          result[video_id] = {
            video_id,
            title,
            tagVideoData: []
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
      }, {}));
      groupedData.sort((a, b) => (a.video_id < b.video_id) ? 1 : -1);
      return groupedData;
    },
  },
  methods: {
  //   myCreatedAndLikedPlaylistMediaItems() {
  //     if (!this.myCreatedAndLikedPlaylist) return;

  //     // プレイリストのデータをmyCreatedAndLikedPlaylistMediaItemsに格納
  //     let mediaItems = [];
  //     this.putPlaylistTagIntoMediaItems(
  //       mediaItems,
  //       this.myCreatedAndLikedPlaylist
  //     );
  //     console.log("media items", mediaItems);
  //     setTimeout(this.$store.commit("playlist/setMyPlaylist", mediaItems), 10);
      
  //     return mediaItems;
  //   },
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
  },
};
</script>
