<template>
  <v-sheet class="text-center" height="450px">
    <v-combobox
      v-model="chips"
      :items="items"
      chips
      clearable
      label="Your favorite hobbies"
      multiple
      solo
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click="select"
          @click:close="remove(item)"
        >
          <v-icon left>mdi-label</v-icon>
          <strong>{{ item }}</strong>&nbsp;
          <span>(interest)</span>
        </v-chip>
      </template>
    </v-combobox>
    <div>
      <v-btn class="mt-6" text color="error" @click="sheet = !sheet">完了</v-btn>
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
      tagsInput: "",
      chips: [
        "Programming",
        "Playing video games",
        "Watching movies",
        "Sleeping"
      ],
      items: ["Streaming", "Eating"]
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
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    }
  },
  created() {}
};
</script>
