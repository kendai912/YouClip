<template>
  <v-app-bar color="white" dense class="my-app-bar">
    <v-container
      v-show="isActiveSearch"
      class="ma-0 pa-0 text-center my-full-bar"
    >
      <v-row class="ma-0 pa-0" align="center">
        <v-row v-bind:class="{ activeSearch: isActiveSearch }">
          <div class="mr-2 pa-0 text-center">
            <v-icon v-on:click="search" size="37">search</v-icon>
          </div>
          <div class="ma-0 pa-0 my-autocomplete">
            <v-combobox
              v-model="model"
              v-bind:items="items"
              v-bind:search-input.sync="searchquery"
              v-on:keydown.enter="search"
              placeholder="YouTubeまとめを検索"
              item-text="value"
              item-value="value"
              cache-items
              hide-no-data
              clearable
              dense
              class="ma-0 pa-0"
              ref="searchInputBox"
              attach="#searchDropdown"
            >
              <template v-slot:item="data">
                <v-list-item-icon class="mr-4">
                  <v-icon>{{ data.item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.value"
                  ></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon style="min-width: 16px">
                  <v-img
                    src="/storage/icons/north_west.svg"
                    width="16px"
                    max-height="16px"
                  ></v-img>
                </v-list-item-icon>
              </template>
            </v-combobox>
          </div>
        </v-row>
        <div class="ml-4 ma-0 pa-0 text-center grey--text text--darken-3">
          <span v-on:click="cancelSearch" class="my-search-span"
            >キャンセル</span
          >
        </div>
      </v-row>
    </v-container>
    <template v-if="!isActiveSearch">
      <v-toolbar-items>
        <router-link to="/">
          <img
            src="/storage/logos/youclip_logo.png"
            style="
              position: absolute;
              height: 58%;
              top: 21%;
              left: 8px;
              object-fit: contain;
            "
          />
          <p class="leading-none text-gray-600 text-s">
            | YouTube動画のまとめ作成ツール
          </p>
        </router-link>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-icon v-on:click="search" size="37">search</v-icon>
      <div>
        <v-menu v-if="isLogin" offset-y>
          <template v-slot:activator="{ on }">
            <i
              v-on="on"
              class="fas fa-user-circle fa-2x"
              style="color: darkgreen"
            ></i>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title class="button button--link" v-on:click="logout"
                >ログアウト</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu v-else offset-y>
          <template v-slot:activator="{ on }">
            <router-link to="/userguide">
              <i
                v-on="on"
                class="fas fa-info-circle fa-2x"
                style="color: grey"
              ></i>
            </router-link>
          </template>
        </v-menu>
      </div>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      model: null,
    };
  },
  computed: {
    ...mapGetters({
      username: "auth/username",
      isLogin: "auth/check",
      searchCandidates: "search/searchCandidates",
      isActiveSearch: "navbar/isActiveSearch",
      searchquery: "navbar/searchquery",
    }),
    ...mapState({
      apiStatus: (state) => state.auth.apiStatus,
    }),
    searchquery: {
      get() {
        return this.$store.getters["navbar/searchquery"];
      },
      set(val) {
        this.$store.commit("navbar/setSearchquery", val);
      },
    },
    //過去の検索履歴と人気の検索履歴を履歴優先で合計7件までサジェストに表示
    items() {
      let items = [];
      let itemLimit = 7;
      let itemCount = 0;

      //過去の検索履歴をサジェストに追加
      if (this.searchCandidates["searchHistoryCandidates"])
        this.searchCandidates["searchHistoryCandidates"].forEach((value) => {
          if (itemCount++ < itemLimit) {
            let item = {
              icon: "history",
              value: value.searchQuery,
            };
            items.push(item);
          }
        });

      //人気の検索履歴をサジェストに追加
      if (this.searchCandidates["topSearchqueriesCandidates"])
        this.searchCandidates["topSearchqueriesCandidates"].forEach((value) => {
          if (itemCount++ < itemLimit) {
            let item = {
              icon: "search",
              value: value.searchquery.searchQuery,
            };
            items.push(item);
          }
        });
      return items;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      if (this.apiStatus) {
        this.$router.push("/login");
      }
    },
    search(event) {
      //検索バーを表示
      this.$store.commit("navbar/setIsActiveSearch", true);

      // 日本語入力中のEnterキー操作は無効にする
      if (event.keyCode != undefined && event.keyCode !== 13) return;

      //検索ワードが空の場合も無効にする
      if (!this.searchquery || !this.searchquery.match(/\S/g)) return;

      //検索ワードをセットし検索結果を表示
      this.$store.commit("search/setSearchQuery", this.searchquery);
      this.$store.commit("search/searchResultPageTransit");

      //インクリメンタルサーチの表示を消すためフォーカスを外す
      this.$refs.searchInputBox.blur();
    },
    back() {
      this.$router.push("/home");
    },
    cancelSearch() {
      this.$store.commit("navbar/setIsActiveSearch", false);
    },
  },
  async created() {
    await this.$store.dispatch("search/getSearchCandidates");
  },
};
</script>
