import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";
import store from "../store";
import { times } from "lodash";

const state = {
  playlistAndTagPaginationOfRecommend: null,
  playlistAndTagPaginationOfNew: null,
  playlistAndTagPaginationOfSports: null,
  playlistAndTagPaginationOfEntertainment: null,
  myCreatedPlaylist: null,
  myCreatedAndLikedPlaylist: null,
  showAddPlaylistModal: false,
  playlistIdsOfTag: null,
  toLoadRecommend: true,
  toLoadNew: true,
  toLoadSports: true,
  toLoadEntertainment: true,
  isIndexRecommendPlaylistAndTagPaginating: false,
  isIndexNewPlaylistAndTagPaginating: false,
  isIndexSportsPlaylistAndTagPaginating: false,
  isIndexEntertainmentPlaylistAndTagPaginating: false,
  sceneListofPlaylist: null,
  commentListofPlaylist: null,
  newPlaylistId: null,
  publicPlaylist: null,
  createdSceneList: null,
};

const getters = {
  playlistAndTagPaginationOfRecommend: (state) =>
    state.playlistAndTagPaginationOfRecommend,
  playlistAndTagPaginationOfNew: (state) => state.playlistAndTagPaginationOfNew,
  playlistAndTagPaginationOfSports: (state) =>
    state.playlistAndTagPaginationOfSports,
  playlistAndTagPaginationOfEntertainment: (state) =>
    state.playlistAndTagPaginationOfEntertainment,
  myCreatedPlaylist: (state) => state.myCreatedPlaylist,
  myCreatedAndLikedPlaylist: (state) => state.myCreatedAndLikedPlaylist,
  publicPlaylist: (state) => state.publicPlaylist,
  createdSceneList: (state) => state.createdSceneList,
  showAddPlaylistModal: (state) => state.showAddPlaylistModal,
  playlistIdsOfTag: (state) => state.playlistIdsOfTag,
  toLoadRecommend: (state) => state.toLoadRecommend,
  toLoadNew: (state) => state.toLoadNew,
  toLoadSports: (state) => state.toLoadSports,
  toLoadEntertainment: (state) => state.toLoadEntertainment,
  isIndexRecommendPlaylistAndTagPaginating: (state) =>
    state.isIndexRecommendPlaylistAndTagPaginating,
  isIndexNewPlaylistAndTagPaginating: (state) =>
    state.isIndexNewPlaylistAndTagPaginating,
  isIndexSportsPlaylistAndTagPaginating: (state) =>
    state.isIndexSportsPlaylistAndTagPaginating,
  isIndexEntertainmentPlaylistAndTagPaginating: (state) =>
    state.isIndexEntertainmentPlaylistAndTagPaginating,
  getPlaylistTagContentById: (state) => (playlistId) => {
    return state.playlistData.find(
      (playlistTag) => playlistTag.id == playlistId
    );
  },
  myPlaylistAndTagPagination: (state) => (user_id) => {
    return state.playlistAndTagPagination.data.filter(
      (playlistTag) => playlistTag.user_id == user_id
    );
  },
  hasMyPlaylists: (state) => {
    return state.myCreatedPlaylist ? !!state.myCreatedPlaylist.length : false;
  },
  sceneListofPlaylist: (state) => state.sceneListofPlaylist,
  commentListofPlaylist: (state) => state.commentListofPlaylist,
  newPlaylistId: (state) => state.newPlaylistId,
};

const mutations = {
  setPlaylistAndTagPaginationOfRecommend(state, data) {
    state.playlistAndTagPaginationOfRecommend = data;
  },
  setPlaylistAndTagPaginationOfNew(state, data) {
    state.playlistAndTagPaginationOfNew = data;
  },
  setPlaylistAndTagPaginationOfSports(state, data) {
    state.playlistAndTagPaginationOfSports = data;
  },
  setPlaylistAndTagPaginationOfEntertainment(state, data) {
    state.playlistAndTagPaginationOfEntertainment = data;
  },
  setMyCreatedPlaylist(state, data) {
    state.myCreatedPlaylist = data;
  },
  setMyCreatedAndLikedPlaylist(state, data) {
    state.myCreatedAndLikedPlaylist = data;
  },
  setPublicPlaylist(state, data) {
    state.publicPlaylist = data;
  },
  setCreatedSceneList(state, data) {
    state.createdSceneList = data;
  },
  openAddPlaylistModal(state) {
    state.showAddPlaylistModal = true;
  },
  closeAddPlaylistModal(state) {
    state.showAddPlaylistModal = false;
  },
  setPlaylistIdsOfTag(state, data) {
    state.playlistIdsOfTag = data;
  },
  setToLoadRecommend(state, data) {
    state.toLoadRecommend = data;
  },
  setToLoadNew(state, data) {
    state.toLoadNew = data;
  },
  setToLoadSports(state, data) {
    state.toLoadSports = data;
  },
  setToLoadEntertainment(state, data) {
    state.toLoadEntertainment = data;
  },
  setIsIndexRecommendPlaylistAndTagPaginating(state, data) {
    state.isIndexRecommendPlaylistAndTagPaginating = data;
  },
  setIsIndexNewPlaylistAndTagPaginating(state, data) {
    state.isIndexNewPlaylistAndTagPaginating = data;
  },
  setIsIndexSportsPlaylistAndTagPaginating(state, data) {
    state.isIndexSportsPlaylistAndTagPaginating = data;
  },
  setIsIndexEntertainmentPlaylistAndTagPaginating(state, data) {
    state.isIndexEntertainmentPlaylistAndTagPaginating = data;
  },
  setSceneListofPlaylist(state, data) {
    state.sceneListofPlaylist = data;
  },
  setCommentListofPlaylist(state, data) {
    state.commentListofPlaylist = data;
  },
  setNewPlaylistId(state, data) {
    state.newPlaylistId = data;
  },
};

const actions = {
  // 【レコメンド】プレイリスト一覧を取得
  async indexPlaylistAndTagPaginationOfRecommend(context, page) {
    //連続して無限スクロールイベントが発生しないようにするためのフラグをセット
    context.commit("setIsIndexRecommendPlaylistAndTagPaginating", true);

    const response = await axios.get(
      "api/index/playlistAndTagOfRecommend?page=" + page
    );
    if (response.status == OK) {
      // 成功した時
      if (response.data.playlistAndTagPaginationOfRecommend.last_page == page)
        context.commit("setToLoadRecommend", false);
      if (response.data.playlistAndTagPaginationOfRecommend.data) {
        context.commit(
          "setPlaylistAndTagPaginationOfRecommend",
          response.data.playlistAndTagPaginationOfRecommend
        );
        //連続して無限スクロールイベントが発生しないようにするためのフラグを解除
        context.commit("setIsIndexRecommendPlaylistAndTagPaginating", false);
      }
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  async addPlaylistVisitCount(context, playlist_id) {
    const response = await axios.post(
      "api/addPlaylistVisitCount/" + playlist_id
    );
    // context.commit("setPlaylistVisitCount", playlist_id);
  },
  // 【新着】プレイリスト一覧を取得
  async indexPlaylistAndTagPaginationOfNew(context, page) {
    //連続して無限スクロールイベントが発生しないようにするためのフラグをセット
    context.commit("setIsIndexNewPlaylistAndTagPaginating", true);

    const response = await axios.get(
      "api/index/playlistAndTagOfNew?page=" + page
    );
    if (response.status == OK) {
      // 成功した時
      if (response.data.playlistAndTagPaginationOfNew.last_page == page)
        context.commit("setToLoadNew", false);
      if (response.data.playlistAndTagPaginationOfNew.data) {
        context.commit(
          "setPlaylistAndTagPaginationOfNew",
          response.data.playlistAndTagPaginationOfNew
        );
        //連続して無限スクロールイベントが発生しないようにするためのフラグを解除
        context.commit("setIsIndexNewPlaylistAndTagPaginating", false);
      }
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  // 【スポーツ】プレイリスト一覧を取得
  async indexPlaylistAndTagPaginationOfSports(context, page) {
    //連続して無限スクロールイベントが発生しないようにするためのフラグをセット
    context.commit("setIsIndexSportsPlaylistAndTagPaginating", true);

    const response = await axios.get(
      "api/index/playlistAndTagOfSports?page=" + page
    );
    if (response.status == OK) {
      // 成功した時
      if (response.data.playlistAndTagPaginationOfSports.last_page == page)
        context.commit("setToLoadSports", false);
      if (response.data.playlistAndTagPaginationOfSports.data) {
        context.commit(
          "setPlaylistAndTagPaginationOfSports",
          response.data.playlistAndTagPaginationOfSports
        );
        //連続して無限スクロールイベントが発生しないようにするためのフラグを解除
        context.commit("setIsIndexSportsPlaylistAndTagPaginating", false);
      }
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  // 【エンターテイメント】プレイリスト一覧を取得
  async indexPlaylistAndTagPaginationOfEntertainment(context, page) {
    //連続して無限スクロールイベントが発生しないようにするためのフラグをセット
    context.commit("setIsIndexEntertainmentPlaylistAndTagPaginating", true);

    const response = await axios.get(
      "api/index/playlistAndTagOfEntertainment?page=" + page
    );
    if (response.status == OK) {
      // 成功した時
      if (
        response.data.playlistAndTagPaginationOfEntertainment.last_page == page
      )
        context.commit("setToLoadEntertainment", false);

      if (response.data.playlistAndTagPaginationOfEntertainment.data) {
        context.commit(
          "setPlaylistAndTagPaginationOfEntertainment",
          response.data.playlistAndTagPaginationOfEntertainment
        );
        //連続して無限スクロールイベントが発生しないようにするためのフラグを解除
        context.commit(
          "setIsIndexEntertainmentPlaylistAndTagPaginating",
          false
        );
      }
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  async getMyCreatedPlaylist(context) {
    const response = await axios.get("api/get/myCreatedPlaylist");
    if (response.status == OK) {
      // 成功した時
      context.commit("setMyCreatedPlaylist", response.data.myCreatedPlaylist);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
      router.push("/login");
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //Likeまたは作成したプレイリストをロード
  async loadMyCreatedAndLikedPlaylist(context) {
    const response = await axios.get("api/load/myCreatedAndLikedPlaylist");
    if (response.status == OK) {
      // 成功した時
      context.commit(
        "setMyCreatedAndLikedPlaylist",
        response.data.myCreatedAndLikedPlaylist
      );
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //Public playlist data and scene list
  async loadPublicPlaylistAndScenelist(context, user_id) {
    let params = {
      created_user: user_id
    };
    const response = await axios.post("api/load/publicPlaylistAndScenelist", params);
    if (response.status == OK) {
      // 成功した時
      context.commit(
        "setPublicPlaylist",
        response.data.publicPlaylist
      );
      context.commit("setCreatedSceneList", response.data.createdTagList);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //完了ボタンを押したらチェックの入ったプレイリストにタグを追加
  async addMyPlaylists(context, input) {
    this.errors = {};

    // Toastrオプション変更
    toastr.options = {
      positionClass: "toast-bottom-left",
      timeOut: "5000",
    };

    //チェックの入ったプレイリストをパラメータとして格納
    var params = {
      checkedPlaylistIds: input.checkedPlaylistIds,
    };

    const response = await axios.post(
      "/api/tag/addToPlaylists/" + input.currentTagId,
      params
    );
    if (response.status == CREATED) {
      // 成功した時
      context.commit("closeAddPlaylistModal");

      //ポップアップでプレイリストの作成完了を通知
      toastr.success("プレイリストに保存しました");
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
      toastr.error("プレイリストへの保存に失敗しました");
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
      toastr.error("プレイリストへの保存に失敗しました");
    }
  },
  async updatePlaylistTitle(context, playlist) {
    this.errors = {};

    // Toastrオプション変更
    // toastr.options = {
    //   positionClass: "toast-bottom-left",
    //   timeOut: "5000",
    // };

    //チェックの入ったプレイリストをパラメータとして格納
    var params = {
      playlistName: playlist.playlistName,
      playlist_id: playlist.playlist_id,
    };

    const response = await axios.post("/api/playlist/updateTitle", params);
    if (response.status == CREATED) {
      //ポップアップでプレイリストの作成完了を通知
      console.log("success");
      // toastr.success("プレイリストに保存しました");
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      // toastr.error("プレイリストへの保存に失敗しました");
      console.log("server error");
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
      console.log("error-setcode");
      // toastr.error("プレイリストへの保存に失敗しました");
    }
  },
  async updatePlaylistPrivacy(context, playlist) {
    this.errors = {};

    // Toastrオプション変更
    // toastr.options = {
    //   positionClass: "toast-bottom-left",
    //   timeOut: "5000",
    // };

    //チェックの入ったプレイリストをパラメータとして格納
    var params = {
      privacySetting: playlist.privacySetting,
      playlist_id: playlist.playlist_id,
    };

    const response = await axios.post("/api/playlist/updatePrivacy", params);
    if (response.status == CREATED) {
      //ポップアップでプレイリストの作成完了を通知
      // toastr.success("プレイリストに保存しました");
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      // toastr.error("プレイリストへの保存に失敗しました");
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
      // toastr.error("プレイリストへの保存に失敗しました");
    }
  },
  async updatePlaylistSceneOrder(context, playlist) {
    this.errors = {};

    // Toastrオプション変更
    // toastr.options = {
    //   positionClass: "toast-bottom-left",
    //   timeOut: "5000",
    // };

    //チェックの入ったプレイリストをパラメータとして格納
    // var params = {
    //   playlist_id: playlist.playlist_id,
    //   tagVideoData: playlist.sceneListofPlaylist
    // };
    const response = await axios.post(
      "/api/playlist/updateSceneOrder",
      playlist
    );
    if (response.status == CREATED) {
      //ポップアップでプレイリストの作成完了を通知
      // toastr.success("プレイリストに保存しました");
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      // toastr.error("プレイリストへの保存に失敗しました");
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
      // toastr.error("プレイリストへの保存に失敗しました");
    }
  },
  //プレイリスト新規作成と選択中のタグの保存
  async createPlaylist(context, input) {
    this.errors = {};

    // Toastrオプション変更
    toastr.options = {
      positionClass: "toast-bottom-left",
      timeOut: "5000",
    };

    //チェックの入ったプレイリストをパラメータとして格納
    var params = {
      newPlaylistName: input.newPlaylistName,
      privacySetting: input.privacySetting,
      currentTagId: input.currentTagId,
      currentCategory: input.currentCategory,
    };

    const response = await axios.post("/api/playlist/create", params);
    if (response.status == CREATED) {
      // 成功した場合は新しく作成したプレイリストのIDをセットし、プレイリスト新規作成モーダルを閉じる
      context.commit("setNewPlaylistId", response.data.newPlaylist.id);
      context.commit("closeAddPlaylistModal");

      //ポップアップでプレイリストの作成完了を通知
      // toastr.success("[" + params.newPlaylistName + "]に保存しました");
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
      // toastr.error("プレイリストへの追加に失敗しました");
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
      // toastr.error("プレイリストへの追加に失敗しました");
    }
  },
  //選択されたタグが追加済のユーザーのプレイリストIDを取得
  async getPlaylistIdsOfTag(context, tag_id) {
    this.errors = {};

    const response = await axios.get("/api/tag/getPlaylists/" + tag_id);
    if (response.status == OK) {
      // 成功した時
      let playlistIdsOfTag = response.data.playlistIds;
      //追加済のプレイリストのチェックボックスにチェック
      context.commit("setPlaylistIdsOfTag", playlistIdsOfTag);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  async addPlaylistComment(context, data) {
    const params = data;
    const response = await axios.post("api/playlist/addComment", params);
    if (response.status == CREATED) {
      // 成功した時
      //storeのタグデータを更新
      const newPlaylistComment = response.data.newComment;
      const comments = state.commentListofPlaylist;
      if (!newPlaylistComment.parent_id) {
        comments.unshift(newPlaylistComment);
      } else {
        const parentIndex = comments.findIndex(comment => comment.comment_id === newPlaylistComment.parent_id);
        comments[parentIndex].replies.unshift(newPlaylistComment);
      }
      context.commit("setCommentListofPlaylist", comments);
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
    const isLiked = data.isLiked;
    const comments = state.commentListofPlaylist;
    if (!data.parent_id) {
      const commentIndex = comments.findIndex(comment => comment.comment_id === data.comment_id);
      comments[commentIndex].isLiked = isLiked;
      console.log("comment index", comments[commentIndex]);
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
        comments[parentIndex].replies[commentIndex].likes_count ++;
      } else {
        comments[parentIndex].replies[commentIndex].likes_count --;
      }
    }
    context.commit("setCommentListofPlaylist", comments);

    const response = await axios.post("api/playlist/likeComment", params);
    if (response.status == CREATED) {
      // 成功した時
      //storeのタグデータを更新
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
  actions,
};
