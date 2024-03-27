<script lang="ts" setup>
import SidebarComponent from "../partials/sidebar/SidebarComponent.vue";
import TheSongDetailsPartial from "../partials/homepageSongDetails/TheSongDetailsPartial.vue";
</script>

<template>
  <div class="flex bg-black">
    <SidebarComponent></SidebarComponent>
    <div class="bg-gray-back flex-grow"></div>
    <TheSongDetailsPartial></TheSongDetailsPartial>
  </div>
</template>

<style lang="scss" scoped></style>
