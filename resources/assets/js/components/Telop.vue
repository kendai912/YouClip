<template>
  <div class="telopLayer">
    <v-container class="ma-0 pa-0" fluid fill-height>
      <v-row
        class="ma-0 pa-0 text-center"
        align="center"
        style="height: 33.333%"
      >
        <v-col align-self="start" class="text-left"
          ><TelopItem columnPosition="upperLeft" />
        </v-col>
        <v-col align-self="start" class="text-center"
          ><TelopItem columnPosition="upperCenter" />
        </v-col>
        <v-col align-self="start" class="text-right"
          ><TelopItem columnPosition="upperRight" />
        </v-col>
      </v-row>

      <v-row
        class="ma-0 pa-0 text-center"
        align="center"
        style="height: 33.333%"
      >
        <v-col align-self="center" class="text-left"
          ><TelopItem columnPosition="middleLeft" />
        </v-col>
        <v-col align-self="center" class="text-center"
          ><TelopItem columnPosition="middleCenter" />
        </v-col>
        <v-col align-self="center" class="text-right">
          <TelopItem columnPosition="middleRight" />
        </v-col>
      </v-row>

      <v-row
        class="ma-0 pa-0 text-center"
        align="center"
        style="height: 33.333%"
      >
        <v-col align-self="end" class="text-left"
          ><TelopItem columnPosition="bottomLeft" />
        </v-col>
        <v-col align-self="end" class="text-center">
          <TelopItem columnPosition="bottomCenter" />
        </v-col>
        <v-col align-self="end" class="text-right">
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
  methods: {
    ...mapMutations({}),
  },
  created() {},
  beforeDestroy() {},
};
</script>
