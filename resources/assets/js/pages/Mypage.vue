<template>
  <div class="container--small">
    <div v-if="isLogin">
      <MyList />
    </div>
    <div v-else>
      <div>お気に入りのシーンをお楽しみいただけます</div>
      <div>ログインすると、Likeしたシーンやタグ付けしたシーンにアクセス出来ます</div>
      <div>
        <RouterLink class="button button--link" to="/login">Login</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import MyList from "../components/MyList.vue";
import myMixin from "../util";

export default {
  components: {
    MyList
  },
  props: {},
  mixins: [myMixin],
  methods: {
    ...mapMutations({})
  },
  computed: {
    ...mapGetters({
      isLogin: "auth/check"
    })
  },
  created() {
    //ナビバーを非表示
    this.$store.commit("navbar/setShowNavbar", false);

    //リンク先の検索結果ページを初期化
    this.$store.commit("search/setTagVideoResult", null);
    this.$store.commit("search/setPlaylistTagResult", null);
  }
};
</script>
