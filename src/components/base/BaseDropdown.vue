<script lang="ts" setup>
import {
  computed,
  defineEmits,
  defineProps,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { useElementSize, useWindowSize } from "@vueuse/core";

const props = defineProps<{
  selectable?: boolean;
  content: string[];
}>();

const emits = defineEmits<{
  (e: "contentClicked", value: string): void;
}>();

const selected = defineModel<string>();
const dropDownOpen = ref(false);

const dropdownToggleButtonRef = ref<HTMLElement | null>(null);
const dropdownToggleItemsRef = ref<HTMLElement | null>(null);

const { width: dropdownToggleItemsWidth } = useElementSize(
  dropdownToggleItemsRef,
);
const { width: screenWidth } = useWindowSize();

const dropdownBottom = ref<number | null>(null);
const dropdownRight = ref<number | null>(null);

function selectHandler(value: string) {
  closeDropdown();
  emits("contentClicked", value);
  if (props.selectable) selected.value = selected.value === value ? "" : value;
}

const computedDropdownContainerStyle = computed(() => {
  const maxHeight =
    dropDownOpen.value && props.content?.length
      ? `${props.content.length * 64 + 32}px`
      : "0px";

  if (!dropdownBottom.value || !dropdownRight.value) {
    return { maxHeight };
  }

  const style = {
    top: `${dropdownBottom.value + 8}px`,
    left: `${dropdownRight.value - dropdownToggleItemsWidth.value}px`,
    maxHeight,
  };
  return style;
});

const computedDropDownClass = computed(() => ({
  "bg-button-gray": dropDownOpen.value,
  "bg-transparent": !dropDownOpen.value,
  "hover:bg-button-gray-hover cursor-pointer w-7 h-7 rounded-full hover:scale-110 flex items-center justify-center":
    true,
}));

function dropDownItemClass(item: string) {
  return {
    "text-primary-500": props.selectable && selected.value === item,
    "text-white": !props.selectable || selected.value !== item,
    "flex items-center px-1 py-2 rounded-lg cursor-pointer hover:bg-button-gray-hover justify-between":
      true,
  };
}

function calculateDropdownPosition() {
  if (!dropdownToggleButtonRef.value) {
    return;
  }
  const { bottom, right } =
    dropdownToggleButtonRef.value.getBoundingClientRect();
  dropdownBottom.value = bottom;
  dropdownRight.value = right;
}

function toggleDropDown() {
  calculateDropdownPosition();
  dropDownOpen.value = !dropDownOpen.value;
}

function closeDropdown() {
  dropDownOpen.value = false;
}

function detectClickOutside(event: any) {
  if (
    dropdownToggleItemsRef.value &&
    !dropdownToggleItemsRef.value.contains(event.target)
  ) {
    if (
      dropdownToggleButtonRef.value &&
      dropdownToggleButtonRef.value.contains(event.target)
    ) {
      return;
    }
    if (dropDownOpen.value) closeDropdown();
  }
}

onMounted(() => {
  document.addEventListener("mousedown", detectClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", detectClickOutside);
});

watch(screenWidth, () => {
  if (dropDownOpen.value) calculateDropdownPosition();
});
</script>

<template>
  <div class="flex flex-col gap-1 pl-1">
    <div ref="dropdownToggleButtonRef" class="flex items-center gap-1">
      <h1
        v-if="props.selectable"
        class="text-white/60 cursor-pointer hover:text-white text-xs"
        @click="toggleDropDown"
      >
        {{ selected }}
      </h1>
      <div :class="computedDropDownClass" @click="toggleDropDown">
        <i class="text-white fa-solid fa-bars" />
      </div>
    </div>
    <teleport to="#fixed-components">
      <div
        ref="dropdownToggleItemsRef"
        :style="computedDropdownContainerStyle"
        class="dropdown-container shadow-card pointer-events-auto"
      >
        <div class="flex flex-col p-2">
          <div
            v-for="item in props.content"
            :key="item"
            :class="dropDownItemClass(item)"
            @click="selectHandler(item)"
          >
            <h1 @click="() => !props.selectable && toggleDropDown()">
              {{ item }}
            </h1>
            <i
              v-if="props.selectable && selected === item"
              class="fa-solid text-primary-500 fa-check"
            />
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped>
.dropdown-container {
  @apply w-40 absolute text-white overflow-hidden rounded-lg bg-button-gray;
  transition: max-height 0.3s ease;
}
</style>
