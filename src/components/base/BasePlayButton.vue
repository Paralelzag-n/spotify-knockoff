<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  size: number;
}>();

const computedSizeStyle = computed(() => {
  return { height: `${props.size * 4}px`, width: `${props.size * 4}px` };
});
</script>

<template>
  <div :style="computedSizeStyle" class="play-button shadow-play-button">
    <i class="fa-solid fa-play ps-0.5" />
  </div>
</template>

<style lang="scss" scoped>
.play-button {
  @apply bg-primary-500 rounded-full flex cursor-pointer justify-center items-center hover:scale-110 transition-all flex-shrink-0;
}

.shadow-play-button {
  box-shadow:
    0 0 8px rgba(0, 0, 0, 0.2),
    0 0 12px rgba(0, 0, 0, 0.25);
}
</style>
