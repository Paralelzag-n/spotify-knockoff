<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useSongStore } from "../../pinia/songs.pinia";
import { usePlaylistsStore } from "../../pinia/playlists.pinia";
import { ISong } from "../../ts/pinia/songs.types";
import { IPlaylist } from "../../ts/pinia/playlist.types";
import { useAverageColor } from "../../composable/useAverageElementColor";
import BasePlayButton from "../../components/base/BasePlayButton.vue";
import BaseDropdown from "../../components/base/BaseDropdown.vue";
import userPfp from "../../assets/img/user_pfp_temporary.png"
import BaseFilter from "../../components/base/BaseFilter.vue";
import YourLibrarySearchComponent from "../YourLibrary/YourLibrarySearchComponent.vue";

const selectableDropdownSelectedValue = ref<string>('recents')

const route = useRoute();

const songStore = useSongStore();

const playlistsStore = usePlaylistsStore();

const currentId = ref<string>("");

const filterNames = ref<string[]>([
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
  "Mutlebi",
])

const currentPlaylistSongs = computed<ISong[]>(() => {
  return songStore.getSongsByPlaylistId(currentId.value) ?? [];
});

const currentPlaylist = computed<IPlaylist | null>(() => {
  return playlistsStore.getPlaylistById(currentId.value);
});

const { dominantColor } = useAverageColor(currentPlaylist);

watch(
  () => route.path,
  () => {
    currentId.value = route.params.id[0];
    console.log(currentId.value);
  },
  { immediate: true }
);
</script>

<template>
  <div class="p-4 flex flex-col gap-4">
    <div
      :style="{ backgroundColor: `${dominantColor}` }"
      class="flex rounded-lg items-center p-4 gap-2"
    >
      <img
        class="w-48 h-48 object-cover rounded-lg"
        :src="currentPlaylist?.thumbnail"
        alt=""
      />
      <div class="flex flex-col">
        <h1 class="text-white">Playlist</h1>
        <h1 class="text-white font-bold text-7xl">
          {{ currentPlaylist?.name }}
        </h1>
        <div class="flex items-center gap-3">
          <img :src="userPfp" class="w-8 h-8 rounded-full"alt="">
          <h1 class="text-white">user</h1>
          <p class="text-white text-xs">●</p>
          <h1 class="text-white">{{ currentPlaylistSongs.length }} songs</h1>
        </div>
      </div>
    </div>
    <div class="flex items-center px-5 justify-between">
      <div class="flex items-center gap-5">
        <BasePlayButton :size="12"></BasePlayButton>
        <i
          class="fa-solid fa-shuffle scale-125 hover:scale-150 cursor-pointer text-primary-500 transition-all"
        ></i>
        <i
          class="fa-regular fa-circle-down scale-125 hover:scale-150 cursor-pointer text-primary-500 transition-all"
        ></i>
      </div>
      
      <div class="flex items-center gap-2">
        <YourLibrarySearchComponent></YourLibrarySearchComponent>
        <h1 class="text-white/60">{{ selectableDropdownSelectedValue }}</h1>
        <BaseDropdown  v-model="selectableDropdownSelectedValue"
              :content="['recents', 'recently added', 'alphabetical', 'creator']" :selectable="true" </BaseDropdown>
      </div>
    </div>
    <div class="flex flex-col">
      <div >
        <BaseFilter  :filterNames="filterNames"></BaseFilter>
      </div>
      <div
        class="flex items-center gap-4 p-3 cursor-pointer transition-all border-b-2 border-button-gray-hover"
      >
        <h1 class="text-white/60 text-sm w-5">#</h1>
        <h1 class="text-white/60 text-sm">Title</h1> 
      </div>
      <div v-for="(song, index) in currentPlaylistSongs">
        <div
          class="flex items-center gap-4 hover:bg-button-gray-hover p-2 cursor-pointer transition-all"
        >
          <h1 class="text-white text-xs w-5">{{ index + 1 }}</h1>
          <img
            :src="song.thumbnail"
            class="w-10 h-10 object-cover rounded-lg"
            alt=""
          />
          <div>
            <h1 class="text-white text-xs font-bold">{{ song.name }}</h1>
            <h1 class="text-white text-xs">{{ song.author }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
