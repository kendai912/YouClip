<template>
  <div class="container--small">
    <div>Search</div>
    <div>
      <div>
        <input
          id="searchBox"
          type="text"
          v-model="searchQuery"
          v-on:input="searchCandidates"
        />
        <span id="searchBtn" v-on:click="search"
          ><img alt="検索" src="/img/search.svg"
        /></span>
      </div>
      <div
        v-bind:class="{ candidatesWrap: candidates.length != 0 }"
        v-if="searchQuery != ''"
      >
        <div v-for="(candidate, index) in candidates" v-bind:key="index">
          <div
            v-if="index < 10 && candidate.playlistName"
            class="item"
            v-bind:class="{ isEven: index % 2 == 1 }"
          >
            <p v-on:click="select(candidate.playlistName)">
              @{{ candidate.playlistName }}
            </p>
          </div>
          <div
            v-if="index < 10 && candidate.tags"
            class="item"
            v-bind:class="{ isEven: index % 2 == 1 }"
          >
            <p v-on:click="select(candidate.tags)">@{{ candidate.tags }}</p>
          </div>
          <div
            v-if="index < 10 && candidate.title"
            class="item"
            v-bind:class="{ isEven: index % 2 == 1 }"
          >
            <p v-on:click="select(candidate.title)">@{{ candidate.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      searchQuery: "",
      candidates: []
    };
  },
  methods: {
    search() {},
    searchCandidates() {
      this.searchQuery = $("#searchBox").val();
      let self = this;
      let params = {
        searchQuery: this.searchQuery
      };
      this.errors = {};

      axios
        .post("api/search/candidates", params)
        .then(function(response) {
          // 成功した時
          self.candidates = response.data.candidates;
        })
        .catch(function(error) {
          // 失敗した時
          console.log(error);
          let errors = {};
          for (var key in error.response.data.errors) {
            errors[key] = error.response.data.errors[key].join("<br>");
          }
          self.errors = errors;
        });
    },
    select(candidateName) {
      this.searchQuery = candidateName;
      this.candidates = [];
      this.search();
    }
  },
  created() {},
  computed: {}
};
</script>
