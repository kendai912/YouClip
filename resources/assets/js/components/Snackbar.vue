<template>
  <v-snackbar
    v-model="snackbar"
    v-bind:timeout="timeout"
    v-bind:vertical="vertical"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <!-- 編集中のプレイリストがある場合 -->
      <v-btn
        v-if="vertical"
        color="white"
        text
        to="/highlight/scenelist"
        v-on:click="snackbar = false"
        >{{ $t("Snackbar.open") }}</v-btn
      >
      <v-btn v-bind:color="color" text v-on:click="snackbar = false"
        >{{ $t("Snackbar.close") }}</v-btn
      >
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  data() {
    return {};
  },
  mixins: [myMixin],
  methods: {
    ...mapMutations({
      seVertical: "snackbar/seVertical",
    }),
  },
  computed: {
    ...mapGetters({
      timeout: "snackbar/timeout",
      color: "snackbar/color",
      text: "snackbar/text",
      vertical: "snackbar/vertical",
    }),
    snackbar: {
      get() {
        return this.$store.getters["snackbar/snackbar"];
      },
      set(val) {
        return this.$store.commit("snackbar/setSnackbar", val);
      },
    },
  },
};
</script>
