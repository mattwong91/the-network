<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid">
      <section class="row">

        <div class="col-9 hero-content p-5">
          <router-view />
        </div>
        <!-- SECTION ADS -->
        <div class="col-3 p-4">
          <Advertisement />
        </div>
        <!-- !SECTION ADS -->
      </section>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Advertisement from "./components/Advertisement.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Advertisement }
}
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}


.hero-content {
  overflow-y: scroll;
  height: var(--main-height);
}
</style>
