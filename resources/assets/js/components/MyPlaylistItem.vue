<template>
  <v-container class="pa-0 pb-3 mt-2 body-color">
    <div>
      <v-row
        v-for="(item, index) in mediaItems"
        v-bind:key="item.category + '-' + item.id"
        dense
        class="pa-0 ma-0"
      >
        <v-col class="px-0">
          <v-card class="mx-auto d-flex" max-width="420" elevation="0">
            <v-row class="ma-0" align="center">
              <v-col class="pa-0">
                <v-row class="ma-0">
                  <v-col cols="6" class="pa-2">
                    <v-card
                      class="ma-0 pa-0"
                      aspect-ratio="calc(16 / 9)"
                      max-height="94"
                      max-width="167"
                      elevation="0"
                      v-on:mouseover="setShowPreviewIndex(index)"
                      v-on:touchstart="setShowPreviewIndex(index)"
                      style="overflow: hidden;"
                    >
                      <v-img
                        class="white--text align-end rounded"
                        v-bind:src="thumbStoragePath + item.preview"
                        lazy-src="/storage/imgs/dummy-image.jpg"
                        v-on:click.stop="select(item)"
                        v-bind:alt="item.title"
                        height="100%"
                        style="z-index: 1;"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                      <video
                        v-if="showPreviewIndex == index"
                        v-bind:src="gifStoragePath + item.previewgif"
                        autoplay
                        playsinline
                        muted
                        loop
                        disablePictureInPicture
                        disableRemotePlayback
                        height="100%"
                        style="position: absolute; top: 0; left: 0; z-index: 2; border-radius: 4px; object-fit: cover;"
                      ></video>
                    </v-card>
                  </v-col>
                  <v-col cols="6" class="pa-2">
                    <v-row class="ma-0 pa-0">
                      <v-col cols="10" class="ma-0 pa-0">
                        <div v-on:click.stop="select(item)" class="py-1">
                          <span class="block-playlist-title">{{
                            item.title
                          }}</span>
                        </div>
                      </v-col>
                      <v-col cols="2" class="ma-0 pa-0 text-center">
                        <div
                          class="ma-0 pa-0"
                          style="width: 20px; height: 20px;"
                          v-if="user_id === item.user_id"
                          v-on:click="editPlaylist(item)"
                        >
                          <span>
                            <v-icon class="my-grey outlined-icon"
                              >mdi-pencil</v-icon
                            >
                          </span>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row class="ma-0 pa-0">
                      <v-col class="ma-0 pa-0">
                        <div
                          v-on:click.stop="select(item)"
                          class="grey--text text--darken-3 py-1"
                          style="font-size: 12px; padding-left: 0;"
                        >
                          <span
                            >{{
                              item.visitCount ? item.visitCount : 0
                            }}回視聴</span
                          >
                          <span style="font-size:8px;"
                            >&nbsp;&#8226;&nbsp;</span
                          >
                          <span>合計{{ item.totalDuration }}</span>
                          <span style="font-size:8px;"
                            >&nbsp;&#8226;&nbsp;</span
                          >
                          <span>{{ item.timeSince }}前</span>
                          <span v-if="item.likeCount" style="font-size:8px;"
                            >&nbsp;&#8226;&nbsp;</span
                          >
                          <span v-if="item.likeCount">
                            <i class="fas fa-heart my-grey-heart"></i>
                            {{ item.likeCount }}
                          </span>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <LoadingItem
      v-if="isLoading"
      v-bind:numberOfItemsPerPagination="numberOfItemsPerPagination"
    />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import LoadingItem from "../components/LoadingItem.vue";
import draggable from "vuedraggable";
// import draggable from "@/vuedraggable";
import myMixin from "../util";

export default {
  data: () => ({
    enabled: true,
    dragging: false,
    showPreviewIndex: null,
  }),
  components: {
    LoadingItem,
    draggable,
  },
  props: {
    mediaItems: Array,
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      user_id: "auth/user_id",
      isLoading: "loadingItem/isLoading",
      numberOfItemsPerPagination: "loadingItem/numberOfItemsPerPagination",
    }),
  },
  methods: {
    setShowPreviewIndex(index) {
      this.showPreviewIndex = index;
    },
    checkMove(e) {},
    async select(mediaItem) {
      //プレイリストの場合
      if (mediaItem.category == "playlist") {
        await this.$store.dispatch(
          "playlist/addPlaylistVisitCount",
          mediaItem.id
        );
        //再生ページを表示
        this.$router
          .push({
            path: "/watch",
            query: {
              playlist: mediaItem.id,
              index: "0",
            },
          })
          .catch((err) => {});
      }

      //タグの場合
      if (mediaItem.category == "tag") {
        //再生ページを表示
        this.$router
          .push({
            path: "/watch",
            query: {
              tag: mediaItem.id,
            },
          })
          .catch((err) => {});
      }
    },
    async editPlaylist(mediaItem) {
      this.$router
        .push({
          path: "/editmyplaylist",
          query: {
            playlist: mediaItem.id,
          },
        })
        .catch((err) => {});
    },
    endDragging() {},
  },
  mounted() {},
  created() {},
};
</script>
