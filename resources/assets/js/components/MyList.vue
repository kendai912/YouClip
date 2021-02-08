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
        <span>自分のまとめ・いいねしたまとめ</span>
      </div>
      <v-spacer></v-spacer>
      <div
        style="
              position: absolute;
              height: 100%;
              top: 12px;
              right: 8px;
            "
      >
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <i
              v-on="on"
              class="fas fa-bars"
              style="color: rgb(158, 158, 158); text-align: right; font-size: 20px;"
            ></i>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title class="button button--link" v-on:click="logout"
                >ログアウト</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
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
    // PlaylistMediaItem
  },
  props: {},
  data() {
    return {
      tab: 1, //デフォルトは場面タブを表示
      items: ["まとめ", "場面"],
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
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      if (this.apiStatus) {
        this.$router.push("/login");
      }
    },
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
