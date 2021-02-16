(self["webpackChunkSrc"] = self["webpackChunkSrc"] || []).push([["resources_assets_js_components_MyList_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyList.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyList.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_MyPlaylistItem_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/MyPlaylistItem.vue */ "./resources/assets/js/components/MyPlaylistItem.vue");
/* harmony import */ var _components_MyTagItem_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/MyTagItem.vue */ "./resources/assets/js/components/MyTagItem.vue");
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




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_objectSpread(_objectSpread({
  components: {
    MyPlaylistItem: _components_MyPlaylistItem_vue__WEBPACK_IMPORTED_MODULE_1__.default,
    MyTagItem: _components_MyTagItem_vue__WEBPACK_IMPORTED_MODULE_2__.default // PlaylistMediaItem

  },
  props: {},
  data: function data() {
    return {
      tab: 1,
      //デフォルトは場面タブを表示
      items: ["まとめ", "場面"]
    };
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_3__.default]
}, (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapState)({
  apiStatus: function apiStatus(state) {
    return state.auth.apiStatus;
  }
})), {}, {
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapGetters)({
    myCreatedAndLikedPlaylist: "playlist/myCreatedAndLikedPlaylist",
    myCreatedAndLikedTagVideo: "tag/myCreatedAndLikedTagVideo"
  })), {}, {
    myCreatedAndLikedPlaylistMediaItems: function myCreatedAndLikedPlaylistMediaItems() {
      if (!this.myCreatedAndLikedPlaylist) return; // プレイリストのデータをmyCreatedAndLikedPlaylistMediaItemsに格納

      var mediaItems = [];
      this.putPlaylistTagIntoMediaItems(mediaItems, this.myCreatedAndLikedPlaylist);
      return mediaItems;
    },
    myCreatedAndLikedTagVideoMediaItems: function myCreatedAndLikedTagVideoMediaItems() {
      if (!this.myCreatedAndLikedTagVideo) return; // タグのデータをmyCreatedAndLikedTagVideoMediaItemsに格納

      var mediaItems = [];
      this.putTagVideoIntoMediaItems(mediaItems, this.myCreatedAndLikedTagVideo);
      var groupedData = Object.values(mediaItems.reduce(function (result, _ref) {
        var video_id = _ref.video_id,
            category = _ref.category,
            id = _ref.id,
            title = _ref.title,
            thumbnail = _ref.thumbnail,
            created_at = _ref.created_at,
            timeSince = _ref.timeSince,
            tagsList = _ref.tagsList,
            tags = _ref.tags,
            tagArray = _ref.tagArray,
            totalDuration = _ref.totalDuration,
            start = _ref.start,
            end = _ref.end,
            preview = _ref.preview,
            previewgif = _ref.previewgif,
            sceneCount = _ref.sceneCount,
            likeCount = _ref.likeCount,
            user_id = _ref.user_id;

        // Create new group
        if (!result[video_id]) {
          result[video_id] = {
            video_id: video_id,
            title: title,
            tagVideoData: []
          };
        } // if (!result[title]) {
        //   result[title]
        // }
        // Append to group


        result[video_id].tagVideoData.push({
          category: category,
          id: id,
          title: title,
          thumbnail: thumbnail,
          created_at: created_at,
          timeSince: timeSince,
          tagsList: tagsList,
          tags: tags,
          tagArray: tagArray,
          totalDuration: totalDuration,
          start: start,
          end: end,
          preview: preview,
          previewgif: previewgif,
          sceneCount: sceneCount,
          likeCount: likeCount,
          user_id: user_id
        });
        return result;
      }, {}));
      groupedData.sort(function (a, b) {
        return a.video_id < b.video_id ? 1 : -1;
      });
      return groupedData;
    }
  }),
  methods: {
    logout: function logout() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.$store.dispatch("auth/logout");

              case 2:
                if (_this.apiStatus) {
                  _this.$router.push("/login");
                }

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    setActiveTab: function setActiveTab(key) {
      //開いたタブをセッションストレージに保存
      window.sessionStorage.setItem("myPageTabIndex", JSON.stringify(key));
    }
  },
  created: function created() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              //以前に開いていたタブをセッションストレージからセット
              window.sessionStorage.getItem("myPageTabIndex") ? _this2.tab = parseInt(window.sessionStorage.getItem("myPageTabIndex")) : ""; //Likeまたは作成したプレイリストをロード

              _context2.next = 3;
              return _this2.$store.dispatch("playlist/loadMyCreatedAndLikedPlaylist");

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyPlaylistItem.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyPlaylistItem.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.umd.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");
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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      enabled: true,
      dragging: false,
      showPreviewIndex: null
    };
  },
  components: {
    draggable: (vuedraggable__WEBPACK_IMPORTED_MODULE_0___default())
  },
  props: {
    mediaItems: Array
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_1__.default],
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapGetters)({
    user_id: "auth/user_id",
    numberOfItemsPerPagination: "loadingItem/numberOfItemsPerPagination"
  })),
  methods: {
    setShowPreviewIndex: function setShowPreviewIndex(index) {
      this.showPreviewIndex = index;
    },
    checkMove: function checkMove(e) {},
    select: function select(mediaItem) {
      //プレイリストの場合
      this.$store.dispatch("playlist/addPlaylistVisitCount", mediaItem.id);
    },
    endDragging: function endDragging() {}
  },
  mounted: function mounted() {},
  created: function created() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyTagItem.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyTagItem.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_LoadingItem_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/LoadingItem.vue */ "./resources/assets/js/components/LoadingItem.vue");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");
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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      isMobile: false
    };
  },
  components: {
    LoadingItem: _components_LoadingItem_vue__WEBPACK_IMPORTED_MODULE_0__.default
  },
  props: {
    mediaItems: Array
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_1__.default],
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapGetters)({
    isLoading: "loadingItem/isLoading",
    numberOfItemsPerPagination: "loadingItem/numberOfItemsPerPagination"
  })),
  methods: {
    switchThumb: function switchThumb() {
      this.isThumb = !this.isThumb;
    },
    select: function select(mediaItem) {
      this.$store.dispatch("playlist/addPlaylistVisitCount", mediaItem.id);
    }
  },
  created: function created() {
    this.isMobile = this.mobileCheck();
  }
});

/***/ }),

/***/ "./resources/assets/js/components/MyList.vue":
/*!***************************************************!*\
  !*** ./resources/assets/js/components/MyList.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MyList_vue_vue_type_template_id_12e0cc61___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyList.vue?vue&type=template&id=12e0cc61& */ "./resources/assets/js/components/MyList.vue?vue&type=template&id=12e0cc61&");
/* harmony import */ var _MyList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MyList.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/MyList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _MyList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _MyList_vue_vue_type_template_id_12e0cc61___WEBPACK_IMPORTED_MODULE_0__.render,
  _MyList_vue_vue_type_template_id_12e0cc61___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/MyList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/MyPlaylistItem.vue":
/*!***********************************************************!*\
  !*** ./resources/assets/js/components/MyPlaylistItem.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MyPlaylistItem_vue_vue_type_template_id_ba362570___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyPlaylistItem.vue?vue&type=template&id=ba362570& */ "./resources/assets/js/components/MyPlaylistItem.vue?vue&type=template&id=ba362570&");
/* harmony import */ var _MyPlaylistItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MyPlaylistItem.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/MyPlaylistItem.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _MyPlaylistItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _MyPlaylistItem_vue_vue_type_template_id_ba362570___WEBPACK_IMPORTED_MODULE_0__.render,
  _MyPlaylistItem_vue_vue_type_template_id_ba362570___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/MyPlaylistItem.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/MyTagItem.vue":
/*!******************************************************!*\
  !*** ./resources/assets/js/components/MyTagItem.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MyTagItem_vue_vue_type_template_id_53780c4c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyTagItem.vue?vue&type=template&id=53780c4c& */ "./resources/assets/js/components/MyTagItem.vue?vue&type=template&id=53780c4c&");
/* harmony import */ var _MyTagItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MyTagItem.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/MyTagItem.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _MyTagItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _MyTagItem_vue_vue_type_template_id_53780c4c___WEBPACK_IMPORTED_MODULE_0__.render,
  _MyTagItem_vue_vue_type_template_id_53780c4c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/MyTagItem.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/MyList.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/assets/js/components/MyList.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MyList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyList.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/MyPlaylistItem.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/assets/js/components/MyPlaylistItem.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyPlaylistItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MyPlaylistItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyPlaylistItem.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyPlaylistItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/MyTagItem.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/assets/js/components/MyTagItem.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyTagItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MyTagItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyTagItem.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MyTagItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/MyList.vue?vue&type=template&id=12e0cc61&":
/*!**********************************************************************************!*\
  !*** ./resources/assets/js/components/MyList.vue?vue&type=template&id=12e0cc61& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyList_vue_vue_type_template_id_12e0cc61___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyList_vue_vue_type_template_id_12e0cc61___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyList_vue_vue_type_template_id_12e0cc61___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MyList.vue?vue&type=template&id=12e0cc61& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyList.vue?vue&type=template&id=12e0cc61&");


/***/ }),

/***/ "./resources/assets/js/components/MyPlaylistItem.vue?vue&type=template&id=ba362570&":
/*!******************************************************************************************!*\
  !*** ./resources/assets/js/components/MyPlaylistItem.vue?vue&type=template&id=ba362570& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyPlaylistItem_vue_vue_type_template_id_ba362570___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyPlaylistItem_vue_vue_type_template_id_ba362570___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyPlaylistItem_vue_vue_type_template_id_ba362570___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MyPlaylistItem.vue?vue&type=template&id=ba362570& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyPlaylistItem.vue?vue&type=template&id=ba362570&");


/***/ }),

/***/ "./resources/assets/js/components/MyTagItem.vue?vue&type=template&id=53780c4c&":
/*!*************************************************************************************!*\
  !*** ./resources/assets/js/components/MyTagItem.vue?vue&type=template&id=53780c4c& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyTagItem_vue_vue_type_template_id_53780c4c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyTagItem_vue_vue_type_template_id_53780c4c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MyTagItem_vue_vue_type_template_id_53780c4c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MyTagItem.vue?vue&type=template&id=53780c4c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyTagItem.vue?vue&type=template&id=53780c4c&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyList.vue?vue&type=template&id=12e0cc61&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyList.vue?vue&type=template&id=12e0cc61& ***!
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
    "div",
    [
      _c(
        "div",
        {
          staticClass: "pa-0 ma-0",
          staticStyle: { position: "relative", height: "40px" }
        },
        [
          _c(
            "div",
            {
              staticStyle: {
                position: "absolute",
                height: "100%",
                top: "12px",
                left: "8px"
              }
            },
            [
              _c("v-icon", { attrs: { size: "30", color: "my-grey" } }, [
                _vm._v("mdi-play-box-multiple-outline")
              ]),
              _vm._v(" "),
              _c("span", [_vm._v("自分のまとめ・いいねしたまとめ")])
            ],
            1
          ),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "div",
            {
              staticStyle: {
                position: "absolute",
                height: "100%",
                top: "12px",
                right: "8px"
              }
            },
            [
              _c(
                "v-menu",
                {
                  attrs: { "offset-y": "" },
                  scopedSlots: _vm._u([
                    {
                      key: "activator",
                      fn: function(ref) {
                        var on = ref.on
                        return [
                          _c(
                            "i",
                            _vm._g(
                              {
                                staticClass: "fas fa-bars",
                                staticStyle: {
                                  color: "rgb(158, 158, 158)",
                                  "text-align": "right",
                                  "font-size": "20px"
                                }
                              },
                              on
                            )
                          )
                        ]
                      }
                    }
                  ])
                },
                [
                  _vm._v(" "),
                  _c(
                    "v-list",
                    [
                      _c(
                        "v-list-item",
                        [
                          _c(
                            "v-list-item-title",
                            {
                              staticClass: "button button--link",
                              on: { click: _vm.logout }
                            },
                            [_vm._v("ログアウト")]
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
      _vm.myCreatedAndLikedPlaylist
        ? _c("MyPlaylistItem", {
            attrs: { mediaItems: _vm.myCreatedAndLikedPlaylistMediaItems }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyPlaylistItem.vue?vue&type=template&id=ba362570&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyPlaylistItem.vue?vue&type=template&id=ba362570& ***!
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
  return _c("v-container", { staticClass: "pa-0 pb-3 mt-2 body-color" }, [
    _c(
      "div",
      [
        _vm._l(_vm.mediaItems, function(item, index) {
          return _c(
            "v-row",
            {
              key: item.category + "-" + item.id,
              staticClass: "pa-0 ma-0",
              attrs: { dense: "" }
            },
            [
              _c(
                "v-col",
                { staticClass: "px-0" },
                [
                  item
                    ? _c(
                        "v-card",
                        {
                          staticClass: "mx-auto d-flex",
                          attrs: { "max-width": "420", elevation: "0" }
                        },
                        [
                          _c(
                            "v-row",
                            { staticClass: "ma-0", attrs: { align: "center" } },
                            [
                              _c(
                                "v-col",
                                { staticClass: "pa-0" },
                                [
                                  _c(
                                    "v-row",
                                    { staticClass: "ma-0" },
                                    [
                                      _c(
                                        "v-col",
                                        {
                                          staticClass: "pa-2",
                                          attrs: { cols: "6" }
                                        },
                                        [
                                          _c(
                                            "v-card",
                                            {
                                              staticClass: "ma-0 pa-0",
                                              staticStyle: {
                                                overflow: "hidden"
                                              },
                                              attrs: {
                                                "aspect-ratio": "calc(16 / 9)",
                                                "max-width": "167",
                                                width: "100%",
                                                elevation: "0"
                                              },
                                              on: {
                                                mouseover: function($event) {
                                                  return _vm.setShowPreviewIndex(
                                                    index
                                                  )
                                                },
                                                touchstart: function($event) {
                                                  return _vm.setShowPreviewIndex(
                                                    index
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "router-link",
                                                {
                                                  staticClass:
                                                    "no-text-decoration",
                                                  attrs: {
                                                    to: {
                                                      path: "/watch",
                                                      query: {
                                                        playlist: item.id,
                                                        index: 0
                                                      }
                                                    }
                                                  },
                                                  nativeOn: {
                                                    click: function($event) {
                                                      return _vm.select(item)
                                                    }
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
                                                      "lazy-src":
                                                        "/storage/imgs/dummy-image.jpg",
                                                      alt: item.title,
                                                      height: "100%"
                                                    },
                                                    scopedSlots: _vm._u(
                                                      [
                                                        {
                                                          key: "placeholder",
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
                                                  }),
                                                  _vm._v(" "),
                                                  _vm.showPreviewIndex == index
                                                    ? _c("video", {
                                                        staticStyle: {
                                                          position: "absolute",
                                                          top: "0",
                                                          left: "0",
                                                          "z-index": "2",
                                                          "border-radius":
                                                            "4px",
                                                          "object-fit": "cover"
                                                        },
                                                        attrs: {
                                                          src:
                                                            _vm.gifStoragePath +
                                                            item.previewgif,
                                                          autoplay: "",
                                                          playsinline: "",
                                                          muted: "",
                                                          loop: "",
                                                          disablePictureInPicture:
                                                            "",
                                                          disableRemotePlayback:
                                                            "",
                                                          height: "100%"
                                                        },
                                                        domProps: {
                                                          muted: true
                                                        }
                                                      })
                                                    : _vm._e()
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
                                          staticClass: "pa-2",
                                          attrs: { cols: "6" }
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
                                                  attrs: { cols: "10" }
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    { staticClass: "py-1" },
                                                    [
                                                      _c(
                                                        "router-link",
                                                        {
                                                          staticClass:
                                                            "no-text-decoration",
                                                          attrs: {
                                                            to: {
                                                              path: "/watch",
                                                              query: {
                                                                playlist:
                                                                  item.id,
                                                                index: 0
                                                              }
                                                            }
                                                          },
                                                          nativeOn: {
                                                            click: function(
                                                              $event
                                                            ) {
                                                              return _vm.select(
                                                                item
                                                              )
                                                            }
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "span",
                                                            {
                                                              staticClass:
                                                                "block-playlist-title"
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
                                                    ],
                                                    1
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-col",
                                                {
                                                  staticClass:
                                                    "ma-0 pa-0 text-center",
                                                  attrs: { cols: "2" }
                                                },
                                                [
                                                  _vm.user_id === item.user_id
                                                    ? _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "ma-0 pa-0",
                                                          staticStyle: {
                                                            width: "20px",
                                                            height: "20px"
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "router-link",
                                                            {
                                                              staticClass:
                                                                "no-text-decoration",
                                                              attrs: {
                                                                to: {
                                                                  path:
                                                                    "/editmyplaylist",
                                                                  query: {
                                                                    playlist:
                                                                      item.id
                                                                  }
                                                                }
                                                              }
                                                            },
                                                            [
                                                              _c(
                                                                "span",
                                                                [
                                                                  _c(
                                                                    "v-icon",
                                                                    {
                                                                      staticClass:
                                                                        "my-grey outlined-icon"
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        "mdi-pencil"
                                                                      )
                                                                    ]
                                                                  )
                                                                ],
                                                                1
                                                              )
                                                            ]
                                                          )
                                                        ],
                                                        1
                                                      )
                                                    : _vm._e()
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
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "grey--text text--darken-3 py-1",
                                                      staticStyle: {
                                                        "font-size": "12px",
                                                        "padding-left": "0"
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "router-link",
                                                        {
                                                          staticClass:
                                                            "no-text-decoration",
                                                          attrs: {
                                                            to: {
                                                              path: "/watch",
                                                              query: {
                                                                playlist:
                                                                  item.id,
                                                                index: 0
                                                              }
                                                            }
                                                          },
                                                          nativeOn: {
                                                            click: function(
                                                              $event
                                                            ) {
                                                              return _vm.select(
                                                                item
                                                              )
                                                            }
                                                          }
                                                        },
                                                        [
                                                          _c("span", [
                                                            _vm._v(
                                                              _vm._s(
                                                                item.visitCount
                                                                  ? item.visitCount
                                                                  : 0
                                                              ) + "回視聴"
                                                            )
                                                          ]),
                                                          _vm._v(" "),
                                                          _c(
                                                            "span",
                                                            {
                                                              staticStyle: {
                                                                "font-size":
                                                                  "8px"
                                                              }
                                                            },
                                                            [_vm._v(" • ")]
                                                          ),
                                                          _vm._v(" "),
                                                          _c("span", [
                                                            _vm._v(
                                                              "合計" +
                                                                _vm._s(
                                                                  item.totalDuration
                                                                )
                                                            )
                                                          ]),
                                                          _vm._v(" "),
                                                          _c(
                                                            "span",
                                                            {
                                                              staticStyle: {
                                                                "font-size":
                                                                  "8px"
                                                              }
                                                            },
                                                            [_vm._v(" • ")]
                                                          ),
                                                          _vm._v(" "),
                                                          _c("span", [
                                                            _vm._v(
                                                              _vm._s(
                                                                item.timeSince
                                                              ) + "前"
                                                            )
                                                          ]),
                                                          _vm._v(" "),
                                                          item.likeCount
                                                            ? _c(
                                                                "span",
                                                                {
                                                                  staticStyle: {
                                                                    "font-size":
                                                                      "8px"
                                                                  }
                                                                },
                                                                [_vm._v(" • ")]
                                                              )
                                                            : _vm._e(),
                                                          _vm._v(" "),
                                                          item.likeCount
                                                            ? _c("span", [
                                                                _c("i", {
                                                                  staticClass:
                                                                    "fas fa-heart my-grey-heart"
                                                                }),
                                                                _vm._v(
                                                                  "\n                            " +
                                                                    _vm._s(
                                                                      item.likeCount
                                                                    ) +
                                                                    "\n                          "
                                                                )
                                                              ])
                                                            : _vm._e()
                                                        ]
                                                      )
                                                    ],
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
        }),
        _vm._v(" "),
        !_vm.mediaItems[0]
          ? _c(
              "v-card",
              {
                staticClass: "text-center pa-3 ma-3 body-color",
                attrs: { elevation: "0" }
              },
              [
                _c(
                  "v-card-title",
                  { staticClass: "pa-0 ma-0 justify-center" },
                  [
                    _c("v-img", {
                      attrs: {
                        "max-width": "160",
                        "aspect-ratio": "1",
                        alt: "no post",
                        src: "/storage/imgs/noPost.svg"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-card-title",
                  { staticClass: "pa-1 mt-2 mx-0 justify-center" },
                  [_vm._v("まだ作成した・いいねしたまとめはありません")]
                )
              ],
              1
            )
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyTagItem.vue?vue&type=template&id=53780c4c&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/MyTagItem.vue?vue&type=template&id=53780c4c& ***!
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
    "v-container",
    { staticClass: "pa-0 py-3 body-color" },
    [
      _vm._l(_vm.mediaItems, function(videoItem) {
        return _c(
          "v-row",
          {
            key: videoItem.video_id,
            staticClass: "pa-0 ma-auto mb-1 white",
            staticStyle: { "max-width": "420px" },
            attrs: { dense: "" }
          },
          [
            _c(
              "v-col",
              { attrs: { cols: "12" } },
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
                _c("div", { staticClass: "video-title" }, [
                  _vm._v("\n        " + _vm._s(videoItem.title) + "\n      ")
                ])
              ],
              1
            ),
            _vm._v(" "),
            _vm._l(videoItem.tagVideoData, function(item) {
              return _c(
                "v-col",
                {
                  key: item.category + "-" + item.id,
                  staticStyle: {
                    "padding-top": "2px",
                    "padding-bottom": "2px"
                  },
                  attrs: { cols: "6" }
                },
                [
                  _c(
                    "v-card",
                    { staticClass: "mx-0", attrs: { elevation: "1" } },
                    [
                      _c(
                        "router-link",
                        {
                          staticClass: "no-text-decoration",
                          attrs: {
                            to: {
                              path: "/watch",
                              query: { playlist: item.id, index: 0 }
                            }
                          },
                          nativeOn: {
                            click: function($event) {
                              return _vm.select(item)
                            }
                          }
                        },
                        [
                          !_vm.isMobile
                            ? _c("v-hover", {
                                scopedSlots: _vm._u(
                                  [
                                    {
                                      key: "default",
                                      fn: function(ref) {
                                        var hover = ref.hover
                                        return [
                                          _c(
                                            "v-img",
                                            {
                                              staticClass:
                                                "white--text align-end",
                                              attrs: {
                                                "max-height": "266.66px",
                                                src: hover
                                                  ? _vm.gifStoragePath +
                                                    item.previewgif
                                                  : _vm.thumbStoragePath +
                                                    item.preview,
                                                alt: item.title,
                                                "aspect-ratio": "1.7777"
                                              }
                                            },
                                            [
                                              _c(
                                                "v-chip",
                                                {
                                                  staticClass: "my-scene-time",
                                                  attrs: {
                                                    label: "",
                                                    color: "#27252582",
                                                    "text-color": "white"
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "span",
                                                    { staticClass: "caption" },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          item.start +
                                                            "~" +
                                                            item.end
                                                        )
                                                      )
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-card-text",
                                                {
                                                  staticClass: "px-1",
                                                  staticStyle: {
                                                    position: "absolute",
                                                    bottom: "0"
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "horizontal-list-wrap block-chip-line"
                                                    },
                                                    _vm._l(
                                                      item.tagArray,
                                                      function(tag, tagIndex) {
                                                        return _c(
                                                          "v-chip",
                                                          {
                                                            key:
                                                              item.id +
                                                              "-" +
                                                              tagIndex,
                                                            staticClass:
                                                              "my-tag-chip",
                                                            staticStyle: {
                                                              "font-weight":
                                                                "normal"
                                                            },
                                                            attrs: {
                                                              small: "",
                                                              color:
                                                                "blue lighten-5",
                                                              "text-color":
                                                                "black"
                                                            }
                                                          },
                                                          [
                                                            _c(
                                                              "v-avatar",
                                                              {
                                                                attrs: {
                                                                  left: ""
                                                                }
                                                              },
                                                              [
                                                                _c("i", {
                                                                  staticClass:
                                                                    "fas fa-tag my-black"
                                                                })
                                                              ]
                                                            ),
                                                            _vm._v(
                                                              "\n                    " +
                                                                _vm._s(tag) +
                                                                "\n                  "
                                                            )
                                                          ],
                                                          1
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
                                        ]
                                      }
                                    }
                                  ],
                                  null,
                                  true
                                )
                              })
                            : _c(
                                "v-img",
                                {
                                  staticClass: "white--text align-end",
                                  attrs: {
                                    "max-height": "266.66px",
                                    src: _vm.gifStoragePath + item.previewgif,
                                    alt: item.title,
                                    "aspect-ratio": "1.7777"
                                  }
                                },
                                [
                                  _c(
                                    "v-chip",
                                    {
                                      staticClass: "my-scene-time",
                                      attrs: {
                                        label: "",
                                        color: "#27252582",
                                        "text-color": "white"
                                      }
                                    },
                                    [
                                      _c("span", { staticClass: "caption" }, [
                                        _vm._v(
                                          _vm._s(item.start + "~" + item.end)
                                        )
                                      ])
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-card-text",
                                    {
                                      staticClass:
                                        "px-1 horizontal-list-wrap block-chip-line",
                                      staticStyle: {
                                        position: "absolute",
                                        bottom: "0"
                                      }
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "horizontal-list-wrap block-chip-line"
                                        },
                                        _vm._l(item.tagArray, function(
                                          tag,
                                          tagIndex
                                        ) {
                                          return _c(
                                            "v-chip",
                                            {
                                              key: item.id + "-" + tagIndex,
                                              staticClass: "my-tag-chip",
                                              staticStyle: {
                                                "font-weight": "normal"
                                              },
                                              attrs: {
                                                small: "",
                                                color: "blue lighten-5",
                                                "text-color": "black"
                                              }
                                            },
                                            [
                                              _c(
                                                "v-avatar",
                                                { attrs: { left: "" } },
                                                [
                                                  _c("i", {
                                                    staticClass:
                                                      "fas fa-tag my-black"
                                                  })
                                                ]
                                              ),
                                              _vm._v(
                                                "\n                  " +
                                                  _vm._s(tag) +
                                                  "\n                "
                                              )
                                            ],
                                            1
                                          )
                                        }),
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
            })
          ],
          2
        )
      }),
      _vm._v(" "),
      _vm.isLoading
        ? _c("LoadingItem", {
            attrs: {
              numberOfItemsPerPagination: _vm.numberOfItemsPerPagination
            }
          })
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);