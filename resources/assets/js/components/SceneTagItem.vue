<template>
  <v-container class="pa-0 pb-3 body-color">
    <div>
      <draggable 
        :move="checkMove" 
        v-model="draggablePlaylist"
        :disabled="!enabled"
        @start="dragging = true"
        @end="endDragging"
      >
        <v-row
          v-for="(item, index) in sceneListofPlaylist"
          v-bind:key="item.category+'-'+item.id"
          dense
          class="pa-0 ma-0"
        >
          <v-col class="px-0">
            <v-card class="mx-auto" max-width="420" height="128" elevation="1">
              <v-row class="ma-0">
                <v-col cols="1" class="pa-1 ma-auto">
                  <div class="text-center">
                    {{index + 1}}
                  </div>
                </v-col>
                <v-col cols="11" class="pa-0">
                  <v-row class="ma-0">
                    <v-col cols="6" class="pa-1">
                      <v-hover v-if="!isMobile" v-slot:default="{ hover }">
                        <v-img
                          v-on:click.stop="select(item)"
                          class="white--text align-end"
                          v-bind:src="hover ? gifStoragePath + item.previewgif: thumbStoragePath + item.preview"
                          v-bind:alt="item.title"
                          aspect-ratio="1.5"
                          height="120"
                        >
                          <v-chip label color="#27252582" text-color="white" class="my-scene-chip">
                            <span class="caption">{{item.start+'~'+item.end}}</span>
                          </v-chip>
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
                        aspect-ratio="1.5"
                        height="120"
                      >
                        <v-chip label color="#27252582" text-color="white" class="my-scene-chip">
                          <span class="caption">{{item.start+'~'+item.end}}</span>
                        </v-chip>
                      </v-img>
                    </v-col>
                    <v-col cols="6" class="pa-1 py-3">
                      <v-card-title v-on:click.stop="select(item)" class="py-0 d-inline">
                        <span class="block-playlist-title">{{ item.title }}</span>
                      </v-card-title>
                      <div class="horizontal-list-wrap block-chip-lines3 color-black">
                        <v-chip
                          v-for="(tag, tagIndex) in item.tagArray"
                          v-bind:key="item.id + '-' + tagIndex"
                          class="my-tag-chip px-2"
                          color="blue lighten-5"
                          text-color="black"
                          style="font-weight: normal"
                        >
                          <v-avatar style="height: 20px !important; width: 20px !important; min-width: 20px !important;">
                            <i class="fas fa-tag my-black"></i>
                          </v-avatar>
                          {{ tag }}
                        </v-chip>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </draggable>
    </div>
    <LoadingItem v-if="isLoading" v-bind:numberOfItemsPerPagination="numberOfItemsPerPagination" />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import LoadingItem from "../components/LoadingItem.vue";
import draggable from "vuedraggable";
import myMixin from "../util";

export default {
  data: () => ({
    enabled: true,
    dragging: false,
    isMobile: false
  }),
  components: {
    LoadingItem,
    draggable
  },
  props: {
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      user_id: "auth/user_id",
      isLoading: "loadingItem/isLoading",
      numberOfItemsPerPagination: "loadingItem/numberOfItemsPerPagination",
      myPlaylist: "playlist/myPlaylist",
      playlistAndTagVideoData: "watch/playlistAndTagVideoData",
      sceneListofPlaylist: "playlist/sceneListofPlaylist",
      playlistId: "watch/playlistId"
    }),
    draggablePlaylist: {
      get() {
        return this.$store.state.playlist.sceneListofPlaylist;
      },
      set(val) {
        this.$store.commit("playlist/setSceneListofPlaylist", val);
      }
    }
  },
  methods: {
    ...mapMutations({
      setSceneListofPlaylist: "playlist/setSceneListofPlaylist"
    }),
    checkMove (e) {
    },
    async select(mediaItem) {
      // await this.$store.dispatch("playlist/addPlaylistVisitCount", mediaItem.id);
      // //プレイリストの場合
      // if (mediaItem.category == "playlist") {
      //   //再生ページを表示
      //   this.$router
      //     .push({
      //       path: "/watch",
      //       query: {
      //         playlist: mediaItem.id,
      //         index: "0"
      //       }
      //     })
      //     .catch(err => {});
      // }
    },
    async endDragging() {
      this.dragging = false;
      let playlist = {
        playlist_id: this.playlistId,
        tagVideoData: this.sceneListofPlaylist
      }
      await this.$store.dispatch("playlist/updatePlaylistSceneOrder", playlist);
    }
  },
  created() {
    this.isMobile = this.mobileCheck();
  }
};
</script>
