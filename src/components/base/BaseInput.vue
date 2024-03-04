<script lang="ts" setup>
import { computed, ref, useSlots } from "vue";
import { ValidationRule } from "../../utils/validation-rules.ts";

const props = defineProps<{
  placeholder: string;
  label: string;
  rules?: ValidationRule[];
}>();

const inputValue = defineModel<string>({ default: "" });
const errors = ref<string[]>([]);

const slots = useSlots();
const computedHasPrepend = computed<boolean>(() => {
  return !!slots.prepend;
});
const computedHasAppend = computed<boolean>(() => {
  return !!slots.append;
});

const computedInputStyling = computed(() => {
  return {
    "border-white/50 hover:border-white/80 focus:border-primary-400 active:border-primary-400":
      inputValue.value.length === 0 && errors.value.length === 0,
    "border-primary-400":
      inputValue.value.length > 0 && errors.value.length === 0,
    "border-red-500": errors.value.length > 0,
  };
});

function validateInput(e: any) {
  if (!props.rules) return true;
  const tempErrors: string[] = [];

  props.rules.forEach((rule) => {
    const ruleValue = rule(e.target.value);
    if (ruleValue !== true) tempErrors.push(ruleValue);
  });

  errors.value = tempErrors;
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <h2 v-if="props.label" class="text-sm text-white font-semibold">
      {{ props.label }}
    </h2>
    <div
      :class="computedInputStyling"
      class="w-full flex items-center transition-all border rounded-md h-11 px-3"
    >
      <div v-if="computedHasPrepend" class="pr-2">
        <slot name="prepend"></slot>
      </div>
      <input
        v-model="inputValue"
        :placeholder="props.placeholder"
        class="bg-transparent outline-0 min-w-0 flex-grow"
        @blur="validateInput"
        @input="validateInput"
      />
      <div v-if="computedHasAppend" class="pl-2">
        <slot name="append"></slot>
      </div>
    </div>
    <span
      v-if="errors.length"
      class="text-sm font-bold text-primary-300 flex items-center gap-2"
    >
      <i class="fa-solid fa-triangle-exclamation text-primary-500" />
      {{ errors[0] }}
    </span>
  </div>
</template>

<style scoped></style>
