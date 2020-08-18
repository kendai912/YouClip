<template>
  <v-container class="body-color">
    <v-card
      class="mx-auto"
      max-width="400"
      tile
    >
      <v-row
        class="fill-height"
      >
        <v-col
          align-self="start"
          class="pa-0"
          cols="4"
        >
          <v-avatar
            class="profile"
            color="grey"
            size="164"
          >
            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item
            dark
          >
            <v-list-item-content>
              <v-list-item-title class="title">Marcus Obrien</v-list-item-title>
              <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
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