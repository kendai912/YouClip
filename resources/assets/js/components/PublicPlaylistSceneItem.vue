<template>
  <v-container class="pa-0 pb-3 body-color">
    <div>
      <v-row
        v-for="item in playlistItems"
        v-bind:key="item.category + '-' + item.id"
        dense
        class="pa-0 ma-0"
      >
        <v-col class="px-0">
          <v-card class="mx-auto" max-width="420" height="160" elevation="1">
            <v-row class="ma-0">
              <v-col cols="12" class="pa-0">
                <v-row class="ma-0">
                  <v-col cols="6" class="pa-1">
                    <router-link
                      v-bind:to="{
                        path: '/watch',
                        query: { playlist: item.id, index: 0 },
                      }"
                      class="no-text-decoration"
                      v-on:click.native="select(item)"
                    >
                      <v-hover v-if="!isMobile" v-slot:default="{ hover }">
                        <v-img
                          class="white--text align-end"
                          v-bind:src="
                            hover
                              ? gifStoragePath + item.previewgif
                              : thumbStoragePath + item.preview
                          "
                          v-bind:alt="item.title"
                          aspect-ratio="1.7777"
                          height="142"
                        >
                          <v-chip
                            label
                            color="#27252582"
                            text-color="white"
                            class="my-scene-chip"
                          >
                            <v-img
                              src="/storage/icons/playlist_icon.png"
                              width="16px"
                              max-height="16px"
                              alt="playlist icon"
                            />
                            <span class="caption"
                              >&nbsp;{{ item.sceneCount }}&nbsp;シーン</span
                            >
                          </v-chip>
                        </v-img>
                        <!-- <video v-else controls autoplay muted style="width: 100%; height: 100%;">
                        <source v-bind:src="'/storage/videos/'+item.previewgif" type="video/mp4">
                      </video> -->
                      </v-hover>
                      <v-img
                        v-else
                        class="white--text align-end"
                        v-bind:src="gifStoragePath + item.previewgif"
                        v-bind:alt="item.title"
                        aspect-ratio="1.7777"
                        height="142"
                      >
                        <v-chip
                          label
                          color="#27252582"
                          text-color="white"
                          class="my-scene-chip"
                        >
                          <v-img
                            src="/storage/icons/playlist_icon.png"
                            width="16px"
                            max-height="16px"
                            alt="playlist icon"
                          />
                          <span class="caption"
                            >&nbsp;{{ item.sceneCount }}&nbsp;シーン</span
                          >
                        </v-chip>
                      </v-img>
                      <!-- <video v-else controls autoplay muted style="width: 100%; height: 100%;">
                      <source v-bind:src="'/storage/videos/'+item.previewgif" type="video/mp4">
                    </video> -->
                    </router-link>
                  </v-col>
                  <v-col cols="6" class="pa-1 py-3">
                    <router-link
                      v-bind:to="{
                        path: '/watch',
                        query: { playlist: item.id, index: 0 },
                      }"
                      class="no-text-decoration"
                      v-on:click.native="select(item)"
                    >
                      <v-card-title class="py-0 d-inline">
                        <!-- <v-img
                        src="/storage/icons/clip.svg"
                        width="16px"
                        max-height="16px"
                        class="float-left"
                      /> -->
                        <span class="block-playlist-title">{{
                          item.title
                        }}</span>
                      </v-card-title>
                      <v-card-text
                        class="text--primary"
                        style="font-size: 11px;"
                      >
                        <div class="grey--text text--darken-3">
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
                      </v-card-text>

                      <v-card-text>
                        <div class="horizontal-list-wrap block-chip-lines2">
                          <v-chip
                            v-for="(tag, tagIndex) in item.tagArray"
                            v-bind:key="item.id + '-' + tagIndex"
                            class="my-tag-chip px-2"
                            color="blue lighten-5"
                            text-color="black"
                            style="font-weight: normal"
                          >
                            <v-avatar
                              style="height: 20px !important; width: 20px !important; min-width: 20px !important;"
                            >
                              <i class="fas fa-tag my-black"></i>
                            </v-avatar>
                            {{ tag }}
                          </v-chip>
                        </div>
                      </v-card-text>
                    </router-link>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row
        v-for="item in createdTagItems"
        v-bind:key="item.category + '-' + item.id"
        dense
        class="pa-0 ma-0"
      >
        <v-col class="px-0">
          <v-card class="mx-auto" max-width="420" height="160" elevation="1">
            <v-row class="ma-0">
              <v-col cols="12" class="pa-0">
                <v-row class="ma-0">
                  <v-col cols="6" class="pa-1">
                    <router-link
                      v-bind:to="{
                        path: '/watch',
                        query: { playlist: item.id, index: 0 },
                      }"
                      class="no-text-decoration"
                      v-on:click.native="select(item)"
                    >
                      <v-hover v-if="!isMobile" v-slot:default="{ hover }">
                        <v-img
                          class="white--text align-end"
                          v-bind:src="
                            hover
                              ? gifStoragePath + item.previewgif
                              : thumbStoragePath + item.preview
                          "
                          v-bind:alt="item.title"
                          aspect-ratio="1.7777"
                          height="142"
                        >
                          <v-chip
                            label
                            color="#27252582"
                            text-color="white"
                            class="my-scene-chip"
                          >
                            <v-img
                              src="/storage/icons/playlist_icon.png"
                              width="16px"
                              max-height="16px"
                              alt="playlist icon"
                            />
                            <span class="caption"
                              >&nbsp;{{ item.sceneCount }}&nbsp;シーン</span
                            >
                          </v-chip>
                        </v-img>
                      </v-hover>
                      <v-img
                        v-else
                        class="white--text align-end"
                        v-bind:src="gifStoragePath + item.previewgif"
                        v-bind:alt="item.title"
                        aspect-ratio="1.7777"
                        height="142"
                      >
                        <v-chip
                          label
                          color="#27252582"
                          text-color="white"
                          class="my-scene-chip"
                        >
                          <v-img
                            src="/storage/icons/playlist_icon.png"
                            width="16px"
                            max-height="16px"
                            alt="playlist icon"
                          />
                          <span class="caption"
                            >&nbsp;{{ item.sceneCount }}&nbsp;シーン</span
                          >
                        </v-chip>
                      </v-img>
                    </router-link>
                  </v-col>
                  <v-col cols="6" class="pa-1 py-3">
                    <router-link
                      v-bind:to="{
                        path: '/watch',
                        query: { playlist: item.id, index: 0 },
                      }"
                      class="no-text-decoration"
                      v-on:click.native="select(item)"
                    >
                      <v-card-title class="py-0 d-inline">
                        <span class="block-playlist-title">{{
                          item.title
                        }}</span>
                      </v-card-title>
                      <v-card-text
                        class="text--primary"
                        style="font-size: 11px;"
                      >
                        <div class="grey--text text--darken-3">
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
                      </v-card-text>

                      <v-card-text>
                        <div class="horizontal-list-wrap block-chip-lines2">
                          <v-chip
                            v-for="(tag, tagIndex) in item.tagArray"
                            v-bind:key="item.id + '-' + tagIndex"
                            class="my-tag-chip px-2"
                            color="blue lighten-5"
                            text-color="black"
                            style="font-weight: normal"
                          >
                            <v-avatar
                              style="height: 20px !important; width: 20px !important; min-width: 20px !important;"
                            >
                              <i class="fas fa-tag my-black"></i>
                            </v-avatar>
                            {{ tag }}
                          </v-chip>
                        </div>
                      </v-card-text>
                    </router-link>
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
    playlistItems: Array,
    createdTagItems: Array,
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
    select(mediaItem) {
      this.$store.dispatch("playlist/addPlaylistVisitCount", mediaItem.id);
    },
    endDragging() {},
  },
  mounted() {},
  created() {
    this.isMobile = this.mobileCheck();
  },
};
</script>
