<script lang="ts" setup>
import NewJeans from "../../../assets/img/banner/NewJeans.jpg";
import { computed, ref } from "vue";

const bannerVisible = ref<boolean>(true);
const computedBannerClasses = computed(() => {
  return "absolute bg-black/20 cursor-pointer w-48 text-center text-white px-4 py-2 rounded-full top-4 right-4";
});

function hideBanner() {
  bannerVisible.value = false;
}
</script>

<template>
  <transition name="shrink-height">
    <div v-if="bannerVisible" class="w-full h-72 relative overflow-hidden">
      <img
        :src="NewJeans"
        alt="banner photo"
        class="rounded-lg object-cover w-full h-full"
      />
      <div :class="computedBannerClasses" @click="hideBanner">
        Hide Announcements
      </div>
    </div>
  </transition>
</template>

<style scoped>
.shrink-height-enter-active {
  transition: height 0.25s ease-out;
}

.shrink-height-leave-active {
  transition: height 0.25s ease-out;
}

.shrink-height-enter-from,
.shrink-height-leave-to {
  height: 0;
}

.shrink-height-enter-to,
.shrink-height-leave-from {
  height: 288px;
}
</style>
