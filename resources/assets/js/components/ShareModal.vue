<template>
  <div class="v-modal" v-on:click="closeShareModal">
    <div class="text-dark shadow rounded mb-7 modal-in-box" v-on:click.stop>
      <span v-on:click="copySelectedTagURL">コピーする</span>
      <!-- LINE -->
      <a
        v-on:click="shareOnSNS"
        v-bind:href="'https://social-plugins.line.me/lineit/share?url=' + encodedShareURI"
      >
        <img src="/img/wide-default.png" alt="LINEで送る" />
      </a>
      <!-- Facebook -->
      <a
        v-on:click="shareOnSNS"
        v-bind:href="'http://www.facebook.com/sharer.php?u=' + encodedShareURI"
      >
        <i class="fab fa-facebook-square fa-2x" style="color: #339af0;"></i>
      </a>
      <!-- twitter -->
      <a
        v-on:click="shareOnSNS"
        v-bind:href="'https://twitter.com/intent/tweet?url=' + encodedShareURI + '&text=[ScenePicks] ' + shareText"
      >
        <i class="fab fa-twitter fa-2x" style="color: #339af0;"></i>
      </a>
      <!-- はてブ -->
      <a
        v-on:click="shareOnSNS"
        v-bind:href="'https://b.hatena.ne.jp/entry/panel/?url=' + encodedShareURI"
      >
        <img src="/img/hatebu.svg" alt="はてブ!で共有" />
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    player: Object
  },
  computed: {
    ...mapGetters({
      showShareModal: "shareModal/showShareModal",
      shareUrl: "shareModal/shareUrl",
      shareText: "shareModal/shareText"
    }),
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
      let URI = e.currentTarget.getAttribute("href");

      window.open(
        URI,
        "SNS_window",
        "width=600, height=500, menubar=no, toolbar=no, scrollbars=yes"
      );
    },
    copySelectedTagURL() {
      //strを含んだtextareaをbodyタグの末尾に設置
      $(document.body).append(
        '<textarea id="tmp_copy" style="position:fixed;right:100vw;font-size:16px;" readonly="readonly">' +
          this.shareUrl +
          "</textarea>"
      );

      //elmはtextareaノード
      var elm = $("#tmp_copy")[0];

      //select()でtextarea内の文字を選択
      elm.select();

      //rangeでtextarea内の文字を選択
      var range = document.createRange();
      range.selectNodeContents(elm);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      elm.setSelectionRange(0, 999999);

      //execCommandを実施
      document.execCommand("copy");

      //textareaを削除
      $(elm).remove();

      //モーダルを閉じる
      this.closeShareModal();
    }
  }
};
</script>