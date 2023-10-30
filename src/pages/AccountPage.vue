<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <div class="about text-center">
          <h1>Welcome {{ account.name }}</h1>
          <img class="rounded-circle" :src="account.picture" alt="" />
          <p>{{ account.email }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    };
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
