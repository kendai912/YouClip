<template>
  <v-container class="pa-0 pb-3 body-color">
    <v-row
      v-for="item in mediaItems"
      v-bind:key="item.category+'-'+item.id"
      dense
      class="pa-0 ma-0"
    >
      <v-col class="px-0">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" max-width="420" height="150" elevation="1">
            <v-row class="ma-0">
              <v-col cols="11" class="pa-0">
                <v-row class="ma-0">
                  <v-col cols="6" class="pa-1">
                    <v-img
                      v-on:click.stop="select(item)"
                      class="white--text align-end"
                      v-bind:src="hover ? '/storage/img/' + item.previewgif : item.preview"
                      v-bind:alt="item.title"
                      aspect-ratio="1.5"
                      height="142"
                    >
                      <v-chip label color="rgb(111 111 111)" text-color="white" class="my-scene-chip">
                        <v-img
                          src="/storage/icons/playlist_icon.png"
                          width="16px"
                          max-height="16px"
                        />
                        <span class="caption">&nbsp;{{item.sceneCount}}&nbsp;シーン</span>
                      </v-chip>
                    </v-img>
                  </v-col>
                  <v-col cols="6" class="pa-1 py-3">
                    <v-card-title v-on:click.stop="select(item)" class="py-0 block-playlist-title">
                      <span>{{ item.title }}</span>
                    </v-card-title>
                    <v-card-text class="text--primary" style="font-size: 11px;">
                      <div v-on:click.stop="select(item)" class="grey--text text--darken-3">
                        <span>{{ item.visitCount ? item.visitCount : 0 }}回視聴</span>
                        <span style="font-size:8px;">&nbsp;&#8226;&nbsp;</span>
                        <span>合計{{ item.totalDuration }}</span>
                        <span style="font-size:8px;">&nbsp;&#8226;&nbsp;</span>
                        <span>{{ item.timeSince }}前</span>
                        <span v-if="item.likeCount" style="font-size:8px;">&nbsp;&#8226;&nbsp;</span>
                        <span v-if="item.likeCount">
                          <i class="fas fa-heart my-grey-heart"></i>
                          {{ item.likeCount}}
                        </span>
                      </div>
                    </v-card-text>

                    <v-card-text>
                      <div class="horizontal-list-wrap block-chip-lines2">
                        <v-chip
                          v-for="(tag, tagIndex) in item.tagArray"
                          v-bind:key="item.id + '-' + tagIndex"
                          class="my-tag-chip px-2"
                          color="blue lighten-5"
                          text-color="black"
                        >
                          <v-avatar style="height: 20px !important; width: 20px !important; min-width: 20px !important;">
                            <i class="fas fa-tag my-black"></i>
                          </v-avatar>
                          {{ tag }}
                        </v-chip>
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="1" class="ma-0 pa-0 pt-4 text-center">
                <div class="ma-auto" style="width: 20px; height: 20px;" v-if="user_id === item.user_id" v-on:click="editPlaylist">
                  <span>
                    <i class="fas fa-ellipsis-v my-grey"></i>
                  </span>
                </div>
              </v-col>
            </v-row>
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
      user_id: "auth/user_id",
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
      // window.location.reload();
    },
    async editPlaylist() {
      console.log("edit playlist");
    }
  },
  mounted() {
  }
};
</script>
