<template>
  <div style="padding-bottom: 72px">
    <v-divider></v-divider>
    <v-expansion-panels v-model="panelComment">
      <v-expansion-panel key="panelComment">
        <v-expansion-panel-header
          v-bind:class="{
            commentListExpansionPanelCustomHeader:
              panelComment !== 0 && mostLikesItem,
          }"
          class="ma-0 pl-3 pr-2"
        >
          <span class="ma-0 pa-0 pt-1"
            >コメント&nbsp;&#8226;&nbsp;{{ getTotal(mediaItems) }}</span
          >
          <div
            v-if="panelComment !== 0 && mostLikesItem"
            v-bind:class="{
              commentListExpansionPanelCustomHeaderContent:
                panelComment !== 0 && mostLikesItem,
            }"
          >
            <div class="placeholder-color">
              {{ mostLikesItem.name }}
            </div>
            <div class="mostLikedComment-body py-1">
              {{ mostLikesItem.content }}
            </div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="ma-0 py-1 pl-3 pr-1">
            <v-col cols="auto" class="ma-0 pa-0 text-center">
              <v-avatar size="32" class="mt-2">
                <i class="fas fa-user-circle fa-2x" style="color:grey;"></i>
              </v-avatar>
            </v-col>
            <v-col class="ma-0 pa-0">
              <v-form ref="form">
                <v-textarea
                  v-model="content"
                  v-bind:rules="commentRules"
                  outlined
                  rows="3"
                  hide-details
                  name="comment_box"
                  :placeholder="'コメントを入力'"
                  class="pa-2"
                ></v-textarea>
              </v-form>
            </v-col>
          </v-row>
          <div class="text-right mx-3">
            <a
              href="javascript:void(0)"
              style="color: grey"
              v-on:click="resetComment"
              >キャンセル</a
            >&nbsp;&nbsp;&nbsp;
            <a
              href="javascript:void(0)"
              style="color: black"
              v-on:click="addComment"
              >コメント</a
            >
          </div>
          <v-row
            v-for="(item, index) in mediaItems"
            v-bind:key="index + '-' + item.id"
            dense
            class="ma-0 py-1 pl-3 pr-1"
          >
            <v-col cols="auto" class="ma-0 pa-0 text-center">
              <v-avatar size="32" class="mt-2">
                <v-img
                  v-if="item.avatar"
                  v-bind:src="avatarStoragePath + item.avatar"
                  alt="commented user pic"
                ></v-img>
                <i
                  v-else
                  class="fas fa-user-circle fa-2x"
                  style="color:grey;"
                ></i>
              </v-avatar>
            </v-col>
            <v-col class="ma-0 pa-2">
              <div class="placeholder-color">
                {{ item.name }}
              </div>
              <div class="comment-body py-1">
                {{ item.content }}
              </div>
              <div class="placeholder-color">
                {{ timeSince(item.comment_publishedAt) }}前 &nbsp;
                <v-icon
                  size="16"
                  v-on:click="likeComment(item)"
                  :color="item.isLiked ? 'red' : 'grey'"
                  >fas fa-heart</v-icon
                >{{ item.likes_count }}
                &nbsp;
                <v-icon size="16" v-on:click="addCommentReply(item.comment_id)"
                  >comment</v-icon
                >{{ item.replies.length }}
              </div>
              <div v-if="item.replies.length">
                <a
                  href="javascript:void(0)"
                  style="color: grey; font-size:13px;"
                  v-on:click="showReplies(index)"
                  >{{
                    !isOpened(index) ? "他の返信を表示" : "他の返信を非表示"
                  }}</a
                >
              </div>
              <v-row
                v-show="isOpened(index)"
                class="ma-0 pa-0"
                v-for="(replyItem, index1) in item.replies"
                v-bind:key="index1 + '-' + replyItem.id"
              >
                <v-col cols="auto" class="ma-0 pa-1 text-center">
                  <v-avatar size="24" class="mt-2">
                    <v-img
                      v-if="item.avatar"
                      v-bind:src="avatarStoragePath + replyItem.avatar"
                      alt="commented user pic"
                    ></v-img>
                    <i
                      v-else
                      class="fas fa-user-circle fa-2x"
                      style="color:grey;"
                    ></i>
                  </v-avatar>
                </v-col>
                <v-col class="ma-0 pa-2">
                  <div class="placeholder-color">
                    {{ replyItem.name }}
                  </div>
                  <div class="comment-body py-1">
                    {{ replyItem.content }}
                  </div>
                  <div class="placeholder-color">
                    {{ timeSince(replyItem.comment_publishedAt) }}前 &nbsp;
                    <v-icon
                      size="16"
                      v-on:click="likeComment(replyItem)"
                      :color="replyItem.isLiked ? 'red' : 'grey'"
                      >fas fa-heart</v-icon
                    >{{ replyItem.likes_count }}
                    &nbsp;
                    <v-icon
                      size="16"
                      v-on:click="addCommentReply(item.comment_id)"
                      >comment</v-icon
                    >
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <NoLoginModal v-if="showLoginModal" />
    <CommentReplyModal
      v-if="showCommentReplyModal"
      v-bind:parentId="parentId"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import NoLoginModal from "../components/NoLoginModal.vue";
import CommentReplyModal from "../components/CommentReplyModal.vue";
import myMixin from "../util";

export default {
  components: {
    NoLoginModal,
    CommentReplyModal,
  },
  data() {
    return {
      showReplyList: [],
      content: "",
      parentId: 0,
      commentRules: [(v) => !!v || "コメントを入力して下さい"],
      mostLikesItem: null,
      panelComment: 0,
    };
  },
  props: {
    mediaItems: Array,
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      playlistId: "watch/playlistId",
      listIndex: "watch/listIndex",
      commentListofPlaylist: "playlist/commentListofPlaylist",
      user_id: "auth/user_id",
      showLoginModal: "noLoginModal/showLoginModal",
      showCommentReplyModal: "commentReplyModal/showCommentReplyModal",
      isLogin: "auth/check",
    }),
  },
  methods: {
    getTotal(items) {
      let total = items.length;
      items.forEach((item) => {
        total += item.replies.length;
      });
      return total;
    },
    async addComment() {
      if (this.$route.query.playlist) {
        if (this.isLogin) {
          if (this.$refs.form.validate()) {
            const data = {
              playlist_id: this.$route.query.playlist,
              content: this.content,
              user_id: this.user_id,
              parent_id: 0,
            };
            await this.$store.dispatch("playlist/addPlaylistComment", data);
            this.content = "";
          }
        } else {
          this.$store.commit("noLoginModal/openLoginModal");
          this.$store.commit(
            "noLoginModal/setMessageWhenNotLogined",
            "切り抜きを作成するには、ログインしてください。(入力データは保持されます)"
          );
        }
      } else if (this.$route.query.tag) {
        if (this.isLogin) {
          if (this.$refs.form.validate()) {
            const data = {
              tag_id: this.$route.query.tag,
              content: this.content,
              user_id: this.user_id,
              parent_id: 0,
            };
            await this.$store.dispatch("tag/addTagComment", data);
            this.content = "";
          }
        } else {
          this.$store.commit("noLoginModal/openLoginModal");
          this.$store.commit(
            "noLoginModal/setMessageWhenNotLogined",
            "切り抜きを作成するには、ログインしてください。(入力データは保持されます)"
          );
        }
      }
    },
    resetComment() {
      this.content = "";
    },
    async likeComment(comment) {
      if (this.isLogin) {
        const data = {
          user_id: this.user_id,
          comment_id: comment.comment_id,
          parent_id: comment.parent_id,
          cmt_option: 1,
          isLiked: !comment.isLiked,
        };
        if (this.$route.query.playlist) {
          data.cmt_option = 1;
          await this.$store.dispatch("playlist/likeComment", data);
        } else if (this.$route.query.tag) {
          data.cmt_option = 0;
          await this.$store.dispatch("tag/likeComment", data);
        }
      } else {
        this.$store.commit("noLoginModal/openLoginModal");
        this.$store.commit(
          "noLoginModal/setMessageWhenNotLogined",
          "切り抜きを作成するには、ログインしてください。(入力データは保持されます)"
        );
      }
    },
    showReplies(cmtIndex) {
      if (this.isOpened(cmtIndex)) {
        const index = this.showReplyList.indexOf(cmtIndex);
        if (index > -1) {
          this.showReplyList.splice(index, 1);
        }
      } else {
        this.showReplyList.push(cmtIndex);
      }
    },
    isOpened(cmtIndex) {
      return this.showReplyList.includes(cmtIndex);
    },
    addCommentReply(parentId) {
      this.parentId = parentId;
      this.$store.commit("commentReplyModal/openCommentReplyModal");
    },
    getMostLikesItem(commentList) {
      if (commentList.length > 0) {
        const maxLikesComment = commentList.reduce(
          (max, comment) =>
            comment.likes_count > max.likes_count ? comment : max,
          commentList[0]
        );
        this.mostLikesItem = maxLikesComment;
      }
    },
  },
  created() {
    this.$store.commit("noLoginModal/closeLoginModal");
  },
  beforeMount() {
    this.getMostLikesItem(this.mediaItems);
  },
};
</script>
