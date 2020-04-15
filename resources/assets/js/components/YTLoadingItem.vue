<template>
  <div>
    <v-sheet
      v-for="(item, index) in numberOfYTItemsPerPagination"
      v-bind:key="index"
      color="grey lighten-4"
      class="px-3 pt-3 pb-3"
    >
      <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
    </v-sheet>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import myMixin from "../util";

export default {
  props: {
    numberOfYTItemsPerPagination: Number
  },
  mixins: [myMixin],
  methods: {},
  created() {}
};
</script>
