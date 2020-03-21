<template>
  <div>
    <div v-for="item in YTitems" v-bind:key="item.etag" v-on:click="select(item)">
      <div class="thumbnail">
        <img
          v-bind:src="item.snippet.thumbnails.high.url"
          v-bind:alt="item.snippet.title + '-thumbnail'"
          style="width: 480px; height:360px"
        />
      </div>
      <div class="info">
        <div>{{ item.snippet.title }}</div>
      </div>
      <br />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import myMixin from "../util";

export default {
  props: {
    YTitems: Array
  },
  mixins: [myMixin],
  methods: {
    async select(item) {
      //シーンタグ付けページを表示
      this.$router
        .push({
          path: "/youtube",
          query: {
            v: item.id.videoId
          }
        })
        .catch(err => {});
    }
  }
};
</script>
