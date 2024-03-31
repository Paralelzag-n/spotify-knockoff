<script lang="ts" setup>
import SidebarComponent from "../partials/YourLibrary/YourLibraryComponent.vue";
import { computed, ref } from "vue";
import { useElementSize, useWindowSize } from "@vueuse/core";
import TheHeader from "../partials/TheHeader.vue";
import DragHandle from "../components/DragHandle.vue";
import { useLayoutStore } from "../pinia/layout.pinia.ts";
import { ESidebarItem } from "../ts/pinia/layout.types.ts";

const yourLibraryHandleRef = ref<HTMLElement | null>(null);
const sidebarHandleRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);

const { height: headerHeight } = useElementSize(headerRef);
const { height: screenHeight, width: screenWidth } = useWindowSize();

const layoutStore = useLayoutStore();
const computedSidebarWidth = computed(() => layoutStore.getSidebarWidth);
const computedYourLibraryWidth = computed(
  () => layoutStore.getYourLibraryWidth,
);
const computedMainViewWidth = computed(
  () =>
    screenWidth.value -
    computedSidebarWidth.value -
    computedYourLibraryWidth.value -
    16,
);

const computedSelectedSidebarItem = computed<ESidebarItem>(
  () => layoutStore.sidebarItem,
);

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
      <div
        :style="{ width: `${computedYourLibraryWidth}px` }"
        class="flex-shrink-0 ps-2 pb-2 h-full"
      >
        <SidebarComponent class="h-full" />
      </div>

      <DragHandle
        ref="yourLibraryHandleRef"
        :height="computedDragHandleHeight"
        :onDrag="handleDragYourLibrary"
      />

      <!--  MAIN PARTIAL -->
      <div :style="{ width: `${computedMainViewWidth}px` }" class="pb-2">
        <div class="mainPartialContainer">
          <router-view />
        </div>
      </div>

      <DragHandle
        ref="sidebarHandleRef"
        :height="computedDragHandleHeight"
        :onDrag="handleDragSidebar"
      />

      <div
        :style="{ width: `${computedSidebarWidth}px` }"
        class="pe-2 pb-2 flex-shrink-0"
      >
        <component :is="computedSelectedSidebarItem" class="h-full bg-module" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mainPartialContainer {
  @apply bg-module h-full rounded-lg overflow-auto;
}
</style>
