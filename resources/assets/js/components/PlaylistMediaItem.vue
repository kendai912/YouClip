<template>
  <v-container class="pa-0 pb-3">
    <v-row
      v-for="item in mediaItems"
      v-bind:key="item.category+'-'+item.id"
      dense
      class="pa-0 ma-0 mb-1"
    >
      <v-col class="px-0" style="padding-top: 2px; paddint-bottom: 2px;">
        <v-hover v-slot:default="{ hover }">
          <v-card class="mx-auto" max-width="420" elevation="0" style="border-radius: 2px;">
            <v-img
              v-on:click.stop="select(item)"
              class="white--text align-end"
              max-height="266.66px"
              v-bind:src="hover ? '/storage/img/' + item.previewgif : item.preview"
              v-bind:alt="item.title"
              aspect-ratio="1.5"
            >
              <v-chip label color="#27252582" text-color="white" class="scene-chip">
                <v-img
                  src="/storage/icons/playlist_icon.png"
                  width="28px"
                  max-height="28px"
                />&nbsp;{{item.sceneCount}}&nbsp;シーン
              </v-chip>
            </v-img>

            <v-list-item class="pl-2 mb-0">
              <v-list width="55px" class="pt-1 pb-0 pl-1 pr-3 ">
                <v-img src="/storage/icons/clip.svg"/>
              </v-list>
              <v-list-item-content>
                <v-card-title v-on:click.stop="select(item)" class="pb-0 mb-0"><span class="home-and-search-result-title">{{ item.title }}</span></v-card-title>
                <v-card-text class="text--primary">
                  <div v-on:click.stop="select(item)" class="grey--text text--darken-3">
                    <span>{{ item.visitCount ? item.visitCount : 0 }}回視聴</span><span style="font-size:8px;">&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>
                    <span>合計{{ item.totalDuration }}</span><span style="font-size:8px;">&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>
                    <span>{{ item.timeSince }}前</span><span v-if="item.likeCount" style="font-size:8px;">&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>
                    <span v-if="item.likeCount">
                      <i class="fas fa-heart my-grey-heart"></i>
                      {{ item.likeCount}}
                    </span>
                  </div>
                </v-card-text>
              </v-list-item-content>
            </v-list-item>

            <v-card-text class="px-2">
              <div class="horizontal-list-wrap block-chip-lines3">
                <v-chip
                  v-for="(tag, tagIndex) in item.tagArray"
                  v-bind:key="item.id + '-' + tagIndex"
                  class="my-tag-chip"
                  small
                  color="blue lighten-5"
                  text-color="black"
                  style="font-weight: normal"
                >
                  <v-avatar left>
                    <i class="fas fa-tag my-black"></i>
                  </v-avatar>
                  {{ tag }}
                </v-chip>
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
    }
  },
  mounted() {
  }
};
</script>
