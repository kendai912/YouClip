<template>
  <div>
    <div>
      <input
        id="YTsearchBox"
        type="text"
        v-model="YTsearchWord"
        v-on:input="YTsearchCandidates"
        placeholder="キーワードまたはYoutubeのURLを入力"
      />
      <span id="YTsearchBtn" v-on:click="YTsearch">
        <img alt="検索" src="/img/search.svg" />
      </span>
    </div>

    <!-- <div v-bind:class="{ candidatesWrap: candidates.length != 0 }" v-if="YTsearchWord != ''">
      <div v-for="(candidate, index) in candidates" v-bind:key="index">
        <div
          v-if="index < 10 && candidate.playlistName"
          class="item"
          v-bind:class="{ isEven: index % 2 == 1 }"
        >
          <p v-on:click="select(candidate.playlistName)">{{ candidate.playlistName }}</p>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import router from "../router";

export default {
  data() {
    return {
      YTsearchWord: ""
    };
  },
  computed: {
    // //検索候補
    // ...mapGetters({
    //   candidates: "search/candidates"
    // })
  },
  methods: {
    YTsearch() {
      if (this.YTsearchWord == "") return;

      //入力内容がYoutubeのURLかキーワードか判定
      let youtubeId = this.YTsearchWord.match(/(\?v=|youtu.be\/)([^&]+)/);
      if (youtubeId) {
        router
          .push({
            path: "/youtube",
            query: { v: youtubeId[2] }
          })
          .catch(err => {});
      } else {
        this.$store.commit("YTsearch/setYTsearchQuery", this.YTsearchWord);
        this.$store.dispatch("YTsearch/YTsearch");
        this.$store.commit("YTsearch/YTsearchResultPageTransit");
      }

      // IFrame Player APIを呼び出すためにページをリロード
      window.location.reload();
    },
    //入力を元に検索候補を取得
    YTsearchCandidates() {
      let input = $("#YTsearchBox").val();
      // this.$store.dispatch("search/searchCandidates", input);
    }
    //検索候補をクリックするとそのまま検索
    // select(candidateName) {
    //   this.YTsearchWord = candidateName;
    //   this.$store.commit("search/setSearchQuery", candidateName);
    //   this.$store.dispatch("search/search");
    //   this.$store.commit("search/searchResultPageTransit");
    // }
  },
  created() {}
};
</script>