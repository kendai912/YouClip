<template>
  <v-row justify="center">
    <v-dialog v-model="showPlaySpeedModal" max-width="300px">
      <v-card>
        <v-card-title>速度を選択</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group v-model="model" column>
            <v-radio label="0.25倍速" value="0.25"></v-radio>
            <v-radio label="0.5倍速" value="0.5"></v-radio>
            <v-radio label="0.75倍速" value="0.75"></v-radio>
            <v-radio label="正常" value="1"></v-radio>
            <v-radio label="1.25倍速" value="1.25"></v-radio>
            <v-radio label="1.5倍速" value="1.5"></v-radio>
            <v-radio label="1.75倍速" value="1.75"></v-radio>
            <v-radio label="2倍速" value="2"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="showPlaySpeedModal = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="setPlaySpeed">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data () {
    return {
      model: 1,
    }
  },
  props: {
    player: Object,
  },
  computed: {
    ...mapGetters({
      playSpeed: "watch/playSpeed"
    }),
    showPlaySpeedModal: {
      get() {
        this.player.pauseVideo();
        return this.$store.getters["playSpeedModal/showPlaySpeedModal"];
      },
      set() {
        this.player.setPlaybackRate(parseInt(this.playSpeed));
        this.player.playVideo();
        return this.$store.commit("playSpeedModal/closePlaySpeedModal");
      }
    }
  },
  methods: {
    async setPlaySpeed() {
      this.$store.commit("watch/setPlaySpeed", this.model);
      this.showPlaySpeedModal = false;
    }
  }
}
</script>