<template>
  <div v-if="isReady" class="container">
    <div>{{ videoData.title }}</div>
    <transition-group name="tag-list" tag="p" class="tag__list">
      <ul v-for="tagData in showTagDataArray" v-bind:key="tagData.id">
        <li class="tag__list__item">
          <span>{{ formatToMinSec(tagData.start) }}〜{{ formatToMinSec(tagData.end) }}</span>
          <span
            class="tag"
            v-for="tag in tagData.tags.split(/[\s| |　]/)"
            v-bind:key="tagData + '.' + tag"
          >{{ tag }}</span>
        </li>
      </ul>
    </transition-group>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import myMixin from "../util";

export default {
  data() {
    return {
      showTagIndex: 0
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      currentTime: "youtube/currentTime",
      videoData: "youtube/videoData",
      tagDataArray: "youtube/tagDataArray",
      isReady: "youtube/isReady"
    }),
    playingTagIndex() {
      let index = 0;
      if (this.tagDataArray) {
        //現在再生中のタグのインデックスを取得(なしの場合は-1)
        index = this.tagDataArray.findIndex(
          tagData =>
            this.convertToSec(this.formatToMinSec(tagData.start)) <=
              this.currentTime &&
            this.convertToSec(this.formatToMinSec(tagData.end)) >=
              this.currentTime
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
    }
  },
  methods: {},
  created() {}
};
</script>
