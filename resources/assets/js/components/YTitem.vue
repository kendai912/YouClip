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
                    v-bind:src="item.thumbnail"
                    v-bind:alt="item.title + '-thumbnail'"
                    class="white--text align-end right rounded"
                    width="100%"
                    aspect-ratio="1.7777"
                  >
                    <v-container v-if="item.duration" class="pa-0 ma-0">
                      <v-row class="pa-0 ma-1 d-flex justify-end">
                        <v-col
                          cols="auto"
                          class="pa-1 ma-0 text-center black lighten-2 font-weight-bold opacity-background corner-radius"
                          >{{ formatToMinSec(item.duration) }}</v-col
                        >
                      </v-row>
                    </v-container>
                  </v-img>
                </v-col>

                <v-col cols="6" class="pa-0 ma-0">
                  <v-list-item class="px-2 ma-0">
                    <v-list-item-content>
                      <div class="wrap-text">{{ item.title }}</div>
                      <v-list-item-subtitle>
                        <span class="wrap-text"
                          >{{ item.channel_title }}
                        </span></v-list-item-subtitle
                      >
                      <v-list-item-subtitle>
                        <span v-if="item.view_count"
                          >{{ convertNumDigit(item.view_count) }}回視聴</span
                        >
                        <span v-if="item.num_views"
                          >{{ item.published_at }}前</span
                        >
                        <span v-else>{{ timeSince(item.published_at) }}前</span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1" class="pa-0 ma-auto text-center">
              <div class="ma-auto" style="width: 20px; height: 20px;">
                <span>
                  <v-img
                    src="/storage/icons/keyboard_arrow_right.svg"
                    width="28px"
                    max-height="28px"
                    alt="Open YouTube item"
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
import { mapState, mapGetters, mapMutations } from "vuex";
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
    return {};
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isYTLoading: "YTsearch/isYTLoading",
      isYTLoading: "YTsearch/isYTLoading",
      numberOfYTItemsPerPagination: "YTsearch/numberOfYTItemsPerPagination",
      isAdding: "tagging/isAdding",
      myPlaylistToSave: "tagging/myPlaylistToSave",
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
            path: "/add/scene",
            query: {
              playlist: this.myPlaylistToSave,
              v: item.youtubeId,
            },
          })
          .catch((err) => {});
      } else {
        //シーンタグ付けページを表示
        this.$router
          .push({
            path: "/youtube/scene",
            query: {
              v: item.youtubeId,
            },
          })
          .catch((err) => {});
      }
    },
  },
  created() {},
};
</script>
