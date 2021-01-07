<template>
  <v-sheet
    class="ma-0 pa-0 highlight-header"
    height="48"
    elevation="0"
    align="center"
  >
    <v-container class="ma-0 pa-0" fluid fill-height>
      <v-row class="ma-0 pa-0" align="center" justify="center">
        <v-col v-if="showBackIcon" class="text-left ma-0 pa-0">
          <v-icon v-on:click="back" color="my-grey">mdi-chevron-left</v-icon>
        </v-col>
        <v-col class="ma-0 pa-0 text-center" cols="auto">
          <span>{{ headerMessage }}</span>
        </v-col>
        <v-col v-if="showBackIcon" class="ma-0 pa-0"> </v-col>
      </v-row>
    </v-container>
    <v-progress-linear
      v-bind:active="loading"
      indeterminate
      absolute
      bottom
      color="primary accent-4"
    ></v-progress-linear>
    <v-divider></v-divider>
  </v-sheet>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapGetters({
      headerMessage: "highlightHeader/headerMessage",
      showBackIcon: "highlightHeader/showBackIcon",
      loading: "highlightHeader/loading",
    }),
    ...mapState({}),
    ...mapGetters({}),
  },
  watch: {},
  created() {},
};
</script>
