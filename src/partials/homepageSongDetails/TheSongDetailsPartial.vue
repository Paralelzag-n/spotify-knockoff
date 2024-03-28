<script setup lang="ts">
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import CurrentlyListeningDetails from "./CurrentlyListeningDetails.vue";
import ArtistDetails from "./ArtistDetails.vue";
const computedMainPartialContainerHeight = computed<number | null>(() => {
  if (screenHeight) return screenHeight.value - 16 ?? null;
  return null;
});

const computedMainPartialStyle = computed(() => {
  return { height: `${computedMainPartialContainerHeight.value}px` };
});
const { height: screenHeight } = useWindowSize();
</script>

<template>
  <div class="p-2 w-80">
    <div
      :style="computedMainPartialStyle"
      class="bg-gray-back rounded-lg p-2 overflow-auto"
    >
      <h1 class="text-white pl-2 font-bold">Liked Songs</h1>
      <CurrentlyListeningDetails class="p-2"></CurrentlyListeningDetails>
      <ArtistDetails></ArtistDetails>
    </div>
  </div>
</template>

<style scoped></style>
