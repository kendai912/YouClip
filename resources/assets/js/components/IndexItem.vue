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

export default {
  props: {
    mediaItems: Array
  },
  methods: {
    async select(mediaItem) {
      //プレイリストの場合
      if (mediaItem.category == "playlist") {
        //プレイリストのIDと名前をwatchストアにセット
        this.$store.commit("watch/setCurrentPlaylistId", mediaItem.id);
        this.$store.commit("watch/setCurrentPlaylistName", mediaItem.title);

        //プレイリストIDからplaylistストアのplaylistTagDataに格納されているtagデータを取得
        let playlistTagArray = this.$store.getters[
          "playlist/getPlaylistTagContentById"
        ](mediaItem.id).tags;

        //tagデータとvideoデータを結合
        let playlistTagVideoArray = [];
        playlistTagArray.forEach(value => {
          playlistTagVideoArray.push(
            this.$store.getters["tag/getTagVideoContentById"](value.id)
          );
        });

        //Watchストアに再生のためのパラメータをセット
        this.$store.commit(
          "watch/setPlaylistParameters",
          playlistTagVideoArray
        );
      }

      //タグの場合
      if (mediaItem.category == "tag") {
        //tagIDからVideoIDを取得
        let tag_id = mediaItem.id;
        let video_id = this.$store.getters["tag/getTagVideoContentById"](tag_id)
          .video_id;

        //tagIDとvideIDをwatchストアにセット
        this.$store.commit("watch/setCurrentVideoId", video_id);
        this.$store.commit("watch/setCurrentTagId", tag_id);

        //VideoIDからtagデータ一覧を取得
        await this.$store.dispatch("video/getTagListByVideoId", video_id);
        let tagList = this.$store.getters["video/tagListOfVideo"];

        //tagデータとvideoデータを結合
        let indivisualTagVideoArray = [];
        tagList.forEach(value => {
          indivisualTagVideoArray.push(
            this.$store.getters["tag/getTagVideoContentById"](value.id)
          );
        });

        //Watchストアに再生のためのパラメータをセット
        this.$store.commit(
          "watch/setIndivisualParameters",
          indivisualTagVideoArray
        );
      }

      //再生ページを表示
      this.$router
        .push({
          path: "/watch",
          query: {
            playlist: "1",
            tag: "2",
            radio: "3"
          }
        })
        .catch(err => {});
    }
  }
};
</script>
