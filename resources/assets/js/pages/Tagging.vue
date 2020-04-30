<template>
  <div class="container--small">
      <YTSearchBox />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import YTSearchBox from "../components/YTSearchBox.vue";

export default {
  components: {
    YTSearchBox,
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);
  },
};
</script>
