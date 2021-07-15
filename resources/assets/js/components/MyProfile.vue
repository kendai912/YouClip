<template>
  <v-container class="pa-0 body-color">
    <v-card class="mx-auto" tile flat>
      <v-row align="center" justify="end" class="ma-0 pa-2">
        <v-btn v-on:click="logout" elevation="0" color="white">
          <v-icon>mdi-logout</v-icon>
          {{ $t("MyProfile.logout") }}
        </v-btn>
      </v-row>
      <v-row align="center" justify="center" class="ma-0 pa-2">
        <v-avatar class="profile" size="100">
          <v-img
            v-if="avatar"
            v-bind:src="avatarStoragePath + avatar"
            alt="profile pic"
          ></v-img>
          <v-icon v-else size="100" style="color:grey;"
            >fas fa-user-circle</v-icon
          >
        </v-avatar>
      </v-row>
      <v-row align="center" justify="center" class="ma-0 pt-0 pb-2">
        <span class="fz-16">
          {{ username }}
        </span>
      </v-row>
      <v-row class="ma-0 pt-4 pb-4 px-2">
        <v-btn id="editProfile" width="100%" color="white" to="/mypage/edit"
          ><span class="fz-14">{{ $t("MyProfile.editProfile") }}</span></v-btn
        >
      </v-row>
    </v-card>
    <v-tour name="profileTour" :steps="steps" :options="myOptions"> </v-tour>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  data() {
    return {
      steps: [
        {
          target: "#editProfile",
          content: this.$t("MyProfile.data.steps"),
          params: {
            placement: "top",
          },
        },
      ],
      myOptions: {
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: this.$t("Footer.data.buttonSkip"),
          buttonPrevious: this.$t("Footer.data.buttonPrevious"),
          buttonNext: this.$t("Footer.data.buttonNext"),
          buttonStop: this.$t("Footer.data.buttonStop"),
        },
      },
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      username: "auth/username",
      avatar: "auth/avatar",
      showProfileTour: "onboarding/showProfileTour",
    }),
  },
  watch: {
    showProfileTour() {
      if (this.showProfileTour) this.$tours["profileTour"].start();
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      if (this.apiStatus) {
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    if (this.showProfileTour) this.$tours["profileTour"].start();
  },
};
</script>
