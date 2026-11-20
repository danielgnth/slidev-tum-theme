<!-- Image on the left, text on the right. Same options as image-right. -->
<script setup lang="ts">
import ImageRight from './image-right.vue'
</script>

<template>
  <ImageRight v-bind="$attrs" side="left">
    <slot />
  </ImageRight>
</template>
