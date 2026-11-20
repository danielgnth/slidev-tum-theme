<script setup lang="ts">
import TumFrame from '../components/TumFrame.vue'
</script>

<template>
  <TumFrame layout-name="statement">
    <div class="tum-centered tum-statement">
      <slot />
    </div>
  </TumFrame>
</template>
