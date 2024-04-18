<script lang="ts" setup>
import { computed } from "vue";
import { useLayoutStore } from "../pinia/layout.pinia.ts";
import { useRoute } from "vue-router";
import { useUserStore } from "../pinia/user.pinia.ts";
import { User } from "firebase/auth";
import BasePlayButton from "./base/BasePlayButton.vue";

const props = defineProps<{
  width: number;
}>();

const route = useRoute();

const layoutStore = useLayoutStore();
const userStore = useUserStore();

const computedUser = computed<User | null>(() => {
  return userStore.getUser;
});

const computedScrolledDown = computed(
  () => layoutStore.mainPartialScrolledDown,
);

const computedProfileHeader = computed(() => {
  return route.path.includes("profile") && computedScrolledDown.value;
});

const computedArtistHeader = computed(() => {
  return route.path.includes("artist") && computedScrolledDown.value;
});

const computedMainPartialHeaderBarStyle = computed(() => {
  const gradientColorValue = layoutStore.getMainPartialColor;
  return {
    width: `${props.width}px`,
    background: gradientColorValue,
  };
});
</script>

<template>
  <Transition>
    <template v-if="computedArtistHeader">
      <div
        :style="computedMainPartialHeaderBarStyle"
        class="flex absolute h-[80px] top-0 left-0 z-50 p-4 gap-4 items-center"
      >
        <BasePlayButton :size="13" />
        <h1 class="text-white text-xl font-bold">Gorillaz</h1>
      </div>
    </template>
  </Transition>
  <Transition>
    <template v-if="computedProfileHeader">
      <div
        :style="computedMainPartialHeaderBarStyle"
        class="flex absolute h-[80px] top-0 left-0 z-50 p-4 gap-4 items-center"
      >
        <img
          v-if="computedUser?.photoURL"
          :src="computedUser?.photoURL"
          alt="user profile picture"
          class="rounded-full w-[55px] h-[55px] shadow-card"
        />
        <h2 class="text-xl text-white font-semibold">
          {{ computedUser?.displayName }}
        </h2>
      </div>
    </template>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
