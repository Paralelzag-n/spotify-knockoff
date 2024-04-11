<script lang="ts" setup>
const props = defineProps<{
  imageUrl: string;
}>();
</script>

<template>
  <div class="relative h-52 w-52 rounded-full overflow-hidden cursor-pointer">
    <img
      v-if="props.imageUrl"
      :src="props.imageUrl"
      alt="user profile"
      class="rounded-full shadow-card h-full w-full object-cover"
    />
    <div
      class="absolute top-1/2 left-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 opacity-0 bg-module/60 hover:opacity-100 transition-all flex justify-center items-center flex-col gap-2"
    >
      <i class="fa-solid fa-pen text-white" />
      <p class="text-white">Choose photo</p>
    </div>
  </div>
</template>

<style scoped></style>
