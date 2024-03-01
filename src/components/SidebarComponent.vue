<script lang="ts" setup>
import { computed, ref } from "vue";
import BaseFilter from "../components/base/BaseFilter.vue";
import PlaylistCardComponent from "../components/PlaylistCardComponent.vue";
import { IPlaylist } from "../ts/interfaces/playlist.interface.ts";
import { EMediaCategory } from "../ts/enums/media.enum.ts";
import { useWindowSize } from "@vueuse/core";

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
]);

const selectedName = ref<string>("");
const selectedPlaylistName = ref<string>("");

const { width } = useWindowSize();
const computedMinimized = computed(() => width.value < MINIMIZED_THRESHOLD);

const MINIMIZED_THRESHOLD = 600;

const filteredPlaylists = computed(() =>
  playlists.value.filter((playlist) =>
    selectedName.value
      ? playlist.category.includes(
          selectedName.value.slice(0, selectedName.value.length - 1),
        )
      : true,
  ),
);
</script>

<template>
  <div
    :class="computedMinimized ? 'w-fit items-center ' : 'w-[300px]'"
    class="bg-black gap-5 flex flex-col"
  >
    <div
      :class="!computedMinimized ? 'p-6 gap-6' : 'p-6 gap-12'"
      class="flex bg-gray-back flex-col"
    >
      <div class="flex items-center gap-3 cursor-pointer">
        <i class="text-white fa-lg fa-solid fa-house"></i>
        <h1 v-show="!computedMinimized" class="text-white">Home</h1>
      </div>
      <div class="flex items-center gap-3 cursor-pointer">
        <i class="text-icon-unselected fa-lg fa-solid fa-search"></i>
        <h1 v-show="!computedMinimized" class="text-white/50">Search</h1>
      </div>
    </div>
    <div
      :class="computedMinimized ? 'items-center' : ''"
      class="bg-gray-back py-5 flex flex-col gap-5"
    >
      <div class="px-3 flex flex-col gap-10">
        <div class="flex items-center gap-3 px-3">
          <i class="fa-solid fa-xl text-white fa-book"></i>
          <h1 v-show="!computedMinimized" class="text-white">Your library</h1>
        </div>
        <BaseFilter
          v-model="filterNames"
          v-model:primary="selectedName"
          v-model:size="computedMinimized"
        ></BaseFilter>
      </div>
      <div :class="computedMinimized ? '' : 'px-3'">
        <PlaylistCardComponent
          v-model="filteredPlaylists"
          v-model:primary="selectedPlaylistName"
          v-model:size="computedMinimized"
          v-model:unfiltered="playlists"
        ></PlaylistCardComponent>
      </div>
    </div>
  </div>
</template>
