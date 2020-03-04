import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import tag from "./tag";
import playlist from "./playlist";
import error from "./error";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    tag,
    playlist,
    error
  }
});

export default store;
