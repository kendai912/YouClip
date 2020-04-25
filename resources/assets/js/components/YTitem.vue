<template>
  <v-sheet>
    <v-card
      v-for="item in YTitems"
      v-bind:key="item.etag"
      class="mx-auto"
      tile
      max-width="400"
      elevation="1"
    >
      <v-container class="pa-0 my-2">
        <v-row v-on:click="select(item)" justify="center" align-content="center">
          <v-col cols="6">
            <v-img
              v-bind:src="item.snippet.thumbnails.high.url"
              v-bind:alt="item.snippet.title + '-thumbnail'"
              class="white--text align-end"
              max-height="133.33px"
              aspect-ratio="1.5"
            >
              <v-card-subtitle>◯:◯◯</v-card-subtitle>
            </v-img>
          </v-col>

          <v-col cols="6">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ item.snippet.title }}</v-list-item-title>
                <v-list-item-subtitle>投稿者</v-list-item-subtitle>
                <v-list-item-subtitle>
                  <span>◯回視聴</span>
                  <span>◯週間前</span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <YTLoadingItem
      v-if="isYTLoading"
      v-bind:numberOfYTItemsPerPagination="numberOfYTItemsPerPagination"
    />
  </v-sheet>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import YTLoadingItem from "../components/YTLoadingItem.vue";
import myMixin from "../util";

export default {
  components: {
    YTLoadingItem
  },
  props: {
    YTitems: Array
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isYTLoading: "YTsearch/isYTLoading",
      numberOfYTItemsPerPagination: "YTsearch/numberOfYTItemsPerPagination"
    })
  },
  methods: {
    select(item) {
      //シーンタグ付けページを表示
      this.$router
        .push({
          path: "/youtube",
          query: {
            v: item.id.videoId
          }
        })
        .catch(err => {});
      location.reload();
    }
  }
};
</script>
