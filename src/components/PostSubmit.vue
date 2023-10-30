<template>
  <section class="row create-card px-2 py-3">
    <div class="col-3">
      <img class="profile-img" :src="account.picture" :alt="account.name">
    </div>
    <div class="col-9 ps-4">
      <form @submit.prevent="createPost()" class="row">
        <div class="col-12 pb-3">
          <textarea v-model="form.body" class="form-control pb-5" name="postBody" id="postBody"
            placeholder="Type your post" maxlength="500" required>
      </textarea>
        </div>
        <div class="col-12 d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <i class="mdi mdi-image-multiple-outline px-2"></i>
            <input v-model="form.imgUrl" class="form-control" type="url" maxlength="500" placeholder="Image Url...">
          </div>
          <div class="d-flex align-items-center">
            <i class="mdi mdi-send px-2"></i>
            <button type="submit" class="btn btn-outline-primary">Post</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref } from 'vue';
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const form = ref({})
    return {
      form,
      account: computed(() => AppState.account),
      async createPost() {
        try {
          const postData = form.value
          await postsService.createPost(postData)
          form.value = {}
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
.profile-img {
  width: 15vh;
  height: 15vh;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.create-card {
  border-color: black;
  border-radius: 5px;
  box-shadow: 1px 1px 5px black;
}
</style>