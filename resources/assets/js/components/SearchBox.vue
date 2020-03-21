<template>
  <div>
    <div>
      <input id="searchBox" type="text" v-model="searchWord" v-on:input="searchCandidates" />
      <span id="searchBtn" v-on:click="search">
        <img alt="検索" src="/img/search.svg" />
      </span>
    </div>

    <div v-bind:class="{ candidatesWrap: candidates.length != 0 }" v-if="searchWord != ''">
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
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      searchWord: ""
    };
  },
  computed: {
    //検索候補
    ...mapGetters({
      candidates: "search/candidates"
    })
  },
  methods: {
    search() {
      if (this.searchWord == "") return;
      this.$store.commit("search/setSearchQuery", this.searchWord);
      this.$store.dispatch("search/search");
      this.$store.commit("search/searchResultPageTransit");
    },
    //入力を元に検索候補を取得
    searchCandidates() {
      let input = $("#searchBox").val();
      this.$store.dispatch("search/searchCandidates", input);
    },
    //検索候補をクリックするとそのまま検索
    select(candidateName) {
      this.searchWord = candidateName;
      this.$store.commit("search/setSearchQuery", candidateName);
      this.$store.dispatch("search/search");
      this.$store.commit("search/searchResultPageTransit");
    }
  },
  created() {}
};
</script>