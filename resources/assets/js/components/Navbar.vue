<template>
  <v-app-bar color="white" dense class="my-app-bar">
    <v-container v-show="isActive" class="ma-0 pa-0 text-center my-full-bar">
      <v-row class="ma-0 pa-0" align="center">
        <div class="mr-2 pa-0 text-center">
          <!-- <v-icon v-on:click="back">mdi-arrow-left</v-icon> -->
          <v-icon v-on:click="search">search</v-icon>
        </div>
        <div class="ma-0 pa-0 my-autocomplete">
          <v-autocomplete
            v-model="model"
            ref="autocomplete"
            v-bind:items="items"
            v-bind:search-input.sync="searchquery"
            v-on:keydown.enter="search"
            placeholder="クリップとシーンを検索"
            item-text="value"
            item-value="value"
            cache-items
            hide-no-data
            clearable
            dense
          >
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
              <template v-else>
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
            </template>
          </v-autocomplete>
        </div>
        <div class="ml-2 pa-0 text-center">
          <span v-on:click="cancel_search" class="my-search-span"
            >キャンセル</span
          >
        </div>
      </v-row>
    </v-container>
    <template v-if="!isActive">
      <v-toolbar-items>
        <router-link to="/">
          <img
            src="/storage/logos/youclip_logo.png"
            style="
              position: absolute;
              height: 58%;
              top: 21%;
              left: 16px;
              object-fit: contain;
            "
          />
        </router-link>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-icon v-on:click="search" class="mr-5">search</v-icon>
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
            <i
              v-on="on"
              class="fas fa-user-circle fa-2x"
              style="color: grey"
            ></i>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <router-link class="button button--link" to="/login"
                  >ログイン</router-link
                >
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <router-link class="button button--link" to="/register"
                  >新規登録</router-link
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SearchBox from "./SearchBox.vue";

export default {
  data() {
    return {
      isActive: false,
      model: null,
      searchquery: null,
    };
  },
  components: {
    SearchBox,
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      if (this.apiStatus) {
        this.$router.push("/login");
      }
    },
    search(event) {
      // 日本語入力中のEnterキー操作は無効にする
      if (event.keyCode != undefined && event.keyCode !== 13) return;

      //空欄だった場合は検索実行せずリターン
      this.isActive = true;
      this.$nextTick(() => {
        this.$refs.autocomplete.focus();
        this.$refs.autocomplete.isMenuActive = true; // open item list
      });
      // setTimeout(() => {
      // }, 0);
    },
    back() {
      this.$router.push("/home");
    },
    cancel_search() {
      this.isActive = false;
    },
  },
  computed: {
    ...mapGetters({
      username: "auth/username",
    }),
    ...mapState({
      apiStatus: (state) => state.auth.apiStatus,
    }),
    ...mapGetters({
      isLogin: "auth/check",
    }),
    //検索候補
    ...mapGetters({
      searchCandidates: "search/searchCandidates",
    }),
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
  watch: {
    async searchquery(input) {
      // Items have already been requested
      if (this.isLoading) return;

      //入力を元に検索候補を取得
      await this.$store.dispatch("search/getSearchCandidates", input);
    },
  },
  async created() {
    await this.$store.dispatch("search/getSearchCandidates");
  },
};
</script>
