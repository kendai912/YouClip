<template>
  <div v-if="myPlaylist.tags[0]" v-on:click="select">
    <div class="thumbnail">
      <img
        v-bind:src="thumbStoragePath + myPlaylist.tags[0].preview"
        style="width: 300px; height:auto"
      />
    </div>
    <div>{{ myPlaylist.playlistName }}</div>
    <v-chip v-for="tag in myPlaylist.tags" v-bind:key="tag.id" color="blue">
      <v-icon left>mdi-label</v-icon>
      <strong v-on:click.stop="search(tag.tags)">{{ tag.tags }}</strong>
    </v-chip>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  props: {
    myPlaylist: Object
  },
  data() {
    return {};
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      activeTab: "mypage/activeTab"
    })
  },
  methods: {
    select() {
      //再生ページを表示
      this.$router
        .push({
          path: "/watch",
          query: {
            playlist: this.myPlaylist.id,
            index: "0"
          }
        })
        .catch(err => {});

      // IFrame Player APIを呼び出すためにページをリロード
      window.location.reload();
    },
    search(tags) {
      //選択したタグの検索結果を表示
      this.$router
        .push({
          path: "result",
          query: { search_query: tags }
        })
        .catch(err => {});
    }
  },
  created() {}
};
</script>
