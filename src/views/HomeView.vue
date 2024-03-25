<script lang="ts" setup>
import SidebarComponent from "../partials/sidebar/SidebarComponent.vue";
</script>

<template>
  <div class="min-h-screen flex bg-black">
    <SidebarComponent></SidebarComponent>
    <div class="bg-gray-back flex-grow">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
