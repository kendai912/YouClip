<template>
  <v-dialog v-model="showCommentReplyModal" max-width="360">
    <v-card>
      <!-- <v-btn icon dark small v-on:click="closeCommentReplyModal">
        <v-icon color="grey darken-1">mdi-close</v-icon>
      </v-btn> -->
      <v-row class="ma-0">
        <v-col class="mx-2 px-0">
          <v-textarea
            outlined
            rows="5"
            hide-details
            name="commentReply_box"
            label="公開コメントを入力"
            :placeholder="'公開コメントを入力\n(シーン番号 (半角)でシーンへのリンクが追加されます)'"
            class="pa-2"
            v-model="content"
          ></v-textarea>
          <div class="mt-3 text-right" style="color: #757575; font-size: 14px;">
            <a href="javascript:void(0)" style="color: grey" v-on:click="closeCommentReplyModal">キャンセル</a>&nbsp;&nbsp;
            <a href="javascript:void(0)" style="color: black" v-on:click="addReply">コメント</a>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      content: ""
    };
  },
  props: {
    parentId: Number
  },
  computed: {
    ...mapGetters({
      isLogin: "auth/check",
      user_id: "auth/user_id",
    }),
    showCommentReplyModal: {
      get() {
        return this.$store.getters["commentReplyModal/showCommentReplyModal"];
      },
      set() {
        return this.$store.commit("commentReplyModal/closeCommentReplyModal");
      }
    }
  },
  methods: {
    ...mapMutations({
      closeCommentReplyModal: "commentReplyModal/closeCommentReplyModal"
    }),
    async addReply() {
      if (this.$route.query.playlist) {
        if (this.isLogin) {
          const data = {
            playlist_id: this.$route.query.playlist,
            content: this.content,
            user_id: this.user_id,
            parent_id: this.parentId
          }
          await this.$store.dispatch("playlist/addPlaylistComment", data);
          this.$store.commit("commentReplyModal/closeCommentReplyModal")
        } else {
          this.$store.commit("noLoginModal/openLoginModal");
          this.$store.commit(
            "noLoginModal/setMessageWhenNotLogined",
            "プレイリストを作成するには、ログインしてください。(入力データは保持されます)"
          );
        }
      } else if (this.$route.query.tag) {
        if (this.isLogin) {
          const data = {
            tag_id: this.$route.query.tag,
            content: this.content,
            user_id: this.user_id,
            parent_id: this.parentId
          }
          await this.$store.dispatch("tag/addTagComment", data);
          this.$store.commit("commentReplyModal/closeCommentReplyModal")
        } else {
          this.$store.commit("noLoginModal/openLoginModal");
          this.$store.commit(
            "noLoginModal/setMessageWhenNotLogined",
            "プレイリストを作成するには、ログインしてください。(入力データは保持されます)"
          );
        }
      }
    }
  },
  created() {
  }
};
</script>