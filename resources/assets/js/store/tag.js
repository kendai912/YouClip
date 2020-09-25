import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";

const state = {
  tagVideoData: null,
  myCreatedAndLikedTagVideo: null,
  commentListofTag: null,
};

const getters = {
  tagVideoData: state => state.tagVideoData,
  myCreatedAndLikedTagVideo: state => state.myCreatedAndLikedTagVideo,
  getTagVideoContentById: state => tagId => {
    return state.tagVideoData.find(tagVideo => tagVideo.tag_id == tagId);
  },
  commentListofTag: (state) => state.commentListofTag,
};

const mutations = {
  setTagVideoData(state, data) {
    state.tagVideoData = data;
  },
  setMyCreatedAndLikedTagVideo(state, data) {
    state.myCreatedAndLikedTagVideo = data;
  },
  setCommentListofTag(state, data) {
    state.commentListofTag = data;
  }
};

const actions = {
  //Likeまたは作成したシーンタグをロード
  async loadMyCreatedAndLikedTagVideo(context) {
    const response = await axios.get("api/load/myCreatedAndLikedTagVideo");
    if (response.status == OK) {
      // 成功した時
      context.commit(
        "setMyCreatedAndLikedTagVideo",
        response.data.myCreatedAndLikedTagVideo
      );
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
      router.push("/login");
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  async addTagComment(context, data) {
    const params = data;
    const response = await axios.post("api/tag/addComment", params);
    if (response.status == CREATED) {
      // 成功した時
      //storeのタグデータを更新
      const newTagComment = response.data.newComment;
      const comments = state.commentListofTag;
      if (!newTagComment.parent_id) {
        comments.unshift(newTagComment);
      } else {
        const parentIndex = comments.findIndex(comment => comment.comment_id === newTagComment.parent_id);
        comments[parentIndex].replies.unshift(newTagComment);
      }
      context.commit("setCommentListofTag", comments);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  async likeComment(context, data) {
    const params = data;
    const response = await axios.post("api/playlist/likeComment", params);
    if (response.status == CREATED) {
      // 成功した時
      //storeのタグデータを更新
      const isLiked = response.data.isLiked;
      const comments = state.commentListofTag;
      if (!data.parent_id) {
        const commentIndex = comments.findIndex(comment => comment.comment_id === data.comment_id);
        comments[commentIndex].isLiked = isLiked;
        if (isLiked) {
          comments[commentIndex].likes_count ++;
        } else {
          comments[commentIndex].likes_count --;
        }
      } else {
        const parentIndex = comments.findIndex(comment => comment.comment_id === data.parent_id);
        const commentIndex = comments[parentIndex].replies.findIndex(reply => reply.comment_id === data.comment_id);
        comments[parentIndex].replies[commentIndex].isLiked = isLiked;
        if (isLiked) {
          comments[commentIndex].replies[commentIndex].likes_count ++;
        } else {
          comments[commentIndex].replies[commentIndex].likes_count --;
        }
      }
      context.commit("setCommentListofTag", comments);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
