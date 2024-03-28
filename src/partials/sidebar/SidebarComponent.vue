<script lang="ts" setup>
import { computed, ref } from "vue";
import BaseFilter from "../../components/base/BaseFilter.vue";
import SidebarPlaylistCardComponent from "./SidebarPlaylistCardComponent.vue";
import { IPlaylist } from "../../ts/interfaces/playlist.interface.ts";
import { EMediaCategory } from "../../ts/enums/media.enum.ts";
import { useElementSize, useWindowSize } from "@vueuse/core";
import SidebarSearchComponent from "./SidebarSearchComponent.vue";
import { useRouter } from "vue-router";

const homePageHeader = ref<HTMLElement | null>(null);
const baseFilterRef = ref<HTMLElement | null>(null);

const { height: homePageHeaderHeight } = useElementSize(homePageHeader);
const { height: baseFilterheight } = useElementSize(baseFilterRef);

const PlaylistCardComponentContainerHeight = computed<number>(
  () =>
    height.value - homePageHeaderHeight.value - baseFilterheight.value - 113,
);

const router = useRouter();
const PlaylistCardComponent = ref<HTMLElement | null>(null);

const { height: PlaylistCardComponentHeight } = useElementSize(
  PlaylistCardComponent,
);

const doesScrollExist = computed<boolean>(
  () =>
    PlaylistCardComponentContainerHeight.value <
    PlaylistCardComponentHeight.value,
);

const filterNames = [
  "Playlists",
  "Artists",
  "By you",
  "Album",
  "Tarkhna",
  "Lipo",
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
]);

const searchedContent = ref<string>();
const selectedName = ref<string>("");

const { width, height } = useWindowSize();
const computedMinimized = computed(() => width.value < MINIMIZED_THRESHOLD);
const MINIMIZED_THRESHOLD = 600;

function goHome() {
  router.push({ name: "home" });
}
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
      <div class="flex items-center h-5 gap-3 cursor-pointer" @click="goHome()">
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
        <div class="flex items-center h-5 gap-3 px-3">
          <i class="fa-solid fa-xl text-white fa-book"></i>
          <h1 v-show="!computedMinimized" class="text-white">Your library</h1>
        </div>
        <div class="flex flex-col gap-2">
          <SidebarSearchComponent
            v-if="!computedMinimized"
            v-model="searchedContent"
          ></SidebarSearchComponent>
          <BaseFilter
            v-model:primary="selectedName"
            :filterNames="filterNames"
            :sizeMinimized="computedMinimized"
          ></BaseFilter>
        </div>
      </div>
      <div
        :style="{ height: `${PlaylistCardComponentContainerHeight}px` }"
        class="overflow-auto"
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
