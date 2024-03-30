<script setup lang="ts">
const props = defineProps<{
  sizeMinimized: boolean;
}>();
</script>

<template>
  <div class="flex items-center gap-2">
    <div class="w-12 h-12 bg-white/20 rounded-md" />
    <div v-show="!props.sizeMinimized" class="flex flex-col gap-2">
      <h1 class="w-36 h-4 bg-white/20 rounded-md"></h1>
      <div class="w-24 h-4 bg-white/20 rounded-md"></div>
    </div>
  </div>
</template>
