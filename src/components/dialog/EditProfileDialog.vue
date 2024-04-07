<script lang="ts" setup>
import BaseDialog from "../base/BaseDialog.vue";
import ProfilePictureComponent from "../ProfilePictureComponent.vue";
import { useUserStore } from "../../pinia/user.pinia.ts";
import { updateProfile, User } from "firebase/auth";
import { computed, onMounted, ref, watch } from "vue";
import BaseInput from "../base/BaseInput.vue";
import { requiredRule } from "../../utils/validation-rules.ts";
import BaseButton from "../base/BaseButton.vue";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { auth, storage } from "../../firebase";
import { getFileExtensionFromMimeType } from "../../utils/image-manipulation.ts";

const dialogActive = defineModel<boolean>({ default: false });

const userStore = useUserStore();
const computedUser = computed<User | null>(() => {
  return userStore.getUser;
});

const displayName = ref<string>("");
const displayNameError = ref<string>("");

const fileInputRef = ref<HTMLInputElement | null>(null);
const uploadedImageUrl = ref<string>("");
const uploadedImageBlob = ref<any>(null);

const formSubmitLoading = ref<boolean>(false);

function uploadImage() {
  if (!fileInputRef.value) return;
  fileInputRef.value.click();
}

const computedFileInputImage = computed(() => {
  return uploadedImageUrl.value || computedUser.value?.photoURL;
});

function handleFileUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  uploadedImageBlob.value = file;
  uploadedImageUrl.value = URL.createObjectURL(file);
}

async function saveChanges() {
  if (displayName.value) {
    displayNameError.value = requiredRule(displayName.value);
    if (displayNameError.value) return;
  }

  formSubmitLoading.value = true;

  let updates: any = {};

  if (displayName.value && !displayNameError.value) {
    updates.displayName = displayName.value;
  }

  if (uploadedImageBlob.value) {
    const fileExtension = getFileExtensionFromMimeType(
      uploadedImageBlob.value.type,
    );
    const imageDestination = `img/${computedUser.value?.displayName}_${Date.now()}.${fileExtension}`;
    const imageStorageRef = storageRef(storage, imageDestination);

    await uploadBytes(imageStorageRef, uploadedImageBlob.value);

    updates.photoURL = await getDownloadURL(imageStorageRef);
  }

  if (Object.keys(updates).length > 0 && auth.currentUser) {
    await updateProfile(auth.currentUser, updates);
  }

  formSubmitLoading.value = false;
  dialogActive.value = false;
}

watch(displayName, (value) => {
  displayNameError.value = requiredRule(value);
});

watch(dialogActive, (value) => {
  if (!value) {
    uploadedImageUrl.value = "";
    uploadedImageBlob.value = null;
  }
});

onMounted(() => {
  if (computedUser.value?.displayName)
    displayName.value = computedUser.value?.displayName;
});
</script>

<template>
  <BaseDialog v-model="dialogActive" :closeable="true" title="Profile details">
    <input
      ref="fileInputRef"
      accept="image/png, image/jpeg"
      class="hidden"
      type="file"
      @change="handleFileUpload"
    />
    <div class="flex gap-6">
      <ProfilePictureComponent
        :image-url="computedFileInputImage"
        @click="uploadImage"
      />
      <form
        class="flex flex-col justify-center gap-4"
        @submit.prevent="saveChanges"
      >
        <BaseInput
          v-model="displayName"
          :error="displayNameError"
          :placeholder="computedUser?.displayName"
          label="Username"
        />
        <div class="flex justify-end">
          <BaseButton
            :loading="formSubmitLoading"
            class="bg-white w-20"
            text="text-black"
            type="submit"
          >
            Save
          </BaseButton>
        </div>
      </form>
    </div>
  </BaseDialog>
</template>

<style scoped></style>
