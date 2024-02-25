<script setup lang="ts">
import { ref } from "vue";
import BaseFilter from "./components/base/BaseFilter.vue";
const filterNames = ref<string[]>([
  "Playlists",
  "Artists",
  "By you",
  "By paralelify",
]);
const selectedName = ref<string>("");
</script>

<template>
  <div>
    <BaseFilter
      v-model="filterNames"
      v-model:primary="selectedName"
    ></BaseFilter>
  </div>
</template>

<style scoped></style>
