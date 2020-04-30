<template>
  <v-sheet color="grey lighten-3" class="search-box" fluid>
    <v-container class="ma-0 pa-0 text-center">
      <v-row class="ma-0 pa-0" align="center">
        <v-col cols="1" class="ma-0 pa-0 text-center">
          <v-icon v-on:click="back">mdi-arrow-left</v-icon>
        </v-col>
        <v-col class="ma-0 pa-0">
          <v-autocomplete
            v-model="model"
            v-bind:items="items"
            v-bind:search-input.sync="searchquery"
            v-on:keydown.enter="search"
            placeholder="プレイリストまたはシーンを入力"
            cache-items
            hide-no-data
            clearable
            dense
          >
            <template v-slot:append-outer>
              <v-icon v-on:click="search">search</v-icon>
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
      searchquery: null
    };
  },
  computed: {
    //検索候補
    ...mapGetters({
      searchCandidates: "search/searchCandidates"
    }),
    //過去の検索履歴と人気の検索履歴を履歴優先で合計7件までサジェストに表示
    items() {
      let items = [];
      let itemLimit = 7;
      let itemCount = 0;

      //過去の検索履歴をサジェストに追加
      if (this.searchCandidates["searchHistoryCandidates"])
        this.searchCandidates["searchHistoryCandidates"].forEach(value => {
          if (itemCount++ < itemLimit) {
            items.push(value.searchQuery);
          }
        });

      //人気の検索履歴をサジェストに追加
      if (this.searchCandidates["topSearchqueriesCandidates"])
        this.searchCandidates["topSearchqueriesCandidates"].forEach(value => {
          if (itemCount++ < itemLimit) {
            items.push(value.searchquery.searchQuery);
          }
        });

      return items;
    }
  },
  watch: {
    async searchquery(input) {
      // Items have already been requested
      if (this.isLoading) return;

      //入力を元に検索候補を取得
      await this.$store.dispatch("search/getSearchCandidates", input);
    }
  },
  methods: {
    search(event) {
      // 日本語入力中のEnterキー操作は無効にする
      if (event.keyCode != undefined && event.keyCode !== 13) return;

      //空欄だった場合は検索実行せずリターン
      if (this.searchquery == "") return;

      this.$store.commit("search/setSearchQuery", this.searchquery);
      this.$store.commit("search/searchResultPageTransit");
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {}
};
</script>