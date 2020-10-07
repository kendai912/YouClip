import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import watch from "./watch";
import video from "./video";
import tag from "./tag";
import playlist from "./playlist";
import like from "./like";
import likePlaylist from "./likePlaylist";
import loadingItem from "./loadingItem";
import navbar from "./navbar";
import search from "./search";
import shareModal from "./shareModal";
import snackbar from "./snackbar";
import YTsearch from "./YTsearch";
import youtube from "./youtube";
import tagging from "./tagging";
import noLoginModal from "./noLoginModal";
import otherActionModal from "./otherActionModal";
import playSpeedModal from "./playSpeedModal";
import commentReplyModal from "./commentReplyModal";
import error from "./error";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    watch,
    video,
    tag,
    playlist,
    like,
    likePlaylist,
    loadingItem,
    navbar,
    search,
    shareModal,
    snackbar,
    YTsearch,
    youtube,
    tagging,
    noLoginModal,
    otherActionModal,
    playSpeedModal,
    commentReplyModal,
    error,
  },
});

export default store;
