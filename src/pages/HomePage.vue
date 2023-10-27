<template>
  <div class="container-fluid">
    <section class="row justify-content-center">


      <!-- SECTION POSTS -->

      <section v-if="posts.length" class="row p-4">
        <div v-for="post in posts" :key="post.id" class="col-12 mb-3">
          <PostCard :post="post" />
        </div>
        <Pagination />
      </section>
      <section v-else class="row text-center pt-5">
        <div class="col-12 pt-5">
          <div class="spinner-border" role="status"></div>
        </div>
      </section>

      <!-- !SECTION POSTS -->


    </section>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import PostCard from "../components/PostCard.vue";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService.js"
import Pagination from "../components/Pagination.vue";

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
      posts: computed(() => AppState.posts)
    };
  },
  components: { PostCard, Pagination }
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
