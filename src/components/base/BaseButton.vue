<script lang="ts" setup>
import { computed, ref, useSlots } from "vue";
import {
  EBaseButtonType,
  IBaseButtonProps,
} from "../../ts/components/base/BaseButton.types.ts";

const props = withDefaults(defineProps<IBaseButtonProps>(), {
  type: EBaseButtonType.outlined,
});

const buttonRef = ref<HTMLElement | null>(null);

const slots = useSlots();
const hasPrependSlot = computed(() => !!slots.prepend);

const computedButtonClass = computed(() => {
  return {
    "bg-primary-500 hover:bg-primary-400":
      props.type === EBaseButtonType.filled,
    "border-2 border-white/50 hover:bg-gray-100/10 hover:border-white":
      props.type === EBaseButtonType.outlined,
    "px-10 h-11": !props.icon,
    "w-11 h-11": props.icon,
  };
});

function addRippleEffect(x: number, y: number) {
  const rippleElement = document.createElement("div");
  rippleElement.classList.add("absolute", "rounded-full", "bg-primary-200");
  rippleElement.style.width = `20px`;
  rippleElement.style.height = `20px`;
  rippleElement.style.top = `${y}px`;
  rippleElement.style.left = `${x}px`;
  rippleElement.style.translate = "-50% -50%";
  rippleElement.style.transformOrigin = "center";

  if (buttonRef.value) {
    buttonRef.value.appendChild(rippleElement);
    rippleElement.classList.add("ripple-animation");
    rippleElement.addEventListener("animationend", () => {
      rippleElement.remove();
    });
  }
}

function handleButtonClick(e: MouseEvent) {
  const button = e.currentTarget as HTMLButtonElement;
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  addRippleEffect(x, y);
}
</script>

<template>
  <button
    ref="buttonRef"
    :class="computedButtonClass"
    class="flex items-center justify-center transition-all gap-6 rounded-full overflow-hidden relative"
    @mousedown.left="handleButtonClick"
  >
    <h2 v-if="hasPrependSlot" class="font-bold text-lg">
      <slot name="prepend" />
    </h2>

    <h2 class="font-bold text-lg">
      <slot />
    </h2>
  </button>
</template>
