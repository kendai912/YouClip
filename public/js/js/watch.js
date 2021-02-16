(self["webpackChunkSrc"] = self["webpackChunkSrc"] || []).push([["js/watch"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/CommentListWatch.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/CommentListWatch.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_NoLoginModal_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/NoLoginModal.vue */ "./resources/assets/js/components/NoLoginModal.vue");
/* harmony import */ var _components_CommentReplyModal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/CommentReplyModal.vue */ "./resources/assets/js/components/CommentReplyModal.vue");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    NoLoginModal: _components_NoLoginModal_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    CommentReplyModal: _components_CommentReplyModal_vue__WEBPACK_IMPORTED_MODULE_2__.default
  },
  data: function data() {
    return {
      showReplyList: [],
      content: "",
      parentId: 0,
      commentRules: [function (v) {
        return !!v || "コメントを入力して下さい";
      }],
      mostLikesItem: null,
      panelComment: 0
    };
  },
  props: {
    mediaItems: Array
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_3__.default],
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapGetters)({
    playlistId: "watch/playlistId",
    listIndex: "watch/listIndex",
    commentListofPlaylist: "playlist/commentListofPlaylist",
    user_id: "auth/user_id",
    showLoginModal: "noLoginModal/showLoginModal",
    showCommentReplyModal: "commentReplyModal/showCommentReplyModal",
    isLogin: "auth/check"
  })),
  methods: {
    getTotal: function getTotal(items) {
      var total = items.length;
      items.forEach(function (item) {
        total += item.replies.length;
      });
      return total;
    },
    addComment: function addComment() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var data, _data;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this.$route.query.playlist) {
                  _context.next = 13;
                  break;
                }

                if (!_this.isLogin) {
                  _context.next = 9;
                  break;
                }

                if (!_this.$refs.form.validate()) {
                  _context.next = 7;
                  break;
                }

                data = {
                  playlist_id: _this.$route.query.playlist,
                  content: _this.content,
                  user_id: _this.user_id,
                  parent_id: 0
                };
                _context.next = 6;
                return _this.$store.dispatch("playlist/addPlaylistComment", data);

              case 6:
                _this.content = "";

              case 7:
                _context.next = 11;
                break;

              case 9:
                _this.$store.commit("noLoginModal/openLoginModal");

                _this.$store.commit("noLoginModal/setMessageWhenNotLogined", "まとめを作成するには、ログインしてください。(入力データは保持されます)");

              case 11:
                _context.next = 24;
                break;

              case 13:
                if (!_this.$route.query.tag) {
                  _context.next = 24;
                  break;
                }

                if (!_this.isLogin) {
                  _context.next = 22;
                  break;
                }

                if (!_this.$refs.form.validate()) {
                  _context.next = 20;
                  break;
                }

                _data = {
                  tag_id: _this.$route.query.tag,
                  content: _this.content,
                  user_id: _this.user_id,
                  parent_id: 0
                };
                _context.next = 19;
                return _this.$store.dispatch("tag/addTagComment", _data);

              case 19:
                _this.content = "";

              case 20:
                _context.next = 24;
                break;

              case 22:
                _this.$store.commit("noLoginModal/openLoginModal");

                _this.$store.commit("noLoginModal/setMessageWhenNotLogined", "まとめを作成するには、ログインしてください。(入力データは保持されます)");

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    resetComment: function resetComment() {
      this.content = "";
    },
    likeComment: function likeComment(comment) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this2.isLogin) {
                  _context2.next = 14;
                  break;
                }

                data = {
                  user_id: _this2.user_id,
                  comment_id: comment.comment_id,
                  parent_id: comment.parent_id,
                  cmt_option: 1,
                  isLiked: !comment.isLiked
                };

                if (!_this2.$route.query.playlist) {
                  _context2.next = 8;
                  break;
                }

                data.cmt_option = 1;
                _context2.next = 6;
                return _this2.$store.dispatch("playlist/likeComment", data);

              case 6:
                _context2.next = 12;
                break;

              case 8:
                if (!_this2.$route.query.tag) {
                  _context2.next = 12;
                  break;
                }

                data.cmt_option = 0;
                _context2.next = 12;
                return _this2.$store.dispatch("tag/likeComment", data);

              case 12:
                _context2.next = 16;
                break;

              case 14:
                _this2.$store.commit("noLoginModal/openLoginModal");

                _this2.$store.commit("noLoginModal/setMessageWhenNotLogined", "まとめを作成するには、ログインしてください。(入力データは保持されます)");

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    showReplies: function showReplies(cmtIndex) {
      if (this.isOpened(cmtIndex)) {
        var index = this.showReplyList.indexOf(cmtIndex);

        if (index > -1) {
          this.showReplyList.splice(index, 1);
        }
      } else {
        this.showReplyList.push(cmtIndex);
      }
    },
    isOpened: function isOpened(cmtIndex) {
      return this.showReplyList.includes(cmtIndex);
    },
    addCommentReply: function addCommentReply(parentId) {
      this.parentId = parentId;
      this.$store.commit("commentReplyModal/openCommentReplyModal");
    },
    getMostLikesItem: function getMostLikesItem(commentList) {
      if (commentList.length > 0) {
        var maxLikesComment = commentList.reduce(function (max, comment) {
          return comment.likes_count > max.likes_count ? comment : max;
        }, commentList[0]);
        this.mostLikesItem = maxLikesComment;
      }
    }
  },
  created: function created() {
    this.$store.commit("noLoginModal/closeLoginModal");
  },
  beforeMount: function beforeMount() {
    this.getMostLikesItem(this.mediaItems);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/CommentReplyModal.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/CommentReplyModal.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      content: "",
      commentRules: [function (v) {
        return !!v || "コメントを入力して下さい";
      }]
    };
  },
  props: {
    parentId: Number
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)({
    isLogin: "auth/check",
    user_id: "auth/user_id"
  })), {}, {
    showCommentReplyModal: {
      get: function get() {
        return this.$store.getters["commentReplyModal/showCommentReplyModal"];
      },
      set: function set() {
        return this.$store.commit("commentReplyModal/closeCommentReplyModal");
      }
    }
  }),
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapMutations)({
    closeCommentReplyModal: "commentReplyModal/closeCommentReplyModal"
  })), {}, {
    addReply: function addReply() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var data, _data;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this.$route.query.playlist) {
                  _context.next = 13;
                  break;
                }

                if (!_this.isLogin) {
                  _context.next = 9;
                  break;
                }

                if (!_this.$refs.form.validate()) {
                  _context.next = 7;
                  break;
                }

                data = {
                  playlist_id: _this.$route.query.playlist,
                  content: _this.content,
                  user_id: _this.user_id,
                  parent_id: _this.parentId
                };
                _context.next = 6;
                return _this.$store.dispatch("playlist/addPlaylistComment", data);

              case 6:
                _this.$store.commit("commentReplyModal/closeCommentReplyModal");

              case 7:
                _context.next = 11;
                break;

              case 9:
                _this.$store.commit("noLoginModal/openLoginModal");

                _this.$store.commit("noLoginModal/setMessageWhenNotLogined", "まとめを作成するには、ログインしてください。(入力データは保持されます)");

              case 11:
                _context.next = 24;
                break;

              case 13:
                if (!_this.$route.query.tag) {
                  _context.next = 24;
                  break;
                }

                if (!_this.isLogin) {
                  _context.next = 22;
                  break;
                }

                if (!_this.$refs.form.validate()) {
                  _context.next = 20;
                  break;
                }

                _data = {
                  tag_id: _this.$route.query.tag,
                  content: _this.content,
                  user_id: _this.user_id,
                  parent_id: _this.parentId
                };
                _context.next = 19;
                return _this.$store.dispatch("tag/addTagComment", _data);

              case 19:
                _this.$store.commit("commentReplyModal/closeCommentReplyModal");

              case 20:
                _context.next = 24;
                break;

              case 22:
                _this.$store.commit("noLoginModal/openLoginModal");

                _this.$store.commit("noLoginModal/setMessageWhenNotLogined", "まとめを作成するには、ログインしてください。(入力データは保持されます)");

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }),
  created: function created() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/OtherActionModal.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/OtherActionModal.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      tiles: [// { img: "fas fa-trash", title: "再生中のシーンを削除", action: "delete", show: "check" },
      // { img: "fas fa-pen", title: "再生中のシーンを編集", action: "edit", show: "check" },
      // { img: "fas fa-flag", title: "報告", action: "report", show: "always" },
      {
        img: "fas fa-times",
        title: "キャンセル",
        action: "cancel",
        show: "always"
      }]
    };
  },
  props: {
    player: Object,
    created_user_id: Number
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_1__.default],
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapGetters)({
    user_id: "auth/user_id",
    currentYoutubeId: "watch/currentYoutubeId",
    startHis: "watch/start",
    endHis: "watch/end",
    currentTagId: "watch/currentTagId",
    currentTagNameArray: "watch/currentTagNameArray",
    tagPrivacySetting: "watch/tagPrivacySetting"
  })), {}, {
    startIs: function startIs() {
      return this.formatToMinSec(this.startHis);
    },
    endIs: function endIs() {
      return this.formatToMinSec(this.endHis);
    },
    showOtherActionModal: {
      get: function get() {
        this.player.pauseVideo();
        return this.$store.getters["otherActionModal/showOtherActionModal"];
      },
      set: function set() {
        this.player.playVideo();
        return this.$store.commit("otherActionModal/closeOtherActionModal");
      }
    }
  }),
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapMutations)({
    closeOtherActionModal: "otherActionModal/closeOtherActionModal"
  })), {}, {
    tapTile: function tapTile(action) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(action == "delete")) {
                  _context.next = 7;
                  break;
                }

                //otherActionModalを閉じる
                _this.closeOtherActionModal();

                _this.$store.commit("tagging/setTagId", _this.currentTagId);

                _this.$store.dispatch("tagging/deleteTag"); //シーンタグ削除完了のトーストを表示し遷移


                _this.$emit("deleteSucceed");

                _context.next = 25;
                break;

              case 7:
                if (!(action == "edit")) {
                  _context.next = 24;
                  break;
                }

                //otherActionModalを閉じる
                _this.closeOtherActionModal(); //「編集」に必要なyoutubeデータをロード


                _this.$store.commit("youtube/setYoutubeId", _this.currentYoutubeId);

                _context.next = 12;
                return _this.$store.dispatch("youtube/getVideo", _this.currentYoutubeId);

              case 12:
                _context.next = 14;
                return _this.$store.dispatch("youtube/getTag");

              case 14:
                _this.$store.commit("youtube/setIsReady", true); //編集モードフラグをセット


                _this.$store.commit("tagging/setIsEditing", true); //編集前のタグID・開始時間・終了時間・シーンタグをセット


                _this.$store.commit("tagging/setTagId", _this.currentTagId);

                _this.$store.commit("tagging/setStart", _this.startIs);

                _this.$store.commit("tagging/setEnd", _this.endIs);

                _this.$store.commit("tagging/setTags", _this.currentTagNameArray);

                _this.$store.commit("tagging/setPrivacySetting", _this.tagPrivacySetting); //シーンタグ付けコンポーネントを表示


                _this.$store.commit("tagging/setShowSceneTagControl", true);

                _context.next = 25;
                break;

              case 24:
                if (action == "report") {} else if (action == "cancel") {
                  _this.player.playVideo();

                  _this.closeOtherActionModal();
                }

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }),
  created: function created() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/SceneListWatch.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/SceneListWatch.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      panel: 0,
      isMobile: false,
      opened: true
    };
  },
  props: {
    mediaItems: Array
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_0__.default],
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)({
    listIndex: "ytPlayer/listIndex"
  })),
  watch: {
    panel: function panel() {
      if (this.panel !== 0) {
        this.loaded();
      } else {
        $(".sceneListExpansionPanelCustomHeader").height("auto");
      }
    }
  },
  methods: {
    select: function select(index) {
      //選択した場面を再生
      this.$emit("switchToPlayListIndexOf", index);
    },
    readMore: function readMore(arrayData) {
      var newArray = [];

      if (arrayData.length > 2) {
        for (var i = 0; i < 2; i++) {
          newArray.push(arrayData[i]);
        }

        return newArray;
      } else {
        return arrayData;
      }
    },
    loaded: function loaded() {
      var self = this;
      setTimeout(function () {
        var outterHeight = $(".sceneListExpansionPanelCustomHeader").height();
        var innerHeight = $(".sceneListExpansionPanelCustomHeaderContent").height();

        if (outterHeight + 32 < innerHeight + 48) {
          if (self.isMobile) {
            $(".sceneListExpansionPanelCustomHeadermobileHight").height(144);
          } else {
            $(".sceneListExpansionPanelCustomHeader").height(176);
          }
        } else {
          if (self.isMobile) {
            $(".sceneListExpansionPanelCustomHeadermobileHight").height(128);
          } else {
            $(".sceneListExpansionPanelCustomHeader").height(152);
          }
        }
      }, 100);
    }
  },
  filters: {
    formatTime: function formatTime(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  created: function created() {
    this.isMobile = this.mobileCheck();
    var self = this;
    this.$nextTick(function () {
      $("#panelScene").on("click", function (e) {
        self.opened = !self.opened;
      });
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/ShareModal.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/ShareModal.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    player: Object
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapGetters)({
    shareUrl: "shareModal/shareUrl",
    shareText: "shareModal/shareText"
  })), {}, {
    showShareModal: {
      get: function get() {
        this.player.pauseVideo();
        return this.$store.getters["shareModal/showShareModal"];
      },
      set: function set() {
        this.player.playVideo();
        return this.$store.commit("shareModal/closeShareModal");
      }
    },
    encodedShareURI: function encodedShareURI() {
      return encodeURIComponent(this.shareUrl);
    }
  }),
  methods: {
    closeShareModal: function closeShareModal() {
      this.$store.commit("shareModal/closeShareModal"); //プレイヤーを再開

      this.player.playVideo();
    },
    shareOnSNS: function shareOnSNS(e) {
      e.preventDefault(); //共有先SNSのリンクを取得

      var URI = e.currentTarget.getAttribute("data-href");
      window.open(URI, "SNS_window", "width=600, height=500, menubar=no, toolbar=no, scrollbars=yes");
    },
    copySelectedTagURL: function copySelectedTagURL() {
      //bodyタグの末尾に設置
      $(document.body).append('<div id="tmp_copy_for_range" style="position:fixed;right:100vw;font-size:16px;" readonly="readonly">' + this.shareUrl + "</div>" + '<div style="position:fixed;right:100vw;font-size:16px;"><input id="tmp_copy_for_select" readonly="readonly">' + this.shareUrl + "</input></div>"); //rangeファンクション用(iOS向け)

      try {
        var elm_range = $("#tmp_copy_for_range")[0]; //rangeでtextarea内の文字を選択

        var range = document.createRange();
        range.selectNodeContents(elm_range);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (e) {} //execCommandを実施


      document.execCommand("copy"); //selectファンクション用(iOS以外向け)

      try {
        var elm_select = $("#tmp_copy_for_select")[0]; //select()でtextarea内の文字を選択

        elm_select.select();
        elm_select.setSelectionRange(0, 999999);
      } catch (e) {} //execCommandを実施


      document.execCommand("copy"); //末尾に追加した要素を削除

      $(elm_range).remove();
      $(elm_select).remove(); //モーダルを閉じる

      this.closeShareModal();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Watch.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Watch.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_NoLoginModal_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/NoLoginModal.vue */ "./resources/assets/js/components/NoLoginModal.vue");
/* harmony import */ var _components_ShareModal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ShareModal.vue */ "./resources/assets/js/components/ShareModal.vue");
/* harmony import */ var _components_OtherActionModal_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/OtherActionModal.vue */ "./resources/assets/js/components/OtherActionModal.vue");
/* harmony import */ var _components_PlaySpeedModal_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PlaySpeedModal.vue */ "./resources/assets/js/components/PlaySpeedModal.vue");
/* harmony import */ var _components_SceneListWatch_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/SceneListWatch.vue */ "./resources/assets/js/components/SceneListWatch.vue");
/* harmony import */ var _components_CommentListWatch_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/CommentListWatch.vue */ "./resources/assets/js/components/CommentListWatch.vue");
/* harmony import */ var _components_YTIframe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/YTIframe */ "./resources/assets/js/components/YTIframe.vue");
/* harmony import */ var _components_YTPlayerController__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/YTPlayerController */ "./resources/assets/js/components/YTPlayerController.vue");
/* harmony import */ var _components_YTSeekBar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/YTSeekBar */ "./resources/assets/js/components/YTSeekBar.vue");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  metaInfo: function metaInfo() {
    return {
      title: this.playlistName + " - YouClip",
      meta: [{
        name: "description",
        content: "YouTube動画のまとめ作成ツール、YouClipの「" + this.playlistName + "」です。YouClipでは、ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。また、みんなが作った人気のまとめを見ることも可能です。"
      }, {
        property: "og:site_name",
        content: "YouClip"
      }, {
        property: "og:type",
        content: "website"
      }, {
        property: "og:url",
        content: "https://youclip.jp" + this.$route.fullPath
      }, {
        property: "og:title",
        content: this.playlistName + " - YouClip"
      }, {
        property: "og:description",
        content: "YouTube動画のまとめ作成ツール、YouClipの「" + this.playlistName + "」です。YouClipでは、ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。"
      }, {
        property: "og:image",
        content: this.sceneListofPlaylist ? "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/thumbs/" + this.sceneListofPlaylist[0].preview : "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png"
      }],
      link: [{
        rel: "canonical",
        href: "https://youclip.jp" + this.$route.fullPath
      }]
    };
  },
  components: {
    NoLoginModal: _components_NoLoginModal_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    ShareModal: _components_ShareModal_vue__WEBPACK_IMPORTED_MODULE_2__.default,
    OtherActionModal: _components_OtherActionModal_vue__WEBPACK_IMPORTED_MODULE_3__.default,
    PlaySpeedModal: _components_PlaySpeedModal_vue__WEBPACK_IMPORTED_MODULE_4__.default,
    SceneListWatch: _components_SceneListWatch_vue__WEBPACK_IMPORTED_MODULE_5__.default,
    CommentListWatch: _components_CommentListWatch_vue__WEBPACK_IMPORTED_MODULE_6__.default,
    YTIframe: _components_YTIframe__WEBPACK_IMPORTED_MODULE_7__.default,
    YTPlayerController: _components_YTPlayerController__WEBPACK_IMPORTED_MODULE_8__.default,
    YTSeekBar: _components_YTSeekBar__WEBPACK_IMPORTED_MODULE_9__.default
  },
  data: function data() {
    return {
      ytIframeParameterReady: false,
      playlistIdUrl: "",
      indexUrl: 0,
      mediaItems: [],
      playlistCreatedAt: "",
      totalDuration: "00:00:00",
      totalDurationKanji: "",
      snackbar: false,
      timeout: 5000,
      text: "",
      watchBodyRef: this.$refs.watchBody
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_11__.mapGetters)({
    isLogin: "auth/check",
    sceneListofPlaylist: "playlist/sceneListofPlaylist",
    commentListofPlaylist: "playlist/commentListofPlaylist",
    playlistAndTagVideoData: "watch/playlistAndTagVideoData",
    currentYoutubeId: "watch/currentYoutubeId",
    tagAndVideoData: "watch/tagAndVideoData",
    isPlaylist: "watch/isPlaylist",
    playlistName: "watch/playlistName",
    playlistViewCount: "watch/playlistViewCount",
    showLoginModal: "noLoginModal/showLoginModal",
    messageWhenNotLogined: "noLoginModal/messageWhenNotLogined",
    showShareModal: "shareModal/showShareModal",
    showAddPlaylistModal: "playlist/showAddPlaylistModal",
    showOtherActionModal: "otherActionModal/showOtherActionModal",
    showPlaySpeedModal: "playSpeedModal/showPlaySpeedModal",
    isEditing: "tagging/isEditing",
    youtubeId: "ytPlayer/youtubeId",
    isPlayerReady: "ytPlayer/isPlayerReady",
    isPlaying: "ytPlayer/isPlaying",
    startHis: "ytPlayer/start",
    endHis: "ytPlayer/end",
    playSpeed: "ytPlayer/playSpeed",
    player: "ytPlayer/player",
    isMuted: "ytPlayer/isMuted"
  })), {}, {
    isLikedPlaylist: function isLikedPlaylist() {
      return this.$store.getters["likePlaylist/isLikedPlaylist"](this.playlistIdUrl);
    },
    likePlaylistCount: function likePlaylistCount() {
      return this.$store.getters["likePlaylist/likePlaylistCount"](this.playlistIdUrl);
    },
    startIs: function startIs() {
      return this.formatToMinSec(this.startHis);
    },
    endIs: function endIs() {
      return this.formatToMinSec(this.endHis);
    },
    jsonld: function jsonld() {
      return {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: this.playlistName,
        description: "YouTube動画をまとめてみました",
        thumbnailUrl: this.sceneListofPlaylist ? "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/thumbs/" + this.sceneListofPlaylist[0].preview : "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png",
        uploadDate: this.playlistAndTagVideoData ? this.convertToISOString(this.playlistAndTagVideoData.playlist_created_at) : "",
        duration: this.secondsToDuration(this.totalDuration),
        contentUrl: "https://youclip.jp" + this.$route.fullPath,
        interactionCount: this.playlistViewCount
      };
    }
  }),
  mixins: [_util__WEBPACK_IMPORTED_MODULE_10__.default],
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_11__.mapMutations)({
    openShareModal: "shareModal/openShareModal",
    openOtherActionModal: "otherActionModal/openOtherActionModal",
    openPlaySpeedModal: "playSpeedModal/openPlaySpeedModal",
    setListIndex: "watch/setListIndex",
    setPlayer: "ytPlayer/setPlayer",
    setIsMuted: "ytPlayer/setIsMuted"
  })), {}, {
    switchToPlayListIndexOf: function switchToPlayListIndexOf(index) {
      //URLを更新
      this.$router.push({
        path: "/watch",
        query: {
          playlist: this.playlistIdUrl,
          index: index
        }
      })["catch"](function (err) {}); //次のシーンをロードし再生

      this.$store.dispatch("ytPlayer/playListIndexOf", index);
    },
    toggleLikePlaylist: function toggleLikePlaylist() {
      if (!this.isLogin) {
        //未ログインの場合
        this.$store.commit("noLoginModal/openLoginModal");
        this.$store.commit("noLoginModal/setMessageWhenNotLogined", "まとめを評価するには、ログインしてください。");
      } else {
        //ログイン済の場合
        this.$store.dispatch("likePlaylist/toggleLikePlaylist", this.playlistIdUrl);
      }
    },
    sharePlaylist: function sharePlaylist() {
      //Playlist Share用のパラメーターを設定
      this.$store.commit("shareModal/setShareUrl", location.href);
      this.$store.commit("shareModal/setShareText", this.playlistName); //プレイヤーを一時停止

      this.player.pauseVideo(); //シェアモーダルを開く

      this.openShareModal();
    },
    unmute: function unmute() {
      this.player.unMute();
      this.setIsMuted(false);
    },
    mute: function mute() {
      this.player.mute();
      this.setIsMuted(true);
    },
    // gotoFollow() {
    //   let user_id = this.playlistIdUrl
    //     ? this.playlistAndTagVideoData.user_id
    //     : this.tagAndVideoData[0].tag_user_id;
    //   this.$router
    //     .push({
    //       path: "/myfollow",
    //       query: {
    //         user_id: user_id,
    //       },
    //     })
    //     .catch((err) => {});
    // },
    initialize: function initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);
      this.playlistIdUrl = "";
      this.$store.commit("watch/setPlaylistId", this.playlistIdUrl); //タグおよびまとめのLikeデータをロード

      this.$store.dispatch("like/loadTagLike");
      this.$store.dispatch("likePlaylist/loadPlaylistLike"); //clear all data before loading

      this.clearAllInput(); //倍速視聴を1倍のリセット

      this.$store.commit("ytPlayer/setPlaySpeed", 1);
    },
    clearAllInput: function clearAllInput() {
      this.$store.commit("ytSeekBar/setStartTimeInput", null);
      this.$store.commit("ytSeekBar/setEndTimeInput", null);
      this.$store.commit("tagging/setTags", "");
      this.$store.commit("tagging/setStart", "");
      this.$store.commit("tagging/setEnd", "");
      this.$store.commit("tagging/setPrivacySetting", "public");
    },
    hasYoutubeFrameAPI: function hasYoutubeFrameAPI() {
      if (!this.hasYTFrame) {
        this.hasYTFrame = !!document.getElementsByClassName(".yt-frame-api").length;
      }

      return this.hasYTFrame;
    },
    injectYoutubeFrameAPI: function injectYoutubeFrameAPI() {
      var youtubeExistsFlag = this.youtubeExistsFlag;
      var youtubeCallbackName = this.youtubeCallbackName;

      window[this.youtubeCallbackName] = window[this.youtubeCallbackName] || function () {
        window[youtubeExistsFlag] = true;
        window[youtubeCallbackName] = null;
        delete window[youtubeCallbackName];
      };

      var tag = document.createElement("script");
      var first = document.getElementsByTagName("script")[0];
      tag.src = "https://www.youtube.com/iframe_api";
      tag.className = "yt-frame-api";
      first.parentNode.insertBefore(tag, first);
    },
    whenYoutubeAPIReady: function whenYoutubeAPIReady() {
      var existsFlag = this.youtubeExistsFlag;
      return new Promise(function (resolve, reject) {
        var elapsed = 0;
        var intervalHandle;

        var checker = function checker() {
          elapsed += 48;

          if (!!window[existsFlag]) {
            clearTimeout(intervalHandle);
            resolve();
          } else {
            if (elapsed <= 15000) {
              intervalHandle = setTimeout(checker, 48);
            } else {
              reject("timeout");
            }
          }
        };

        setTimeout(checker, 48);
      });
    },
    convertToISOString: function convertToISOString(uploadedAt) {
      var date = new Date(uploadedAt.substring(0, 4), uploadedAt.substring(5, 7) - 1, uploadedAt.substring(8, 10));
      return date.toISOString();
    }
  }),
  watch: {
    isPlayerReady: function isPlayerReady() {
      if (this.isPlayerReady) {
        this.setYtPlayerCSS();
        this.$refs.ytSeekBar.setYtSeekbarWrapperTop();
      }
    }
  },
  created: function created() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var mediaItems, listOfYoutubeIdStartEndTime;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.initialize(); //URLのクエリパラメータからまとめIDとインデックスを取得


              _this.playlistIdUrl = _this.$route.query.playlist;
              _this.indexUrl = _this.$route.query.index; //まとめおよび動画・タグデータを取得

              _context.next = 5;
              return _this.$store.dispatch("watch/getPlaylistAndTagVideoDataById", _this.playlistIdUrl);

            case 5:
              //まとめIDとまとめ名、視聴回数をwatchストアに格納
              _this.$store.commit("watch/setPlaylistId", _this.playlistIdUrl);

              _this.$store.commit("watch/setPlaylistName", _this.playlistAndTagVideoData.playlistName);

              _this.$store.commit("watch/setPlaylistViewCount", _this.playlistAndTagVideoData.play_count); //Player直下のまとめ情報欄に表示する作成日・合計時間の情報を取得


              _this.playlistCreatedAt = _this.timeSince(_this.playlistAndTagVideoData.playlist_created_at);

              _this.playlistAndTagVideoData.tagVideoData.forEach(function (tag) {
                var duration = _this.timeMath.sub(tag.end, tag.start);

                _this.totalDuration = _this.timeMath.sum(_this.totalDuration, duration);
              });

              _this.totalDurationKanji = _this.convertToKanjiTime(_this.convertToSec(_this.totalDuration)); //場面リストをセット

              mediaItems = [];

              _this.putTagVideoIntoMediaItems(mediaItems, _this.playlistAndTagVideoData.tagVideoData);

              mediaItems.sort(function (a, b) {
                return a.scene_order > b.scene_order ? 1 : -1;
              });

              _this.$store.commit("playlist/setSceneListofPlaylist", mediaItems);

              _this.$store.commit("playlist/setCommentListofPlaylist", _this.playlistAndTagVideoData.comments); //YTPlayerのまとめの再生に必要なパラメータをセット


              listOfYoutubeIdStartEndTime = [];

              _this.putTagVideoIntolistOfYoutubeIdStartEndTime(listOfYoutubeIdStartEndTime, _this.playlistAndTagVideoData.tagVideoData);

              listOfYoutubeIdStartEndTime.sort(function (a, b) {
                return a.scene_order > b.scene_order ? 1 : -1;
              });

              _this.$store.commit("ytPlayer/setListOfYoutubeIdStartEndTime", listOfYoutubeIdStartEndTime);

              _this.$store.commit("ytPlayer/setListIndex", _this.indexUrl);

              _this.ytIframeParameterReady = true; //YTSeekBarのクリックイベント用にボディのrefをセット

              _this.watchBodyRef = _this.$refs.watchBody;

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
});

/***/ }),

/***/ "./resources/assets/js/components/CommentListWatch.vue":
/*!*************************************************************!*\
  !*** ./resources/assets/js/components/CommentListWatch.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CommentListWatch_vue_vue_type_template_id_38984469___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommentListWatch.vue?vue&type=template&id=38984469& */ "./resources/assets/js/components/CommentListWatch.vue?vue&type=template&id=38984469&");
/* harmony import */ var _CommentListWatch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommentListWatch.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/CommentListWatch.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _CommentListWatch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _CommentListWatch_vue_vue_type_template_id_38984469___WEBPACK_IMPORTED_MODULE_0__.render,
  _CommentListWatch_vue_vue_type_template_id_38984469___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/CommentListWatch.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/CommentReplyModal.vue":
/*!**************************************************************!*\
  !*** ./resources/assets/js/components/CommentReplyModal.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CommentReplyModal_vue_vue_type_template_id_a2c7b10a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommentReplyModal.vue?vue&type=template&id=a2c7b10a& */ "./resources/assets/js/components/CommentReplyModal.vue?vue&type=template&id=a2c7b10a&");
/* harmony import */ var _CommentReplyModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommentReplyModal.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/CommentReplyModal.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _CommentReplyModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _CommentReplyModal_vue_vue_type_template_id_a2c7b10a___WEBPACK_IMPORTED_MODULE_0__.render,
  _CommentReplyModal_vue_vue_type_template_id_a2c7b10a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/CommentReplyModal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/OtherActionModal.vue":
/*!*************************************************************!*\
  !*** ./resources/assets/js/components/OtherActionModal.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _OtherActionModal_vue_vue_type_template_id_2eb2bb9e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OtherActionModal.vue?vue&type=template&id=2eb2bb9e& */ "./resources/assets/js/components/OtherActionModal.vue?vue&type=template&id=2eb2bb9e&");
/* harmony import */ var _OtherActionModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OtherActionModal.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/OtherActionModal.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _OtherActionModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _OtherActionModal_vue_vue_type_template_id_2eb2bb9e___WEBPACK_IMPORTED_MODULE_0__.render,
  _OtherActionModal_vue_vue_type_template_id_2eb2bb9e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/OtherActionModal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/SceneListWatch.vue":
/*!***********************************************************!*\
  !*** ./resources/assets/js/components/SceneListWatch.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SceneListWatch_vue_vue_type_template_id_8ab9b1c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SceneListWatch.vue?vue&type=template&id=8ab9b1c8& */ "./resources/assets/js/components/SceneListWatch.vue?vue&type=template&id=8ab9b1c8&");
/* harmony import */ var _SceneListWatch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SceneListWatch.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/SceneListWatch.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _SceneListWatch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _SceneListWatch_vue_vue_type_template_id_8ab9b1c8___WEBPACK_IMPORTED_MODULE_0__.render,
  _SceneListWatch_vue_vue_type_template_id_8ab9b1c8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/SceneListWatch.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/ShareModal.vue":
/*!*******************************************************!*\
  !*** ./resources/assets/js/components/ShareModal.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ShareModal_vue_vue_type_template_id_6e1d36f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShareModal.vue?vue&type=template&id=6e1d36f6& */ "./resources/assets/js/components/ShareModal.vue?vue&type=template&id=6e1d36f6&");
/* harmony import */ var _ShareModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShareModal.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/ShareModal.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _ShareModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _ShareModal_vue_vue_type_template_id_6e1d36f6___WEBPACK_IMPORTED_MODULE_0__.render,
  _ShareModal_vue_vue_type_template_id_6e1d36f6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/ShareModal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/pages/Watch.vue":
/*!*********************************************!*\
  !*** ./resources/assets/js/pages/Watch.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Watch_vue_vue_type_template_id_9d53053c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Watch.vue?vue&type=template&id=9d53053c& */ "./resources/assets/js/pages/Watch.vue?vue&type=template&id=9d53053c&");
/* harmony import */ var _Watch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Watch.vue?vue&type=script&lang=js& */ "./resources/assets/js/pages/Watch.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Watch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Watch_vue_vue_type_template_id_9d53053c___WEBPACK_IMPORTED_MODULE_0__.render,
  _Watch_vue_vue_type_template_id_9d53053c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/pages/Watch.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/CommentListWatch.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/CommentListWatch.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentListWatch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CommentListWatch.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/CommentListWatch.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentListWatch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/CommentReplyModal.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/assets/js/components/CommentReplyModal.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentReplyModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CommentReplyModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/CommentReplyModal.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentReplyModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/OtherActionModal.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/OtherActionModal.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OtherActionModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OtherActionModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/OtherActionModal.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OtherActionModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/SceneListWatch.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/assets/js/components/SceneListWatch.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SceneListWatch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SceneListWatch.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/SceneListWatch.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SceneListWatch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/ShareModal.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/assets/js/components/ShareModal.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ShareModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/ShareModal.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/pages/Watch.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/assets/js/pages/Watch.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Watch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Watch.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Watch.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Watch_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/CommentListWatch.vue?vue&type=template&id=38984469&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/CommentListWatch.vue?vue&type=template&id=38984469& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentListWatch_vue_vue_type_template_id_38984469___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentListWatch_vue_vue_type_template_id_38984469___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentListWatch_vue_vue_type_template_id_38984469___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CommentListWatch.vue?vue&type=template&id=38984469& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/CommentListWatch.vue?vue&type=template&id=38984469&");


/***/ }),

/***/ "./resources/assets/js/components/CommentReplyModal.vue?vue&type=template&id=a2c7b10a&":
/*!*********************************************************************************************!*\
  !*** ./resources/assets/js/components/CommentReplyModal.vue?vue&type=template&id=a2c7b10a& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentReplyModal_vue_vue_type_template_id_a2c7b10a___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentReplyModal_vue_vue_type_template_id_a2c7b10a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CommentReplyModal_vue_vue_type_template_id_a2c7b10a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CommentReplyModal.vue?vue&type=template&id=a2c7b10a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/CommentReplyModal.vue?vue&type=template&id=a2c7b10a&");


/***/ }),

/***/ "./resources/assets/js/components/OtherActionModal.vue?vue&type=template&id=2eb2bb9e&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/OtherActionModal.vue?vue&type=template&id=2eb2bb9e& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OtherActionModal_vue_vue_type_template_id_2eb2bb9e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OtherActionModal_vue_vue_type_template_id_2eb2bb9e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OtherActionModal_vue_vue_type_template_id_2eb2bb9e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OtherActionModal.vue?vue&type=template&id=2eb2bb9e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/OtherActionModal.vue?vue&type=template&id=2eb2bb9e&");


/***/ }),

/***/ "./resources/assets/js/components/SceneListWatch.vue?vue&type=template&id=8ab9b1c8&":
/*!******************************************************************************************!*\
  !*** ./resources/assets/js/components/SceneListWatch.vue?vue&type=template&id=8ab9b1c8& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SceneListWatch_vue_vue_type_template_id_8ab9b1c8___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SceneListWatch_vue_vue_type_template_id_8ab9b1c8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SceneListWatch_vue_vue_type_template_id_8ab9b1c8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SceneListWatch.vue?vue&type=template&id=8ab9b1c8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/SceneListWatch.vue?vue&type=template&id=8ab9b1c8&");


/***/ }),

/***/ "./resources/assets/js/components/ShareModal.vue?vue&type=template&id=6e1d36f6&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/ShareModal.vue?vue&type=template&id=6e1d36f6& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareModal_vue_vue_type_template_id_6e1d36f6___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareModal_vue_vue_type_template_id_6e1d36f6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareModal_vue_vue_type_template_id_6e1d36f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ShareModal.vue?vue&type=template&id=6e1d36f6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/ShareModal.vue?vue&type=template&id=6e1d36f6&");


/***/ }),

/***/ "./resources/assets/js/pages/Watch.vue?vue&type=template&id=9d53053c&":
/*!****************************************************************************!*\
  !*** ./resources/assets/js/pages/Watch.vue?vue&type=template&id=9d53053c& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Watch_vue_vue_type_template_id_9d53053c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Watch_vue_vue_type_template_id_9d53053c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Watch_vue_vue_type_template_id_9d53053c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Watch.vue?vue&type=template&id=9d53053c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Watch.vue?vue&type=template&id=9d53053c&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/CommentListWatch.vue?vue&type=template&id=38984469&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/CommentListWatch.vue?vue&type=template&id=38984469& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticStyle: { "padding-bottom": "72px" } },
    [
      _c("v-divider"),
      _vm._v(" "),
      _c(
        "v-expansion-panels",
        {
          model: {
            value: _vm.panelComment,
            callback: function($$v) {
              _vm.panelComment = $$v
            },
            expression: "panelComment"
          }
        },
        [
          _c(
            "v-expansion-panel",
            { key: "panelComment" },
            [
              _c(
                "v-expansion-panel-header",
                {
                  staticClass: "ma-0 pl-3 pr-2",
                  class: {
                    commentListExpansionPanelCustomHeader:
                      _vm.panelComment !== 0 && _vm.mostLikesItem
                  }
                },
                [
                  _c("span", { staticClass: "ma-0 pa-0 pt-1" }, [
                    _vm._v("コメント • " + _vm._s(_vm.getTotal(_vm.mediaItems)))
                  ]),
                  _vm._v(" "),
                  _vm.panelComment !== 0 && _vm.mostLikesItem
                    ? _c(
                        "div",
                        {
                          class: {
                            commentListExpansionPanelCustomHeaderContent:
                              _vm.panelComment !== 0 && _vm.mostLikesItem
                          }
                        },
                        [
                          _c("div", { staticClass: "placeholder-color" }, [
                            _vm._v(
                              "\n            " +
                                _vm._s(_vm.mostLikesItem.name) +
                                "\n          "
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "mostLikedComment-body py-1" },
                            [
                              _vm._v(
                                "\n            " +
                                  _vm._s(_vm.mostLikesItem.content) +
                                  "\n          "
                              )
                            ]
                          )
                        ]
                      )
                    : _vm._e()
                ]
              ),
              _vm._v(" "),
              _c(
                "v-expansion-panel-content",
                [
                  _c(
                    "v-row",
                    { staticClass: "ma-0 py-1 pl-3 pr-1" },
                    [
                      _c(
                        "v-col",
                        {
                          staticClass: "ma-0 pa-0 text-center",
                          attrs: { cols: "auto" }
                        },
                        [
                          _c(
                            "v-avatar",
                            { staticClass: "mt-2", attrs: { size: "32" } },
                            [
                              _c("i", {
                                staticClass: "fas fa-user-circle fa-2x",
                                staticStyle: { color: "grey" }
                              })
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { staticClass: "ma-0 pa-0" },
                        [
                          _c(
                            "v-form",
                            { ref: "form" },
                            [
                              _c("v-textarea", {
                                staticClass: "pa-2",
                                attrs: {
                                  rules: _vm.commentRules,
                                  outlined: "",
                                  rows: "3",
                                  "hide-details": "",
                                  name: "comment_box",
                                  placeholder: "公開コメントを入力"
                                },
                                model: {
                                  value: _vm.content,
                                  callback: function($$v) {
                                    _vm.content = $$v
                                  },
                                  expression: "content"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "text-right mx-3" }, [
                    _c(
                      "a",
                      {
                        staticStyle: { color: "grey" },
                        attrs: { href: "javascript:void(0)" },
                        on: { click: _vm.resetComment }
                      },
                      [_vm._v("キャンセル")]
                    ),
                    _vm._v("   \n          "),
                    _c(
                      "a",
                      {
                        staticStyle: { color: "black" },
                        attrs: { href: "javascript:void(0)" },
                        on: { click: _vm.addComment }
                      },
                      [_vm._v("コメント")]
                    )
                  ]),
                  _vm._v(" "),
                  _vm._l(_vm.mediaItems, function(item, index) {
                    return _c(
                      "v-row",
                      {
                        key: index + "-" + item.id,
                        staticClass: "ma-0 py-1 pl-3 pr-1",
                        attrs: { dense: "" }
                      },
                      [
                        _c(
                          "v-col",
                          {
                            staticClass: "ma-0 pa-0 text-center",
                            attrs: { cols: "auto" }
                          },
                          [
                            _c(
                              "v-avatar",
                              { staticClass: "mt-2", attrs: { size: "32" } },
                              [
                                _c("i", {
                                  staticClass: "fas fa-user-circle fa-2x",
                                  staticStyle: { color: "grey" }
                                })
                              ]
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          { staticClass: "ma-0 pa-2" },
                          [
                            _c("div", { staticClass: "placeholder-color" }, [
                              _vm._v(
                                "\n              " +
                                  _vm._s(item.name) +
                                  "\n            "
                              )
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "comment-body py-1" }, [
                              _vm._v(
                                "\n              " +
                                  _vm._s(item.content) +
                                  "\n            "
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "placeholder-color" },
                              [
                                _vm._v(
                                  "\n              " +
                                    _vm._s(
                                      _vm.timeSince(item.comment_publishedAt)
                                    ) +
                                    "前  \n              "
                                ),
                                _c(
                                  "v-icon",
                                  {
                                    attrs: {
                                      size: "16",
                                      color: item.isLiked ? "red" : "grey"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.likeComment(item)
                                      }
                                    }
                                  },
                                  [_vm._v("fas fa-heart")]
                                ),
                                _vm._v(
                                  _vm._s(item.likes_count) +
                                    "\n               \n              "
                                ),
                                _c(
                                  "v-icon",
                                  {
                                    attrs: { size: "16" },
                                    on: {
                                      click: function($event) {
                                        return _vm.addCommentReply(
                                          item.comment_id
                                        )
                                      }
                                    }
                                  },
                                  [_vm._v("comment")]
                                ),
                                _vm._v(
                                  _vm._s(item.replies.length) + "\n            "
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            item.replies.length
                              ? _c("div", [
                                  _c(
                                    "a",
                                    {
                                      staticStyle: {
                                        color: "grey",
                                        "font-size": "13px"
                                      },
                                      attrs: { href: "javascript:void(0)" },
                                      on: {
                                        click: function($event) {
                                          return _vm.showReplies(index)
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          !_vm.isOpened(index)
                                            ? "他の返信を表示"
                                            : "他の返信を非表示"
                                        )
                                      )
                                    ]
                                  )
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _vm._l(item.replies, function(replyItem, index1) {
                              return _c(
                                "v-row",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: _vm.isOpened(index),
                                      expression: "isOpened(index)"
                                    }
                                  ],
                                  key: index1 + "-" + replyItem.id,
                                  staticClass: "ma-0 pa-0"
                                },
                                [
                                  _c(
                                    "v-col",
                                    {
                                      staticClass: "ma-0 pa-1 text-center",
                                      attrs: { cols: "auto" }
                                    },
                                    [
                                      _c(
                                        "v-avatar",
                                        {
                                          staticClass: "mt-2",
                                          attrs: { size: "24" }
                                        },
                                        [
                                          _c("i", {
                                            staticClass:
                                              "fas fa-user-circle fa-2x",
                                            staticStyle: { color: "grey" }
                                          })
                                        ]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("v-col", { staticClass: "ma-0 pa-2" }, [
                                    _c(
                                      "div",
                                      { staticClass: "placeholder-color" },
                                      [
                                        _vm._v(
                                          "\n                  " +
                                            _vm._s(replyItem.name) +
                                            "\n                "
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "comment-body py-1" },
                                      [
                                        _vm._v(
                                          "\n                  " +
                                            _vm._s(replyItem.content) +
                                            "\n                "
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "placeholder-color" },
                                      [
                                        _vm._v(
                                          "\n                  " +
                                            _vm._s(
                                              _vm.timeSince(
                                                replyItem.comment_publishedAt
                                              )
                                            ) +
                                            "前  \n                  "
                                        ),
                                        _c(
                                          "v-icon",
                                          {
                                            attrs: {
                                              size: "16",
                                              color: replyItem.isLiked
                                                ? "red"
                                                : "grey"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.likeComment(
                                                  replyItem
                                                )
                                              }
                                            }
                                          },
                                          [_vm._v("fas fa-heart")]
                                        ),
                                        _vm._v(
                                          _vm._s(replyItem.likes_count) +
                                            "\n                   \n                  "
                                        ),
                                        _c(
                                          "v-icon",
                                          {
                                            attrs: { size: "16" },
                                            on: {
                                              click: function($event) {
                                                return _vm.addCommentReply(
                                                  item.comment_id
                                                )
                                              }
                                            }
                                          },
                                          [_vm._v("comment")]
                                        )
                                      ],
                                      1
                                    )
                                  ])
                                ],
                                1
                              )
                            })
                          ],
                          2
                        )
                      ],
                      1
                    )
                  })
                ],
                2
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.showLoginModal ? _c("NoLoginModal") : _vm._e(),
      _vm._v(" "),
      _vm.showCommentReplyModal
        ? _c("CommentReplyModal", { attrs: { parentId: _vm.parentId } })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/CommentReplyModal.vue?vue&type=template&id=a2c7b10a&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/CommentReplyModal.vue?vue&type=template&id=a2c7b10a& ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-dialog",
    {
      attrs: { "max-width": "360" },
      model: {
        value: _vm.showCommentReplyModal,
        callback: function($$v) {
          _vm.showCommentReplyModal = $$v
        },
        expression: "showCommentReplyModal"
      }
    },
    [
      _c(
        "v-card",
        [
          _c(
            "v-row",
            { staticClass: "ma-0" },
            [
              _c(
                "v-col",
                { staticClass: "mx-2 px-0" },
                [
                  _c(
                    "v-form",
                    { ref: "form" },
                    [
                      _c("v-textarea", {
                        staticClass: "pa-2",
                        attrs: {
                          rules: _vm.commentRules,
                          outlined: "",
                          rows: "5",
                          "hide-details": "",
                          name: "commentReply_box",
                          placeholder: "公開コメントを入力"
                        },
                        model: {
                          value: _vm.content,
                          callback: function($$v) {
                            _vm.content = $$v
                          },
                          expression: "content"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "mt-3 text-right",
                      staticStyle: { color: "#757575", "font-size": "14px" }
                    },
                    [
                      _c(
                        "a",
                        {
                          staticStyle: { color: "grey" },
                          attrs: { href: "javascript:void(0)" },
                          on: { click: _vm.closeCommentReplyModal }
                        },
                        [_vm._v("キャンセル")]
                      ),
                      _vm._v("  \n          "),
                      _c(
                        "a",
                        {
                          staticStyle: { color: "black" },
                          attrs: { href: "javascript:void(0)" },
                          on: { click: _vm.addReply }
                        },
                        [_vm._v("コメント")]
                      )
                    ]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/OtherActionModal.vue?vue&type=template&id=2eb2bb9e&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/OtherActionModal.vue?vue&type=template&id=2eb2bb9e& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "text-center" },
    [
      _c(
        "v-bottom-sheet",
        {
          model: {
            value: _vm.showOtherActionModal,
            callback: function($$v) {
              _vm.showOtherActionModal = $$v
            },
            expression: "showOtherActionModal"
          }
        },
        [
          _c(
            "v-list",
            _vm._l(_vm.tiles, function(tile) {
              return _c(
                "v-list-item",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value:
                        tile.show === "always" ||
                        (_vm.user_id && _vm.created_user_id === _vm.user_id),
                      expression:
                        "\n          tile.show === 'always' || (user_id && created_user_id === user_id)\n        "
                    }
                  ],
                  key: tile.title,
                  on: {
                    click: function($event) {
                      return _vm.tapTile(tile.action)
                    }
                  }
                },
                [
                  _c("v-list-item-avatar", [_c("i", { class: tile.img })]),
                  _vm._v(" "),
                  _c("v-list-item-title", [_vm._v(_vm._s(tile.title))])
                ],
                1
              )
            }),
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/SceneListWatch.vue?vue&type=template&id=8ab9b1c8&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/SceneListWatch.vue?vue&type=template&id=8ab9b1c8& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("v-divider"),
      _vm._v(" "),
      _c(
        "v-expansion-panels",
        {
          staticClass: "ma-0 pa-0",
          model: {
            value: _vm.panel,
            callback: function($$v) {
              _vm.panel = $$v
            },
            expression: "panel"
          }
        },
        [
          _c(
            "v-expansion-panel",
            { key: "panelScene", staticClass: "ma-0 pa-0" },
            [
              _c(
                "v-expansion-panel-header",
                {
                  staticClass: "ma-0 pl-3 pr-2",
                  class: {
                    sceneListExpansionPanelCustomHeader: _vm.panel !== 0,
                    sceneListExpansionPanelCustomHeadermobileHight:
                      _vm.panel !== 0 && _vm.isMobile
                  },
                  attrs: { id: "panelScene" }
                },
                [
                  _c("v-fade-transition", { attrs: { "leave-absolute": "" } }, [
                    _vm.opened
                      ? _c("span", { key: "0" }, [
                          _vm._v("\n            まとめの場面一覧\n          ")
                        ])
                      : _c("span", { key: "1" }, [
                          _vm._v("\n            再生中の場面\n          ")
                        ])
                  ]),
                  _vm._v(" "),
                  _vm.panel !== 0
                    ? _c(
                        "div",
                        {
                          class: {
                            sceneListExpansionPanelCustomHeaderContent:
                              _vm.panel !== 0
                          }
                        },
                        [
                          _c(
                            "v-container",
                            { staticClass: "pa-0 ma-0" },
                            [
                              _c(
                                "v-row",
                                { staticClass: "pa-0 ma-0" },
                                [
                                  _c(
                                    "v-col",
                                    { staticClass: "pa-0 ma-0" },
                                    [
                                      _vm.panel !== 0
                                        ? _c(
                                            "v-card",
                                            {
                                              staticClass: "mx-auto my-1",
                                              attrs: {
                                                "max-width": "420",
                                                elevation: "0"
                                              }
                                            },
                                            [
                                              _c(
                                                "v-row",
                                                {
                                                  staticClass: "pa-0 ma-0",
                                                  attrs: { dense: "" }
                                                },
                                                [
                                                  _c(
                                                    "v-col",
                                                    { staticClass: "px-0" },
                                                    [
                                                      _c(
                                                        "v-row",
                                                        { staticClass: "ma-0" },
                                                        [
                                                          _c(
                                                            "v-col",
                                                            {
                                                              staticClass:
                                                                "pa-0 ma-auto text-center",
                                                              attrs: {
                                                                cols: "1"
                                                              }
                                                            },
                                                            [
                                                              _vm._v(
                                                                "\n                          " +
                                                                  _vm._s(
                                                                    parseInt(
                                                                      _vm.listIndex
                                                                    ) + 1
                                                                  ) +
                                                                  " " +
                                                                  _vm._s(
                                                                    _vm.panel
                                                                  ) +
                                                                  "\n                        "
                                                              )
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "v-col",
                                                            {
                                                              staticClass:
                                                                "pa-0",
                                                              attrs: {
                                                                cols: "11"
                                                              }
                                                            },
                                                            [
                                                              _c(
                                                                "v-row",
                                                                {
                                                                  staticClass:
                                                                    "ma-0"
                                                                },
                                                                [
                                                                  _c(
                                                                    "v-col",
                                                                    {
                                                                      staticClass:
                                                                        "pa-1 pl-0 pr-2",
                                                                      attrs: {
                                                                        cols:
                                                                          "6"
                                                                      }
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "v-card",
                                                                        {
                                                                          staticClass:
                                                                            "ma-0 pa-0",
                                                                          staticStyle: {
                                                                            overflow:
                                                                              "hidden"
                                                                          },
                                                                          attrs: {
                                                                            "aspect-ratio":
                                                                              "calc(16 / 9)",
                                                                            elevation:
                                                                              "0",
                                                                            width:
                                                                              "100%"
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "v-img",
                                                                            {
                                                                              staticClass:
                                                                                "white--text align-end rounded",
                                                                              attrs: {
                                                                                src:
                                                                                  _vm.thumbStoragePath +
                                                                                  _vm
                                                                                    .mediaItems[
                                                                                    _vm
                                                                                      .listIndex
                                                                                  ]
                                                                                    .preview,
                                                                                "lazy-src":
                                                                                  "/storage/imgs/dummy-image.jpg",
                                                                                height:
                                                                                  "100%",
                                                                                alt:
                                                                                  _vm
                                                                                    .mediaItems[
                                                                                    _vm
                                                                                      .listIndex
                                                                                  ]
                                                                                    .title
                                                                              },
                                                                              on: {
                                                                                load:
                                                                                  _vm.loaded
                                                                              },
                                                                              scopedSlots: _vm._u(
                                                                                [
                                                                                  {
                                                                                    key:
                                                                                      "placeholder",
                                                                                    fn: function() {
                                                                                      return [
                                                                                        _c(
                                                                                          "v-row",
                                                                                          {
                                                                                            staticClass:
                                                                                              "fill-height ma-0",
                                                                                            attrs: {
                                                                                              align:
                                                                                                "center",
                                                                                              justify:
                                                                                                "center"
                                                                                            }
                                                                                          },
                                                                                          [
                                                                                            _c(
                                                                                              "v-progress-circular",
                                                                                              {
                                                                                                attrs: {
                                                                                                  indeterminate:
                                                                                                    "",
                                                                                                  color:
                                                                                                    "grey lighten-5"
                                                                                                }
                                                                                              }
                                                                                            )
                                                                                          ],
                                                                                          1
                                                                                        )
                                                                                      ]
                                                                                    },
                                                                                    proxy: true
                                                                                  }
                                                                                ],
                                                                                null,
                                                                                false,
                                                                                4034393411
                                                                              )
                                                                            }
                                                                          )
                                                                        ],
                                                                        1
                                                                      )
                                                                    ],
                                                                    1
                                                                  ),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "v-col",
                                                                    {
                                                                      staticClass:
                                                                        "pa-1 pl-0 pr-2 py-0",
                                                                      attrs: {
                                                                        cols:
                                                                          "6"
                                                                      }
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "div",
                                                                        {
                                                                          staticClass:
                                                                            "px-0 py-0 pt-1",
                                                                          staticStyle: {
                                                                            display:
                                                                              "flex",
                                                                            "flex-wrap":
                                                                              "nowrap",
                                                                            "align-items":
                                                                              "flex-start"
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "div",
                                                                            {
                                                                              staticStyle: {
                                                                                "font-size":
                                                                                  "20px",
                                                                                color:
                                                                                  "red",
                                                                                "max-height":
                                                                                  "18px"
                                                                              }
                                                                            },
                                                                            [
                                                                              _c(
                                                                                "i",
                                                                                {
                                                                                  staticClass:
                                                                                    "fab fa-youtube",
                                                                                  staticStyle: {
                                                                                    "vertical-align":
                                                                                      "top"
                                                                                  }
                                                                                }
                                                                              )
                                                                            ]
                                                                          ),
                                                                          _vm._v(
                                                                            " "
                                                                          ),
                                                                          _c(
                                                                            "div",
                                                                            {
                                                                              staticClass:
                                                                                "block-playlist-title"
                                                                            },
                                                                            [
                                                                              _c(
                                                                                "span",
                                                                                {
                                                                                  staticStyle: {
                                                                                    "vertical-align":
                                                                                      "middle"
                                                                                  }
                                                                                },
                                                                                [
                                                                                  _vm._v(
                                                                                    _vm._s(
                                                                                      _vm
                                                                                        .mediaItems[
                                                                                        _vm
                                                                                          .listIndex
                                                                                      ]
                                                                                        .title
                                                                                    )
                                                                                  )
                                                                                ]
                                                                              )
                                                                            ]
                                                                          )
                                                                        ]
                                                                      ),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "div",
                                                                        {
                                                                          staticClass:
                                                                            "green--text text--darken-2 pt-1",
                                                                          staticStyle: {
                                                                            "font-size":
                                                                              "12px",
                                                                            "padding-left":
                                                                              "0",
                                                                            "font-weight":
                                                                              "bold"
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "span",
                                                                            [
                                                                              _vm._v(
                                                                                _vm._s(
                                                                                  _vm
                                                                                    .mediaItems[
                                                                                    _vm
                                                                                      .listIndex
                                                                                  ]
                                                                                    .start
                                                                                )
                                                                              )
                                                                            ]
                                                                          ),
                                                                          _vm._v(
                                                                            " "
                                                                          ),
                                                                          _c(
                                                                            "span",
                                                                            {
                                                                              staticStyle: {
                                                                                "font-size":
                                                                                  "8px"
                                                                              }
                                                                            },
                                                                            [
                                                                              _vm._v(
                                                                                "-"
                                                                              )
                                                                            ]
                                                                          ),
                                                                          _vm._v(
                                                                            " "
                                                                          ),
                                                                          _c(
                                                                            "span",
                                                                            [
                                                                              _vm._v(
                                                                                _vm._s(
                                                                                  _vm
                                                                                    .mediaItems[
                                                                                    _vm
                                                                                      .listIndex
                                                                                  ]
                                                                                    .end
                                                                                ) +
                                                                                  "の場面"
                                                                              )
                                                                            ]
                                                                          )
                                                                        ]
                                                                      ),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "div",
                                                                        {
                                                                          staticClass:
                                                                            "horizontal-list-wrap block-chip-lines3 color-black mt-2 mb-0"
                                                                        },
                                                                        _vm._l(
                                                                          _vm.readMore(
                                                                            _vm
                                                                              .mediaItems[
                                                                              _vm
                                                                                .listIndex
                                                                            ]
                                                                              .tagArray
                                                                          ),
                                                                          function(
                                                                            tag,
                                                                            tagIndex
                                                                          ) {
                                                                            return _c(
                                                                              "v-chip",
                                                                              {
                                                                                directives: [
                                                                                  {
                                                                                    name:
                                                                                      "show",
                                                                                    rawName:
                                                                                      "v-show",
                                                                                    value: tag,
                                                                                    expression:
                                                                                      "tag"
                                                                                  }
                                                                                ],
                                                                                key:
                                                                                  _vm
                                                                                    .mediaItems[
                                                                                    _vm
                                                                                      .listIndex
                                                                                  ]
                                                                                    .id +
                                                                                  "-" +
                                                                                  tagIndex,
                                                                                staticClass:
                                                                                  "my-tag-chip pr-2",
                                                                                staticStyle: {
                                                                                  "font-weight":
                                                                                    "normal",
                                                                                  "border-color":
                                                                                    "#bdbdbd"
                                                                                },
                                                                                attrs: {
                                                                                  "text-color":
                                                                                    "black",
                                                                                  outlined:
                                                                                    "",
                                                                                  small:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _vm._v(
                                                                                  "\n                                  " +
                                                                                    _vm._s(
                                                                                      tag
                                                                                    ) +
                                                                                    "\n                                "
                                                                                )
                                                                              ]
                                                                            )
                                                                          }
                                                                        ),
                                                                        1
                                                                      )
                                                                    ]
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                            ],
                                                            1
                                                          )
                                                        ],
                                                        1
                                                      )
                                                    ],
                                                    1
                                                  )
                                                ],
                                                1
                                              )
                                            ],
                                            1
                                          )
                                        : _vm._e()
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-expansion-panel-content",
                _vm._l(_vm.mediaItems, function(item, index) {
                  return _c(
                    "v-row",
                    {
                      key: item.category + "-" + item.id,
                      staticClass: "pa-0 ma-0"
                    },
                    [
                      _c("v-col", { staticClass: "pa-0 ma-0" }, [
                        _c(
                          "div",
                          {
                            class:
                              _vm.listIndex == index && _vm.opened
                                ? "green lighten-5"
                                : ""
                          },
                          [
                            _c(
                              "v-card",
                              {
                                staticClass: "mx-auto my-1",
                                attrs: {
                                  "max-width": "420",
                                  elevation: "0",
                                  color: "transparent"
                                }
                              },
                              [
                                _c(
                                  "v-row",
                                  {
                                    staticClass: "pa-0 ma-0",
                                    attrs: { dense: "" }
                                  },
                                  [
                                    _c(
                                      "v-col",
                                      { staticClass: "px-0" },
                                      [
                                        _c(
                                          "v-row",
                                          { staticClass: "ma-0" },
                                          [
                                            _c(
                                              "v-col",
                                              {
                                                staticClass:
                                                  "pa-0 ma-auto text-center",
                                                attrs: { cols: "1" }
                                              },
                                              [
                                                _c(
                                                  "span",
                                                  {
                                                    directives: [
                                                      {
                                                        name: "show",
                                                        rawName: "v-show",
                                                        value: _vm.opened,
                                                        expression: "opened"
                                                      }
                                                    ]
                                                  },
                                                  [_vm._v(_vm._s(index + 1))]
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-col",
                                              {
                                                staticClass: "pa-0",
                                                attrs: { cols: "11" }
                                              },
                                              [
                                                _c(
                                                  "v-row",
                                                  { staticClass: "ma-0" },
                                                  [
                                                    _c(
                                                      "v-col",
                                                      {
                                                        staticClass:
                                                          "pa-1 pl-0 pr-2",
                                                        attrs: { cols: "6" }
                                                      },
                                                      [
                                                        _c(
                                                          "v-card",
                                                          {
                                                            staticClass:
                                                              "ma-0 pa-0",
                                                            staticStyle: {
                                                              overflow: "hidden"
                                                            },
                                                            attrs: {
                                                              "aspect-ratio":
                                                                "calc(16 / 9)",
                                                              elevation: "0"
                                                            }
                                                          },
                                                          [
                                                            _c("v-img", {
                                                              staticClass:
                                                                "white--text align-end rounded",
                                                              staticStyle: {
                                                                "z-index": "1"
                                                              },
                                                              attrs: {
                                                                src:
                                                                  _vm.thumbStoragePath +
                                                                  item.preview,
                                                                alt: item.title,
                                                                "lazy-src":
                                                                  "/storage/imgs/dummy-image.jpg",
                                                                height: "100%"
                                                              },
                                                              on: {
                                                                click: function(
                                                                  $event
                                                                ) {
                                                                  $event.stopPropagation()
                                                                  return _vm.select(
                                                                    index
                                                                  )
                                                                }
                                                              },
                                                              scopedSlots: _vm._u(
                                                                [
                                                                  {
                                                                    key:
                                                                      "placeholder",
                                                                    fn: function() {
                                                                      return [
                                                                        _c(
                                                                          "v-row",
                                                                          {
                                                                            staticClass:
                                                                              "fill-height ma-0",
                                                                            attrs: {
                                                                              align:
                                                                                "center",
                                                                              justify:
                                                                                "center"
                                                                            }
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "v-progress-circular",
                                                                              {
                                                                                attrs: {
                                                                                  indeterminate:
                                                                                    "",
                                                                                  color:
                                                                                    "grey lighten-5"
                                                                                }
                                                                              }
                                                                            )
                                                                          ],
                                                                          1
                                                                        )
                                                                      ]
                                                                    },
                                                                    proxy: true
                                                                  }
                                                                ],
                                                                null,
                                                                true
                                                              )
                                                            })
                                                          ],
                                                          1
                                                        )
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "v-col",
                                                      {
                                                        staticClass:
                                                          "pa-1 pl-0 pr-2 py-0",
                                                        attrs: { cols: "6" }
                                                      },
                                                      [
                                                        _c(
                                                          "div",
                                                          {
                                                            staticClass:
                                                              "px-0 py-0 pt-1",
                                                            staticStyle: {
                                                              display: "flex",
                                                              "flex-wrap":
                                                                "nowrap",
                                                              "align-items":
                                                                "flex-start"
                                                            },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                $event.stopPropagation()
                                                                return _vm.select(
                                                                  index
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _c(
                                                              "div",
                                                              {
                                                                staticStyle: {
                                                                  "font-size":
                                                                    "20px",
                                                                  color: "red",
                                                                  "max-height":
                                                                    "18px"
                                                                }
                                                              },
                                                              [
                                                                _c("i", {
                                                                  staticClass:
                                                                    "fab fa-youtube",
                                                                  staticStyle: {
                                                                    "vertical-align":
                                                                      "top"
                                                                  }
                                                                })
                                                              ]
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "div",
                                                              {
                                                                staticClass:
                                                                  "block-playlist-title"
                                                              },
                                                              [
                                                                _c(
                                                                  "span",
                                                                  {
                                                                    directives: [
                                                                      {
                                                                        name:
                                                                          "show",
                                                                        rawName:
                                                                          "v-show",
                                                                        value:
                                                                          _vm.opened,
                                                                        expression:
                                                                          "opened"
                                                                      }
                                                                    ],
                                                                    staticStyle: {
                                                                      "vertical-align":
                                                                        "middle"
                                                                    }
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      _vm._s(
                                                                        item.title
                                                                      )
                                                                    )
                                                                  ]
                                                                )
                                                              ]
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "div",
                                                          {
                                                            staticClass:
                                                              "green--text text--darken-2 pt-1",
                                                            staticStyle: {
                                                              "font-size":
                                                                "12px",
                                                              "padding-left":
                                                                "0",
                                                              "font-weight":
                                                                "bold"
                                                            },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                $event.stopPropagation()
                                                                return _vm.select(
                                                                  index
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _c(
                                                              "span",
                                                              {
                                                                directives: [
                                                                  {
                                                                    name:
                                                                      "show",
                                                                    rawName:
                                                                      "v-show",
                                                                    value:
                                                                      _vm.opened,
                                                                    expression:
                                                                      "opened"
                                                                  }
                                                                ]
                                                              },
                                                              [
                                                                _vm._v(
                                                                  _vm._s(
                                                                    item.start
                                                                  )
                                                                )
                                                              ]
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "span",
                                                              {
                                                                directives: [
                                                                  {
                                                                    name:
                                                                      "show",
                                                                    rawName:
                                                                      "v-show",
                                                                    value:
                                                                      _vm.opened,
                                                                    expression:
                                                                      "opened"
                                                                  }
                                                                ],
                                                                staticStyle: {
                                                                  "font-size":
                                                                    "8px"
                                                                }
                                                              },
                                                              [_vm._v("-")]
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "span",
                                                              {
                                                                directives: [
                                                                  {
                                                                    name:
                                                                      "show",
                                                                    rawName:
                                                                      "v-show",
                                                                    value:
                                                                      _vm.opened,
                                                                    expression:
                                                                      "opened"
                                                                  }
                                                                ]
                                                              },
                                                              [
                                                                _vm._v(
                                                                  _vm._s(
                                                                    item.end
                                                                  ) + "の場面"
                                                                )
                                                              ]
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "div",
                                                          {
                                                            staticClass:
                                                              "horizontal-list-wrap block-chip-lines3 color-black mt-2 mb-0",
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                $event.stopPropagation()
                                                                return _vm.select(
                                                                  index
                                                                )
                                                              }
                                                            }
                                                          },
                                                          _vm._l(
                                                            _vm.readMore(
                                                              item.tagArray
                                                            ),
                                                            function(
                                                              tag,
                                                              tagIndex
                                                            ) {
                                                              return _c(
                                                                "v-chip",
                                                                {
                                                                  directives: [
                                                                    {
                                                                      name:
                                                                        "show",
                                                                      rawName:
                                                                        "v-show",
                                                                      value: tag,
                                                                      expression:
                                                                        "tag"
                                                                    }
                                                                  ],
                                                                  key:
                                                                    _vm
                                                                      .mediaItems[
                                                                      _vm
                                                                        .listIndex
                                                                    ].id +
                                                                    "-" +
                                                                    tagIndex,
                                                                  staticClass:
                                                                    "my-tag-chip pr-2 py-0",
                                                                  staticStyle: {
                                                                    "font-weight":
                                                                      "normal",
                                                                    "border-color":
                                                                      "#bdbdbd"
                                                                  },
                                                                  attrs: {
                                                                    "text-color":
                                                                      "black",
                                                                    outlined:
                                                                      "",
                                                                    small: ""
                                                                  }
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                " +
                                                                      _vm._s(
                                                                        tag
                                                                      ) +
                                                                      "\n                              "
                                                                  )
                                                                ]
                                                              )
                                                            }
                                                          ),
                                                          1
                                                        )
                                                      ]
                                                    )
                                                  ],
                                                  1
                                                )
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ])
                    ],
                    1
                  )
                }),
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/ShareModal.vue?vue&type=template&id=6e1d36f6&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/ShareModal.vue?vue&type=template&id=6e1d36f6& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-bottom-sheet",
    {
      attrs: { "max-width": "420px" },
      model: {
        value: _vm.showShareModal,
        callback: function($$v) {
          _vm.showShareModal = $$v
        },
        expression: "showShareModal"
      }
    },
    [
      _c(
        "v-sheet",
        { staticClass: "mx-auto" },
        [
          _c(
            "v-container",
            { staticClass: "ma-0 pa-0", attrs: { fluid: "" } },
            [
              _c(
                "v-row",
                { staticClass: "ma-0 pa-2" },
                [
                  _c("v-col", { staticClass: "ma-0 pa-0" }, [
                    _vm._v("共有方法を選択")
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                { staticClass: "ma-0 pa-" },
                [
                  _c(
                    "v-col",
                    { staticClass: "ma-0 pa-0" },
                    [_c("v-divider")],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                { staticClass: "ma-0 pt-3 pb-2" },
                [
                  _c(
                    "v-col",
                    {
                      staticClass: "text-center ma-0 pa-0",
                      attrs: {
                        "data-href":
                          "https://twitter.com/intent/tweet?url=" +
                          _vm.encodedShareURI +
                          "&text=[YouClip] " +
                          _vm.shareText
                      },
                      on: { click: _vm.shareOnSNS }
                    },
                    [
                      _c(
                        "v-row",
                        { staticClass: "ma-0 pa-0" },
                        [
                          _c(
                            "v-col",
                            { staticClass: "ma-0 pa-0" },
                            [
                              _c("v-img", {
                                staticClass: "mx-auto",
                                staticStyle: { "border-radius": "8px" },
                                attrs: {
                                  width: "44px",
                                  "aspect-ratio": "1",
                                  src: "/storage/logos/twitter_square.png",
                                  alt: "Twitter logo"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        { staticClass: "ma-0 pa-0" },
                        [
                          _c(
                            "v-col",
                            { staticClass: "ma-0 pa-0" },
                            [
                              _c(
                                "v-card-text",
                                {
                                  staticClass:
                                    "ma-0 pa-1 grey--text text--darken-3"
                                },
                                [_vm._v("Twitter")]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    {
                      staticClass: "text-center ma-0 pa-0",
                      attrs: {
                        "data-href":
                          "http://www.facebook.com/sharer.php?u=" +
                          _vm.encodedShareURI
                      },
                      on: { click: _vm.shareOnSNS }
                    },
                    [
                      _c(
                        "v-row",
                        { staticClass: "ma-0 pa-0" },
                        [
                          _c(
                            "v-col",
                            { staticClass: "ma-0 pa-0" },
                            [
                              _c("v-img", {
                                staticClass: "mx-auto",
                                staticStyle: { "border-radius": "8px" },
                                attrs: {
                                  width: "44px",
                                  "aspect-ratio": "1",
                                  src: "/storage/logos/facebook_square.png",
                                  alt: "Facebook logo"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        { staticClass: "ma-0 pa-0" },
                        [
                          _c(
                            "v-col",
                            { staticClass: "ma-0 pa-0" },
                            [
                              _c(
                                "v-card-text",
                                {
                                  staticClass:
                                    "ma-0 pa-1 grey--text text--darken-3"
                                },
                                [_vm._v("Facebook")]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    {
                      staticClass: "text-center ma-0 pa-0",
                      attrs: {
                        "data-href":
                          "https://social-plugins.line.me/lineit/share?url=" +
                          _vm.encodedShareURI
                      },
                      on: { click: _vm.shareOnSNS }
                    },
                    [
                      _c(
                        "v-row",
                        { staticClass: "ma-0 pa-0" },
                        [
                          _c(
                            "v-col",
                            { staticClass: "ma-0 pa-0" },
                            [
                              _c("v-img", {
                                staticClass: "mx-auto",
                                staticStyle: { "border-radius": "8px" },
                                attrs: {
                                  width: "44px",
                                  "aspect-ratio": "1",
                                  src: "/storage/logos/line_square.png",
                                  alt: "LINE logo"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        { staticClass: "ma-0 pa-0" },
                        [
                          _c(
                            "v-col",
                            { staticClass: "ma-0 pa-0" },
                            [
                              _c(
                                "v-card-text",
                                {
                                  staticClass:
                                    "ma-0 pa-1 grey--text text--darken-3"
                                },
                                [_vm._v("LINE")]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    {
                      staticClass: "text-center ma-0 pa-0",
                      on: { click: _vm.copySelectedTagURL }
                    },
                    [
                      _c(
                        "v-row",
                        { staticClass: "ma-0 pa-0" },
                        [
                          _c(
                            "v-col",
                            { staticClass: "d-flex justify-center ma-0 pa-0" },
                            [
                              _c(
                                "div",
                                {
                                  staticStyle: {
                                    display: "flex",
                                    "justify-content": "center",
                                    "align-items": "center",
                                    width: "44px",
                                    height: "44px",
                                    "background-color": "rgb(205,205,205)",
                                    "border-radius": "8px"
                                  }
                                },
                                [
                                  _c("i", {
                                    staticClass: "far fa-copy",
                                    staticStyle: { "font-size": "24px" }
                                  })
                                ]
                              )
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        { staticClass: "ma-0 pa-0" },
                        [
                          _c(
                            "v-col",
                            { staticClass: "ma-0 pa-0" },
                            [
                              _c(
                                "v-card-text",
                                {
                                  staticClass:
                                    "ma-0 pa-1 grey--text text--darken-3"
                                },
                                [_vm._v("URLをコピー")]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                { staticClass: "ma-0 pa-0" },
                [
                  _c(
                    "v-col",
                    { staticClass: "ma-0 pa-0" },
                    [_c("v-divider")],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                { staticClass: "ma-0 pa-2" },
                [
                  _c(
                    "v-col",
                    { staticClass: "text-center ma-0 pa-0" },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ma-0 pa-0",
                          attrs: {
                            text: "",
                            width: "100%",
                            color: "grey darken-3"
                          },
                          on: { click: _vm.closeShareModal }
                        },
                        [_vm._v("キャンセル")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Watch.vue?vue&type=template&id=9d53053c&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Watch.vue?vue&type=template&id=9d53053c& ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticStyle: { height: "100vh", "background-color": "white" } },
    [
      _c("div", { staticClass: "container--small" }, [
        _c("div", { ref: "watchBody", staticClass: "watch-body" }, [
          _c(
            "div",
            { ref: "ytPlayerWrapper", staticClass: "ytPlayerWrapper" },
            [
              _vm.ytIframeParameterReady
                ? _c("YTIframe", {
                    on: { switchToPlayListIndexOf: _vm.switchToPlayListIndexOf }
                  })
                : _vm._e(),
              _vm._v(" "),
              _c("YTPlayerController", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.isPlayerReady,
                    expression: "isPlayerReady"
                  }
                ],
                ref: "YTPlayerController"
              }),
              _vm._v(" "),
              _c("YTSeekBar", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.isPlayerReady,
                    expression: "isPlayerReady"
                  }
                ],
                ref: "ytSeekBar",
                attrs: { bodyRef: _vm.watchBodyRef }
              })
            ],
            1
          ),
          _vm._v(" "),
          _vm.isPlayerReady
            ? _c(
                "div",
                { staticClass: "highlightControllerBody" },
                [
                  _vm.isPlaylist
                    ? _c(
                        "v-sheet",
                        { staticClass: "mx-auto pa-0" },
                        [
                          _c(
                            "v-container",
                            {
                              staticClass: "ma-0 pa-0 pt-2",
                              attrs: { fluid: "" }
                            },
                            [
                              _c(
                                "v-row",
                                {
                                  staticClass: "ma-0 pa-0",
                                  attrs: { align: "center" }
                                },
                                [
                                  _c(
                                    "v-col",
                                    { staticClass: "ma-2 my-0 pa-0" },
                                    [
                                      _c(
                                        "h1",
                                        {
                                          staticClass:
                                            "home-and-search-result-title",
                                          staticStyle: { "font-weight": "400" }
                                        },
                                        [
                                          _vm._v(
                                            "\n                  " +
                                              _vm._s(_vm.playlistName) +
                                              "\n                "
                                          )
                                        ]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("v-col", {
                                    staticClass: "ma-2 my-0 pa-0 text-right",
                                    attrs: { cols: "auto" }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-row",
                                { staticClass: "ma-0 pa-0" },
                                [
                                  _c(
                                    "v-col",
                                    {
                                      staticClass:
                                        "ma-2 my-0 pa-0 grey--text text--darken-3"
                                    },
                                    [
                                      _c(
                                        "span",
                                        {
                                          staticStyle: { "font-size": "12px" }
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.playlistViewCount
                                                ? _vm.playlistViewCount
                                                : 0
                                            ) + "回視聴"
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticStyle: { "font-size": "8px" } },
                                        [_vm._v(" • ")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticStyle: { "font-size": "12px" }
                                        },
                                        [
                                          _vm._v(
                                            "合計" +
                                              _vm._s(_vm.totalDurationKanji)
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticStyle: { "font-size": "8px" } },
                                        [_vm._v(" • ")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticStyle: { "font-size": "12px" }
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(_vm.playlistCreatedAt) + "前"
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "v-sheet",
                    { staticClass: "mx-auto pa-0 px-1", attrs: { tile: "" } },
                    [
                      _c(
                        "v-row",
                        {
                          staticClass: "ma-0 pa-0",
                          staticStyle: { position: "relative" },
                          attrs: { justify: "space-between" }
                        },
                        [
                          _c(
                            "v-col",
                            { staticClass: "ma-0 pa-0 text-center" },
                            [
                              _c(
                                "v-bottom-navigation",
                                { staticClass: "bottom_navigation_no_shadow" },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      staticClass: "ma-0 pa-0 narrow-btn",
                                      on: { click: _vm.sharePlaylist }
                                    },
                                    [
                                      _c("span", [_vm._v("まとめをシェア")]),
                                      _vm._v(" "),
                                      _c("i", {
                                        staticClass:
                                          "fas fa-share outlined-icon icon-large"
                                      })
                                    ]
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-col",
                            { staticClass: "ma-0 pa-0 text-center" },
                            [
                              _c(
                                "v-bottom-navigation",
                                { staticClass: "bottom_navigation_no_shadow" },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      staticClass: "ma-0 pa-0 narrow-btn",
                                      on: { click: _vm.toggleLikePlaylist }
                                    },
                                    [
                                      _c("span", [
                                        _vm._v(_vm._s(_vm.likePlaylistCount))
                                      ]),
                                      _vm._v(" "),
                                      _vm.isLikedPlaylist
                                        ? _c("i", {
                                            staticClass:
                                              "fas fa-heart isLiked icon-large"
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      !_vm.isLikedPlaylist
                                        ? _c("i", {
                                            staticClass:
                                              "fas fa-heart outlined-icon icon-large"
                                          })
                                        : _vm._e()
                                    ]
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticStyle: {
                                position: "absolute",
                                top: "10px",
                                right: "14px",
                                "font-size": "16px"
                              },
                              on: { click: _vm.openOtherActionModal }
                            },
                            [
                              _c("i", {
                                staticClass: "fas fa-ellipsis-v my-grey-heart"
                              })
                            ]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.playlistIdUrl
                    ? _c("SceneListWatch", {
                        attrs: { mediaItems: _vm.sceneListofPlaylist },
                        on: {
                          switchToPlayListIndexOf: _vm.switchToPlayListIndexOf
                        }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _c("CommentListWatch", {
                    attrs: { mediaItems: _vm.commentListofPlaylist }
                  }),
                  _vm._v(" "),
                  _vm.showLoginModal ? _c("NoLoginModal") : _vm._e(),
                  _vm._v(" "),
                  _vm.showShareModal
                    ? _c("ShareModal", { attrs: { player: _vm.player } })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.showOtherActionModal
                    ? _c("OtherActionModal", {
                        attrs: {
                          player: _vm.player,
                          created_user_id: _vm.playlistIdUrl
                            ? _vm.playlistAndTagVideoData.user_id
                            : _vm.tagAndVideoData[0].tag_user_id
                        },
                        on: { deleteSucceed: _vm.deleteSucceed }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.showPlaySpeedModal
                    ? _c("PlaySpeedModal", { attrs: { player: _vm.player } })
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "v-snackbar",
                    {
                      attrs: { timeout: _vm.timeout },
                      model: {
                        value: _vm.snackbar,
                        callback: function($$v) {
                          _vm.snackbar = $$v
                        },
                        expression: "snackbar"
                      }
                    },
                    [
                      _vm._v(
                        "\n          " + _vm._s(_vm.text) + "\n          "
                      ),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "blue", text: "" },
                          on: {
                            click: function($event) {
                              _vm.snackbar = false
                            }
                          }
                        },
                        [_vm._v("Close")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e()
        ])
      ]),
      _vm._v(" "),
      [
        _c("script", {
          attrs: { type: "application/ld+json" },
          domProps: { innerHTML: _vm._s(_vm.jsonld) }
        })
      ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);