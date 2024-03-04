<script lang="ts" setup>
import { EBaseButtonType } from "../../ts/components/base/BaseButton.types.ts";
import {
  emailRule,
  lengthRule,
  requiredRule,
} from "../../utils/validation-rules.ts";
import BaseInput from "../base/BaseInput.vue";
import BaseButton from "../base/BaseButton.vue";
import { computed, ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../firebase";

const auth = getAuth(firebaseApp);

const email = ref<string>("");
const password = ref<string>("");

const passwordVisible = ref<boolean>(false);
const computedPasswordVisibilityIcon = computed(() => {
  return {
    "fa-eye": !passwordVisible.value,
    "fa-eye-slash": passwordVisible.value,
  };
});

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}

function logInUser() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
}
</script>

<template>
  <div
    class="bg-module min-w-[600px] h-fit text-white py-16 px-32 flex flex-col justify-center items-center rounded-xl"
  >
    <h2 class="text-4xl font-bold text-center pb-10">Welcome to Paralelify</h2>
    <div class="flex flex-col gap-2">
      <BaseButton :type="EBaseButtonType.filled" class="w-full">
        <template #prepend>
          <i class="fa-brands fa-google" />
        </template>
        Continue with Google
      </BaseButton>
      <BaseButton :type="EBaseButtonType.outlined" class="w-full">
        <template #prepend>
          <i class="fa-brands fa-meta" />
        </template>
        Continue with Meta
      </BaseButton>
      <BaseButton :type="EBaseButtonType.outlined" class="w-full">
        <template #prepend>
          <i class="fa-brands fa-apple" />
        </template>
        Continue with Apple
      </BaseButton>
    </div>
    <div class="divider-x bg-br-module my-10" />
    <div class="flex flex-col gap-4 w-full">
      <BaseInput
        v-model="email"
        :rules="[requiredRule, emailRule]"
        label="Email or username"
        placeholder="Email or username"
      />
      <BaseInput
        v-model="password"
        :password="passwordVisible"
        :rules="[requiredRule, lengthRule(8)]"
        label="Password"
        placeholder="Password"
      >
        <template #append>
          <BaseButton
            :icon="true"
            class="w-9 h-9"
            @click="togglePasswordVisibility"
          >
            <i
              :class="computedPasswordVisibilityIcon"
              class="fa-solid text-sm"
            />
          </BaseButton>
        </template>
      </BaseInput>
      <BaseButton
        :type="EBaseButtonType.filled"
        class="w-full mt-3"
        @click="logInUser"
      >
        Log In
      </BaseButton>
      <RouterLink
        :to="{ name: 'sign-up' }"
        class="text-primary-500 hover:text-primary-400 text-center"
      >
        Don't have an account?
      </RouterLink>
    </div>
  </div>
</template>
