<template>
  <v-sheet class="pb-15">
    <transition-group name="fade-transition" mode="out-in">
      <v-card
        v-for="(item, index) in YTitems"
        v-bind:key="item.youtubeId + index"
        class="mx-auto"
        max-width="420"
        elevation="0"
      >
        <v-container class="px-3 my-3">
          <v-row
            v-on:click="select(item)"
            justify="center"
            align-content="center"
            class="pa-0 ma-0"
          >
            <v-col cols="11" class="pa-0 ma-0">
              <v-row class="pa-0 ma-0">
                <v-col cols="6" class="pa-0 ma-0">
                  <v-img
                    v-bind:src="item.thumbnails"
                    v-bind:alt="item.title + '-thumbnail'"
                    class="white--text align-end right"
                    width="100%"
                    aspect-ratio="1.7777"
                  >
                    <!-- <v-container class="pa-0 ma-0">
                  <v-row class="pa-0 ma-1 d-flex justify-end">
                    <v-col
                      cols="auto"
                      class="pa-1 ma-0 text-center black lighten-2 font-weight-bold opacity-background corner-radius"
                    >{{ item.duration }}</v-col>
                  </v-row>
                </v-container> -->
                  </v-img>
                </v-col>

                <v-col cols="6" class="pa-0 ma-0">
                  <v-list-item class="px-2 ma-0">
                    <v-list-item-content>
                      <v-list-item-title class="wrap-text">{{
                        item.title
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        item.channelTitle
                      }}</v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <!-- <span>{{ convertNumDigit(item.viewCount) }}回視聴</span>
                    <span>{{ timeSince(item.publishedAt) }}前</span> -->
                        <span>{{ item.viewCount }}</span>
                        <span>{{ item.publishedAt }}</span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1" class="pa-0 ma-auto text-center">
              <div class="ma-auto" style="width: 20px; height: 20px;">
                <span>
                  <!-- <i class="fas fa-keyboard_arrow_right my-grey"></i> -->
                  <v-img
                    src="/storage/icons/keyboard_arrow_right.svg"
                    width="28px"
                    max-height="28px"
                  />
                </span>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <YTLoadingItem
        v-if="isYTLoading"
        v-bind:numberOfYTItemsPerPagination="numberOfYTItemsPerPagination"
        key="YTLoadingItem"
      />
    </transition-group>
  </v-sheet>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import YTLoadingItem from "../components/YTLoadingItem.vue";
import myMixin from "../util";

export default {
  components: {
    YTLoadingItem,
  },
  props: {
    YTitems: Array,
  },
  data() {
    return {
      isAdding: false,
      playlistIdToAdd: null,
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isYTLoading: "YTsearch/isYTLoading",
      numberOfYTItemsPerPagination: "YTsearch/numberOfYTItemsPerPagination",
    }),
  },
  methods: {
    select(item) {
      //以前のシーンタグ入力項目を初期化
      this.clearTaggingInput();

      if (this.isAdding) {
        //プレイリストへの追加用のシーンタグ付けページを表示
        this.$router
          .push({
            path: "/add/highlight",
            query: {
              playlist: this.playlistIdToAdd,
              v: item.youtubeId,
            },
          })
          .catch((err) => {});
      } else {
        //シーンタグ付けページを表示
        this.$router
          .push({
            path: "/youtube/highlight",
            query: {
              v: item.youtubeId,
            },
          })
          .catch((err) => {});
      }
    },
  },
  created() {
    if (this.$route.path == "/add") {
      this.isAdding = true;
      this.playlistIdToAdd = this.$route.query.playlist;
    }
  },
};
</script>
