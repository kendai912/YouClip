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
          <v-card
            class="mx-auto d-flex"
            max-width="420"
            elevation="0"
            v-if="item"
          >
            <v-row class="ma-0" align="center">
              <v-col class="pa-0">
                <v-row class="ma-0">
                  <v-col cols="6" class="pa-2">
                    <v-card
                      class="ma-0 pa-0"
                      aspect-ratio="calc(16 / 9)"
                      max-width="167"
                      height="94"
                      elevation="0"
                      v-on:mouseover="setShowPreviewIndex(index)"
                      v-on:touchstart="setShowPreviewIndex(index)"
                      style="overflow: hidden;"
                    >
                      <router-link
                        v-bind:to="{
                          path: '/watch',
                          query: { playlist: item.id, index: 0 },
                        }"
                        class="no-text-decoration"
                        v-on:click.native="select(item)"
                      >
                        <v-img
                          class="white--text align-end rounded"
                          v-bind:src="thumbStoragePath + item.preview"
                          lazy-src="/storage/imgs/dummy-image.jpg"
                          v-bind:alt="item.title"
                          height="100%"
                          width="100%"
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
                      </router-link>
                    </v-card>
                  </v-col>
                  <v-col cols="6" class="pa-2">
                    <v-row class="ma-0 pa-0">
                      <v-col cols="10" class="ma-0 pa-0">
                        <div class="py-1">
                          <router-link
                            v-bind:to="{
                              path: '/watch',
                              query: { playlist: item.id, index: 0 },
                            }"
                            class="no-text-decoration"
                            v-on:click.native="select(item)"
                          >
                            <span class="block-playlist-title">{{
                              item.title
                            }}</span>
                          </router-link>
                        </div>
                      </v-col>
                      <v-col cols="2" class="ma-0 pa-0 text-center">
                        <div
                          class="ma-0 pa-0"
                          style="width: 20px; height: 20px;"
                          v-if="user_id === item.user_id"
                        >
                          <router-link
                            v-bind:to="{
                              path: '/editmyplaylist',
                              query: { playlist: item.id },
                            }"
                            class="no-text-decoration"
                          >
                            <span>
                              <v-icon class="my-grey outlined-icon"
                                >mdi-pencil</v-icon
                              >
                            </span>
                          </router-link>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row class="ma-0 pa-0">
                      <v-col class="ma-0 pa-0">
                        <div
                          class="grey--text text--darken-3 py-1"
                          style="font-size: 12px; padding-left: 0;"
                        >
                          <router-link
                            v-bind:to="{
                              path: '/watch',
                              query: { playlist: item.id, index: 0 },
                            }"
                            class="no-text-decoration"
                            v-on:click.native="select(item)"
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
                          </router-link>
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
      <v-card
        v-if="!mediaItems[0]"
        class="text-center pa-3 ma-3 body-color"
        elevation="0"
      >
        <v-card-title class="pa-0 ma-0 justify-center">
          <v-img
            max-width="160"
            aspect-ratio="1"
            alt="no post"
            src="/storage/imgs/noPost.svg"
          ></v-img>
        </v-card-title>
        <v-card-title class="pa-1 mt-2 mx-0 justify-center"
          >まだ作成した・いいねしたまとめはありません</v-card-title
        >
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import draggable from "vuedraggable";
import myMixin from "../util";

export default {
  data: () => ({
    enabled: true,
    dragging: false,
    showPreviewIndex: null,
  }),
  components: {
    draggable,
  },
  props: {
    mediaItems: Array,
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      user_id: "auth/user_id",
      numberOfItemsPerPagination: "loadingItem/numberOfItemsPerPagination",
    }),
  },
  methods: {
    setShowPreviewIndex(index) {
      this.showPreviewIndex = index;
    },
    checkMove(e) {},
    select(mediaItem) {
      //プレイリストの場合
      this.$store.dispatch("playlist/addPlaylistVisitCount", mediaItem.id);
    },
    endDragging() {},
  },
  mounted() {},
  created() {},
};
</script>
