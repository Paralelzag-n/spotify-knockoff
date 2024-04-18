<script lang="ts" setup>
import { computed, defineModel, ref, watch } from "vue";

import { useElementSize, useResizeObserver } from "@vueuse/core";

const props = defineProps<{
  filterNames: string[];
}>();

const selected = defineModel<string[]>({ default: [] });

const visibleElement = ref<HTMLElement | null>(null);
const fullElement = ref<HTMLElement | null>(null);
const itemsContainerRef = ref<HTMLElement | null>(null);
const twoFilters = ref<HTMLElement | null>(null);
const { width: itemsContainerWidth } = useElementSize(itemsContainerRef);
const { width: visibleElementWidth } = useElementSize(visibleElement);
const { width: twoFiltersWidth } = useElementSize(twoFilters);

const slideAmount = ref<number>(0);
const scrollWidth = ref<number>(0);

watch(visibleElementWidth, () => {
  slideAmount.value = 0;
});

const computedTranslateX = computed<number>(() => {
  const maxSlide = Math.floor(scrollWidth.value / visibleElementWidth.value);
  const minSlide = 0;

  if (slideAmount.value >= maxSlide) {
    slideAmount.value = maxSlide;
    return scrollWidth.value - visibleElementWidth.value;
  }
  if (slideAmount.value < minSlide) {
    slideAmount.value = minSlide;

    return 0;
  }

  return visibleElementWidth.value * slideAmount.value;
});

const computedFilterNames = computed<string[]>(() => {
  const selectedItemIndex = props.filterNames.findIndex(
    (el) => el === selected.value[0]
  );
  const newCopy = [...props.filterNames];
  const splicedElement = newCopy.splice(selectedItemIndex, 1);
  newCopy.unshift(splicedElement[0]);
  return newCopy;
});

const computedScrolledToStart = computed<boolean>(() => {
  return computedTranslateX.value === 0;
});
const computedScrolledToEnd = computed<boolean>(() => {
  return (
    computedTranslateX.value === scrollWidth.value - visibleElementWidth.value
  );
});

const shouldScrollExist = computed<boolean | null>(() => {
  if (!visibleElement.value) return null;
  if (selected.value.length !== 2)
    return visibleElementWidth.value < itemsContainerWidth.value;
  return visibleElementWidth.value < twoFiltersWidth.value + 40;
});

const clearSelected = (): void => {
  selected.value = [];
};

const handleResize = (): void => {
  if (fullElement.value) {
    scrollWidth.value = fullElement.value.scrollWidth;
  }
};

const selectHandler = (item: string): void => {
  slideAmount.value = 0;
  if (selected.value?.includes(item)) {
    const index = selected.value.findIndex((value) => value === item);
    selected.value.splice(index, 1);

    return;
  }

  selected.value?.push(item);

  if (selected.value.length === 2) {
    slideAmount.value = 0;
  }
};

const changeCurrentPage = (back: boolean) => {
  back ? slideAmount.value-- : slideAmount.value++;
};

useResizeObserver(visibleElement, handleResize);
useResizeObserver(fullElement, handleResize);
</script>

<template>
  <div class="relative">
    <div ref="visibleElement" class="overflow-hidden py-2 rounded-full">
      <div
        ref="fullElement"
        :style="{
          transform: `translateX(-${computedTranslateX}px)`,
        }"
        class="transition-all duration-[400ms] gap-2"
        :class="selected.length !== 0 ? 'ps-10' : ''"
      >
        <div ref="itemsContainerRef" class="w-fit">
          <transition name="slide-fade-close">
            <i
              v-if="selected?.length > 0"
              @click="clearSelected"
              class="fa-solid absolute left-0 top-1/2 -translate-y-1/2 flex-shrink-0 fa-xmark cursor-pointer text-white bg-button-gray shadow-card rounded-full w-8 h-8 flex items-center justify-center hover:bg-button-gray-hover"
            ></i>
          </transition>

          <div
            v-if="selected?.length === 2"
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

          <div v-else class="w-fit flex-nowrap flex items-center gap-2">
            <div
              v-for="item in computedFilterNames"
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
          </div>
        </div>
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
          @click="changeCurrentPage(true)"
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
          @click="changeCurrentPage(false)"
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
