<script lang="ts" setup>
import TheAnnouncement from "./TheAnnouncement.vue";
import BaseFilter from "../../../components/base/BaseFilter.vue";
import { computed, ref } from "vue";
import { usePlaylistsStore } from "../../../pinia/playlists.pinia.ts";
import { IPlaylist } from "../../../ts/pinia/playlist.types.ts";

const filters = ref<string[]>(["All", "Music", "Podcasts"]);
const selectedFilters = ref<string>("");

const playlistStore = usePlaylistsStore();
const computedPlaylists = computed<IPlaylist[]>(
  () => playlistStore.getAllPlaylists,
);
</script>

<template>
  <div class="py-4 px-6">
    <TheAnnouncement />
    <BaseFilter
      v-model="selectedFilters"
      :filter-names="filters"
      :size-minimized="false"
      class="pt-5"
    />
    <div class="grid grid-cols-4 pt-5 gap-4">
      <div
        v-for="playlist in computedPlaylists"
        :key="playlist.id"
        class="flex rounded overflow-hidden group select-none cursor-pointer"
      >
        <img
          :src="playlist.thumbnail"
          alt="playlist thumbnail"
          class="w-[70px] h-[70px] flex-shrink-0"
        />
        <div
          class="flex flex-grow justify-between items-center px-3 bg-gray-500/20 group-hover:bg-gray-500/40 transition-all relative"
          style="backdrop-filter: blur(3px); min-width: 0"
        >
          <h2 class="text-white font-bold text-md truncate min-w-0 flex-shrink">
            {{ playlist.name }}
          </h2>
          <div class="play-button shadow-play-button">
            <i class="fa-solid fa-play ps-0.5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.play-button {
  @apply bg-primary-500 w-12 h-12 rounded-full flex opacity-0 justify-center items-center group-hover:opacity-100 hover:scale-110 transition-all flex-shrink-0;
}

.shadow-play-button {
  box-shadow:
    0 0 8px rgba(0, 0, 0, 0.2),
    0 0 12px rgba(0, 0, 0, 0.25);
}
</style>
