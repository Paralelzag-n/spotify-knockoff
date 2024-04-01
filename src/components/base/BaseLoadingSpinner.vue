<script lang="ts" setup>
import { IBaseLoadingSpinnerProps } from "../../ts/components/base/BaseLoadingSpinner.ts";
import { computed } from "vue";

const props = withDefaults(defineProps<IBaseLoadingSpinnerProps>(), {
  size: 10,
});

const computedLoaderSize = computed(() => {
  return {
    height: `${props.size * 4}px`,
    width: `${props.size * 4}px`,
  };
});
</script>

<template>
  <span :style="computedLoaderSize" class="loader" />
</template>

<style lang="scss" scoped>
.loader {
  border: 4px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
