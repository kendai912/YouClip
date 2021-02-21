const state = {
  showNavbar: false,
  isActiveSearch: false,
  searchquery: null,
  activeTabIndex: 0,
};

const getters = {
  showNavbar: (state) => state.showNavbar,
  isActiveSearch: (state) => state.isActiveSearch,
  searchquery: (state) => state.searchquery,
  activeTabIndex: (state) => state.activeTabIndex,
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
  setActiveTabIndex(state, data) {
    state.activeTabIndex = data;
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
