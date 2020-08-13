<template>
  <v-bottom-sheet v-model="showShareModal" max-width="400px">
    <v-sheet class="mx-auto">
      <v-container class="ma-0 pa-0" fluid>
        <v-row class="ma-0 pa-2">
          <v-col class="ma-0 pa-0">共有方法を選択</v-col>
        </v-row>

        <v-row class="ma-0 pa-">
          <v-col class="ma-0 pa-0">
            <v-divider></v-divider>
          </v-col>
        </v-row>

        <v-row class="ma-0 pt-3 pb-2">
          <v-col
            class="text-center ma-0 pa-0"
            v-on:click="shareOnSNS"
            v-bind:data-href="'https://twitter.com/intent/tweet?url=' + encodedShareURI + '&text=[YouClip] ' + shareText"
          >
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-img
                  class="mx-auto"
                  width="44px"
                  aspect-ratio="1"
                  src="../storage/logos/twitter_square.png"
                  style="border-radius: 8px;"
                ></v-img>
              </v-col>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-card-text class="grey--text text--darken-3">Twitter</v-card-text>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            class="text-center ma-0 pa-0"
            v-on:click="shareOnSNS"
            v-bind:data-href="'http://www.facebook.com/sharer.php?u=' + encodedShareURI"
          >
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-img
                  class="mx-auto"
                  width="44px"
                  aspect-ratio="1"
                  src="../storage/logos/facebook_square.png"
                  style="border-radius: 8px;"
                ></v-img>
              </v-col>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-card-text class="grey--text text--darken-3">Facebook</v-card-text>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            class="text-center ma-0 pa-0"
            v-on:click="shareOnSNS"
            v-bind:data-href="'https://social-plugins.line.me/lineit/share?url=' + encodedShareURI"
          >
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-img
                  class="mx-auto"
                  width="44px"
                  aspect-ratio="1"
                  src="../storage/logos/line_square.png"
                  style="border-radius: 8px;"
                ></v-img>
              </v-col>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <v-card-text class="grey--text text--darken-3">LINE</v-card-text>
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
                <v-card-text class="grey--text text--darken-3">URLをコピー</v-card-text>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="ma-0 pa-0">
          <v-col class="ma-0 pa-0">
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-2">
          <v-col class="text-center ma-0 pa-0">
            <v-btn
              class="ma-0 pa-0"
              text
              v-on:click="closeShareModal"
              width="100%"
              color="grey darken-3"
            >キャンセル</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
  <!-- <div class="v-modal" v-on:click="closeShareModal">
    <div class="text-dark shadow rounded mb-7 modal-in-box" v-on:click.stop>
      <span v-on:click="copySelectedTagURL">コピーする</span>
      <a
        v-on:click="shareOnSNS"
        v-bind:href="'https://social-plugins.line.me/lineit/share?url=' + encodedShareURI"
      >
        <img src="/img/wide-default.png" alt="LINEで送る" />
      </a>
      <a
        v-on:click="shareOnSNS"
        v-bind:href="'http://www.facebook.com/sharer.php?u=' + encodedShareURI"
      >
        <i class="fab fa-facebook-square fa-2x" style="color: #339af0;"></i>
      </a>
      <a
        v-on:click="shareOnSNS"
        v-bind:href="'https://twitter.com/intent/tweet?url=' + encodedShareURI + '&text=[YouClip] ' + shareText"
      >
        <i class="fab fa-twitter fa-2x" style="color: #339af0;"></i>
      </a>
    </div>
  </div>-->
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    player: Object
  },
  computed: {
    ...mapGetters({
      shareUrl: "shareModal/shareUrl",
      shareText: "shareModal/shareText"
    }),
    showShareModal: {
      get() {
        this.player.pauseVideo();
        return this.$store.getters["shareModal/showShareModal"];
      },
      set() {
        this.player.playVideo();
        return this.$store.commit("shareModal/closeShareModal");
      }
    },
    encodedShareURI: function() {
      return encodeURIComponent(this.shareUrl);
    }
  },
  methods: {
    closeShareModal() {
      this.$store.commit("shareModal/closeShareModal");

      //プレイヤーを再開
      this.player.playVideo();
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
          '<input id="tmp_copy_for_select" style="position:fixed;right:100vw;font-size:16px;" readonly="readonly">' +
          this.shareUrl +
          "</input>"
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

      //モーダルを閉じる
      this.closeShareModal();
    }
  }
};
</script>