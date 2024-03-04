<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, defineModel } from "vue";

const searchComponentRef = ref<HTMLElement | null>(null);
const searchActive = defineModel("search");
const searchedContent = defineModel<string>();
const searchInputRef = ref<HTMLElement | null>(null);

const closeHandler = (e: any): void => {
  if (
    searchComponentRef.value &&
    !searchComponentRef.value.contains(e.target)
  ) {
    searchActive.value = false;
  }
};

const toggleInput = (): void => {
  searchActive.value = true;
  setTimeout(() => {
    if (searchInputRef.value) searchInputRef.value.focus();
  }, 300);
};

onMounted(() => {
  document.addEventListener("click", (e: any) => closeHandler(e));
});

onBeforeUnmount(() => {
  document.removeEventListener("click", (e: any) => closeHandler(e));
});
</script>
<template>
  <div ref="searchComponentRef">
    <div
      :class="
        !searchActive
          ? 'max-w-[32px]  bg-transparent'
          : 'bg-white/10  max-w-[300px]'
      "
      class="flex transition-all overflow-hidden justify-between duration-300 items-center rounded"
    >
      <i
        :class="!searchActive && 'hover:bg-white/20 cursor-pointer'"
        @click="toggleInput"
        class="fa-solid text-white/80 p-2 rounded-full fa-magnifying-glass"
      ></i>
      <input
        ref="searchInputRef"
        placeholder="Search in library"
        v-model="searchedContent"
        type="text"
        class="outline-none flex-grow text-white/50 bg-transparent"
      />
      <i
        :class="!searchedContent ? 'opacity-0' : ''"
        @click="searchedContent = ''"
        class="fa-solid text-white/80 fa-xmark pr-2"
      ></i>
    </div>
  </div>
</template>

<style scoped></style>
