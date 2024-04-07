<script lang="ts" setup>
import { useUserStore } from "../../pinia/user.pinia.ts";
import BaseButton from "../../components/base/BaseButton.vue";
import { useAuth } from "../../composable/useAuth.ts";
import { User } from "firebase/auth";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useElementSize } from "@vueuse/core";

const router = useRouter();

const userStore = useUserStore();

const theProfilePartialRef = ref<HTMLElement | null>(null);
const { width: theProfilePartialWidth } = useElementSize(theProfilePartialRef);

const { signOut, signOutLoading } = useAuth();

const computedUser = computed<User | null>(() => {
  return userStore.getUser;
});

async function signOutUser() {
  try {
    await signOut();
    await router.replace({ name: "sign-in" });
  } catch (error: any) {
    console.error(error);
  }
}
</script>

<template>
  <main class="p-4">
    <div class="flex gap-6">
      <div
        class="relative h-52 w-52 rounded-full overflow-hidden cursor-pointer"
      >
        <img
          v-if="computedUser?.photoURL"
          :src="computedUser?.photoURL"
          alt="user profile"
          class="rounded-full shadow-card h-full w-full"
        />
        <div
          class="absolute top-1/2 left-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 opacity-0 bg-module/60 hover:opacity-100 transition-all flex justify-center items-center flex-col gap-2"
        >
          <i class="fa-solid fa-pen text-white" />
          <p class="text-white">Choose photo</p>
        </div>
      </div>
      <div class="flex justify-end flex-col gap-3">
        <p class="text-white text-sm">Profile</p>
        <h2 class="text-white text-7xl font-bold">
          {{ computedUser?.displayName }}
        </h2>
        <div class="flex flex-wrap items-center gap-2">
          <p class="text-white text-sm">0 Public Playlists</p>
          <p class="text-white text-xs">●</p>
          <p class="text-white text-sm hover:underline cursor-pointer">
            0 Followers
          </p>
          <p class="text-white text-xs">●</p>
          <p class="text-white text-sm hover:underline cursor-pointer">
            0 Following
          </p>
        </div>
      </div>
    </div>
    <div class="h-[2000px]"></div>

    <BaseButton
      :loading="signOutLoading"
      class="bg-red-500"
      @click="signOutUser"
    >
      Log Out
    </BaseButton>
  </main>
</template>

<style scoped></style>
