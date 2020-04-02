<template>
  <div>
    <div v-if="YTloading" class="loader">
      <img
        src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif"
        alt="loader"
      />
    </div>
    <div v-else v-for="item in YTitems" v-bind:key="item.etag" v-on:click="select(item)">
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
  computed: {
    ...mapGetters({
      YTloading: "YTsearch/YTloading"
    })
  },
  methods: {
    select(item) {
      //シーンタグ付けページを表示
      this.$router
        .push({
          path: "/youtube",
          query: {
            v: item.id.videoId
          }
        })
        .catch(err => {});
      location.reload();
    }
  }
};
</script>
