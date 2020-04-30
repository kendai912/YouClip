<template>
  <div class="text-center">
    <v-bottom-sheet v-if="isReady" v-model="sheet" hide-overlay persistent>
      <transition v-bind:name="controlTransitNext ? 'controle-next' : 'controle-previous'">
        <component
          v-bind:is="showTaggingControl"
          v-bind:player="player"
          v-on:taggingSucceed="taggingSucceed"
          v-on:updateSucceed="updateSucceed"
        ></component>
      </transition>
    </v-bottom-sheet>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";
import TimeControl from "../components/TimeControl.vue";
import TaggingControl from "../components/TaggingControl.vue";

export default {
  components: {
    TimeControl,
    TaggingControl
  },
  props: {
    player: Object
  },
  data() {
    return {
      sheet: true,
      slider: { val: 0, color: "red" },
      sliderInterval: null,
      startTimeInput: null,
      endTimeInput: null
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isReady: "youtube/isReady",
      showTaggingControl: "tagging/showTaggingControl",
      controlTransitNext: "tagging/controlTransitNext"
    })
  },
  methods: {
    //シーンタグ完了のトーストを表示
    taggingSucceed() {
      // this.snackbar = true;
      this.$emit("taggingSucceed");
    },
    //シーンタグ更新完了のトーストを表示
    updateSucceed() {
      this.$emit("updateSucceed");
    }
  },
  created() {}
};
</script>
