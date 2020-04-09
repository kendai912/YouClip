import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";
import store from "../store";

const state = {
  showSceneTagControl: false,
  showTaggingControl: "TimeControl",
  tagId: null,
  tags: null,
  start: null,
  end: null,
  controlTransitNext: true,
  itemsList: [],
  isEditting: false,
};

const getters = {
  showSceneTagControl: (state) => state.showSceneTagControl,
  showTaggingControl: (state) => state.showTaggingControl,
  tagId: (state) => state.tagId,
  tags: (state) => state.tags,
  start: (state) => state.start,
  end: (state) => state.end,
  controlTransitNext: (state) => state.controlTransitNext,
  itemsList: (state) => state.itemsList,
  isEditting: (state) => state.isEditting,
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
  setControlTransitNext(state, data) {
    state.controlTransitNext = data;
  },
  setItemsList(state, data) {
    state.itemsList.push(...data);
  },
  setIsEditting(state, data) {
    state.isEditting = data;
  },
  //シーンタグの余計なスペースを除去し整形
  formatSceneTags(state) {
    let valDividedBySpace;
    for (let i = 0; i < state.tags.length; i++) {
      //スペースが含まれる場合はシーンタグを分割し追加
      if (state.tags[i].match(/[\s| |　]/)) {
        valDividedBySpace = state.tags[i].split(/[\s| |　]/);
        Array.prototype.splice.apply(
          state.tags,
          [i, 1].concat(valDividedBySpace)
        );
      }
    }
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
    // //シーンタグの余計なスペースを除去し整形
    context.commit("formatSceneTags");

    let params = {
      youtubeId: store.getters["youtube/youtubeId"],
      isNew: store.getters["youtube/isNew"],
      newVideoData: store.getters["youtube/newVideoData"],
      tags: state.tags,
      start: state.start,
      end: state.end,
    };

    const response = await axios.post("/api/tag/store", params);
    if (response.status == CREATED) {
      // 成功した時
      //入力フォームをクリア
      context.commit("setTags", "");
      context.commit("setStart", "");
      context.commit("setEnd", "");

      //画面下部のシーンの遷移モードを変更(true:右スライド, false:左スライド)
      context.commit("setControlTransitNext", false);
      //TimeControlのシートへ戻る
      context.commit("setShowTaggingControl", "TimeControl");
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
    };

    const response = await axios.post("/api/tag/update", params);
    if (response.status == CREATED) {
      // 成功した時
      //入力フォームをクリア
      context.commit("setTags", "");
      context.commit("setStart", "");
      context.commit("setEnd", "");

      //画面下部のシーンの遷移モードを変更(true:右スライド, false:左スライド)
      context.commit("setControlTransitNext", false);
      context.commit("setShowTaggingControl", "TimeControl");
      //シーンタグ付けコンポーネントを非表示にし再生画面に戻る
      context.commit("setShowSceneTagControl", false);
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
