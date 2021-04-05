<template>
  <v-container class="pa-0 pb-3" ref="playlistMediaItemBox">
    <v-row
      v-for="(item, index) in mediaItems"
      v-bind:key="item.category + '-' + item.id"
      dense
      class="pa-0 ma-0 mb-1"
      ref="playlistMediaItem"
    >
      <v-col class="px-0" style="padding-top: 2px; paddint-bottom: 2px;">
        <v-card class="mx-auto" max-width="420" elevation="0">
          <v-card
            class="ma-0 pa-0"
            aspect-ratio="calc(16 / 9)"
            width="100%"
            elevation="0"
            v-on:mouseover="setShowPreviewIndex(index)"
            v-on:touchstart="setShowPreviewIndex(index)"
          >
            <router-link
              v-bind:to="{
                path: '/watch',
                query: { playlist: item.id, index: 0 },
              }"
              class="no-text-decoration"
            >
              <v-img
                class="white--text align-end rounded"
                v-bind:src="thumbStoragePath + item.preview"
                v-bind:alt="item.title"
                width="100%"
                min-height="170"
                style="z-index: 1;"
                eager
              >
              </v-img>
              <video
                v-if="showPreviewIndex == index || showPreviewIndex + 1 == index"
                v-bind:src="gifStoragePath + item.previewgif"
                autoplay
                playsinline
                muted
                loop
                disablePictureInPicture
                disableRemotePlayback
                width="100%"
                style="position: absolute; top: 0; left: 0; z-index: 2; border-radius: 4px; object-fit: cover;"
              ></video>
              <div
                v-if="item.isNewClip"
                v-bind:class="isMobile ? 'icon-new-mobile' : 'icon-new-pc'"
              ></div>
              <div class="ribbon-content">
                <span class="ribbon-text"
                  ><v-icon size="16">content_cut</v-icon>&nbsp;切り抜き</span
                >
              </div>
            </router-link>
          </v-card>

          <v-card-title class="pt-2 px-2 pb-1 ma-0">
            <router-link
              v-bind:to="{
                path: '/watch',
                query: { playlist: item.id, index: 0 },
              }"
              class="no-text-decoration"
            >
              <h3 class="home-and-search-result-title">
                {{ item.title }}
              </h3></router-link
            ></v-card-title
          >
          <v-card-text class="pl-2 ma-0 text--primary">
            <v-container class="ma-0 pa-0 grey--text text--darken-3" fluid>
              <router-link
                v-bind:to="{
                  path: '/watch',
                  query: { playlist: item.id, index: 0 },
                }"
                class="no-text-decoration"
              >
                <v-row class="pa-0 ma-0" align-content="center">
                  <v-col class="pa-0 ma-0 d-flex align-center">
                    <span style="font-size:12px;">
                      <v-icon
                        small
                        style="vertical-align: top; padding-top: 2px;"
                        >far fa-clock</v-icon
                      >
                      <span style="font-size: 6px">&nbsp;&nbsp;</span
                      ><span>{{ item.totalDuration }}</span
                      >&nbsp;⬅&nbsp;元の動画:&nbsp;{{
                        item.numberOfYTvideos
                      }}本の合計{{ item.totalYTDuration }}</span
                    >
                  </v-col>
                </v-row>
                <v-row class="pa-0 ma-0" align-content="center">
                  <v-col class="pa-0 ma-0 d-flex align-center">
                    <span style="font-size:12px;">
                      <v-icon
                        style="vertical-align: top; padding-top: 3px; font-size: calc(1rem * (14.222 / 14));"
                        >far fa-eye</v-icon
                      >
                      <span style="font-size: 6px">&nbsp;&nbsp;</span
                      ><span
                        >{{ item.visitCount ? item.visitCount : 0 }}回視聴</span
                      ><span>&nbsp;&#8226;&nbsp;</span
                      >{{ item.timeSince }}前</span
                    >
                  </v-col>
                </v-row>
              </router-link>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
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
    showPreviewIndex: 0,
    isMobile: false,
    now: "",
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
    setShowPreviewIndex(index) {
      this.showPreviewIndex = index;
    },
  },
  created() {
    this.isMobile = this.mobileCheck();
  },
};
</script>
