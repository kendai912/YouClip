<template>
  <div class="container--small">
    <h1>YTResult</h1>
    <div>
      <YTSearchBox />
    </div>
    <div>
      <YTitem v-bind:YTitems="YTresult" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import YTSearchBox from "../components/YTSearchBox.vue";
import YTitem from "../components/YTitem.vue";
import myMixin from "../util";

export default {
  components: {
    YTSearchBox,
    YTitem
  },
  mixins: [myMixin],
  methods: {},
  computed: {
    ...mapGetters({
      YTsearchQuery: "YTsearch/YTsearchQuery",
      YTresult: "YTsearch/YTresult"
    })
  },
  created() {
    //リロードされた場合はURLのsearch_queryを元に再度検索を実行
    if (!this.YTsearchQuery) {
      this.$store.commit(
        "YTsearch/setYTsearchQuery",
        this.$route.query.search_query
      );
      this.$store.dispatch("YTsearch/YTsearch");
    }
  }
};
</script>
