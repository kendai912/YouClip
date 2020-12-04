<template>
  <v-container class="pa-0 ma-0 body-color">
    <div>
      <draggable
        :move="checkMove"
        v-model="draggablePlaylist"
        :disabled="!enabled"
        @start="dragging = true"
        @end="endDragging"
      >
        <div
          v-for="(item, index) in sceneListofPlaylist"
          v-bind:key="item.category + '-' + item.id"
        >
          <v-card class="mx-auto my-1" max-width="420" elevation="0">
            <v-row dense class="pa-0 ma-0">
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
                            aspect-ratio="1.7777"
                            height="94"
                          >
                          </v-img>
                        </v-hover>
                        <v-img
                          v-else
                          v-on:click.stop="select(index)"
                          class="white--text align-end"
                          v-bind:src="gifStoragePath + item.previewgif"
                          v-bind:alt="item.title"
                          aspect-ratio="1.7777"
                          height="94"
                        >
                        </v-img>
                      </v-col>
                      <v-col cols="6" class="pa-1 py-0">
                        <v-card-title
                          v-on:click.stop="select(index)"
                          class="px-0 py-0"
                          style="flex-wrap: nowrap; align-items: baseline;"
                        >
                          <div
                            style="width:16px; max-height:16px; color:red; margin-right:8px"
                          >
                            <i class="fab fa-youtube"></i>
                          </div>
                          <span
                            class="block-playlist-title"
                            style="font-size: 14px"
                            >{{ item.title }}</span
                          >
                        </v-card-title>

                        <div
                          class="text--darken-3 pt-2"
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
                        >mdi-chevron-down</v-icon
                      >
                      <v-icon v-else color="my-grey">mdi-chevron-up</v-icon>
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
                  <div class="fz-12">削除</div>
                </div>
              </v-col>
              <v-col cols="4">
                <div
                  class="text-center cursor-pointer"
                  v-on:click="editItem(index)"
                >
                  <v-icon class="outlined-icon">mdi-pencil</v-icon>
                  <div class="fz-12">編集</div>
                </div>
              </v-col>
              <v-col cols="4">
                <div
                  class="text-center cursor-pointer"
                  v-on:click="plusItem(item.id)"
                >
                  <v-icon class="outlined-icon">mdi-plus-circle</v-icon>
                  <div class="fz-12">他のまとめに追加</div>
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
    <LoadingItem
      v-if="isLoading"
      v-bind:numberOfItemsPerPagination="numberOfItemsPerPagination"
    />
    <TagDeleteModal v-if="showTagDeleteModal" />
    <AddToPlaylistModal
      v-if="showAddPlaylistModal"
      :currentTagId="currentTagId"
    />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import LoadingItem from "../components/LoadingItem.vue";
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
  }),
  components: {
    LoadingItem,
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
      isLoading: "loadingItem/isLoading",
      numberOfItemsPerPagination: "loadingItem/numberOfItemsPerPagination",
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
    editItem(index) {
      // todo
    },
    async plusItem(id) {
      //ログイン済の場合
      //ユーザーが作成したプレイリスト一覧を取得
      this.currentTagId = id;
      this.$store.dispatch("playlist/getMyCreatedPlaylist");

      //選択されたタグが追加済のユーザーのプレイリストIDを取得
      await this.$store.dispatch("playlist/getPlaylistIdsOfTag", id);

      //プレイリスト追加モーダルを表示
      this.$store.commit("playlist/openAddPlaylistModal");
    },
    addNewScene() {
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
