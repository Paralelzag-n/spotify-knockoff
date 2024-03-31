<script lang="ts" setup>
import { computed, ref } from "vue";
import BaseFilter from "../../components/base/BaseFilter.vue";
import SidebarPlaylistCardComponent from "./SidebarPlaylistCardComponent.vue";

import { useElementSize } from "@vueuse/core";

import BaseDropDown from "../../components/base/BaseDropdown.vue";
import SidebarSearchComponent from "./SidebarSearchComponent.vue";

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
</script>

<template>
  <div
    ref="sidebarComponentRef"
    class="bg-black rounded-r-lg h-full flex flex-col"
  >
    <div class="flex flex-col bg-gray-back rounded-lg">
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
            :content="['create a new playlist', 'create a playlist folder']"
          />
        </div>
        <BaseFilter v-model:primary="selectedName" :filterNames="filterNames" />
      </div>

      <div
        :style="computedPlaylistsContainerHeightStyle"
        class="overflow-auto px-2 pb-2"
      >
        <div class="flex items-center pb-2">
          <SidebarSearchComponent
            v-model="searchedContent"
            v-model:primary="searchActive"
            class="flex-grow"
          />
          <BaseDropDown
            v-model="selectableDropdownSelectedValue"
            :content="['recents', 'recently added', 'alphabetical', 'creator']"
            :searchActive="searchActive"
            :selectable="true"
          />
        </div>
        <SidebarPlaylistCardComponent ref="playlistCardComponent" />
      </div>
    </div>
  </div>
</template>
