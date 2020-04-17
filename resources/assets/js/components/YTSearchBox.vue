<template>
  <div>
    <div>
      <input
        id="YTsearchBox"
        type="text"
        v-model="YTsearchWord"
        placeholder="キーワードまたはYoutubeのURLを入力"
      />
      <span id="YTsearchBtn" v-on:click="YTsearch">
        <img alt="検索" src="/img/search.svg" />
      </span>
    </div>
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
    ...mapGetters({})
  },
  methods: {
    YTsearch() {
      if (this.YTsearchWord == "") return;

      //前回の検索結果を空にする
      this.$store.commit("YTsearch/clearYTResult");

      //入力内容がYoutubeのURLかキーワードか判定
      let youtubeId = this.YTsearchWord.match(/(\?v=|youtu.be\/)([^&]+)/);
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
        this.$store.commit("YTsearch/setYTsearchQuery", this.YTsearchWord);
        this.$store.commit("YTsearch/YTsearchResultPageTransit");
      }

      window.location.reload();
    }
  },
  created() {}
};
</script>
