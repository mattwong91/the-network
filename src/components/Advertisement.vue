<template>
  <div class="container-fluid">
    <section class="row">
      <div v-for="ad in ads" :key="ad.title" class="col-12 py-1">
        <img class="img-fluid" :src="ad.square" :alt="ad.title">
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { adsService } from "../services/AdsService";
export default {
  setup() {
    onMounted(() => {
      getAds()
    })
    async function getAds() {
      try {
        await adsService.getAds()
      }
      catch (error) {
        Pop.error(error)
      }
    }
    return {
      ads: computed(() => AppState.ads)
    }
  }
};
</script>


<style lang="scss" scoped></style>