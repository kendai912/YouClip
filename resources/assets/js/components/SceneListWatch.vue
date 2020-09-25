<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-fade-transition leave-absolute>
            <span
              v-if="open"
              key="0"
            >
              再生中のクリップ
            </span>
            <span
              v-else
              key="1"
            >
              次のシーン
            </span>
          </v-fade-transition>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row
          v-for="(item, index) in mediaItems"
          v-bind:key="item.category+'-'+item.id"
          dense
          class="pa-0 ma-0"
        >
          <v-col class="px-0">
            <v-card class="mx-auto" :color="listIndex == index ? `yellow lighten-5`:``" max-width="420" height="128" elevation="1">
                <v-row class="ma-0">
                  <v-col cols="6" class="pa-1">
                    <v-hover v-slot:default="{ hover }">
                      <v-img
                        class="white--text align-end"
                        v-bind:src="hover ? '/storage/gifs/' + item.previewgif: '/storage/img/' + item.preview"
                        v-bind:alt="item.title"
                        aspect-ratio="1.5"
                        height="120"
                      >
                        <v-avatar class="scene-order" size="20">
                          <span>{{index + 1}}</span>
                        </v-avatar>
                        <v-chip label color="#27252582" text-color="white" class="my-scene-chip">
                          <span class="caption">{{item.start+'~'+item.end}}</span>
                        </v-chip>
                      </v-img>
                    </v-hover>
                  </v-col>
                  <v-col cols="6" class="pa-1 py-3">
                    <v-card-title class="py-0 d-inline">
                      <v-img
                        src="/storage/icons/yt_social_red.png"
                        width="28px"
                        max-height="28px"
                        class="float-left mr-2"
                      />
                      <div>
                        <span class="block-playlist-title">{{ item.title }}</span>
                      </div>
                    </v-card-title>
                    <div class="horizontal-list-wrap block-chip-lines3 color-black">
                      <v-chip
                        v-for="(tag, tagIndex) in item.tagArray"
                        v-bind:key="item.id + '-' + tagIndex"
                        class="my-tag-chip px-2"
                        color="blue lighten-5"
                        text-color="black"
                        style="font-weight: normal"
                      >
                        <v-avatar style="height: 20px !important; width: 20px !important; min-width: 20px !important;">
                          <i class="fas fa-tag my-black"></i>
                        </v-avatar>
                        {{ tag }}
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    mediaItems: Array,
  },
  computed: {
    ...mapGetters({
      listIndex: "watch/listIndex"
    }),
  },
  methods: {
    select(item) {
      console.log("itemmmmmmmmmm", item);
    }
  },
  created() {
  }
};
</script>