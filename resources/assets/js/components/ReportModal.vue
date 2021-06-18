<template>
  <v-dialog v-model="isReportModalOpen" max-width="360">
    <v-card>
      <v-form ref="form">
        <v-btn icon dark small v-on:click="closeReportModal">
          <v-icon color="grey darken-1">mdi-close</v-icon>
        </v-btn>
        <v-card-text>
          <v-checkbox
            v-model="reportCategory"
            v-for="(item, i) in reportCategories"
            v-bind:key="i"
            :label="item.label"
            :value="item.value"
            hide-details
            v-bind:rules="rules"
          ></v-checkbox>
        </v-card-text>
        <v-row class="ma-0 pa-6 py-2">
          <v-textarea
            rows="6"
            v-model="detail"
            outlined
            v-bind:label="$t('ReportModal.detailLabel')"
          ></v-textarea>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-row class="ma-0 pa-2 justify-end" style="backgroundColor: white;">
            <v-btn
              v-on:click="closeReportModal"
              width="90px"
              color="default"
              class="mr-1"
              >{{ $t("ReportModal.cancel") }}</v-btn
            >
            <v-btn v-on:click="submit" width="90px" color="primary">{{
              $t("ReportModal.report")
            }}</v-btn>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      reportCategory: null,
      reportCategories: [
        {
          label: this.$t("ReportModal.data.infringement"),
          value: "Infringement",
        },
        {
          label: this.$t("ReportModal.data.inappropriate"),
          value: "Inappropriate",
        },
      ],
      detail: null,
      rules: [(value) => !!value || "Required"],
    };
  },
  props: {},
  computed: {
    ...mapGetters({
      playlistId: "watch/playlistId",
    }),
    isReportModalOpen: {
      get() {
        return this.$store.getters["reportModal/isReportModalOpen"];
      },
      set() {
        return this.$store.commit("reportModal/closeReportModal");
      },
    },
  },
  methods: {
    ...mapMutations({
      closeReportModal: "reportModal/closeReportModal",
    }),
    ...mapActions({
      report: "reportModal/report",
    }),
    submit() {
      if (this.$refs.form.validate()) {
        let params = {
          playlistId: this.playlistId,
          reportCategory: this.reportCategory,
          detail: this.detail,
        };
        this.report(params);

        //display editting a new scene completion snackbar
        this.$store.commit(
          "snackbar/setText",
          this.$t("ReportModal.methods.reported")
        );
        this.$store.commit("snackbar/seVertical", false);
        this.$store.commit("snackbar/setSnackbar", true);
        this.$store.commit("snackbar/setTimeout", 5000);

        this.closeReportModal();
      }
    },
  },
  async created() {
    await this.$store.dispatch("noLoginModal/saveUrlIntended");
  },
};
</script>
