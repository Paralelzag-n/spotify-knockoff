<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  selectable?: boolean;
  contentNonSelectable?: string[];
  contentSelectable?: string[];
}>();

const dropdownOpen = ref<boolean>(false);

const dropdownRef = ref<HTMLElement | null>(null);

const closeHandler = (e: any): void => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false;
  }
};

const selectedContent = defineModel();

const selectHandler = (item: string): void => {
  if (selectedContent.value === item) {
    selectedContent.value = "";
    return;
  }
  selectedContent.value = item;
};

onMounted(() => {
  document.addEventListener("click", (e: any) => closeHandler(e));
});

onBeforeUnmount(() => {
  document.removeEventListener("click", (e: any) => closeHandler(e));
});
</script>

<template>
  <div ref="dropdownRef" class="relative flex flex-col">
    <i
      @click="dropdownOpen = !dropdownOpen"
      v-if="!props.selectable"
      class="fa-solid fa-plus text-right text-white/80 cursor-pointer"
    ></i>
    <i
      @click="dropdownOpen = !dropdownOpen"
      v-if="props.selectable"
      class="fa-solid fa-list text-right text-white/80 cursor-pointer"
    ></i>

    <div
      class="absolute z-10 top-full right-0 mt-2 overflow-hidden bg-button-gray duration-300 rounded-md text-white transition-height"
      :class="{
        'max-h-[200px] ': dropdownOpen,
        'max-h-0 ': !dropdownOpen,
        'w-[200px] left-0': !props.selectable,
      }"
    >
      <div v-if="props.selectable" class="flex p-3 flex-col">
        <h2 class="p-2 text-icon-unselected">sort by</h2>
        <div
          class="flex items-center cursor-pointer w-[130px] p-2 hover:bg-button-gray-hover justify-between"
          v-for="item in props.contentSelectable"
          @click="selectHandler(item)"
        >
          <h1
            :class="{
              ' text-primary-500 ': selectedContent === item,
              ' text-white': selectedContent !== item,
            }"
          >
            {{ item }}
          </h1>
          <i
            v-show="selectedContent === item"
            class="fa-solid text-primary-500 fa-check"
          ></i>
        </div>
      </div>
      <div
        class="flex cursor-pointer p-2 flex-col"
        v-if="!props.selectable"
        v-for="item in props.contentNonSelectable"
      >
        <div class="flex hover:bg-button-gray-hover p-2 gap-1 items-center">
          <h1>{{ item }}</h1>
          <i class="fa-solid fa-folder"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
