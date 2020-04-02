<template>
  <div class="container--small">
    <h1>Tagging</h1>
    <div>
      <YTSearchBox />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import YTSearchBox from "../components/YTSearchBox.vue";

export default {
  components: {
    YTSearchBox
  },
  data() {
    return {};
  },
  computed: {},
  created() {}
};
</script>
