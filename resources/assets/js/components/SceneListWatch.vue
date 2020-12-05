<template>
  <div>
    <v-divider></v-divider>
    <v-expansion-panels v-model="panel" class="mb-2">
      <v-expansion-panel>
        <v-expansion-panel-header
          v-bind:class="{ sceneListExpansionPanelCustomHeader: panel !== 0 }"
          class="ma-0 pl-3 pr-1"
        >
          <template v-slot:default="{ open }">
            <v-fade-transition leave-absolute>
              <span v-if="open" key="0">
                再生中の場面
              </span>
              <span v-else key="1">
                再生中の場面
              </span>
            </v-fade-transition>

            <v-row
              dense
              class="pa-0 ma-0"
              v-if="panel !== 0"
              v-bind:class="{
                sceneListExpansionPanelCustomHeaderContent: panel !== 0,
              }"
            >
              <v-col class="px-0">
                <v-row class="ma-0">
                  <v-col cols="1" class="pa-1 ma-auto">
                    <div class="text-center">
                      {{ parseInt(listIndex) + 1 }} {{ panel }}
                    </div>
                  </v-col>
                  <v-col cols="10" class="pa-0">
                    <v-row class="ma-0">
                      <v-col cols="6" class="pa-1">
                        <v-hover v-if="!isMobile" v-slot:default="{ hover }">
                          <v-img
                            v-on:click.stop="select(index)"
                            class="white--text align-end"
                            v-bind:src="
                              hover
                                ? gifStoragePath +
                                  mediaItems[listIndex].previewgif
                                : thumbStoragePath +
                                  mediaItems[listIndex].preview
                            "
                            aspect-ratio="1.7777"
                            height="94"
                          >
                          </v-img>
                        </v-hover>
                        <v-img
                          v-else
                          v-on:click.stop="select(index)"
                          class="white--text align-end"
                          v-bind:src="
                            gifStoragePath + mediaItems[listIndex].previewgif
                          "
                          aspect-ratio="1.7777"
                          height="94"
                        >
                        </v-img>
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
                            >{{ mediaItems[listIndex].title }}</span
                          >
                        </v-card-title>

                        <div
                          class="text--darken-3 pt-2"
                          style="font-size: 12px; padding-left: 0; font-weight: bold"
                        >
                          <span>{{ mediaItems[listIndex].start }}</span>
                          <span style="font-size:8px;">-</span>
                          <span>{{ mediaItems[listIndex].end }}の場面</span>
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

            <!-- <v-row
              class="ma-0 pa-1"
              v-if="panel !== 0"
              v-bind:class="{
                sceneListExpansionPanelCustomHeaderContent: panel !== 0,
              }"
            >
              <v-col cols="6" class="pa-1 d-flex align-center">
                <v-avatar size="20">
                  <span>{{ parseInt(listIndex) + 1 }} {{ panel }}</span>
                </v-avatar>
                <v-hover v-slot:default="{ hover }">
                  <v-img
                    class="white--text align-end"
                    v-bind:src="
                      hover
                        ? gifStoragePath + mediaItems[listIndex].previewgif
                        : thumbStoragePath + mediaItems[listIndex].preview
                    "
                    aspect-ratio="1.7777"
                    height="94"
                  >
                  </v-img>
                </v-hover>
              </v-col>
              <v-col
                cols="6"
                class="pa-1"
                style="display: flex; flex-direction: column; justify-content: space-between;"
              >
                <div>
                  <div>
                    <v-img
                      src="/storage/icons/yt_social_red.png"
                      width="28px"
                      max-height="28px"
                      class="float-left mr-2"
                    />
                    <div>
                      <span
                        class="block-playlist-title"
                        style="font-size: 14pt;"
                        >{{ mediaItems[listIndex].title }}</span
                      >
                    </div>
                  </div>
                  <div>
                    <span
                      class="caption"
                      style="font-size: 12pt !important; font-weight: bold;"
                      >{{
                        mediaItems[listIndex].start +
                          "~" +
                          mediaItems[listIndex].end
                      }}の場面</span
                    >
                  </div>
                </div>
                <div>
                  <v-chip
                    v-for="(tag, tagIndex) in readMore(
                      mediaItems[listIndex].tagArray
                    )"
                    v-show="tag"
                    v-bind:key="mediaItems[listIndex].id + '-' + tagIndex"
                    class="my-tag-chip px-2"
                    color="lighten-5"
                    text-color="my-grey"
                    style="font-weight: normal; color: #808080; background-color: #ffffff !important; border: 1px solid #d7d7d7 !important;"
                  >
                    {{ tag }}
                  </v-chip>
                  <span v-if="mediaItems[listIndex].tagArray.length > 2"
                    >...</span
                  >
                </div>
              </v-col>
            </v-row> -->
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row
            dense
            v-for="(item, index) in mediaItems"
            v-bind:key="item.category + '-' + item.id"
            class="pa-0 ma-0"
          >
            <v-col class="px-0">
              <div v-bind:class="listIndex == index ? `yellow lighten-5` : ``">
                <v-row class="ma-0">
                  <v-col cols="1" class="pa-1 ma-auto">
                    <div class="text-center">
                      {{ index + 1 }}
                    </div>
                  </v-col>
                  <v-col cols="10" class="pa-0">
                    <v-row class="ma-0">
                      <v-col cols="6" class="pa-1">
                        <v-hover v-if="!isMobile" v-slot:default="{ hover }">
                          <v-img
                            v-on:click.stop="select(index)"
                            class="white--text align-end"
                            v-bind:src="
                              hover
                                ? gifStoragePath + item.previewgif
                                : thumbStoragePath + item.preview
                            "
                            v-bind:alt="item.title"
                            aspect-ratio="1.7777"
                            height="94"
                          >
                          </v-img>
                        </v-hover>
                        <v-img
                          v-else
                          v-on:click.stop="select(index)"
                          class="white--text align-end"
                          v-bind:src="gifStoragePath + item.previewgif"
                          v-bind:alt="item.title"
                          aspect-ratio="1.7777"
                          height="94"
                        >
                        </v-img>
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
                            v-for="(tag, tagIndex) in readMore(item.tagArray)"
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
              </div>
            </v-col>
          </v-row>

          <!-- <v-row
            v-for="(item, index) in mediaItems"
            v-bind:key="item.category + '-' + item.id"
            dense
            class="pa-0 ma-0"
          >
            <v-col class="px-0">
              <div v-bind:class="listIndex == index ? `yellow lighten-5` : ``">
                <v-row class="ma-0">
                  <v-col cols="6" class="pa-1 d-flex align-center">
                    <v-avatar size="20">
                      <span>{{ index + 1 }}</span>
                    </v-avatar>
                    <v-hover v-slot:default="{ hover }">
                      <v-img
                        class="white--text align-end"
                        v-bind:src="
                          hover
                            ? gifStoragePath + item.previewgif
                            : thumbStoragePath + item.preview
                        "
                        v-bind:alt="item.title"
                        aspect-ratio="1.7777"
                        height="94"
                      >
                      </v-img>
                    </v-hover>
                  </v-col>
                  <v-col
                    cols="6"
                    class="pa-1"
                    style="display: flex; flex-direction: column; justify-content: space-between;"
                  >
                    <div>
                      <div>
                        <v-img
                          src="/storage/icons/yt_social_red.png"
                          width="28px"
                          max-height="28px"
                          class="float-left mr-2"
                        />
                        <div>
                          <span
                            class="block-playlist-title"
                            style="font-size: 14pt;"
                            >{{ item.title }}</span
                          >
                        </div>
                      </div>
                      <div>
                        <span
                          class="caption"
                          style="font-size: 12pt !important; font-weight: bold;"
                          >{{ item.start + "~" + item.end }}の場面</span
                        >
                      </div>
                    </div>
                    <div>
                      <v-chip
                        v-for="(tag, tagIndex) in readMore(item.tagArray)"
                        v-show="tag"
                        v-bind:key="item.id + '-' + tagIndex"
                        class="my-tag-chip px-2"
                        color="lighten-5"
                        text-color="my-grey"
                        style="font-weight: normal; color: #808080; background-color: #ffffff !important; border: 1px solid #d7d7d7 !important;"
                      >
                        {{ tag }}
                      </v-chip>
                      <span v-if="item.tagArray.length > 2">...</span>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row> -->
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
      isMobile: false,
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
  created() {
    this.isMobile = this.mobileCheck();
  },
};
</script>
