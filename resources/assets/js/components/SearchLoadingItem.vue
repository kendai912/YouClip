<template>
  <v-sheet>
    <v-skeleton-loader width="auto" class="mx-auto px-12 pt-9" type="text"></v-skeleton-loader>
    <v-skeleton-loader width="auto" class="mx-auto px-12 pt-5" type="text"></v-skeleton-loader>
    <v-skeleton-loader width="auto" class="mx-auto px-12 pt-5" type="text"></v-skeleton-loader>
    <v-skeleton-loader width="auto" class="mx-auto px-12 pt-5" type="text"></v-skeleton-loader>
    <v-skeleton-loader width="auto" class="mx-auto px-12 py-5" type="text"></v-skeleton-loader>
  </v-sheet>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import myMixin from "../util";

export default {
  data: () => ({}),
  props: {},
  mixins: [myMixin],
  methods: {},
  created() {}
};
</script>
