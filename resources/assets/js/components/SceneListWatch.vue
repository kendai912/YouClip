<template>
  <div>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header v-bind:class="{ 'sceneListExpansionPanelCustomHeader': panel !== 0 }" class="ma-0 pl-3 pr-1">
          <template v-slot:default="{ open }">
            <v-fade-transition leave-absolute>
              <span v-if="open" key="0">
                再生中の場面
              </span>
              <span v-else key="1">
                再生中の場面
              </span>
            </v-fade-transition>
            <div v-if="panel !== 0" v-bind:class="{ 'sceneListExpansionPanelCustomHeaderContent': panel !== 0 }">
              <v-row class="ma-0">
                <v-col cols="6" class="pa-1 d-flex align-center">
                  <v-avatar size="20">
                    <span>{{ parseInt(listIndex) + 1 }} {{panel}}</span>
                  </v-avatar>
                  <v-hover v-slot:default="{ hover }">
                    <v-img
                      class="white--text align-end"
                      v-bind:src="
                        hover
                          ? gifStoragePath + mediaItems[listIndex].previewgif
                          : thumbStoragePath + mediaItems[listIndex].preview
                      "
                      v-bind:alt="mediaItems[listIndex].title"
                      aspect-ratio="1.7777"
                      height="120"
                    >
                    </v-img>
                  </v-hover>
                </v-col>
                <v-col cols="6" class="pa-1 py-3">
                  <v-card-title class="pt-0">
                    <v-img
                      src="/storage/icons/yt_social_red.png"
                      width="28px"
                      max-height="28px"
                      class="float-left mr-2"
                    />
                    <div>
                      <span class="block-playlist-title" style="font-size: 14pt;">{{ mediaItems[listIndex].title }}</span>
                    </div>
                  </v-card-title>
                  <v-card-text class="pb-0">
                    <div>
                      <span class="caption" style="font-size: 14pt !important; font-weight: bold;">{{
                          mediaItems[listIndex].start + "~" + mediaItems[listIndex].end
                        }}の場面</span>
                    </div>
                    <div>
                    <v-chip
                      v-for="(tag, tagIndex) in readMore(mediaItems[listIndex].tagArray)"
                      v-bind:key="mediaItems[listIndex].id + '-' + tagIndex"
                      class="my-tag-chip px-2"
                      color="lighten-5"
                      text-color="my-grey"
                      style="font-weight: normal; color: #808080; background-color: #ffffff !important; border: 1px solid #d7d7d7 !important;"
                    >
                      {{ tag }}
                    </v-chip>
                    <span v-if="mediaItems[listIndex].tagArray.length > 2">...</span>
                  </div>
                  </v-card-text>
                </v-col>
              </v-row>
            </div>
            
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row
            v-for="(item, index) in mediaItems"
            v-bind:key="item.category + '-' + item.id"
            dense
            class="pa-0 ma-0"
          >
            <v-col class="px-0">
              <v-card
                class="mx-auto"
                max-width="420"
                height="128"
                elevation="1"
              >
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
                        height="120"
                      >
                      </v-img>
                    </v-hover>
                  </v-col>
                  <v-col cols="6" class="pa-1 py-3">
                    <v-card-title class="pt-0">
                      <v-img
                        src="/storage/icons/yt_social_red.png"
                        width="28px"
                        max-height="28px"
                        class="float-left mr-2"
                      />
                      <div>
                        <span class="block-playlist-title" style="font-size: 14pt;">{{ item.title }}</span>
                      </div>
                    </v-card-title>
                    <v-card-text class="pb-0">
                      <div>
                        <span class="caption" style="font-size: 14pt !important; font-weight: bold;">{{
                            item.start + "~" + item.end
                          }}の場面</span>
                      </div>
                      <div>
                      <v-chip
                        v-for="(tag, tagIndex) in readMore(item.tagArray)"
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
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- <v-card
      class="mx-auto"
      max-width="420"
      height="128"
      elevation="1"
      v-if="panel !== 0"
    >
      <v-row class="ma-0">
        <v-col cols="6" class="pa-1 d-flex align-center">
          <v-avatar size="20">
            <span>{{ parseInt(listIndex) + 1 }} {{panel}}</span>
          </v-avatar>
          <v-hover v-slot:default="{ hover }">
            <v-img
              class="white--text align-end"
              v-bind:src="
                hover
                  ? gifStoragePath + mediaItems[listIndex].previewgif
                  : thumbStoragePath + mediaItems[listIndex].preview
              "
              v-bind:alt="mediaItems[listIndex].title"
              aspect-ratio="1.7777"
              height="120"
            >
            </v-img>
          </v-hover>
        </v-col>
        <v-col cols="6" class="pa-1 py-3">
          <v-card-title class="pt-0">
            <v-img
              src="/storage/icons/yt_social_red.png"
              width="28px"
              max-height="28px"
              class="float-left mr-2"
            />
            <div>
              <span class="block-playlist-title" style="font-size: 14pt;">{{ mediaItems[listIndex].title }}</span>
            </div>
          </v-card-title>
          <v-card-text class="pb-0">
            <div>
              <span class="caption" style="font-size: 14pt !important; font-weight: bold;">{{
                  mediaItems[listIndex].start + "~" + mediaItems[listIndex].end
                }}の場面</span>
            </div>
            <div>
            <v-chip
              v-for="(tag, tagIndex) in readMore(mediaItems[listIndex].tagArray)"
              v-bind:key="mediaItems[listIndex].id + '-' + tagIndex"
              class="my-tag-chip px-2"
              color="lighten-5"
              text-color="my-grey"
              style="font-weight: normal; color: #808080; background-color: #ffffff !important; border: 1px solid #d7d7d7 !important;"
            >
              {{ tag }}
            </v-chip>
            <span v-if="mediaItems[listIndex].tagArray.length > 2">...</span>
          </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card> -->
  </div>
  
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  data() {
    return {
      panel: null
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
      if(arrayData.length > 2) {
        for(var i = 0; i < 2; i++) {
          newArray.push(arrayData[i]);
        }
        return newArray;
      } else {
        return arrayData;
      }
    }
  },
  filters: {
    formatTime: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  },
  created() {},
};
</script>
