<template>
  <v-container class="pa-0 pb-3 body-color">
    <div>
      <!-- <draggable 
        :move="checkMove" 
        v-model="mediaItems"
        :disabled="!enabled"
        @start="dragging = true"
        @end="endDragging"
      > -->
      <v-row
        v-for="item in mediaItems"
        v-bind:key="item.category + '-' + item.id"
        dense
        class="pa-0 ma-0"
      >
        <v-col class="px-0">
          <v-card
            class="mx-auto d-flex"
            max-width="420"
            elevation="1"
          >
            <v-row class="ma-0" align="center">
              <v-col class="pa-0">
                <v-row class="ma-0">
                  <v-col class="pa-2">
                    <v-hover v-if="!isMobile" v-slot:default="{ hover }">
                      <v-img
                        v-on:click.stop="select(item)"
                        class="white--text align-end"
                        v-bind:src="
                          hover
                            ? gifStoragePath + item.previewgif
                            : thumbStoragePath + item.preview
                        "
                        v-bind:alt="item.title"
                        aspect-ratio="1.78"
                        height="100"
                      >
<!--                        <v-chip-->
<!--                          label-->
<!--                          color="#27252582"-->
<!--                          text-color="white"-->
<!--                          class="my-scene-chip"-->
<!--                        >-->
<!--                          <v-img-->
<!--                            src="/storage/icons/playlist_icon.png"-->
<!--                            width="16px"-->
<!--                            max-height="16px"-->
<!--                          />-->
<!--                          <span class="caption"-->
<!--                            >&nbsp;{{ item.sceneCount }}&nbsp;シーン</span-->
<!--                          >-->
<!--                        </v-chip>-->
                      </v-img>
                      <!-- <video v-else controls autoplay muted style="width: 100%; height: 100%;">
                          <source v-bind:src="'/storage/videos/'+item.previewgif" type="video/mp4">
                        </video> -->
                    </v-hover>
                    <v-img
                      v-else
                      v-on:click.stop="select(item)"
                      class="white--text align-end"
                      v-bind:src="gifStoragePath + item.previewgif"
                      v-bind:alt="item.title"
                      aspect-ratio="1.78"
                      height="100"
                    >
<!--                      <v-chip-->
<!--                        label-->
<!--                        color="#27252582"-->
<!--                        text-color="white"-->
<!--                        class="my-scene-chip"-->
<!--                      >-->
<!--                        <v-img-->
<!--                          src="/storage/icons/playlist_icon.png"-->
<!--                          width="16px"-->
<!--                          max-height="16px"-->
<!--                        />-->
<!--                        <span class="caption"-->
<!--                          >&nbsp;{{ item.sceneCount }}&nbsp;シーン</span-->
<!--                        >-->
<!--                      </v-chip>-->
                    </v-img>
                    <!-- <video v-else controls autoplay muted style="width: 100%; height: 100%;">
                        <source v-bind:src="'/storage/videos/'+item.previewgif" type="video/mp4">
                      </video> -->
                  </v-col>
                  <v-col class="pa-2">
                    <div
                      v-on:click.stop="select(item)"
                      class="py-1"
                    >
<!--                      <v-img-->
<!--                        src="/storage/icons/clip.svg"-->
<!--                        width="16px"-->
<!--                        max-height="16px"-->
<!--                        class="float-left mr-1"-->
<!--                      />-->
                      <span class="block-playlist-title">{{ item.title }}</span>
                    </div>
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
                        <span style="font-size:8px;">&nbsp;&#8226;&nbsp;</span>
                        <span>合計{{ item.totalDuration }}</span>
                        <span style="font-size:8px;">&nbsp;&#8226;&nbsp;</span>
                        <span>{{ item.timeSince }}前</span>
                        <span v-if="item.likeCount" style="font-size:8px;"
                          >&nbsp;&#8226;&nbsp;</span
                        >
                        <span v-if="item.likeCount">
                          <i class="fas fa-heart my-grey-heart"></i>
                          {{ item.likeCount }}
                        </span>
                      </div>

<!--                    <v-card-text>-->
<!--                      <div class="horizontal-list-wrap block-chip-lines2">-->
<!--                        <v-chip-->
<!--                          v-for="(tag, tagIndex) in item.tagArray"-->
<!--                          v-bind:key="item.id + '-' + tagIndex"-->
<!--                          class="my-tag-chip px-2"-->
<!--                          color="blue lighten-5"-->
<!--                          text-color="black"-->
<!--                          style="font-weight: normal"-->
<!--                        >-->
<!--                          <v-avatar-->
<!--                            style="height: 20px !important; width: 20px !important; min-width: 20px !important;"-->
<!--                          >-->
<!--                            <i class="fas fa-tag my-black"></i>-->
<!--                          </v-avatar>-->
<!--                          {{ tag }}-->
<!--                        </v-chip>-->
<!--                      </div>-->
<!--                    </v-card-text>-->
                  </v-col>
                  <v-col cols="auto" class="pa-2 text-center">
                    <div
                      class="ma-auto"
                      style="width: 20px; height: 20px;"
                      v-if="user_id === item.user_id"
                      v-on:click="editPlaylist(item)"
                    >
                      <span>
                        <v-icon class="my-grey outlined-icon">mdi-pencil</v-icon>
                      </span>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <!-- </draggable> -->
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
    isMobile: false,
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

      // IFrame Player APIを呼び出すためにページをリロード
      // window.location.reload();
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
  created() {
    this.isMobile = this.mobileCheck();
  },
};
</script>
