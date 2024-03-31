<script lang="ts" setup>
import { computed } from "vue";
import { IBaseInputProps } from "../../ts/components/base/BaseInput.ts";

const input = defineModel<string>({ default: "" });

const props = withDefaults(defineProps<IBaseInputProps>(), {
  error: "",
  type: "text",
});

const emits = defineEmits<{
  (e: "prepend-icon-click"): void;
}>();

const computedErrorClasses = computed(() => {
  return {
    "input-border-error": props.error,
    "input-border": !props.error,
    "ps-4": !props.appendIcon,
    "pe-4": !props.prependIcon,
  };
});

function emitPrependIconClick() {
  emits("prepend-icon-click");
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label class="text-tx-button-white font-bold">{{ props.label }}</label>
    <div
      :class="computedErrorClasses"
      class="h-12 w-full rounded transition-all grid grid-cols-7 items-center"
    >
      <div v-if="props.appendIcon" class="flex items-center justify-center">
        <i :class="props.appendIcon" class="fa-solid fa-brand text-white/40" />
      </div>
      <input
        v-model.trim="input"
        :placeholder="props.placeholder"
        :type="props.type"
        class="input-classes"
      />
      <div v-if="props.prependIcon" class="flex items-center justify-center">
        <div class="icon-button" @click="emitPrependIconClick">
          <i :class="props.prependIcon" class="fa-solid fa-brand" />
        </div>
      </div>
    </div>
    <p v-show="props.error" class="text-red-500 text-xs">{{ props.error }}</p>
  </div>
</template>

<style scoped>
.icon-button {
  @apply duration-100 transition-all rounded-full cursor-pointer hover:bg-br-module/40 text-white/40 hover:text-white h-9 w-9 flex items-center justify-center;
}

.input-classes {
  @apply w-full h-full bg-transparent text-white outline-0 col-span-5;
}

.input-border {
  @apply border border-br-button hover:border-white;
}

.input-border-error {
  @apply border border-red-400 hover:border-red-500;
}
</style>
