<script lang="ts" setup>
import CurrentlyListeningDetails from "../homepageSongDetails/CurrentlyListeningDetails.vue";
import ArtistDetails from "../homepageSongDetails/ArtistDetails.vue";
</script>

<template>
  <div class="rounded-lg p-2 w-full overflow-auto">
    <h1 class="text-white pl-2 font-bold">Liked Songs</h1>
    <CurrentlyListeningDetails class="p-2"></CurrentlyListeningDetails>
    <ArtistDetails></ArtistDetails>
  </div>
</template>
