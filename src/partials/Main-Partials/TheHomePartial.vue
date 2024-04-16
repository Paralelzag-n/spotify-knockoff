<script lang="ts" setup>
import TheAnnouncement from "../../components/TheAnnouncement.vue";
import BaseFilter from "../../components/base/BaseFilter.vue";
import { computed, onMounted, ref } from "vue";
import PlaylistsShowcase from "../../components/PlaylistsShowcase/PlaylistsShowcase.vue";
import PlaylistsGrid from "../../components/PlaylistsGrid/PlaylistsGrid.vue";
import { IPlaylist } from "../../ts/pinia/playlist.types.ts";
import { usePlaylistsStore } from "../../pinia/playlists.pinia.ts";
import { useLayoutStore } from "../../pinia/layout.pinia.ts";

const filters = ref<string[]>(["All", "Music", "Podcasts"]);
const selectedFilters = ref<string[]>([]);

const layoutStore = useLayoutStore();
const playlistStore = usePlaylistsStore();
const computedPlaylists = computed<IPlaylist[]>(
  () => playlistStore.getAllPlaylists
);

onMounted(() => {
  layoutStore.setMainPartialColor(null);
});
</script>

<template>
  <div class="flex flex-col gap-6 p-4">
    <div class="flex flex-col gap-6 px-2">
      <TheAnnouncement />
      <div class="w-full flex-grow">
        <BaseFilter
          v-model="selectedFilters"
          :filter-names="filters"
          :size-minimized="false"
        />
      </div>
      <PlaylistsGrid :playlists="computedPlaylists" />
    </div>

    <PlaylistsShowcase
      :playlists="computedPlaylists"
      showcase-title="Your Playlists"
    />
    <PlaylistsShowcase
      :playlists="computedPlaylists"
      showcase-title="Your Playlists 2"
    />
  </div>
</template>
