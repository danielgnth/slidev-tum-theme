<!--
  Grid of images with sub-captions (not numbered).
  ---
  layout: gallery
  cols: 3                          # default: number of images, max 3
  images:
    - src: /images/a.svg
      caption: (a) First
    - /images/b.svg                # plain path also works
  fit: contain | cover
  ---
  # Title
-->
<script setup lang="ts">
import type { GalleryImage, ImageFit } from '../types'
import { computed } from 'vue'
import TumFitFigure from '../components/TumFitFigure.vue'
import TumFrame from '../components/TumFrame.vue'

const props = withDefaults(defineProps<{
  images?: GalleryImage[]
  cols?: number
  fit?: ImageFit
}>(), {
  images: () => [],
})

const items = computed(() => props.images.map(i => typeof i === 'string'
  ? { src: i }
  : i))
const columns = computed(() => props.cols ?? Math.min(items.value.length || 1, 3))
const rows = computed(() => Math.ceil(items.value.length / columns.value) || 1)
</script>

<template>
  <TumFrame layout-name="gallery">
    <div class="tum-stack">
      <div class="tum-stack__head">
        <slot />
      </div>
      <div
        class="tum-stack__fill tum-gallery"
        :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }"
      >
        <TumFitFigure
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          :caption="item.caption"
          :alt="item.alt"
          :fit="fit"
        />
      </div>
    </div>
  </TumFrame>
</template>
