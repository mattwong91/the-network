<template>
  <div v-if="profile" class="container-fluid p-5">
    <section class="row profile-card">
      <div class="col-12 cover">
        <img class="cover-img" :src="profile.coverImg" alt="cover image">
      </div>
      <div class="px-5">
        <div class="col-12 py-3 d-flex justify-content-between">
          <img class="profile-img" :src="profile.picture" :alt="profile.name">
          <div class="fs-1">
            <a v-if="profile.github != ''" class="mdi text-dark mdi-github" :href="profile.github"></a>
            <a v-if="profile.linkedin != ''" class="mdi text-dark mdi-linkedin" :href="profile.linkedin"></a>
            <a v-if="profile.resume != ''" class="mdi text-dark mdi-note-text-outline" :href="profile.resume"></a>
          </div>
        </div>
        <div class="col-12">
          <p class="fs-4">{{ profile.class }} <span v-if="profile.graduated"><i class="mdi mdi-school"></i></span></p>
          <p class="fs-2 fw-bold">{{ profile.name }}</p>
        </div>
        <div class="col-12 py-4">
          <p>{{ profile.bio }}</p>
        </div>
      </div>
    </section>
    <section v-if="posts.length" class="row pt-5">
      <div v-for="post in posts" :key="post.id" class="col-12 mb-3">
        <PostCard :post="post" />
      </div>
    </section>
    <section class="row pb-5">
      <Pagination />
    </section>
  </div>

  <div v-else class="container-fluid text-center pt-5">
    <section class="row pt-5">
      <div class="col-12 pt-5">
        <div class="spinner-border" role="status"></div>
      </div>
    </section>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { profilesService } from "../services/ProfilesService.js"
import PostCard from "../components/PostCard.vue";
import Pagination from "../components/Pagination.vue";

export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      profilesService.clearData();
      getProfileById();
      getPostsByProfileId();
    });
    async function getProfileById() {
      try {
        const profileId = route.params.profileId;
        await profilesService.getProfileById(profileId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function getPostsByProfileId() {
      try {
        const profileId = route.params.profileId;
        await profilesService.getPostsByProfileId(profileId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts)
    };
  },
  components: { PostCard, Pagination }
};
</script>


<style lang="scss" scoped>
p {
  margin-bottom: 0;
}

.profile-card {
  border-color: black;
  border-radius: 5px;
  box-shadow: 1px 1px 5px black;
}

.profile-img {
  width: 15vh;
  height: 15vh;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.cover-img {
  height: 20vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.col-12.cover {
  padding-right: 0;
  padding-left: 0;
}
</style>