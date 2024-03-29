<script lang="ts" setup>
import SidebarComponent from "../partials/sidebar/SidebarComponent.vue";
import TheSongDetailsPartial from "../partials/homepageSongDetails/TheSongDetailsPartial.vue";
import { computed, ref } from "vue";
import { useElementSize, useWindowSize } from "@vueuse/core";
import TheHeader from "../partials/header/TheHeader.vue";
import DragHandle from "../components/DragHandle.vue";
import { storeToRefs } from "pinia";
import { useLayoutStore } from "../pinia/layout.pinia.ts";

const { height: screenHeight } = useWindowSize();

const headerRef = ref<HTMLElement | null>(null);
const { height: headerHeight } = useElementSize(headerRef);

const layoutStore = useLayoutStore();

const computedMainPartialContainerHeight = computed<number | null>(() => {
  if (screenHeight) return screenHeight.value - headerHeight.value;
  return 0;
});

const computedMainPartialStyle = computed(() => {
  return { height: `${computedMainPartialContainerHeight.value}px` };
});

const computedDragHandleHeight = computed(() => {
  if (computedMainPartialContainerHeight.value)
    return computedMainPartialContainerHeight.value - 40;
  return 0;
});

const yourLibraryHandleRef = ref<HTMLElement | null>(null);
const sidebarHandleRef = ref<HTMLElement | null>(null);

const { sidebarWidth, yourLibraryWidth } = storeToRefs(layoutStore);

const handleDragYourLibrary = (deltaX: number) => {
  layoutStore.adjustYourLibraryWidth(deltaX);
};

const handleDragSidebar = (deltaX: number) => {
  layoutStore.adjustSidebarWidth(deltaX);
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-black">
    <TheHeader ref="headerRef" />
    <div :style="computedMainPartialStyle" class="flex">
      <!--  START PARTIAL -->
      <div :style="{ width: `${yourLibraryWidth}px` }" class="ps-2 pb-2 h-full">
        <SidebarComponent class="flex-shrink-0 h-full" />
      </div>

      <DragHandle
        ref="yourLibraryHandleRef"
        :height="computedDragHandleHeight"
        :onDrag="handleDragYourLibrary"
      />

      <!--  MAIN PARTIAL -->
      <div class="pb-2 flex-grow">
        <div class="mainPartialContainer">
          <router-view />
        </div>
      </div>

      <DragHandle
        ref="sidebarHandleRef"
        :height="computedDragHandleHeight"
        :onDrag="handleDragSidebar"
      />

      <div :style="{ width: `${sidebarWidth}px` }" class="pe-2 pb-2">
        <TheSongDetailsPartial class="flex-shrink-0 h-full" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mainPartialContainer {
  @apply bg-gray-back h-full rounded-lg overflow-auto;
}
</style>
