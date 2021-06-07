<template>
  <div class="telopLayer">
    <v-container class="ma-0 pa-0" fluid fill-height>
      <v-row
        class="ma-0 pa-0 text-center"
        align="center"
        style="height: 33.333%"
      >
        <v-col align-self="start" class="text-left" cols="4"
          ><TelopItem columnPosition="upperLeft" />
        </v-col>
        <v-col align-self="start" class="text-center" cols="4"
          ><TelopItem columnPosition="upperCenter" />
        </v-col>
        <v-col align-self="start" class="text-right" cols="4"
          ><TelopItem columnPosition="upperRight" />
        </v-col>
      </v-row>

      <v-row
        class="ma-0 pa-0 text-center"
        align="center"
        style="height: 33.333%"
      >
        <v-col align-self="center" class="text-left" cols="4"
          ><TelopItem columnPosition="middleLeft" />
        </v-col>
        <v-col align-self="center" class="text-center" cols="4"
          ><TelopItem columnPosition="middleCenter" />
        </v-col>
        <v-col align-self="center" class="text-right" cols="4">
          <TelopItem columnPosition="middleRight" />
        </v-col>
      </v-row>

      <v-row
        class="ma-0 pa-0 text-center"
        align="center"
        style="height: 33.333%"
      >
        <v-col align-self="end" class="text-left" cols="4"
          ><TelopItem columnPosition="bottomLeft" />
        </v-col>
        <v-col align-self="end" class="text-center" cols="4">
          <TelopItem columnPosition="bottomCenter" />
        </v-col>
        <v-col align-self="end" class="text-right" cols="4">
          <TelopItem columnPosition="bottomRight" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";
import TelopItem from "../components/TelopItem.vue";

export default {
  components: {
    TelopItem,
  },
  props: {},
  data() {
    return {};
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      listIndex: "ytPlayer/listIndex",
      isPlaying: "ytPlayer/isPlaying",
      isWatchingPlaylist: "ytPlayer/isWatchingPlaylist",
      currentDisplayingTimeInSecOfWatch:
        "ytPlayer/currentDisplayingTimeInSecOfWatch",
      currentTime: "youtube/currentTime",
      telops: "telop/telops",
    }),
    currentDisplayingTime() {
      if (this.isWatchingPlaylist) {
        return this.formatTime(this.currentDisplayingTimeInSecOfWatch);
      } else {
        return this.currentTime;
      }
    },
  },
  watch: {
    listIndex() {
      this.setTelopsArrayIndex(this.listIndex);
    },
  },
  methods: {
    ...mapMutations({
      setTelopsArrayIndex: "telop/setTelopsArrayIndex",
    }),
  },
  created() {
    if (this.isWatchingPlaylist)
      this.setTelopsArrayIndex(this.$route.query.index);
  },
  beforeDestroy() {},
};
</script>
