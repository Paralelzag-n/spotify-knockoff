<script lang="ts" setup>
import { useUserStore } from "../../pinia/user.pinia.ts";
import BaseButton from "../../components/base/BaseButton.vue";
import { useAuth } from "../../composable/useAuth.ts";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();
const { signOut, signOutLoading } = useAuth();

async function signOutUser() {
  try {
    await signOut();
    await router.replace({ name: "sign-in" });
  } catch (error: any) {
    console.log(error);
  }
}
</script>

<template>
  <div class="border-l-blue-600 text-pink-600">PROFILE</div>
  <h3 class="text-white">{{ userStore.user }}</h3>
  <BaseButton :loading="signOutLoading" class="bg-red-500" @click="signOutUser">
    Log Out
  </BaseButton>
</template>

<style scoped></style>
