<template>
  <div class="container-fluid">
    <!-- SECTION SEARCH BAR -->
    <section class="row py-5">
      <div class="col-12">
        <form @submit.prevent="getSearchResults()">
          <div class="input-group pe-3">
            <input v-model="form" type="text" class="form-control" placeholder="Search" max="50">
            <button class="btn btn-outline-secondary mdi mdi-magnify" type="submit"></button>
          </div>
        </form>
      </div>
    </section>
    <!-- !SECTION SEARCH BAR -->

    <section v-if="profiles.length" class="row">
      <h2>Profiles</h2>
      <div v-for="profile in profiles" :key="profile.id" class="col-12 mb-3">
        <ProfileCard :profile="profile" />
      </div>
    </section>

    <section v-if="posts.length" class="row py-5">
      <h2>Posts</h2>
      <div v-for="post in posts" :key="post.id" class="col-12 mb-3">
        <PostCard :post="post" />
      </div>
      <Pagination />
    </section>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { profilesService } from "../services/ProfilesService";
import ProfileCard from "../components/ProfileCard.vue";
import PostCard from "../components/PostCard.vue";
import Pagination from "../components/Pagination.vue";
export default {
  setup() {
    const form = ref('');
    onMounted(() => {
      postsService.clearData();
      profilesService.clearData();
    });
    return {
      form,
      posts: computed(() => AppState.posts),
      profiles: computed(() => AppState.profiles),
      async getSearchResults() {
        try {
          const searchQuery = form.value;
          await postsService.getPostsBySearchQuery(searchQuery);
          await profilesService.getProfilesBySearchQuery(searchQuery);
        }
        catch (error) {
          Pop.error(error);
        }
      }
    };
  },
  components: { ProfileCard, PostCard, Pagination }
};
</script>


<style lang="scss" scoped>
h2 {
  margin-bottom: 1rem;
}
</style>