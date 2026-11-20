<script setup lang="ts">
import TumFrame from '../components/TumFrame.vue'
</script>

<template>
  <TumFrame layout-name="center">
    <div class="tum-centered tum-center">
      <slot />
    </div>
  </TumFrame>
</template>
