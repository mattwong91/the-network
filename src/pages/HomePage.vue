<template>
  <div class="container-fluid">

    <!-- SECTION POST CREATION -->
    <section v-if="account.id" class="row p-4">
      <div class="col-12">
        <PostSubmit />
      </div>
    </section>
    <section v-else class="row text-center py-5">
      <div class="col-12 pt-5">
        <div class="spinner-border" role="status"></div>
      </div>
    </section>
    <!-- !SECTION POST CREATION -->


    <!-- SECTION POSTS -->

    <section v-if="posts.length" class="row p-4">
      <div v-for="post in posts" :key="post.id" class="col-12 mb-3">
        <PostCard :post="post" />
      </div>
      <Pagination />
    </section>
    <section v-else class="row text-center py-5">
      <div class="col-12 pt-5">
        <div class="spinner-border" role="status"></div>
      </div>
    </section>

    <!-- !SECTION POSTS -->

  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import PostCard from "../components/PostCard.vue";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService.js"
import Pagination from "../components/Pagination.vue";
import PostSubmit from "../components/PostSubmit.vue";

export default {
  setup() {
    onMounted(() => {
      getPosts()
    })
    async function getPosts() {
      try {
        await postsService.getPosts()
      }
      catch (error) {
        Pop.error(error)
      }
    }
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account)
    };
  },
  components: { PostCard, Pagination, PostSubmit }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
