<script setup lang="ts">
import TumFrame from '../components/TumFrame.vue'
</script>

<template>
  <TumFrame layout-name="fact">
    <div class="tum-centered tum-fact">
      <slot />
    </div>
  </TumFrame>
</template>
