const state = {
  showNavbar: false,
  isActiveSearch: false,
  searchquery: null,
};

const getters = {
  showNavbar: (state) => state.showNavbar,
  isActiveSearch: (state) => state.isActiveSearch,
  searchquery: (state) => state.searchquery,
};

const mutations = {
  setShowNavbar(state, data) {
    state.showNavbar = data;
  },
  setIsActiveSearch(state, data) {
    state.isActiveSearch = data;
  },
  setSearchquery(state, data) {
    state.searchquery = data;
  },
  resetNavbar(state) {
    state.showNavbar = false;
    state.isActiveSearch = false;
    state.searchquery = null;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
