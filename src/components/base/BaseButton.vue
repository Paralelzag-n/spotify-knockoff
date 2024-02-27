<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  color?: string;
}>();

const computedButtonClass = computed(() => {
  return {
    "bg-primary border-primary/50 hover:border-primary": props.color,
    "border-br-module/50 hover:border-white": !props.color,
  };
});

function growCircleEffect(event: MouseEvent) {
  const button = event.currentTarget as HTMLElement;
  const circle = button.querySelector(".circle") as HTMLElement;
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.style.transform = "scale(2)";
}

function resetCircleEffect(event: MouseEvent) {
  const button = event.currentTarget as HTMLElement;
  const circle = button.querySelector(".circle") as HTMLElement;
  circle.style.transform = "scale(0)";
}
</script>

<template>
  <button
    :class="computedButtonClass"
    class="flex items-center justify-center transition gap-2 border-2 py-2 px-10 rounded-full overflow-hidden relative"
    @mouseleave="resetCircleEffect"
    @mouseup="resetCircleEffect"
    @mousedown.left="growCircleEffect"
  >
    <span class="circle absolute"></span>
    <slot name="prepend" />
    <h2 class="font-bold text-lg">
      <slot />
    </h2>
  </button>
</template>
<style scoped>
.circle {
  width: 0;
  height: 0;
  border-radius: 50%;
  position: absolute;
  transform: scale(0);
  background-color: rgba(255, 255, 255, 0.5);
  transition: transform 0.5s ease;
}
</style>
