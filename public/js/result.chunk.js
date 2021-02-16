(self["webpackChunkSrc"] = self["webpackChunkSrc"] || []).push([["js/result"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Result.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Result.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.mjs");
/* harmony import */ var _components_PlaylistMediaItem_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/PlaylistMediaItem.vue */ "./resources/assets/js/components/PlaylistMediaItem.vue");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./resources/assets/js/util.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
      title: "「" + this.$route.query.search_query + "」のYouTube動画まとめ検索結果 - YouClip",
      meta: [{
        name: "description",
        content: "YouTube動画のまとめ作成ツール、YouClipでの「" + this.$route.query.search_query + "」に関するYouTube動画まとめ検索結果です。YouClipでは、ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。また、みんなが作った人気のまとめを見ることも可能です。"
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
        content: "「" + this.$route.query.search_query + "」のYouTube動画まとめ検索結果 - YouClip"
      }, {
        property: "og:description",
        content: "YouTube動画のまとめ作成ツール、YouClipでの「" + this.$route.query.search_query + "」に関するYouTube動画まとめ検索結果です。YouClipでは、ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。"
      }, {
        property: "og:image",
        content: "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png"
      }],
      link: [{
        rel: "canonical",
        href: "https://youclip.jp" + this.$route.path
      }]
    };
  },
  components: {
    PlaylistMediaItem: _components_PlaylistMediaItem_vue__WEBPACK_IMPORTED_MODULE_1__.default
  },
  data: function data() {
    return {
      tab: null,
      items: ["まとめ", "場面"],
      pageOfPlaylist: 1,
      playlistMediaItems: []
    };
  },
  mixins: [_util__WEBPACK_IMPORTED_MODULE_2__.default],
  methods: {
    //初回ロード
    initializeSearchResult: function initializeSearchResult() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //ローディングを表示
                _this.$store.commit("loadingItem/setIsLoading", true); //URLのsearch_queryを元に検索ページネーションを実行


                _this.$store.commit("search/setSearchQuery", _this.$route.query.search_query);

                _context.next = 4;
                return _this.$store.dispatch("search/search", _this.pageOfPlaylist++);

              case 4:
                _this.pageOfTagVideo++; //プレイリストデータをメディアアイテムに追加格納

                _this.putPlaylistTagIntoMediaItems(_this.playlistMediaItems, _this.playlistTagResult); //有効アイテム数が5未満の場合、スクロールイベントが発生しないのでマニュアルで次ページを読み込み


                if (_this.playlistMediaItems.length < 5 && _this.playlistResultToLoad) _this.infinateLoadPlaylistSearchResult(); //ローディングを非表示

                _this.$store.commit("loadingItem/setIsLoading", false);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    //プレイリストの検索結果の無限スクロール
    infinateLoadPlaylistSearchResult: function infinateLoadPlaylistSearchResult() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this2.playlistResultToLoad) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                //ローディングを表示
                _this2.$store.commit("loadingItem/setIsLoading", true); //プレイリストの検索ページネーションを実行


                _context2.next = 5;
                return _this2.$store.dispatch("search/searchPlaylistTagResult", _this2.pageOfPlaylist++);

              case 5:
                //プレイリストデータをメディアアイテムに追加格納
                _this2.putPlaylistTagIntoMediaItems(_this2.playlistMediaItems, _this2.playlistTagResult); //ローディングを非表示


                _this2.$store.commit("loadingItem/setIsLoading", false);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    resetSearchResult: function resetSearchResult() {
      this.pageOfPlaylist = 1;
      this.playlistMediaItems = [];
    },
    setActiveTab: function setActiveTab(key) {
      //開いたタブをセッションストレージに保存
      window.sessionStorage.setItem("searchTabIndex", JSON.stringify(key));
    }
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapGetters)({
    // searchQuery: "search/searchQuery",
    tagVideoResult: "search/tagVideoResult",
    playlistTagResult: "search/playlistTagResult",
    tagVideoResultToLoad: "search/tagVideoResultToLoad",
    playlistResultToLoad: "search/playlistResultToLoad",
    isSearchingPlaylistTagResult: "search/isSearchingPlaylistTagResult",
    isSearchingTagVideoResult: "search/isSearchingTagVideoResult"
  })),
  watch: {
    $route: function $route() {
      this.resetSearchResult();
      this.initializeSearchResult();
    }
  },
  created: function created() {
    var _this3 = this;

    //ナビバーを表示
    this.$store.commit("navbar/setShowNavbar", true); //検索バーをactiveにし、検索ワードをセット

    this.$store.commit("navbar/setIsActiveSearch", true);
    this.$store.commit("navbar/setSearchquery", this.$route.query.search_query); //ローディング表示用の変数をセット

    this.$store.commit("loadingItem/setNumberOfItemsPerPagination", 5);

    window.onscroll = function () {
      //ウィンドウの下から100pxに達したら次の検索結果を読み込み
      var bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        _this3.infinateLoadPlaylistSearchResult();
      }
    };

    this.initializeSearchResult();
  }
});

/***/ }),

/***/ "./resources/assets/js/pages/Result.vue":
/*!**********************************************!*\
  !*** ./resources/assets/js/pages/Result.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Result_vue_vue_type_template_id_5ff7ce1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Result.vue?vue&type=template&id=5ff7ce1a& */ "./resources/assets/js/pages/Result.vue?vue&type=template&id=5ff7ce1a&");
/* harmony import */ var _Result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Result.vue?vue&type=script&lang=js& */ "./resources/assets/js/pages/Result.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Result_vue_vue_type_template_id_5ff7ce1a___WEBPACK_IMPORTED_MODULE_0__.render,
  _Result_vue_vue_type_template_id_5ff7ce1a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/pages/Result.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/pages/Result.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/assets/js/pages/Result.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Result.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Result.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Result_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/pages/Result.vue?vue&type=template&id=5ff7ce1a&":
/*!*****************************************************************************!*\
  !*** ./resources/assets/js/pages/Result.vue?vue&type=template&id=5ff7ce1a& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Result_vue_vue_type_template_id_5ff7ce1a___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Result_vue_vue_type_template_id_5ff7ce1a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Result_vue_vue_type_template_id_5ff7ce1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Result.vue?vue&type=template&id=5ff7ce1a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Result.vue?vue&type=template&id=5ff7ce1a&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Result.vue?vue&type=template&id=5ff7ce1a&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Result.vue?vue&type=template&id=5ff7ce1a& ***!
  \********************************************************************************************************************************************************************************************************************/
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
        "v-card",
        { staticClass: "mt-4", attrs: { flat: "" } },
        [
          _c("PlaylistMediaItem", {
            attrs: { mediaItems: _vm.playlistMediaItems }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);