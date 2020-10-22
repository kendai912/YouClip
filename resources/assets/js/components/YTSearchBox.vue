<template>
  <v-sheet
    color="grey lighten-3"
    elevation="1"
    class="search-box pr-2"
  >
    <v-container class="ma-0 pa-0 text-center">
      <v-row class="ma-0 pa-0" align="center">
        <v-col cols="1" class="ma-0 pa-0 text-center">
          <v-icon v-on:click="YTsearch">search</v-icon>
        </v-col>
        <v-col class="ma-0 pa-0">
          <v-autocomplete
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
          >
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-icon class="mr-4">
                  <v-icon>{{ data.item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.value"
                  ></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon style="min-width: 16px">
                  <v-img
                    src="/storage/icons/north_west.svg"
                    width="16px"
                    max-height="16px"
                  ></v-img>
                </v-list-item-icon>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      model: null,
      searchquery: null,
    };
  },
  computed: {
    //検索候補
    ...mapGetters({
      searchCandidates: "YTsearch/candidates",
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
    YTsearch(event) {
      // 日本語入力中のEnterキー操作は無効にする
      if (event.keyCode != undefined && event.keyCode !== 13) return;

      //空欄だった場合は検索実行せずリターン
      if (this.searchquery == "") return;

      //前回の検索結果を空にする
      this.$store.commit("YTsearch/clearYTResult");

      //入力内容がYoutubeのURLかキーワードか判定
      let youtubeId = this.searchquery.match(/(\?v=|youtu.be\/)([^&]+)/);
      if (youtubeId) {
        //YoutubeのURLの場合、直接再生ページへ
        this.$router
          .push({
            path: "/youtube",
            query: { v: youtubeId[2] },
          })
          .catch((err) => {});
      } else {
        //キーワードの場合、検索結果表示へ
        this.$store.commit("YTsearch/setYTsearchQuery", this.searchquery);
        this.$store.commit("YTsearch/YTsearchResultPageTransit");
      }
      // window.location.reload();
    },
  },
  async created() {
    await this.$store.dispatch("YTsearch/getCandidates");
  },
};
</script>
