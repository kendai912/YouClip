<template>
  <v-container>
    <v-row
      v-for="item in mediaItems"
      v-bind:key="item.category+'-'+item.id"
      dense
      class="pa-0 ma-0"
    >
      <v-col>
        <v-card class="mx-auto" tile max-width="400" elevation="1">
          <v-img
            v-on:click.stop="select(item)"
            class="white--text align-end"
            max-height="266.66px"
            v-bind:src="'/storage/img/' + item.preview"
            v-bind:alt="item.title"
            aspect-ratio="1.5"
          ></v-img>

          <v-list-item>
            <v-list-item-avatar color="grey">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-card-title v-on:click.stop="select(item)" class="pb-0">{{ item.title }}</v-card-title>
              <v-card-text class="text--primary">
                <div v-on:click.stop="select(item)" class="grey--text text--darken-3">
                  <span>合計{{ item.totalDuration }}</span>
                  <span>◯シーン</span>
                  <span>◯回視聴</span>
                  <span>◯週間前</span>
                </div>
              </v-card-text>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <div class="horizontal-list-wrap">
              <ul v-if="item.tagsList" class="horizontal-list">
                <li
                  class="item"
                  v-for="(tagsList, tagsListIndex) in item.tagsList"
                  v-bind:key="item.id + '-' + tagsListIndex"
                >
                  <v-chip
                    v-for="(tag, tagIndex) in tagsList.tags.split(/[\s| |　]/)"
                    v-bind:key="item.id + '-' + tagsListIndex + '-' + tagIndex"
                    class="ma-2"
                    small
                    color="blue lighten-2"
                    text-color="white"
                  >
                    <v-avatar left>
                      <i class="fas fa-tag my-grey"></i>
                    </v-avatar>
                    {{ tag }}
                  </v-chip>
                </li>
              </ul>
              <ul v-else class="horizontal-list">
                <li class="item">
                  <v-chip
                    v-for="(tag, tagIndex) in item.tags.split(/[\s| |　]/)"
                    v-bind:key="item.id + '-' + tagIndex"
                    class="ma-2"
                    small
                    color="blue lighten-2"
                    text-color="white"
                  >
                    <v-avatar left>
                      <i class="fas fa-tag my-grey"></i>
                    </v-avatar>
                    {{ tag }}
                  </v-chip>
                </li>
              </ul>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <LoadingItem v-if="isLoading" v-bind:numberOfItemsPerPagination="numberOfItemsPerPagination" />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import LoadingItem from "../components/LoadingItem.vue";
import myMixin from "../util";

export default {
  data: () => ({}),
  components: {
    LoadingItem
  },
  props: {
    mediaItems: Array
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isLoading: "loadingItem/isLoading",
      numberOfItemsPerPagination: "loadingItem/numberOfItemsPerPagination"
    })
  },
  methods: {
    async select(mediaItem) {
      //プレイリストの場合
      if (mediaItem.category == "playlist") {
        //再生ページを表示
        this.$router
          .push({
            path: "/watch",
            query: {
              playlist: mediaItem.id,
              index: "0"
            }
          })
          .catch(err => {});
      }

      //タグの場合
      if (mediaItem.category == "tag") {
        //再生ページを表示
        this.$router
          .push({
            path: "/watch",
            query: {
              tag: mediaItem.id
            }
          })
          .catch(err => {});
      }

      // IFrame Player APIを呼び出すためにページをリロード
      window.location.reload();
    }
  },
  mounted() {}
};
</script>
