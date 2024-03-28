<script lang="ts" setup>
import { usePlaylistsStore } from "../../../pinia/playlists.pinia.ts";
import { computed } from "vue";
import { IPlaylist } from "../../../ts/pinia/playlist.types.ts";
import PlaylistsShowcase from "../../../components/PlaylistsShowcase/PlaylistsShowcase.vue";

const playlistStore = usePlaylistsStore();
const computedPlaylists = computed<IPlaylist[]>(
  () => playlistStore.getAllPlaylists,
);
</script>

<template>
  <div class="p-4">
    <PlaylistsShowcase
      :playlists="computedPlaylists"
      showAllPlaylists
      showcase-title="Your Playlists"
    />
  </div>
</template>
