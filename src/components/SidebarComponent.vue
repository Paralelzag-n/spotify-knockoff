<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import BaseFilter from "../components/base/BaseFilter.vue";
import PlaylistCardComponent from "../components/PlaylistCardComponent.vue";
import { IPlaylist } from "../../src/ts/interfaces/playlist.interface";
import { EMediaCategory } from "../../src/ts/enums/media.enum";

const filterNames = ref<string[]>([
  "Playlists",
  "Artists",
  "By you",
  "Album",
  "Tarkhna",
  "Lipo",
]);
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

const minimized = ref<boolean>(window.innerWidth < window.innerWidth / 2);
const MINIMIZED_THRESHOLD = 600;

const filteredPlaylists = computed(() => {
  console.log(selectedName.value);
  return playlists.value.filter((playlist) =>
    selectedName.value
      ? playlist.category.includes(
          selectedName.value.slice(0, selectedName.value.length - 1)
        )
      : true
  );
});
const handleResize = () => {
  minimized.value = window.innerWidth < MINIMIZED_THRESHOLD;
  if (minimized.value) console.log("sa");
};

// Attach event listener when the component is mounted
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

// Remove event listener when the component is unmounted
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div
    :class="minimized ? 'w-fit items-center ' : 'w-[300px]'"
    class="bg-black gap-5 flex flex-col"
  >
    <div
      :class="!minimized ? 'p-6 gap-6' : 'p-6 gap-12'"
      class="flex bg-gray-back flex-col"
    >
      <div class="flex items-center gap-3 cursor-pointer">
        <i class="text-white fa-lg fa-solid fa-house"></i>
        <h1 v-show="!minimized" class="text-white">Home</h1>
      </div>
      <div class="flex items-center gap-3 cursor-pointer">
        <i class="text-icon-unselected fa-lg fa-solid fa-search"></i>
        <h1 v-show="!minimized" class="text-white/50">Search</h1>
      </div>
    </div>
    <div
      :class="minimized ? 'items-center' : ''"
      class="bg-gray-back py-5 flex flex-col gap-5"
    >
      <div class="px-3 flex flex-col gap-10">
        <div class="flex items-center gap-3 px-3">
          <i class="fa-solid fa-xl text-white fa-book"></i>
          <h1 v-show="!minimized" class="text-white">Your library</h1>
        </div>
        <BaseFilter
          v-model:size="minimized"
          v-model="filterNames"
          v-model:primary="selectedName"
        ></BaseFilter>
      </div>
      <div :class="minimized ? '' : 'px-3'">
        <PlaylistCardComponent
          v-model:size="minimized"
          v-model:primary="selectedPlaylistName"
          v-model="filteredPlaylists"
          v-model:unfiltered="playlists"
        ></PlaylistCardComponent>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
