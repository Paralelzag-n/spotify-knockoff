<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{
  selectable?: boolean;
  minimized?: boolean;
  content: string[];
}>();

const emits = defineEmits<{
  (e: "contentClicked", value: string): void;
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
  if (props.selectable && selected.value === value) {
    selected.value = "";
    return;
  }
  selected.value = value;
  if (!props.selectable) {
    emits("contentClicked", value);
  }
};
</script>

<template>
  <div
    v-if="!props.minimized"
    ref="ComponentRef"
    class="flex flex-col gap-1 relative pl-1"
  >
    <div class="flex items-center gap-1 hover-text-white">
      <h1
        @click="dropDownToggler"
        v-if="props.selectable"
        class="text-white/60 cursor-pointer text-xs"
      >
        {{ selected }}
      </h1>
      <div
        @click="dropDownToggler"
        :class="dropDownOpen ? 'bg-button-gray' : 'bg-transparent'"
        class="hover:bg-button-gray-hover cursor-pointer transition-all w-7 h-7 rounded-full hover:scale-110 flex items-center justify-center"
      >
        <i class="text-white/60 fa-solid fa-bars"></i>
      </div>
    </div>
    <div
      :style="elementHeightStyle"
      :class="!props.selectable ? 'z-50' : 'z-40'"
      class="w-40 absolute shadow-black shadow-2xl text-white transition-all top-9 right-0 overflow-hidden rounded-lg bg-button-gray"
    >
      <div class="flex flex-col p-2">
        <div
          v-for="item in props.content"
          class="flex items-center px-1 py-2 rounded-lg cursor-pointer hover:bg-button-gray-hover justify-between"
          @click="selectHandler(item)"
        >
          <h1
            @click="() => !props.selectable && dropDownToggler()"
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

<style scoped>
.hover-text-white:hover h1,
.hover-text-white:hover i {
  color: white;
}
</style>
