import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import watch from "./watch";
import video from "./video";
import tag from "./tag";
import playlist from "./playlist";
import like from "./like";
import likePlaylist from "./likePlaylist";
import search from "./search";
import noLoginModal from "./noLoginModal";
import shareModal from "./shareModal";
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
    search,
    noLoginModal,
    shareModal,
    error
  }
});

export default store;
