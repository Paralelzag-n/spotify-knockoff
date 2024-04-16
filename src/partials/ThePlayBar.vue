<script lang="ts" setup>
import { useSongStore } from "../pinia/songs.pinia.ts";
import { computed, ref } from "vue";
import { ISong } from "../ts/pinia/songs.types.ts";
import BaseAddSong from "../components/base/BaseAddSong.vue";

const songStore = useSongStore();

const computedCurrentSong = computed<ISong | null>(() => {
  return songStore.getSongById("2") ?? null;
});

const songIsLiked = ref<boolean>(false);
</script>

<template>
  <div class="px-4 h-20 w-full grid items-center">
    <div class="flex items-center gap-4">
      <img
        :src="computedCurrentSong?.thumbnail"
        alt="currently playing song img"
        class="h-[55px] w-[55px] rounded"
      />
      <div class="flex-col gap-2">
        <h2 class="text-white text-sm cursor-pointer hover:underline">
          {{ computedCurrentSong?.name }}
        </h2>
        <p class="author-style">
          {{ computedCurrentSong?.author }}
        </p>
      </div>
      <BaseAddSong v-model="songIsLiked" />
    </div>
  </div>
</template>

<style scoped>
.author-style {
  @apply w-fit text-white/60 text-xs font-light cursor-pointer hover:underline hover:text-white/90;
}
</style>
