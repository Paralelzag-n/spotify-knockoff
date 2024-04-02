<script lang="ts" setup>
import { computed, ref } from "vue";
import BaseFilter from "../../components/base/BaseFilter.vue";

import { useElementSize } from "@vueuse/core";

import BaseDropDown from "../../components/base/BaseDropdown.vue";
import YourLibrarySearchComponent from "./YourLibrarySearchComponent.vue";
import YourLibraryPlaylistCardComponent from "./YourLibraryPlaylistCardComponent.vue";

const sidebarHeaderRef = ref<HTMLElement | null>(null);
const sidebarComponentRef = ref<HTMLElement | null>(null);

const { height: sidebarHeaderRefHeight } = useElementSize(sidebarHeaderRef);
const { height: sidebarComponentHeight } = useElementSize(sidebarComponentRef);

const computedPlaylistsContainerHeight = computed<number>(() => {
  return sidebarComponentHeight.value - sidebarHeaderRefHeight.value - 26;
});

const computedPlaylistsContainerHeightStyle = computed(() => {
  return { height: `${computedPlaylistsContainerHeight.value}px` };
});

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

const contentClickedHandler = (value: string): string => {
  return value;
};
console.log(contentClickedHandler);
</script>

<template>
  <div
    ref="sidebarComponentRef"
    class="bg-black rounded-r-lg h-full flex flex-col"
  >
    <div class="flex flex-col bg-module rounded-lg">
      <div
        ref="sidebarHeaderRef"
        class="flex flex-col gap-2 justify-between p-4 pb-2"
      >
        <div class="flex justify-between items-center">
          <div class="flex gap-2 items-center">
            <i class="fa-solid fa-xl text-white fa-compact-disc"></i>
            <h1 class="text-white font-bold">Your library</h1>
          </div>
          <BaseDropDown
            @contentClicked="contentClickedHandler"
            :content="['create a new playlist', 'create a playlist folder']"
          />
        </div>
        <BaseFilter v-model:primary="selectedName" :filterNames="filterNames" />
      </div>

      <div
        :style="computedPlaylistsContainerHeightStyle"
        class="overflow-auto px-3 pb-2"
      >
        <div class="flex items-center justify-between pb-2">
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
        <YourLibraryPlaylistCardComponent ref="playlistCardComponent" />
      </div>
    </div>
  </div>
</template>
