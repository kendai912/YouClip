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
            v-bind:search-input.sync="searchquery"
            v-on:keydown.enter="YTsearch"
            placeholder="キーワードまたはYouTubeのURLを入力222"
            cache-items
            hide-no-data
            clearable
            dense
          >
            <template v-slot:append-outer>
              <v-icon v-on:click="YTsearch">search</v-icon>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import router from "../router";

export default {
  data() {
    return {
      model: null,
      searchquery: null
    };
  },
  computed: {
    ...mapGetters({})
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
        router
          .push({
            path: "/youtube",
            query: { v: youtubeId[2] }
          })
          .catch(err => {});
      } else {
        //キーワードの場合、検索結果表示へ
        this.$store.commit("YTsearch/setYTsearchQuery", this.searchquery);
        this.$store.commit("YTsearch/YTsearchResultPageTransit");
      }

      window.location.reload();
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {}
};
</script>
