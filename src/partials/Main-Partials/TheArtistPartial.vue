<script lang="ts" setup>
import ArtistImg from "../../assets/img/Gorillaz-announce-top.webp";
import BasePlayButton from "../../components/base/BasePlayButton.vue";
import { computed, onMounted, ref } from "vue";
import { useLayoutStore } from "../../pinia/layout.pinia.ts";
import { useElementSize } from "@vueuse/core";
import PlaylistsShowcase from "../../components/PlaylistsShowcase/PlaylistsShowcase.vue";
import { IPlaylist } from "../../ts/pinia/playlist.types.ts";
import { usePlaylistsStore } from "../../pinia/playlists.pinia.ts";

const layoutStore = useLayoutStore();
const playlistStore = usePlaylistsStore();

const artistPageRef = ref();
const { width: pageWidth } = useElementSize(artistPageRef);

const seeMore = ref<boolean>(false);
const songs = ref([
  { name: "Colar", streams: "123,321,532", duration: "2:43" },
  { name: "Colar", streams: "123,321,532", duration: "2:43" },
  { name: "Colar", streams: "123,321,532", duration: "2:43" },
  { name: "Colar", streams: "123,321,532", duration: "2:43" },
  { name: "Colar", streams: "123,321,532", duration: "2:43" },
  { name: "Colar", streams: "123,321,532", duration: "2:43" },
  { name: "Colar", streams: "123,321,532", duration: "2:43" },
  { name: "Colar", streams: "123,321,532", duration: "2:43" },
  { name: "Colar", streams: "123,321,532", duration: "2:43" },
]);

const filteredSongs = computed<any[]>(() => {
  if (seeMore.value) {
    return songs.value.slice(0, 5);
  }
  return songs.value;
});

const computedPlaylists = computed<IPlaylist[]>(
  () => playlistStore.getAllPlaylists,
);

const computedMainPartialGradientStyle = computed<any>(() => {
  const gradientHexValue = layoutStore.getMainPartialColor;
  return {
    width: pageWidth.value + "px",
    background: `linear-gradient(180deg, ${gradientHexValue}70, transparent)`,
  };
});

const seeMoreSongsText = computed<string>(() =>
  seeMore.value ? "See more" : "Show less",
);

onMounted(() => {
  layoutStore.setMainPartialColor("#4c162f");
});

const toggleDisplayedSongs = (): void => {
  seeMore.value = !seeMore.value;
};
</script>

<template>
  <main ref="artistPageRef">
    <div
      :style="`background-image: url(${ArtistImg})`"
      class="w-full h-[350px] flex flex-col justify-end gap-3.5 pb-8 pl-6 bg-cover bg-center"
    >
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-md text-white fa-circle-check"></i>
        <h5 class="text-white text-sm">Verified Artist</h5>
      </div>
      <h1 class="text-white text-7xl font-bold">Gorillaz</h1>
      <p class="text-sm text-white">22,841,781 monthly listeners</p>
    </div>
    <section class="flex items-center gap-6 pt-5 pl-6 mb-5 relative">
      <div
        :style="computedMainPartialGradientStyle"
        class="h-56 absolute top-0 left-0 bg-gradient-to-b from-pink-300/50 to-module -z-10"
      />
      <BasePlayButton :size="14"></BasePlayButton>
      <i
        class="fa-solid fa-xl fa-shuffle scale-125 hover:scale-150 cursor-pointer text-primary-500 transition-all"
      ></i>
      <div
        class="rounded-full px-4 py-[2.5px] text-sm text-white border text-center cursor-pointer hover:bg-white hover:text-black transition-all"
      >
        Follow
      </div>
    </section>
    <h1 class="text-white font-semibold text-2xl ml-6">Popular</h1>
    <section class="flex flex-col px-4 pt-4">
      <div
        v-for="(song, index) in filteredSongs"
        class="w-full flex items-center justify-between py-2 pl-5 pr-5 hover:bg-button-gray-hover transition-all rounded group"
      >
        <div class="flex items-center">
          <i
            class="w-3.5 fa-solid fa-play ps-0.5 text-white hidden group-hover:block cursor-pointer"
          />
          <h2 class="text-white/60 group-hover:hidden w-3.5">
            {{ index + 1 }}
          </h2>
          <div class="rounded-md w-[42px] h-[42px] bg-blue-600 ml-4"></div>
          <div class="ml-2">
            <h3 class="text-white">{{ song.name }}</h3>
            <div
              class="rounded-sm bg-white/60 w-[15px] h-[15px] flex justify-center items-center"
            >
              <h5 class="text-black text-[9px] font-semibold">E</h5>
            </div>
          </div>
        </div>
        <h5 class="text-white/60 text-sm ml-24">{{ song.streams }}</h5>
        <div class="flex items-center gap-4">
          <i
            class="fa-solid fa-plus text-white/60 text-sm cursor-pointer invisible group-hover:visible hover:text-white mr-3"
          ></i>
          <h5 class="text-white/60 text-sm">{{ song.duration }}</h5>
          <i
            class="fa-solid fa-ellipsis text-white text-base cursor-pointer invisible group-hover:visible"
          ></i>
        </div>
      </div>
    </section>
    <h3
      class="text-white/60 font-bold text-sm cursor-pointer transition-all hover:text-white ml-8 mt-4 mb-12"
      @click="toggleDisplayedSongs"
    >
      {{ seeMoreSongsText }}
    </h3>
    <article class="flex flex-col gap-6 w-full">
      <PlaylistsShowcase
        :playlists="computedPlaylists"
        class="px-5"
        showcase-title="Discography"
      />
      <PlaylistsShowcase
        :playlists="computedPlaylists"
        class="px-5"
        showcase-title="Featuring Gorillaz"
      />
      <PlaylistsShowcase
        :playlists="computedPlaylists"
        class="px-5"
        showcase-title="Appears on"
      />
    </article>
  </main>
</template>

<style scoped></style>
