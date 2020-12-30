<template>
  <v-container class="pa-0 pb-3">
    <v-row
      v-for="(item, index) in mediaItems"
      v-bind:key="item.category + '-' + item.id"
      dense
      class="pa-0 ma-0 mb-1"
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
            style="overflow: hidden;"
            v-on:click.stop="select(item)"
          >
            <v-img
              class="white--text align-end rounded"
              v-bind:src="thumbStoragePath + item.preview"
              v-bind:alt="item.title"
              width="100%"
              min-height="170"
              style="z-index: 1;"
            >
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
              width="100%"
              style="position: absolute; top: 0; left: 0; z-index: 2; border-radius: 4px; object-fit: cover;"
            ></video>
          </v-card>

          <v-card-title
            v-on:click.stop="select(item)"
            class="pt-2 px-2 pb-1 ma-0"
            ><span class="home-and-search-result-title">{{
              item.title
            }}</span></v-card-title
          >
          <v-card-text class="pl-2 ma-0 text--primary">
            <v-container
              v-on:click.stop="select(item)"
              class="ma-0 pa-0 grey--text text--darken-3"
              fluid
            >
              <v-row class="pa-0 ma-0" align-content="center">
                <v-col class="pa-0 ma-0 d-flex align-center">
                  <span style="font-size:12px;">
                    <v-icon small style="vertical-align: top;"
                      >mdi-timer-outline</v-icon
                    >
                    まとめ:&nbsp;{{ item.totalDuration }}&nbsp;
                    <v-icon small style="vertical-align: top;"
                      >mdi-arrow-left</v-icon
                    >
                    &nbsp;元のYouTube動画:&nbsp;{{
                      item.numberOfYTvideos
                    }}本の合計{{ item.totalYTDuration }}</span
                  >
                </v-col>
              </v-row>
              <v-row class="pa-0 ma-0" align-content="center">
                <v-col class="pa-0 ma-0 d-flex align-center">
                  <span style="font-size:12px;"
                    >{{ item.visitCount ? item.visitCount : 0 }}回視聴</span
                  ><span style="font-size:8px;"
                    >&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span
                  >
                  <span style="font-size:12px;">{{ item.timeSince }}前</span>
                </v-col>
              </v-row>
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
    showPreviewIndex: null,
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
  },
  created() {},
};
</script>
