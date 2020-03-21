<template>
  <div class="container--small">
    <h1>YTResult</h1>
    <div>
      <YTSearchBox />
    </div>
    <div>
      <YTitem v-bind:YTitems="YTresult" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import YTSearchBox from "../components/YTSearchBox.vue";
import YTitem from "../components/YTitem.vue";
import myMixin from "../util";

export default {
  components: {
    YTSearchBox,
    YTitem
  },
  mixins: [myMixin],
  methods: {},
  computed: {
    ...mapGetters({
      YTresult: "YTsearch/YTresult"
    })
  }
};
</script>
