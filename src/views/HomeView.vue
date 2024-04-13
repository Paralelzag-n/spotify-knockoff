<script lang="ts" setup>
import SidebarComponent from "../partials/YourLibrary/YourLibraryComponent.vue";
import { computed, ref, watch } from "vue";
import { useElementSize, useScroll, useWindowSize } from "@vueuse/core";
import TheHeader from "../partials/TheHeader.vue";
import DragHandle from "../components/DragHandle.vue";
import { useLayoutStore } from "../pinia/layout.pinia.ts";
import MainPartialHeader from "../components/MainPartialHeader.vue";
import ThePlayBar from "../partials/ThePlayBar.vue";

const yourLibraryHandleRef = ref<HTMLElement | null>(null);
const sidebarHandleRef = ref<HTMLElement | null>(null);

const headerRef = ref<HTMLElement | null>(null);
const playBarRef = ref<HTMLElement | null>(null);

const mainPartialContainerRef = ref<HTMLElement | null>(null);
const { y: mainPartialContainerScroll } = useScroll(mainPartialContainerRef);
const scrollEnabledWidth = 225;

watch(mainPartialContainerScroll, (value, oldValue) => {
  if (value > scrollEnabledWidth && oldValue <= scrollEnabledWidth)
    layoutStore.setMainPartialScrolledDown(true);
  else if (value <= scrollEnabledWidth && oldValue > scrollEnabledWidth)
    layoutStore.setMainPartialScrolledDown(false);
});

const { height: headerHeight } = useElementSize(headerRef);
const { height: playBarHeight } = useElementSize(playBarRef);
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

const computedSelectedSidebarItem = computed(
  () => layoutStore.getSidebarComponent,
);

const computedMainPartialContainerHeight = computed<number | null>(() => {
  if (screenHeight)
    return screenHeight.value - headerHeight.value - playBarHeight.value;
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

const computedMainPartialGradientStyle = computed(() => {
  const gradientHexValue = layoutStore.getMainPartialColor;
  return {
    width: `${computedMainViewWidth.value}px`,
    background: `linear-gradient(180deg, ${gradientHexValue}70, transparent)`,
  };
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
        class="flex-grow flex-shrink-0 ps-2 h-full"
      >
        <SidebarComponent class="h-full w-full" />
      </div>
      <DragHandle
        ref="yourLibraryHandleRef"
        :height="computedDragHandleHeight"
        :onDrag="handleDragYourLibrary"
      />
      <!--  MAIN PARTIAL -->
      <div
        :style="{ width: `${computedMainViewWidth}px` }"
        class="relative rounded-lg overflow-hidden"
      >
        <MainPartialHeader :width="computedMainViewWidth" />
        <div ref="mainPartialContainerRef" class="mainPartialContainer">
          <div
            :style="computedMainPartialGradientStyle"
            class="h-80 absolute top-0 left-0 bg-gradient-to-b from-pink-300/50 to-module -z-10"
          />
          <router-view />
        </div>
      </div>
      <DragHandle
        ref="sidebarHandleRef"
        :height="computedDragHandleHeight"
        :onDrag="handleDragSidebar"
      />
      <!--  END PARTIAL -->
      <div
        :style="{ width: `${computedSidebarWidth}px` }"
        class="pe-2 flex-shrink-0"
      >
        <component :is="computedSelectedSidebarItem" class="h-full bg-module" />
      </div>
    </div>
    <ThePlayBar ref="playBarRef" />
  </div>
</template>

<style lang="scss" scoped>
.mainPartialContainer {
  @apply bg-module h-full rounded-lg overflow-auto overflow-x-hidden relative z-20;
}
</style>
