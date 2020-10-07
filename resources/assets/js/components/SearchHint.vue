<template>
  <transition name="fade-transition" mode="out-in">
    <SearchLoadingItem v-if="isLoadingSearchHint" />
    <v-card v-else class="text-center pa-3 ma-3" title elevation="0">
      <v-card-title v-if="searchHints" class="justify-center">{{ hintCategory }}</v-card-title>
      <v-card-text
        v-for="searchHint in searchHints"
        v-bind:key="searchHint.id"
        v-on:click="select(searchHint)"
        class="pa-2 ma-0 blue--text"
      >{{ searchHint }}</v-card-text>
    </v-card>
  </transition>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SearchLoadingItem from "../components/SearchLoadingItem.vue";
import myMixin from "../util";

export default {
  components: {
    SearchLoadingItem
  },
  props: {
    searchHints: Array,
    hintCategory: String
  },
  computed: {
    ...mapGetters({
      isLoadingSearchHint: "search/isLoadingSearchHint"
    })
  },
  methods: {
    //クリックするとそのまま検索
    select(searchHint) {
      this.$store.commit("search/setSearchQuery", searchHint);
      this.$store.dispatch("search/search");
      this.$store.commit("search/searchResultPageTransit");
    }
  }
};
</script>
