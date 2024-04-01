<script lang="ts" setup>
import BaseButton from "../base/BaseButton.vue";
import { computed, ref, watch } from "vue";
import BaseInput from "../base/BaseInput.vue";
import {
  emailRule,
  requiredRule,
  validate,
} from "../../utils/validation-rules.ts";
import BaseSwitch from "../base/BaseSwitch.vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../composable/useAuth.ts";

const email = ref<string>("");
const emailError = ref<string>("");

const password = ref<string>("");
const passwordError = ref<string>("");
const passwordVisible = ref<boolean>(false);

const router = useRouter();
const { signIn, signInLoading } = useAuth();

watch(email, (newEmail) => {
  emailError.value = validate(newEmail, [emailRule, requiredRule]);
});
watch(password, (newPassword) => {
  passwordError.value = validate(newPassword, [requiredRule]);
});

const computedHasError = computed(
  () => emailError.value || passwordError.value,
);

const computedPasswordVisibility = computed<{ icon: string; type: string }>(
  () => {
    return {
      icon: passwordVisible.value ? "fa-eye" : "fa-eye-slash",
      type: passwordVisible.value ? "text" : "password",
    };
  },
);

function validateAllFields() {
  // emailRule
  emailError.value = validate(email.value, [requiredRule]);
  passwordError.value = validate(password.value, [requiredRule]);
}

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}

async function logInForm() {
  validateAllFields();
  if (computedHasError.value) return;

  const user = await signIn(email.value, password.value);
  if (!user) return;

  await router.push({ name: "home" });
}

function goToSignUp() {
  router.push({ name: "sign-up" });
}
</script>

<template>
  <div
    class="w-[750px] py-12 h-fit bg-module rounded-lg flex flex-col items-center"
  >
    <h1 class="text-white pb-8 text-3xl text-center font-bold">
      Log in to Spotify
    </h1>

    <div class="w-[400px] flex flex-col gap-2">
      <BaseButton border icon="fa-google">Continue with Google</BaseButton>
      <BaseButton border icon="fa-meta">Continue with Meta</BaseButton>
      <BaseButton border icon="fa-apple">Continue with Apple</BaseButton>
    </div>

    <div class="w-full py-10 px-28">
      <div class="w-full bg-white/15 h-[1px]" />
    </div>

    <form class="w-[400px] flex flex-col gap-4" @submit.prevent="logInForm">
      <BaseInput
        v-model="email"
        :error="emailError"
        append-icon="fa-envelope"
        label="Email or username"
        placeholder="Email or username"
      />
      <BaseInput
        v-model="password"
        :error="passwordError"
        :prepend-icon="computedPasswordVisibility.icon"
        :type="computedPasswordVisibility.type"
        append-icon="fa-lock"
        label="Password"
        placeholder="●●●●●●●●"
        @prepend-icon-click="togglePasswordVisibility"
      />
      <BaseSwitch label="Remember me" />
      <BaseButton
        :loading="signInLoading"
        class="bg-primary-500 mt-6"
        type="submit"
      >
        Log In
      </BaseButton>
      <p class="text-link text-center mx-auto">Forgot your password?</p>
    </form>

    <div class="w-full py-10 px-28">
      <div class="w-full bg-white/15 h-[1px]" />
    </div>

    <div class="flex items-center gap-2">
      <p class="text-tx-button-white text-center w-fit mx-auto">
        Don't have an account?
      </p>
      <p
        class="text-link text-center w-fit mx-auto -pb-[1px]"
        @click="goToSignUp"
      >
        Sign up for Spotify
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.text-link {
  @apply text-tx-button-white underline hover:text-primary-400 cursor-pointer w-fit transition-all duration-100;
}
</style>
