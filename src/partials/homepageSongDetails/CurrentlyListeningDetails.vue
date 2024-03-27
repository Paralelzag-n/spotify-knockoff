<script setup lang="ts">
import tempImg from "../../assets/lofi-girl-lofi.gif";
</script>

<template>
  <div class="p-2 flex flex-col gap-2">
    <h1 class="text-white">Liked Songs</h1>
    <img class="w-72 rounded-lg" :src="tempImg" alt="" />
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-white">Andromeda</h1>
        <h1 class="text-gray-400">Gorillaz</h1>
      </div>
      <div class="flex items-center gap-3">
        <i class="text-primary-300 fa-solid fa-ellipsis"></i>
        <div
          class="w-5 h-5 bg-primary-300 rounded-full flex justify-center items-center"
        >
          <i class="text-black fa-solid fa-check"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
