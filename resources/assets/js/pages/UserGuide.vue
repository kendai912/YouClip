<template>
  <div class="container--small">
    <section id="hero">
      <div style="height: 80px; width: 100%">
        <img
          src="/storage/logos/youclip_logo.png"
          style="
              position: relative;
              height: 58%;
              top: 21%;
              left: 8px;
              object-fit: contain;
            "
            alt="YouClip logo"
        />
      </div>
      <v-row no-gutters>
        <v-container fill-height>
          <v-row align="center" class="mx-auto" justify="center">
            <v-col class="text-center" cols="12">
              <div style="margin-bottom: 64px;">
                <h2 class="font-weight-bold mb-3 userguideSectionTitle">
                  YouTube動画の<br />まとめ作成ツール
                </h2>
                <p
                  style="margin-top:24px;letter-spacing:1.6px; font-size: 20px;"
                >
                  YouTube動画の"お気に入りの<br />場面"を切り抜いてまとめよう
                </p>
              </div>

              <section class="gNIwkZ">
                <div style="position:relative;z-index:2" class="bzagnP">
                  <div>
                    <img
                      src="/storage/imgs/onboarding1.JPG"
                      alt="thumbnail"
                      style="position: relative; width: 122%; left: -32px; top: 30px;"
                    />
                  </div>
                </div>
              </section>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </section>

    <section id="features">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="font-weight-bold mb-3 userguideSectionTitle">
          こんな時に便利
        </h2>

        <v-responsive class="mx-auto mb-6" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-row>
          <v-col
            v-for="({ img, title }, i) in features"
            :key="i"
            cols="12"
            md="4"
          >
            <v-card class="py-12 px-1" flat>
              <v-theme-provider dark>
                <div>
                  <img v-bind:src="img" style="width:100%" class="pa-0 ma-0" v-bind:alt="title" />
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
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="font-weight-bold mb-3 userguideSectionTitle">
          まとめ方は簡単
        </h2>

        <v-responsive class="mx-auto mb-8" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive
          class="mx-auto title font-weight-light mb-8"
          max-width="720"
        >
          YouTubeの動画を検索して、切り抜く時間とタイトルを入力
        </v-responsive>

        <v-carousel cycle interval="5000" height="400" hide-delimiters>
          <v-carousel-item v-for="(img, i) in howToImgs" :key="i">
            <v-sheet color="white" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <img v-bind:src="img" style="height: 100%; " alt="How-to image" />
              </v-row>
            </v-sheet>
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
            "YouTube動画のまとめ作成ツール、YouClipの使い方紹介です。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。また、みんなが作った人気のまとめを見ることも可能です。",
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
          content: "使い方 - YouClip",
        },
        {
          property: "og:description",
          content:
            "YouTube動画のまとめ作成ツール、YouClipの使い方紹介です。ゲーム実況やVTuberの動画などから、お気に入りの場面の切り抜き集を誰でも簡単に作ることが出来ます。また、みんなが作った人気のまとめを見ることも可能です。",
        },
        {
          property: "og:image",
          content:
            "https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png",
        },
      ],
      link: [
        { rel: "canonical", href: "https://youclip.jp" + this.$route.path },
      ],
    };
  },
  components: {},
  data() {
    return {
      features: [
        {
          img: "/storage/imgs/onboarding2.png",
          title: "あとで動画の一部を見返したい",
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
        "/storage/imgs/HowTo1.JPG",
        "/storage/imgs/HowTo2.JPG",
        "/storage/imgs/HowTo3.JPG",
        "/storage/imgs/HowTo4.JPG",
        "/storage/imgs/HowTo5.JPG",
      ],
    };
  },
  mixins: [myMixin],
  methods: {},
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  created() {},
};
</script>
