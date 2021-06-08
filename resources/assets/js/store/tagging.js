import axios from "axios";
import { OK, CREATED, DELETED, INTERNAL_SERVER_ERROR } from "../util";
import myMixin from "../util";
import router from "../router";
import store from "../store";

const state = {
  tagId: null,
  tags: null,
  telops: null,
  start: null,
  end: null,
  privacySetting: "public",
  myPlaylistToSave: "none",
  controlTransitNext: true,
  tagHistories: [],
  isAdding: false,
  isEditing: false,
  isKeep: false,
  previewThumbName: null,
  previewGifName: null,
  previewOgpName: null,
};

const getters = {
  tagId: (state) => state.tagId,
  tags: (state) => state.tags,
  telops: (state) => state.telops,
  start: (state) => state.start,
  end: (state) => state.end,
  privacySetting: (state) => state.privacySetting,
  myPlaylistToSave: (state) => state.myPlaylistToSave,
  controlTransitNext: (state) => state.controlTransitNext,
  tagHistories: (state) => state.tagHistories,
  isAdding: (state) => state.isAdding,
  isEditing: (state) => state.isEditing,
  isKeep: (state) => state.isKeep,
  previewThumbName: (state) => state.previewThumbName,
  previewGifName: (state) => state.previewGifName,
  previewOgpName: (state) => state.previewOgpName,
};

const mutations = {
  setTagId(state, data) {
    state.tagId = data;
  },
  setTags(state, data) {
    state.tags = data;
  },
  setTelops(state, data) {
    state.telops = data;
  },
  setStart(state, data) {
    state.start = data ? myMixin.data().timeMath.toHis(data) : "";
  },
  setEnd(state, data) {
    state.end = data ? myMixin.data().timeMath.toHis(data) : "";
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
  setIsAdding(state, data) {
    state.isAdding = data;
  },
  setIsEditing(state, data) {
    state.isEditing = data;
  },
  setIsKeep(state, data) {
    state.isKeep = data;
  },
  setPreviewThumbName(state, data) {
    state.previewThumbName = data;
  },
  setPreviewGifName(state, data) {
    state.previewGifName = data;
  },
  setPreviewOgpName(state, data) {
    state.previewOgpName = data;
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
};

const actions = {
  //シーンタグの保存
  async storeSceneTags(context) {
    //シーンタグの余計なスペースを除去し整形
    context.commit("formatSceneTags");

    let params = {
      youtubeId: store.getters["youtube/youtubeId"],
      isNew: store.getters["youtube/isNew"],
      newVideoData: store.getters["youtube/newVideoData"],
      tags: state.tags,
      telops: state.telops,
      start: state.start,
      end: state.end,
      privacySetting: state.privacySetting,
      myPlaylistToSave: state.myPlaylistToSave, //playlist ID
    };

    const response = await axios.post("/api/tag/storeSceneTags", params);
    if (response.status == CREATED) {
      //成功した時
      //storeTagThumbnailとstoreTagPreview用にtagIdを格納
      context.commit("setTagId", response.data.tag.id);

      //storeのTagデータを更新
      await context.dispatch("youtube/getTag", "", { root: true });

      //動画をDBに保存したのでisNewフラグをfalseにセット
      if (params.isNew) {
        //storeのVideoデータを更新
        await context.dispatch("youtube/getVideo", params.youtubeId, {
          root: true,
        });
        context.commit("youtube/setIsNew", false, { root: true });
      }

      //サムネイル・プレビュー動画・OGPファイル名を格納
      context.commit("setPreviewThumbName", response.data.tag.preview);
      context.commit("setPreviewGifName", response.data.tag.previewgif);
      context.commit("setPreviewOgpName", response.data.tag.previewogp);
    } else if (response.status == INTERNAL_SERVER_ERROR) {
      // 失敗した時
      context.commit("error/setCode", response.status, { root: true });
    } else {
      // 上記以外で失敗した時
      context.commit("error/setCode", response.status, { root: true });
    }
  },

  //場面のサムネイルを取得しS3に保存
  async storeTagThumbAndPreview(context) {
    let params = {
      tagId: state.tagId,
      youtubeId: store.getters["youtube/youtubeId"],
      start: state.start,
      end: state.end,
    };
    let playlistIdTosaveThumbAndPreview = state.myPlaylistToSave;

    const response = await axios.post(
      "/api/tag/storeTagThumbAndPreview",
      params
    );
    if (response.status == CREATED) {
      // 成功した時

      //scenelistページの切り抜いた画面一覧を再ロード
      await context.dispatch(
        "watch/getPlaylistAndTagVideoDataById",
        playlistIdTosaveThumbAndPreview,
        { root: true }
      );

      //keyを更新して各ページでサムネイルを含むデータを再ロード
      context.commit(
        "playlist/setResetKey",
        !store.getters["playlist/resetKey"],
        { root: true }
      );
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
      telops: state.telops,
      start: state.start,
      end: state.end,
      privacySetting: state.privacySetting,
    };

    const response = await axios.post("/api/tag/update", params);
    if (response.status == CREATED) {
      // 成功した時
      //storeのタグデータを更新
      context.dispatch("youtube/getTag", "", {
        root: true,
      });

      //サムネイル・プレビュー動画・OGPファイル名を格納
      context.commit("setPreviewThumbName", response.data.tag.preview);
      context.commit("setPreviewGifName", response.data.tag.previewgif);
      context.commit("setPreviewOgpName", response.data.tag.previewogp);

      //keyを更新して各ページでサムネイルを含むデータを再ロード
      context.commit(
        "playlist/setResetKey",
        !store.getters["playlist/resetKey"],
        { root: true }
      );
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
