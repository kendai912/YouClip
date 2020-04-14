<template>
  <div>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="(item, key) in items" :key="item" v-on:click="setActiveTab(key)">{{ item }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <MyPlaylist
            v-for="myPlaylistTag in myPlaylistTagDataLoaded"
            v-bind:myPlaylistTag="myPlaylistTag"
            v-bind:key="myPlaylistTag.id"
          />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <MyScene
            v-for="myTagVideo in myTagVideoData"
            v-bind:myTagVideo="myTagVideo"
            v-bind:key="myTagVideo.id"
          />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import MyPlaylist from "../components/MyPlaylist.vue";
import MyScene from "../components/MyScene.vue";
import myMixin from "../util";

export default {
  components: {
    MyPlaylist,
    MyScene
  },
  props: {},
  data() {
    return {
      tab: null,
      items: ["プレイリスト", "シーン"]
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      myPlaylistTagDataLoaded: "playlist/myPlaylistTagDataLoaded",
      myTagVideoData: "tag/myTagVideoData"
    })
  },
  methods: {
    setActiveTab(key) {
      //開いたタブをセッションストレージに保存
      window.sessionStorage.setItem("tabIndex", JSON.stringify(key));
    }
  },
  async created() {
    //以前に開いていたタブをセッションストレージからセット
    this.tab = parseInt(window.sessionStorage.getItem("tabIndex"));
    //Likeまたは作成したプレイリストをロード
    await this.$store.dispatch("playlist/loadMyCreatedAndLikedPlaylist");
    //Likeまたは作成したタグをロード
    await this.$store.dispatch("tag/loadMyTagVideo");
  }
};
</script>
