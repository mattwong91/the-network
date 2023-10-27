<template>
  <h1>This is a profile page</h1>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { profilesService } from "../services/ProfilesService.js"

export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      getProfileById()
      getPostsByProfileId()
    })
    async function getProfileById() {
      try {
        const profileId = route.params.profileId
        await profilesService.getProfileById(profileId)
      }
      catch (error) {
        Pop.error(error)
      }
    }
    return {}
  }
};
</script>


<style lang="scss" scoped></style>