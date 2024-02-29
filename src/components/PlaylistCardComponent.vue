<script setup lang="ts">
import { defineModel, ref } from "vue";
import { IPlaylist } from "../ts/interfaces/playlist.interface";
import tempImg from "../assets/lofi-girl-lofi.gif";
import audio from "../assets/rhcp.mp3";

const selectedPlaylist = defineModel<string>("primary");
const PlaylistInfo = defineModel<IPlaylist[]>({ default: [] });
const unfilteredPlaylist = defineModel<IPlaylist[]>("unfiltered");
const size = defineModel<boolean>("size");
const audioPlayer = ref<HTMLAudioElement | null>(null);

const dataLoaded = ref<boolean>(false);

setTimeout(() => (dataLoaded.value = true), 3000);

const playlistClickHandler = (playlist: IPlaylist, status: boolean): void => {
  //the logic should be changed,i made it just for the general view
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
    unfilteredPlaylist.value?.map((item: IPlaylist) => {
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
  <div :class="size ? 'gap-10' : 'gap-5'" class="flex flex-col">
    <div
      @click="playlistClickHandler(playlist, playlist.playing)"
      v-for="playlist in PlaylistInfo"
      :class="!size ? 'p-3 ' : ''"
      class="flex items-center justify-between cursor-pointer hover:bg-button-gray-hover rounded-md"
    >
      <div v-show="!dataLoaded">
        <div class="flex items-center gap-2">
          <div class="w-12 h-12 bg-white/20 rounded-md" />
          <div v-show="!size" class="flex flex-col gap-2">
            <h1 class="w-36 h-4 bg-white/20 rounded-md"></h1>
            <div class="w-24 h-4 bg-white/20 rounded-md"></div>
          </div>
        </div>
      </div>
      <div v-show="dataLoaded" :class="size ? '' : 'gap-2'" class="flex">
        <img :src="tempImg" alt="" class="w-12 h-12 bg-black rounded-sm" />

        <div>
          <h1
            v-show="!size"
            :class="playlist.playing ? 'text-primary-500' : 'text-white'"
            class=""
          >
            {{ playlist.name }}
          </h1>
          <div v-show="!size" class="flex text-white/50 items-center gap-3">
            <h2 class="text-sm">{{ playlist.category }}</h2>
            <h2 v-if="playlist.numOfSongs" class="text-sm">
              {{ playlist.numOfSongs }} songs
            </h2>
          </div>
        </div>
      </div>
      <div v-show="!size" v-if="dataLoaded" class="flex items-center gap-3">
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
    <audio class="hidden" ref="audioPlayer" :src="audio" controls></audio>
  </div>
</template>

<style scoped></style>
