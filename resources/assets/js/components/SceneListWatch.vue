<template>
  <div>
    <v-divider></v-divider>
    <v-expansion-panels v-model="panel" class="ma-0 pa-0">
      <v-expansion-panel class="ma-0 pa-0" key="panelScene">
        <v-expansion-panel-header
          v-bind:class="{
            sceneListExpansionPanelCustomHeader: panel !== 0,
            sceneListExpansionPanelCustomHeadermobileHight:
              panel !== 0 && isMobile,
          }"
          class="ma-0 pl-3 pr-2"
          id="panelScene"
        >
          <v-fade-transition leave-absolute>
            <span v-if="opened" key="0">
              まとめの場面一覧
            </span>
            <span v-else key="1">
              再生中の場面
            </span>
          </v-fade-transition>

          <div
            v-if="panel !== 0"
            v-bind:class="{
              sceneListExpansionPanelCustomHeaderContent: panel !== 0,
            }"
          >
            <v-container class="pa-0 ma-0">
              <v-row class="pa-0 ma-0">
                <v-col class="pa-0 ma-0">
                  <v-card
                    class="mx-auto my-1"
                    max-width="420"
                    v-if="panel !== 0"
                    elevation="0"
                  >
                    <v-row dense class="pa-0 ma-0">
                      <v-col class="px-0">
                        <v-row class="ma-0">
                          <v-col cols="1" class="pa-0 ma-auto text-center">
                            {{ parseInt(listIndex) + 1 }} {{ panel }}
                          </v-col>
                          <v-col cols="11" class="pa-0">
                            <v-row class="ma-0">
                              <v-col cols="6" class="pa-1 pl-0 pr-2">
                                <v-card
                                  class="ma-0 pa-0"
                                  aspect-ratio="calc(16 / 9)"
                                  elevation="0"
                                  width="100%"
                                  style="overflow: hidden;"
                                >
                                  <v-img
                                    class="white--text align-end rounded"
                                    v-bind:src="
                                      thumbStoragePath +
                                        mediaItems[listIndex].preview
                                    "
                                    lazy-src="/storage/imgs/dummy-image.jpg"
                                    height="100%"
                                    v-on:load="loaded"
                                  >
                                    <template v-slot:placeholder>
                                      <v-row
                                        class="fill-height ma-0"
                                        align="center"
                                        justify="center"
                                      >
                                        <v-progress-circular
                                          indeterminate
                                          color="grey lighten-5"
                                        ></v-progress-circular>
                                      </v-row>
                                    </template>
                                  </v-img>
                                </v-card>
                              </v-col>

                              <v-col cols="6" class="pa-1 pl-0 pr-2 py-0">
                                <div
                                  class="px-0 py-0 pt-1"
                                  style="display: flex; flex-wrap: nowrap; align-items: flex-start;"
                                >
                                  <div
                                    style="font-size: 20px; color:red; max-height: 18px;"
                                  >
                                    <i
                                      class="fab fa-youtube"
                                      style="vertical-align: top;"
                                    ></i>
                                  </div>
                                  <div class="block-playlist-title">
                                    <span style="vertical-align: middle;">{{
                                      mediaItems[listIndex].title
                                    }}</span>
                                  </div>
                                </div>

                                <div
                                  class="green--text text--darken-2 pt-1"
                                  style="font-size: 12px; padding-left: 0; font-weight: bold"
                                >
                                  <span>{{ mediaItems[listIndex].start }}</span>
                                  <span style="font-size:8px;">-</span>
                                  <span
                                    >{{ mediaItems[listIndex].end }}の場面</span
                                  >
                                </div>

                                <div
                                  class="horizontal-list-wrap block-chip-lines3 color-black mt-2 mb-0"
                                >
                                  <v-chip
                                    v-for="(tag, tagIndex) in readMore(
                                      mediaItems[listIndex].tagArray
                                    )"
                                    v-show="tag"
                                    v-bind:key="
                                      mediaItems[listIndex].id + '-' + tagIndex
                                    "
                                    class="my-tag-chip pr-2"
                                    text-color="black"
                                    style="font-weight: normal; border-color:#bdbdbd;"
                                    outlined
                                    small
                                  >
                                    {{ tag }}
                                  </v-chip>
                                </div>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row
            v-for="(item, index) in mediaItems"
            v-bind:key="item.category + '-' + item.id"
            class="pa-0 ma-0"
          >
            <v-col class="pa-0 ma-0">
              <div
                v-bind:class="
                  listIndex == index && opened ? `green lighten-5` : ``
                "
              >
                <v-card
                  class="mx-auto my-1"
                  max-width="420"
                  elevation="0"
                  color="transparent"
                >
                  <v-row dense class="pa-0 ma-0">
                    <v-col class="px-0">
                      <v-row class="ma-0">
                        <v-col cols="1" class="pa-0 ma-auto text-center">
                          <span v-show="opened">{{ index + 1 }}</span>
                        </v-col>
                        <v-col cols="11" class="pa-0">
                          <v-row class="ma-0">
                            <v-col cols="6" class="pa-1 pl-0 pr-2">
                              <v-card
                                class="ma-0 pa-0"
                                aspect-ratio="calc(16 / 9)"
                                elevation="0"
                                style="overflow: hidden;"
                              >
                                <v-img
                                  v-on:click.stop="select(index)"
                                  class="white--text align-end rounded"
                                  v-bind:src="thumbStoragePath + item.preview"
                                  v-bind:alt="item.title"
                                  lazy-src="/storage/imgs/dummy-image.jpg"
                                  height="100%"
                                  style="z-index: 1;"
                                >
                                  <template v-slot:placeholder>
                                    <v-row
                                      class="fill-height ma-0"
                                      align="center"
                                      justify="center"
                                    >
                                      <v-progress-circular
                                        indeterminate
                                        color="grey lighten-5"
                                      ></v-progress-circular>
                                    </v-row>
                                  </template>
                                </v-img>
                              </v-card>
                            </v-col>
                            <v-col cols="6" class="pa-1 pl-0 pr-2 py-0">
                              <div
                                v-on:click.stop="select(index)"
                                class="px-0 py-0 pt-1"
                                style="display: flex; flex-wrap: nowrap; align-items: flex-start;"
                              >
                                <div
                                  style="font-size: 20px; color:red; max-height: 18px;"
                                >
                                  <i
                                    class="fab fa-youtube"
                                    style="vertical-align: top;"
                                  ></i>
                                </div>
                                <div class="block-playlist-title">
                                  <span
                                    v-show="opened"
                                    style="vertical-align: middle;"
                                    >{{ item.title }}</span
                                  >
                                </div>
                              </div>

                              <div
                                class="green--text text--darken-2 pt-1"
                                style="font-size: 12px; padding-left: 0; font-weight: bold"
                                v-on:click.stop="select(index)"
                              >
                                <span v-show="opened">{{ item.start }}</span>
                                <span v-show="opened" style="font-size:8px;"
                                  >-</span
                                >
                                <span v-show="opened"
                                  >{{ item.end }}の場面</span
                                >
                              </div>

                              <div
                                class="horizontal-list-wrap block-chip-lines3 color-black mt-2 mb-0"
                                v-on:click.stop="select(index)"
                              >
                                <v-chip
                                  v-for="(tag, tagIndex) in readMore(
                                    item.tagArray
                                  )"
                                  v-show="tag"
                                  v-bind:key="
                                    mediaItems[listIndex].id + '-' + tagIndex
                                  "
                                  class="my-tag-chip pr-2 py-0"
                                  text-color="black"
                                  style="font-weight: normal; border-color:#bdbdbd;"
                                  outlined
                                  small
                                >
                                  {{ tag }}
                                </v-chip>
                              </div>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  data() {
    return {
      panel: 0,
      isMobile: false,
      opened: true,
    };
  },
  props: {
    mediaItems: Array,
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      listIndex: "watch/listIndex",
      playlistId: "watch/playlistId",
    }),
  },
  watch: {
    panel() {
      if (this.panel !== 0) {
        this.loaded();
      } else {
        $(".sceneListExpansionPanelCustomHeader").height("auto");
      }
    },
  },
  methods: {
    select(index) {
      //選択した場面を再生
      this.$emit("playPlaylist", index);
    },
    readMore(arrayData) {
      let newArray = [];
      if (arrayData.length > 2) {
        for (var i = 0; i < 2; i++) {
          newArray.push(arrayData[i]);
        }
        return newArray;
      } else {
        return arrayData;
      }
    },
    loaded() {
      let self = this;
      setTimeout(function() {
        let outterHeight = $(".sceneListExpansionPanelCustomHeader").height();
        let innerHeight = $(
          ".sceneListExpansionPanelCustomHeaderContent"
        ).height();

        if (outterHeight + 32 < innerHeight + 48) {
          if (self.isMobile) {
            $(".sceneListExpansionPanelCustomHeadermobileHight").height(144);
          } else {
            $(".sceneListExpansionPanelCustomHeader").height(176);
          }
        } else {
          if (self.isMobile) {
            $(".sceneListExpansionPanelCustomHeadermobileHight").height(128);
          } else {
            $(".sceneListExpansionPanelCustomHeader").height(152);
          }
        }
      }, 100);
    },
  },
  filters: {
    formatTime: function(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
  created() {
    this.isMobile = this.mobileCheck();

    let self = this;
    this.$nextTick(() => {
      $("#panelScene").on("click", function(e) {
        self.opened = !self.opened;
      });
    });
  },
};
</script>
