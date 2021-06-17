<template>
  <div class="container--small">
    <v-sheet class="ma-0 pa-0" height="56" elevation="0" align="center">
      <v-container class="ma-0 pa-0" fluid fill-height>
        <v-row class="ma-0 pa-0" align="center" justify="center">
          <v-col class="text-left ma-0 pa-0" cols="2">
            <v-btn
              v-on:click="cancel"
              elevation="0"
              color="white"
              class="ma-0 pa-0 px-2"
            >
              <span class="fz-14">{{ $t("EditMypage.return") }}</span>
            </v-btn>
          </v-col>
          <v-col class="ma-0 pa-0 text-center">
            <span class="fz-14">{{ $t("EditMypage.profileSetting") }}</span>
          </v-col>
          <v-col class="ma-0 pa-0 text-right" cols="2">
            <v-btn
              v-on:click="save"
              elevation="0"
              color="white"
              class="ma-0 pa-0 px-2"
            >
              <span class="fz-14">{{ $t("EditMypage.save") }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-divider
      style="position: absolute; width: 100vw; top: 56px; left: 0px; "
    ></v-divider>

    <v-sheet class="ma-0 pa-0 pt-4" elevation="0" align="center">
      <v-container class="ma-0 pa-0" fluid fill-height>
        <v-row align="center" justify="center" class="ma-0 pa-2">
          <v-col class="pa-0 ma-0">
            <div style="position: relative;">
              <v-avatar class="profile" size="60">
                <v-img
                  v-if="avatar"
                  v-bind:src="
                    imagePreviewURL
                      ? imagePreviewURL
                      : avatarStoragePath + avatar
                  "
                  alt="profile pic"
                ></v-img>
                <v-icon v-else size="60" style="color:grey;"
                  >fas fa-user-circle</v-icon
                >
              </v-avatar>
              <v-avatar
                class="profile"
                size="60"
                style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto; background: black; opacity: 10%; "
              >
                <v-icon size="30" style="color: white;"
                  >mdi-camera-outline</v-icon
                >
              </v-avatar>
            </div>
          </v-col>
          <v-col class="pa-0 pr-4 ma-0" cols="9">
            <v-file-input
              v-bind:label="$t('EditMypage.profilePicChange')"
              hide-details
              outlined
              dense
              v-on:change="onFileChange"
              accept="image/png, image/jpeg, image/bmp"
              class="profile-pic-label"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-row align="center" justify="center" class="ma-0 pa-2">
          <v-col class="pa-0 ma-0">
            <v-avatar class="profile" size="60">
              <v-icon size="32">far fa-user</v-icon>
            </v-avatar>
          </v-col>
          <v-col class="pa-0 pr-4 ma-0" cols="9">
            <v-text-field
              v-model="username"
              v-bind:rules="rules"
              type="text"
              name="username"
              filled
              dense
              hide-details
              v-bind:placeholder="$t('EditMypage.userNameChange')"
              class="profile-username-label"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row align="center" justify="center" class="ma-0 pa-2">
          <v-col class="pa-0 ma-0">
            <v-avatar class="profile" size="60">
              <v-icon size="32" class="twitterBlue">fab fa-twitter</v-icon>
            </v-avatar>
          </v-col>
          <v-col class="pa-0 pr-4 ma-0" cols="9">
            <v-row align="center" justify="start" class="ma-0 pa-0">
              <v-col class="pa-0 ma-0" cols="auto">
                https://twitter.com/
              </v-col>
              <v-col class="pa-0 ma-0">
                <v-text-field
                  v-model="twitterAccount"
                  v-bind:rules="rules"
                  type="text"
                  name="twitterAccount"
                  filled
                  dense
                  hide-details
                  v-bind:placeholder="$t('EditMypage.twitterAccount')"
                  class="profile-username-label"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row align="center" justify="center" class="ma-0 pa-2">
          <v-col class="pa-0 ma-0">
            <v-avatar class="profile" size="60">
              <v-icon size="32" color="red">fab fa-youtube</v-icon>
            </v-avatar>
          </v-col>
          <v-col class="pa-0 pr-4 ma-0" cols="9">
            <v-row align="center" justify="start" class="ma-0 pa-0">
              <v-col class="pa-0 ma-0" cols="auto">
                https://www.youtube.com/channel/
              </v-col>
              <v-col class="pa-0 ma-0">
                <v-text-field
                  v-model="youtubeChannel"
                  v-bind:rules="rules"
                  type="text"
                  name="youtubeChannel"
                  filled
                  dense
                  hide-details
                  v-bind:placeholder="$t('EditMypage.youtubeChannel')"
                  class="profile-username-label"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../util";

export default {
  components: {},
  data() {
    return {
      newAvatar: null,
      imagePreviewURL: null,
      rules: [(value) => !!value || "Required"],
    };
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      avatar: "auth/avatar",
    }),
    username: {
      get() {
        return this.$store.getters["auth/username"];
      },
      set(val) {
        return this.$store.commit("auth/setUsername", val);
      },
    },
    twitterAccount: {
      get() {
        return this.$store.getters["auth/twitterAccount"];
      },
      set(val) {
        return this.$store.commit("auth/setTwitterAccount", val);
      },
    },
    youtubeChannel: {
      get() {
        return this.$store.getters["auth/youtubeChannel"];
      },
      set(val) {
        return this.$store.commit("auth/setYoutubeChannel", val);
      },
    },
  },
  methods: {
    ...mapMutations({}),
    cancel() {
      this.$router.push("/mypage");
    },
    save() {
      let formData = new FormData();
      this.newAvatar ? formData.append("file", this.newAvatar) : "";
      formData.append("newUserName", this.username);
      formData.append(
        "twitterAccount",
        this.twitterAccount ? this.twitterAccount : ""
      );
      formData.append(
        "youtubeChannel",
        this.youtubeChannel ? this.youtubeChannel : ""
      );

      this.$store.dispatch("auth/updateUserProfile", formData);

      this.$store.commit("snackbar/setText", "プロフィールを更新しました");
      this.$store.commit("snackbar/seVertical", false);
      this.$store.commit("snackbar/setSnackbar", true);
      this.$store.commit("snackbar/setTimeout", 5000);

      this.$router.push("/mypage");
    },
    onFileChange(e) {
      const file = e; // in case vuetify file input
      if (file && file.type.startsWith("image/")) {
        this.newAvatar = file;
        this.imagePreviewURL = URL.createObjectURL(file);
        URL.revokeObjectURL(file); // free memory
      } else {
        this.imagePreviewURL = null;
      }
    },
  },
  watch: {},
  async mounted() {},
};
</script>
