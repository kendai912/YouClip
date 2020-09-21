<template>
  <v-container class="pa-0 body-color">
    <v-card
      class="mx-auto"
      max-width="420"
      tile
      flat
      color="rgb(245, 245, 245)"
    >
      <v-row class="ma-0">
        <v-col class="pa-0 pt-2 text-center">
          <v-img
            src="/storage/icons/keyboard_arrow_left.svg"
            width="28px"
            max-height="28px"
            class="float-left mr-2"
            v-on:click.stop="goback"
          />
          <span class="h5 font-weight-black">
            Kendai Miyazawa
          </span>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="4" class="ma-0 pa-0">
          <div class="text-center">
            <v-avatar
              class="profile"
              size="100"
            >
              <v-img src="/storage/logos/pph_son.png"></v-img>
            </v-avatar>
          </div>
        </v-col>
        <v-col cols="8" class="ma-0 pa-0">
          <v-row class="ma-0">
            <v-col cols="6" class="d-flex justify-center align-center text-center">
              <div>
                <span class="h6 font-weight-medium">
                  100
                </span> <br/>
                <span class="h6 font-weight-medium">
                  フォロワー
                </span>
              </div>
            </v-col>        
            <v-col cols="6" class="d-flex justify-center align-center text-center">
              <div>
                <span class="h6 font-weight-medium">
                  100
                </span> <br/>
                <span class="h6 font-weight-medium">
                  フォロー中
                </span>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="4" class="py-0 ma-auto">
          <div class="text-center">
            <span class="h6 font-weight-bold">
              Kendai Miyazawa
            </span>
          </div>
        </v-col>
        <v-col cols="8" class="py-0">
          <v-row class="ma-0">
            <v-col class="pa-0 ma-0">
              <v-btn width="100%" color="primary" v-if="isFollow">フォロー</v-btn>
              <v-btn width="100%" color="primary" v-else >アンフォロー</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    isFollow: true
  }),
  methods: {
    goback () {
      this.$router.go(-1);
    }
  }
}
</script>