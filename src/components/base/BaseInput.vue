<script lang="ts" setup>
import { computed, ref, useSlots } from "vue";
import { ValidationRule } from "../../utils/validation-rules.ts";

const props = defineProps<{
  placeholder: string;
  label: string;
  rules?: ValidationRule[];
  password?: boolean;
}>();

const inputValue = defineModel<string>({ default: "" });
const inputFocused = ref<boolean>(false);
const errors = ref<string[]>([]);

const computedInputType = computed<string>(() =>
  props.password ? "password" : "text",
);

const slots = useSlots();
const computedHasPrepend = computed<boolean>(() => {
  return !!slots.prepend;
});
const computedHasAppend = computed<boolean>(() => {
  return !!slots.append;
});

const computedInputStyling = computed(() => {
  return {
    "border-white/50 hover:border-primary-400":
      inputValue.value.length === 0 &&
      errors.value.length === 0 &&
      !inputFocused.value,
    "border-primary-400":
      (inputValue.value.length > 0 || inputFocused.value) &&
      errors.value.length === 0,
    "border-red-500": errors.value.length > 0,
  };
});

function onFocus() {
  inputFocused.value = true;
}

function onBlur(e: any) {
  validateInput(e);
  inputFocused.value = false;
}

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
      ref="inputWrapper"
      :class="computedInputStyling"
      class="w-full flex items-center transition-all rounded-md border h-11 px-2"
    >
      <div v-if="computedHasPrepend" class="pr-2">
        <slot name="prepend"></slot>
      </div>
      <input
        v-model="inputValue"
        :placeholder="props.placeholder"
        :type="computedInputType"
        class="bg-transparent outline-0 min-w-0 flex-grow"
        @blur="onBlur"
        @focus="onFocus"
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
