<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  icon?: string;
  border?: boolean;
}>();

const computedButtonStyle = computed(() => {
  return {
    "border-style": props.border,
    "hover:scale-105": !props.border,
  };
});
</script>

<template>
  <div :class="computedButtonStyle" class="button-style">
    <div class="flex justify-center">
      <i
        v-if="props.icon"
        :class="props.icon"
        class="fa-brands fa-solid text-tx-button-white"
      />
    </div>
    <div class="col-span-3 flex justify-center">
      <p class="text-tx-button-white font-bold">
        <slot />
      </p>
    </div>
  </div>
</template>

<style scoped>
.button-style {
  @apply rounded-full cursor-pointer transition-all grid grid-cols-5 items-center px-2 h-12;
}

.border-style {
  @apply border border-br-button hover:border-br-button-hover;
}
</style>
