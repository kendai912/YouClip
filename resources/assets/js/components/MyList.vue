<template>
  <div>
    <v-tabs v-model="tab" background-color="transparent" grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
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
  methods: {},
  async created() {
    //Likeまたは作成したプレイリストをロード
    await this.$store.dispatch("playlist/loadMyPlaylist");
    //Likeまたは作成したタグをロード
    await this.$store.dispatch("tag/loadMyTagVideo");
    console.log(this.myTagVideoData);
  }
};
</script>
