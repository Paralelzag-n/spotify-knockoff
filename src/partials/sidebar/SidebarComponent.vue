<script lang="ts" setup>
import { computed, ref } from "vue";
import BaseFilter from "../../components/base/BaseFilter.vue";
import SidebarPlaylistCardComponent from "./SidebarPlaylistCardComponent.vue";
import { IPlaylist } from "../../ts/interfaces/playlist.interface.ts";
import { EMediaCategory } from "../../ts/enums/media.enum.ts";
import { useElementSize, useWindowSize } from "@vueuse/core";
import SidebarSearchComponent from "./SidebarSearchComponent.vue";
import BaseDropDown from "../../components/base/BaseDropdown.vue";

const homePageHeader = ref<HTMLElement | null>(null);
const baseFilterRef = ref<HTMLElement | null>(null);

const { height: homePageHeaderHeight } = useElementSize(homePageHeader);
const { height: baseFilterheight } = useElementSize(baseFilterRef);

const PlaylistCardComponentContainerHeight = computed<number>(
  () => height.value - homePageHeaderHeight.value - baseFilterheight.value - 113
);

const PlaylistCardComponent = ref<HTMLElement | null>(null);

const { height: PlaylistCardComponentHeight } = useElementSize(
  PlaylistCardComponent
);

const doesScrollExist = computed<boolean>(
  () =>
    PlaylistCardComponentContainerHeight.value <
    PlaylistCardComponentHeight.value
);

const filterNames = [
  "Playlists",
  "Artists",
  "By you",
  "Album",
  "Tarkhna",
  "Lipo",
  "Lipso",
  "Lipao",
  "Lipdo",
  "Lipfo",
  "Ligpo",
  "Lispo",
  "Lihpo",
  "Ljpo",
];

const playlists = ref<IPlaylist[]>([
  {
    name: "Liked Songs",
    img: "",
    category: EMediaCategory.playlist,
    playing: false,
    numOfSongs: 1003,
  },
  {
    name: "Tame Impala",
    img: "",
    category: EMediaCategory.artist,
    playing: false,
  },
  {
    name: "GODS",
    img: "",
    category: EMediaCategory.album,
    playing: false,
  },
  {
    name: "GODS",
    img: "",
    category: EMediaCategory.album,
    playing: false,
  },
  {
    name: "GODS",
    img: "",
    category: EMediaCategory.album,
    playing: false,
  },
  {
    name: "GODS",
    img: "",
    category: EMediaCategory.album,
    playing: false,
  },
  {
    name: "GODS",
    img: "",
    category: EMediaCategory.album,
    playing: false,
  },
  {
    name: "GODS",
    img: "",
    category: EMediaCategory.album,
    playing: false,
  },
  {
    name: "GODS",
    img: "",
    category: EMediaCategory.album,
    playing: false,
  },
  {
    name: "GODS",
    img: "",
    category: EMediaCategory.album,
    playing: false,
  },
  {
    name: "GODS",
    img: "",
    category: EMediaCategory.album,
    playing: false,
  }
]);

const searchedContent = ref<string>();
const selectedName = ref<string>("");
const selectableDropdownSelectedValue = ref<string>('')
const searchActive = ref<boolean>(false);

const { width, height } = useWindowSize();
const computedMinimized = computed(() => width.value < MINIMIZED_THRESHOLD);
const MINIMIZED_THRESHOLD = 600;
</script>

<template>
  <div
    :class="computedMinimized ? 'w-fit items-center ' : 'w-80 h-full '"
    class="bg-black gap-2 flex flex-col p-2 rounded-r-lg"
  >
    <div
      ref="homePageHeader"
      class="flex p-6 rounded-lg gap-6 bg-gray-back flex-col"
    >
      <div class="flex items-center h-5 gap-3 cursor-pointer">
        <i class="text-white fa-lg fa-solid fa-house"></i>
        <h1 v-show="!computedMinimized" class="text-white">Home</h1>
      </div>
      <div class="flex items-center h-5 gap-3 cursor-pointer">
        <i class="text-icon-unselected fa-lg fa-solid fa-search"></i>
        <h1 v-show="!computedMinimized" class="text-white/50">Search</h1>
      </div>
    </div>
    <div
      :class="computedMinimized && 'items-center'"
      class="bg-gray-back flex flex-col gap-5 rounded-lg"
    >
      <div ref="baseFilterRef" class="px-3 flex flex-col pt-5 gap-5">
        <div class="flex items-center justify-between ">
          <div class="flex items-center h-5 gap-3 px-3">
          <i class="fa-solid fa-xl text-white fa-book"></i>
          <h1 v-show="!computedMinimized" class="text-white">Your library</h1>
        </div>
          <BaseDropDown  :content="['create a new playlist','create a playlist folder']" :minimized="computedMinimized" </BaseDropDown>
        </div>
        <div class="flex flex-col gap-2">
          <div class="relative flex items-center justify-between">
            <SidebarSearchComponent
            class="flex-grow"
              v-if="!computedMinimized"
              v-model="searchedContent"
              v-model:primary="searchActive"
            ></SidebarSearchComponent>
            <BaseDropDown :searchActive="searchActive" v-model="selectableDropdownSelectedValue" :selectable = 'true' :content="['recents','recently added','alphabetical','creator']" :minimized="computedMinimized" ></BaseDropDown>
          </div>
          <BaseFilter
            v-model:primary="selectedName"
            :filterNames="filterNames"
            :sizeMinimized="computedMinimized"
          ></BaseFilter>
        </div>
      </div>
      <div
        :style="{ height: `${PlaylistCardComponentContainerHeight}px` }"
        class="overflow-auto px-2"
      >
        <SidebarPlaylistCardComponent
          ref="PlaylistCardComponent"
          :hasScroll="doesScrollExist"
          :playlists="playlists"
          :selectedName="selectedName"
          :sizeMinimized="computedMinimized"
        ></SidebarPlaylistCardComponent>
      </div>
    </div>
  </div>
</template>
