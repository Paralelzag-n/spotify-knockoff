<script lang="ts" setup>
import { computed, ref } from "vue";
import BaseFilter from "../../components/base/BaseFilter.vue";

import BaseDropDown from "../../components/base/BaseDropdown.vue";
import YourLibrarySearchComponent from "./YourLibrarySearchComponent.vue";
import YourLibraryPlaylistCardComponent from "./YourLibraryPlaylistCardComponent.vue";

import { useLayoutStore } from "../../pinia/layout.pinia";
import { useElementSize } from "@vueuse/core";

const layoutStore = useLayoutStore();
const sidebarHeaderRef = ref<HTMLElement | null>();
const { width: sidebarHeaderRefWidth } = useElementSize(sidebarHeaderRef);

const computedYourLibraryWidth = computed(
  () => layoutStore.getYourLibraryWidth,
);

const filterNames = [
  "Playlists",
  "Artists",
  "By you",
  "Album",
  "Tarkhna",
  "Lipo",
];

const searchedContent = ref<string>();
const selectedName = ref<string>("");
const selectableDropdownSelectedValue = ref<string>("");
const searchActive = ref<boolean>(false);
const isExpanded = computed(() => {
  return layoutStore.getYourLibraryWidth > 130;
});

function toggleSize(): void {
  if (isExpanded.value) {
    layoutStore.setYourLibraryWidth(80);
    return;
  }

  layoutStore.setYourLibraryWidth(300);
}

const computedYourLibraryTitleWidth = computed(() => {
  const sidebarHeaderTitleWidth =
    sidebarHeaderRefWidth.value > 210 ? 90 : sidebarHeaderRefWidth.value - 70;
  return { width: `${sidebarHeaderTitleWidth}px` };
});

const contentClickedHandler = (value: string): string => {
  return value;
};
</script>

<template>
  <div class="flex flex-col bg-module rounded-lg">
    <div
      ref="sidebarHeaderRef"
      :class="{ 'items-center pe-6': !isExpanded }"
      class="flex flex-col gap-2 justify-between ps-6 pe-2 py-4"
    >
      <div class="flex justify-between items-center">
        <div
          class="flex group gap-2 items-center cursor-pointer"
          @click="toggleSize"
        >
          <i
            class="fa-solid text-2xl fa-compact-disc text-white/60 transition-color group-hover:text-white"
          />
          <h1
            v-if="isExpanded"
            :style="computedYourLibraryTitleWidth"
            class="text-white/60 transition-color group-hover:text-white font-bold flex-shrink truncate ..."
          >
            Your library
          </h1>
        </div>
        <BaseDropDown
          v-if="isExpanded"
          :content="['create a new playlist', 'create a playlist folder']"
          @contentClicked="contentClickedHandler"
        />
      </div>
    </div>
    <div class="px-4">
      <BaseFilter
        v-if="isExpanded"
        v-model:primary="selectedName"
        :filterNames="filterNames"
        :style="{ width: `${computedYourLibraryWidth - 36}px` }"
      />
    </div>

    <div :class="{ 'px-2': isExpanded }" class="overflow-auto">
      <div v-if="isExpanded" class="flex items-center justify-between pb-2">
        <YourLibrarySearchComponent
          v-model="searchedContent"
          v-model:primary="searchActive"
          class="flex-grow pr-2"
        />
        <BaseDropDown
          v-model="selectableDropdownSelectedValue"
          :content="['recents', 'recently added', 'alphabetical', 'creator']"
          :selectable="true"
        />
      </div>

      <YourLibraryPlaylistCardComponent
        ref="playlistCardComponent"
        :isExpanded="isExpanded"
      />
    </div>
  </div>
</template>

<style scoped>
.transition-color {
  transition: color 200ms ease;
}
</style>
