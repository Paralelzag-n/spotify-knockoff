<script lang="ts" setup>
import { defineModel, ref, computed } from "vue";
import { IPlaylist } from "../../ts/interfaces/playlist.interface";
import tempImg from "../../assets/lofi-girl-lofi.gif";
import audio from "../../assets/rhcp.mp3";
import SidebarSkeleton from "./SidebarSkeleton.vue";

const props = defineProps<{
  sizeMinimized: boolean;
  selectedName: string;
  playlists: IPlaylist[];
  hasScroll: boolean;
}>();

const selectedPlaylist = defineModel<string>("primary");

const audioPlayer = ref<HTMLAudioElement | null>(null);

const dataLoaded = ref<boolean>(false);

setTimeout(() => (dataLoaded.value = true), 3000);

const filteredPlaylists = computed(() =>
  props.playlists.filter((playlist) =>
    props.selectedName
      ? playlist.category.includes(
          props.selectedName.slice(0, props.selectedName.length - 1)
        )
      : true
  )
);

const playlistClickHandler = (playlist: IPlaylist, status: boolean): void => {
  if (dataLoaded.value) {
    const audioElement = audioPlayer.value;
    selectedPlaylist.value = playlist.name;
    if (status) {
      playlist.playing = false;
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      return;
    }
    props.playlists.map((item: IPlaylist) => {
      item.playing = false;
    });

    playlist.playing = true;
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.play();
    }
  }
};
</script>

<template>
  <div :class="props.hasScroll && 'pr-2'" class="flex flex-col gap-2">
    <div
      v-for="playlist in filteredPlaylists"
      class="flex items-center p-2 justify-between cursor-pointer hover:bg-button-gray-hover rounded-md"
      @click="playlistClickHandler(playlist, playlist.playing)"
    >
      <SidebarSkeleton
        v-show="!dataLoaded"
        :sizeMinimized="props.sizeMinimized"
      ></SidebarSkeleton>

      <div
        v-show="dataLoaded"
        :class="!props.sizeMinimized && 'gap-2'"
        class="flex"
      >
        <img :src="tempImg" alt="" class="w-12 h-12 bg-black rounded" />

        <div>
          <h1
            v-show="!props.sizeMinimized"
            :class="playlist.playing ? 'text-primary-500' : 'text-white'"
            class=""
          >
            {{ playlist.name }}
          </h1>
          <div
            v-show="!props.sizeMinimized"
            class="flex text-white/50 items-center gap-3"
          >
            <h2 class="text-sm">{{ playlist.category }}</h2>
            <h2 v-if="playlist.numOfSongs" class="text-sm">
              {{ playlist.numOfSongs }} songs
            </h2>
          </div>
        </div>
      </div>
      <div
        v-if="dataLoaded"
        v-show="!props.sizeMinimized"
        class="flex items-center gap-3"
      >
        <i
          v-if="playlist.playing"
          class="text-primary-500 fa-solid fa-circle-pause"
        ></i>
        <i
          v-if="!playlist.playing"
          class="text-primary-500 fa-solid fa-circle-play"
        ></i>
        <i
          v-if="playlist.playing"
          class="text-primary-500 fa-solid fa-volume-high"
        ></i>
      </div>
    </div>
    <audio ref="audioPlayer" :src="audio" class="hidden" controls></audio>
  </div>
</template>

<style scoped></style>
