<template>
  <section class="row post-card">
    <div class="col-12 d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
          <img class="p-4 profile-img" :src="post.creator.picture" :alt="post.creator.name">
        </router-link>
        <div class="ps-5">
          <h4>{{ post.creator.name }} <span v-if="post.creator.graduated" class="ps-3"><i
                class="mdi mdi-school"></i></span>
          </h4>
          <p> Created at: {{ post.createdAt.toLocaleDateString() }}</p>
        </div>
      </div>
      <div v-if="account.id == post.creator.id" class="pt-3">
        <button @click="deletePost(post.id)" class="btn btn-outline-danger mdi mdi-trash-can"></button>
      </div>
    </div>
    <div class="col-12 ps-5 pb-4">
      {{ post.body }}
    </div>
    <div class="col-12 cover">
      <img class="post-img" v-if="post.imgUrl != ''" :src="post.imgUrl" alt="image in post">
    </div>
    <div class="col-12 py-2 d-flex align-items-center justify-content-end">

      <button @click="toggleLike(post.id)" v-if="post.likeIds.includes(account.id)"
        class="btn mdi mdi-heart fs-2 p-0 pe-2"></button>
      <button @click="toggleLike(post.id)" v-else class="btn mdi mdi-heart-outline fs-2 p-0 pe-2"></button>
      <p class="pe-2">{{ post.likes.length }}</p>
    </div>
  </section>
</template>


<script>
import { computed } from "vue";
import { Post } from "../models/Post";
import { postsService } from "../services/PostsService";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";

export default {
  props: {
    post: { type: Post, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async deletePost(postId) {
        try {
          const confirm = await Pop.confirm('Are you sure you want to delete this post?')
          if (!confirm) {
            return
          }
          await postsService.deletePost(postId)
        }
        catch (error) {
          Pop.error(error)
        }
      },
      async toggleLike(postId) {
        try {
          await postsService.toggleLike(postId)
        }
        catch (error) {
          Pop.error(error)
        }
      }
    }
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
  height: 55vh;
  object-position: center;
}

.col-12.cover {
  padding-right: 0;
  padding-left: 0;
}
</style>