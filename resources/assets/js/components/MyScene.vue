<template>
  <div v-on:click="select">
    <div class="thumbnail">
      <img
        v-bind:src="thumbStoragePath + myTagVideo.preview"
        style="width: 300px; height:auto"
      />
    </div>
    <div>{{ myTagVideo.title }}</div>
    <v-chip
      v-for="tag in myTagVideo.tags.split(/::/)"
      v-bind:key="tag"
      color="blue"
    >
      <v-icon left>mdi-label</v-icon>
      <strong v-on:click.stop="search(tag)">{{ tag }}</strong>
    </v-chip>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  props: {
    myTagVideo: Object,
  },
  data() {
    return {};
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      activeTab: "mypage/activeTab",
    }),
  },
  methods: {
    select() {
      //再生ページを表示
      this.$router
        .push({
          path: "/watch",
          query: {
            tag: this.myTagVideo.tag_id,
          },
        })
        .catch((err) => {});

      // IFrame Player APIを呼び出すためにページをリロード
      window.location.reload();
    },
    search(tag) {
      //選択したタグの検索結果を表示
      this.$router
        .push({
          path: "result",
          query: { search_query: tag },
        })
        .catch((err) => {});
    },
  },
  created() {},
};
</script>
