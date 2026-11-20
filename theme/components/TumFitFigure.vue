<!--
  Figure that fills its container: the image box grows, the caption keeps its height
  (internal, used by the image, image-left/right and gallery layouts).
-->
<script setup lang="ts">
import type { ImageFit } from '../types'
import { resolveAssetUrl } from '@slidev/client'
import Caption from './Caption.vue'

defineProps<{
  src?: string
  caption?: string
  alt?: string
  fit?: ImageFit
  /** figure number, omitted for unnumbered captions */
  n?: number
}>()
</script>

<template>
  <figure class="tum-fig">
    <div class="tum-fig__box">
      <img v-if="src" :src="resolveAssetUrl(src)" :alt="alt ?? caption ?? ''" :style="{ objectFit: fit ?? 'contain' }">
    </div>
    <Caption v-if="caption" :n="n">
      {{ caption }}
    </Caption>
  </figure>
</template>
