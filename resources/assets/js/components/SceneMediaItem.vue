<template>
  <v-container class="pa-0 pb-3">
    <v-row
      v-for="item in mediaItems"
      v-bind:key="item.category+'-'+item.id"
      dense
      class="pa-0 ma-0"
    >
      <v-col class="px-0" style="padding-top: 2px; paddint-bottom: 2px;">
        <v-card class="mx-auto" max-width="420" elevation="0" style="border-radius: 2px;">
          <v-hover v-slot:default="{ hover }">
            <v-img
              v-if="!hover"
              v-on:click.stop="select(item)"
              class="white--text align-end"
              max-height="266.66px"
              v-bind:src="'/storage/img/' + item.preview"
              v-bind:alt="item.title"
              aspect-ratio="1.5"
            >
              <v-chip label color="#27252582" text-color="white" class="scene-chip">
                {{item.start+'&nbsp;~&nbsp;'+item.end}}
              </v-chip>

              <v-card-text class="pa-2">
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
            </v-img>
            <video v-else controls autoplay muted style="width: 100%; height: 150px;">
              <source v-bind:src="'/storage/videos/'+item.previewgif" type="video/mp4">
            </video>
          </v-hover>
          <v-list-item class="px-2 pt-0 pb-2 mb-2">
            <v-list width="55px" class="py-1 pl-1 pr-3">
              <v-img src="/storage/icons/yt_social_red.png" />
            </v-list>
            <v-list-item-content>
              <v-card-title class="pa-0" v-on:click.stop="select(item)">
                <span class="home-and-search-result-title">{{ item.title }}</span>
              </v-card-title>
              <!-- <v-card-text class="text--primary">
                <div v-on:click.stop="select(item)" class="grey--text text--darken-3">
                  <span>{{ item.visitCount ? item.visitCount : 0 }}回視聴</span>
                  <span style="font-size:8px;">&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>
                  <span>合計{{ item.totalDuration }}</span>
                  <span style="font-size:8px;">&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>
                  <span>{{ item.timeSince }}前</span>
                  <span
                    v-if="item.likeCount"
                    style="font-size:8px;"
                  >&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>
                  <span v-if="item.likeCount">
                    <i class="fas fa-heart my-grey-heart"></i>
                    {{ item.likeCount}}
                  </span>
                </div>
              </v-card-text> -->
            </v-list-item-content>
          </v-list-item>

          <!-- <v-card-text class="px-4">
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
          </v-card-text> -->
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
    LoadingItem,
  },
  props: {
    mediaItems: Array,
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters({
      isLoading: "loadingItem/isLoading",
      numberOfItemsPerPagination: "loadingItem/numberOfItemsPerPagination",
    }),
  },
  methods: {
    async select(mediaItem) {
      await this.$store.dispatch(
        "playlist/addPlaylistVisitCount",
        mediaItem.id
      );
      //プレイリストの場合
      if (mediaItem.category == "playlist") {
        //再生ページを表示
        this.$router
          .push({
            path: "/watch",
            query: {
              playlist: mediaItem.id,
              index: "0",
            },
          })
          .catch((err) => {});
      }

      //タグの場合
      if (mediaItem.category == "tag") {
        //再生ページを表示
        this.$router
          .push({
            path: "/watch",
            query: {
              tag: mediaItem.id,
            },
          })
          .catch((err) => {});
      }

      // IFrame Player APIを呼び出すためにページをリロード
      // window.location.reload();
    },
  },
  mounted() {},
};
</script>
