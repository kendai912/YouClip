<template>
  <div class="tabItemWrap">
    <div class="tabItem">
      <v-icon
        v-if="selfTabIndex != 1"
        size="24"
        class="customVIcon"
        v-bind:color="color"
        ><slot name="tabIcon" />
      </v-icon>
      <span
        v-else
        class="vtuberIcon"
        v-bind:class="[selfTabIndex == activeTabIndex ? 'fontColorPrimary' : 'fontColorWhite']"
        >V</span
      >
    </div>
    <div class="fz-12 tabName">
      <slot name="tabName" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    selfTabIndex: Number,
  },
  methods: {},
  computed: {
    ...mapGetters({
      activeTabIndex: "navbar/activeTabIndex",
    }),
    color() {
      return this.activeTabIndex == this.selfTabIndex ? "primary" : "white";
    },
  },
  mounted() {},
};
</script>
