<template>
  <div>
    <div
      v-for="(item, index) in mediaItems"
      v-bind:key="item.category + index"
      v-on:click="select(item)"
    >
      <div class="thumbnail">
        <img
          v-bind:src="item.thumbnail"
          v-bind:alt="item.title + '-thumbnail'"
          style="width: 300px; height:auto"
        />
      </div>
      <div class="info">
        <div>{{ item.title }}</div>
        <div v-if="item.tagArray">
          {{ item.start }}〜{{ item.end }}
          <span
            v-for="tag in item.tagArray"
            v-bind:key="item + '.' + tag"
            class="tag"
          >{{ tag }}</span>
        </div>
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
    mediaItems: Array
  },
  mixins: [myMixin],
  methods: {
    async select(mediaItem) {
      //プレイリストの場合
      if (mediaItem.category == "playlist") {
        // //プレイリストのIDと名前をwatchストアにセット
        // this.$store.commit("watch/setPlaylistId", mediaItem.id);
        // this.$store.commit("watch/setPlaylistName", mediaItem.title);

        // //プレイリストIDからplaylistストアのplaylistTagDataに格納されているtagデータを取得
        // let playlistTagArray = this.$store.getters[
        //   "playlist/getPlaylistTagContentById"
        // ](mediaItem.id).tags;

        // //tagデータとvideoデータを結合
        // let playlistTagVideoArray = [];
        // playlistTagArray.forEach(value => {
        //   playlistTagVideoArray.push(
        //     this.$store.getters["tag/getTagVideoContentById"](value.id)
        //   );
        // });

        // //Watchストアに再生のためのパラメータをセット
        // this.$store.commit(
        //   "watch/setPlaylistParameters",
        //   playlistTagVideoArray
        // );

        //再生ページを表示
        this.$router
          .push({
            path: "/watch",
            query: {
              playlist: mediaItem.id,
              index: "0"
            }
          })
          .catch(err => {});
      }

      //タグの場合
      if (mediaItem.category == "tag") {
        //再生ページを表示
        this.$router
          .push({
            path: "/watch",
            query: {
              tag: mediaItem.id
            }
          })
          .catch(err => {});
      }

      // IFrame Player APIを呼び出すためにページをリロード
      window.location.reload();
    }
  }
};
</script>
