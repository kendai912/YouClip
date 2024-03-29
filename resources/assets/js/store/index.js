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
import highlight from "./highlight";
import highlightHeader from "./highlightHeader";
import YTsearch from "./YTsearch";
import youtube from "./youtube";
import ytPlayerController from "./ytPlayerController";
import ytSeekBar from "./ytSeekBar";
import tagging from "./tagging";
import noLoginModal from "./noLoginModal";
import confirmationModal from "./confirmationModal";
import playlistDeleteModal from "./playlistDeleteModal";
import tagDeleteModal from "./tagDeleteModal";
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
    highlight,
    highlightHeader,
    YTsearch,
    youtube,
    ytPlayerController,
    ytSeekBar,
    tagging,
    noLoginModal,
    confirmationModal,
    playlistDeleteModal,
    tagDeleteModal,
    otherActionModal,
    playSpeedModal,
    commentReplyModal,
    error,
  },
});

export default store;
