import axios from "axios";
import router from "../router";

const state = {
  searchQuery: null,
  candidates: []
};

const getters = {
  searchQuery: state => state.searchQuery,
  candidates: state => state.candidates
};

const mutations = {
  setSearchQuery(state, data) {
    state.searchQuery = data;
  },
  setCandidates(state, data) {
    state.candidates = data;
  }
};

const actions = {
  search() {
    console.log(state.searchQuery);
    router.push("/result?search_query=${searchQuery}");
    // router.push("/");
  },
  searchCandidates(context, input) {
    let params = {
      input: input
    };

    axios
      .post("api/search/candidates", params)
      .then(function(response) {
        // 成功した時
        context.commit("setCandidates", response.data.candidates);
      })
      .catch(function(error) {
        // 失敗した時
        context.commit("error/setCode", response.status, { root: true });
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
