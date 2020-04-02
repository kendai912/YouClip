<template>
  <div class="v-modal" v-on:click="closeLoginModal">
    <div class="text-dark shadow rounded mb-7 modal-in-box" v-on:click.stop>
      <div>{{ messageWhenNotLogined }}</div>
      <div>
        <span v-on:click="closeLoginModal">キャンセル</span>
        <router-link to="/login">ログイン</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  props: {},
  computed: {
    ...mapGetters({
      messageWhenNotLogined: "noLoginModal/messageWhenNotLogined"
    })
  },
  methods: {
    ...mapMutations({
      closeLoginModal: "noLoginModal/closeLoginModal"
    })
  },
  created() {}
};
</script>