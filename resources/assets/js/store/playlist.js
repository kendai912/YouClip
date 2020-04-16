import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  playlistAndTagPagination: null,
  myCreatedPlaylist: null,
  myCreatedAndLikedPlaylist: null,
  showAddPlaylistModal: false,
  playlistIdsOfTag: null,
  toLoad: true,
  isIndexPlaylistAndTagPaginating: false
};

const getters = {
  playlistAndTagPagination: state => state.playlistAndTagPagination,
  myCreatedPlaylist: state => state.myCreatedPlaylist,
  myCreatedAndLikedPlaylist: state => state.myCreatedAndLikedPlaylist,
  showAddPlaylistModal: state => state.showAddPlaylistModal,
  playlistIdsOfTag: state => state.playlistIdsOfTag,
  toLoad: state => state.toLoad,
  isIndexPlaylistAndTagPaginating: state =>
    state.isIndexPlaylistAndTagPaginating,
  getPlaylistTagContentById: state => playlistId => {
    return state.playlistData.find(playlistTag => playlistTag.id == playlistId);
  },
  myPlaylistAndTagPagination: state => user_id => {
    return state.playlistAndTagPagination.data.filter(
      playlistTag => playlistTag.user_id == user_id
    );
  },
  hasMyPlaylists: state => {
    return !!state.myCreatedPlaylist;
  }
};

const mutations = {
  setPlaylistAndTagPagination(state, data) {
    state.playlistAndTagPagination = data;
  },
  setMyCreatedPlaylist(state, data) {
    state.myCreatedPlaylist = data;
  },
  setMyCreatedAndLikedPlaylist(state, data) {
    state.myCreatedAndLikedPlaylist = data;
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
  setToLoad(state, data) {
    state.toLoad = data;
  },
  setIsIndexPlaylistAndTagPaginating(state, data) {
    state.isIndexPlaylistAndTagPaginating = data;
  }
};

const actions = {
  //プレイリスト一覧を取得
  async indexPlaylistAndTagPagination(context, page) {
    //連続して無限スクロールイベントが発生しないようにするためのフラグをセット
    context.commit("setIsIndexPlaylistAndTagPaginating", true);

    const response = await axios.get("api/index/playlistAndTag?page=" + page);
    if (response.status == OK) {
      // 成功した時
      if (response.data.playlistAndTagPagination.last_page == page)
        context.commit("setToLoad", false);
      console.log(response.data.playlistAndTagPagination);
      if (response.data.playlistAndTagPagination.data) {
        context.commit(
          "setPlaylistAndTagPagination",
          response.data.playlistAndTagPagination
        );
        //連続して無限スクロールイベントが発生しないようにするためのフラグを解除
        context.commit("setIsIndexPlaylistAndTagPaginating", false);
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
  //完了ボタンを押したらチェックの入ったプレイリストにタグを追加
  async addMyPlaylists(context, input) {
    this.errors = {};

    // Toastrオプション変更
    toastr.options = {
      positionClass: "toast-bottom-left",
      timeOut: "5000"
    };

    //チェックの入ったプレイリストをパラメータとして格納
    var params = {
      checkedPlaylistIds: input.checkedPlaylistIds
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
  //プレイリスト新規作成と選択中のタグの保存
  async createPlaylist(context, input) {
    this.errors = {};

    // Toastrオプション変更
    toastr.options = {
      positionClass: "toast-bottom-left",
      timeOut: "5000"
    };

    //チェックの入ったプレイリストをパラメータとして格納
    var params = {
      newPlaylistName: input.newPlaylistName,
      privacySetting: input.privacySetting,
      currentTagId: input.currentTagId
    };

    const response = await axios.post("/api/playlist/create", params);
    if (response.status == CREATED) {
      // 成功した時
      context.commit("closeAddPlaylistModal");

      //ポップアップでプレイリストの作成完了を通知
      toastr.success("[" + params.newPlaylistName + "]に保存しました");
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
      toastr.error("プレイリストへの追加に失敗しました");
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
      toastr.error("プレイリストへの追加に失敗しました");
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
