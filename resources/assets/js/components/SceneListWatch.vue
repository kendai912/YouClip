<template>
  <div>
    <v-divider></v-divider>
    <v-expansion-panels v-model="panel" class="ma-0 pa-0">
      <v-expansion-panel class="ma-0 pa-0">
        <v-expansion-panel-header
          v-bind:class="{ sceneListExpansionPanelCustomHeader: panel !== 0 }"
          class="ma-0 pl-3 pr-1"
        >
          <span class="ma-0 pa-0 pt-1">
            再生中の場面
          </span>

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
                          <v-col cols="1" class="pa-1 ma-auto text-center">
                            {{ parseInt(listIndex) + 1 }} {{ panel }}
                          </v-col>
                          <v-col cols="11" class="pa-0">
                            <v-row class="ma-0">
                              <v-col cols="6" class="pa-1">
                                <v-card
                                  class="ma-0 pa-0"
                                  aspect-ratio="calc(16 / 9)"
                                  elevation="0"
                                  width="100%"
                                  style="overflow: hidden;"
                                >
                                  <v-img
                                    v-on:click.stop="select(listIndex)"
                                    class="white--text align-end rounded"
                                    v-bind:src="
                                      thumbStoragePath +
                                        mediaItems[listIndex].preview
                                    "
                                    lazy-src="/storage/imgs/dummy-image.jpg"
                                    width="100%"
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

                              <v-col cols="6" class="pa-1 py-0">
                                <v-card-title
                                  v-on:click.stop="select(listIndex)"
                                  class="px-0 py-0"
                                  style="flex-wrap: nowrap; align-items: baseline;"
                                >
                                  <div
                                    style="width:16px; max-height:16px; color:red; margin-right:8px"
                                  >
                                    <i class="fab fa-youtube"></i>
                                  </div>
                                  <span
                                    class="block-playlist-title"
                                    style="font-size: 14px"
                                    >{{ mediaItems[listIndex].title }}</span
                                  >
                                </v-card-title>

                                <div
                                  class="text--darken-3 pt-2"
                                  style="font-size: 12px; padding-left: 0; font-weight: bold"
                                >
                                  <span>{{ mediaItems[listIndex].start }}</span>
                                  <span style="font-size:8px;">-</span>
                                  <span
                                    >{{ mediaItems[listIndex].end }}の場面</span
                                  >
                                </div>

                                <div
                                  class="horizontal-list-wrap block-chip-lines3 color-black my-1"
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
              <div v-bind:class="listIndex == index ? `yellow lighten-5` : ``">
                <v-card
                  class="mx-auto my-1"
                  max-width="420"
                  elevation="0"
                  color="transparent"
                >
                  <v-row dense class="pa-0 ma-0">
                    <v-col class="px-0">
                      <v-row class="ma-0">
                        <v-col cols="1" class="pa-1 ma-auto text-center">
                          {{ index + 1 }}
                        </v-col>
                        <v-col cols="11" class="pa-0">
                          <v-row class="ma-0">
                            <v-col cols="6" class="pa-1">
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
                            <v-col cols="6" class="pa-1 py-0">
                              <v-card-title
                                v-on:click.stop="select(index)"
                                class="px-0 py-0"
                                style="flex-wrap: nowrap; align-items: baseline;"
                              >
                                <div
                                  style="width:16px; max-height:16px; color:red; margin-right:8px"
                                >
                                  <i class="fab fa-youtube"></i>
                                </div>
                                <span
                                  class="block-playlist-title"
                                  style="font-size: 14px"
                                  >{{ item.title }}</span
                                >
                              </v-card-title>

                              <div
                                class="text--darken-3 pt-2"
                                style="font-size: 12px; padding-left: 0; font-weight: bold"
                              >
                                <span>{{ item.start }}</span>
                                <span style="font-size:8px;">-</span>
                                <span>{{ item.end }}の場面</span>
                              </div>

                              <div
                                class="horizontal-list-wrap block-chip-lines3 color-black my-1"
                              >
                                <v-chip
                                  v-for="(tag, tagIndex) in readMore(
                                    item.tagArray
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
              </div>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  data() {
    return {
      panel: null,
    };
  },
  props: {
    mediaItems: Array,
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      listIndex: "watch/listIndex",
    }),
  },
  methods: {
    select(item) {},
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
  },
  filters: {
    formatTime: function(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
  created() {},
};
</script>
