<template>
  <div class="container--small">
    <v-card class="text-center pa-3 ma-3 body-color" title elevation="0">
      <v-card-title class="pa-0 ma-0 justify-center">
        <v-icon class="pa-0 ma-0" size="100">error</v-icon>
      </v-card-title>
      <v-card-title class="pa-1 mt-2 mx-0 justify-center"
        >{{$t("SystemError.systemErrorOccurred")}}</v-card-title
      >
    </v-card>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      meta: [
        {
          name: "robots",
          content: "noindex",
        },
      ],
    };
  },
};
</script>
