<!--
  Bibliography in small type with hanging indent.
  # References
  1. A. Author, "Title", Venue, 2024.
  Or use [n] labels: `- [1] …`
-->
<script setup lang="ts">
import TumFrame from '../components/TumFrame.vue'
</script>

<template>
  <TumFrame layout-name="references">
    <div class="tum-references">
      <slot />
    </div>
  </TumFrame>
</template>
