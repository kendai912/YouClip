import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";

const state = {
  playlistTagData: null,
  myPlaylistTagDataLoaded: null,
  showAddPlaylistModal: false,
  playlistIdsOfTag: null
};

const getters = {
  playlistTagData: state => state.playlistTagData,
  myPlaylistTagDataLoaded: state => state.myPlaylistTagDataLoaded,
  showAddPlaylistModal: state => state.showAddPlaylistModal,
  playlistIdsOfTag: state => state.playlistIdsOfTag,
  getPlaylistTagContentById: state => playlistId => {
    return state.playlistTagData.find(
      playlistTag => playlistTag.id == playlistId
    );
  },
  myPlaylistTagData: state => user_id => {
    return state.playlistTagData.filter(
      playlistTag => playlistTag.user_id == user_id
    );
  },
  hasMyPlaylists: state => user_id => {
    return !!state.playlistTagData.filter(
      playlistTag => playlistTag.user_id == user_id
    );
  }
};

const mutations = {
  setPlaylistTagData(state, data) {
    state.playlistTagData = data;
  },
  setMyPlaylistTagDataLoaded(state, data) {
    state.myPlaylistTagDataLoaded = data;
  },
  openAddPlaylistModal(state) {
    state.showAddPlaylistModal = true;
  },
  closeAddPlaylistModal(state) {
    state.showAddPlaylistModal = false;
  },
  setPlaylistIdsOfTag(state, data) {
    state.playlistIdsOfTag = data;
  }
};

const actions = {
  //全プレイリストをロード
  async loadPlaylist(context) {
    const response = await axios.get("api/load/playlist");
    if (response.status == OK) {
      // 成功した時
      context.commit("setPlaylistTagData", response.data.playlistTagData);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //Likeまたは作成したプレイリストをロード
  async loadMyPlaylist(context) {
    const response = await axios.get("api/load/myPlaylist");
    if (response.status == OK) {
      // 成功した時
      context.commit("setMyPlaylistTagDataLoaded", response.data.myPlaylist);
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
      toastr.error("プレイリストへの作成に失敗しました");
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
      toastr.error("プレイリストへの作成に失敗しました");
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
