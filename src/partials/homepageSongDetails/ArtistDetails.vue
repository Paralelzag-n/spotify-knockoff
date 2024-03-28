<script setup lang="ts">
import ArtistImg from "../../assets/img/Gorillaz-announce-top.webp";
</script>

<template>
  <div class="text-white rounded-lg shadow-card flex flex-col">
    <div class="relative cursor-pointer">
      <img
        class="w-72 h-56 object-cover rounded-t-lg"
        :src="ArtistImg"
        alt=""
      />
      <div
        class="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black/50 opacity-0 hover:opacity-100 transition-all duration-300"
      ></div>
    </div>
    <div class="bg-card-gray flex rounded-b-lg flex-col gap-3 p-3">
      <h1>Gorillaz</h1>
      <div class="flex items-center justify-between text-sm">
        <h1 class="text-white/50">1,600,000 monthly listeners</h1>
        <div
          class="w-16 rounded-full border text-center cursor-pointer hover:bg-white hover:text-black transition-all"
        >
          Follow
        </div>
      </div>
      <p class="text-white/50 text-xs max-w-72 truncate-custom">
        Gorillaz is the most dedismtyvnel group of all time Gorillaz is the most
        dedismtyvnel group of all time Gorillaz is the most dedismtyvnel group
        of all time Gorillaz is the most dedismtyvnel group of all time Gorillaz
        is the most dedismtyvnel group of all time Gorillaz is the most
        dedismtyvnel group of all time Gorillaz is the most dedismtyvnel group
        of all time Gorillaz is the most dedismtyvnel group of all time Gorillaz
        is the most dedismtyvnel group of all time Gorillaz is the most
        dedismtyvnel group of all time Gorillaz is the most dedismtyvnel group
        of all time Gorillaz is the most dedismtyvnel group of all time Gorillaz
        is the most dedismtyvnel group of all time Gorillaz is the most
        dedismtyvnel group of all time Gorillaz is the most dedismtyvnel group
        of all time Gorillaz is the most dedismtyvnel group of all time Gorillaz
        is the most dedismtyvnel group of all time Gorillaz is the most
        dedismtyvnel group of all time
      </p>
    </div>
  </div>
</template>

<style scoped>
.truncate-custom {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* Change the number of lines to truncate */
  -webkit-line-clamp: 3;
  /* Adjust the line height if needed */
  line-height: 1.5;
}
</style>
