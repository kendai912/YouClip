<template>
  <v-sheet elevation="0" class="search-box">
    <v-container class="ma-0 pa-0 text-center">
      <v-row class="ma-0 pa-0 activeSearch" align="center">
        <v-col cols="1" class="ma-0 pa-0 text-center">
          <v-icon v-on:click="YTsearch">search</v-icon>
        </v-col>
        <v-col class="ma-0 pa-0 my-autocomplete" align="center">
          <v-combobox
            v-model="model"
            v-bind:items="items"
            v-bind:search-input.sync="searchquery"
            v-on:keydown.enter="YTsearch"
            placeholder="YouTubeのキーワードまたはURLを入力"
            item-text="value"
            item-value="value"
            cache-items
            hide-no-data
            clearable
            dense
            class="ma-0 pa-0"
            ref="YTsearchInputBox"
          >
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-icon class="mr-4">
                  <v-icon v-on:click="YTsearchByItem(data.item.value)">{{
                    data.item.icon
                  }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content
                  v-on:click="YTsearchByItem(data.item.value)"
                >
                  <v-list-item-title
                    v-html="data.item.value"
                  ></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon style="min-width: 16px">
                  <v-img
                    src="/storage/icons/north_west.svg"
                    width="16px"
                    max-height="16px"
                    alt="search YouTube"
                    v-on:click="YTsearchByItem(data.item.value)"
                  ></v-img>
                </v-list-item-icon>
              </template>
            </template>
          </v-combobox>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  data() {
    return {
      model: null,
      searchquery: null,
    };
  },
  mixins: [myMixin],
  computed: {
    //検索候補
    ...mapGetters({
      searchCandidates: "YTsearch/candidates",
      isAdding: "tagging/isAdding",
      myPlaylistToSave: "tagging/myPlaylistToSave",
    }),
    //過去の検索履歴と人気の検索履歴を履歴優先で合計7件までサジェストに表示
    items() {
      let items = [];
      let itemLimit = 7;
      let itemCount = 0;

      //過去の検索履歴をサジェストに追加
      if (this.searchCandidates["searchHistoryCandidates"])
        this.searchCandidates["searchHistoryCandidates"].forEach((value) => {
          if (itemCount++ < itemLimit) {
            let item = {
              icon: "history",
              value: value.searchQuery,
            };
            items.push(item);
          }
        });

      //人気の検索履歴をサジェストに追加
      if (this.searchCandidates["topSearchqueriesCandidates"])
        this.searchCandidates["topSearchqueriesCandidates"].forEach((value) => {
          if (itemCount++ < itemLimit) {
            let item = {
              icon: "search",
              value: value.searchquery.searchQuery,
            };
            items.push(item);
          }
        });
      return items;
    },
  },
  watch: {
    async searchquery(input) {
      // Items have already been requested
      if (this.isLoading) return;

      //入力を元に検索候補を取得
      await this.$store.dispatch("YTsearch/getCandidates", input);
    },
  },
  methods: {
    ...mapMutations({
      setIsAdding: "tagging/setIsAdding",
    }),
    YTsearch(event) {
      // 日本語入力中のEnterキー操作は無効にする
      if (event.keyCode != undefined && event.keyCode !== 13) return;

      //空欄だった場合は検索実行せずリターン
      if (!this.searchquery || !this.searchquery.match(/\S/g)) return;

      //入力内容がYoutubeのURLかキーワードか判定
      let youtubeId = this.searchquery.match(/(\?v=|youtu.be\/)([^&]+)/);

      if (youtubeId) {
        //以前のシーンタグ入力項目を初期化
        this.clearTaggingInput();

        //YoutubeのURLの場合、直接再生ページへ
        if (this.isAdding) {
          //in case of adding to existing playlist
          this.$router
            .push({
              path: "/add/scene",
              query: {
                playlist: this.myPlaylistToSave,
                v: youtubeId[2],
              },
            })
            .catch((err) => {});
        } else {
          //in case of adding to new playlist
          this.$router
            .push({
              path: "/youtube/scene",
              query: { v: youtubeId[2] },
            })
            .catch((err) => {});
        }
      } else {
        //キーワードの場合、検索結果表示へ
        if (this.isAdding) {
          //in case of adding to existing playlist
          this.$store.commit("YTsearch/setYTsearchQuery", this.searchquery);
          this.$router
            .push({
              path: "/add/search",
              query: {
                playlist: this.myPlaylistToSave,
                search_query: this.searchquery,
              },
            })
            .catch((err) => {});
        } else {
          //in case of adding to new playlist
          if (this.$route.query.return == "true") {
            this.$store.commit("YTsearch/setYTsearchQuery", this.searchquery);
            this.$router
              .push({
                path: "/youtube",
                query: { search_query: this.searchquery, return: true },
              })
              .catch((err) => {});
          } else {
            this.$store.commit("YTsearch/setYTsearchQuery", this.searchquery);
            this.$router
              .push({
                path: "/youtube",
                query: { search_query: this.searchquery },
              })
              .catch((err) => {});
          }
        }
      }

      //インクリメンタルサーチの表示を消すためフォーカスを外す
      this.$refs.YTsearchInputBox.blur();
    },
    //インクリメンタルサーチをクリックし検索
    YTsearchByItem(item) {
      //検索結果を表示
      if (this.isAdding) {
        //in case of adding to existing playlist
        this.$store.commit("YTsearch/setYTsearchQuery", item);
        this.$router
          .push({
            path: "/add/search",
            query: {
              playlist: this.myPlaylistToSave,
              search_query: item,
            },
          })
          .catch((err) => {});
      } else {
        //in case of adding to new playlist
        if (this.$route.query.return == "true") {
          this.$store.commit("YTsearch/setYTsearchQuery", item);
          this.$router
            .push({
              path: "/youtube",
              query: { search_query: item, return: true },
            })
            .catch((err) => {});
        } else {
          this.$store.commit("YTsearch/setYTsearchQuery", item);
          this.$router
            .push({
              path: "/youtube",
              query: { search_query: item },
            })
            .catch((err) => {});
        }
      }
    },
  },
  async created() {
    await this.$store.dispatch("YTsearch/getCandidates");
  },
};
</script>
