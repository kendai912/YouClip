<template>
  <div class="container--small full-height">
    <div v-if="isLogin">
      <MyProfile />
      <MyList />
    </div>
    <v-card v-else class="text-center pa-3 ma-3 body-color" title elevation="0">
      <v-card-title class="pa-0 ma-0 justify-center">
        <v-icon class="pa-0 ma-0" size="100">video_library</v-icon>
      </v-card-title>
      <v-card-title class="pa-1 mt-2 mx-0 justify-center"
        ><h1 class="fz-17">{{ $t("MyPage.needLogin") }}</h1></v-card-title
      >
      <v-card-subtitle class="subtitle-1 pa-1 mt-0 mx-0 black--text">{{
        $t("MyPage.ableToAccessYourClips")
      }}</v-card-subtitle>
      <v-card-actions class="justify-center pa-1 mt-4 mx-2">
        <v-container class="ma-0 pa-0">
          <v-row class="ma-0 pa-0 justify-center">
            <v-btn
              width="300px"
              height="45px"
              color="primary darken-2"
              class="white--text"
              to="/login"
              style="font-size: 14px; "
              >{{ $t("MyPage.login") }}</v-btn
            >
          </v-row>
          <v-row
            class="ma-0 pa-0 justify-center"
            align="center"
            style="height: 70px;"
          >
            <v-col class="ma-0 pa-0">
              <div
                style="height: 1px; background-color: rgba(var(--b38,219,219,219),1)"
              ></div>
            </v-col>
            <v-col class="ma-0 pa-0 text-center" cols="7">
              <v-card-text style="font-size: 12px !important;">{{
                $t("MyPage.forNewUser")
              }}</v-card-text>
            </v-col>
            <v-col class="ma-0 pa-0">
              <div
                style="height: 1px; background-color: rgba(var(--b38,219,219,219),1)"
              ></div>
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0 justify-center">
            <v-btn
              width="300px"
              height="45px"
              outlined
              color="primary darken-2"
              class="white--text"
              to="/register"
              style="font-size: 14px;"
              >{{ $t("MyPage.signup") }}</v-btn
            >
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import MyList from "../components/MyList.vue";
import MyProfile from "../components/MyProfile.vue";
import myMixin from "../util";

export default {
  metaInfo() {
    return {
      title: this.$t("MyPage.MetaInfo.title"),
      meta: [
        {
          name: "description",
          content: this.$t("MyPage.MetaInfo.description"),
        },
        {
          property: "og:site_name",
          content: "YouClip",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: "https://youclip.jp" + this.$route.fullPath,
        },
        {
          property: "og:title",
          content: this.$t("MyPage.MetaInfo.title"),
        },
        {
          property: "og:description",
          content: this.$t("MyPage.MetaInfo.description"),
        },
        {
          property: "og:image",
          content:
            "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png",
        },
      ],
      link: [
        { rel: "canonical", href: "https://youclip.jp" + this.$route.path },
        {
          rel: "alternate",
          hreflang: "en",
          href: "https://youclip.jp" + this.$route.path + "?hl=en",
        },
        {
          rel: "alternate",
          hreflang: "ja",
          href: "https://youclip.jp" + this.$route.path + "?hl=ja",
        },
      ],
    };
  },
  components: {
    MyList,
    MyProfile,
  },
  props: {},
  mixins: [myMixin],
  methods: {
    ...mapMutations({}),
  },
  computed: {
    ...mapGetters({
      isLogin: "auth/check",
    }),
  },
  created() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);

    //リンク先の検索結果ページを初期化
    this.$store.commit("search/setTagVideoResult", null);
    this.$store.commit("search/setPlaylistTagResult", null);
  },
};
</script>
