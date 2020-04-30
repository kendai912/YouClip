const state = {
  showShareModal: false,
  shareUrl: "",
  shareText: ""
};

const getters = {
  showShareModal: state => state.showShareModal,
  shareUrl: state => state.shareUrl,
  shareText: state => state.shareText
};

const mutations = {
  openShareModal(state) {
    if (navigator.share) {
      //スマホでのシェア
      navigator
        .share({
          title: "YouClip",
          text: state.shareText,
          url: state.shareUrl
        })
        .then(() => {
          console.log("Share succeeded");
        })
        .catch(error => {
          console.log("Share failed", error);
        });
    } else {
      //スマホ以外でのシェア
      state.showShareModal = true;
    }
  },
  closeShareModal(state) {
    state.showShareModal = false;
  },
  setShareUrl(state, data) {
    state.shareUrl = data;
  },
  setShareText(state, data) {
    state.shareText = data;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
