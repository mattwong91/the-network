<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-network px-3">
    <router-link class="btn text-light lighten-30 selectable text-uppercase" :to="{ name: 'Home' }">
      The Network
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse ps-3" id="navbarText">
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
    <div class="px-3">
      <router-link :to="{ name: 'SearchResults' }" class="btn btn-secondary mdi mdi-magnify"></router-link>
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue';
export default {
  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

.bg-network {
  background-color: #0f6793;
}
</style>
