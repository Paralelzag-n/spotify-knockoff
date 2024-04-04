<script setup lang="ts">
import tempImg from "../../assets/lofi-girl-lofi.gif";
</script>

<template>
  <div class="flex flex-col gap-2">
    <img class="w-full rounded-lg" :src="tempImg" alt="" />
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-white font-bold text-xl hover:underline cursor-pointer">
          Andromeda
        </h1>
        <p
          class="text-white/60 text-sm cursor-pointer hover:underline hover:text-white"
        >
          Gorillaz
        </p>
      </div>
      <div class="flex items-center gap-3">
        <i class="text-primary-500 fa-solid fa-ellipsis"></i>
        <div
          class="w-5 h-5 bg-primary-500 rounded-full shadow-card hover:scale-105 cursor-pointer transition-all flex justify-center items-center"
        >
          <i class="text-black text-xs pt-0.5 fa-solid fa-check"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
