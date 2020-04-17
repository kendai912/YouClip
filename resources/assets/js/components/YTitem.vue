<template>
  <div>
    <div v-for="item in YTitems" v-bind:key="item.etag" v-on:click="select(item)">
      <div>
        <img
          v-bind:src="item.snippet.thumbnails.high.url"
          v-bind:alt="item.snippet.title + '-thumbnail'"
          style="width: 480px; height:360px"
        />
      </div>
      <div>
        <div>{{ item.snippet.title }}</div>
      </div>
      <br />
      {{ isYTLoading }}
    </div>
    <YTLoadingItem
      v-if="isYTLoading"
      v-bind:numberOfYTItemsPerPagination="numberOfYTItemsPerPagination"
    />
    <div v-if="isYTLoading">---------------------------</div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import YTLoadingItem from "../components/YTLoadingItem.vue";
import myMixin from "../util";

export default {
  components: {
    YTLoadingItem
  },
  props: {
    YTitems: Array
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isYTLoading: "YTsearch/isYTLoading",
      numberOfYTItemsPerPagination: "YTsearch/numberOfYTItemsPerPagination"
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
