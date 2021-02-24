<template>
  <v-container class="pa-0 ma-0 body-color">
    <div>
      <draggable
        :move="checkMove"
        v-model="draggablePlaylist"
        :disabled="!enabled"
        @start="dragging = true"
        @end="endDragging"
        v-bind="{
          handle: '.item-handle',
        }"
      >
        <div
          v-for="(item, index) in sceneListofPlaylist"
          v-bind:key="item.category + '-' + item.id"
        >
          <v-card class="mx-auto my-1" max-width="420" elevation="0">
            <v-row dense class="pa-0 ma-0">
              <v-col class="px-0">
                <v-row class="ma-0">
                  <v-col cols="1" class="pa-1 ma-auto item-handle">
                    <v-row class="ma-0 pa-0 text-center" justify="center">
                      <v-col class="ma-0 pa-0">
                        {{ index + 1 }}
                      </v-col>
                    </v-row>
                    <v-row class="ma-0 pa-0 text-center" justify="center">
                      <v-col class="ma-0 pa-0">
                        <v-icon class="pa-0 ma-0" size="16"
                          >drag_indicator</v-icon
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="10" class="pa-0">
                    <v-row class="ma-0">
                      <v-col cols="6" class="pa-1">
                        <v-card
                          class="ma-0 pa-0"
                          aspect-ratio="calc(16 / 9)"
                          width="100%"
                          height="100%"
                          elevation="0"
                          v-on:mouseover="setShowPreviewIndex(index)"
                          v-on:touchstart="setShowPreviewIndex(index)"
                          style="overflow: hidden;"
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
                            width="100%"
                            style="position: absolute; top: 0; left: 0; z-index: 2; border-radius: 4px; object-fit: cover;"
                          ></video>
                        </v-card>
                      </v-col>
                      <v-col cols="6" class="pa-1 py-0">
                        <div
                          class="px-0 py-0 pt-1"
                          style="display: flex; flex-wrap: nowrap; align-items: flex-start;"
                        >
                          <div
                            style="font-size: 20px; color:red; max-height: 18px;"
                          >
                            <i
                              class="fab fa-youtube"
                              style="vertical-align: top;"
                            ></i>
                          </div>
                          <div class="block-playlist-title">
                            <span style="vertical-align: middle;">{{
                              item.title
                            }}</span>
                          </div>
                        </div>

                        <div
                          class="green--text text--darken-2 pt-2"
                          style="font-size: 12px; padding-left: 0; font-weight: bold"
                        >
                          <span>{{ item.start }}</span>
                          <span style="font-size:8px;">-</span>
                          <span>{{ item.end }}の場面</span>
                        </div>

                        <div
                          class="horizontal-list-wrap block-chip-lines3 color-black my-1"
                        >
                          <v-chip
                            v-for="(tag, tagIndex) in item.tagArray"
                            v-show="tag"
                            v-bind:key="item.id + '-' + tagIndex"
                            class="my-tag-chip pr-2"
                            text-color="black"
                            style="font-weight: normal; border-color:#bdbdbd;"
                            outlined
                            small
                          >
                            {{ tag }}
                          </v-chip>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="1" class="pa-1 py-0 text-center">
                    <div style="font-size: 20px" @click="toggleItem(index)">
                      <v-icon
                        v-if="!toggleItems.includes(index, item.title)"
                        color="my-grey"
                        style="vertical-align: inherit;"
                        >mdi-chevron-down</v-icon
                      >
                      <v-icon
                        v-else
                        color="my-grey"
                        style="vertical-align: inherit;"
                        >mdi-chevron-up</v-icon
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row v-if="toggleItems.includes(index)">
              <v-col cols="4">
                <div
                  class="text-center cursor-pointer"
                  v-on:click="deleteItem(item.id, item.title, index)"
                >
                  <v-icon class="outlined-icon">mdi-delete</v-icon>
                  <h2 class="fz-12">削除</h2>
                </div>
              </v-col>
              <v-col cols="4">
                <div
                  class="text-center cursor-pointer"
                  v-on:click="editItem(item.id)"
                >
                  <v-icon class="outlined-icon">mdi-pencil</v-icon>
                  <h2 class="fz-12">編集</h2>
                </div>
              </v-col>
              <v-col cols="4">
                <div
                  class="text-center cursor-pointer"
                  v-on:click="plusItem(item.id)"
                >
                  <v-icon class="outlined-icon">mdi-plus-circle</v-icon>
                  <h2 class="fz-12">他のまとめに追加</h2>
                </div>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </v-card>
        </div>
      </draggable>

      <v-card
        v-if="showAddNewSceneComponent"
        class="mx-auto my-1"
        max-width="420"
        elevation="0"
      >
        <v-row dense class="pa-0 ma-0">
          <v-col cols="1" class="pa-0 ma-auto"> </v-col>
          <v-col cols="10" class="pa-0 ma-auto" v-on:click="addNewScene">
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
          <v-col cols="1" class="pa-0 ma-auto"> </v-col>
        </v-row>
      </v-card>
    </div>
    <TagDeleteModal v-if="showTagDeleteModal" />
    <AddToPlaylistModal
      v-if="showAddPlaylistModal"
      :currentTagId="currentTagId"
    />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import TagDeleteModal from "../components/TagDeleteModal.vue";
import AddToPlaylistModal from "../components/AddToPlaylistModal.vue";
import draggable from "vuedraggable";
import myMixin from "../util";

export default {
  data: () => ({
    enabled: true,
    dragging: false,
    isMobile: false,
    toggleItems: [],
    currentTagId: 0,
    showPreviewIndex: null,
  }),
  components: {
    draggable,
    TagDeleteModal,
    AddToPlaylistModal,
  },
  props: {
    showAddNewSceneComponent: Boolean,
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      user_id: "auth/user_id",
      playlistAndTagVideoData: "watch/playlistAndTagVideoData",
      sceneListofPlaylist: "playlist/sceneListofPlaylist",
      playlistId: "watch/playlistId",
      showTagDeleteModal: "tagDeleteModal/showTagDeleteModal",
      showAddPlaylistModal: "playlist/showAddPlaylistModal",
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
      setIsAdding: "tagging/setIsAdding",
    }),
    setShowPreviewIndex(index) {
      this.showPreviewIndex = index;
    },
    checkMove(e) {},
    async endDragging() {
      this.dragging = false;
      let playlist = {
        playlist_id: this.playlistId,
        tagVideoData: this.sceneListofPlaylist,
      };
      await this.$store.dispatch("playlist/updatePlaylistSceneOrder", playlist);
    },
    toggleItem(index) {
      if (this.toggleItems.includes(index)) {
        this.toggleItems = this.toggleItems.filter(
          (iIndex) => iIndex !== index
        );
      } else {
        this.toggleItems.push(index);
      }
    },
    deleteItem(tagId, tagName, index) {
      this.$store.commit("tagDeleteModal/setTagId", tagId);
      this.$store.commit("tagDeleteModal/setTagIndex", index);
      this.$store.commit("tagDeleteModal/setTagName", tagName);
      this.$store.commit("tagDeleteModal/openTagDeleteModal");
    },
    editItem(tagId) {
      let youtubeId = this.searchYtIdByTagId(tagId);

      this.$router
        .push({
          path: "/edit/scene",
          query: {
            playlist: this.playlistId,
            tag: tagId,
            v: youtubeId,
          },
        })
        .catch((err) => {});
    },
    searchYtIdByTagId(tagId) {
      let target = this.playlistAndTagVideoData.tagVideoData.find((item) => {
        return item.tag_id == tagId;
      });

      return target.youtubeId;
    },
    async plusItem(id) {
      //ログイン済の場合
      //ユーザーが作成したプレイリスト一覧を取得
      this.currentTagId = id;
      await this.$store.dispatch("playlist/getMyCreatedPlaylist");
      //プレイリストのカテゴリーを取得しセット
      await this.$store.dispatch(
        "playlist/getCurrentCategory",
        this.playlistId
      );

      //選択されたタグが追加済のユーザーのプレイリストIDを取得
      await this.$store.dispatch("playlist/getPlaylistIdsOfTag", id);

      //プレイリスト追加モーダルを表示
      this.$store.commit("playlist/openAddPlaylistModal");
    },
    // add new scene to existing playlist
    addNewScene() {
      this.setIsAdding(true);
      this.$router
        .push({
          path: "/add",
          query: {
            playlist: this.playlistId,
          },
        })
        .catch((err) => {});
    },
  },
  created() {
    this.isMobile = this.mobileCheck();
  },
};
</script>
