<template>
  <v-container class="pa-0 body-color">
    <v-card
      class="mx-auto"
      max-width="420"
      tile
      flat
      color="rgb(245, 245, 245)"
    >
      <v-row>
        <v-col class="pa-0 pt-2 text-center">
          <span class="h5 font-weight-black">
            Kendai Miyazawa
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="4"
        >
          <div class="text-center">
            <!-- <v-badge
              avatar
              bottom
              offset-x="25"
              offset-y="25"
            > -->
              <v-avatar
                class="profile"
                size="100"
              >
                <v-img src="/storage/logos/pph_son.png"></v-img>
              </v-avatar>
            <!-- </v-badge> -->
          </div>
        </v-col>
        <v-col cols="4" class="d-flex justify-center align-center text-center">
          <div>
            <span class="h6 font-weight-medium">
              100
            </span> <br/>
            <span class="h6 font-weight-medium">
              フォロワー
            </span>
          </div>
        </v-col>        
        <v-col cols="4" class="d-flex justify-center align-center text-center">
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
      <v-row class="ma-0">
        <v-col class="pt-0">
          <div>
            <span class="h6 font-weight-bold">
              Kendai Miyazawa
            </span>
          </div>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col class="pb-1">
          <v-btn width="100%" color="white" >プロフィールを編集</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    item: {
      color: '#952175',
      src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
      title: 'Halcyon Days',
      artist: 'Ellie Goulding',
    },
  }),
}
</script>