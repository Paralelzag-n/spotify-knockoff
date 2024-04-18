<script lang="ts" setup>
import { IPlaylist } from "../../ts/pinia/playlist.types.ts";
import BasePlayButton from "../base/BasePlayButton.vue";
import { computed, ref } from "vue";
import { useElementSize } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useLayoutStore } from "../../pinia/layout.pinia.ts";

const props = defineProps<{
  playlists: IPlaylist[];
}>();

const router = useRouter();
const layoutStore = useLayoutStore();

function changeRoute(currentId: string) {
  router.push({ name: "playlist", params: { id: currentId } });
}

async function generateNewBackdrop(playlist: IPlaylist | null) {
  if (!playlist) {
    layoutStore.setMainPartialColor(null);
    return;
  }
  try {
    const averageColorHex = playlist.thumbnailAverageColor;
    layoutStore.setMainPartialColor(averageColorHex);
  } catch (error) {
    console.error(error);
  }
}

const playlistsGridContainerRef = ref<HTMLElement | null>(null);
const { width: playlistsGridContainerWidth } = useElementSize(
  playlistsGridContainerRef,
);

const computedGridSize = computed(() => {
  return {
    "grid-cols-4": playlistsGridContainerWidth.value > 900,
    "grid-cols-2": playlistsGridContainerWidth.value <= 900,
  };
});
</script>

<template>
  <div
    ref="playlistsGridContainerRef"
    :class="computedGridSize"
    class="grid gap-3"
  >
    <div
      v-for="playlist in props.playlists"
      :key="playlist.id"
      class="flex rounded overflow-hidden group cursor-pointer"
      @click="changeRoute(playlist.id)"
      @mouseenter="generateNewBackdrop(playlist)"
      @mouseleave="generateNewBackdrop(null)"
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
        <BasePlayButton :size="12" class="opacity-0 group-hover:opacity-100" />
      </div>
    </div>
  </div>
</template>
