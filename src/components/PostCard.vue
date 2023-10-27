<template>
  <section class="row post-card">
    <div class="col-11 d-flex align-items-center">
      <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
        <img class="p-4 profile-img" :src="post.creator.picture" :alt="post.creator.name">
      </router-link>
      <div class="ps-5">
        <h4>{{ post.creator.name }} <span v-if="post.creator.graduated" class="ps-3"><i class="mdi mdi-school"></i></span>
        </h4>
        <p> Created at: {{ post.createdAt.toLocaleDateString() }}</p>
      </div>
    </div>
    <div class="col-1 text-end">
      <p>...</p>
    </div>
    <div class="col-12 text-center py-3">
      {{ post.body }}
    </div>
    <div class="col-12 cover">
      <img class="post-img" v-if="post.imgUrl != ''" :src="post.imgUrl" alt="image in post">
    </div>
    <div class="col-12 py-2 d-flex align-items-center justify-content-end">
      <i class="mdi mdi-heart-outline fs-2 pe-2"></i>
      <p class="pe-2">{{ post.likes.length }}</p>
    </div>
  </section>
</template>


<script>
import { Post } from "../models/Post";

export default {
  props: {
    post: { type: Post, required: true }
  },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>
p {
  margin-bottom: 0;
}

.post-card {
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

.post-img {
  object-fit: cover;
  width: 100%;
  height: 60vh;
  object-position: center;
}

.col-12.cover {
  padding-right: 0;
  padding-left: 0;
}
</style>