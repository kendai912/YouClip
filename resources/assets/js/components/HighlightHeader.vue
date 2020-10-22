<template>
  <v-sheet class="ma-0 pa-0 highlight-header" height="48" elevation="0">
    <v-container class="ma-0 pa-0" fluid fill-height>
      <v-row class="ma-0 pa-0">
        <v-col class="ma-0 pa-0 text-center">
          <span>{{ headerMessage }}</span>
        </v-col>
      </v-row>
    </v-container>
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
  methods: {},
  computed: {
    ...mapGetters({
      headerMessage: "highlightHeader/headerMessage",
    }),
    ...mapState({}),
    ...mapGetters({}),
  },
  created() {},
};
</script>
