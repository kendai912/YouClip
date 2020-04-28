<template>
  <div>
    <v-card
      v-for="(item, index) in numberOfYTItemsPerPagination"
      v-bind:key="index"
      class="mx-auto"
      tile
      max-width="400"
      elevation="0"
    >
      <v-container class="px-3 pb-0 my-3">
        <v-row v-on:click="select(item)" justify="center" align-content="center" class="pa-0 ma-0">
          <v-col cols="6" class="pa-0 ma-0">
            <v-skeleton-loader
              tile
              width="auto"
              min-height="98.86"
              max-height="105.91"
              type="image"
            ></v-skeleton-loader>
          </v-col>
          <v-col cols="6" class="pa-0 ma-0">
            <v-skeleton-loader
              width="auto"
              class="pa-0 ma-0"
              type="list-item-three-line"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
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
