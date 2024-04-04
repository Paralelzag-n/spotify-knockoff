<script lang="ts" setup>
import { computed, ref } from "vue";
import BaseFilter from "../../components/base/BaseFilter.vue";

import BaseDropDown from "../../components/base/BaseDropdown.vue";
import YourLibrarySearchComponent from "./YourLibrarySearchComponent.vue";
import YourLibraryPlaylistCardComponent from "./YourLibraryPlaylistCardComponent.vue";

import { useLayoutStore } from "../../pinia/layout.pinia";

const layoutStore = useLayoutStore();

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

const sizingToggler = (): void => {
  console.log("isExpanded :", isExpanded.value);
  if (!isExpanded.value) {
    layoutStore.setYourLibraryWidth(300);

    console.log("if");
  } else {
    layoutStore.setYourLibraryWidth(80);

    console.log("else");
  }
};

const contentClickedHandler = (value: string): string => {
  return value;
};
</script>

<template>
  <div
    :class="!isExpanded ? ` items-start` : ``"
    class="bg-black rounded-r-lg h-full flex flex-col"
  >
    <div
      :class="!isExpanded ? ` gap-3 items-center` : ``"
      class="flex flex-col pt-2 h-full w-full bg-module rounded-lg"
    >
      <div
        ref="sidebarHeaderRef"
        :class="!isExpanded ? 'items-center ' : ''"
        class="flex flex-col gap-2 justify-between p-4 pb-2"
      >
        <div class="flex justify-between items-center">
          <div class="flex gap-2 items-center">
            <i
              class="fa-solid fa-xl text-white fa-compact-disc"
              @click="sizingToggler"
            ></i>
            <h1 v-if="isExpanded" class="text-white font-bold">Your library</h1>
          </div>
          <BaseDropDown
            v-if="isExpanded"
            :content="['create a new playlist', 'create a playlist folder']"
            @contentClicked="contentClickedHandler"
          />
        </div>
        <BaseFilter
          v-if="isExpanded"
          v-model:primary="selectedName"
          :filterNames="filterNames"
        />
      </div>

      <div class="overflow-auto px-2">
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
  </div>
</template>
