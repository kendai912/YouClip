<template>
  <v-row justify="center">
    <v-dialog v-model="showPlaySpeedModal" max-width="300px">
      <v-card>
        <v-card-title>{{ $t("PlaySpeedModal.selectSpeed") }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 350px">
          <v-checkbox
            v-model="model"
            v-for="(playSpeed, i) in playSpeedValues"
            v-bind:key="i"
            :label="playSpeed.label"
            :value="playSpeed.value"
            @click="setPlaySpeed(playSpeed.value)"
            hide-details
          ></v-checkbox>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="grey darken-1" text @click="showPlaySpeedModal = false">
            <v-icon left>close</v-icon>{{ $t("PlaySpeedModal.close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      model: 1,
      playSpeedValues: [
        { label: this.$t("PlaySpeedModal.oneFourth"), value: 0.25 },
        { label: this.$t("PlaySpeedModal.half"), value: 0.5 },
        { label: this.$t("PlaySpeedModal.threeFourth"), value: 0.75 },
        { label: this.$t("PlaySpeedModal.normal"), value: 1 },
        { label: this.$t("PlaySpeedModal.oneAndOneFourth"), value: 1.25 },
        { label: this.$t("PlaySpeedModal.oneAndHalf"), value: 1.5 },
        { label: this.$t("PlaySpeedModal.oneAndThreeFourth"), value: 1.75 },
        { label: this.$t("PlaySpeedModal.double"), value: 2 },
      ],
    };
  },
  props: {
    player: Object,
  },
  computed: {
    ...mapGetters({
      playSpeed: "ytPlayer/playSpeed",
    }),
    showPlaySpeedModal: {
      get() {
        this.player.pauseVideo();
        return this.$store.getters["playSpeedModal/showPlaySpeedModal"];
      },
      set() {
        this.player.setPlaybackRate(parseFloat(this.playSpeed));
        this.player.playVideo();
        return this.$store.commit("playSpeedModal/closePlaySpeedModal");
      },
    },
  },
  methods: {
    async setPlaySpeed(value) {
      this.$store.commit("ytPlayer/setPlaySpeed", parseFloat(value));
      this.showPlaySpeedModal = false;
    },
  },
  created() {
    this.model = this.playSpeed;
  },
};
</script>
