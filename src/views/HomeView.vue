<script lang="ts" setup>
import SidebarComponent from "../partials/sidebar/SidebarComponent.vue";
import TheSongDetailsPartial from "../partials/homepageSongDetails/TheSongDetailsPartial.vue";
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";

const { height: screenHeight } = useWindowSize();

const computedMainPartialContainerHeight = computed<number | null>(() => {
  if (screenHeight) return screenHeight.value - 16 ?? null;
  return null;
});

const computedMainPartialStyle = computed(() => {
  return { height: `${computedMainPartialContainerHeight.value}px` };
});
</script>

<template>
  <div class="min-h-screen flex bg-black">
    <SidebarComponent></SidebarComponent>

    <div class="py-2 flex-grow">
      <div :style="computedMainPartialStyle" class="mainPartialContainer">
        <router-view />
      </div>
    </div>

    <TheSongDetailsPartial class="flex-shrink-0"></TheSongDetailsPartial>
  </div>
</template>

<style lang="scss" scoped>
.mainPartialContainer {
  @apply bg-gray-back h-full rounded-lg overflow-auto;
}
</style>
