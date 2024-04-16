<script lang="ts" setup>
const playlistSelected = defineModel<boolean>({ default: false });

function togglePlaylistSelected(): void {
  playlistSelected.value = !playlistSelected.value;
}
</script>

<template>
  <div
    class="grid items-center w-4.5 h-4.5 group cursor-pointer transition"
    @click="togglePlaylistSelected"
  >
    <i
      v-if="playlistSelected"
      class="fa-solid fa-circle-plus text-white/60 group-hover:text-white/90"
    />
    <i
      v-else
      class="fa-solid fa-circle-check text-primary-500 group-hover:text-primary-600"
    />
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
