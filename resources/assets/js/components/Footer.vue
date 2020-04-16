<template>
  <footer class="footer">
    <div>
      <div>
        <RouterLink class="button button--link" to="/home">Top</RouterLink>
      </div>
      <div>
        <RouterLink class="button button--link" to="/search">検索</RouterLink>
      </div>
      <div>
        <RouterLink class="button button--link" to="/tagging">シーン登録</RouterLink>
      </div>
      <div>
        <RouterLink class="button button--link" to="/mypage">マイページ</RouterLink>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      if (this.apiStatus) {
        this.$router.push("/login");
      }
    }
  },
  computed: {
    ...mapState({
      apiStatus: state => state.auth.apiStatus
    }),
    ...mapGetters({
      isLogin: "auth/check"
    })
  }
};
</script>
