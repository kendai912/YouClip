<template>
  <div>
    <p>{{ hintCategory }}</p>
    <div
      v-for="searchHint in searchHints"
      v-bind:key="searchHint.id"
      v-on:click="select(searchHint)"
    >{{ searchHint }}</div>
  </div>
</template>
<script>
export default {
  props: {
    searchHints: Array,
    hintCategory: String
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
