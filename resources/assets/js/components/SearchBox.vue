<template>
  <!-- <div> -->
  <v-sheet color="grey lighten-3" class="search-box" fluid>
    <v-container class="ma-0 pa-0">
      <v-row class="ma-0 pa-0" align="center">
        <v-col cols="1" class="ma-0 pa-0 text-center">
          <v-icon v-on:click="back">mdi-arrow-left</v-icon>
        </v-col>
        <v-col class="ma-0 pa-0">
          <v-autocomplete
            v-model="model"
            v-bind:value="value"
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

  <!-- <div>
      <input id="searchBox" type="text" v-model="searchWord" v-on:input="searchCandidates" />
      <span id="searchBtn" v-on:click="search">
        <img alt="検索" src="/img/search.svg" />
      </span>
  </div>-->

  <!-- <div v-bind:class="{ candidatesWrap: candidates.length != 0 }" v-if="searchWord != ''">
      <div v-for="(candidate, index) in candidates" v-bind:key="index">
        <div
          v-if="index < 10 && candidate.playlistName"
          class="item"
          v-bind:class="{ isEven: index % 2 == 1 }"
        >
          <p v-on:click="select(candidate.playlistName)">{{ candidate.playlistName }}</p>
        </div>
        <div
          v-if="index < 10 && candidate.tags"
          class="item"
          v-bind:class="{ isEven: index % 2 == 1 }"
        >
          <p v-on:click="select(candidate.tags)">{{ candidate.tags }}</p>
        </div>
        <div
          v-if="index < 10 && candidate.title"
          class="item"
          v-bind:class="{ isEven: index % 2 == 1 }"
        >
          <p v-on:click="select(candidate.title)">{{ candidate.title }}</p>
        </div>
      </div>
  </div>-->
  <!-- </div> -->
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      descriptionLimit: 60,
      entries: [],
      model: null,
      value: null,
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
      if (event.keyCode !== 13) return;

      //空欄だった場合は検索実行せずリターン
      if (this.searchquery == "") return;

      this.$store.commit("search/setSearchQuery", this.searchquery);
      this.$store.commit("search/searchResultPageTransit");
    },
    //検索候補をクリックするとそのまま検索
    select(candidateName) {
      this.searchWord = candidateName;
      this.$store.commit("search/setSearchQuery", candidateName);
      this.$store.commit("search/searchResultPageTransit");
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {}
};
</script>