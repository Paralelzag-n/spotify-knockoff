<script lang="ts" setup>
import { computed, defineEmits, defineProps, onMounted, ref } from "vue";
import { useElementBounding } from "@vueuse/core";

const props = defineProps<{
  selectable?: boolean;
  content: string[];
}>();

const emits = defineEmits<{
  (e: "contentClicked", value: string): void;
}>();

const selected = defineModel<string>();

const selected = ref<string | null>(null);
const dropDownOpen = ref(false);

const dropdownToggleButtonRef = ref(null);
const { x, y } = useElementBounding(dropdownToggleButtonRef);

onMounted(() => {
  console.log(dropdownToggleButtonRef.value);
  console.log(x.value, y.value);
});

const toggleDropDown = () => {
  dropDownOpen.value = !dropDownOpen.value;
};

const selectHandler = (value: string) => {
  if (props.selectable) {
    selected.value = selected.value === value ? "" : value;
  } else {
    emits("contentClicked", value);
    if (!props.selectable) toggleDropDown();
  }
};

const computedDropdownContainerStyle = computed(() => ({
  top: `${y.value + 20}px`,
  left: `${x.value}px`,
  maxHeight: dropDownOpen.value ? `${props.content.length * 64 + 32}px` : "0px",
}));

const computedDropDownClass = computed(() => ({
  "bg-button-gray": dropDownOpen.value,
  "bg-transparent": !dropDownOpen.value,
  "hover:bg-button-gray-hover cursor-pointer transition-all w-7 h-7 rounded-full hover:scale-110 flex items-center justify-center":
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
</script>

<template>
  <div class="flex flex-col gap-1 pl-1">
    <div class="flex items-center gap-1">
      <h1
        v-if="props.selectable"
        ref="dropdownToggleButtonRef"
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
        :style="computedDropdownContainerStyle"
        class="dropdown-container pointer-events-auto"
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
  @apply w-40 absolute shadow-black shadow-2xl text-white transition-all overflow-hidden rounded-lg bg-button-gray;
}
</style>
