<!--
  Inline figure with optional caption, usable in any layout.
  <Figure src="/images/topology.svg" caption="Network topology" n="1" height="200px" />
-->
<script setup lang="ts">
import type { ImageFit } from '../types'
import { resolveAssetUrl } from '@slidev/client'
import Caption from './Caption.vue'

withDefaults(defineProps<{
  src: string
  caption?: string
  n?: number | string
  label?: string
  width?: string
  height?: string
  fit?: ImageFit
  alt?: string
}>(), {
  fit: 'contain',
})
</script>

<template>
  <figure class="tum-figure">
    <img
      :src="resolveAssetUrl(src)"
      :alt="alt ?? caption ?? ''"
      :style="{ width, height, objectFit: fit }"
    >
    <Caption v-if="caption || $slots.default" :n="n" :label="label">
      <slot>{{ caption }}</slot>
    </Caption>
  </figure>
</template>
