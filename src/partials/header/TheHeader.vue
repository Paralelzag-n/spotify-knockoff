<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const computedhomeClass = computed(() => {
  return route.path === "/home" ? "text-white" : "text-white/40";
});
</script>

<template>
  <div class="h-14 grid grid-cols-3">
    <div></div>
    <div class="flex justify-center items-center">
      <router-link
        :class="computedhomeClass"
        :to="{ name: 'home' }"
        class="home-link-button"
      >
        <div class="home-link-button-bg" />
        <i class="fa-solid fa-house z-20" />
      </router-link>
    </div>
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
.home-link-button {
  @apply relative flex justify-center items-center w-10 h-10;

  &:hover .home-link-button-bg {
    transform: scale(1.05);
  }
}

.home-link-button-bg {
  @apply absolute w-10 h-10 bg-card-gray rounded-full left-0 top-0 transition-all ease-in-out z-10;
  &:hover {
    transform: scale(1.05);
  }
}
</style>
