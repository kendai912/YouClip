<template>
  <div class="body-color">
    <v-sheet
      v-for="(item, index) in numberOfItemsPerPagination"
      v-bind:key="index"
      class="px-3 pt-3 pb-3 body-color"
    >
      <v-card class="mx-auto" max-width="420" elevation="0">
        <v-skeleton-loader width="auto" class="mx-auto" type="card-avatar"></v-skeleton-loader>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import myMixin from "../util";

export default {
  props: {
    numberOfItemsPerPagination: Number
  },
  mixins: [myMixin],
  methods: {},
  created() {}
};
</script>
