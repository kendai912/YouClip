<template>
  <v-row justify="center">
    <v-dialog v-model="showPlaySpeedModal" max-width="300px">
      <v-card>
        <v-card-title>速度を選択</v-card-title>
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
            <v-icon left>close</v-icon>閉じる
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
        { label: "0.25倍速", value: 0.25 },
        { label: "0.5倍速", value: 0.5 },
        { label: "0.75倍速", value: 0.75 },
        { label: "通常", value: 1 },
        { label: "1.25倍速", value: 1.25 },
        { label: "1.5倍速", value: 1.5 },
        { label: "1.75倍速", value: 1.75 },
        { label: "2倍速", value: 2 },
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
