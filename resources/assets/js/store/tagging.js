import axios from "axios";
import { OK, CREATED, INTERNAL_SERVER_ERROR } from "../util";
import router from "../router";
import store from "../store";

const state = {
  showTaggingControl: "TimeControl",
  tags: null,
  start: null,
  end: null,
  controlTransitNext: true
};

const getters = {
  showTaggingControl: state => state.showTaggingControl,
  tags: state => state.tags,
  start: state => state.start,
  end: state => state.end,
  controlTransitNext: state => state.controlTransitNext
};

const mutations = {
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
  }
};

const actions = {
  //シーンタグの保存
  async storeSceneTags(context) {
    let params = {
      youtubeId: store.getters["youtube/youtubeId"],
      isNew: store.getters["youtube/isNew"],
      newVideoData: store.getters["youtube/newVideoData"],
      tags: state.tags,
      start: state.start,
      end: state.end
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
