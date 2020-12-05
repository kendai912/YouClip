<template>
  <v-container class="pa-0 pb-3">
    <v-row
      v-for="item in mediaItems"
      v-bind:key="item.category + '-' + item.id"
      dense
      class="pa-0 ma-0 mb-1"
    >
      <v-col class="px-0" style="padding-top: 2px; paddint-bottom: 2px;">
        <v-card class="mx-auto" max-width="420" elevation="0">
          <v-hover v-if="!isMobile" v-slot:default="{ hover }">
            <v-img
              v-on:click.stop="select(item)"
              class="white--text align-end rounded"
              max-height="266.66px"
              v-bind:src="
                hover
                  ? gifStoragePath + item.previewgif
                  : thumbStoragePath + item.preview
              "
              v-bind:alt="item.title"
              aspect-ratio="1.7777"
            >
            </v-img>
          </v-hover>
          <v-img
            v-else
            v-on:click.stop="select(item)"
            class="white--text align-end rounded"
            max-height="266.66px"
            pressingItemId
            v-bind:src="
              pressingItemId === item.id
                ? gifStoragePath + item.previewgif
                : thumbStoragePath + item.preview
            "
            v-bind:alt="item.title"
            aspect-ratio="1.7777"
          >
          </v-img>

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
                    まとめ:&nbsp;{{ item.totalDuration }}&nbsp;
                    <v-icon small>mdi-arrow-left</v-icon>
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
    isMobile: false,
    pressingItemId: -1,
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
    longtapHandler(item) {
      this.pressingItemId = item.id;
    },
    upHandler(item) {
      if (this.pressingItemId != item.id) this.pressingItemId = -1;
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
  created() {
    this.isMobile = this.mobileCheck();
  },
};
</script>
