<script lang="ts" setup>
import BaseButton from "../components/base/BaseButton.vue";
import { EBaseButtonType } from "../ts/components/base/BaseButton.types.ts";
</script>
<template>
  <div class="bg-body flex justify-center pt-40">
    <div
      class="bg-module min-w-[600px] h-fit text-white py-10 flex flex-col justify-center rounded-xl"
    >
      <h2 class="text-4xl font-bold text-center">Log in to Spotify</h2>
      <BaseButton :type="EBaseButtonType.outlined">
        <template #prepend>
          <i class="fa-brands fa-google" />
        </template>
        Continue with Google
      </BaseButton>
      <BaseButton :type="EBaseButtonType.outlined">
        <template #prepend>
          <i class="fa-brands fa-meta" />
        </template>
        Continue with Meta
      </BaseButton>
      <BaseButton :type="EBaseButtonType.outlined">
        <template #prepend>
          <i class="fa-brands fa-apple" />
        </template>
        Continue with Apple
      </BaseButton>
    </div>
  </div>
</template>
<style scoped></style>
