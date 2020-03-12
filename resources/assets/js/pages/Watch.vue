<template>
  <div class="container--small">
    <h1>Watch</h1>
    <div></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import myMixin from "../util";

export default {
  components: {},
  mixins: [myMixin],
  methods: {},
  computed: {
    ...mapGetters({
      watchList: "watch/watchList",
      listIndex: "watch/listIndex"
    })
  }
};
</script>
