import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import watch from "./watch";
import video from "./video";
import tag from "./tag";
import playlist from "./playlist";
import like from "./like";
import search from "./search";
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
    search,
    error
  }
});

export default store;
