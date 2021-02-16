(self["webpackChunkSrc"] = self["webpackChunkSrc"] || []).push([["js/highlight"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Complete.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Complete.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {},
  data: function data() {
    return {};
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_0__.default],
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)({
    isLogin: "auth/check",
    newPlaylistId: "playlist/newPlaylistId",
    newPlaylistName: "playlist/newPlaylistName",
    newPreview: "playlist/newPreview",
    myPlaylistToSave: "tagging/myPlaylistToSave",
    shareUrl: "shareModal/shareUrl",
    shareText: "shareModal/shareText"
  })), {}, {
    encodedShareURI: function encodedShareURI() {
      return encodeURIComponent(this.shareUrl);
    }
  }),
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapMutations)({})), {}, {
    initialize: function initialize() {
      //ナビバーを非表示
      this.$store.commit("navbar/setShowNavbar", false);

      if (!this.newPlaylistId) {
        this.$router.push({
          path: "/youtube"
        })["catch"](function (err) {});
      } else {
        //シェア用のパラメーターを設定
        this.$store.commit("shareModal/setShareUrl", location.protocol + "//" + location.hostname + "/watch?playlist=" + this.myPlaylistToSave + "&index=0");
        this.$store.commit("shareModal/setShareText", this.newPlaylistName);
      }
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
      $(elm_select).remove();
    }
  }),
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route: function $route() {
      this.initialize();
    }
  },
  mounted: function mounted() {
    this.initialize();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Confirm.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Confirm.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_HighlightHeader_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/HighlightHeader.vue */ "./resources/assets/js/components/HighlightHeader.vue");
/* harmony import */ var _components_YTIframe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/YTIframe */ "./resources/assets/js/components/YTIframe.vue");
/* harmony import */ var _components_YTPlayerController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/YTPlayerController */ "./resources/assets/js/components/YTPlayerController.vue");
/* harmony import */ var _components_YTSeekBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/YTSeekBar */ "./resources/assets/js/components/YTSeekBar.vue");
/* harmony import */ var _components_NoLoginModal_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/NoLoginModal.vue */ "./resources/assets/js/components/NoLoginModal.vue");
/* harmony import */ var _components_ConfirmationModal_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/ConfirmationModal.vue */ "./resources/assets/js/components/ConfirmationModal.vue");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");


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








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    HighlightHeader: _components_HighlightHeader_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    YTIframe: _components_YTIframe__WEBPACK_IMPORTED_MODULE_2__.default,
    YTPlayerController: _components_YTPlayerController__WEBPACK_IMPORTED_MODULE_3__.default,
    YTSeekBar: _components_YTSeekBar__WEBPACK_IMPORTED_MODULE_4__.default,
    NoLoginModal: _components_NoLoginModal_vue__WEBPACK_IMPORTED_MODULE_5__.default,
    ConfirmationModal: _components_ConfirmationModal_vue__WEBPACK_IMPORTED_MODULE_6__.default
  },
  data: function data() {
    return {
      snackbar: false,
      timeout: 5000,
      text: "シーンタグを登録しました",
      ytIframeParameterReady: false,
      timer: null,
      highlightBodyRef: this.$refs.highlightBody,
      isDisabled: false,
      playlistIdToAdd: null,
      playlistIdToEdit: null,
      tagIdToEdit: null,
      tags: [],
      tagItems: [],
      isIOS: false,
      isVideoDataReady: false
    };
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_7__.default],
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_8__.mapGetters)({
    isLogin: "auth/check",
    tagDataArray: "youtube/tagDataArray",
    isNew: "youtube/isNew",
    newVideoData: "youtube/newVideoData",
    videoData: "youtube/videoData",
    currentTime: "youtube/currentTime",
    currentCategory: "youtube/currentCategory",
    start: "tagging/start",
    end: "tagging/end",
    privacySetting: "tagging/privacySetting",
    isAdding: "tagging/isAdding",
    isEditing: "tagging/isEditing",
    showLoginModal: "noLoginModal/showLoginModal",
    newPlaylistId: "playlist/newPlaylistId",
    showConfirmationModal: "confirmationModal/showConfirmationModal",
    youtubeId: "ytPlayer/youtubeId",
    player: "ytPlayer/player",
    isPlayerReady: "ytPlayer/isPlayerReady",
    isMuted: "ytPlayer/isMuted",
    isPlaying: "ytPlayer/isPlaying",
    tagAndVideoData: "watch/tagAndVideoData"
  })),
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_8__.mapMutations)({
    setPlayer: "ytPlayer/setPlayer",
    setIsMuted: "ytPlayer/setIsMuted",
    setIsPlaying: "ytPlayer/setIsPlaying",
    setIsNew: "youtube/setIsNew",
    setIsAdding: "tagging/setIsAdding",
    setIsEditing: "tagging/setIsEditing"
  })), {}, {
    initialize: function initialize() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //ナビバーを非表示
                _this.$store.commit("navbar/setShowNavbar", false); //headerの文言をセット


                _this.$store.commit("highlightHeader/setHeaderMessage", "切り抜いた場面を確認"); //clear all data before loading


                _this.clearAllInput(); //既存プレイリストへの追加かシーンの編集か新規かを判別


                if (!(_this.$route.path == "/add/confirm")) {
                  _context.next = 8;
                  break;
                }

                _this.setIsAdding(true);

                _this.playlistIdToAdd = _this.$route.query.playlist;
                _context.next = 15;
                break;

              case 8:
                if (!(_this.$route.path == "/edit/confirm")) {
                  _context.next = 15;
                  break;
                }

                _this.playlistIdToEdit = _this.$route.query.playlist;

                _this.setIsEditing(true);

                _this.tagIdToEdit = _this.$route.query.tag; //動画・タグデータを取得

                _context.next = 14;
                return _this.$store.dispatch("watch/getTagAndVideoDataById", _this.tagIdToEdit);

              case 14:
                //set tags data for editing
                _this.setEditingTagData();

              case 15:
                //倍速視聴を1倍のリセット
                _this.$store.commit("ytPlayer/setPlaySpeed", 1);

                _this.isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent); //headerの戻るアイコンを表示

                _this.$store.commit("highlightHeader/setShowBackIcon", true);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    //set tags data for editing
    setEditingTagData: function setEditingTagData() {
      var defaultTags = this.tagAndVideoData[0].tags.split(/::/);
      this.$store.commit("tagging/setTags", defaultTags);
      this.tags = defaultTags;
    },
    checkRouting: function checkRouting() {
      if (this.start == null || this.end == null) {
        this.$router.push({
          path: "/youtube"
        })["catch"](function (err) {});
      }
    },
    clearAllInput: function clearAllInput() {
      this.$store.commit("ytSeekBar/setStartTimeInput", null);
      this.$store.commit("ytSeekBar/setEndTimeInput", null);
      this.$store.commit("tagging/setTags", "");
      this.$store.commit("tagging/setStart", "");
      this.$store.commit("tagging/setEnd", "");
      this.$store.commit("tagging/setPrivacySetting", "public");
      this.setIsAdding(false);
      this.setIsEditing(false);
    },
    //以前入力された開始・終了時間をセッションストレージからロード
    loadTimeInput: function loadTimeInput(youtubeId) {
      var ytInputData = JSON.parse(window.sessionStorage.getItem("ytInputData"));

      if (ytInputData && ytInputData.youtubeId == youtubeId) {
        this.$store.commit("tagging/setStart", ytInputData.startTimeInput);
        this.$store.commit("tagging/setEnd", ytInputData.endTimeInput);
        this.$store.commit("ytSeekBar/setStartTimeInput", ytInputData.startTimeInput);
        this.$store.commit("ytSeekBar/setEndTimeInput", ytInputData.endTimeInput);
      }

      this.checkRouting();
    },
    // 確認モーダル表示へ進む
    confirm: function confirm() {
      if (!this.isLogin) {
        //未ログインの場合
        this.$store.commit("noLoginModal/openLoginModal");
        this.$store.commit("noLoginModal/setMessageWhenNotLogined", "切り抜いた場面を保存するには、ログインしてください。(入力データは保持されます)");
      } else {
        clearInterval(this.timer);
        var self = this;
        setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!self.isEditing) {
                    _context2.next = 18;
                    break;
                  }

                  //編集の場合
                  //入力済データ(除く、保存先プレイリスト)をセット
                  self.$store.commit("tagging/setTagId", self.tagIdToEdit);
                  self.$store.commit("tagging/setTags", self.tags);
                  self.$store.commit("tagging/setPrivacySetting", "public"); //新しく作成したplaylistIdをセット

                  self.$store.commit("tagging/setMyPlaylistToSave", self.playlistIdToEdit); //ローディングを表示し、OKボタンを無効化

                  self.$store.commit("highlightHeader/setIsLoading");
                  self.isDisabled = true; //場面のデータをDBで更新

                  _context2.next = 9;
                  return self.$store.dispatch("tagging/updateSceneTags");

                case 9:
                  //場面のサムネイルを取得しS3に保存(非同期)
                  self.$store.dispatch("tagging/storeTagThumbnail"); //場面のプレビュー動画を取得しS3に保存(非同期)

                  self.$store.dispatch("tagging/storeTagPreview"); //ローディングを非表示

                  self.$store.commit("highlightHeader/setNotLoading"); //display editting a new scene completion snackbar

                  self.$store.commit("snackbar/setText", "場面を更新しました");
                  self.$store.commit("snackbar/setSnackbar", true);
                  self.$store.commit("snackbar/setTimeout", 5000); //return to the playlist edit page

                  self.$router.push({
                    path: "/editmyplaylist",
                    query: {
                      playlist: self.playlistIdToEdit
                    }
                  })["catch"](function (err) {});
                  _context2.next = 51;
                  break;

                case 18:
                  if (!self.isAdding) {
                    _context2.next = 35;
                    break;
                  }

                  //in case of adding to existing playlist
                  //入力済データをセット
                  self.$store.commit("tagging/setTags", self.tags);
                  self.$store.commit("tagging/setPrivacySetting", "public"); //新しく場面を追加する既存のplaylistIdをセット

                  self.$store.commit("tagging/setMyPlaylistToSave", self.playlistIdToAdd); //ローディングを表示し、OKボタンを無効化

                  self.$store.commit("highlightHeader/setIsLoading");
                  self.isDisabled = true; //場面のデータを登録

                  _context2.next = 26;
                  return self.$store.dispatch("tagging/storeSceneTags");

                case 26:
                  //場面のサムネイルを取得しS3に保存(非同期)
                  self.$store.dispatch("tagging/storeTagThumbnail"); //場面のプレビュー動画を取得しS3に保存(非同期)

                  self.$store.dispatch("tagging/storeTagPreview"); //ローディングを非表示

                  self.$store.commit("highlightHeader/setNotLoading"); //display adding a new scene to existing playlist completion snackbar

                  self.$store.commit("snackbar/setText", "新しい場面を追加しました");
                  self.$store.commit("snackbar/setSnackbar", true);
                  self.$store.commit("snackbar/setTimeout", 5000); //return to the playlist edit page

                  self.$router.push({
                    path: "/editmyplaylist",
                    query: {
                      playlist: self.playlistIdToAdd
                    }
                  })["catch"](function (err) {});
                  _context2.next = 51;
                  break;

                case 35:
                  //新規の場合
                  //入力済データをセット
                  self.$store.commit("tagging/setTags", self.tags);
                  self.$store.commit("tagging/setPrivacySetting", "public"); //check if there is editing new playlist

                  _context2.next = 39;
                  return self.$store.dispatch("playlist/getNewPlaylistId");

                case 39:
                  if (self.newPlaylistId) {
                    _context2.next = 42;
                    break;
                  }

                  _context2.next = 42;
                  return self.$store.dispatch("playlist/createPlaylist", {
                    playlistName: "",
                    privacySetting: self.privacySetting,
                    currentTagId: "",
                    currentCategory: self.currentCategory
                  });

                case 42:
                  //新しく作成したplaylistIdをセット
                  self.$store.commit("tagging/setMyPlaylistToSave", self.newPlaylistId); //ローディングを表示し、OKボタンを無効化

                  self.$store.commit("highlightHeader/setIsLoading");
                  self.isDisabled = true; //場面のデータをDBに登録

                  _context2.next = 47;
                  return self.$store.dispatch("tagging/storeSceneTags");

                case 47:
                  //場面のサムネイルを取得しS3に保存(非同期)
                  self.$store.dispatch("tagging/storeTagThumbnail"); //場面のプレビュー動画を取得しS3に保存(非同期)

                  self.$store.dispatch("tagging/storeTagPreview"); //ローディングを非表示

                  self.$store.commit("highlightHeader/setNotLoading"); //display scene tagging complete modal

                  self.$store.commit("confirmationModal/openConfirmationModal");

                case 51:
                  //セッションに保存してある開始・終了時間データを破棄
                  window.sessionStorage.removeItem("ytInputData");

                case 52:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        })));
      }
    },
    unmute: function unmute() {
      this.player.unMute();
      this.setIsMuted(false);
    },
    mute: function mute() {
      this.player.mute();
      this.setIsMuted(true);
    },
    switchToPlayListIndexOf: function switchToPlayListIndexOf(index) {
      //URLを更新
      this.$router.push({
        path: "/youtube/confirm",
        query: {
          v: this.youtubeId
        }
      })["catch"](function (err) {}); //次のシーンをロードし再生

      this.$store.dispatch("ytPlayer/playListIndexOf", index);
    }
  }),
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route: function $route() {
      this.initialize();
    },
    isPlayerReady: function isPlayerReady() {
      if (this.isPlayerReady) {
        this.setYtPlayerCSS();
        this.$refs.ytSeekBar.setYtSeekbarWrapperTop();
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
      var youtubeId, listOfYoutubeIdStartEndTime, dataOfYoutubeIdStartEndTime;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this2.initialize(); //必要データを取得するまでTagItemは非表示


              _this2.$store.commit("youtube/setIsReady", false); //URLからyoutubeIdを格納


              youtubeId = _this2.$route.query.v; //必要データを取得

              _this2.$store.commit("youtube/setYoutubeId", youtubeId);

              _context3.next = 6;
              return _this2.$store.dispatch("youtube/getVideo", youtubeId);

            case 6:
              _context3.next = 8;
              return _this2.$store.dispatch("youtube/getTag");

            case 8:
              if (!_this2.isNew) {
                _context3.next = 11;
                break;
              }

              _context3.next = 11;
              return _this2.$store.dispatch("youtube/getNewVideoData");

            case 11:
              _this2.isVideoDataReady = true; //load start & end time

              _this2.loadTimeInput(youtubeId); //YTPlayerのまとめの再生に必要なパラメータをセット


              listOfYoutubeIdStartEndTime = [];
              dataOfYoutubeIdStartEndTime = [];
              dataOfYoutubeIdStartEndTime[0] = [];
              dataOfYoutubeIdStartEndTime[0].youtubeId = youtubeId;
              _this2.start ? dataOfYoutubeIdStartEndTime[0].start = "00:" + _this2.start : dataOfYoutubeIdStartEndTime[0].start = "";
              _this2.end ? dataOfYoutubeIdStartEndTime[0].end = "00:" + _this2.end : dataOfYoutubeIdStartEndTime[0].end = "";
              dataOfYoutubeIdStartEndTime[0].scene_order = 1;

              _this2.putTagVideoIntolistOfYoutubeIdStartEndTime(listOfYoutubeIdStartEndTime, dataOfYoutubeIdStartEndTime);

              _this2.$store.commit("ytPlayer/setListOfYoutubeIdStartEndTime", listOfYoutubeIdStartEndTime);

              _this2.$store.commit("ytPlayer/setListIndex", 0);

              _this2.ytIframeParameterReady = true; //YTSeekBarのクリックイベント用にボディのrefをセット

              _this2.highlightBodyRef = _this2.$refs.highlightBody;

            case 25:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  beforeDestroy: function beforeDestroy() {
    // シーンタグ付けコンポーネントの現在再生時間をセットするインターバルを停止する
    clearInterval(this.timer); //headerの戻るアイコンを非表示

    this.$store.commit("highlightHeader/setShowBackIcon", false);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/ConfirmationModal.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/ConfirmationModal.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {};
  },
  props: {},
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapGetters)({
    start: "tagging/start",
    end: "tagging/end"
  })), {}, {
    showConfirmationModal: {
      get: function get() {
        return this.$store.getters["confirmationModal/showConfirmationModal"];
      },
      set: function set() {
        return this.$store.commit("confirmationModal/closeConfirmationModal");
      }
    }
  }),
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapMutations)({
    closeConfirmationModal: "confirmationModal/closeConfirmationModal"
  })), {}, {
    moveToYThighlightPage: function moveToYThighlightPage() {
      //close scene tagging complete modal
      this.$store.commit("confirmationModal/closeConfirmationModal"); //一つ前のYouTube動画ハイライトページを表示

      this.$router.go(-1);
    },
    openSceneListPage: function openSceneListPage() {
      //close scene tagging complete modal
      this.$store.commit("confirmationModal/closeConfirmationModal"); //切り抜いた場面一覧ページを表示

      this.$router.push({
        path: "/highlight/scenelist"
      })["catch"](function (err) {});
    }
  }),
  created: function created() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/HighlightHeader.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/HighlightHeader.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {};
  },
  methods: {
    back: function back() {
      this.$router.go(-1);
    }
  },
  computed: _objectSpread(_objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)({
    headerMessage: "highlightHeader/headerMessage",
    showBackIcon: "highlightHeader/showBackIcon",
    loading: "highlightHeader/loading"
  })), (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapState)({})), (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)({})),
  watch: {},
  created: function created() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/SceneList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/SceneList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_HighlightHeader_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/HighlightHeader.vue */ "./resources/assets/js/components/HighlightHeader.vue");
/* harmony import */ var _components_SceneTagItem_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/SceneTagItem.vue */ "./resources/assets/js/components/SceneTagItem.vue");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");


var _components$data$mixi;

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




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_components$data$mixi = {
  components: {
    HighlightHeader: _components_HighlightHeader_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    SceneTagItem: _components_SceneTagItem_vue__WEBPACK_IMPORTED_MODULE_2__.default
  },
  data: function data() {
    return {
      showAddNewSceneComponent: false,
      isIOS: false
    };
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_3__.default],
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapGetters)({
    newPlaylistId: "playlist/newPlaylistId",
    sceneListofPlaylist: "playlist/sceneListofPlaylist",
    resetKey: "playlist/resetKey",
    playlistAndTagVideoData: "watch/playlistAndTagVideoData",
    youtubeId: "youtube/youtubeId",
    tagDataArray: "youtube/tagDataArray",
    myPlaylistToSave: "tagging/myPlaylistToSave"
  })),
  watch: {
    myPlaylistToSave: function myPlaylistToSave() {
      this.loadSceneList();
    }
  },
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapMutations)({})), {}, {
    initialize: function initialize() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //ナビバーを非表示
                _this.$store.commit("navbar/setShowNavbar", false); //headerの文言をセット


                _this.$store.commit("highlightHeader/setHeaderMessage", "切り抜いた場面からまとめを作成"); //load new creating playlist ID


                _context.next = 4;
                return _this.$store.dispatch("playlist/getNewPlaylistId");

              case 4:
                if (_this.newPlaylistId) {
                  _context.next = 8;
                  break;
                }

                _this.$router.push({
                  path: "/youtube"
                })["catch"](function (err) {});

                _context.next = 12;
                break;

              case 8:
                //set new creating playlist ID
                _this.$store.commit("tagging/setMyPlaylistToSave", _this.newPlaylistId);

                _this.$store.commit("watch/setPlaylistId", _this.newPlaylistId); // for scene order change by dragging
                //load scenelist


                _context.next = 12;
                return _this.loadSceneList();

              case 12:
                _this.isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    //切り抜いた場面一覧を取得
    loadSceneList: function loadSceneList() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.$store.dispatch("watch/getPlaylistAndTagVideoDataById", _this2.myPlaylistToSave);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  })
}, _defineProperty(_components$data$mixi, "watch", {
  // 検索バーによるルート変更後の初期化処理
  $route: function $route() {
    this.initialize();
  },
  playlistAndTagVideoData: function playlistAndTagVideoData() {
    var mediaItems = [];
    this.playlistAndTagVideoData ? this.putTagVideoIntoMediaItems(mediaItems, this.playlistAndTagVideoData.tagVideoData) : "";
    this.$store.commit("playlist/setSceneListofPlaylist", mediaItems);
  }
}), _defineProperty(_components$data$mixi, "mounted", function mounted() {
  var _this3 = this;

  return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _this3.initialize();

          case 2:
            //headerの戻るアイコンを表示
            _this3.$store.commit("highlightHeader/setShowBackIcon", true);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }))();
}), _defineProperty(_components$data$mixi, "beforeDestroy", function beforeDestroy() {
  //headerの戻るアイコンを非表示
  this.$store.commit("highlightHeader/setShowBackIcon", false);
}), _components$data$mixi);

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Title.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Title.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_HighlightHeader_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/HighlightHeader.vue */ "./resources/assets/js/components/HighlightHeader.vue");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");


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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    HighlightHeader: _components_HighlightHeader_vue__WEBPACK_IMPORTED_MODULE_1__.default
  },
  data: function data() {
    return {
      playlistName: null,
      description: null,
      privacySettingList: [{
        text: "公開",
        value: "public"
      }, {
        text: "限定公開",
        value: "limited"
      }, {
        text: "非公開",
        value: "private"
      }],
      rules: {
        required: function required(value) {
          return !!value || "Required.";
        }
      }
    };
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_2__.default],
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapGetters)({
    isLogin: "auth/check",
    youtubeId: "youtube/youtubeId",
    newPlaylistId: "playlist/newPlaylistId",
    myPlaylistToSave: "tagging/myPlaylistToSave"
  })), {}, {
    privacySetting: {
      get: function get() {
        return this.$store.getters["tagging/privacySetting"];
      },
      set: function set(val) {
        return this.$store.commit("tagging/setPrivacySetting", val);
      }
    }
  }),
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapMutations)({})), {}, {
    initialize: function initialize() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //ナビバーを非表示
                _this.$store.commit("navbar/setShowNavbar", false); //headerの文言をセット


                _this.$store.commit("highlightHeader/setHeaderMessage", "まとめのタイトルを入力"); //load new creating playlist ID


                _context.next = 4;
                return _this.$store.dispatch("playlist/getNewPlaylistId");

              case 4:
                if (!_this.newPlaylistId) {
                  _this.$router.push({
                    path: "/youtube"
                  })["catch"](function (err) {});
                } else {
                  //set new creating playlist ID
                  _this.$store.commit("tagging/setMyPlaylistToSave", _this.newPlaylistId);
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    moveToCompletePage: function moveToCompletePage() {
      this.$router.push({
        path: "/highlight/complete"
      })["catch"](function (err) {});
    },
    //タイトルを更新し完了画面を表示
    updateAndMoveToCompletePage: function updateAndMoveToCompletePage() {
      if (!this.isLogin) {
        //未ログインの場合
        this.$store.commit("noLoginModal/openLoginModal");
        this.$store.commit("noLoginModal/setMessageWhenNotLogined", "まとめを保存するには、ログインしてください。(入力データは保持されます)");
      } else {
        //ログイン済の場合
        var self = this;
        setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
          var params;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  //check if there is editing new playlist
                  if (!self.myPlaylistToSave) {
                    //redirect to YouTube video select page if illegal accesss
                    this.$router.push({
                      path: "/youtube"
                    })["catch"](function (err) {});
                  } //update playlist title and settings


                  params = {
                    newPlaylistId: self.myPlaylistToSave,
                    playlistName: self.playlistName,
                    privacySetting: self.privacySetting,
                    description: self.description
                  };
                  _context2.next = 4;
                  return self.$store.dispatch("playlist/updatePlaylist", params);

                case 4:
                  //set the new playlist name for complete page
                  self.$store.commit("playlist/setNewPlaylistName", self.playlistName); //完了画面に遷移

                  self.moveToCompletePage();

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        })));
      }
    }
  }),
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route: function $route() {
      this.initialize();
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this2.initialize();

            case 2:
              //headerの戻るアイコンを表示
              _this2.$store.commit("highlightHeader/setShowBackIcon", true);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  beforeDestroy: function beforeDestroy() {
    //headerの戻るアイコンを非表示
    this.$store.commit("highlightHeader/setShowBackIcon", false);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTLoadingItem.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTLoadingItem.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    numberOfYTItemsPerPagination: Number
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_0__.default],
  methods: {},
  created: function created() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTSearchBox.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTSearchBox.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      model: null,
      searchquery: null
    };
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_1__.default],
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapGetters)({
    searchCandidates: "YTsearch/candidates",
    isAdding: "tagging/isAdding",
    myPlaylistToSave: "tagging/myPlaylistToSave"
  })), {}, {
    //過去の検索履歴と人気の検索履歴を履歴優先で合計7件までサジェストに表示
    items: function items() {
      var items = [];
      var itemLimit = 7;
      var itemCount = 0; //過去の検索履歴をサジェストに追加

      if (this.searchCandidates["searchHistoryCandidates"]) this.searchCandidates["searchHistoryCandidates"].forEach(function (value) {
        if (itemCount++ < itemLimit) {
          var item = {
            icon: "history",
            value: value.searchQuery
          };
          items.push(item);
        }
      }); //人気の検索履歴をサジェストに追加

      if (this.searchCandidates["topSearchqueriesCandidates"]) this.searchCandidates["topSearchqueriesCandidates"].forEach(function (value) {
        if (itemCount++ < itemLimit) {
          var item = {
            icon: "search",
            value: value.searchquery.searchQuery
          };
          items.push(item);
        }
      });
      return items;
    }
  }),
  watch: {
    searchquery: function searchquery(input) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this.isLoading) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _context.next = 4;
                return _this.$store.dispatch("YTsearch/getCandidates", input);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  },
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapMutations)({
    setIsAdding: "tagging/setIsAdding"
  })), {}, {
    YTsearch: function YTsearch(event) {
      // 日本語入力中のEnterキー操作は無効にする
      if (event.keyCode != undefined && event.keyCode !== 13) return; //空欄だった場合は検索実行せずリターン

      if (!this.searchquery || !this.searchquery.match(/\S/g)) return; //入力内容がYoutubeのURLかキーワードか判定

      var youtubeId = this.searchquery.match(/(\?v=|youtu.be\/)([^&]+)/);

      if (youtubeId) {
        //以前のシーンタグ入力項目を初期化
        this.clearTaggingInput(); //YoutubeのURLの場合、直接再生ページへ

        if (this.isAdding) {
          //in case of adding to existing playlist
          this.$router.push({
            path: "/add/scene",
            query: {
              playlist: this.myPlaylistToSave,
              v: youtubeId[2]
            }
          })["catch"](function (err) {});
        } else {
          //in case of adding to new playlist
          this.$router.push({
            path: "/youtube/scene",
            query: {
              v: youtubeId[2]
            }
          })["catch"](function (err) {});
        }
      } else {
        //キーワードの場合、検索結果表示へ
        if (this.isAdding) {
          //in case of adding to existing playlist
          this.$store.commit("YTsearch/setYTsearchQuery", this.searchquery);
          this.$router.push({
            path: "/add/search",
            query: {
              playlist: this.myPlaylistToSave,
              search_query: this.searchquery
            }
          })["catch"](function (err) {});
        } else {
          //in case of adding to new playlist
          if (this.$route.query["return"] == "true") {
            this.$store.commit("YTsearch/setYTsearchQuery", this.searchquery);
            this.$router.push({
              path: "/youtube",
              query: {
                search_query: this.searchquery,
                "return": true
              }
            })["catch"](function (err) {});
          } else {
            this.$store.commit("YTsearch/setYTsearchQuery", this.searchquery);
            this.$router.push({
              path: "/youtube",
              query: {
                search_query: this.searchquery
              }
            })["catch"](function (err) {});
          }
        }
      } //インクリメンタルサーチの表示を消すためフォーカスを外す


      this.$refs.YTsearchInputBox.blur();
    },
    //インクリメンタルサーチをクリックし検索
    YTsearchByItem: function YTsearchByItem(item) {
      //検索結果を表示
      if (this.isAdding) {
        //in case of adding to existing playlist
        this.$store.commit("YTsearch/setYTsearchQuery", item);
        this.$router.push({
          path: "/add/search",
          query: {
            playlist: this.myPlaylistToSave,
            search_query: item
          }
        })["catch"](function (err) {});
      } else {
        //in case of adding to new playlist
        if (this.$route.query["return"] == "true") {
          this.$store.commit("YTsearch/setYTsearchQuery", item);
          this.$router.push({
            path: "/youtube",
            query: {
              search_query: item,
              "return": true
            }
          })["catch"](function (err) {});
        } else {
          this.$store.commit("YTsearch/setYTsearchQuery", item);
          this.$router.push({
            path: "/youtube",
            query: {
              search_query: item
            }
          })["catch"](function (err) {});
        }
      }
    }
  }),
  created: function created() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this2.$store.dispatch("YTsearch/getCandidates");

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTitem.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTitem.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_YTLoadingItem_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/YTLoadingItem.vue */ "./resources/assets/js/components/YTLoadingItem.vue");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");
var _mapGetters;

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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    YTLoadingItem: _components_YTLoadingItem_vue__WEBPACK_IMPORTED_MODULE_0__.default
  },
  props: {
    YTitems: Array
  },
  data: function data() {
    return {};
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_1__.default],
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapGetters)((_mapGetters = {
    isYTLoading: "YTsearch/isYTLoading"
  }, _defineProperty(_mapGetters, "isYTLoading", "YTsearch/isYTLoading"), _defineProperty(_mapGetters, "numberOfYTItemsPerPagination", "YTsearch/numberOfYTItemsPerPagination"), _defineProperty(_mapGetters, "isAdding", "tagging/isAdding"), _defineProperty(_mapGetters, "myPlaylistToSave", "tagging/myPlaylistToSave"), _mapGetters))),
  methods: {
    select: function select(item) {
      //以前のシーンタグ入力項目を初期化
      this.clearTaggingInput();

      if (this.isAdding) {
        //プレイリストへの追加用のシーンタグ付けページを表示
        this.$router.push({
          path: "/add/scene",
          query: {
            playlist: this.myPlaylistToSave,
            v: item.youtubeId
          }
        })["catch"](function (err) {});
      } else {
        //シーンタグ付けページを表示
        this.$router.push({
          path: "/youtube/scene",
          query: {
            v: item.youtubeId
          }
        })["catch"](function (err) {});
      }
    }
  },
  created: function created() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTvideoSelectBox.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTvideoSelectBox.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");
/* harmony import */ var _components_HighlightHeader_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/HighlightHeader.vue */ "./resources/assets/js/components/HighlightHeader.vue");
/* harmony import */ var _components_YTitem_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/YTitem.vue */ "./resources/assets/js/components/YTitem.vue");
/* harmony import */ var _components_YTSearchBox_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/YTSearchBox.vue */ "./resources/assets/js/components/YTSearchBox.vue");


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





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_objectSpread(_objectSpread({
  components: {
    HighlightHeader: _components_HighlightHeader_vue__WEBPACK_IMPORTED_MODULE_2__.default,
    YTitem: _components_YTitem_vue__WEBPACK_IMPORTED_MODULE_3__.default,
    YTSearchBox: _components_YTSearchBox_vue__WEBPACK_IMPORTED_MODULE_4__.default
  },
  data: function data() {
    return {
      headerWord: "まとめを作成",
      from: null
    };
  }
}, (0,vuex__WEBPACK_IMPORTED_MODULE_5__.mapGetters)({
  isAdding: "tagging/isAdding",
  myPlaylistToSave: "tagging/myPlaylistToSave"
})), {}, {
  mixins: [_util__WEBPACK_IMPORTED_MODULE_1__.default],
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_5__.mapMutations)({
    setIsAdding: "tagging/setIsAdding",
    setMyPlaylistToSave: "tagging/setMyPlaylistToSave"
  })), {}, {
    setHeaderBackIcon: function setHeaderBackIcon() {
      var _this = this;

      this.$nextTick(function () {
        if (_this.$route.path == "/add" || _this.$route.path == "/add/search" || _this.$route.query["return"] == "true") {
          //追加の場合、もしくはreturnフラグがtrueの場合は、headerの戻るアイコンを表示
          _this.$store.commit("highlightHeader/setShowBackIcon", true);
        } else {
          //デフォルトではheaderの戻るアイコンを非表示
          _this.$store.commit("highlightHeader/setShowBackIcon", false);
        }
      });
    },
    initialize: function initialize() {
      this.setHeaderBackIcon(); //既存のプレイリストへの追加か判別

      if (this.$route.path == "/add" || this.$route.path == "/add/search") {
        this.setIsAdding(true);
        this.setMyPlaylistToSave(this.$route.query.playlist); //headerの文言を追加用に修正

        this.headerWord = "まとめに追加";
      } else {
        this.setIsAdding(false);
        this.setMyPlaylistToSave("none");
      } //URLのsearch_queryを検索ワードにセット


      this.$store.commit("YTsearch/setYTsearchQuery", this.$route.query.search_query); //前回の検索結果を空にする

      this.$store.commit("YTsearch/clearYTResult");
      this.$store.commit("YTsearch/setYTResultPageNumber", 1);
      this.$store.commit("YTsearch/setYTSearchKey", "");
      this.$store.commit("YTsearch/setYTSearchPageToken", "");

      if (this.YTsearchQuery == null) {
        //検索ワードがセットされていない場合、最近まとめたYouTube動画を表示
        this.$store.commit("highlightHeader/setHeaderMessage", this.headerWord + "する動画を検索");
        this.getYTRecentVideos();
      } else {
        //検索ワードがセットされている場合、YouTube検索結果を表示
        this.$store.commit("highlightHeader/setHeaderMessage", this.headerWord + "する動画を選択");
        this.showYTresult();
      }
    },
    getYTRecentVideos: function getYTRecentVideos() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // 前回の検索結果を空にする
                _this2.$store.commit("YTsearch/clearYTRecentVideos"); // ローディングを表示


                _this2.$store.commit("YTsearch/setIsYTLoading", true); // まとめを作成したYouTube動画履歴データを取得


                _context.next = 4;
                return _this2.$store.dispatch("YTsearch/YTRecentVideos");

              case 4:
                // ローディングを非表示
                _this2.$store.commit("YTsearch/setIsYTLoading", false);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    //表示するYoutube検索結果の無限スクロール
    infinateScrollYTresults: function infinateScrollYTresults() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //ローディングを表示
                _this3.$store.commit("YTsearch/setIsYTLoading", true); //無限スクロールに合わせてYoutubeの検索結果を取得


                _context2.next = 3;
                return _this3.$store.dispatch("YTsearch/YTsearch", _this3.pageNumber);

              case 3:
                _this3.$store.commit("YTsearch/setYTResultPageNumber", _this3.pageNumber + 1); //ローディングを非表示


                _this3.$store.commit("YTsearch/setIsYTLoading", false);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    showYTresult: function showYTresult() {
      var _this4 = this;

      //ローディング表示用の変数をセット
      this.$store.commit("YTsearch/setNumberOfYTItemsPerPagination", 8);

      window.onscroll = function () {
        //ウィンドウの下に達したら次のプレイリストアイテムを読み込み
        var bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight;

        if (bottomOfWindow && !_this4.isYTSearching) {
          _this4.infinateScrollYTresults();
        }
      };

      this.infinateScrollYTresults();
      this.$store.commit("tagging/setTags", "");
      this.$store.commit("tagging/setStart", "");
      this.$store.commit("tagging/setEnd", "");
    }
  }),
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_5__.mapGetters)({
    YTsearchQuery: "YTsearch/YTsearchQuery",
    YTresult: "YTsearch/YTresult",
    YTRecentVideos: "YTsearch/YTRecentVideos",
    isYTSearching: "YTsearch/isYTSearching",
    isYTLoading: "YTsearch/isYTLoading",
    pageNumber: "YTsearch/YTResultPageNumber",
    showBackIcon: "highlightHeader/showBackIcon"
  })),
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route: function $route() {
      // this.setHeaderBackIcon();
      this.initialize();
    }
  },
  created: function created() {
    this.initialize();
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Youtube.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Youtube.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_HighlightHeader_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/HighlightHeader.vue */ "./resources/assets/js/components/HighlightHeader.vue");
/* harmony import */ var _components_YTIframe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/YTIframe */ "./resources/assets/js/components/YTIframe.vue");
/* harmony import */ var _components_YTPlayerController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/YTPlayerController */ "./resources/assets/js/components/YTPlayerController.vue");
/* harmony import */ var _components_YTSeekBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/YTSeekBar */ "./resources/assets/js/components/YTSeekBar.vue");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");


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






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    HighlightHeader: _components_HighlightHeader_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    YTIframe: _components_YTIframe__WEBPACK_IMPORTED_MODULE_2__.default,
    YTPlayerController: _components_YTPlayerController__WEBPACK_IMPORTED_MODULE_3__.default,
    YTSeekBar: _components_YTSeekBar__WEBPACK_IMPORTED_MODULE_4__.default
  },
  data: function data() {
    var _this = this;

    return {
      ytIframeParameterReady: false,
      timer: null,
      startTimeInput: null,
      endTimeInput: null,
      highlightBodyRef: this.$refs.highlightBody,
      isAdding: false,
      isEditing: false,
      playlistIdToAdd: null,
      playlistIdToEdit: null,
      tagIdToEdit: null,
      isIOS: false,
      startRules: [function (v) {
        return !!v || "開始時間を入力して下さい";
      }, function (v) {
        var regex = /^\d+:\d{1,2}$/;

        if (!v || regex.test(v)) {
          return true;
        }

        if (!regex.test(v)) {
          return "分:秒の形式で入力して下さい";
        }
      }],
      endRules: [function (v) {
        return !!v || "終了時間を入力して下さい";
      }, function (v) {
        var regex = /^\d+:\d{1,2}$/;

        if (!v || regex.test(v)) {
          return true;
        }

        if (!regex.test(v)) {
          return "分:秒の形式で入力して下さい";
        }
      }, function (v) {
        if (_this.startTimeInput) {
          if (parseInt(_this.convertToSec(v)) <= parseInt(_this.convertToSec(_this.startTimeInput))) {
            return "開始時間より後ろの時間を入力下さい";
          }
        }

        return true;
      }]
    };
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_5__.default],
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_6__.mapGetters)({
    isLogin: "auth/check",
    tagAndVideoData: "watch/tagAndVideoData",
    tagDataArray: "youtube/tagDataArray",
    isNew: "youtube/isNew",
    newVideoData: "youtube/newVideoData",
    videoData: "youtube/videoData",
    currentTime: "youtube/currentTime",
    youtubeId: "ytPlayer/youtubeId",
    player: "ytPlayer/player",
    isPlayerReady: "ytPlayer/isPlayerReady",
    isMuted: "ytPlayer/isMuted"
  })),
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_6__.mapMutations)({
    setPlayer: "ytPlayer/setPlayer",
    setIsMuted: "ytPlayer/setIsMuted"
  })), {}, {
    initialize: function initialize() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //ナビバーを非表示
                _this2.$store.commit("navbar/setShowNavbar", false); //headerの文言をセット


                _this2.$store.commit("highlightHeader/setHeaderMessage", "切り抜く場面を指定"); //clear all data before loading


                _this2.clearAllInput(); //既存プレイリストへの追加かシーンの編集か新規かを判別


                if (!(_this2.$route.path == "/add/scene")) {
                  _context.next = 8;
                  break;
                }

                _this2.isAdding = true;
                _this2.playlistIdToAdd = _this2.$route.query.playlist;
                _context.next = 15;
                break;

              case 8:
                if (!(_this2.$route.path == "/edit/scene")) {
                  _context.next = 15;
                  break;
                }

                _this2.isEditing = true;
                _this2.playlistIdToEdit = _this2.$route.query.playlist;
                _this2.tagIdToEdit = _this2.$route.query.tag; //動画・タグデータを取得

                _context.next = 14;
                return _this2.$store.dispatch("watch/getTagAndVideoDataById", _this2.tagIdToEdit);

              case 14:
                //set default data for editing
                _this2.setEditingTimeData();

              case 15:
                //倍速視聴を1倍のリセット
                _this2.$store.commit("ytPlayer/setPlaySpeed", 1);

                _this2.isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent); //headerの戻るアイコンを表示

                _this2.$store.commit("highlightHeader/setShowBackIcon", true);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    setEditingTimeData: function setEditingTimeData() {
      this.$store.commit("ytSeekBar/setStartTimeInput", this.formatToMinSec(this.tagAndVideoData[0].start));
      this.$store.commit("ytSeekBar/setEndTimeInput", this.formatToMinSec(this.tagAndVideoData[0].end));
      this.$store.commit("tagging/setStart", this.formatToMinSec(this.tagAndVideoData[0].start));
      this.$store.commit("tagging/setEnd", this.formatToMinSec(this.tagAndVideoData[0].end));
      this.startTimeInput = this.formatToMinSec(this.tagAndVideoData[0].start);
      this.endTimeInput = this.formatToMinSec(this.tagAndVideoData[0].end);
    },
    tapStartBtn: function tapStartBtn() {
      this.startTimeInput = this.currentTime; // call child component's methods

      this.$refs.YTPlayerController.setImmediateHide();
      this.$refs.YTPlayerController.setIsPlaying();
      this.$refs.YTPlayerController.toggleController();
      this.player.playVideo();
    },
    tapStopBtn: function tapStopBtn() {
      this.endTimeInput = this.currentTime; // call child component's methods

      this.$refs.YTPlayerController.toggleController();
      this.$refs.YTPlayerController.pauseVideo();
    },
    //youtubeIdおよび入力された開始・終了時間をセッションストレージに保存
    saveTimeInput: function saveTimeInput(youtubeId, startTimeInput, endTimeInput) {
      var ytInputData = {
        youtubeId: youtubeId,
        startTimeInput: startTimeInput,
        endTimeInput: endTimeInput
      };
      window.sessionStorage.setItem("ytInputData", JSON.stringify(ytInputData));
    },
    clearAllInput: function clearAllInput() {
      this.$store.commit("ytSeekBar/setStartTimeInput", null);
      this.$store.commit("ytSeekBar/setEndTimeInput", null);
      this.$store.commit("tagging/setTags", "");
      this.$store.commit("tagging/setStart", "");
      this.$store.commit("tagging/setEnd", "");
      this.$store.commit("tagging/setPrivacySetting", "public");
    },
    //以前入力された開始・終了時間をセッションストレージからロード
    loadTimeInput: function loadTimeInput(youtubeId) {
      var ytInputData = JSON.parse(window.sessionStorage.getItem("ytInputData"));

      if (ytInputData && ytInputData.youtubeId == youtubeId) {
        this.startTimeInput = ytInputData.startTimeInput;
        this.endTimeInput = ytInputData.endTimeInput;
        this.$store.commit("ytSeekBar/setStartTimeInput", ytInputData.startTimeInput);
        this.$store.commit("ytSeekBar/setEndTimeInput", ytInputData.endTimeInput);
      }
    },
    // タグ入力へ進む
    next: function next() {
      if (this.$refs.form.validate()) {
        this.$store.commit("tagging/setStart", this.startTimeInput);
        this.$store.commit("tagging/setEnd", this.endTimeInput);
        this.saveTimeInput(this.youtubeId, this.startTimeInput, this.endTimeInput);
        clearInterval(this.timer);

        if (this.isAdding) {
          //プレイリストへの追加用の確認ページを表示
          this.$router.push({
            path: "/add/confirm",
            query: {
              playlist: this.playlistIdToAdd,
              v: this.youtubeId
            }
          })["catch"](function (err) {});
        } else if (this.isEditing) {
          //シーン編集用の確認ページを表示
          this.$router.push({
            path: "/edit/confirm",
            query: {
              playlist: this.playlistIdToEdit,
              tag: this.tagIdToEdit,
              v: this.youtubeId
            }
          })["catch"](function (err) {});
        } else {
          //新規の確認ページを表示
          this.$router.push({
            path: "/youtube/confirm",
            query: {
              v: this.youtubeId
            }
          })["catch"](function (err) {});
        }
      }
    },
    unmute: function unmute() {
      this.player.unMute();
      this.setIsMuted(false);
    },
    mute: function mute() {
      this.player.mute();
      this.setIsMuted(true);
    },
    switchToPlayListIndexOf: function switchToPlayListIndexOf(index) {
      //URLを更新
      this.$router.push({
        path: "/youtube/scene",
        query: {
          v: this.youtubeId
        }
      })["catch"](function (err) {}); //次のシーンをロードし再生

      this.$store.dispatch("ytPlayer/playListIndexOf", index);
    }
  }),
  watch: {
    // 検索バーによるルート変更後の初期化処理
    $route: function $route() {
      this.initialize();
    },
    startTimeInput: function startTimeInput() {
      this.$store.commit("ytSeekBar/setStartTimeInput", this.startTimeInput);
    },
    endTimeInput: function endTimeInput() {
      this.$store.commit("ytSeekBar/setEndTimeInput", this.endTimeInput);
    },
    isPlayerReady: function isPlayerReady() {
      if (this.isPlayerReady) {
        this.setYtPlayerCSS();
        this.$refs.ytSeekBar.setYtSeekbarWrapperTop();
      }
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      var youtubeId, listOfYoutubeIdStartEndTime, dataOfYoutubeIdStartEndTime;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this3.initialize(); //必要データを取得するまでTagItemは非表示


              _this3.$store.commit("youtube/setIsReady", false); //URLからyoutubeIdを格納


              youtubeId = _this3.$route.query.v; //必要データを取得

              _this3.$store.commit("youtube/setYoutubeId", youtubeId);

              _context2.next = 6;
              return _this3.$store.dispatch("youtube/getVideo", youtubeId);

            case 6:
              _context2.next = 8;
              return _this3.$store.dispatch("youtube/getTag");

            case 8:
              if (!_this3.isNew) {
                _context2.next = 11;
                break;
              }

              _context2.next = 11;
              return _this3.$store.dispatch("youtube/getNewVideoData");

            case 11:
              //load start & end time
              _this3.loadTimeInput(youtubeId); //YTPlayerのまとめの再生に必要なパラメータをセット


              listOfYoutubeIdStartEndTime = [];
              dataOfYoutubeIdStartEndTime = [];
              dataOfYoutubeIdStartEndTime[0] = [];
              dataOfYoutubeIdStartEndTime[0].youtubeId = youtubeId;
              _this3.startTimeInput ? dataOfYoutubeIdStartEndTime[0].start = "00:" + _this3.startTimeInput : dataOfYoutubeIdStartEndTime[0].start = "";
              dataOfYoutubeIdStartEndTime[0].end = "";
              dataOfYoutubeIdStartEndTime[0].scene_order = 1;

              _this3.putTagVideoIntolistOfYoutubeIdStartEndTime(listOfYoutubeIdStartEndTime, dataOfYoutubeIdStartEndTime);

              _this3.$store.commit("ytPlayer/setListOfYoutubeIdStartEndTime", listOfYoutubeIdStartEndTime);

              _this3.$store.commit("ytPlayer/setListIndex", 0);

              _this3.ytIframeParameterReady = true; //YTSeekBarのクリックイベント用にボディのrefをセット

              _this3.highlightBodyRef = _this3.$refs.highlightBody;

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  beforeDestroy: function beforeDestroy() {
    //headerの戻るアイコンを非表示
    this.$store.commit("highlightHeader/setShowBackIcon", false);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Highlight.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Highlight.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");
/* harmony import */ var _components_YTvideoSelectBox_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/YTvideoSelectBox.vue */ "./resources/assets/js/components/YTvideoSelectBox.vue");
/* harmony import */ var _components_Youtube_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Youtube.vue */ "./resources/assets/js/components/Youtube.vue");
/* harmony import */ var _components_Confirm_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Confirm.vue */ "./resources/assets/js/components/Confirm.vue");
/* harmony import */ var _components_SceneList_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/SceneList.vue */ "./resources/assets/js/components/SceneList.vue");
/* harmony import */ var _components_Title_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Title.vue */ "./resources/assets/js/components/Title.vue");
/* harmony import */ var _components_Complete_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Complete.vue */ "./resources/assets/js/components/Complete.vue");


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








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  metaInfo: function metaInfo() {
    return {
      title: "まとめ作成 - YouClip",
      meta: [{
        name: "description",
        content: "YouTube動画のまとめ作成ツール、YouClipの作成したまとめ作成ページです。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。また、みんなが作った人気のまとめを見ることも可能です。"
      }, {
        property: "og:site_name",
        content: "YouClip"
      }, {
        property: "og:type",
        content: "website"
      }, {
        property: "og:url",
        content: "https://youclip.jp"
      }, {
        property: "og:title",
        content: "まとめ作成 - YouClip"
      }, {
        property: "og:description",
        content: "YouTube動画のまとめ作成ツール、YouClipの作成したまとめ作成ページです。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。また、みんなが作った人気のまとめを見ることも可能です。"
      }, {
        property: "og:image",
        content: "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png"
      }],
      link: [{
        rel: "canonical",
        href: "https://youclip.jp/youtube"
      }]
    };
  },
  components: {
    YTvideoSelectBox: _components_YTvideoSelectBox_vue__WEBPACK_IMPORTED_MODULE_2__.default,
    Youtube: _components_Youtube_vue__WEBPACK_IMPORTED_MODULE_3__.default,
    Confirm: _components_Confirm_vue__WEBPACK_IMPORTED_MODULE_4__.default,
    SceneList: _components_SceneList_vue__WEBPACK_IMPORTED_MODULE_5__.default,
    Title: _components_Title_vue__WEBPACK_IMPORTED_MODULE_6__.default,
    Complete: _components_Complete_vue__WEBPACK_IMPORTED_MODULE_7__.default
  },
  data: function data() {
    return {};
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_1__.default],
  methods: {
    // コンポーネント遷移処理
    switchComponent: function switchComponent() {
      if (this.$route.path == "/youtube/scene") {
        this.$store.commit("highlight/setDisplayComponent", "Youtube");
      } else if (this.$route.path == "/youtube/confirm") {
        this.$store.commit("highlight/setDisplayComponent", "Confirm");
      } else if (this.$route.path == "/highlight/scenelist") {
        this.$store.commit("highlight/setDisplayComponent", "SceneList");
      } else if (this.$route.path == "/highlight/title") {
        this.$store.commit("highlight/setDisplayComponent", "Title");
      } else if (this.$route.path == "/highlight/complete") {
        this.$store.commit("highlight/setDisplayComponent", "Complete");
      } else if (this.$route.path == "/add") {
        this.$store.commit("highlight/setDisplayComponent", "YTvideoSelectBox");
      } else if (this.$route.path == "/add/search") {
        this.$store.commit("highlight/setDisplayComponent", "YTvideoSelectBox");
      } else if (this.$route.path == "/add/scene") {
        this.$store.commit("highlight/setDisplayComponent", "Youtube");
      } else if (this.$route.path == "/add/confirm") {
        this.$store.commit("highlight/setDisplayComponent", "Confirm");
      } else if (this.$route.path == "/edit/scene") {
        this.$store.commit("highlight/setDisplayComponent", "Youtube");
      } else if (this.$route.path == "/edit/confirm") {
        this.$store.commit("highlight/setDisplayComponent", "Confirm");
      } else {
        this.$store.commit("highlight/setDisplayComponent", "YTvideoSelectBox");
      }
    }
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_8__.mapGetters)({
    highlightTransitNext: "highlight/highlightTransitNext",
    displayComponent: "highlight/displayComponent"
  })),
  watch: {
    $route: function $route() {
      this.switchComponent();
    }
  },
  created: function created() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false); //URLを元にコンポーネントを選択

    this.switchComponent();
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var self;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (to.path == "/" || to.path == "/mypage" || to.path == "/login" || to.path == "/editmyplaylist" || to.path == "/tagging") {
                //hide iframe player first because it remains when moving to another page
                $("#player").hide();
              }

              self = _this; //戻るボタンが押された場合は左スライドにセット

              if (from.path == "/youtube/scene" && to.path == "/youtube" || from.path == "/youtube/scene" && to.path == "/" || from.path == "/youtube/confirm" && to.path == "/youtube/scene" || from.path == "/youtube/confirm" && to.path == "/youtube" || from.path == "/highlight/scenelist" && to.path == "/youtube/confirm" || from.path == "/highlight/scenelist" && to.path == "/youtube" || from.path == "/highlight/title" && to.path == "/highlight/scenelist" || from.path == "/highlight/title" && to.path == "/youtube" || from.path == "/highlight/complete" && to.path == "/youtube" || from.path == "/add" && to.path == "/youtube" || from.path == "/add" && to.path == "/mypage" || from.path == "/add" && to.path == "/" || from.path == "/add/scene" && to.path == "/add" || from.path == "/add/scene" && to.path == "/youtube" || from.path == "/add/scene" && to.path == "/mypage" || from.path == "/add/scene" && to.path == "/" || from.path == "/add/confirm" && to.path == "/add/scene" || from.path == "/add/confirm" && to.path == "/youtube" || from.path == "/add/confirm" && to.path == "/mypage" || from.path == "/add/confirm" && to.path == "/" || from.path == "/add/confirm" && to.path == "/editmyplaylist" || from.path == "/edit/scene" && to.path == "/editmyplaylist" || from.path == "/edit/confirm" && to.path == "/edit/scene" || from.path == "/edit/confirm" && to.path == "/editmyplaylist" || from.path == "/edit/confirm" && to.path == "/youtube" || from.path == "/edit/confirm" && to.path == "/mypage" || from.path == "/edit/confirm" && to.path == "/") {
                self.$store.commit("highlight/setHighlightTransitNext", false);
              }

              _context.next = 5;
              return next();

            case 5:
              //遷移後は右スライドに戻す
              self.$store.commit("highlight/setHighlightTransitNext", true);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
});

/***/ }),

/***/ "./resources/assets/js/components/Complete.vue":
/*!*****************************************************!*\
  !*** ./resources/assets/js/components/Complete.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Complete_vue_vue_type_template_id_5dd73420___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Complete.vue?vue&type=template&id=5dd73420& */ "./resources/assets/js/components/Complete.vue?vue&type=template&id=5dd73420&");
/* harmony import */ var _Complete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Complete.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/Complete.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Complete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Complete_vue_vue_type_template_id_5dd73420___WEBPACK_IMPORTED_MODULE_0__.render,
  _Complete_vue_vue_type_template_id_5dd73420___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/Complete.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/Confirm.vue":
/*!****************************************************!*\
  !*** ./resources/assets/js/components/Confirm.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Confirm_vue_vue_type_template_id_55cda2d9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Confirm.vue?vue&type=template&id=55cda2d9& */ "./resources/assets/js/components/Confirm.vue?vue&type=template&id=55cda2d9&");
/* harmony import */ var _Confirm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Confirm.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/Confirm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Confirm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Confirm_vue_vue_type_template_id_55cda2d9___WEBPACK_IMPORTED_MODULE_0__.render,
  _Confirm_vue_vue_type_template_id_55cda2d9___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/Confirm.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/ConfirmationModal.vue":
/*!**************************************************************!*\
  !*** ./resources/assets/js/components/ConfirmationModal.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ConfirmationModal_vue_vue_type_template_id_a0e16b5e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfirmationModal.vue?vue&type=template&id=a0e16b5e& */ "./resources/assets/js/components/ConfirmationModal.vue?vue&type=template&id=a0e16b5e&");
/* harmony import */ var _ConfirmationModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfirmationModal.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/ConfirmationModal.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _ConfirmationModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _ConfirmationModal_vue_vue_type_template_id_a0e16b5e___WEBPACK_IMPORTED_MODULE_0__.render,
  _ConfirmationModal_vue_vue_type_template_id_a0e16b5e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/ConfirmationModal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/HighlightHeader.vue":
/*!************************************************************!*\
  !*** ./resources/assets/js/components/HighlightHeader.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HighlightHeader_vue_vue_type_template_id_0eadf6fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HighlightHeader.vue?vue&type=template&id=0eadf6fa& */ "./resources/assets/js/components/HighlightHeader.vue?vue&type=template&id=0eadf6fa&");
/* harmony import */ var _HighlightHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HighlightHeader.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/HighlightHeader.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _HighlightHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _HighlightHeader_vue_vue_type_template_id_0eadf6fa___WEBPACK_IMPORTED_MODULE_0__.render,
  _HighlightHeader_vue_vue_type_template_id_0eadf6fa___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/HighlightHeader.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/SceneList.vue":
/*!******************************************************!*\
  !*** ./resources/assets/js/components/SceneList.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SceneList_vue_vue_type_template_id_1f0dbbba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SceneList.vue?vue&type=template&id=1f0dbbba& */ "./resources/assets/js/components/SceneList.vue?vue&type=template&id=1f0dbbba&");
/* harmony import */ var _SceneList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SceneList.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/SceneList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _SceneList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _SceneList_vue_vue_type_template_id_1f0dbbba___WEBPACK_IMPORTED_MODULE_0__.render,
  _SceneList_vue_vue_type_template_id_1f0dbbba___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/SceneList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/Title.vue":
/*!**************************************************!*\
  !*** ./resources/assets/js/components/Title.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Title_vue_vue_type_template_id_6fd0829e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Title.vue?vue&type=template&id=6fd0829e& */ "./resources/assets/js/components/Title.vue?vue&type=template&id=6fd0829e&");
/* harmony import */ var _Title_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Title.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/Title.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Title_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Title_vue_vue_type_template_id_6fd0829e___WEBPACK_IMPORTED_MODULE_0__.render,
  _Title_vue_vue_type_template_id_6fd0829e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/Title.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/YTLoadingItem.vue":
/*!**********************************************************!*\
  !*** ./resources/assets/js/components/YTLoadingItem.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _YTLoadingItem_vue_vue_type_template_id_5276a466___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YTLoadingItem.vue?vue&type=template&id=5276a466& */ "./resources/assets/js/components/YTLoadingItem.vue?vue&type=template&id=5276a466&");
/* harmony import */ var _YTLoadingItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YTLoadingItem.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/YTLoadingItem.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _YTLoadingItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _YTLoadingItem_vue_vue_type_template_id_5276a466___WEBPACK_IMPORTED_MODULE_0__.render,
  _YTLoadingItem_vue_vue_type_template_id_5276a466___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/YTLoadingItem.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/YTSearchBox.vue":
/*!********************************************************!*\
  !*** ./resources/assets/js/components/YTSearchBox.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _YTSearchBox_vue_vue_type_template_id_b734ac3e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YTSearchBox.vue?vue&type=template&id=b734ac3e& */ "./resources/assets/js/components/YTSearchBox.vue?vue&type=template&id=b734ac3e&");
/* harmony import */ var _YTSearchBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YTSearchBox.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/YTSearchBox.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _YTSearchBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _YTSearchBox_vue_vue_type_template_id_b734ac3e___WEBPACK_IMPORTED_MODULE_0__.render,
  _YTSearchBox_vue_vue_type_template_id_b734ac3e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/YTSearchBox.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/YTitem.vue":
/*!***************************************************!*\
  !*** ./resources/assets/js/components/YTitem.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _YTitem_vue_vue_type_template_id_0a8e3285___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YTitem.vue?vue&type=template&id=0a8e3285& */ "./resources/assets/js/components/YTitem.vue?vue&type=template&id=0a8e3285&");
/* harmony import */ var _YTitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YTitem.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/YTitem.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _YTitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _YTitem_vue_vue_type_template_id_0a8e3285___WEBPACK_IMPORTED_MODULE_0__.render,
  _YTitem_vue_vue_type_template_id_0a8e3285___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/YTitem.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/YTvideoSelectBox.vue":
/*!*************************************************************!*\
  !*** ./resources/assets/js/components/YTvideoSelectBox.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _YTvideoSelectBox_vue_vue_type_template_id_0ff3fb66___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YTvideoSelectBox.vue?vue&type=template&id=0ff3fb66& */ "./resources/assets/js/components/YTvideoSelectBox.vue?vue&type=template&id=0ff3fb66&");
/* harmony import */ var _YTvideoSelectBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YTvideoSelectBox.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/YTvideoSelectBox.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _YTvideoSelectBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _YTvideoSelectBox_vue_vue_type_template_id_0ff3fb66___WEBPACK_IMPORTED_MODULE_0__.render,
  _YTvideoSelectBox_vue_vue_type_template_id_0ff3fb66___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/YTvideoSelectBox.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/Youtube.vue":
/*!****************************************************!*\
  !*** ./resources/assets/js/components/Youtube.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Youtube_vue_vue_type_template_id_3cb0fdbc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Youtube.vue?vue&type=template&id=3cb0fdbc& */ "./resources/assets/js/components/Youtube.vue?vue&type=template&id=3cb0fdbc&");
/* harmony import */ var _Youtube_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Youtube.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/Youtube.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Youtube_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Youtube_vue_vue_type_template_id_3cb0fdbc___WEBPACK_IMPORTED_MODULE_0__.render,
  _Youtube_vue_vue_type_template_id_3cb0fdbc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/Youtube.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/pages/Highlight.vue":
/*!*************************************************!*\
  !*** ./resources/assets/js/pages/Highlight.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Highlight_vue_vue_type_template_id_ebc8d572___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Highlight.vue?vue&type=template&id=ebc8d572& */ "./resources/assets/js/pages/Highlight.vue?vue&type=template&id=ebc8d572&");
/* harmony import */ var _Highlight_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Highlight.vue?vue&type=script&lang=js& */ "./resources/assets/js/pages/Highlight.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Highlight_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Highlight_vue_vue_type_template_id_ebc8d572___WEBPACK_IMPORTED_MODULE_0__.render,
  _Highlight_vue_vue_type_template_id_ebc8d572___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/pages/Highlight.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/Complete.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/assets/js/components/Complete.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Complete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Complete.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Complete.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Complete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/Confirm.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/assets/js/components/Confirm.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Confirm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Confirm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Confirm.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Confirm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/ConfirmationModal.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/assets/js/components/ConfirmationModal.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfirmationModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ConfirmationModal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/ConfirmationModal.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfirmationModal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/HighlightHeader.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/assets/js/components/HighlightHeader.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HighlightHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HighlightHeader.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/HighlightHeader.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HighlightHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/SceneList.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/assets/js/components/SceneList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SceneList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SceneList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/SceneList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SceneList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/Title.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/assets/js/components/Title.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Title_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Title.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Title.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Title_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/YTLoadingItem.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/assets/js/components/YTLoadingItem.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YTLoadingItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./YTLoadingItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTLoadingItem.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YTLoadingItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/YTSearchBox.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/assets/js/components/YTSearchBox.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YTSearchBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./YTSearchBox.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTSearchBox.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YTSearchBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/YTitem.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/assets/js/components/YTitem.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YTitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./YTitem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTitem.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YTitem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/YTvideoSelectBox.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/YTvideoSelectBox.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YTvideoSelectBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./YTvideoSelectBox.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTvideoSelectBox.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YTvideoSelectBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/Youtube.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/assets/js/components/Youtube.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Youtube.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Youtube.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/pages/Highlight.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/assets/js/pages/Highlight.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Highlight_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Highlight.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Highlight.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Highlight_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/Complete.vue?vue&type=template&id=5dd73420&":
/*!************************************************************************************!*\
  !*** ./resources/assets/js/components/Complete.vue?vue&type=template&id=5dd73420& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Complete_vue_vue_type_template_id_5dd73420___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Complete_vue_vue_type_template_id_5dd73420___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Complete_vue_vue_type_template_id_5dd73420___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Complete.vue?vue&type=template&id=5dd73420& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Complete.vue?vue&type=template&id=5dd73420&");


/***/ }),

/***/ "./resources/assets/js/components/Confirm.vue?vue&type=template&id=55cda2d9&":
/*!***********************************************************************************!*\
  !*** ./resources/assets/js/components/Confirm.vue?vue&type=template&id=55cda2d9& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Confirm_vue_vue_type_template_id_55cda2d9___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Confirm_vue_vue_type_template_id_55cda2d9___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Confirm_vue_vue_type_template_id_55cda2d9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Confirm.vue?vue&type=template&id=55cda2d9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Confirm.vue?vue&type=template&id=55cda2d9&");


/***/ }),

/***/ "./resources/assets/js/components/ConfirmationModal.vue?vue&type=template&id=a0e16b5e&":
/*!*********************************************************************************************!*\
  !*** ./resources/assets/js/components/ConfirmationModal.vue?vue&type=template&id=a0e16b5e& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfirmationModal_vue_vue_type_template_id_a0e16b5e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfirmationModal_vue_vue_type_template_id_a0e16b5e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ConfirmationModal_vue_vue_type_template_id_a0e16b5e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ConfirmationModal.vue?vue&type=template&id=a0e16b5e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/ConfirmationModal.vue?vue&type=template&id=a0e16b5e&");


/***/ }),

/***/ "./resources/assets/js/components/HighlightHeader.vue?vue&type=template&id=0eadf6fa&":
/*!*******************************************************************************************!*\
  !*** ./resources/assets/js/components/HighlightHeader.vue?vue&type=template&id=0eadf6fa& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HighlightHeader_vue_vue_type_template_id_0eadf6fa___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HighlightHeader_vue_vue_type_template_id_0eadf6fa___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HighlightHeader_vue_vue_type_template_id_0eadf6fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HighlightHeader.vue?vue&type=template&id=0eadf6fa& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/HighlightHeader.vue?vue&type=template&id=0eadf6fa&");


/***/ }),

/***/ "./resources/assets/js/components/SceneList.vue?vue&type=template&id=1f0dbbba&":
/*!*************************************************************************************!*\
  !*** ./resources/assets/js/components/SceneList.vue?vue&type=template&id=1f0dbbba& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SceneList_vue_vue_type_template_id_1f0dbbba___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SceneList_vue_vue_type_template_id_1f0dbbba___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SceneList_vue_vue_type_template_id_1f0dbbba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SceneList.vue?vue&type=template&id=1f0dbbba& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/SceneList.vue?vue&type=template&id=1f0dbbba&");


/***/ }),

/***/ "./resources/assets/js/components/Title.vue?vue&type=template&id=6fd0829e&":
/*!*********************************************************************************!*\
  !*** ./resources/assets/js/components/Title.vue?vue&type=template&id=6fd0829e& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Title_vue_vue_type_template_id_6fd0829e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Title_vue_vue_type_template_id_6fd0829e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Title_vue_vue_type_template_id_6fd0829e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Title.vue?vue&type=template&id=6fd0829e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Title.vue?vue&type=template&id=6fd0829e&");


/***/ }),

/***/ "./resources/assets/js/components/YTLoadingItem.vue?vue&type=template&id=5276a466&":
/*!*****************************************************************************************!*\
  !*** ./resources/assets/js/components/YTLoadingItem.vue?vue&type=template&id=5276a466& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YTLoadingItem_vue_vue_type_template_id_5276a466___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YTLoadingItem_vue_vue_type_template_id_5276a466___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YTLoadingItem_vue_vue_type_template_id_5276a466___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./YTLoadingItem.vue?vue&type=template&id=5276a466& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTLoadingItem.vue?vue&type=template&id=5276a466&");


/***/ }),

/***/ "./resources/assets/js/components/YTSearchBox.vue?vue&type=template&id=b734ac3e&":
/*!***************************************************************************************!*\
  !*** ./resources/assets/js/components/YTSearchBox.vue?vue&type=template&id=b734ac3e& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YTSearchBox_vue_vue_type_template_id_b734ac3e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YTSearchBox_vue_vue_type_template_id_b734ac3e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YTSearchBox_vue_vue_type_template_id_b734ac3e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./YTSearchBox.vue?vue&type=template&id=b734ac3e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTSearchBox.vue?vue&type=template&id=b734ac3e&");


/***/ }),

/***/ "./resources/assets/js/components/YTitem.vue?vue&type=template&id=0a8e3285&":
/*!**********************************************************************************!*\
  !*** ./resources/assets/js/components/YTitem.vue?vue&type=template&id=0a8e3285& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YTitem_vue_vue_type_template_id_0a8e3285___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YTitem_vue_vue_type_template_id_0a8e3285___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YTitem_vue_vue_type_template_id_0a8e3285___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./YTitem.vue?vue&type=template&id=0a8e3285& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTitem.vue?vue&type=template&id=0a8e3285&");


/***/ }),

/***/ "./resources/assets/js/components/YTvideoSelectBox.vue?vue&type=template&id=0ff3fb66&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/YTvideoSelectBox.vue?vue&type=template&id=0ff3fb66& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YTvideoSelectBox_vue_vue_type_template_id_0ff3fb66___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YTvideoSelectBox_vue_vue_type_template_id_0ff3fb66___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YTvideoSelectBox_vue_vue_type_template_id_0ff3fb66___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./YTvideoSelectBox.vue?vue&type=template&id=0ff3fb66& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTvideoSelectBox.vue?vue&type=template&id=0ff3fb66&");


/***/ }),

/***/ "./resources/assets/js/components/Youtube.vue?vue&type=template&id=3cb0fdbc&":
/*!***********************************************************************************!*\
  !*** ./resources/assets/js/components/Youtube.vue?vue&type=template&id=3cb0fdbc& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_template_id_3cb0fdbc___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_template_id_3cb0fdbc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Youtube_vue_vue_type_template_id_3cb0fdbc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Youtube.vue?vue&type=template&id=3cb0fdbc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Youtube.vue?vue&type=template&id=3cb0fdbc&");


/***/ }),

/***/ "./resources/assets/js/pages/Highlight.vue?vue&type=template&id=ebc8d572&":
/*!********************************************************************************!*\
  !*** ./resources/assets/js/pages/Highlight.vue?vue&type=template&id=ebc8d572& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Highlight_vue_vue_type_template_id_ebc8d572___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Highlight_vue_vue_type_template_id_ebc8d572___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Highlight_vue_vue_type_template_id_ebc8d572___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Highlight.vue?vue&type=template&id=ebc8d572& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Highlight.vue?vue&type=template&id=ebc8d572&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Complete.vue?vue&type=template&id=5dd73420&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Complete.vue?vue&type=template&id=5dd73420& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "container--small" },
    [
      _c(
        "v-sheet",
        {
          staticClass: "ma-0 pa-0",
          attrs: { height: "70", elevation: "0", align: "center" }
        },
        [
          _c(
            "v-container",
            {
              staticClass: "ma-0 pa-2",
              attrs: { fluid: "", "fill-height": "" }
            },
            [
              _c(
                "v-row",
                {
                  staticClass: "ma-0 pa-0",
                  attrs: { align: "center", justify: "center" }
                },
                [
                  _c(
                    "v-col",
                    {
                      staticClass: "ma-0 pa-0 text-center",
                      attrs: { cols: "auto" }
                    },
                    [
                      _c("span", [
                        _vm._v(
                          "「" +
                            _vm._s(_vm.newPlaylistName) +
                            "」を保存しました！"
                        )
                      ])
                    ]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                {
                  staticClass: "ma-0 pa-0",
                  attrs: { align: "center", justify: "center" }
                },
                [
                  _c(
                    "v-col",
                    {
                      staticClass: "ma-0 pa-0 text-center",
                      attrs: { cols: "auto" }
                    },
                    [
                      _c("span", [
                        _vm._v("(マイページからいつでも確認・編集できます)")
                      ])
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
      ),
      _vm._v(" "),
      _c(
        "v-sheet",
        {
          staticClass: "mx-auto",
          attrs: { "max-width": "420", elevation: "0" }
        },
        [
          _c(
            "router-link",
            {
              staticClass: "no-text-decoration",
              attrs: {
                to: {
                  path: "/watch",
                  query: { playlist: _vm.myPlaylistToSave, index: 0 }
                }
              }
            },
            [
              _c(
                "v-img",
                {
                  staticClass: "align-end rounded",
                  attrs: {
                    "max-height": "266.66px",
                    src: _vm.thumbStoragePath + _vm.newPreview,
                    alt: _vm.newPlaylistName,
                    "aspect-ratio": "1.7777"
                  }
                },
                [
                  _c(
                    "v-container",
                    {
                      staticClass: "ma-0 pa-2",
                      staticStyle: { position: "absolute", top: "0px" },
                      attrs: { fluid: "", "fill-height": "" }
                    },
                    [
                      _c(
                        "v-row",
                        {
                          staticClass: "ma-0 pa-0",
                          attrs: { align: "center", justify: "center" }
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
                                "v-icon",
                                {
                                  staticClass: "pa-0 ma-0",
                                  attrs: { color: "white", size: "70" }
                                },
                                [_vm._v("play_circle_outline")]
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
      ),
      _vm._v(" "),
      _c(
        "v-sheet",
        { staticClass: "mx-auto" },
        [
          _c(
            "v-container",
            { staticClass: "ma-0 mt-4 pa-0", attrs: { fluid: "" } },
            [
              _c(
                "v-row",
                { staticClass: "ma-0 pa-2" },
                [
                  _c("v-col", { staticClass: "ma-0 pa-0 text-left" }, [
                    _vm._v(
                      "「" + _vm._s(_vm.newPlaylistName) + "」の共有リンク:"
                    )
                  ])
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
                                  alt: "Twitter logo",
                                  src: "/storage/logos/twitter_square.png"
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
                                  alt: "Facebook logo",
                                  src: "/storage/logos/facebook_square.png"
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
                                  alt: "LINE log",
                                  src: "/storage/logos/line_square.png"
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Confirm.vue?vue&type=template&id=55cda2d9&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Confirm.vue?vue&type=template&id=55cda2d9& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "container--small" },
    [
      _c("HighlightHeader"),
      _vm._v(" "),
      _c(
        "div",
        { ref: "highlightBody", staticClass: "highlight-body" },
        [
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
                attrs: { bodyRef: _vm.highlightBodyRef }
              })
            ],
            1
          ),
          _vm._v(" "),
          _vm.isPlayerReady && _vm.isVideoDataReady
            ? _c(
                "v-sheet",
                { staticClass: "highlightControllerBody" },
                [
                  _c(
                    "v-container",
                    { staticClass: "ma-0 pa-0", attrs: { fluid: "" } },
                    [
                      _c(
                        "v-row",
                        {
                          staticClass: "ma-0 pa-0 text-left",
                          attrs: { align: "center" }
                        },
                        [
                          _c(
                            "v-col",
                            [
                              _c("v-img", {
                                staticClass: "float-left mr-2",
                                attrs: {
                                  src: "/storage/icons/yt_social_red.png",
                                  width: "28px",
                                  "max-height": "28px",
                                  alt: "YouTube logo"
                                }
                              }),
                              _vm._v(" "),
                              _vm.isNew
                                ? _c("span", [
                                    _vm._v(_vm._s(_vm.newVideoData.title))
                                  ])
                                : _c("span", [
                                    _vm._v(_vm._s(_vm.videoData.title))
                                  ])
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        { staticClass: "ma-0 pt-4" },
                        [
                          _c(
                            "v-col",
                            { staticClass: "text-center now-playing" },
                            [
                              _c("img", {
                                attrs: {
                                  src: "/storage/icons/now_playing.svg",
                                  alt: "now playing",
                                  loading: "lazy"
                                }
                              }),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(
                                  _vm._s(_vm.start) +
                                    "-" +
                                    _vm._s(_vm.end) +
                                    "の場面を再生中"
                                )
                              ])
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        {
                          staticClass: "ma-0 pa-0",
                          attrs: { align: "center" }
                        },
                        [
                          _c(
                            "v-col",
                            [
                              _c(
                                "v-form",
                                { ref: "form", staticClass: "ma-0 pa-0" },
                                [
                                  _c("v-combobox", {
                                    staticClass: "sceneTagInputBox",
                                    attrs: {
                                      items: _vm.tagItems,
                                      required: "",
                                      "validate-on-blur": "",
                                      chips: "",
                                      clearable: "",
                                      label:
                                        "(任意) タグを入力　例: 「◯◯の場面」",
                                      multiple: "",
                                      flat: "",
                                      dense: "",
                                      "small-chips": ""
                                    },
                                    scopedSlots: _vm._u(
                                      [
                                        {
                                          key: "selection",
                                          fn: function(ref) {
                                            var attrs = ref.attrs
                                            var item = ref.item
                                            var selected = ref.selected
                                            return [
                                              _c(
                                                "v-chip",
                                                _vm._b(
                                                  {
                                                    directives: [
                                                      {
                                                        name: "show",
                                                        rawName: "v-show",
                                                        value: item,
                                                        expression: "item"
                                                      }
                                                    ],
                                                    staticClass:
                                                      "my-tag-chip pr-2",
                                                    staticStyle: {
                                                      "font-weight": "normal",
                                                      "border-color": "#bdbdbd"
                                                    },
                                                    attrs: {
                                                      "input-value": selected,
                                                      "text-color": "black",
                                                      outlined: "",
                                                      small: ""
                                                    }
                                                  },
                                                  "v-chip",
                                                  attrs,
                                                  false
                                                ),
                                                [
                                                  _vm._v(
                                                    "\n                    " +
                                                      _vm._s(item) +
                                                      "\n                  "
                                                  )
                                                ]
                                              )
                                            ]
                                          }
                                        }
                                      ],
                                      null,
                                      false,
                                      1496320236
                                    ),
                                    model: {
                                      value: _vm.tags,
                                      callback: function($$v) {
                                        _vm.tags = $$v
                                      },
                                      expression: "tags"
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
              _vm._v("\n      " + _vm._s(_vm.text) + "\n      "),
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
          ),
          _vm._v(" "),
          _vm.player != null
            ? _c(
                "v-sheet",
                {
                  staticClass: "ma-0 pa-0",
                  class: _vm.isIOS ? "iosBottomPosition" : "bottomPosition",
                  attrs: { tile: "", width: "100%" }
                },
                [
                  _c(
                    "v-container",
                    { staticClass: "ma-0 pa-0", attrs: { fluid: "" } },
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
                            { staticClass: "text-right ma-0 pa-2" },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    color: "red lighten-2 white--text",
                                    disabled: _vm.isDisabled
                                  },
                                  on: { click: _vm.confirm }
                                },
                                [_vm._v("OK")]
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
      ),
      _vm._v(" "),
      _vm.showLoginModal ? _c("NoLoginModal") : _vm._e(),
      _vm._v(" "),
      _vm.showConfirmationModal ? _c("ConfirmationModal") : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/ConfirmationModal.vue?vue&type=template&id=a0e16b5e&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/ConfirmationModal.vue?vue&type=template&id=a0e16b5e& ***!
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
      attrs: { "max-width": "360", persistent: "" },
      model: {
        value: _vm.showConfirmationModal,
        callback: function($$v) {
          _vm.showConfirmationModal = $$v
        },
        expression: "showConfirmationModal"
      }
    },
    [
      _c(
        "v-card",
        [
          _c(
            "v-container",
            { staticClass: "ma-0 pa-0", attrs: { fluid: "" } },
            [
              _c(
                "v-row",
                { staticClass: "ma-0 pa-0" },
                [
                  _c("v-col", { staticClass: "mx-6 mt-6 pa-0 text-center" }, [
                    _vm._v(
                      _vm._s(_vm.start) +
                        "-" +
                        _vm._s(_vm.end) +
                        "の場面を切り抜きました！\n        "
                    )
                  ])
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
                    { staticClass: "mx-6 px-0 pb-0" },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "white--text",
                          staticStyle: { "font-size": "16px" },
                          attrs: { width: "100%", color: "red lighten-2" },
                          on: { click: _vm.moveToYThighlightPage }
                        },
                        [_vm._v("続けて他の場面を切り抜く")]
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
                {
                  staticClass: "mx-6 pa-0",
                  staticStyle: { height: "40px" },
                  attrs: { align: "center", justify: "center" }
                },
                [
                  _c("v-col", { staticClass: "ma-0 pa-0" }, [
                    _c("div", {
                      staticStyle: {
                        height: "1px",
                        "background-color": "rgba(var(--b38,219,219,219),1)"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    {
                      staticClass: "ma-0 pa-0 text-center",
                      attrs: { cols: "3" }
                    },
                    [_c("span", [_vm._v("または")])]
                  ),
                  _vm._v(" "),
                  _c("v-col", { staticClass: "ma-0 pa-0" }, [
                    _c("div", {
                      staticStyle: {
                        height: "1px",
                        "background-color": "rgba(var(--b38,219,219,219),1)"
                      }
                    })
                  ])
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
                    { staticClass: "mx-6 mb-6 pa-0" },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "white--text",
                          staticStyle: { "font-size": "16px" },
                          attrs: {
                            width: "100%",
                            outlined: "",
                            color: "red lighten-2"
                          },
                          on: { click: _vm.openSceneListPage }
                        },
                        [_vm._v("切り抜いた場面一覧へ")]
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/HighlightHeader.vue?vue&type=template&id=0eadf6fa&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/HighlightHeader.vue?vue&type=template&id=0eadf6fa& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
    "v-sheet",
    {
      staticClass: "ma-0 pa-0 highlight-header",
      attrs: { height: "48", elevation: "0", align: "center" }
    },
    [
      _c(
        "v-container",
        { staticClass: "ma-0 pa-0", attrs: { fluid: "", "fill-height": "" } },
        [
          _c(
            "v-row",
            {
              staticClass: "ma-0 pa-0",
              attrs: { align: "center", justify: "center" }
            },
            [
              _vm.showBackIcon
                ? _c(
                    "v-col",
                    { staticClass: "text-left ma-0 pa-0" },
                    [
                      _c(
                        "v-icon",
                        {
                          attrs: { color: "my-grey" },
                          on: { click: _vm.back }
                        },
                        [_vm._v("mdi-chevron-left")]
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "v-col",
                {
                  staticClass: "ma-0 pa-0 text-center",
                  attrs: { cols: "auto" }
                },
                [
                  _c(
                    "h1",
                    {
                      staticStyle: {
                        "font-size": "1rem",
                        "font-weight": "normal"
                      }
                    },
                    [
                      _vm._v(
                        "\n          " +
                          _vm._s(_vm.headerMessage) +
                          "\n        "
                      )
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _vm.showBackIcon
                ? _c("v-col", { staticClass: "ma-0 pa-0" })
                : _vm._e()
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-progress-linear", {
        attrs: {
          active: _vm.loading,
          indeterminate: "",
          absolute: "",
          bottom: "",
          color: "primary accent-4"
        }
      }),
      _vm._v(" "),
      _c("v-divider")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/SceneList.vue?vue&type=template&id=1f0dbbba&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/SceneList.vue?vue&type=template&id=1f0dbbba& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "container--small" },
    [
      _c("HighlightHeader"),
      _vm._v(" "),
      _c(
        "div",
        {
          ref: "highlightBody",
          staticClass: "highlight-body",
          staticStyle: { height: "auto" }
        },
        [
          _c(
            "div",
            {
              class: _vm.isIOS ? "iosHighlightBodyUpper" : "highlightBodyUpper"
            },
            [
              _c(
                "v-card",
                { staticClass: "pa-2 pb-0 ma-0", attrs: { elevation: "0" } },
                [
                  _c("div", [_vm._v("切り抜いた場面一覧")]),
                  _vm._v(" "),
                  _c("div", [_vm._v("(以下がまとめとして連続再生されます)")])
                ]
              ),
              _vm._v(" "),
              _c("SceneTagItem", {
                key: _vm.resetKey,
                attrs: {
                  showAddNewSceneComponent: _vm.showAddNewSceneComponent
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-sheet",
            { staticClass: "ma-0 pa-0 ", attrs: { tile: "", width: "100%" } },
            [
              _c(
                "v-container",
                { staticClass: "ma-0 pa-2 pt-6" },
                [
                  _c(
                    "v-row",
                    { staticClass: "ma-0 pa-0 justify-center" },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "white--text",
                          staticStyle: { "font-size": "14px" },
                          attrs: {
                            width: "100%",
                            height: "45px",
                            color: "red lighten-2",
                            to: {
                              path: "/youtube",
                              query: { return: true }
                            }
                          }
                        },
                        [_vm._v("続けて他の動画の場面を追加")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-row",
                    {
                      staticClass: "ma-0 pa-0 justify-center",
                      staticStyle: { height: "40px" },
                      attrs: { align: "center" }
                    },
                    [
                      _c("v-col", { staticClass: "ma-0 pa-0" }, [
                        _c("div", {
                          staticStyle: {
                            height: "1px",
                            "background-color": "rgba(var(--b38,219,219,219),1)"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        {
                          staticClass: "ma-0 pa-0 text-center",
                          attrs: { cols: "4" }
                        },
                        [_c("span", [_vm._v("または")])]
                      ),
                      _vm._v(" "),
                      _c("v-col", { staticClass: "ma-0 pa-0" }, [
                        _c("div", {
                          staticStyle: {
                            height: "1px",
                            "background-color": "rgba(var(--b38,219,219,219),1)"
                          }
                        })
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-row",
                    { staticClass: "ma-0 pa-0 justify-center" },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "white--text",
                          staticStyle: { "font-size": "14px" },
                          attrs: {
                            width: "100%",
                            height: "45px",
                            outlined: "",
                            color: "red lighten-2",
                            to: "/highlight/title"
                          }
                        },
                        [_vm._v("まとめのタイトル入力へ")]
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Title.vue?vue&type=template&id=6fd0829e&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Title.vue?vue&type=template&id=6fd0829e& ***!
  \************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "container--small" },
    [
      _c("HighlightHeader"),
      _vm._v(" "),
      _c(
        "div",
        {
          ref: "highlightBody",
          staticClass: "highlight-body",
          staticStyle: { height: "auto" }
        },
        [
          _c(
            "v-card",
            { staticClass: "pa-2 ma-0 mt-2", attrs: { elevation: "0" } },
            [
              _c(
                "v-container",
                { staticClass: "ma-0 pa-0", attrs: { fluid: "" } },
                [
                  _c(
                    "v-row",
                    { staticClass: "ma-0 mb-8 pa-2 pb-4" },
                    [
                      _c(
                        "v-col",
                        { staticClass: "ma-0 pa-0" },
                        [
                          _c("v-text-field", {
                            ref: "playlistName",
                            staticClass: "playlistNameInputBox",
                            attrs: {
                              rules: [_vm.rules.required],
                              type: "text",
                              name: "playlistName",
                              label: "まとめのタイトルを入力",
                              "hide-details": ""
                            },
                            model: {
                              value: _vm.playlistName,
                              callback: function($$v) {
                                _vm.playlistName = $$v
                              },
                              expression: "playlistName"
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
                    { staticClass: "ma-0 mb-8 pa-2 pb-4" },
                    [
                      _c(
                        "v-col",
                        { staticClass: "ma-0 pa-0 text-center" },
                        [
                          _c("v-select", {
                            staticClass: "scenePrivacySettingBox",
                            attrs: {
                              items: _vm.privacySettingList,
                              label: "プライバシー設定",
                              "prepend-icon": "mdi-earth",
                              "hide-details": "",
                              dense: ""
                            },
                            model: {
                              value: _vm.privacySetting,
                              callback: function($$v) {
                                _vm.privacySetting = $$v
                              },
                              expression: "privacySetting"
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
                    { staticClass: "ma-0 mb-8 pa-2 pb-4" },
                    [
                      _c(
                        "v-col",
                        { staticClass: "ma-0 pa-0 text-center" },
                        [
                          _c(
                            "v-card",
                            {
                              staticClass: "text-left pa-0 ma-0 mb-2 my-grey",
                              attrs: { elevation: "0" }
                            },
                            [_vm._v("(任意)ハイライトの説明")]
                          ),
                          _vm._v(" "),
                          _c("v-textarea", {
                            attrs: { outlined: "" },
                            model: {
                              value: _vm.description,
                              callback: function($$v) {
                                _vm.description = $$v
                              },
                              expression: "description"
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
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-sheet",
            {
              staticClass: "ma-0 pa-0 iosBottomPosition",
              attrs: { tile: "", width: "100%" }
            },
            [
              _c(
                "v-container",
                { staticClass: "ma-0 pa-0", attrs: { fluid: "" } },
                [
                  _c(
                    "v-row",
                    { staticClass: "ma-0 pa-2 justify-center" },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "white--text ma-0 pa-0",
                          staticStyle: { "font-size": "14px" },
                          attrs: {
                            width: "100%",
                            height: "45px",
                            color: "red lighten-2"
                          },
                          on: { click: _vm.updateAndMoveToCompletePage }
                        },
                        [_vm._v("保存する(あとからでも編集できます)")]
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTLoadingItem.vue?vue&type=template&id=5276a466&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTLoadingItem.vue?vue&type=template&id=5276a466& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
    _vm._l(_vm.numberOfYTItemsPerPagination, function(item, index) {
      return _c(
        "v-card",
        {
          key: index,
          staticClass: "mx-auto",
          attrs: { "max-width": "420", elevation: "0" }
        },
        [
          _c(
            "v-container",
            { staticClass: "px-3 my-3" },
            [
              _c(
                "v-row",
                {
                  staticClass: "pa-0 ma-0",
                  attrs: { justify: "center", "align-content": "center" },
                  on: {
                    click: function($event) {
                      return _vm.select(item)
                    }
                  }
                },
                [
                  _c(
                    "v-col",
                    { staticClass: "pa-0 ma-0", attrs: { cols: "6" } },
                    [
                      _c("v-skeleton-loader", {
                        attrs: {
                          width: "auto",
                          "min-height": "98.86",
                          "max-height": "105.91",
                          type: "image"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { staticClass: "pa-0 ma-0", attrs: { cols: "6" } },
                    [
                      _c("v-skeleton-loader", {
                        staticClass: "pa-0 ma-0",
                        attrs: { width: "auto", type: "list-item-three-line" }
                      })
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
    }),
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTSearchBox.vue?vue&type=template&id=b734ac3e&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTSearchBox.vue?vue&type=template&id=b734ac3e& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
    "v-sheet",
    { staticClass: "search-box", attrs: { elevation: "0" } },
    [
      _c(
        "v-container",
        { staticClass: "ma-0 pa-0 text-center" },
        [
          _c(
            "v-row",
            {
              staticClass: "ma-0 pa-0 activeSearch",
              attrs: { align: "center" }
            },
            [
              _c(
                "v-col",
                { staticClass: "ma-0 pa-0 text-center", attrs: { cols: "1" } },
                [
                  _c("v-icon", { on: { click: _vm.YTsearch } }, [
                    _vm._v("search")
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                {
                  staticClass: "ma-0 pa-0 my-autocomplete",
                  attrs: { align: "center" }
                },
                [
                  _c("v-combobox", {
                    ref: "YTsearchInputBox",
                    staticClass: "ma-0 pa-0",
                    attrs: {
                      items: _vm.items,
                      "search-input": _vm.searchquery,
                      placeholder: "YouTubeのキーワードまたはURLを入力",
                      "item-text": "value",
                      "item-value": "value",
                      "cache-items": "",
                      "hide-no-data": "",
                      clearable: "",
                      dense: ""
                    },
                    on: {
                      "update:searchInput": function($event) {
                        _vm.searchquery = $event
                      },
                      "update:search-input": function($event) {
                        _vm.searchquery = $event
                      },
                      keydown: function($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k(
                            $event.keyCode,
                            "enter",
                            13,
                            $event.key,
                            "Enter"
                          )
                        ) {
                          return null
                        }
                        return _vm.YTsearch($event)
                      }
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "item",
                        fn: function(data) {
                          return [
                            typeof data.item !== "object"
                              ? [
                                  _c("v-list-item-content", {
                                    domProps: { textContent: _vm._s(data.item) }
                                  })
                                ]
                              : [
                                  _c(
                                    "v-list-item-icon",
                                    { staticClass: "mr-4" },
                                    [
                                      _c(
                                        "v-icon",
                                        {
                                          on: {
                                            click: function($event) {
                                              return _vm.YTsearchByItem(
                                                data.item.value
                                              )
                                            }
                                          }
                                        },
                                        [_vm._v(_vm._s(data.item.icon))]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-list-item-content",
                                    {
                                      on: {
                                        click: function($event) {
                                          return _vm.YTsearchByItem(
                                            data.item.value
                                          )
                                        }
                                      }
                                    },
                                    [
                                      _c("v-list-item-title", {
                                        domProps: {
                                          innerHTML: _vm._s(data.item.value)
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-list-item-icon",
                                    { staticStyle: { "min-width": "16px" } },
                                    [
                                      _c("v-img", {
                                        attrs: {
                                          src: "/storage/icons/north_west.svg",
                                          width: "16px",
                                          "max-height": "16px",
                                          alt: "search YouTube"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.YTsearchByItem(
                                              data.item.value
                                            )
                                          }
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ]
                          ]
                        }
                      }
                    ]),
                    model: {
                      value: _vm.model,
                      callback: function($$v) {
                        _vm.model = $$v
                      },
                      expression: "model"
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
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTitem.vue?vue&type=template&id=0a8e3285&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTitem.vue?vue&type=template&id=0a8e3285& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
    "v-sheet",
    { staticClass: "pb-15" },
    [
      _c(
        "transition-group",
        { attrs: { name: "fade-transition", mode: "out-in" } },
        [
          _vm._l(_vm.YTitems, function(item, index) {
            return _c(
              "v-card",
              {
                key: item.youtubeId + index,
                staticClass: "mx-auto",
                attrs: { "max-width": "420", elevation: "0" }
              },
              [
                _c(
                  "v-container",
                  { staticClass: "px-3 my-3" },
                  [
                    _c(
                      "v-row",
                      {
                        staticClass: "pa-0 ma-0",
                        attrs: { justify: "center", "align-content": "center" },
                        on: {
                          click: function($event) {
                            return _vm.select(item)
                          }
                        }
                      },
                      [
                        _c(
                          "v-col",
                          { staticClass: "pa-0 ma-0", attrs: { cols: "11" } },
                          [
                            _c(
                              "v-row",
                              { staticClass: "pa-0 ma-0" },
                              [
                                _c(
                                  "v-col",
                                  {
                                    staticClass: "pa-0 ma-0",
                                    attrs: { cols: "6" }
                                  },
                                  [
                                    _c(
                                      "v-img",
                                      {
                                        staticClass:
                                          "white--text align-end right rounded",
                                        attrs: {
                                          src: item.thumbnail,
                                          alt: item.title + "-thumbnail",
                                          width: "100%",
                                          "aspect-ratio": "1.7777"
                                        }
                                      },
                                      [
                                        item.duration
                                          ? _c(
                                              "v-container",
                                              { staticClass: "pa-0 ma-0" },
                                              [
                                                _c(
                                                  "v-row",
                                                  {
                                                    staticClass:
                                                      "pa-0 ma-1 d-flex justify-end"
                                                  },
                                                  [
                                                    _c(
                                                      "v-col",
                                                      {
                                                        staticClass:
                                                          "pa-1 ma-0 text-center black lighten-2 font-weight-bold opacity-background corner-radius",
                                                        attrs: { cols: "auto" }
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            _vm.formatToMinSec(
                                                              item.duration
                                                            )
                                                          )
                                                        )
                                                      ]
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
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-col",
                                  {
                                    staticClass: "pa-0 ma-0",
                                    attrs: { cols: "6" }
                                  },
                                  [
                                    _c(
                                      "v-list-item",
                                      { staticClass: "px-2 ma-0" },
                                      [
                                        _c(
                                          "v-list-item-content",
                                          { staticClass: "pa-0 ma-0" },
                                          [
                                            _c(
                                              "div",
                                              { staticClass: "wrap-text" },
                                              [_vm._v(_vm._s(item.title))]
                                            ),
                                            _vm._v(" "),
                                            _c("v-list-item-subtitle", [
                                              _c(
                                                "span",
                                                { staticClass: "wrap-text" },
                                                [
                                                  _vm._v(
                                                    _vm._s(item.channel_title) +
                                                      "\n                      "
                                                  )
                                                ]
                                              )
                                            ]),
                                            _vm._v(" "),
                                            _c("v-list-item-subtitle", [
                                              item.view_count
                                                ? _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.convertNumDigit(
                                                          item.view_count
                                                        )
                                                      ) + "回視聴"
                                                    )
                                                  ])
                                                : _vm._e(),
                                              _vm._v(" "),
                                              item.num_views
                                                ? _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        item.published_at
                                                      ) + "前"
                                                    )
                                                  ])
                                                : _c("span", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.timeSince(
                                                          item.published_at
                                                        )
                                                      ) + "前"
                                                    )
                                                  ])
                                            ])
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
                        ),
                        _vm._v(" "),
                        _c(
                          "v-col",
                          {
                            staticClass: "pa-0 ma-auto text-center",
                            attrs: { cols: "1" }
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass: "ma-auto",
                                staticStyle: { width: "20px", height: "20px" }
                              },
                              [
                                _c(
                                  "span",
                                  [
                                    _c("v-img", {
                                      attrs: {
                                        src:
                                          "/storage/icons/keyboard_arrow_right.svg",
                                        width: "28px",
                                        "max-height": "28px",
                                        alt: "Open YouTube item"
                                      }
                                    })
                                  ],
                                  1
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
          }),
          _vm._v(" "),
          _vm.isYTLoading
            ? _c("YTLoadingItem", {
                key: "YTLoadingItem",
                attrs: {
                  numberOfYTItemsPerPagination: _vm.numberOfYTItemsPerPagination
                }
              })
            : _vm._e()
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTvideoSelectBox.vue?vue&type=template&id=0ff3fb66&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/YTvideoSelectBox.vue?vue&type=template&id=0ff3fb66& ***!
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
    { staticClass: "container--small full-height" },
    [
      _c("HighlightHeader"),
      _vm._v(" "),
      _c("YTSearchBox"),
      _vm._v(" "),
      _vm.YTsearchQuery
        ? _c(
            "div",
            { staticClass: "highlight-body" },
            [
              _c(
                "div",
                { staticClass: "px-3 pt-4" },
                [
                  _c("v-img", {
                    staticClass: "float-left mr-2",
                    attrs: {
                      src: "/storage/icons/yt_social_red.png",
                      width: "28px",
                      "max-height": "28px",
                      alt: "YouTube logo"
                    }
                  }),
                  _vm._v(" "),
                  _c("h2", { staticClass: "fz-14" }, [
                    _vm._v("YouTube検索結果")
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c("YTitem", { attrs: { YTitems: _vm.YTresult } })
            ],
            1
          )
        : _c(
            "div",
            { staticClass: "highlight-body" },
            [
              _vm.YTRecentVideos.length > 0
                ? _c(
                    "div",
                    { staticClass: "px-3 pt-3" },
                    [
                      _c("v-img", {
                        staticClass: "float-left mr-2",
                        attrs: {
                          src: "/storage/icons/yt_social_red.png",
                          width: "28px",
                          "max-height": "28px",
                          alt: "YouTube logo"
                        }
                      }),
                      _vm._v(" "),
                      _c("h2", { staticClass: "fz-14" }, [
                        _vm._v("最近まとめたYouTube動画")
                      ])
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("YTitem", { attrs: { YTitems: _vm.YTRecentVideos } })
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Youtube.vue?vue&type=template&id=3cb0fdbc&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Youtube.vue?vue&type=template&id=3cb0fdbc& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "container--small" },
    [
      _c("HighlightHeader"),
      _vm._v(" "),
      _c(
        "div",
        { ref: "highlightBody", staticClass: "highlight-body" },
        [
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
                attrs: { bodyRef: _vm.highlightBodyRef }
              })
            ],
            1
          ),
          _vm._v(" "),
          _vm.isPlayerReady
            ? _c(
                "v-sheet",
                { staticClass: "highlightControllerBody" },
                [
                  _c(
                    "v-container",
                    { staticClass: "ma-0 pa-0", attrs: { fluid: "" } },
                    [
                      _c(
                        "v-row",
                        {
                          staticClass: "ma-0 pa-0 text-left",
                          attrs: { align: "start" }
                        },
                        [
                          _c(
                            "v-col",
                            [
                              _c("v-img", {
                                staticClass: "float-left mr-2",
                                attrs: {
                                  src: "/storage/icons/yt_social_red.png",
                                  width: "28px",
                                  "max-height": "28px",
                                  alt: "YouTube logo"
                                }
                              }),
                              _vm._v(" "),
                              _vm.isNew
                                ? _c("span", [
                                    _vm._v(_vm._s(_vm.newVideoData.title))
                                  ])
                                : _c("span", [
                                    _vm._v(_vm._s(_vm.videoData.title))
                                  ])
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-form",
                        { ref: "form" },
                        [
                          _c(
                            "v-row",
                            {
                              staticClass: "ma-0 pt-4",
                              attrs: { align: "center" }
                            },
                            [
                              _c(
                                "v-col",
                                { staticClass: "ma-0 pa-0" },
                                [
                                  _c(
                                    "v-card",
                                    {
                                      staticClass: "ma-0",
                                      attrs: { tile: "", elevation: "0" }
                                    },
                                    [
                                      _c(
                                        "v-row",
                                        { staticClass: "ma-0 pa-0" },
                                        [
                                          _c(
                                            "v-col",
                                            {
                                              staticClass: "ma-0 pa-0",
                                              attrs: { justify: "center" }
                                            },
                                            [
                                              _c(
                                                "v-bottom-navigation",
                                                {
                                                  staticClass:
                                                    "bottom_navigation_no_shadow",
                                                  attrs: {
                                                    elevation: "0",
                                                    height: "64"
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "v-btn",
                                                    {
                                                      staticClass: "ma-0 pa-0",
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          $event.stopPropagation()
                                                          return _vm.tapStartBtn(
                                                            $event
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "span",
                                                        {
                                                          staticClass:
                                                            "green--text text--lighten-1"
                                                        },
                                                        [
                                                          _vm._v(
                                                            "開始時間を指定"
                                                          )
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "v-icon",
                                                        {
                                                          attrs: {
                                                            color:
                                                              "green lighten-1",
                                                            "x-large": ""
                                                          }
                                                        },
                                                        [_vm._v("alarm_on")]
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
                                        {
                                          staticClass: "ma-0 pa-0",
                                          attrs: { justify: "center" }
                                        },
                                        [
                                          _c(
                                            "v-col",
                                            {
                                              staticClass: "ma-0 pa-0",
                                              attrs: { cols: "3" }
                                            },
                                            [
                                              _c("v-text-field", {
                                                staticClass:
                                                  "ma-0 pa-0 centered-input",
                                                attrs: {
                                                  rules: _vm.startRules,
                                                  required: "",
                                                  placeholder: "0:00",
                                                  "validate-on-blur": "",
                                                  flat: ""
                                                },
                                                model: {
                                                  value: _vm.startTimeInput,
                                                  callback: function($$v) {
                                                    _vm.startTimeInput = $$v
                                                  },
                                                  expression: "startTimeInput"
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
                                    "v-card",
                                    {
                                      staticClass: "ma-0",
                                      attrs: { tile: "", elevation: "0" }
                                    },
                                    [
                                      _c(
                                        "v-row",
                                        { staticClass: "ma-0 pa-0" },
                                        [
                                          _c(
                                            "v-col",
                                            {
                                              staticClass: "ma-0 pa-0",
                                              attrs: { justify: "center" }
                                            },
                                            [
                                              _c(
                                                "v-bottom-navigation",
                                                {
                                                  staticClass:
                                                    "bottom_navigation_no_shadow",
                                                  attrs: {
                                                    elevation: "0",
                                                    height: "64"
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "v-btn",
                                                    {
                                                      staticClass: "ma-0 pa-0",
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          $event.stopPropagation()
                                                          return _vm.tapStopBtn(
                                                            $event
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "span",
                                                        {
                                                          staticClass:
                                                            "red--text text--darken-1"
                                                        },
                                                        [
                                                          _vm._v(
                                                            "終了時間を指定"
                                                          )
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "v-icon",
                                                        {
                                                          attrs: {
                                                            color:
                                                              "red darken-1",
                                                            "x-large": ""
                                                          }
                                                        },
                                                        [_vm._v("alarm_off")]
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
                                        {
                                          staticClass: "ma-0 pa-0",
                                          attrs: { justify: "center" }
                                        },
                                        [
                                          _c(
                                            "v-col",
                                            {
                                              staticClass: "ma-0 pa-0",
                                              attrs: { cols: "3" }
                                            },
                                            [
                                              _c("v-text-field", {
                                                staticClass:
                                                  "ma-0 pa-0 centered-input",
                                                attrs: {
                                                  rules: _vm.endRules,
                                                  required: "",
                                                  placeholder: "0:00",
                                                  "validate-on-blur": "",
                                                  flat: ""
                                                },
                                                model: {
                                                  value: _vm.endTimeInput,
                                                  callback: function($$v) {
                                                    _vm.endTimeInput = $$v
                                                  },
                                                  expression: "endTimeInput"
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
            : _vm._e(),
          _vm._v(" "),
          _vm.player != null
            ? _c(
                "v-sheet",
                {
                  staticClass: "ma-0 pa-0",
                  class: _vm.isIOS ? "iosBottomPosition" : "bottomPosition",
                  attrs: { tile: "", width: "100%" }
                },
                [
                  _c(
                    "v-container",
                    { staticClass: "ma-0 pa-0", attrs: { fluid: "" } },
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
                            { staticClass: "text-right ma-0 pa-2" },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: { color: "red lighten-2 white--text" },
                                  on: { click: _vm.next }
                                },
                                [_vm._v("確認")]
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Highlight.vue?vue&type=template&id=ebc8d572&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Highlight.vue?vue&type=template&id=ebc8d572& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
    "transition",
    {
      attrs: {
        name: _vm.highlightTransitNext ? "transitForward" : "transitBackward"
      }
    },
    [_c(_vm.displayComponent, { tag: "component" })],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);