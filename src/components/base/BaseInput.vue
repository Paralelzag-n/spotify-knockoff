<script lang="ts" setup>
import { computed, ref } from "vue";
import { ValidationRule } from "../../utils/validation-rules.ts";

const props = defineProps<{
  placeholder: string;
  label: string;
  rules?: ValidationRule[];
}>();

const inputValue = defineModel<string>({ default: "" });
const errors = ref<string[]>([]);
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
    <input
      v-model="inputValue"
      :class="computedInputStyling"
      :placeholder="props.placeholder"
      class="bg-transparent outline-0 transition-all border rounded-md h-11 w-full px-3 min-w-0"
      @blur="validateInput"
      @input="validateInput"
    />
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
