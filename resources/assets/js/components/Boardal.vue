<template>
  <v-dialog v-if="!isFinished" v-model="boardal" max-width="700px">
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
                  <span class="fz-17 font-weight-black">{{
                    $t("Bordal.welcomeToYouClip")
                  }}</span>
                </v-row>
                <v-row
                  class="ma-2 pa-0 text-center"
                  align="center"
                  justify="center"
                >
                  <span class="fz-14">{{
                    $t("Bordal.letsClipFavoriteScenes")
                  }}</span>
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
                  <span class="fz-17 font-weight-black">{{
                    $t("Bordal.usefulInSuchCases")
                  }}</span>
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
                        v-bind:class="{ maxheight104px: isMobile }"
                        contain
                      />
                      <span class="pa-0 ma-0 fz-14">{{ title }}</span>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <!-- <v-row
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
            </v-row> -->
          </v-card>
        </v-window-item>
      </v-window>

      <v-card-actions class="justify-space-between">
        <v-container>
          <v-row align="center" justify="center">
            <v-checkbox
              v-if="onboarding == 1"
              v-model="notShowBoarding"
              class="small-checkbox ma-0 pa-0"
              v-bind:label="$t('Bordal.noPromptMeAgain')"
              style="height: 30px; "
              dense
            ></v-checkbox>
          </v-row>
          <v-row>
            <v-btn v-if="onboarding !== 0" text @click="prev">
              {{ $t("Bordal.return") }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" depressed @click="next">
              <span v-if="onboarding !== 1">{{ $t("Bordal.next") }}</span
              ><span v-else>{{ $t("Bordal.use") }}</span>
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
      length: 2,
      onboarding: 0,
      notShowBoarding: false,
      isFinished: false,
      isMobile: false,
      features: [
        {
          img: "/storage/imgs/userguide-save.png",
          title: this.$t("Bordal.data.repeatScene"),
        },
        {
          img: "/storage/imgs/userguide-share.png",
          title: this.$t("Bordal.data.shareScene"),
        },
        {
          img: "/storage/imgs/userguide-collect.png",
          title: this.$t("Bordal.data.collectScene"),
        },
      ],
      howToImgs: [
        {
          img: "/storage/imgs/YouClip-Onboarding2-1.png",
          text: this.$t("Bordal.data.searchYtVideo"),
        },
        {
          img: "/storage/imgs/YouClip-Onboarding2-2.png",
          text: this.$t("Bordal.data.specifyTime"),
        },
        {
          img: "/storage/imgs/YouClip-Onboarding2-3.png",
          text: this.$t("Bordal.data.confirmScene"),
        },
        {
          img: "/storage/imgs/YouClip-Onboarding2-4.png",
          text: this.$t("Bordal.data.inputTitle"),
        },
        {
          img: "/storage/imgs/YouClip-Onboarding2-5.png",
          text: this.$t("Bordal.data.complete"),
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
      if (this.onboarding == 1) {
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
