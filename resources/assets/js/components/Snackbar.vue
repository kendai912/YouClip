<template>
  <v-snackbar v-model="snackbar" v-bind:timeout="timeout">
    {{ text }}
    <v-btn v-bind:color="color" text v-on:click="snackbar = false">Close</v-btn>
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
  methods: {},
  computed: {
    ...mapGetters({
      timeout: "snackbar/timeout",
      color: "snackbar/color",
      text: "snackbar/text",
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
