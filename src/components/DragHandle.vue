<script lang="ts" setup>
import { useDrag } from "../composable/useDrag.ts";

const props = defineProps<{
  height: number;
  onDrag: (deltaX: number) => void;
}>();

const { onMousedown } = useDrag(props.onDrag);
</script>

<template>
  <div
    ref="handleRef"
    class="h-full w-[1px] group px-1 flex items-center justify-center cursor-col-resize"
    @mousedown="onMousedown"
  >
    <div
      :style="{ height: `${props.height}px` }"
      class="w-[1px] opacity-0 group-hover:opacity-50 flex-shrink-0 bg-slate-100/50"
    />
  </div>
</template>
