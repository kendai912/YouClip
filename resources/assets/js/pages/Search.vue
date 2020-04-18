<template>
  <div class="container--small">
    <SearchBox />
    <SearchHint
      v-bind:searchHints="topSearchqueries"
      v-bind:hintCategory="topSearchquery"
    />
    <SearchHint
      v-if="isLogin"
      v-bind:searchHints="searchHistories"
      v-bind:hintCategory="searchHistory"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SearchBox from "../components/SearchBox.vue";
import SearchHint from "../components/SearchHint.vue";

export default {
  components: {
    SearchBox,
    SearchHint,
  },
  data() {
    return {
      topSearchquery: "人気の検索",
      searchHistory: "検索履歴",
    };
  },
  computed: {
    //ログインチェック
    ...mapGetters({
      isLogin: "auth/check",
    }),
    //人気の検索ワード
    ...mapGetters({
      topSearchqueries: "search/topSearchqueries",
    }),
    //検索履歴
    ...mapGetters({
      searchHistories: "search/searchHistories",
    }),
  },
  created() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);

    //人気の検索ワードを取得
    this.$store.dispatch("search/getTopSearchqueries");
    //検索履歴を取得
    this.$store.dispatch("search/getSearchHistories");
  },
};
</script>
