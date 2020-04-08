import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";
import store from "../store";

const state = {
  showSceneTagControl: false,
  showTaggingControl: "TimeControl",
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
};

const actions = {
  //シーンタグの保存
  async storeSceneTags(context) {
    //シーンタグの余計なスペースを除去し整形
    let tagsToSend = state.tags;
    let valDividedBySpace;
    for (let i = 0; i < tagsToSend.length; i++) {
      //スペースが含まれる場合はシーンタグを分割し追加
      if (tagsToSend[i].match(/[\s| |　]/)) {
        valDividedBySpace = tagsToSend[i].split(/[\s| |　]/);
        Array.prototype.splice.apply(
          tagsToSend,
          [i, 1].concat(valDividedBySpace)
        );
      }
    }
    //スペースのみのシーンタグを削除
    for (let i = 0; i < tagsToSend.length; i++) {
      if (tagsToSend[i] == "") {
        tagsToSend.splice(i, 1);
        i--;
      }
    }

    let params = {
      youtubeId: store.getters["youtube/youtubeId"],
      isNew: store.getters["youtube/isNew"],
      newVideoData: store.getters["youtube/newVideoData"],
      tags: tagsToSend,
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
