<script lang="ts" setup>
import { useUserStore } from "../../pinia/user.pinia.ts";
import BaseButton from "../../components/base/BaseButton.vue";
import { useAuth } from "../../composable/useAuth.ts";
import { User } from "firebase/auth";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import ProfilePictureComponent from "../../components/ProfilePictureComponent.vue";
import EditProfileDialog from "../../components/dialog/EditProfileDialog.vue";

const router = useRouter();
const userStore = useUserStore();

const { signOut, signOutLoading } = useAuth();
const editProfileDialog = ref<boolean>(false);

const computedUser = computed<User | null>(() => {
  return userStore.getUser;
});

function editProfile() {
  editProfileDialog.value = true;
}

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
    <EditProfileDialog v-model="editProfileDialog" />
    <div class="flex gap-6">
      <ProfilePictureComponent
        :image-url="computedUser?.photoURL"
        @click="editProfile"
      />
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
