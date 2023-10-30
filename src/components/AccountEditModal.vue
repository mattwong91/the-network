<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#accountEditModal">
    Edit
  </button>

  <!-- Modal -->
  <div class="modal fade" id="accountEditModal" tabindex="-1" aria-labelledby="accountEditModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-network text-light">
          <h1 class="modal-title fs-5" id="accountEditModalLabel">Edit Profile</h1>
        </div>
        <div class="modal-body text-start">
          <p class="fs-2">{{ profile.name }}</p>
          <form @submit.prevent="updateProfile()">
            <input v-model="form.picture" class="form-control mb-2" type="url" placeholder="Profile Image Url"
              maxlength="500">
            <textarea v-model="form.bio" class="form-control mb-2 pb-5" placeholder="Bio" maxlength="1000"></textarea>
            <input v-model="form.coverImg" class="form-control mb-2" type="url" placeholder="Cover Image Url"
              maxlength="500">
            <input v-model="form.github" class="form-control mb-2" type="text" placeholder="Github link" maxlength="500">
            <input v-model="form.linkedin" class="form-control mb-2" type="text" placeholder="LinkedIn link"
              maxlength="500">
            <input v-model="form.resume" class="form-control mb-2" type="text" placeholder="Resume link" maxlength="500">
            <input v-model="form.class" class="form-control mb-2" type="text" placeholder="Attending Class"
              maxlength="100">
            <label for="graduated">Graduated</label>
            <input v-model="form.graduated" class="form-check-input" type="checkbox" id="graduated">
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Submit Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import { Profile } from "../models/Profile";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
import { Modal } from "bootstrap";

export default {
  props: {
    profile: { type: Profile, required: true }
  },
  setup() {
    const form = ref({})
    return {
      form,
      async updateProfile() {
        try {
          const profileData = form.value
          await accountService.updateProfile(profileData)
          Modal.getOrCreateInstance('#accountEditModal').hide()
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
.bg-network {
  background-color: #0f6793;
}

label {
  display: block;
}
</style>