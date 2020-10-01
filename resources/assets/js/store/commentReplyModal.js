const state = {
  showCommentReplyModal: false,
};

const getters = {
  showCommentReplyModal: state => state.showCommentReplyModal,
};

const mutations = {
  openCommentReplyModal(state) {
    state.showCommentReplyModal = true;
  },
  closeCommentReplyModal(state) {
    state.showCommentReplyModal = false;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
