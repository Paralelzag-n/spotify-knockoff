<script lang="ts" setup>
import BaseButton from "../components/base/BaseButton.vue";
import { EBaseButtonType } from "../ts/components/base/BaseButton.types.ts";
import BaseInput from "../components/base/BaseInput.vue";
import {
  emailRule,
  lengthRule,
  requiredRule,
} from "../utils/validation-rules.ts";
</script>
<template>
  <div class="bg-body flex justify-center pt-20">
    <div
      class="bg-module min-w-[600px] h-fit text-white py-16 px-32 flex flex-col justify-center items-center rounded-xl"
    >
      <h2 class="text-4xl font-bold text-center pb-10">Log in to Paralelify</h2>
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
          :rules="[requiredRule, emailRule]"
          label="Email or username"
          placeholder="Email or username"
        />
        <BaseInput
          :rules="[requiredRule, lengthRule(8)]"
          label="Password"
          placeholder="Password"
        />
        <BaseButton :type="EBaseButtonType.filled" class="w-full mt-3">
          Log In
        </BaseButton>
      </div>
    </div>
  </div>
</template>
