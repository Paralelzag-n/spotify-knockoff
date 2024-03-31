<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{
  selectable?: boolean;
  minimized?: boolean;
  content: string[];
  searchActive?: boolean;
}>();

const selected = defineModel<string>();

const elementHeightStyle = computed(() => {
  const elementHeight = props.content.length * 64;
  return dropDownOpen.value
    ? { maxHeight: `${elementHeight + 32}px` }
    : { maxHeight: `0px` };
});

const ComponentRef = ref<HTMLElement | null>(null);
const closeHandler = (e: any): void => {
  if (ComponentRef.value && !ComponentRef.value.contains(e.target)) {
    dropDownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", (e: any) => closeHandler(e));
});

onBeforeUnmount(() => {
  document.removeEventListener("click", (e: any) => closeHandler(e));
});

const dropDownOpen = ref<boolean>();
const dropDownToggler = (): void => {
  dropDownOpen.value = !dropDownOpen.value;
};

const selectHandler = (value: string): void => {
  if (selected.value === value) {
    selected.value = "";
    return;
  }
  selected.value = value;
};
</script>

<template>
  <div
    v-if="!props.minimized && !props.searchActive"
    ref="ComponentRef"
    class="flex flex-col gap-1 relative"
  >
    <i class="text-white fa-solid fa-bars" @click="dropDownToggler"></i>

    <div
      :style="elementHeightStyle"
      class="w-40 absolute shadow-black shadow-2xl text-white transition-all top-5 z-50 left-0 overflow-hidden rounded-lg bg-button-gray"
    >
      <div class="flex flex-col p-2">
        <div
          v-for="item in props.content"
          class="flex items-center px-1 py-2 rounded-lg cursor-pointer hover:bg-button-gray-hover justify-between"
          @click="selectHandler(item)"
        >
          <h1
            :key="item"
            :class="
              props.selectable && selected === item
                ? 'text-primary-500'
                : 'text-white'
            "
          >
            {{ item }}
          </h1>
          <i
            v-if="props.selectable && selected === item"
            class="fa-solid text-primary-500 fa-check"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
