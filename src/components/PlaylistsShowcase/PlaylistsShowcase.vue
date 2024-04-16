<script lang="ts" setup>
import PlaylistComponent from "./PlaylistComponent.vue";
import { IPlaylist } from "../../ts/pinia/playlist.types.ts";
import { computed, ref } from "vue";
import { useElementSize } from "@vueuse/core";
import { useRouter } from "vue-router";
import BaseFilter from "../base/BaseFilter.vue";

const props = defineProps<{
  showcaseTitle?: string;
  playlists: IPlaylist[];
  showAllPlaylists?: boolean;
  filter?: boolean;
  filters?: string[];
  filterRef?: any;
}>();

const router = useRouter();

const playlistsContainerRef = ref<HTMLElement | null>(null);
const { width: playlistsContainerWidth } = useElementSize(
  playlistsContainerRef,
);

const selectedFilters = ref();
const discographyFilters = ref([
  "Popular releases",
  "Albums",
  "Singles and EPs",
]);

const computedFrontPagePlaylists = computed(() => {
  let numberOfPlaylists: number;
  if (playlistsContainerWidth.value <= 500) {
    numberOfPlaylists = 2;
  } else if (playlistsContainerWidth.value <= 900) {
    numberOfPlaylists = 4;
  } else {
    numberOfPlaylists = 6;
  }

  let playlists: IPlaylist[] = props.playlists;
  if (!props.showAllPlaylists)
    playlists = props.playlists
      .slice(0, numberOfPlaylists)
      .map((element) => JSON.parse(JSON.stringify(element)));

  const gridTemplateColumns = `repeat(${numberOfPlaylists}, minmax(0, 1fr))`;

  return {
    playlists: playlists.length > 0 ? playlists : null,
    style: {
      display: "grid",
      gridTemplateColumns,
    },
  };
});

function viewPlaylistCollection() {
  router.push({ name: "playlists", params: { id: "placeholderId" } });
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center px-2">
      <h2 class="text-white font-bold text-2xl pb-0.5">
        {{ props.showcaseTitle }}
      </h2>
      <p
        v-if="!props.showAllPlaylists"
        class="show-all"
        @click="viewPlaylistCollection"
      >
        Show All
      </p>
    </div>
    <BaseFilter
      v-if="props.filter"
      v-model="props.filterRef"
      :filter-names="props.filters"
      :size-minimized="false"
      class="ml-2"
    />
    <div ref="playlistsContainerRef" :style="computedFrontPagePlaylists.style">
      <PlaylistComponent
        v-for="playlist in computedFrontPagePlaylists.playlists"
        :playlist="playlist"
        @click="router.push({ name: 'playlist', params: { id: playlist.id } })"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.show-all {
  @apply text-white/80 text-sm font-semibold hover:underline cursor-pointer;
}
</style>
