<template>
  <div v-on:click="select">
    <div class="thumbnail">
      <img
        src="https://watanabeseiji.com/wordpress/wp-content/themes/cyber/images/noimage.jpg"
        style="width: 300px; height:auto"
      />
    </div>
    <div>{{ myPlaylistTag.playlistName }}</div>
    <v-chip v-for="tag in myPlaylistTag.tags" v-bind:key="tag.id" color="blue">
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
    myPlaylistTag: Object
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
            playlist: this.myPlaylistTag.id,
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
