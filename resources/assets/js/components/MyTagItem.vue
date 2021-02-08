<template>
  <v-container class="pa-0 py-3 body-color">
    <v-row
      v-for="videoItem in mediaItems"
      v-bind:key="videoItem.video_id"
      dense
      class="pa-0 ma-auto mb-1 white"
      style="max-width: 420px;"
    >
      <v-col cols="12">
        <v-img
          src="/storage/icons/yt_social_red.png"
          width="28px"
          max-height="28px"
          class="float-left mr-2"
          alt="YouTube logo"
        />
        <div class="video-title">
          {{ videoItem.title }}
        </div>
      </v-col>
      <v-col
        style="padding-top: 2px; padding-bottom: 2px;"
        v-for="item in videoItem.tagVideoData"
        v-bind:key="item.category + '-' + item.id"
        cols="6"
      >
        <v-card class="mx-0" elevation="1">
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
                max-height="266.66px"
                v-bind:src="
                  hover
                    ? gifStoragePath + item.previewgif
                    : thumbStoragePath + item.preview
                "
                v-bind:alt="item.title"
                aspect-ratio="1.7777"
              >
                <v-chip
                  label
                  color="#27252582"
                  text-color="white"
                  class="my-scene-time"
                >
                  <span class="caption">{{ item.start + "~" + item.end }}</span>
                </v-chip>
                <v-card-text
                  class="px-1"
                  style="position: absolute; bottom: 0;"
                >
                  <div class="horizontal-list-wrap block-chip-line">
                    <v-chip
                      v-for="(tag, tagIndex) in item.tagArray"
                      v-bind:key="item.id + '-' + tagIndex"
                      class="my-tag-chip"
                      small
                      color="blue lighten-5"
                      text-color="black"
                      style="font-weight: normal"
                    >
                      <v-avatar left>
                        <i class="fas fa-tag my-black"></i>
                      </v-avatar>
                      {{ tag }}
                    </v-chip>
                  </div>
                </v-card-text>
              </v-img>
              <!-- <video v-else :poster="'/storage/videos/'+item.preview" autoplay muted playsinline style="width: 100%; height: 100%;">
              <source v-bind:src="'/storage/videos/'+item.previewgif" type="video/mp4">
            </video> -->
            </v-hover>
            <v-img
              v-else
              class="white--text align-end"
              max-height="266.66px"
              v-bind:src="gifStoragePath + item.previewgif"
              v-bind:alt="item.title"
              aspect-ratio="1.7777"
            >
              <v-chip
                label
                color="#27252582"
                text-color="white"
                class="my-scene-time"
              >
                <span class="caption">{{ item.start + "~" + item.end }}</span>
              </v-chip>
              <v-card-text
                class="px-1 horizontal-list-wrap block-chip-line"
                style="position: absolute; bottom: 0;"
              >
                <div class="horizontal-list-wrap block-chip-line">
                  <v-chip
                    v-for="(tag, tagIndex) in item.tagArray"
                    v-bind:key="item.id + '-' + tagIndex"
                    class="my-tag-chip"
                    small
                    color="blue lighten-5"
                    text-color="black"
                    style="font-weight: normal"
                  >
                    <v-avatar left>
                      <i class="fas fa-tag my-black"></i>
                    </v-avatar>
                    {{ tag }}
                  </v-chip>
                </div>
              </v-card-text>
            </v-img>
          </router-link>
        </v-card>
      </v-col>
      <!-- <v-col cols="12" class="px-1">
        <v-divider></v-divider>
      </v-col> -->
    </v-row>
    <LoadingItem
      v-if="isLoading"
      v-bind:numberOfItemsPerPagination="numberOfItemsPerPagination"
    />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import LoadingItem from "../components/LoadingItem.vue";
import myMixin from "../util";

export default {
  data: () => ({
    isMobile: false,
  }),
  components: {
    LoadingItem,
  },
  props: {
    mediaItems: Array,
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isLoading: "loadingItem/isLoading",
      numberOfItemsPerPagination: "loadingItem/numberOfItemsPerPagination",
    }),
  },
  methods: {
    switchThumb() {
      this.isThumb = !this.isThumb;
    },
    select(mediaItem) {
      this.$store.dispatch("playlist/addPlaylistVisitCount", mediaItem.id);
    },
  },
  created() {
    this.isMobile = this.mobileCheck();
  },
};
</script>
