<script setup lang="ts">
import { defineModel } from "vue";

const selected = defineModel<string>("primary");
const itemNames = defineModel<string[]>({ default: [] });
const selectHandler = (item: string): void => {
  selected.value = item;
};
</script>

<template>
  <div class="bg-black flex items-center gap-2">
    <div
      @click="selectHandler(item)"
      :class="
        selected === item
          ? 'bg-white text-black hover:bg-white/95'
          : 'hover:bg-button-gray-hover text-white'
      "
      v-for="item in itemNames"
      :key="item"
      class="bg-button-gray cursor-pointer leading-6 w-fit text-sm px-2 py-1 rounded-2xl"
    >
      {{ item }}
    </div>
  </div>
</template>

<style scoped></style>
