<script lang="ts" setup>
import { computed, defineModel, ref, watch } from "vue";

import { useElementSize, useResizeObserver } from "@vueuse/core";

const props = defineProps<{
  filterNames: string[];
}>();

const selected = defineModel<string[]>({ default: [] });

const visibleElement = ref<HTMLElement | null>(null);
const fullElement = ref<HTMLElement | null>(null);
const twoFilters = ref<HTMLElement | null>(null);
const slideAmount = ref<number>(0);
const scrollWidth = ref<number>(0);
const handleResize = () => {
  if (fullElement.value) {
    scrollWidth.value = fullElement.value.scrollWidth;
    console.log(scrollWidth.value);
  }
};

useResizeObserver(visibleElement, handleResize);
useResizeObserver(fullElement, handleResize);

const { width: visibleElementWidth } = useElementSize(visibleElement);
const { width: twoFiltersWidth } = useElementSize(twoFilters);
const { width: fullElementWidth } = useElementSize(fullElement);

const translateX = ref<number>(0);
watch(
  fullElementWidth,
  (val) => {
    console.log(val);
  },
  { immediate: true }
);

const computedScrolledToStart = computed(() => {
  return translateX.value === 0;
});
const computedScrolledToEnd = computed(() => {
  return translateX.value === scrollWidth.value - visibleElementWidth.value;
});

watch(visibleElementWidth, () => {
  translateX.value = 0;
});

const shouldScrollExist = computed(() => {
  if (visibleElement.value) {
    if (selected.value.length !== 2) {
      return visibleElementWidth.value < scrollWidth.value;
    }
    return visibleElementWidth.value < twoFiltersWidth.value + 40;
  }
});

const clearSelected = (): void => {
  selected.value = [];
};

const selectHandler = (item: string): void => {
  if (selected.value?.includes(item)) {
    const index = selected.value.findIndex((value) => value === item);
    selected.value.splice(index, 1);

    return;
  }

  selected.value?.push(item);

  if (selected.value.length === 2) {
    translateX.value = 0;
  }
};

const scrollByVisibleWidth = (back: boolean) => {
  if (!visibleElement.value || !fullElement.value) return;
  const maxSlide = Math.floor(scrollWidth.value / visibleElementWidth.value);
  console.log(maxSlide);
  const minSlide = 0;

  if (!back) {
    slideAmount.value++;
    if (slideAmount.value >= maxSlide) {
      slideAmount.value = maxSlide;
      translateX.value = scrollWidth.value - visibleElementWidth.value;
      return;
    }
  }

  if (back) {
    slideAmount.value--;
    if (slideAmount.value < minSlide) {
      slideAmount.value = minSlide;
      translateX.value = 0;
      return;
    }
  }

  translateX.value = visibleElementWidth.value * slideAmount.value;
};
</script>

<template>
  <div class="relative">
    <div ref="visibleElement" class="overflow-hidden py-2 rounded-full">
      <div
        ref="fullElement"
        :style="{ transform: `translateX(-${translateX}px)` }"
        class="transition-all duration-[400ms] flex-nowrap flex items-center gap-2"
        :class="selected.length !== 0 ? 'ps-10' : ''"
      >
        <transition name="slide-fade-close">
          <i
            v-if="selected?.length > 0 && translateX === 0"
            @click="clearSelected"
            class="fa-solid absolute left-0 top-1/2 -translate-y-1/2 flex-shrink-0 fa-xmark cursor-pointer text-white bg-button-gray shadow-card rounded-full w-8 h-8 flex items-center justify-center hover:bg-button-gray-hover"
          ></i>
        </transition>
        <template v-if="selected?.length === 2">
          <div
            ref="twoFilters"
            class="text-white text-nowrap text-center flex items-center leading-6 w-fit text-sm justify-between h-8 rounded-full bg-primary-500"
          >
            <div
              v-for="(item, index) in selected"
              :key="item"
              @click="selectHandler(item)"
              :class="[
                'h-8 cursor-pointer rounded-full px-3 text-sm w-fit leading-6 items-center flex text-nowrap hover:bg-primary-400',
                'bg-primary-500',
                index < selected.length - 1
                  ? 'border-r rounded-r-none border-white'
                  : 'rounded-l-none',
              ]"
              class="hover:bg-primary-400 text-nowrap text-center flex items-center leading-6 w-fit text-sm px-3 h-8 rounded-full bg-primary-500"
            >
              {{ item }}
            </div>
          </div>
        </template>
        <template v-else>
          <div
            v-for="item in props.filterNames"
            :key="item"
            :class="{
              'bg-primary-500 text-white hover:bg-primary-400':
                selected?.includes(item),
              'hover:bg-button-gray-hover text-white':
                !selected?.includes(item),
            }"
            class="bg-button-gray cursor-pointer text-nowrap text-center leading-6 w-fit text-sm px-3 h-8 flex items-center justify-center rounded-full"
            @click="selectHandler(item)"
          >
            {{ item }}
          </div>
        </template>
      </div>
    </div>
    <transition name="slide-fade-left">
      <div
        v-if="shouldScrollExist && !computedScrolledToStart"
        class="absolute top-1/2 -translate-y-1/2 -left-1"
      >
        <div
          class="w-24 h-8 absolute pointer-events-none top-0 left-0 -z-50 bg-gradient-to-r from-module/80 to-transparent"
        />
        <button
          @click="scrollByVisibleWidth(true)"
          class="text-white shadow-card bg-button-gray rounded-full w-8 h-8 flex items-center justify-center hover:bg-button-gray-hover"
        >
          <i class="fa-solid text-white fa-chevron-left"></i>
        </button>
      </div>
    </transition>
    <transition name="slide-fade-right">
      <div
        v-if="shouldScrollExist && !computedScrolledToEnd"
        class="absolute top-1/2 -translate-y-1/2 -right-1"
      >
        <div
          class="w-24 h-8 absolute pointer-events-none top-0 right-0 -z-50 bg-gradient-to-l from-module/80 to-transparent"
        />
        <button
          @click="scrollByVisibleWidth(false)"
          class="text-white bg-button-gray shadow-card rounded-full w-8 h-8 flex items-center justify-center hover:bg-button-gray-hover"
        >
          <i class="fa-solid text-white p-4 fa-chevron-right"></i>
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-fade-close-enter-active,
.slide-fade-close-leave-active {
  transition: all 220ms ease-in-out;
}
.slide-fade-close-enter-from,
.slide-fade-close-leave-to {
  opacity: 0;
  transform: translateX(4px) translateY(-50%);
}
.slide-fade-close-enter-to,
.slide-fade-close-leave-from {
  opacity: 1;
  transform: translateX(0) translateY(-50%);
}

.slide-fade-right-enter-active,
.slide-fade-right-leave-active,
.slide-fade-left-enter-active,
.slide-fade-left-leave-active {
  transition: all 220ms ease-in-out;
  transition-delay: 220ms;
}

.slide-fade-right-enter-from,
.slide-fade-right-leave-to {
  opacity: 0;
  transform: translateX(8px) translateY(-50%);
}

.slide-fade-left-enter-from,
.slide-fade-left-leave-to {
  opacity: 0;
  transform: translateX(-8px) translateY(-50%);
}

.slide-fade-right-enter-to,
.slide-fade-right-leave-from,
.slide-fade-left-enter-to,
.slide-fade-left-leave-from {
  opacity: 1;
  transform: translateX(0) translateY(-50%);
}
</style>
