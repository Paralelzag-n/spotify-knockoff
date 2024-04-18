<script lang="ts" setup>
import { computed } from "vue";
import { useLayoutStore } from "../pinia/layout.pinia.ts";

const layoutStore = useLayoutStore();
const props = defineProps<{
  width: number;
}>();

const constMainPartialColorSelected = computed<boolean>(() => {
  return !!layoutStore.getMainPartialColor;
});

const computedMainPartialGradientStyle = computed(() => {
  const gradientHexValue = layoutStore.getMainPartialColor;
  return {
    width: `${props.width}px`,
    background: `linear-gradient(180deg, ${gradientHexValue}70, transparent)`,
  };
});

const computedDefaultPartialGradientStyle = computed(() => {
  const gradientHexValue = layoutStore.getDefaultPartialColor;
  return {
    width: `${props.width}px`,
    background: `linear-gradient(180deg, ${gradientHexValue}70, transparent)`,
  };
});
</script>

<template>
  <transition name="fade">
    <div
      v-if="constMainPartialColorSelected"
      :style="computedMainPartialGradientStyle"
      class="h-80 absolute top-0 left-0 -z-10"
    />
    <div
      v-else
      :style="computedDefaultPartialGradientStyle"
      class="h-80 absolute top-0 left-0 -z-10"
    />
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
