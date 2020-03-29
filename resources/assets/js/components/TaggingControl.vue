<template>
  <v-sheet class="text-center" height="450px">
    <v-combobox
      v-model="tags"
      chips
      clearable
      label="シーンタグを入力"
      multiple
      solo
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          color="blue"
          close
          @click="select"
          @click:close="remove(item)"
        >
          <v-icon left>mdi-label</v-icon>
          <strong>{{ item }}</strong
          >&nbsp;
          <span>(interest)</span>
        </v-chip>
      </template>
    </v-combobox>
    <div>
      <v-btn class="mt-6" text color="error" v-on:click="submit">完了</v-btn>
    </div>
  </v-sheet>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  props: {
    player: Object
  },
  data() {
    return {
      sheet: true,
      tags: []
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      currentTime: "youtube/currentTime",
      videoData: "youtube/videoData",
      newVideoData: "youtube/newVideoData",
      isReady: "youtube/isReady",
      isNew: "youtube/isNew"
    })
  },
  methods: {
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
      this.tags = [...this.tags];
    },
    submit() {
      this.$store.commit("tagging/setTags", this.tags);
      this.$store.dispatch("tagging/storeSceneTags");
      this.$emit("taggingSucceed");
    }
  },
  created() {}
};
</script>
