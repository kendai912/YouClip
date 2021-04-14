<template>
  <v-dialog v-if="!isFinished" v-model="boardal" persistent max-width="700px">
    <v-card flat>
      <v-window v-model="onboarding">
        <v-window-item v-for="n in length" :key="`card-${n}`">
          <v-card color="transparent">
            <v-row
              class="fill-height px-3"
              align="center"
              justify="center"
              width="100%"
              v-if="onboarding == 0"
            >
              <v-col class="ma-0 pa-0">
                <v-row class="ma-2 mt-4 pa-0" align="center" justify="center">
                  <span class="fz-17 font-weight-black"
                    >YouClipへようこそ！</span
                  >
                </v-row>
                <v-row
                  class="ma-2 pa-0 text-center"
                  align="center"
                  justify="center"
                >
                  <span class="fz-14"
                    >YouTube動画の"お気に入りの場面"を切り抜こう</span
                  >
                </v-row>
                <v-row class="ma-2 pa-0" align="center" justify="center">
                  <v-img
                    src="/storage/imgs/YouClip-Onboarding1.png"
                    max-width="400px"
                    width="100%"
                    alt="YouClip Onboarding1"
                  />
                </v-row>
              </v-col>
            </v-row>

            <v-row
              class="fill-height px-3"
              align="center"
              justify="center"
              width="100%"
              v-if="onboarding == 1"
            >
              <v-col class="ma-0 pa-0">
                <v-row class="ma-2 mt-4 pa-0" align="center" justify="center">
                  <span class="fz-17 font-weight-black">こんな時に便利</span>
                </v-row>
                <v-row class="ma-2 pa-0" align="center" justify="center">
                  <v-col
                    class="ma-0 pa-2"
                    v-for="({ img, title }, i) in features"
                    :key="i"
                    cols="12"
                    md="4"
                    lg="4"
                    xl="4"
                  >
                    <v-card
                      class="ma-0 pa-0 text-center justify-center"
                      justify-center
                      flat
                    >
                      <v-img
                        v-bind:src="img"
                        class="pa-0 ma-0"
                        v-bind:alt="title"
                        v-bind:class="{ maxhight115px: isMobile }"
                        contain
                      />
                      <span class="pa-0 ma-0 fz-14">{{ title }}</span>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row
              class="fill-height px-3"
              align="center"
              justify="center"
              width="100%"
              v-if="onboarding == 2"
            >
              <v-col>
                <v-row align="center" justify="center">
                  <v-col class="ma-0 pa-0">
                    <v-row
                      class="ma-2 mt-4 pa-0"
                      align="center"
                      justify="center"
                    >
                      <span class="fz-17 font-weight-black"
                        >切り抜き方は簡単</span
                      >
                    </v-row>
                    <v-row class="ma-2 pa-0" align="center" justify="center">
                      <v-carousel
                        cycle
                        interval="8000"
                        height="290px"
                        progress
                        progress-color="grey"
                        hide-delimiters
                      >
                        <v-carousel-item
                          v-for="({ img, text }, i) in howToImgs"
                          :key="i"
                        >
                          <v-row
                            align="center"
                            justify="center"
                            class="ma-0 pa-0 pt-2"
                          >
                            <v-col class="ma-0 pa-0">
                              <v-row
                                align="center"
                                justify="center"
                                class="ma-0 pa-0 pt-2"
                              >
                                <span class="fz-14" style="color: black; ">{{
                                  text
                                }}</span>
                              </v-row>
                              <v-row
                                align="center"
                                justify="center"
                                class="ma-0 pa-0 pt-2"
                              >
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
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-window-item>
      </v-window>

      <v-card-actions class="justify-space-between">
        <v-container>
          <v-row align="center" justify="center">
            <v-checkbox
              v-if="onboarding == 2"
              v-model="notShowBoarding"
              class="small-checkbox ma-0 pa-0"
              label="今後表示しない"
              style="height: 30px; "
              dense
            ></v-checkbox>
          </v-row>
          <v-row>
            <v-btn v-if="onboarding !== 0" text @click="prev">
              戻る
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" depressed @click="next">
              <span v-if="onboarding !== 2">次へ</span
              ><span v-else>使ってみる</span>
            </v-btn>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  components: {},
  data() {
    return {
      boardal: true,
      length: 3,
      onboarding: 0,
      notShowBoarding: false,
      isFinished: false,
      isMobile: false,
      features: [
        {
          img: "/storage/imgs/userguide-save.png",
          title: "動画の一部をあとで見返したい",
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
  props: {},
  mixins: [myMixin],
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({
      setShowFooterTour: "onboarding/setShowFooterTour",
    }),
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
    next() {
      if (this.onboarding == 2) {
        if (this.notShowBoarding) {
          localStorage.setItem("notShowBoarding", JSON.stringify(true));
        }
        this.setShowFooterTour(true);
        this.isFinished = true;
      } else {
        this.onboarding =
          this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
      }
    },
  },
  watch: {},
  created() {
    this.isMobile = this.mobileCheck();
  },
  beforeDestroy() {},
};
</script>
