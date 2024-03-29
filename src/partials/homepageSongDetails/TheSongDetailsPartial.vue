<script lang="ts" setup>
import CurrentlyListeningDetails from "./CurrentlyListeningDetails.vue";
import ArtistDetails from "./ArtistDetails.vue";
</script>

<template>
  <div class="bg-gray-back rounded-lg p-2 overflow-auto">
    <h1 class="text-white pl-2 font-bold">Liked Songs</h1>
    <CurrentlyListeningDetails class="p-2"></CurrentlyListeningDetails>
    <ArtistDetails></ArtistDetails>
  </div>
</template>

<style scoped></style>
