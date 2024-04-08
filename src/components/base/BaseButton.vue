<script lang="ts" setup>
import { computed } from "vue";
import BaseLoadingSpinner from "./BaseLoadingSpinner.vue";
import { IBaseButtonProps } from "../../ts/components/base/BaseButton.types.ts";

const props = withDefaults(defineProps<IBaseButtonProps>(), {
  loading: false,
  type: "button",
  text: "tx-button-white",
});

const computedButtonStyle = computed(() => {
  return {
    "border-style": props.border,
    "hover:scale-105": !props.border,
  };
});
</script>

<template>
  <button :class="computedButtonStyle" class="button-style" type="submit">
    <div class="flex justify-center">
      <i
        v-if="props.icon"
        :class="`${props.icon} text-${props.text}`"
        class="fa-brands fa-solid"
      />
    </div>
    <div class="col-span-3 flex justify-center">
      <p v-if="!props.loading" :class="props.text" class="font-bold">
        <slot />
      </p>
      <BaseLoadingSpinner v-else :color="props.text" :size="7" />
    </div>
  </button>
</template>

<style scoped>
.button-style {
  @apply rounded-full cursor-pointer transition-all grid grid-cols-5 items-center px-2 h-12;
}

.border-style {
  @apply border border-br-button hover:border-br-button-hover;
}
</style>
