<script lang="ts" setup>
import { usePlaylistsStore } from "../../pinia/playlists.pinia";
import { useSongStore } from "../../pinia/songs.pinia";
import { useLayoutStore } from "../../pinia/layout.pinia";

import { useRouter } from "vue-router";
import { computed, ref } from "vue";

import YourLibrarySkeleton from "./YourLibrarySkeleton.vue";

const props = defineProps<{
  isExpanded: boolean;
}>();

const layoutStore = useLayoutStore();
const playlistStore = usePlaylistsStore();
const songStore = useSongStore();

const router = useRouter();

const numOfSongs = (id: string): number => {
  return songStore.getSongsByPlaylistId(id)?.length ?? 0;
};

const computedPlaylists = computed(() => playlistStore.getAllPlaylists);

const dataLoaded = ref<boolean>(false);

const computedYourLibraryWidth = computed(
  () => layoutStore.getYourLibraryWidth
);

setTimeout(() => (dataLoaded.value = true), 500);
</script>

<template>
  <div class="flex flex-col">
    <div
      @click="router.push({ name: 'playlist', params: { id: playlist.id } })"
      v-for="playlist in computedPlaylists"
      class="flex items-center p-2 justify-between cursor-pointer transition-all hover:bg-button-gray-hover rounded-md"
    >
      <YourLibrarySkeleton v-show="!dataLoaded"></YourLibrarySkeleton>

      <div v-show="dataLoaded" class="flex items-center gap-2">
        <img
          :src="playlist.thumbnail"
          alt=""
          :class="!props.isExpanded ? 'w-full' : 'w-12 h-12'"
          class="bg-black rounded"
        />

        <div v-if="props.isExpanded">
          <h1
            :style="{ width: `${computedYourLibraryWidth - 100}px` }"
            class="text-white truncate ..."
          >
            {{ playlist.name }}
          </h1>
          <div class="flex text-white/60 items-center gap-3">
            <h2 class="text-sm truncate ...">playlist</h2>
            <h2 v-if="computedYourLibraryWidth > 220" class="text-sm">
              {{ numOfSongs(playlist.id) }} songs
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
