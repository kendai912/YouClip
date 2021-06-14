<template>
  <v-sheet
    class="ma-0 pa-0 highlight-header"
    height="56"
    elevation="0"
    align="center"
  >
    <v-container class="ma-0 pa-0" fluid fill-height>
      <v-row class="ma-0 pa-0" align="center" justify="center">
        <v-col v-if="showBackIcon" class="text-left ma-0 pa-0">
          <v-icon v-on:click="back" color="my-grey">mdi-chevron-left</v-icon>
        </v-col>

        <v-col class="ma-0 pa-0" cols="10">
          <v-row align="center" justify="center" class="ma-0 pa-0">
            <v-col class="ma-0 pa-0 text-center" cols="auto">
              <h1 style="font-size: 1rem; font-weight: normal">
                {{ headerMessage }}
              </h1>
            </v-col>
          </v-row>
          <v-row v-if="showSteps" class="ma-0 pa-0">
            <v-col class="ma-0 pa-0">
              <v-stepper v-model="step" class="elevation-0 pa-0 ma-0">
                <v-stepper-header class="pa-0 ma-0">
                  <v-stepper-step
                    :complete="(complete > 1 || step > 1) && step != 1"
                    step="1"
                    class="pa-0 ma-0"
                    height="30px"
                  >
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    :complete="(complete > 2 || step > 2) && step != 2"
                    step="2"
                    class="pa-0 ma-0"
                    height="30px"
                  >
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    :complete="(complete > 3 || step > 3) && step != 3"
                    step="3"
                    class="pa-0 ma-0"
                    height="30px"
                  >
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    :complete="complete > 4 || step > 4"
                    step="4"
                    class="pa-0 ma-0"
                    height="30px"
                  >
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    :complete="complete > 5 || step > 5"
                    step="5"
                    class="pa-0 ma-0"
                    height="30px"
                  >
                  </v-stepper-step>
                </v-stepper-header>
              </v-stepper>
            </v-col>
          </v-row>
        </v-col>

        <v-col v-if="showBackIcon" class="ma-0 pa-0"> </v-col>
      </v-row>
    </v-container>
    <v-progress-linear
      v-bind:active="loading"
      indeterminate
      absolute
      bottom
      color="primary accent-4"
    ></v-progress-linear>
    <v-divider></v-divider>
  </v-sheet>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isLogin: "auth/check",
      headerMessage: "highlightHeader/headerMessage",
      showSteps: "highlightHeader/showSteps",
      showBackIcon: "highlightHeader/showBackIcon",
      loading: "highlightHeader/loading",
      step: "highlightHeader/step",
      complete: "highlightHeader/complete",
      newPlaylistId: "playlist/newPlaylistId",
      playlistAndTagVideoData: "watch/playlistAndTagVideoData",
      playlistId: "watch/playlistId",
    }),
  },
  watch: {},
  methods: {
    ...mapMutations({
      setComplete: "highlightHeader/setComplete",
    }),
    back() {
      if (this.$route.path == "/highlight/thumbnail") {
        this.$router
          .push({
            path: "/highlight/title",
          })
          .catch((err) => {});
      } else if (this.$route.path == "/edit/thumbnail") {
        this.$router
          .push({
            path: "/editmyplaylist",
            query: {
              playlist: this.playlistId,
            },
          })
          .catch((err) => {});
      } else {
        this.$router.go(-1);
      }
    },
    //作成中のプレイリストDataを取得
    async loadSceneList() {
      await this.$store.dispatch(
        "watch/getPlaylistAndTagVideoDataById",
        this.newPlaylistId
      );
    },
  },
  async mounted() {
    //check if there is editing new playlist
    if (this.isLogin) {
      await this.$store.dispatch("playlist/getNewPlaylistId");
      if (this.newPlaylistId) {
        await this.loadSceneList();
        //作成中のプレイリストデータがあればcompleteを4に設定
        if (this.playlistAndTagVideoData?.tagVideoData?.length >= 1) {
          this.setComplete(4);
        } else {
          this.setComplete(1);
        }
      } else {
        this.setComplete(1);
      }
    }
  },
};
</script>
