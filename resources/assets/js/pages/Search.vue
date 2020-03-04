<template>
  <div class="container--small">
    <h1>Search</h1>
    <div>
      <SearchBox />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SearchBox from "../components/SearchBox.vue";

export default {
  components: {
    SearchBox
  }
};
</script>
