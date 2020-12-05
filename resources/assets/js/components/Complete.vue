<template>
  <div class="container--small">
    <v-sheet class="ma-0 pa-0" height="70" elevation="0" align="center">
      <v-container class="ma-0 pa-2" fluid fill-height>
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
    </v-sheet>

    <v-sheet class="mx-auto" max-width="420" elevation="0">
      <v-img
        v-on:click.stop="play"
        class="align-end rounded"
        max-height="266.66px"
        v-bind:src="thumbStoragePath + newPreview"
        v-bind:alt="newPlaylistName"
        aspect-ratio="1.7777"
      >
        <v-container
          class="ma-0 pa-2"
          fluid
          fill-height
          style="position: absolute; top: 0px;"
        >
          <v-row class="ma-0 pa-0" align="center" justify="center">
            <v-col class="ma-0 pa-0 text-center" cols="auto">
              <v-icon class="pa-0 ma-0" color="white" size="70"
                >play_circle_outline</v-icon
              >
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-sheet>

    <v-sheet class="mx-auto">
      <v-container class="ma-0 mt-4 pa-0" fluid>
        <v-row class="ma-0 pa-2">
          <v-col class="ma-0 pa-0 text-left"
            >「{{ newPlaylistName }}」の共有リンク:</v-col
          >
        </v-row>

        <v-row class="ma-0 pt-3 pb-2">
          <v-col
            class="text-center ma-0 pa-0"
            v-on:click="shareOnSNS"
            v-bind:data-href="
              'https://twitter.com/intent/tweet?url=' +
                encodedShareURI +
                '&text=[YouClip] ' +
                shareText
            "
          >
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-img
                  class="mx-auto"
                  width="44px"
                  aspect-ratio="1"
                  src="/storage/logos/twitter_square.png"
                  style="border-radius: 8px;"
                ></v-img>
              </v-col>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-card-text class="ma-0 pa-1 grey--text text--darken-3"
                  >Twitter</v-card-text
                >
              </v-col>
            </v-row>
          </v-col>
          <v-col
            class="text-center ma-0 pa-0"
            v-on:click="shareOnSNS"
            v-bind:data-href="
              'http://www.facebook.com/sharer.php?u=' + encodedShareURI
            "
          >
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-img
                  class="mx-auto"
                  width="44px"
                  aspect-ratio="1"
                  src="/storage/logos/facebook_square.png"
                  style="border-radius: 8px;"
                ></v-img>
              </v-col>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-card-text class="ma-0 pa-1 grey--text text--darken-3"
                  >Facebook</v-card-text
                >
              </v-col>
            </v-row>
          </v-col>
          <v-col
            class="text-center ma-0 pa-0"
            v-on:click="shareOnSNS"
            v-bind:data-href="
              'https://social-plugins.line.me/lineit/share?url=' +
                encodedShareURI
            "
          >
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-img
                  class="mx-auto"
                  width="44px"
                  aspect-ratio="1"
                  src="/storage/logos/line_square.png"
                  style="border-radius: 8px;"
                ></v-img>
              </v-col>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-card-text class="ma-0 pa-1 grey--text text--darken-3"
                  >LINE</v-card-text
                >
              </v-col>
            </v-row>
          </v-col>
          <v-col class="text-center ma-0 pa-0" v-on:click="copySelectedTagURL">
            <v-row class="ma-0 pa-0">
              <v-col class="d-flex justify-center ma-0 pa-0">
                <div
                  style="display: flex; justify-content: center; align-items: center;width: 44px; height: 44px; background-color: rgb(205,205,205); border-radius: 8px;"
                >
                  <i class="far fa-copy" style="font-size: 24px;"></i>
                </div>
              </v-col>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-card-text class="ma-0 pa-1 grey--text text--darken-3"
                  >URLをコピー</v-card-text
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
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
      shareUrl: "shareModal/shareUrl",
      shareText: "shareModal/shareText",
    }),
    encodedShareURI: function() {
      return encodeURIComponent(this.shareUrl);
    },
  },
  methods: {
    ...mapMutations({}),
    initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);

      if (!this.newPlaylistId) {
        this.$router
          .push({
            path: "/highlight",
          })
          .catch((err) => {});
      } else {
        //シェア用のパラメーターを設定
        this.$store.commit(
          "shareModal/setShareUrl",
          location.protocol +
            "//" +
            location.hostname +
            "/watch?playlist=" +
            this.myPlaylistToSave +
            "&index=0"
        );
        this.$store.commit("shareModal/setShareText", this.newPlaylistName);
      }
    },
    play() {
      //再生ページを表示
      this.$router
        .push({
          path: "/watch",
          query: {
            playlist: this.myPlaylistToSave,
            index: "0",
          },
        })
        .catch((err) => {});
    },
    shareOnSNS(e) {
      e.preventDefault();

      //共有先SNSのリンクを取得
      let URI = e.currentTarget.getAttribute("data-href");

      window.open(
        URI,
        "SNS_window",
        "width=600, height=500, menubar=no, toolbar=no, scrollbars=yes"
      );
    },
    copySelectedTagURL() {
      //bodyタグの末尾に設置
      $(document.body).append(
        '<div id="tmp_copy_for_range" style="position:fixed;right:100vw;font-size:16px;" readonly="readonly">' +
          this.shareUrl +
          "</div>" +
          '<div style="position:fixed;right:100vw;font-size:16px;"><input id="tmp_copy_for_select" readonly="readonly">' +
          this.shareUrl +
          "</input></div>"
      );

      //rangeファンクション用(iOS向け)
      try {
        var elm_range = $("#tmp_copy_for_range")[0];

        //rangeでtextarea内の文字を選択
        var range = document.createRange();
        range.selectNodeContents(elm_range);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (e) {}

      //execCommandを実施
      document.execCommand("copy");

      //selectファンクション用(iOS以外向け)
      try {
        var elm_select = $("#tmp_copy_for_select")[0];

        //select()でtextarea内の文字を選択
        elm_select.select();
        elm_select.setSelectionRange(0, 999999);
      } catch (e) {}

      //execCommandを実施
      document.execCommand("copy");

      //末尾に追加した要素を削除
      $(elm_range).remove();
      $(elm_select).remove();
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
