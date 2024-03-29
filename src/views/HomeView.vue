<script lang="ts" setup>
import SidebarComponent from "../partials/sidebar/SidebarComponent.vue";
import TheSongDetailsPartial from "../partials/homepageSongDetails/TheSongDetailsPartial.vue";
import { computed, ref } from "vue";
import { useElementSize, useWindowSize } from "@vueuse/core";
import TheHeader from "../partials/header/TheHeader.vue";

const { height: screenHeight } = useWindowSize();

const headerRef = ref<HTMLElement | null>(null);
const { height: headerHeight } = useElementSize(headerRef);

const computedMainPartialContainerHeight = computed<number | null>(() => {
  if (screenHeight) return screenHeight.value - headerHeight.value;
  return null;
});

const computedMainPartialStyle = computed(() => {
  return { height: `${computedMainPartialContainerHeight.value}px` };
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-black">
    <TheHeader ref="headerRef" />
    <div :style="computedMainPartialStyle" class="flex">
      <!--  START PARTIAL -->
      <div class="px-2 pb-2 h-full">
        <SidebarComponent class="flex-shrink-0 h-full w-80"></SidebarComponent>
      </div>

      <!--  MAIN PARTIAL -->
      <div class="pb-2 flex-grow">
        <div class="mainPartialContainer">
          <router-view />
        </div>
      </div>

      <!--  END PARTIAL -->
      <div class="px-2 pb-2">
        <TheSongDetailsPartial class="flex-shrink-0 h-full w-80" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mainPartialContainer {
  @apply bg-gray-back h-full rounded-lg overflow-auto;
}
</style>
