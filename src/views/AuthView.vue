<script lang="ts" setup>
import BaseButton from "../components/base/BaseButton.vue";
</script>
<template>
  <div class="bg-body flex justify-center pt-40">
    <div
      class="bg-module min-w-[600px] h-fit text-white py-10 flex flex-col justify-center rounded-xl"
    >
      <h2 class="text-4xl font-bold text-center">Log in to Spotify</h2>
      <BaseButton color="primary"> Continue with Google</BaseButton>
      <BaseButton> Continue with Github</BaseButton>
    </div>
  </div>
</template>
<style scoped></style>
