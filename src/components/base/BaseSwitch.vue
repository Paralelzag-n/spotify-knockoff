<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  label: string;
}>();

const switchActive = defineModel<boolean>({ default: false });
const computedSwitchColor = computed(() => {
  return {
    "bg-br-button": !switchActive.value,
    "bg-primary-500": switchActive.value,
  };
});

const computedTranslateX = computed(() => {
  return switchActive.value ? 24 : 0;
});

function toggleSwitch() {
  switchActive.value = !switchActive.value;
}
</script>

<template>
  <div class="flex items-center gap-3">
    <div :class="computedSwitchColor" class="switch-body" @click="toggleSwitch">
      <div
        :style="{
          transform: `translateX(${computedTranslateX}px) translateY(${-50}%)`,
        }"
        class="switch-handle"
      />
    </div>
    <p v-if="props.label" class="label-class">
      {{ props.label }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.switch-body {
  @apply h-4 w-10 rounded-full relative cursor-pointer transition-all;
}

.switch-handle {
  @apply absolute bg-module w-3 h-3 rounded-full left-0.5 top-1/2 transition-all;
}

.label-class {
  @apply text-tx-button-white text-sm font-semibold pt-0.5;
}
</style>
