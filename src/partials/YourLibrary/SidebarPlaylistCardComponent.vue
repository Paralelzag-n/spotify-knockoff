<script lang="ts" setup>
import { computed, ref } from "vue";

import { usePlaylistsStore } from "../../pinia/playlists.pinia";
import { useSongStore } from "../../pinia/songs.pinia";
import SidebarSkeleton from "./SidebarSkeleton.vue";
import { useRouter } from "vue-router";

const playlistStore = usePlaylistsStore();
const songStore = useSongStore();

const router = useRouter();

const numOfSongs = (id: string): number => {
  return songStore.getSongsByPlaylistId(id)?.length ?? 0;
};

const computedPlaylists = computed(() => playlistStore.getAllPlaylists);

const dataLoaded = ref<boolean>(false);

setTimeout(() => (dataLoaded.value = true), 500);
</script>

<template>
  <div class="flex flex-col">
    <div
      @click="router.push({ name: 'playlist', params: { id: playlist.id } })"
      v-for="playlist in computedPlaylists"
      class="flex items-center p-2 justify-between cursor-pointer transition-all hover:bg-button-gray-hover rounded-md"
    >
      <SidebarSkeleton v-show="!dataLoaded"></SidebarSkeleton>

      <div v-show="dataLoaded" class="flex items-center gap-2">
        <img
          :src="playlist.thumbnail"
          alt=""
          class="w-12 h-12 bg-black rounded"
        />

        <div>
          <h1 class="text-white">
            {{ playlist.name }}
          </h1>
          <div class="flex text-white/60 items-center gap-3">
            <h2 class="text-sm">playlist</h2>
            <h2 class="text-sm">{{ numOfSongs(playlist.id) }} songs</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
