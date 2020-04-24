<template>
  <div>
    <v-sheet color="grey lighten-3" fluid>
      <v-container class="ma-0 pa-0">
        <v-row class="ma-0 pa-0" align="center">
          <v-col cols="1" class="ma-0 pa-0 text-center">
            <v-icon>mdi-arrow-left</v-icon>
          </v-col>
          <v-col class="ma-0 pa-0">
            <v-autocomplete
              v-model="model"
              v-bind:items="items"
              v-bind:search-input.sync="search"
              item-text="Description"
              item-value="API"
              append-outer-icon="search"
              placeholder="プレイリストまたはシーンを入力"
              dense
              cache-items
            ></v-autocomplete>
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
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      descriptionLimit: 60,
      entries: [],
      // searchCandidates: null,
      model: null,
      search: null
      // searchWord: "",
    };
  },
  computed: {
    //検索候補
    ...mapGetters({
      // candidates: "search/candidates",
      searchCandidates: "search/searchCandidates"
      // searchHistoryCandidates: "search/searchHistoryCandidates",
      // topSearchqueriesCandidates: "search/topSearchqueriesCandidates"
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
    async search(input) {
      // Items have already been requested
      if (this.isLoading) return;

      //入力を元に検索候補を取得
      await this.$store.dispatch("search/getSearchCandidates", input);
    }
  },
  methods: {
    // search() {
    //   if (this.searchWord == "") return;
    //   this.$store.commit("search/setSearchQuery", this.searchWord);
    //   this.$store.commit("search/searchResultPageTransit");
    // },
    // //入力を元に検索候補を取得
    // searchCandidates() {
    //   let input = $("#searchBox").val();
    //   this.$store.dispatch("search/searchCandidates", input);
    // },
    // //検索候補をクリックするとそのまま検索
    // select(candidateName) {
    //   this.searchWord = candidateName;
    //   this.$store.commit("search/setSearchQuery", candidateName);
    //   this.$store.commit("search/searchResultPageTransit");
    // }
  },
  created() {}
};
</script>