<template>
  <v-container class="body-color">
    <v-row
      v-for="item in mediaItems"
      v-bind:key="item.category+'-'+item.id"
      dense
      class="pa-0 ma-0"
    >
      <v-col>
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" max-width="400" elevation="1">
              <v-img
                v-on:click.stop="select(item)"
                class="white--text align-end"
                max-height="266.66px"
                v-bind:src="hover ? '/storage/img/' + item.previewgif : item.preview"
                v-bind:alt="item.title"
                aspect-ratio="1.5"
              >
                <v-chip label color="rgb(111 111 111)" text-color="white" class="scene-chip">
                  <v-img
                    src="/storage/icons/playlist_icon.png"
                    width="28px"
                    max-height="28px"
                  />&nbsp;{{item.sceneCount}}&nbsp;シーン
                  </v-chip>
              </v-img>
            <v-list-item>
              <v-list-item-avatar color="grey">
                <v-icon dark>mdi-account-circle</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-card-title v-on:click.stop="select(item)" class="pb-0">{{ item.title }}</v-card-title>
                <v-card-text class="text--primary">
                  <div v-on:click.stop="select(item)" class="grey--text text--darken-3">
                    <span>合計{{ item.totalDuration }}</span>
                    <span>{{ item.sceneCount }}シーン</span>
                    <!-- <span>◯回視聴</span> -->
                    <span>{{ item.timeSince }}前</span>
                    <span>{{ item.visitCount }}回視聴</span>
                    <span v-if="item.likeCount">
                      <i class="fas fa-heart my-grey-heart"></i>
                      {{ item.likeCount}}
                    </span>
                  </div>
                </v-card-text>
              </v-list-item-content>
            </v-list-item>

            <v-card-text>
              <div class="horizontal-list-wrap">
                <v-chip
                  v-for="(tag, tagIndex) in item.tagArray"
                  v-bind:key="item.id + '-' + tagIndex"
                  class="tag-chip"
                  small
                  color="blue lighten-5"
                  text-color="black"
                >
                  <v-avatar left>
                    <i class="fas fa-tag my-black"></i>
                  </v-avatar>
                  {{ tag }}
                </v-chip>
                <!-- <ul v-if="item.tagsList" class="horizontal-list">
                  <li
                    class="item"
                    v-for="(tags, tagsIndex) in item.tagsList"
                    v-bind:key="item.id + '-' + tagsIndex"
                  >
                    <v-chip
                      v-for="(tag, tagIndex) in tags.tags.split(/[\s| |　]/)"
                      v-bind:key="item.id + '-' + tagsIndex + '-' + tagIndex"
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
                </ul> -->
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
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
      console.log("media item data", mediaItem.tagArray);
      await this.$store.dispatch("playlist/addPlaylistVisitCount", mediaItem.id);
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
  mounted() {
  }
};
</script>
