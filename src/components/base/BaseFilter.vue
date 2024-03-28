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
  () => scrolledToStart.value && !scrolledToEnd.value
);
const isScrolledToEnd = computed(
  () => scrolledToEnd.value && !scrolledToStart.value
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
      if (translateX.value + visibleWidth >= actualWidth - visibleWidth) {
        translateX.value = actualWidth - visibleWidth;

        scrolledToEnd.value = true;
        scrolledToStart.value = false;
        return;
      }
      translateX.value += visibleWidth;
      scrolledToStart.value = false;
    } else {
      if (translateX.value - visibleWidth <= 0 || translateX.value === 0) {
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
  <div v-show="!props.sizeMinimized" class="relative">
    <div ref="visibleElement" class="overflow-hidden py-2 rounded-full">
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
          class="bg-button-gray cursor-pointer text-nowrap text-center leading-6 w-fit text-sm px-3 h-8 flex items-center justify-center rounded-full"
          @click="selectHandler(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <transition name="slide-fade-left">
      <div
        v-if="shouldScrollExist && !isScrolledToStart"
        class="absolute top-1/2 -translate-y-1/2 -left-2"
      >
        <div
          class="w-24 h-8 absolute pointer-events-none top-0 left-0 -z-50 bg-gradient-to-r from-gray-back/80 to-transparent"
        ></div>
        <button
          class="text-white shadow-card bg-button-gray rounded-full w-8 h-8 flex items-center justify-center hover:bg-button-gray-hover"
          @click="scrollByVisibleWidth(true)"
        >
          <i class="fa-solid text-white fa-chevron-left"></i>
        </button>
      </div>
    </transition>
    <transition name="slide-fade-right">
      <div
        v-if="shouldScrollExist && !isScrolledToEnd"
        class="absolute top-1/2 -translate-y-1/2 -right-2"
      >
        <div
          class="w-24 h-8 absolute pointer-events-none top-0 right-0 -z-50 bg-gradient-to-l from-gray-back/80 to-transparent"
        ></div>
        <button
          class="text-white bg-button-gray shadow-card rounded-full w-8 h-8 flex items-center justify-center hover:bg-button-gray-hover"
          @click="scrollByVisibleWidth(false)"
        >
          <i class="fa-solid text-white p-4 fa-chevron-right"></i>
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
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
