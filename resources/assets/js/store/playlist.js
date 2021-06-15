import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";
import myMixin from "../util";
import router from "../router";
import store from "../store";

const state = {
  // playlistAndTagPaginationOfRecommend: null,
  playlistAndTagPaginationOfNew: null,
  playlistAndTagPaginationOfVTuber: null,
  playlistAndTagPaginationOfGame: null,
  playlistAndTagPaginationOfSports: null,
  playlistAndTagPaginationOfPopular: null,
  myCreatedPlaylist: null,
  myLikedPlaylist: null,
  showAddPlaylistModal: false,
  currentCategory: null,
  playlistIdsOfTag: null,
  // proceedPeriodOfRecommend: false,
  proceedPeriodOfNew: false,
  proceedPeriodOfVTuber: false,
  proceedPeriodOfGame: false,
  proceedPeriodOfSports: false,
  // toLoadRecommend: true,
  toLoadNew: true,
  toLoadVTuber: true,
  toLoadGame: true,
  toLoadSports: true,
  // isIndexRecommendPlaylistAndTagPaginating: false,
  isIndexNewPlaylistAndTagPaginating: false,
  isIndexVTuberPlaylistAndTagPaginating: false,
  isIndexGamePlaylistAndTagPaginating: false,
  isIndexSportsPlaylistAndTagPaginating: false,
  sceneListofPlaylist: null,
  commentListofPlaylist: null,
  newPlaylistId: null,
  newPlaylistName: null,
  publicPlaylist: null,
  createdSceneList: null,
  resetKey: 0,
  thumbnail: null,
};

const getters = {
  // playlistAndTagPaginationOfRecommend: (state) =>
  //   state.playlistAndTagPaginationOfRecommend,
  playlistAndTagPaginationOfNew: (state) => state.playlistAndTagPaginationOfNew,
  playlistAndTagPaginationOfVTuber: (state) =>
    state.playlistAndTagPaginationOfVTuber,
  playlistAndTagPaginationOfGame: (state) =>
    state.playlistAndTagPaginationOfGame,
  playlistAndTagPaginationOfSports: (state) =>
    state.playlistAndTagPaginationOfSports,
  playlistAndTagPaginationOfPopular: (state) =>
    state.playlistAndTagPaginationOfPopular,
  myCreatedPlaylist: (state) => state.myCreatedPlaylist,
  myLikedPlaylist: (state) => state.myLikedPlaylist,
  publicPlaylist: (state) => state.publicPlaylist,
  createdSceneList: (state) => state.createdSceneList,
  resetKey: (state) => state.resetKey,
  showAddPlaylistModal: (state) => state.showAddPlaylistModal,
  currentCategory: (state) => state.currentCategory,
  playlistIdsOfTag: (state) => state.playlistIdsOfTag,
  // proceedPeriodOfRecommend: (state) => state.proceedPeriodOfRecommend,
  proceedPeriodOfNew: (state) => state.proceedPeriodOfNew,
  proceedPeriodOfVTuber: (state) => state.proceedPeriodOfVTuber,
  proceedPeriodOfGame: (state) => state.proceedPeriodOfGame,
  proceedPeriodOfSports: (state) => state.proceedPeriodOfSports,
  // toLoadRecommend: (state) => state.toLoadRecommend,
  toLoadNew: (state) => state.toLoadNew,
  toLoadVTuber: (state) => state.toLoadVTuber,
  toLoadGame: (state) => state.toLoadGame,
  toLoadSports: (state) => state.toLoadSports,
  // isIndexRecommendPlaylistAndTagPaginating: (state) =>
  //   state.isIndexRecommendPlaylistAndTagPaginating,
  isIndexNewPlaylistAndTagPaginating: (state) =>
    state.isIndexNewPlaylistAndTagPaginating,
  isIndexVTuberPlaylistAndTagPaginating: (state) =>
    state.isIndexVTuberPlaylistAndTagPaginating,
  isIndexGamePlaylistAndTagPaginating: (state) =>
    state.isIndexGamePlaylistAndTagPaginating,
  isIndexSportsPlaylistAndTagPaginating: (state) =>
    state.isIndexSportsPlaylistAndTagPaginating,
  getPlaylistTagContentById: (state) => (playlistId) => {
    return state.playlistData.find(
      (playlistTag) => playlistTag.id == playlistId
    );
  },
  hasMyPlaylists: (state) => {
    return state.myCreatedPlaylist ? !!state.myCreatedPlaylist.length : false;
  },
  sceneListofPlaylist: (state) => state.sceneListofPlaylist,
  commentListofPlaylist: (state) => state.commentListofPlaylist,
  newPlaylistId: (state) => state.newPlaylistId,
  newPlaylistName: (state) => state.newPlaylistName,
  thumbnail: (state) => state.thumbnail,
};

const mutations = {
  // setPlaylistAndTagPaginationOfRecommend(state, data) {
  //   state.playlistAndTagPaginationOfRecommend = data;
  // },
  setPlaylistAndTagPaginationOfNew(state, data) {
    state.playlistAndTagPaginationOfNew = data;
  },
  setPlaylistAndTagPaginationOfVTuber(state, data) {
    state.playlistAndTagPaginationOfVTuber = data;
  },
  setPlaylistAndTagPaginationOfGame(state, data) {
    state.playlistAndTagPaginationOfGame = data;
  },
  setPlaylistAndTagPaginationOfSports(state, data) {
    state.playlistAndTagPaginationOfSports = data;
  },
  setPlaylistAndTagPaginationOfPopular(state, data) {
    state.playlistAndTagPaginationOfPopular = data;
  },
  setMyCreatedPlaylist(state, data) {
    state.myCreatedPlaylist = data;
  },
  setMyLikedPlaylist(state, data) {
    state.myLikedPlaylist = data;
  },
  setPublicPlaylist(state, data) {
    state.publicPlaylist = data;
  },
  setCreatedSceneList(state, data) {
    state.createdSceneList = data;
  },
  setResetKey(state, data) {
    state.resetKey = data;
  },
  openAddPlaylistModal(state) {
    state.showAddPlaylistModal = true;
  },
  closeAddPlaylistModal(state) {
    state.showAddPlaylistModal = false;
  },
  setCurrentCategory(state, data) {
    state.currentCategory = data;
  },
  setPlaylistIdsOfTag(state, data) {
    state.playlistIdsOfTag = data;
  },
  // setProceedPeriodOfRecommend(state, data) {
  //   state.proceedPeriodOfRecommend = data;
  // },
  setProceedPeriodOfNew(state, data) {
    state.proceedPeriodOfNew = data;
  },
  setProceedPeriodOfVTuber(state, data) {
    state.proceedPeriodOfVTuber = data;
  },
  setProceedPeriodOfGame(state, data) {
    state.proceedPeriodOfGame = data;
  },
  setProceedPeriodOfSports(state, data) {
    state.proceedPeriodOfSports = data;
  },
  // setToLoadRecommend(state, data) {
  //   state.toLoadRecommend = data;
  // },
  setToLoadNew(state, data) {
    state.toLoadNew = data;
  },
  setToLoadVTuber(state, data) {
    state.toLoadVTuber = data;
  },
  setToLoadGame(state, data) {
    state.toLoadGame = data;
  },
  setToLoadSports(state, data) {
    state.toLoadSports = data;
  },
  // setIsIndexRecommendPlaylistAndTagPaginating(state, data) {
  //   state.isIndexRecommendPlaylistAndTagPaginating = data;
  // },
  setIsIndexNewPlaylistAndTagPaginating(state, data) {
    state.isIndexNewPlaylistAndTagPaginating = data;
  },
  setIsIndexVTuberPlaylistAndTagPaginating(state, data) {
    state.isIndexVTuberPlaylistAndTagPaginating = data;
  },
  setIsIndexGamePlaylistAndTagPaginating(state, data) {
    state.isIndexGamePlaylistAndTagPaginating = data;
  },
  setIsIndexSportsPlaylistAndTagPaginating(state, data) {
    state.isIndexSportsPlaylistAndTagPaginating = data;
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
  setNewPlaylistName(state, data) {
    state.newPlaylistName = data;
  },
  setThumbnail(state, data) {
    state.thumbnail = data;
  },
};

const actions = {
  // 【レコメンド】プレイリスト一覧を取得
  // async indexPlaylistAndTagPaginationOfRecommend(context, page) {
  //   //連続して無限スクロールイベントが発生しないようにするためのフラグをセット
  //   context.commit("setIsIndexRecommendPlaylistAndTagPaginating", true);

  //   const response = await axios.get(
  //     "/api/index/playlistAndTagOfRecommend?page=" + page
  //   );
  //   if (response.status == OK) {
  //     // 成功した時
  //     if (response.data.playlistAndTagPaginationOfRecommend.last_page == page)
  //       context.commit("setToLoadRecommend", false);
  //     if (response.data.playlistAndTagPaginationOfRecommend.data) {
  //       context.commit(
  //         "setPlaylistAndTagPaginationOfRecommend",
  //         response.data.playlistAndTagPaginationOfRecommend
  //       );
  //       //連続して無限スクロールイベントが発生しないようにするためのフラグを解除
  //       context.commit("setIsIndexRecommendPlaylistAndTagPaginating", false);
  //     }
  //   } else if (response.status == INTERNAL_SERVER_ERROR) {
  //     // 失敗した時
  //     context.commit("error/setCode", response.status, { root: true });
  //   } else {
  //     // 上記以外で失敗した時
  //     context.commit("error/setCode", response.status, { root: true });
  //   }
  // },

  // 【新着】プレイリスト一覧を取得
  async indexPlaylistAndTagPaginationOfNew(context, input) {
    //連続して無限スクロールイベントが発生しないようにするためのフラグをセット
    context.commit("setIsIndexNewPlaylistAndTagPaginating", true);

    const response = await axios.get(
      "/api/index/playlistAndTagOfNew?page=" +
        input.page +
        "&period=" +
        input.period
    );

    if (response.status == OK) {
      // 成功した時
      if (response.data.playlistAndTagPaginationOfNew.last_page <= input.page) {
        context.commit("setProceedPeriodOfNew", true);
      }

      if (response.data.endOfPeriodFlg) {
        context.commit("setToLoadNew", false);
      }

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

  // 【VTuber】プレイリスト一覧を取得
  async indexPlaylistAndTagPaginationOfVTuber(context, input) {
    //連続して無限スクロールイベントが発生しないようにするためのフラグをセット
    context.commit("setIsIndexVTuberPlaylistAndTagPaginating", true);

    const response = await axios.get(
      "/api/index/playlistAndTagOfVTuber?page=" +
        input.page +
        "&period=" +
        input.period
    );

    if (response.status == OK) {
      // 成功した時
      if (
        response.data.playlistAndTagPaginationOfVTuber.last_page <= input.page
      )
        context.commit("setProceedPeriodOfVTuber", true);

      if (response.data.endOfPeriodFlg)
        context.commit("setToLoadVTuber", false);

      if (response.data.playlistAndTagPaginationOfVTuber.data) {
        context.commit(
          "setPlaylistAndTagPaginationOfVTuber",
          response.data.playlistAndTagPaginationOfVTuber
        );
        //連続して無限スクロールイベントが発生しないようにするためのフラグを解除
        context.commit("setIsIndexVTuberPlaylistAndTagPaginating", false);
      }
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  // 【Game】プレイリスト一覧を取得
  async indexPlaylistAndTagPaginationOfGame(context, input) {
    //連続して無限スクロールイベントが発生しないようにするためのフラグをセット
    context.commit("setIsIndexGamePlaylistAndTagPaginating", true);

    const response = await axios.get(
      "/api/index/playlistAndTagOfGame?page=" +
        input.page +
        "&period=" +
        input.period
    );

    if (response.status == OK) {
      // 成功した時
      if (response.data.playlistAndTagPaginationOfGame.last_page <= input.page)
        context.commit("setProceedPeriodOfGame", true);

      if (response.data.endOfPeriodFlg) context.commit("setToLoadGame", false);

      if (response.data.playlistAndTagPaginationOfGame.data) {
        context.commit(
          "setPlaylistAndTagPaginationOfGame",
          response.data.playlistAndTagPaginationOfGame
        );
        //連続して無限スクロールイベントが発生しないようにするためのフラグを解除
        context.commit("setIsIndexGamePlaylistAndTagPaginating", false);
      }
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  // 【Sports】プレイリスト一覧を取得
  async indexPlaylistAndTagPaginationOfSports(context, input) {
    //連続して無限スクロールイベントが発生しないようにするためのフラグをセット
    context.commit("setIsIndexSportsPlaylistAndTagPaginating", true);

    const response = await axios.get(
      "/api/index/playlistAndTagOfSports?page=" +
        input.page +
        "&period=" +
        input.period
    );

    if (response.status == OK) {
      // 成功した時
      if (
        response.data.playlistAndTagPaginationOfSports.last_page <= input.page
      )
        context.commit("setProceedPeriodOfSports", true);

      if (response.data.endOfPeriodFlg)
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

  // 【人気】プレイリスト一覧を取得
  async indexPlaylistAndTagPaginationOfPopular(context, playlistId) {
    const response = await axios.get(
      "/api/index/playlistAndTagOfPopular/" + playlistId
    );

    if (response.status == OK) {
      // 成功した時
      console.log(response.data.playlistAndTagPaginationOfPopular);
      if (response.data.playlistAndTagPaginationOfPopular) {
        context.commit(
          "setPlaylistAndTagPaginationOfPopular",
          response.data.playlistAndTagPaginationOfPopular
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

  async addPlaylistVisitCount(context, playlist_id) {
    const response = await axios.post(
      "/api/addPlaylistVisitCount/" + playlist_id
    );
    // context.commit("setPlaylistVisitCount", playlist_id);
  },

  async getCurrentCategory(context, playlistId) {
    let queries = {
      playlistId: playlistId,
    };
    const response = await axios.get("/api/get/currentCategory", {
      params: queries,
    });
    if (response.status == OK) {
      // 成功した時
      context.commit("setCurrentCategory", response.data.currentCategory);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  //作成したプレイリストをロード
  async loadMyCreatedPlaylist(context) {
    const response = await axios.get("/api/load/myCreatedPlaylist");
    if (response.status == OK) {
      // 成功した時
      context.commit("setMyCreatedPlaylist", response.data.myCreatedPlaylist);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  //いいねしたプレイリストをロード
  async loadMyLikedPlaylist(context) {
    const response = await axios.get("/api/load/myLikedPlaylist");
    if (response.status == OK) {
      // 成功した時
      context.commit("setMyLikedPlaylist", response.data.myLikedPlaylist);
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
      created_user: user_id,
    };
    const response = await axios.post(
      "/api/load/publicPlaylistAndScenelist",
      params
    );
    if (response.status == OK) {
      // 成功した時
      context.commit("setPublicPlaylist", response.data.publicPlaylist);
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
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  async updatePlaylist(context, params) {
    this.errors = {};

    //チェックの入ったプレイリストをパラメータとして格納
    let playlistParams = {
      newPlaylistId: params.newPlaylistId,
      playlistName: params.playlistName,
      privacySetting: params.privacySetting,
      playlistCategory: params.playlistCategory,
      description: params.description,
    };

    const response = await axios.post("/api/playlist/update", playlistParams);
    if (response.status == CREATED) {
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  async updatePlaylistTitle(context, playlist) {
    this.errors = {};

    //チェックの入ったプレイリストをパラメータとして格納
    var params = {
      playlistName: playlist.playlistName,
      playlist_id: playlist.playlist_id,
    };

    const response = await axios.post("/api/playlist/updateTitle", params);
    if (response.status == CREATED) {
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  async updatePlaylistPrivacy(context, playlist) {
    this.errors = {};

    //チェックの入ったプレイリストをパラメータとして格納
    var params = {
      privacySetting: playlist.privacySetting,
      playlist_id: playlist.playlist_id,
    };

    const response = await axios.post("/api/playlist/updatePrivacy", params);
    if (response.status == CREATED) {
      //ポップアップでプレイリストの作成完了を通知
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  async updatePlaylistCategory(context, playlist) {
    this.errors = {};

    //チェックの入ったプレイリストをパラメータとして格納
    var params = {
      playlistCategory: playlist.playlistCategory,
      playlist_id: playlist.playlist_id,
    };

    const response = await axios.post("/api/playlist/updateCategory", params);
    if (response.status == CREATED) {
      //ポップアップでプレイリストの作成完了を通知
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  async updatePlaylistSceneOrder(context, playlist) {
    this.errors = {};

    const response = await axios.post(
      "/api/playlist/updateSceneOrder",
      playlist
    );
    if (response.status == CREATED) {
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  //プレイリスト新規作成と選択中のタグの保存
  async createPlaylist(context, input) {
    this.errors = {};

    //チェックの入ったプレイリストをパラメータとして格納
    var params = {
      playlistName: input.newPlaylistName,
      privacySetting: input.privacySetting,
      currentTagId: input.currentTagId,
      playlistCategory: input.playlistCategory,
    };

    const response = await axios.post("/api/playlist/create", params);
    if (response.status == CREATED) {
      // 成功した場合は新しく作成したプレイリストのIDをセットし、プレイリスト新規作成モーダルを閉じる
      context.commit("setNewPlaylistId", response.data.newPlaylist.id);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  // Get newly created playlist ID
  async getNewPlaylistId(context, input) {
    const response = await axios.post("/api/playlist/getNewPlaylist");
    if (response.status == OK) {
      // 成功した時
      if (response.data.newPlaylist) {
        context.commit("setNewPlaylistId", response.data.newPlaylist.id);
      } else {
        context.commit("setNewPlaylistId", "");
      }
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
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
    const response = await axios.post("/api/playlist/addComment", params);
    if (response.status == CREATED) {
      // 成功した時
      //storeのタグデータを更新
      const newPlaylistComment = response.data.newComment;
      const comments = state.commentListofPlaylist;
      if (!newPlaylistComment.parent_id) {
        comments.unshift(newPlaylistComment);
      } else {
        const parentIndex = comments.findIndex(
          (comment) => comment.comment_id === newPlaylistComment.parent_id
        );
        comments[parentIndex].replies.push(newPlaylistComment);
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
      const commentIndex = comments.findIndex(
        (comment) => comment.comment_id === data.comment_id
      );
      comments[commentIndex].isLiked = isLiked;
      if (isLiked) {
        comments[commentIndex].likes_count++;
      } else {
        comments[commentIndex].likes_count--;
      }
    } else {
      const parentIndex = comments.findIndex(
        (comment) => comment.comment_id === data.parent_id
      );
      const commentIndex = comments[parentIndex].replies.findIndex(
        (reply) => reply.comment_id === data.comment_id
      );
      comments[parentIndex].replies[commentIndex].isLiked = isLiked;
      if (isLiked) {
        comments[parentIndex].replies[commentIndex].likes_count++;
      } else {
        comments[parentIndex].replies[commentIndex].likes_count--;
      }
    }
    context.commit("setCommentListofPlaylist", comments);

    const response = await axios.post("/api/playlist/likeComment", params);
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
  },

  async getThumbnail(context, playlistId) {
    const response = await axios.get(
      "/api/playlist/getThumbnail/" + playlistId
    );
    if (response.status == OK) {
      context.commit("setThumbnail", response.data.thumbnail);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  async saveCustomThumbnail(context, params) {
    const response = await axios.post(
      "/api/playlist/saveCustomThumbnail",
      params
    );
    if (response.status == CREATED) {
      context.commit("setThumbnail", response.data.customThumbnail);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
