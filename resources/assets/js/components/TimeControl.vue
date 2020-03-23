<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" hide-overlay persistent>
      <v-sheet class="text-center" height="200px">
        <div>
          <v-btn class="mt-6" text color="error" @click="sheet = !sheet"
            >＜</v-btn
          ><span>開始・終了時間を指定</span>
        </div>
        <v-slider :thumb-color="slider.color" thumb-label="always"></v-slider>
        <v-btn class="mt-6" text color="error" @click="sheet = !sheet"
          >次へ</v-btn
        >
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  props: {},
  data() {
    return {
      sheet: true,
      slider: { color: "red" }
    };
  },

  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapMutations({})
  },
  created() {}
};
</script>
