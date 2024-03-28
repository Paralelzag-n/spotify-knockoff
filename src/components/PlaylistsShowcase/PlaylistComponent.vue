<script lang="ts" setup>
import { defineProps, ref } from "vue";
import BasePlayButton from "../base/BasePlayButton.vue";
import { IPlaylist } from "../../ts/pinia/playlist.types.ts";
import { useElementSize } from "@vueuse/core";

const props = defineProps<{
  playlist: IPlaylist;
}>();

const imageRef = ref<HTMLElement | null>(null);
const { width: imageWidth } = useElementSize(imageRef);

const mouseHovering = ref(false);

function toggleHover(hovering: boolean) {
  mouseHovering.value = hovering;
}
</script>

<template>
  <div
    class="playlist-container cursor-pointer"
    @mouseenter="toggleHover(true)"
    @mouseleave="toggleHover(false)"
  >
    <div class="p-3 pb-1 relative">
      <img
        ref="imageRef"
        :src="props.playlist.thumbnail"
        :style="{ height: `${imageWidth}px` }"
        alt="playlist thumbnail"
        class="w-full rounded shadow-card"
      />
      <transition name="slide-fade">
        <BasePlayButton
          v-if="mouseHovering"
          :size="12"
          class="absolute bottom-3 right-5"
        />
      </transition>
    </div>
    <div class="px-3">
      <h2 class="text-white font-semibold truncate ...">
        {{ props.playlist.name }}
      </h2>
      <p class="text-white/60 text-sm">By {{ props.playlist.owner }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.playlist-container {
  @apply flex flex-col rounded hover:bg-button-gray-hover transition-all pb-4;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 500ms ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
