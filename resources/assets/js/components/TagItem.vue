<template>
  <div v-if="isReady">
    <v-sheet tile class="mx-auto px-1 py-2 body-color">
      <div>
        <v-img
          src="/storage/icons/yt_social_red.png"
          width="28px"
          max-height="28px"
          class="float-left mr-2"
          alt="YouTube logo"
        />
        <span v-if="isNew">{{ newVideoData.title }}</span>
        <span v-else>{{ videoData.title }}</span>
      </div>
    </v-sheet>

    <v-sheet tile class="mx-auto pa-1 body-color">
      <transition-group name="tag-list" tag="p" class="tag__list">
        <v-row
          v-for="tagData in showTagDataArray"
          v-bind:key="tagData.id"
          class="ma-0 pa-0"
          align="center"
        >
          <v-col class="ma-0 pa-0">
            <span>
              {{ formatToMinSec(tagData.start) }}〜{{
                formatToMinSec(tagData.end)
              }}
            </span>
          </v-col>
          <v-col cols="9" class="ma-0 pa-0">
            <div class="horizontal-list-wrap">
              <ul class="horizontal-list">
                <li class="item">
                  <v-chip
                    v-for="tag in tagData.tags.split(/::/)"
                    v-bind:key="tagData + '.' + tag"
                    class="ma-2"
                    small
                    color="blue lighten-2"
                    text-color="white"
                  >
                    <v-avatar left>
                      <i class="fas fa-tag my-grey"></i>
                    </v-avatar>
                    {{ tag }}
                  </v-chip>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
      </transition-group>
    </v-sheet>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import myMixin from "../util";

export default {
  data() {
    return {
      showTagIndex: 0,
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      currentTime: "youtube/currentTime",
      videoData: "youtube/videoData",
      newVideoData: "youtube/newVideoData",
      tagDataArray: "youtube/tagDataArray",
      isNew: "youtube/isNew",
      isReady: "youtube/isReady",
    }),
    playingTagIndex() {
      let index = 0;
      if (this.tagDataArray) {
        //現在再生中のタグのインデックスを取得(なしの場合は-1)
        index = this.tagDataArray.findIndex(
          (tagData) =>
            this.convertToSec(this.formatToMinSec(tagData.start)) <=
              this.convertToSec(this.currentTime) &&
            this.convertToSec(this.formatToMinSec(tagData.end)) >=
              this.convertToSec(this.currentTime)
        );

        //現在再生中のタグがある場合はshowTagIndexに格納
        if (index != -1) {
          this.showTagIndex = index;
        }
        return this.showTagIndex;
      }
    },
    //現在再生中のタグから5個まで表示
    showTagDataArray() {
      return this.tagDataArray
        ? this.tagDataArray.slice(
            this.playingTagIndex,
            this.playingTagIndex + 5
          )
        : "";
    },
  },
  methods: {},
  created() {},
};
</script>
