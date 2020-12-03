<template>
  <div class="container--small">
    <v-sheet
      class="ma-0 pa-0 highlight-header"
      height="60"
      elevation="0"
      align="center"
    >
      <v-container class="ma-0 pa-0" fluid fill-height>
        <v-row class="ma-0 pa-0" align="center" justify="center">
          <v-col class="ma-0 pa-0 text-center" cols="auto">
            <span>「{{ newPlaylistName }}」を保存しました！</span>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0" align="center" justify="center">
          <v-col class="ma-0 pa-0 text-center" cols="auto">
            <span>(マイページからいつでも確認・編集できます)</span>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
    </v-sheet>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  components: {},
  data() {
    return {};
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isLogin: "auth/check",
      newPlaylistId: "playlist/newPlaylistId",
      newPlaylistName: "playlist/newPlaylistName",
      newPreview: "playlist/newPreview",
      myPlaylistToSave: "tagging/myPlaylistToSave",
    }),
  },
  methods: {
    ...mapMutations({}),
    async initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);
    },
  },
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route() {
      this.initialize();
    },
  },
  mounted() {
    this.initialize();
  },
};
</script>
