<template>
  <main class="min-h-screen overflow-hidden">
    <RouterView />
    <div
      id="fixed-components"
      class="fixed top-0 left-0 w-screen h-screen bg-sky-500-500/10 z-50 pointer-events-none"
    />
  </main>
</template>
<script lang="ts" setup></script>
