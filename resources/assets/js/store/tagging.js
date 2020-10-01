import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";
import store from "../store";

const state = {
  showSceneTagControl: false,
  showTaggingControl: "TimeControl",
  tagId: null,
  tags: null,
  start: null,
  end: null,
  privacySetting: "public",
  myPlaylistToSave: "none",
  controlTransitNext: true,
  tagHistories: [],
  isEditting: false,
  isKeep: false,
  showCreateNewPlaylistModal: false,
};

const getters = {
  showSceneTagControl: (state) => state.showSceneTagControl,
  showTaggingControl: (state) => state.showTaggingControl,
  tagId: (state) => state.tagId,
  tags: (state) => state.tags,
  start: (state) => state.start,
  end: (state) => state.end,
  privacySetting: (state) => state.privacySetting,
  myPlaylistToSave: (state) => state.myPlaylistToSave,
  controlTransitNext: (state) => state.controlTransitNext,
  tagHistories: (state) => state.tagHistories,
  isEditting: (state) => state.isEditting,
  isKeep: (state) => state.isKeep,
  showCreateNewPlaylistModal: (state) => state.showCreateNewPlaylistModal,
};

const mutations = {
  setShowSceneTagControl(state, data) {
    state.showSceneTagControl = data;
  },
  setShowTaggingControl(state, data) {
    state.showTaggingControl = data;
  },
  setTagId(state, data) {
    state.tagId = data;
  },
  setTags(state, data) {
    state.tags = data;
  },
  setStart(state, data) {
    state.start = data;
  },
  setEnd(state, data) {
    state.end = data;
  },
  setPrivacySetting(state, data) {
    state.privacySetting = data;
  },
  setMyPlaylistToSave(state, data) {
    state.myPlaylistToSave = data;
  },
  setControlTransitNext(state, data) {
    state.controlTransitNext = data;
  },
  setTagHistories(state, data) {
    state.tagHistories = data;
  },
  setIsEditting(state, data) {
    state.isEditting = data;
  },
  setIsKeep(state, data) {
    state.isKeep = data;
  },
  //シーンタグの余計なスペースを除去し整形
  formatSceneTags(state) {
    //スペースのみのシーンタグを削除
    for (let i = 0; i < state.tags.length; i++) {
      if (state.tags[i] == "") {
        state.tags.splice(i, 1);
        i--;
      }
    }
  },
  openCreateNewPlaylistModal(state) {
    state.showCreateNewPlaylistModal = true;
  },
  closeCreateNewPlaylistModal(state) {
    state.showCreateNewPlaylistModal = false;
  },
};

const actions = {
  //シーンタグの保存
  async storeSceneTags(context) {
    // //シーンタグの余計なスペースを除去し整形
    context.commit("formatSceneTags");

    let params = {
      youtubeId: store.getters["youtube/youtubeId"],
      isNew: store.getters["youtube/isNew"],
      newVideoData: store.getters["youtube/newVideoData"],
      tags: state.tags,
      start: state.start,
      end: state.end,
      privacySetting: state.privacySetting,
      myPlaylistToSave: state.myPlaylistToSave, //playlist ID
    };

    const response = await axios.post("/api/tag/store", params);
    if (response.status == CREATED) {
      // 成功した時
      //storeのTagデータを更新
      await context.dispatch("youtube/getTag", "", { root: true });
      //動画をDBに保存したのでisNewフラグをfalseにセット
      if (params.isNew) {
        //storeのVideoデータを更新
        await context.dispatch("youtube/getVideo", "", { root: true });
        context.commit("youtube/setIsNew", false, { root: true });
      }
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //シーンタグの更新
  async updateSceneTags(context) {
    // //シーンタグの余計なスペースを除去し整形
    context.commit("formatSceneTags");
    let params = {
      youtubeId: store.getters["youtube/youtubeId"],
      tagId: state.tagId,
      tags: state.tags,
      start: state.start,
      end: state.end,
      privacySetting: state.privacySetting,
    };

    const response = await axios.post("/api/tag/update", params);
    if (response.status == CREATED) {
      // 成功した時
      //storeのタグデータを更新
      context.dispatch("youtube/getTag", "", { root: true });
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  async deleteTag(context) {
    let params = {
      tagId: state.tagId,
    };

    const response = await axios.post("/api/tag/delete", params);
    if (response.status == DELETED) {
      // 成功した時
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  async getTagHistories(context) {
    const response = await axios.get("/api/tag/histories");
    if (response.status == OK) {
      // 成功した時
      context.commit("setTagHistories", response.data.tagHistories);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
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
