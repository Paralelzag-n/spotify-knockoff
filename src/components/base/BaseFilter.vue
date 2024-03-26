<script lang="ts" setup>
import { computed, defineModel, ref } from "vue";

const props = defineProps<{
  sizeMinimized: boolean;
  filterNames: string[];
}>();

const selected = defineModel<string>("primary");

const visibleElement = ref<HTMLElement | null>(null);
const fullElement = ref<HTMLElement | null>(null);
const scrolledToEnd = ref<boolean>(false);
const scrolledToStart = ref<boolean>(true);

const translateX = ref<number>(0);
const shouldScrollExist = computed(() => {
  if (fullElement.value && visibleElement.value) {
    return visibleElement.value.clientWidth < fullElement.value.scrollWidth;
  }
});

const isScrolledToStart = computed(
  () => scrolledToStart.value && !scrolledToEnd.value,
);
const isScrolledToEnd = computed(
  () => scrolledToEnd.value && !scrolledToStart.value,
);

const selectHandler = (item: string): void => {
  if (selected.value === item) {
    selected.value = "";
    return;
  }
  selected.value = item;
};

const scrollByVisibleWidth = (back: boolean) => {
  if (visibleElement.value && fullElement.value) {
    const actualWidth = fullElement.value.scrollWidth;
    const visibleWidth = visibleElement.value.clientWidth;

    if (!back) {
      if (translateX.value + visibleWidth > actualWidth - visibleWidth) {
        translateX.value = actualWidth - visibleWidth;

        scrolledToEnd.value = true;
        scrolledToStart.value = false;
        return;
      }
      translateX.value += visibleWidth;
      scrolledToStart.value = false;
    } else {
      if (translateX.value - visibleWidth < 0 || translateX.value === 0) {
        translateX.value = 0;
        scrolledToStart.value = true;
        scrolledToEnd.value = false;
        return;
      }

      translateX.value -= visibleWidth;
      scrolledToEnd.value = false;
    }
  }
};
</script>

<template>
  <div
    v-show="!props.sizeMinimized"
    ref="visibleElement"
    class="relative overflow-hidden"
  >
    <div
      ref="fullElement"
      :style="{ transform: `translateX(-${translateX}px)` }"
      class="transition-all duration-[400ms] flex-nowrap flex items-center gap-2"
    >
      <div
        v-for="item in props.filterNames"
        :key="item"
        :class="{
          'bg-primary-500 text-white hover:bg-primary-400': selected === item,
          'hover:bg-button-gray-hover text-white': selected !== item,
        }"
        class="bg-button-gray cursor-pointer text-nowrap text-center leading-6 w-fit text-sm px-3 py-1 rounded-[100vh]"
        @click="selectHandler(item)"
      >
        {{ item }}
      </div>
    </div>
    <button
      v-if="shouldScrollExist && !isScrolledToStart"
      class="absolute text-white bg-button-gray p-3 rounded-full w-5 h-5 flex items-center justify-center hover:bg-button-gray-hover top-1/2 transform -translate-y-1/2 left-0"
      @click="scrollByVisibleWidth(true)"
    >
      <i class="fa-solid text-white fa-chevron-left"></i>
    </button>
    <button
      v-if="shouldScrollExist && !isScrolledToEnd"
      class="absolute text-white bg-button-gray p-3 rounded-full w-5 h-5 flex items-center justify-center hover:bg-button-gray-hover top-1/2 transform -translate-y-1/2 right-0"
      @click="scrollByVisibleWidth(false)"
    >
      <i class="fa-solid text-white fa-chevron-right"></i>
    </button>
  </div>
</template>
