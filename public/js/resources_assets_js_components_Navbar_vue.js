(self["webpackChunkSrc"] = self["webpackChunkSrc"] || []).push([["resources_assets_js_components_Navbar_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Navbar.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Navbar.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      model: null
    };
  },
  computed: _objectSpread(_objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)({
    username: "auth/username",
    isLogin: "auth/check",
    searchCandidates: "search/searchCandidates",
    isActiveSearch: "navbar/isActiveSearch",
    searchquery: "navbar/searchquery"
  })), (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapState)({
    apiStatus: function apiStatus(state) {
      return state.auth.apiStatus;
    }
  })), {}, {
    searchquery: {
      get: function get() {
        return this.$store.getters["navbar/searchquery"];
      },
      set: function set(val) {
        this.$store.commit("navbar/setSearchquery", val);
      }
    },
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
    search: function search(event) {
      //検索バーを表示
      this.$store.commit("navbar/setIsActiveSearch", true); // 日本語入力中のEnterキー操作は無効にする

      if (event.keyCode != undefined && event.keyCode !== 13) return; //検索ワードが空の場合も無効にする

      if (!this.searchquery || !this.searchquery.match(/\S/g)) return; //検索ワードをセットし検索結果を表示

      this.$store.commit("search/setSearchQuery", this.searchquery);
      this.$store.commit("search/searchResultPageTransit"); //インクリメンタルサーチの表示を消すためフォーカスを外す

      this.$refs.searchInputBox.blur();
    },
    cancelSearch: function cancelSearch() {
      this.$store.commit("navbar/setIsActiveSearch", false);
    }
  },
  created: function created() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this2.$store.dispatch("search/getSearchCandidates");

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

/***/ "./resources/assets/js/components/Navbar.vue":
/*!***************************************************!*\
  !*** ./resources/assets/js/components/Navbar.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Navbar_vue_vue_type_template_id_cadbadf2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navbar.vue?vue&type=template&id=cadbadf2& */ "./resources/assets/js/components/Navbar.vue?vue&type=template&id=cadbadf2&");
/* harmony import */ var _Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navbar.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/Navbar.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Navbar_vue_vue_type_template_id_cadbadf2___WEBPACK_IMPORTED_MODULE_0__.render,
  _Navbar_vue_vue_type_template_id_cadbadf2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/Navbar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/Navbar.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/assets/js/components/Navbar.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Navbar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Navbar.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/assets/js/components/Navbar.vue?vue&type=template&id=cadbadf2&":
/*!**********************************************************************************!*\
  !*** ./resources/assets/js/components/Navbar.vue?vue&type=template&id=cadbadf2& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_template_id_cadbadf2___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_template_id_cadbadf2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Navbar_vue_vue_type_template_id_cadbadf2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Navbar.vue?vue&type=template&id=cadbadf2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Navbar.vue?vue&type=template&id=cadbadf2&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Navbar.vue?vue&type=template&id=cadbadf2&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/Navbar.vue?vue&type=template&id=cadbadf2& ***!
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
    "v-app-bar",
    { staticClass: "my-app-bar", attrs: { color: "white", dense: "" } },
    [
      _c(
        "v-container",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isActiveSearch,
              expression: "isActiveSearch"
            }
          ],
          staticClass: "ma-0 pa-0 text-center my-full-bar"
        },
        [
          _c(
            "v-row",
            { staticClass: "ma-0 pa-0", attrs: { align: "center" } },
            [
              _c("v-row", { class: { activeSearch: _vm.isActiveSearch } }, [
                _c(
                  "div",
                  { staticClass: "mr-2 pa-0 text-center" },
                  [
                    _c(
                      "v-icon",
                      { attrs: { size: "37" }, on: { click: _vm.search } },
                      [_vm._v("search")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "ma-0 pa-0 my-autocomplete" },
                  [
                    _c("v-combobox", {
                      ref: "searchInputBox",
                      staticClass: "ma-0 pa-0",
                      attrs: {
                        items: _vm.items,
                        "search-input": _vm.searchquery,
                        placeholder: "YouTubeまとめを検索",
                        "item-text": "value",
                        "item-value": "value",
                        "cache-items": "",
                        "hide-no-data": "",
                        clearable: "",
                        dense: "",
                        attach: "#searchDropdown"
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
                          return _vm.search($event)
                        }
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "item",
                          fn: function(data) {
                            return [
                              _c(
                                "v-list-item-icon",
                                { staticClass: "mr-4" },
                                [
                                  _c("v-icon", [_vm._v(_vm._s(data.item.icon))])
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-item-content",
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
                                      alt: "search"
                                    }
                                  })
                                ],
                                1
                              )
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
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "ml-4 ma-0 pa-0 text-center grey--text text--darken-3"
                },
                [
                  _c(
                    "span",
                    {
                      staticClass: "my-search-span",
                      on: { click: _vm.cancelSearch }
                    },
                    [_vm._v("キャンセル")]
                  )
                ]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      !_vm.isActiveSearch
        ? [
            _c(
              "v-toolbar-items",
              [
                _c("router-link", { attrs: { to: "/" } }, [
                  _c("img", {
                    staticStyle: {
                      position: "absolute",
                      height: "58%",
                      top: "21%",
                      left: "8px",
                      "object-fit": "contain"
                    },
                    attrs: {
                      src: "/storage/logos/youclip_logo.png",
                      alt: "YouClip logo",
                      loading: "lazy"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "p",
                    { staticClass: "leading-none text-gray-600 text-s" },
                    [
                      _vm._v(
                        "\n          | YouTube動画のまとめ作成ツール\n        "
                      )
                    ]
                  )
                ])
              ],
              1
            ),
            _vm._v(" "),
            _c("v-spacer"),
            _vm._v(" "),
            _c("v-icon", { attrs: { size: "37" }, on: { click: _vm.search } }, [
              _vm._v("search")
            ]),
            _vm._v(" "),
            _c(
              "div",
              [
                _c("v-menu", {
                  attrs: { "offset-y": "" },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "activator",
                        fn: function(ref) {
                          var on = ref.on
                          return [
                            _c("router-link", { attrs: { to: "/userguide" } }, [
                              _c(
                                "i",
                                _vm._g(
                                  {
                                    staticClass: "fas fa-info-circle fa-2x",
                                    staticStyle: { color: "grey" }
                                  },
                                  on
                                )
                              )
                            ])
                          ]
                        }
                      }
                    ],
                    null,
                    false,
                    1003209317
                  )
                })
              ],
              1
            )
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);