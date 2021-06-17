<template>
  <div class="container--small">
    <v-row align="center" justify="center" class="ma-0 pa-0" no-gutters>
      <v-container fill-height>
        <v-row
          align="center"
          justify="center"
          class="ma-0 pa-0"
          style="width: 100%; "
        >
          <v-col class="text-center" cols="12">
            <h2 class="font-weight-bold mb-3 userguideSectionTitle">
              YouTube動画の見所切り抜き
            </h2>

            <v-row class="ma-2 pa-0" align="center" justify="center">
              <v-img
                src="/storage/imgs/YouClip-Onboarding1.png"
                width="100%"
                max-width="450px"
                alt="YouClip Onboarding1"
              />
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <section id="features">
      <div class="py-6"></div>

      <v-container class="text-center">
        <h2 class="font-weight-bold mb-2 userguideSectionTitle">
          こんな時に便利
        </h2>

        <v-row>
          <v-col
            v-for="({ img, title }, i) in features"
            :key="i"
            cols="12"
            md="4"
          >
            <v-card class="py-4 px-1" flat>
              <v-theme-provider dark>
                <div>
                  <v-lazy
                    v-model="isActive"
                    :options="{
                      threshold: 0.5,
                    }"
                    class="fill-height"
                  >
                    <img
                      v-bind:src="img"
                      style="width:100%"
                      class="pa-0 ma-0"
                      loading="lazy"
                      v-bind:alt="title"
                    />
                  </v-lazy>
                </div>
              </v-theme-provider>

              <v-card-title
                class="justify-center font-weight-black text-uppercase pa-0 ma-0"
                v-text="title"
                style="font-size: 16.5px !important;"
              ></v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section id="about-me">
      <div class="py-6"></div>

      <v-container class="text-center">
        <h2 class="font-weight-bold mb-2 userguideSectionTitle">
          切り抜き方は簡単
        </h2>

        <v-carousel cycle interval="8000" hide-delimiters height="290px">
          <v-carousel-item v-for="({ img, text }, i) in howToImgs" :key="i">
            <v-row align="center" justify="center" class="ma-0 pa-0 pt-2">
              <v-col class="ma-0 pa-0">
                <v-row align="center" justify="center" class="ma-0 pa-0 pt-2">
                  <span class="fz-14" style="color: black; ">{{ text }}</span>
                </v-row>
                <v-row align="center" justify="center" class="ma-0 pa-0 pt-2">
                  <v-img
                    v-bind:src="img"
                    alt="How-to image"
                    max-width="290"
                    contain
                  />
                </v-row>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-container>

      <div class="py-12"></div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import myMixin from "../util";

export default {
  metaInfo() {
    return {
      title: "使い方 - YouClip",
      meta: [
        {
          name: "description",
          content:
            "YouTube長時間動画の見所切り抜きサイト、YouClipの使い方紹介です。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜きを誰でも簡単に作ることが出来ます。また、みんなが作った人気の切り抜きを見ることも可能です。",
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
          content: "https://youclip.app" + this.$route.fullPath,
        },
        {
          property: "og:title",
          content: "使い方 - YouClip",
        },
        {
          property: "og:description",
          content:
            "YouTube長時間動画の見所切り抜きサイト、YouClipの使い方紹介です。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜きを誰でも簡単に作ることが出来ます。また、みんなが作った人気の切り抜きを見ることも可能です。",
        },
        {
          property: "og:image",
          content:
            "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png",
        },
      ],
      link: [
        { rel: "canonical", href: "https://youclip.app" + this.$route.path },
        {
          rel: "alternate",
          hreflang: "en",
          href: "https://youclip.app" + this.$route.path + "?hl=en",
        },
        {
          rel: "alternate",
          hreflang: "ja",
          href: "https://youclip.app" + this.$route.path + "?hl=ja",
        },
      ],
    };
  },
  components: {},
  data() {
    return {
      isActive: false,
      features: [
        {
          img: "/storage/imgs/userguide-save.png",
          title: "動画の一部を繰り返し見返したい",
        },
        {
          img: "/storage/imgs/userguide-share.png",
          title: "みんなに動画のある場面を共有したい",
        },
        {
          img: "/storage/imgs/userguide-collect.png",
          title: "色々な動画のお気に入りの場面を集めたい",
        },
      ],
      howToImgs: [
        {
          img: "/storage/imgs/YouClip-Onboarding2-1.png",
          text: "① YouTube動画を検索",
        },
        {
          img: "/storage/imgs/YouClip-Onboarding2-2.png",
          text: "② 切り抜く時間を指定",
        },
        {
          img: "/storage/imgs/YouClip-Onboarding2-3.png",
          text: "③ 切り抜いた場面を確認",
        },
        {
          img: "/storage/imgs/YouClip-Onboarding2-4.png",
          text: "④ タイトルを入力",
        },
        {
          img: "/storage/imgs/YouClip-Onboarding2-5.png",
          text: "⑤ 完成!!",
        },
      ],
    };
  },
  mixins: [myMixin],
  methods: {},
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    //ナビバーのデータをリセットし表示
    this.$store.commit("navbar/resetNavbar");
    this.$store.commit("navbar/setShowNavbar", true);
  },
  created() {},
};
</script>
