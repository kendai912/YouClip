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
          <div  v-for="(item, index) in sceneListofPlaylist"
                v-bind:key="item.category + '-' + item.id">
              <v-card class="mx-auto my-1" max-width="420" elevation="1">
              <v-row
                      dense
                      class="pa-0 ma-0"
              >
                  <v-col class="px-0">
                          <v-row class="ma-0">
                              <v-col cols="1" class="pa-1 ma-auto">
                                  <div class="text-center">
                                      {{ index + 1 }}
                                  </div>
                              </v-col>
                              <v-col cols="10" class="pa-0">
                                  <v-row class="ma-0">
                                      <v-col cols="6" class="pa-1">
                                          <v-hover v-if="!isMobile" v-slot:default="{ hover }">
                                              <v-img
                                                      v-on:click.stop="select(index)"
                                                      class="white--text align-end"
                                                      v-bind:src="
                            hover
                              ? gifStoragePath + item.previewgif
                              : thumbStoragePath + item.preview
                          "
                                                      v-bind:alt="item.title"
                                                      aspect-ratio="1.78"
                                                      height="94"
                                              >
                                                  <!--                          <v-chip-->
                                                  <!--                            label-->
                                                  <!--                            color="#27252582"-->
                                                  <!--                            text-color="white"-->
                                                  <!--                            class="my-scene-chip"-->
                                                  <!--                          >-->
                                                  <!--                            <span class="caption">{{-->
                                                  <!--                              item.start + "~" + item.end-->
                                                  <!--                            }}</span>-->
                                                  <!--                          </v-chip>-->
                                              </v-img>
                                              <!-- <video v-else controls autoplay muted style="width: 100%; height: 100%;">
                                                <source v-bind:src="'/storage/videos/'+item.previewgif" type="video/mp4">
                                              </video> -->
                                          </v-hover>
                                          <v-img
                                                  v-else
                                                  v-on:click.stop="select(index)"
                                                  class="white--text align-end"
                                                  v-bind:src="gifStoragePath + item.previewgif"
                                                  v-bind:alt="item.title"
                                                  aspect-ratio="1.78"
                                                  height="94"
                                          >
                                              <!--                        <v-chip-->
                                              <!--                          label-->
                                              <!--                          color="#27252582"-->
                                              <!--                          text-color="white"-->
                                              <!--                          class="my-scene-chip"-->
                                              <!--                        >-->
                                              <!--                          <span class="caption">{{-->
                                              <!--                            item.start + "~" + item.end-->
                                              <!--                          }}</span>-->
                                              <!--                        </v-chip>-->
                                          </v-img>
                                      </v-col>
                                      <v-col cols="6" class="pa-1 py-0">
                                          <v-card-title
                                                  v-on:click.stop="select(index)"
                                                  class="px-0 py-0"
                                                  style="flex-wrap: nowrap; align-items: baseline;"
                                          >
                                              <div style="width:16px; max-height:16px; color:red; margin-right:8px">
                                                  <i class="fab fa-youtube"></i>
                                              </div>
                                              <span class="block-playlist-title" style="font-size: 14px">{{item.title}}</span>
                                          </v-card-title>
                                          <div class="text--darken-3 pt-2" style="font-size: 12px; padding-left: 0; font-weight: bold">
                                              <span>{{item.start}}</span>
                                              <span style="font-size:8px;">&nbsp;~&nbsp;</span>
                                              <span>{{ item.end }}の場面</span>
                                          </div>
                                          <div class="horizontal-list-wrap block-chip-lines3 color-black my-1">
                                              <v-chip
                                                      v-for="(tag, tagIndex) in item.tagArray"
                                                      v-bind:key="item.id + '-' + tagIndex"
                                                      class="my-tag-chip pr-2"
                                                      text-color="black"
                                                      style="font-weight: normal; border-color:#bdbdbd;"
                                                      outlined
                                              >
                                                  <!--                          <v-avatar-->
                                                  <!--                            style="height: 20px !important; width: 20px !important; min-width: 20px !important;"-->
                                                  <!--                          >-->
                                                  <!--                            <i class="fas fa-tag my-black"></i>-->
                                                  <!--                          </v-avatar>-->
                                                  {{ tag }}
                                              </v-chip>
                                          </div>
                                      </v-col>
                                  </v-row>
                              </v-col>
                              <v-col cols="1" class="pa-1 py-0 text-center">
                                  <div style="font-size: 20px" @click="toggleItem(index)">
                                      <i v-if="!toggleItems.includes(index)" class="fas fa-angle-down outlined-icon"></i>
                                      <i v-else class="fas fa-angle-up outlined-icon"></i>
                                  </div>
                              </v-col>
                          </v-row>
                  </v-col>
              </v-row>
              <v-row v-if="toggleItems.includes(index)">
                  <v-col cols="4">
                      <div class="text-center cursor-pointer" v-on:click="deleteItem(index)">
                          <v-icon class="outlined-icon">mdi-delete</v-icon>
                          <div class="fz-12">削除</div>
                      </div>
                  </v-col>
                  <v-col cols="4">
                      <div class="text-center cursor-pointer" v-on:click="editItem(index)">
                          <v-icon class="outlined-icon">mdi-pencil</v-icon>
                          <div class="fz-12">編集</div>
                      </div>
                  </v-col>
                  <v-col cols="4">
                      <div class="text-center cursor-pointer" v-on:click="plusItem(index)">
                          <v-icon class="outlined-icon">mdi-plus-circle</v-icon>
                          <div class="fz-12">他のまとめに追加</div>
                      </div>
                  </v-col>
              </v-row>
              </v-card>
          </div>
      </draggable>
      <v-card class="mx-auto my-1" max-width="420" elevation="1">
          <v-row
                  dense
                  class="pa-0 ma-0"
          >
              <v-col cols="1" class="pa-1 ma-auto">
              </v-col>
              <v-col cols="10" class="pa-1 ma-auto">
                  <v-row class="ma-0">
                      <v-col cols="6" class="pa-1">
                          <div class="justify-center align-center add-play-screen">
                              <v-icon color="white" style="font-size:54px">mdi-plus</v-icon>
                          </div>
                      </v-col>
                      <v-col cols="6" class="pa-1 align-center" style="display:flex">
                          <div>新しい場面を追加</div>
                      </v-col>
                  </v-row>
              </v-col>
              <v-col cols="1" class="pa-1 ma-auto">
              </v-col>
          </v-row>
      </v-card>
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
import myMixin from "../util";

export default {
  data: () => ({
    enabled: true,
    dragging: false,
    isMobile: false,
    toggleItems:[],
  }),
  components: {
    LoadingItem,
    draggable,
  },
  props: {},
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      user_id: "auth/user_id",
      isLoading: "loadingItem/isLoading",
      numberOfItemsPerPagination: "loadingItem/numberOfItemsPerPagination",
      myPlaylist: "playlist/myPlaylist",
      playlistAndTagVideoData: "watch/playlistAndTagVideoData",
      sceneListofPlaylist: "playlist/sceneListofPlaylist",
      playlistId: "watch/playlistId",
    }),
    draggablePlaylist: {
      get() {
        return this.$store.state.playlist.sceneListofPlaylist;
      },
      set(val) {
        this.$store.commit("playlist/setSceneListofPlaylist", val);
      },
    },
  },
  methods: {
    ...mapMutations({
      setSceneListofPlaylist: "playlist/setSceneListofPlaylist",
    }),
    checkMove(e) {},
    select(index) {
      //再生ページを表示
      this.$router
        .push({
          path: "/watch",
          query: {
            playlist: this.playlistId,
            index: index,
          },
        })
        .catch((err) => {});
    },
    async endDragging() {
      this.dragging = false;
      let playlist = {
        playlist_id: this.playlistId,
        tagVideoData: this.sceneListofPlaylist,
      };
      await this.$store.dispatch("playlist/updatePlaylistSceneOrder", playlist);
    },
      toggleItem(index){
          if(this.toggleItems.includes(index)){
              this.toggleItems = this.toggleItems.filter(iIndex => iIndex !== index);
          } else {
              this.toggleItems.push(index);
          }
      },
      deleteItem(index){
        // todo
      },
      editItem(index){
        // todo
      },
      plusItem(index){
        // todo
      }
  },
  created() {
    this.isMobile = this.mobileCheck();
  },
};
</script>
