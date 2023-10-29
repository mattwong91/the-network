<template>
  <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }">
    <section class="row profile-card py-2 align-items-center text-dark">
      <div class="col-4 text-center">
        <img class="profile-img" :src="profile.picture" :alt="profile.name">
      </div>
      <div class="col-8">
        <p class="fs-4">{{ profile.class }} <span v-if="profile.graduated"><i class="mdi mdi-school"></i></span></p>
        <p class="fs-2 fw-bold">{{ profile.name }}</p>
      </div>
    </section>
  </router-link>
</template>


<script>
import { Profile } from "../models/Profile";
export default {
  props: {
    profile: { type: Profile, required: true }
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
</style>