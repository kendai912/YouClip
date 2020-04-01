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
  created() {}
};
</script>
