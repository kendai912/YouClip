import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import tag from "./tag";
import playlist from "./playlist";
import search from "./search";
import error from "./error";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    tag,
    playlist,
    search,
    error
  }
});

export default store;