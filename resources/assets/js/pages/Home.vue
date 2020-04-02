<template>
  <div class="container--small">
    <ul class="tab">
      <li
        class="tab__item"
        v-bind:class="{ 'tab__item--active': tab == 1 }"
        v-on:click="tab = 1"
      >カテゴリ1</li>
      <li
        class="tab__item"
        v-bind:class="{ 'tab__item--active': tab == 2 }"
        v-on:click="tab = 2"
      >カテゴリ2</li>
      <li
        class="tab__item"
        v-bind:class="{ 'tab__item--active': tab == 3 }"
        v-on:click="tab = 3"
      >カテゴリ3</li>
    </ul>
    <div class="panel" v-show="tab === 1">
      <IndexItem v-bind:mediaItems="mediaItems" />
    </div>
    <div class="panel" v-show="tab === 2">
      <h1>カテゴリ2の中身</h1>
    </div>
    <div class="panel" v-show="tab === 3">
      <h1>カテゴリ3の中身</h1>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import IndexItem from "../components/IndexItem.vue";
import myMixin from "../util";

export default {
  components: {
    IndexItem
  },
  data() {
    return {
      tab: 1
    };
  },
  mixins: [myMixin],
  methods: {
    //i:s形式に変換
    formatToMinSec(His) {
      let min =
        parseInt(His.split(":")[0], 10) * 60 + parseInt(His.split(":")[1], 10);
      let sec = parseInt(His.split(":")[2], 10);
      return min + ":" + sec;
    }
  },
  computed: {
    ...mapGetters({
      tagVideoData: "tag/tagVideoData",
      playlistTagData: "playlist/playlistTagData"
    }),
    //レコメンド画面に表示するアイテム
    mediaItems() {
      let mediaItems = [];

      //タグデータをレコメンド画面に表示するメディアアイテムに格納
      this.putTagVideoIntoMediaItems(mediaItems, this.tagVideoData);

      //プレイリストデータをメディアアイテムに追加格納
      this.putPlaylistTagIntoMediaItems(mediaItems, this.playlistTagData);

      //作成日の降順(新しい日付が上)に並び替え
      return mediaItems.sort((a, b) => {
        return a.created_at < b.created_at
          ? 1
          : a.created_at > b.created_at
          ? -1
          : 0;
      });
    }
  }
};
</script>
