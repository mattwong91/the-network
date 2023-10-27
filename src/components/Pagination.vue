<template>
  <div class="col-12 d-flex justify-content-around">
    <button :disabled="!newer" @click="changePage(newer)" class="btn btn-outline-primary"><i
        class="mdi mdi-arrow-left"></i>
      Newer</button>
    <button :disabled="!older" @click="changePage(older)" class="btn btn-outline-primary">Older <i
        class="mdi mdi-arrow-right"></i></button>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    return {
      newer: computed(() => AppState.newerPage),
      older: computed(() => AppState.olderPage),

      async changePage(url) {
        try {
          await postsService.changePage(url)
        }
        catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped></style>