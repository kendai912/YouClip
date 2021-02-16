(self["webpackChunkSrc"] = self["webpackChunkSrc"] || []).push([["js/mypage"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Mypage.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Mypage.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
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
 // import MyList from "../components/MyList.vue";

var MyList = function MyList() {
  return __webpack_require__.e(/*! import() */ "resources_assets_js_components_MyList_vue").then(__webpack_require__.bind(__webpack_require__, /*! ../components/MyList.vue */ "./resources/assets/js/components/MyList.vue"));
}; // import MyProfile from "../components/MyProfile.vue";



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  metaInfo: function metaInfo() {
    return {
      title: "マイページ - YouClip",
      meta: [{
        name: "description",
        content: "YouTube動画のまとめ作成ツール、YouClipのマイページです。YouTube動画からお気に入りの場面を切り抜いて作ったまとめを確認・編集出来ます。また、いいねしたみんなのまとめも見ることが出来ます。"
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
        content: "マイページ - YouClip"
      }, {
        property: "og:description",
        content: "YouTube動画のまとめ作成ツール、YouClipのマイページです。YouTube動画からお気に入りの場面を切り抜いて作ったまとめを確認・編集出来ます。また、いいねしたみんなのまとめも見ることが出来ます。"
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
    MyList: MyList // MyProfile,

  },
  props: {},
  mixins: [_util__WEBPACK_IMPORTED_MODULE_0__.default],
  methods: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapMutations)({})),
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)({
    isLogin: "auth/check"
  })),
  created: function created() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false); //リンク先の検索結果ページを初期化

    this.$store.commit("search/setTagVideoResult", null);
    this.$store.commit("search/setPlaylistTagResult", null);
  }
});

/***/ }),

/***/ "./resources/assets/js/pages/Mypage.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/assets/js/pages/Mypage.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Mypage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Mypage.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Mypage.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Mypage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/pages/Mypage.vue?vue&type=template&id=6634fd90&":
/*!*****************************************************************************!*\
  !*** ./resources/assets/js/pages/Mypage.vue?vue&type=template&id=6634fd90& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Mypage_vue_vue_type_template_id_6634fd90___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Mypage_vue_vue_type_template_id_6634fd90___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Mypage_vue_vue_type_template_id_6634fd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Mypage.vue?vue&type=template&id=6634fd90& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Mypage.vue?vue&type=template&id=6634fd90&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Mypage.vue?vue&type=template&id=6634fd90&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/pages/Mypage.vue?vue&type=template&id=6634fd90& ***!
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
    { staticClass: "container--small full-height" },
    [
      _vm.isLogin
        ? _c("div", [_c("MyList")], 1)
        : _c(
            "v-card",
            {
              staticClass: "text-center pa-3 ma-3 body-color",
              attrs: { title: "", elevation: "0" }
            },
            [
              _c(
                "v-card-title",
                { staticClass: "pa-0 ma-0 justify-center" },
                [
                  _c(
                    "v-icon",
                    { staticClass: "pa-0 ma-0", attrs: { size: "100" } },
                    [_vm._v("video_library")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-title",
                { staticClass: "pa-1 mt-2 mx-0 justify-center" },
                [
                  _c("h1", { staticClass: "font17pt" }, [
                    _vm._v("ログインが必要です")
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "v-card-subtitle",
                { staticClass: "subtitle-1 pa-1 mt-0 mx-0 black--text" },
                [
                  _vm._v(
                    "ログインすると、自分の作成した＆いいねしたまとめにアクセス出来ます"
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "v-card-actions",
                { staticClass: "justify-center pa-1 mt-4 mx-2" },
                [
                  _c(
                    "v-container",
                    { staticClass: "ma-0 pa-0" },
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
                                width: "300px",
                                height: "45px",
                                color: "green lighten-1",
                                to: "/login"
                              }
                            },
                            [_vm._v("ログイン")]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        {
                          staticClass: "ma-0 pa-0 justify-center",
                          staticStyle: { height: "70px" },
                          attrs: { align: "center" }
                        },
                        [
                          _c("v-col", { staticClass: "ma-0 pa-0" }, [
                            _c("div", {
                              staticStyle: {
                                height: "1px",
                                "background-color":
                                  "rgba(var(--b38,219,219,219),1)"
                              }
                            })
                          ]),
                          _vm._v(" "),
                          _c(
                            "v-col",
                            {
                              staticClass: "ma-0 pa-0 text-center",
                              attrs: { cols: "7" }
                            },
                            [
                              _c(
                                "v-card-text",
                                {
                                  staticStyle: {
                                    "font-size": "12px !important"
                                  }
                                },
                                [_vm._v("はじめての方はこちら")]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-col", { staticClass: "ma-0 pa-0" }, [
                            _c("div", {
                              staticStyle: {
                                height: "1px",
                                "background-color":
                                  "rgba(var(--b38,219,219,219),1)"
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
                                width: "300px",
                                height: "45px",
                                outlined: "",
                                color: "green lighten-1",
                                to: "/register"
                              }
                            },
                            [_vm._v("新規登録")]
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

/***/ "./resources/assets/js/pages/Mypage.vue":
/*!**********************************************!*\
  !*** ./resources/assets/js/pages/Mypage.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Mypage_vue_vue_type_template_id_6634fd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mypage.vue?vue&type=template&id=6634fd90& */ "./resources/assets/js/pages/Mypage.vue?vue&type=template&id=6634fd90&");
/* harmony import */ var _Mypage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Mypage.vue?vue&type=script&lang=js& */ "./resources/assets/js/pages/Mypage.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/VBtn.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/VCard.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/VCol.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/VContainer.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/VIcon.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/VRow.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Mypage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Mypage_vue_vue_type_template_id_6634fd90___WEBPACK_IMPORTED_MODULE_0__.render,
  _Mypage_vue_vue_type_template_id_6634fd90___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */
;










_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__.default,VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__.default,VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__.VCardActions,VCardSubtitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__.VCardSubtitle,VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__.VCardText,VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__.VCardTitle,VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__.default,VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__.default,VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_9__.default,VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_10__.default})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/pages/Mypage.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ })

}]);